## Problem Statement

The v2 experience relies heavily on arbitrary pixel values in Tailwind classes (for example fixed `text-[13px]`, `max-w-[1080px]`, `lg:h-[580px]`, and custom shadows). Because these values do not scale with the root font size, readability and layout suffer on larger viewports and when users increase browser zoom. The result is a polished marketing surface that is harder to access and less responsive than it should be, despite v2 already having semantic color and typography primitives in its theme.

## Solution

Replace arbitrary pixel-based Tailwind utilities across the v2 surface area with the default Tailwind token scale (rem-based spacing, type, radius, shadows, and layout). Add three documented surface-color tokens for recurring marketing backgrounds. Remove fixed section heights so content defines vertical rhythm. Standardize containers and grids. Validate the migration through manual review of v2 routes on mobile and desktop.

## User Stories

1. As a couple visiting the v2 home page on a large monitor, I want text and spacing to scale proportionally, so that headlines and body copy remain comfortable to read without feeling tiny.
2. As a couple using browser zoom at 125% or 150%, I want the v2 layout to reflow naturally, so that I can read content without horizontal clipping or overlapping elements.
3. As a couple on mobile, I want sections to size to their content, so that I am not forced through artificially tall empty areas caused by fixed desktop heights.
4. As a couple browsing template cards on the home page, I want card typography and padding to feel consistent with the rest of the page, so that the catalog reads as one cohesive product.
5. As a couple reading eyebrow labels and captions across home sections, I want micro-copy to remain legible, so that secondary information is not too small to parse.
6. As a couple viewing the hero collage, I want the decorative composition to remain visually intact, so that the page still feels premium after the token migration.
7. As a couple scrolling bento-style feature blocks, I want surface background colors to stay distinct and on-brand, so that each feature area remains visually scannable.
8. As a couple reading the FAQ section, I want the layout to breathe on wide screens without feeling cramped to an outdated fixed width, so that long answers remain readable.
9. As a couple reaching the final call-to-action, I want the section height to follow its content, so that the CTA does not float in excessive whitespace on some breakpoints.
10. As a couple starting invite creation from a catalog template, I want the wizard layout to remain clear on desktop, so that the form and template sidebar stay side by side when space allows.
11. As a couple filling wizard steps on mobile, I want the form to stack vertically, so that I can complete fields without horizontal scrolling.
12. As a couple uploading photos in the media step, I want upload fields and helper text to use consistent spacing tokens, so that the step feels as polished as the home page.
13. As a couple on the payment step, I want price and summary typography to match checkout, so that the purchase moment feels trustworthy and consistent.
14. As a couple on the checkout page, I want the PIX panel and invite preview to sit in a balanced two-column layout on desktop, so that I can pay while still seeing what I am buying.
15. As a couple on checkout mobile, I want stacked sections with readable type, so that QR code instructions and order summary are easy to follow.
16. As a couple opening the invite preview beside checkout, I want the preview frame and watermark shell to use standard radii and shadows, so that the preview feels integrated with v2 chrome.
17. As a couple after payment on the thank-you page, I want confirmation copy to use the same typographic scale as checkout, so that the end of the funnel feels coherent.
18. As a couple previewing a Blue template inside checkout, I want template-internal spacing to use rem tokens where touched, so that the rendered invite does not inherit arbitrary pixel sizing from shared template code.
19. As a designer reviewing the v2 design-system page, I want new surface tokens documented alongside existing brand colors, so that future UI work reuses the same vocabulary.
20. As a designer inspecting buttons in the design system, I want large button sizes to align with the shared button scale, so that CTAs feel consistent site-wide.
21. As a developer extending v2 sections, I want a single container width convention, so that I do not reintroduce one-off max-width pixel values.
22. As a developer adding a new marketing band, I want named surface colors instead of inline hex classes, so that palette drift is visible in one theme definition.
23. As a developer maintaining shared dialog and input components, I want focus rings and radii to use standard Tailwind widths, so that accessibility styling stays predictable.
24. As a developer working on the create-invite wizard, I want grid definitions expressed with standard column utilities, so that layout changes do not require bespoke fractional track syntax.
25. As a developer auditing v2 styling, I want semantic typography utility classes replaced with explicit text utilities in touched files, so that component styling is locally obvious without hunting global class definitions.
26. As a QA reviewer validating the migration, I want a short manual route checklist, so that I can sign off mobile and desktop without needing automated visual snapshots.
27. As a low-vision user relying on enlarged text, I want section content to expand vertically instead of being clipped by fixed heights, so that nothing is hidden below invisible fold constraints.
28. As a product owner, I want acceptable visual drift from nearest-token rounding documented upfront, so that engineering tradeoffs are explicit rather than surprises in review.
29. As a future agent implementing follow-up v2 pages, I want the home migration to establish patterns first, so that later feature folders copy the same token mapping rules.
30. As a maintainer of legacy v1 admin and convite routes, I want those areas left untouched, so that unrelated surfaces are not destabilized by a v2-focused refactor.

## Implementation Decisions

### Scope boundary

- Include all feature modules consumed by v2 routes: home, create-invite, checkout, invite-preview, and design-system.
- Include shared UI primitives used by those features (buttons, dialog, input, link, badge variants).
- Include template and preview code pulled into checkout (watermarked preview shell, real invite template wrapper, Blue template touch points).
- Exclude legacy v1 routes, admin surfaces, and unrelated component libraries outside the v2 dependency graph.

### Token strategy

- Use the default Tailwind spacing, typography, radius, shadow, and width scales only. Do not introduce custom rem tokens for individual pixel values except the three new surface colors.
- Map arbitrary values to the nearest standard token and accept minor visual drift (for example 13px body copy becoming `text-sm`, 52px buttons becoming `h-14`).
- Prefer explicit Tailwind utilities (`text-sm`, `leading-6`, `gap-4`) over global semantic typography classes (`.body-sm`, `.h2`) in every file touched by the migration.

### Theme extensions

- Extend the v2 inline theme with three surface colors named by visual tone:
  - `surface-sage` for the recurring soft green marketing background
  - `surface-peach` for warm accent bands
  - `surface-lilac` for purple-accent bands
- Document the three surface swatches in the design-system brand token model so `/v2/design-system` reflects the expanded palette.
- Replace inline hex background utilities in marketing sections with the new surface tokens where they match existing design intent. Keep existing semantic tokens (`secondary`, `accent`, `card`) where they already align.

### Layout and container conventions

- Standardize primary content wrappers to `max-w-7xl` with responsive horizontal padding (`px-6`, larger padding at desktop breakpoints as appropriate).
- Remove all fixed large-breakpoint section heights (`lg:h-[…]`). Let padding and content determine section height to improve zoom and content-length resilience.
- Home/marketing grids: simplify asymmetric fractional track definitions to `grid-cols-1` on small screens and `lg:grid-cols-2` on large screens with standard gap tokens.
- App-flow grids (create-invite wizard, checkout): keep two-column desktop layouts but express them with standard two-column utilities inside the shared container convention rather than pixel-based `minmax` tracks or oversized horizontal padding literals.

### Typography mapping rules

- Unify former 9–11px micro-copy into `text-xs` for legibility.
- Map common marketing sizes to the nearest scale step (for example low-thirties headings toward `text-3xl`/`text-4xl`, hero headlines toward `text-4xl`/`text-5xl`, low-twenty card titles toward `text-xl`).
- Replace checkout title `clamp()` usage with breakpoint-based utilities (`text-3xl lg:text-4xl`) to stay consistent with the utility-first approach chosen for this migration.

### Component and interaction styling

- Shared large buttons: `h-14` / `size-14` for the lg/icon-lg variants.
- Focus rings: replace 3px arbitrary rings with `ring-2`.
- Dialogs and cards: prefer `rounded-2xl`, `rounded-xl`, or `rounded-lg` instead of 14–21px arbitrary radii.
- Shadows: replace bespoke rgba shadow strings with `shadow-md` or `shadow-lg` according to elevation intent.
- Invite preview chrome: use `border-primary/90` instead of hard-coded gold hex borders where applicable.

### Hero collage exception

- Retain percentage-based absolute positioning inside the hero collage composition.
- Still migrate collage padding, shadows, and background colors to tokens within that subtree.

### Migration sequencing

1. Foundation: theme surface colors, shared UI primitives, brand-token documentation.
2. Home feature (largest concentration of arbitrary values).
3. Create-invite feature.
4. Checkout and invite-preview features plus Blue template touch points.
5. Design-system showcase alignment.
6. Manual verification pass.

### Acceptable visual drift (explicit)

- Content containers become wider than the former ~1080px design (`max-w-7xl` ≈ 1280px) — intentional for large-screen readability.
- Micro-copy increases slightly when unified to `text-xs`.
- Large buttons grow by a few pixels when moving to `h-14`.
- Sections without fixed heights may appear taller or shorter depending on content and image aspect ratios.

## Testing Decisions

### What makes a good test for this work

- Tests should validate externally observable layout and readability outcomes, not class-string implementation details.
- Because this is primarily a styling migration with accepted nearest-token drift, automated snapshot testing is not the primary seam; human review across real routes is.

### Testing seam (confirmed)

- **Manual route review** is the sole verification seam:
  - `/v2` home (hero, bento, template grid, FAQ, final CTA)
  - `/v2/criar/{slug}` wizard (form + sidebar, all step types worth spot-checking)
  - `/v2/checkout/{invitationId}` (PIX column + preview column)
  - `/v2/design-system` (brand colors including new surface tokens)
- Execute at mobile (~375px) and desktop (≥1280px) widths, including browser zoom at 125% on at least one critical page (home hero or checkout).

### Modules exercised during review

- Home marketing sections end-to-end composition.
- Create-invite wizard shell and at least one form step per major layout pattern.
- Checkout client layout with preview slot populated.
- Design-system brand token section.

### Prior art

- Previous v2 specs in this repo rely on manual QA checklists for visual/feature flows rather than pixel-diff automation.
- No existing Playwright visual regression suite is required for this delivery; do not add one unless explicitly requested later.

## Out of Scope

- Introducing a custom spacing or typography scale beyond Tailwind defaults (except the three surface colors).
- Refactoring the hero collage from absolute positioning to flex/grid layout.
- Migrating legacy v1 pages, admin tools, or shared legacy UI folders not imported by v2.
- Adding CI grep guards or lint rules banning arbitrary values (may be a follow-up).
- Typography fluidity via `clamp()` outside the checkout title change already specified.
- Reworking template designs beyond minimal token substitution in Blue template touch points.
- Changing semantic color meanings of existing theme tokens (`primary`, `secondary`, etc.).
- Automated visual regression or Percy/Playwright screenshot baselines.

## Further Notes

- Roughly 288 arbitrary `[Npx]` occurrences were identified across v2-related feature code prior to spec authoring; home marketing components account for the majority.
- The v2 globals theme already defines semantic colors, fonts, radius steps, and component typography utilities — this work completes the system by eliminating ad-hoc pixel literals in component markup.
- Grilling decisions captured in planning: default-scale mapping, nearest-token fidelity, home-first rollout, manual-only verification, and surface token naming by tone (`sage`, `peach`, `lilac`).
