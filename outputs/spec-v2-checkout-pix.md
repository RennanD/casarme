## Problem Statement

Couples completing the v2 create-invite wizard land on a checkout placeholder that shows order summary but cannot pay. Payment still happens only through legacy v1 flows (hosted AbacatePay billing redirect from `/convite/preview`, or Stripe). The v2 experience is a dead end after invitation creation: no PIX QR code, no payment confirmation, no thank-you page with invite link, and no delivery of the optional wedding planner add-on.

## Solution

Wire the v2 checkout so couples pay via AbacatePay API v2 transparent PIX directly on `/v2/checkout/[invitationId]` — QR code and copy-paste code on page, matching the Pencil designs. On confirmed payment, redirect to a v2 thank-you page with copyable invite link and email confirmation message. Send a single post-payment email containing the invite link and, when the planner add-on was purchased, a download link for the planner file. Persist planner selection and v2 charge ID on the invitation. Keep legacy v1 AbacatePay billing untouched.

## User Stories

1. As a couple who completed the v2 wizard, I want to see a PIX QR code and copy-paste code on the checkout page, so that I can pay without leaving the CasarMe site.
2. As a couple on checkout, I want to see my order summary with template price and optional planner line item, so that I know exactly what I am paying for.
3. As a couple who selected the planner add-on, I want the R$ 9,90 planner charge included in the PIX total, so that I pay once for everything.
4. As a couple on checkout, I want to see a watermarked preview of my invite for all four templates, so that I feel confident about my purchase while waiting for payment.
5. As a couple on desktop checkout, I want the PIX panel and invite preview side by side as in the Pencil design, so that the page feels complete and trustworthy.
6. As a couple on mobile checkout, I want a stacked layout with QR code, copy-paste, and compact preview, so that I can pay easily on my phone.
7. As a couple on checkout, I want to tap the preview to open an enlarged modal, so that I can inspect my invite more closely before paying.
8. As a couple who copied the PIX code, I want clear instructions to paste it in my banking app, so that I know what to do next.
9. As a couple waiting for payment, I want a visible "awaiting payment" status, so that I understand the invite is not yet active.
10. As a couple who completes PIX payment, I want to be redirected automatically to a thank-you page, so that I know the payment succeeded without refreshing manually.
11. As a couple on the thank-you page, I want to copy my invite link with one click, so that I can share it immediately with guests.
12. As a couple on the thank-you page, I want to see that the invite link was also sent to my email, so that I have a backup if I lose the page.
13. As a couple who paid, I want to receive one email with my invite link, so that I can access the invite later from my inbox.
14. As a couple who paid with the planner add-on, I want the same email to include a planner download link, so that I receive everything in one place.
15. As a couple who purchased the planner, I want to download the planner file via a secure link that only works after payment, so that unpaid users cannot access it.
16. As a couple returning to checkout with a pending PIX charge, I want to see the existing QR code instead of a duplicate charge, so that I can finish paying without confusion.
17. As a couple returning to checkout with an expired PIX charge, I want a new QR code generated automatically, so that I can pay without manual intervention.
18. As a couple who tries to open the thank-you page before paying, I want to be sent back to checkout, so that I cannot access the invite link prematurely.
19. As a couple on any template (Azul, Dourado, Verde Oliva, Romântico), I want checkout preview to reflect my template, so that the experience is consistent across product lines.
20. As a couple on the payment step, I want my planner checkbox choice saved on the invitation, so that checkout charges the correct total.
21. As a developer maintaining checkout, I want AbacatePay v2 transparent checkout isolated from v1 billing code, so that legacy flows keep working during migration.
22. As a developer maintaining checkout, I want payment confirmation via webhook as source of truth, so that invite activation and email sending are reliable even if the user closes the browser.
23. As a developer maintaining checkout, I want client-side polling as a UX enhancement, so that couples are redirected promptly after PIX confirmation.
24. As a developer maintaining the codebase, I want checkout, invite preview, and create-invite organized as separate feature slices, so that boundaries stay clear and features do not cross-import.
25. As a developer maintaining invite preview, I want preview components recreated inside the invite-preview slice, so that checkout does not depend on legacy template components.
26. As a developer configuring AbacatePay, I want the webhook to handle `transparent.completed` events, so that v2 PIX payments activate invitations.
27. As a couple paying via PIX, I do not want CPF locked to the payer for now, so that payment is not blocked by provider limitations (future enhancement documented in code).
28. As a couple using the legacy v1 preview flow, I want it to continue working unchanged, so that existing customers are not broken.
29. As a QA engineer, I want automated tests on the checkout orchestration model, so that pricing, charge reuse logic, and payload shapes are regression-safe without brittle UI tests.
30. As a product owner, I want checkout UI aligned to Pencil frames (desktop pending, mobile pending, enlarged preview modal), so that design and implementation match.

## Implementation Decisions

### Scope and migration

- Implement payment only for the v2 flow: wizard submit → `/v2/checkout/[invitationId]` → PIX → `/v2/obrigado/[invitationId]`.
- Do not migrate legacy `/convite/preview` + hosted AbacatePay v1 billing in this delivery.
- Add v2 webhook event handling alongside existing v1 `billing.paid` handler.

### AbacatePay API v2 — transparent PIX

- Create charges via `POST /v2/transparents/create` with `method: "PIX"`.
- Poll status via `GET /v2/transparents/check?id=<chargeId>` every ~3 seconds on the checkout page.
- Store returned `brCode` (copy-paste) and `brCodeBase64` (QR image) on the client; never expose API key to the browser — server routes proxy create and check calls.
- Authenticate with existing `ABACATEPAY_API_KEY` bearer token.
- Include `metadata.invitationId`, `metadata.template`, and `metadata.includePlanner` on charge creation for webhook correlation.
- Do not enable `ensureSameTaxId` in this delivery. Leave an inline code comment marking it as a future change when the PIX provider supports payer CPF lock.

### Charge reuse and regeneration

```
Given invitation.transparentChargeId and check-status result:
  PENDING + not expired → reuse existing QR/brCode
  EXPIRED | CANCELLED | missing → create new charge, save new transparentChargeId
```

### Schema changes

- Add `includePlanner` boolean on Invitation, default false.
- Add `transparentChargeId` string unique nullable for v2 PIX charge IDs (`pix_char_...`).
- Keep existing `billingId` / `billingUrl` reserved for v1 legacy hosted billing only.

### Planner add-on

- Persist `includePlanner` from wizard through invitation create API.
- Add R$ 9,90 (990 centavos) to PIX `amount` when true.
- Show planner as separate line item in checkout order summary when true.
- Post-payment email includes planner download URL only when `includePlanner` is true.
- Planner download served via authenticated API route: accepts `invitationId` query param, verifies `paymentStatus === paid` and `includePlanner === true`, then streams the xlsx file as attachment.
- Planner file stored server-side (not a public static URL).

### Feature slice architecture

Three feature slices with dependency direction `shared → features → app`. Features do not import each other; route pages in `app/` compose public APIs from multiple slices.

**create-invite** (extend):
- Pass `includePlanner` through form-to-API mapper and invitation create endpoint.
- Remove checkout-specific logic that belongs in checkout slice (order summary with planner totals moves out).

**checkout** (new):
- Domain model: order summary, payment status types, checkout orchestration (totals, reuse vs create decision, AbacatePay customer/metadata payload).
- Data layer: AbacatePay v2 client, server route handlers for create-transparent and check-status.
- Presentation: PIX checkout page, QR panel, order summary card, payment status poller hook, thank-you page with copy-link.
- Copy aligned to Pencil frames: desktop pending, mobile pending; status badge "Aguardando pagamento".

**invite-preview** (new):
- Recreate preview components for all four templates (golden, blue, garden, romantic) inside this slice — do not import legacy template components.
- Watermarked preview shell with reduced scale, blur/opacity, diagonal "CASARME · PRÉVIA" watermark.
- Preview modal for enlarged view on click.
- Model layer maps invitation record + images to per-template preview props.

### Payment confirmation flow

```
Client: load checkout → server creates or reuses charge → render QR + preview
Client: poll check-status every ~3s
Client: on PAID → redirect to /v2/obrigado/[invitationId]

Server (parallel): webhook transparent.completed
  → find invitation by transparentChargeId or metadata.invitationId
  → idempotent activate (paymentStatus paid, isActive true, paidAt)
  → send unified email (invite link + optional planner download link)
```

Polling is UX-only; webhook is authoritative for activation and email.

### Thank-you page

- Route: `/v2/obrigado/[invitationId]`.
- Server guard: redirect to checkout if not paid.
- Show thank-you message, copyable invite URL (`/convite/{slug}`), note that email was sent to `{email}`.
- No Pencil mockup exists for obrigado — derive styling from existing v2 design system.

### Email

- Extend existing post-payment email template with optional planner section.
- Single email per successful payment; subject unchanged from current invite-ready email.
- Planner section: heading + download button linking to planner API route with invitationId.

### Webhook

- Extend existing AbacatePay webhook route to handle `transparent.completed` (apiVersion 2 envelope).
- Keep existing `billing.paid` handler for v1 legacy.
- Webhook signature validation remains deferred (existing stub behavior).

### Environment and dashboard

- Reuse `ABACATEPAY_API_KEY`, `NEXT_PUBLIC_BASE_URL`, `RESEND_FROM_EMAIL`.
- AbacatePay dashboard: register `transparent.completed` on existing webhook endpoint.

## Testing Decisions

### What makes a good test

- Test external behavior at the model layer, not React component structure or hook call order.
- Assert observable outcomes: line item totals, centavo amounts, reuse-vs-create decisions, and AbacatePay payload shapes given invitation + charge status inputs.
- Do not test CSS, QR rendering, or polling interval mechanics.

### Testing seam (confirmed)

Single model-layer seam: **checkout orchestration model** in the checkout feature slice.

Pure functions accepting:
- Invitation record (template, includePlanner, customer fields)
- Catalog pricing for the template
- Optional existing charge status (`PENDING`, `PAID`, `EXPIRED`, `CANCELLED`)

Asserting:
- Correct line items and total in centavos (with and without planner)
- Reuse vs create decision given charge status
- Customer and metadata payload shape for AbacatePay v2 create call

UI (PIX page, preview modal, thank-you copy button), webhook handler, and polling redirect are out of this seam — covered by manual QA in this delivery.

### Modules under test

- Checkout orchestration model (order summary + charge lifecycle decisions + payload builder)

### Prior art

- Existing create-invite model tests (catalog helpers, order total with planner, form mapper) in vitest describe/it style — extend planner persistence tests there only for the mapper seam edge; primary new tests live alongside checkout orchestration model.

### Example test scenarios

- Azul template without planner → total 3090 centavos, single line item.
- Azul template with planner → total 4080 centavos, two line items.
- Existing charge PENDING → orchestration returns reuse action, no new amount mutation.
- Existing charge EXPIRED → orchestration returns create action.
- No existing charge → orchestration returns create action with full customer payload including metadata.invitationId.

## Out of Scope

- Migrating legacy v1 `/convite/preview` hosted billing to v2 transparent checkout
- `ensureSameTaxId` CPF payer lock (documented as future TODO only)
- TanStack Query introduction for polling
- Webhook HMAC signature validation
- Automated UI or end-to-end tests for checkout pages
- Pencil design for thank-you page (use design system)
- Replacing or deprecating Stripe legacy flows
- Separate email for planner delivery
- Public unauthenticated planner file URL

## Further Notes

- Prior spec for v2 create-invite explicitly deferred payment; this spec supersedes those out-of-scope items for checkout, thank-you, and planner billing.
- Pencil reference frames: PIX desktop pending, PIX mobile pending, PIX enlarged preview modal.
- `includePlanner` defaults true in wizard UI today — persisted value must reflect actual user choice at submit time.
- Charge IDs use `transparentChargeId` field; do not overwrite v1 `billingId` values.
- Email invite link format remains `/convite/{slug}` consistent with existing webhook behavior.
- Planner xlsx source file exists in project outputs; copy to server-served location during implementation.
