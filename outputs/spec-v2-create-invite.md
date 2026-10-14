## Problem Statement

Couples choosing a wedding invite template on the v2 home page cannot yet complete invite creation through the v2 wizard. The wizard UI exists with three fixed steps and unified validation, but it does not adapt fields or validations per template, does not persist drafts despite promising auto-save, does not create invitations in the database, and does not proceed to checkout. Creation and payment still happen only through legacy v1 flows, leaving v2 as a dead-end experience.

## Solution

Wire the v2 create-invite wizard so a single adaptive form serves all four catalog templates (Azul, Dourado, Verde Oliva, Romântico) by varying visible fields, step count, and validations per template — without building separate forms per model. On successful completion, create an inactive invitation via the existing create API and redirect the couple to a v2 checkout placeholder page. Persist wizard progress in localStorage keyed by template slug.

## User Stories

1. As a couple browsing v2 templates, I want to start creating an invite from the home catalog, so that I can personalize the model I chose without leaving the v2 experience.
2. As a couple on the Azul template, I want to fill in couple details including wedding date and time, so that my interactive invite shows accurate ceremony timing.
3. As a couple on the Dourado template, I want a streamlined three-step flow without a media step, so that I can create my minimalist interactive invite quickly.
4. As a couple on the Azul template, I want to upload a required hero photo, so that my invite header displays our chosen cover image.
5. As a couple on the Verde Oliva template, I want to provide venue name, full address, and welcome message, so that my site-style invite reads like a complete wedding page.
6. As a couple on the Verde Oliva template, I want to upload a required hero photo, so that my botanical site invite has a personalized cover.
7. As a couple on the Romântico template, I want to provide venue name, address, welcome message, and optional background music, so that my Pro site invite matches the template's romantic feature set.
8. As a couple on the Romântico template, I want to upload required hero, groom, and bride photos plus at least one gallery photo, so that my Pro invite ships with the visual content the template promises.
9. As a couple on the Romântico template, I want to optionally add couple and individual stories, so that I can enrich the invite narrative when I have content ready.
10. As a couple on any interactive template (Azul, Dourado), I want venue name and welcome message applied automatically when I do not enter them explicitly, so that I am not blocked by fields the legacy flow already defaulted.
11. As a couple filling the wizard, I want my progress saved automatically in the browser, so that I can leave and return without re-entering everything.
12. As a couple returning to an in-progress wizard, I want my previously uploaded image metadata restored, so that I do not need to re-upload files I already submitted.
13. As a couple on any step, I want only the fields relevant to my current step validated when I continue, so that I am not shown errors for steps I have not reached yet.
14. As a couple on the final step, I want to enter email and CPF and optionally keep the wedding planner add-on selected, so that I am ready for payment when checkout goes live.
15. As a couple completing the wizard, I want my invitation created in the system before checkout, so that my order is tied to a real invitation record.
16. As a couple after submitting, I want to land on a v2 checkout page showing a summary of my order, so that I know the creation succeeded and what comes next.
17. As a couple on the checkout placeholder, I want a clear message that PIX payment is coming soon, so that I understand why I cannot pay yet.
18. As a couple who created an invite, I want the system to map my URL slug (e.g. azul) to the correct internal template id (e.g. blue), so that the invitation renders with the right template.
19. As a couple on an interactive template, I want my invitation stored with invite type interactive, so that downstream payment and preview flows treat it correctly.
20. As a couple on a site template, I want my invitation stored with invite type site, so that site-specific billing and rendering paths apply.
21. As a couple navigating steps via URL query params, I want invalid or out-of-range step numbers clamped to valid bounds for my template, so that I never land on a broken step.
22. As a couple on a four-step template, I want the stepper and copy to reflect the correct total step count, so that I understand how much is left.
23. As a couple on step two, I want to provide WhatsApp for RSVP confirmations, so that guests can confirm attendance through the invite.
24. As a couple on templates that support it, I want to optionally add a YouTube music URL, so that my invite can play background music.
25. As a couple who successfully submits, I want my local draft cleared, so that a future visit starts fresh.
26. As a couple who encounters a server error on submit, I want to see feedback and remain on the payment step with my data intact, so that I can retry without re-entering everything.
27. As a developer maintaining the feature, I want all template-specific behavior centralized in one model-layer configuration, so that adding or changing a template does not require duplicating form components.
28. As a developer maintaining the feature, I want form-to-API mapping isolated from UI components, so that payload shape changes are testable in one place.
29. As a QA engineer, I want automated tests covering per-template step counts, field requirements, and API payload mapping, so that regressions in adaptive behavior are caught without manual runs across four templates.
30. As a product owner, I want payment integration deferred to a follow-up, so that we can ship creation and checkout scaffolding without blocking on AbacatePay or Stripe wiring.

## Implementation Decisions

### Adaptive wizard architecture

- Extend the create-invite template type passed from the v2 page boundary to include internal template id, product line (interactive vs site), and plan tier (Premium, Pro, Básico), sourced from the home catalog.
- Introduce a central wizard configuration module as the single seam for template-specific behavior. It exposes:
  - Step count (3 for Dourado; 4 for Azul, Verde Oliva, Romântico)
  - Step kind per index: couple, ceremony, media, or payment
  - Visible and required fields per step
  - Field lists used for per-step validation triggers
  - A Zod schema factory composed from shared base blocks (couple, ceremony, media, payment) rather than four separate form schemas
- UI step components remain shared; they render fields conditionally based on wizard config. No per-template form components.

### Field matrix per template

| Field | Dourado | Azul | Verde Oliva | Romântico |
|-------|---------|------|-------------|-----------|
| Steps | 3 | 4 | 4 | 4 |
| weddingTime | required, step 1 | required, step 1 | required, step 1 | required, step 1 |
| venueName | default | default | required, step 2 | required, step 2 |
| welcomeMessage | default | default | required, step 2 | required, step 2 |
| musicUrl | optional, step 2 | optional, step 2 | not collected | optional, step 2 |
| hero image | not collected | required, step 3 | required, step 3 | required, step 3 |
| groom/bride photos | — | — | — | required, step 3 |
| gallery (min 1) | — | — | — | required, step 3 |
| stories | — | — | — | optional, step 3 |

Defaults for interactive templates without explicit collection:
- venueName: "Local da Cerimônia"
- welcomeMessage: "Você está convidado para o nosso casamento!"

### Form schema extensions

- Add weddingTime (HH:MM, required on all templates).
- Add venueName and welcomeMessage (required on site templates; defaulted on interactive).
- Add optional coupleStory, groomStory, brideStory for Romântico.
- Add images object holding upload metadata (hero, groom, bride, gallery array) — not raw File blobs. Validated on the media step according to template rules.
- Keep existing masks and formats: wedding date as DD/MM/AAAA, CPF masked, WhatsApp masked.
- Payment step retains email, CPF, and includePlanner boolean (UI only for planner; no billing integration in this delivery).

### Step navigation

- WizardStep type expands to support up to four steps.
- parseStep clamps query param values to valid range for the active template's step count.
- Step href builder continues using /v2/criar/{slug}?step={n}.
- Intro, eyebrow, and stepper copy become dynamic (e.g. "ETAPA 2 DE 4") via helpers driven by wizard config.

### Media uploads

- Reuse existing image upload hook and upload API.
- New reusable image upload field component for v2 styling.
- New media step form component for templates that include a media step.
- localStorage draft stores only upload metadata (filename, dimensions, etc.), never binary blobs.

### Draft persistence

- Hook keyed as casarme:draft:v2:{slug}.
- Hydrate form default values on mount from stored draft when present.
- Debounced save on form watch.
- Clear draft after successful invitation creation.

### Submit and redirect flow

- Final payment step button enabled; validates payment fields then full form.
- Form-to-API mapper (second model-layer seam) responsibilities:
  - Map URL slug to internal template id (azul → blue, dourado → golden; garden and romantic unchanged)
  - Convert DD/MM/AAAA date plus weddingTime to ISO datetime for weddingDate
  - Apply interactive defaults for venueName and welcomeMessage when not collected
  - Build payload matching existing v1 create contract including images, isActive: false, cpf, email
- POST to existing invitations create endpoint.
- On success, redirect to /v2/checkout/{invitationId}.
- On failure, show error on payment step; preserve form and draft.

### Checkout placeholder page

- New v2 route: /v2/checkout/[invitationId].
- Server-rendered summary loading invitation by id (names, template, estimated total).
- Placeholder messaging: payment via PIX coming soon.
- No AbacatePay, Stripe, or billing session integration in this delivery.

### API correction

- Fix inviteType classification in the create endpoint: both blue and golden templates must be stored as interactive; garden and romantic as site.

```typescript
const INTERACTIVE_TEMPLATES = new Set(['blue', 'golden'])
inviteType: INTERACTIVE_TEMPLATES.has(template) ? 'interactive' : 'site'
```

### Dynamic step layout per template

**Dourado (3 steps):** couple → ceremony → payment

**Azul (4 steps):** couple → ceremony → media (hero required) → payment

**Verde Oliva (4 steps):** couple → ceremony (venue name, welcome message, address, WhatsApp) → media (hero required) → payment

**Romântico (4 steps):** couple → ceremony (venue name, welcome message, address, WhatsApp, optional music) → media (hero, groom, bride, gallery min 1, optional stories) → payment

## Testing Decisions

### What makes a good test

- Test external behavior at the model layer, not React component implementation details.
- Assert observable outcomes: which fields are required per template, which steps exist, whether validation passes or fails for given inputs, and whether the API payload shape is correct.
- Avoid testing CSS, component structure, or internal hook call order.

### Testing seam (confirmed)

Single model-layer seam consisting of:

1. **getWizardConfig(template)** — step count, step kinds, visible/required fields, per-step field lists, schema factory
2. **mapFormToApiPayload(values, template)** — slug-to-id mapping, date/time conversion, defaults, images assembly

UI components consume config only; manual QA covers visual and upload interactions in this delivery.

### Modules under test

- Wizard configuration module
- Extended Zod schemas (via schema factory per template)
- Form-to-API mapper
- Step parsing and href builders with dynamic step counts

### Prior art

- Existing create-invite model tests covering catalog helpers, step parsing, schema validation, and input masks in the create-invite feature test file.
- Extend that test file with template-config cases, conditional schema cases, and mapper cases following the same vitest describe/it style.

### Example test scenarios

- Dourado resolves to 3 steps; Azul, garden, romantic resolve to 4.
- Golden ceremony step does not require venueName; garden ceremony step does.
- Romantic media step rejects submission without hero, groom, bride, and at least one gallery image.
- mapFormToApiPayload converts azul slug to blue template id and DD/MM/AAAA + HH:MM to ISO weddingDate.
- mapFormToApiPayload applies interactive defaults for venueName and welcomeMessage on Dourado.
- parseStep clamps step=5 to max step for template.

## Out of Scope

- Real payment integration (AbacatePay PIX, Stripe checkout sessions)
- v2 thank-you / success page
- includePlanner add-on billing (UI checkbox remains; no product or charge)
- Post-creation preview page (/convite/preview/[id]) as checkout destination
- Automated UI or end-to-end tests for the wizard in this delivery
- New upload storage backend or image lifecycle changes
- Replacing or deprecating v1 create flows

## Further Notes

- The v2 page currently strips productLine and plan from catalog entries at the boundary; this must be restored for adaptive behavior.
- Static copy referencing "ETAPA X DE 3" must be made dynamic wherever step totals vary.
- Romantic Pro media fields are required in v2 (stricter than v1 where some Pro uploads were optional); this was an explicit product decision during grilling.
- Image metadata in localStorage may become stale if server-side upload files expire; couples may need to re-upload in that edge case.
- Future checkout work should consume invitationId from the placeholder route and branch payment provider by product line (AbacatePay for interactive, Stripe for site).
