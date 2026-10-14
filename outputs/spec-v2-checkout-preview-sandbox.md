## Problem Statement

Couples on the v2 checkout page (`/v2/checkout/[invitationId]`) can pay via AbacatePay transparent PIX, but the experience has friction on mobile and in development. The invite preview uses a modal to enlarge on tap, which adds an extra interaction layer on a page where the preview should simply be visible. On mobile, the compact preview is visually squashed by CSS scale transforms, making it hard to judge how the invite will look. If a couple reloads the checkout page while a PIX charge is still pending, the QR code and copy-paste code can disappear even though a valid charge may still exist server-side. Finally, developers cannot easily test the full payment-to-thank-you flow locally without paying real PIX, yet mocking payment entirely would not validate the AbacatePay integration path used in production.

## Solution

Improve the v2 checkout preview and payment resilience without changing the core PIX flow from issue #27. Remove modal-based preview enlargement from checkout (keep the modal component in the codebase for potential future use). On mobile, show a scroll link below the payment column that smoothly scrolls to an in-page preview section; make the preview responsive with full-width legible rendering on small screens and a moderate scale on desktop sidebar. Fix charge reuse so that a pending charge missing `brCode` or `brCodeBase64` triggers a new PIX charge instead of rendering an empty payment panel. Add AbacatePay dev-mode sandbox support: real PIX from a dev API key, a dev-environment banner when the charge is in dev mode, and a "Simulate payment" button that calls AbacatePay's `simulate-payment` endpoint and relies on the existing polling + activation path (including email) — matching production behavior.

## User Stories

1. As a couple on desktop checkout, I want to see the invite preview in the right column without opening a modal, so that I can review my invite while paying.
2. As a couple on desktop checkout, I do not want an "Ampliar prévia" button, so that the page feels simpler and the preview is always visible.
3. As a couple on mobile checkout, I want a "Ver prévia do convite" link after the order summary, so that I can jump to the preview without hunting for it below the fold.
4. As a couple on mobile checkout, I want the scroll link to smoothly scroll to the preview section, so that navigation feels intentional and calm.
5. As a couple on mobile checkout, I do not want the scroll link on desktop, so that the layout stays clean where the preview is already visible.
6. As a couple on mobile checkout, I want the invite preview to render at full width without being squashed, so that I can actually read names, dates, and layout.
7. As a couple on mobile checkout, I want the preview to remain watermarked, so that I understand it is a protected pre-payment view.
8. As a couple on desktop checkout, I want the sidebar preview slightly scaled to fit the column, so that it looks polished without overwhelming the PIX panel.
9. As a couple on checkout, I want the preview section to have a stable anchor id, so that the mobile scroll link always lands in the right place.
10. As a couple who reloads checkout with a pending PIX, I want the QR code and copy-paste code to still appear, so that I can finish paying without starting over.
11. As a couple who reloads checkout when the stored charge is pending but missing PIX payload data, I want a fresh PIX generated automatically, so that I am never stuck with an empty payment panel.
12. As a couple returning to checkout with a valid pending PIX, I want the existing charge reused, so that I do not get duplicate charges unnecessarily.
13. As a developer testing checkout locally, I want PIX created through AbacatePay dev mode with my dev API key, so that the integration path matches production.
14. As a developer testing checkout locally, I want a visible banner when the charge is in AbacatePay dev mode, so that I know I am not in production.
15. As a developer testing checkout locally, I want a "Simulate payment" button when dev mode is active and the app runs in development, so that I can complete the flow without a real bank transfer.
16. As a developer testing checkout locally, I want simulate payment to call AbacatePay's official simulate-payment API, so that production behavior is validated rather than bypassed with a fake local mock.
17. As a developer testing checkout locally, I want the existing payment polling to detect simulated PAID status and redirect to thank-you, so that the client UX path matches real payments.
18. As a couple whose payment is simulated in dev, I want my invitation activated and post-payment email sent, so that the full delivery flow is exercised.
19. As a developer deploying to production, I want the simulate button and dev banner hidden in production, so that real customers never see test controls.
20. As a developer deploying to production, I want simulate-payment unavailable when using a production API key, so that sandbox endpoints cannot be triggered accidentally.
21. As a developer maintaining invite preview, I want the preview modal component preserved in the codebase but unused on checkout, so that it can be reused elsewhere later without re-building.
22. As a couple paying via PIX on checkout, I want polling, webhook activation, and email delivery to continue working as before, so that this delivery does not regress payment confirmation.
23. As a couple on checkout, I want PIX instructions, copy button, and order summary unchanged in behavior, so that only preview and dev tooling improve.
24. As a QA engineer, I want charge reuse logic covered by automated model tests including empty PIX payload edge cases, so that reload regressions are caught early.
25. As a product owner, I want mobile checkout to feel readable and trustworthy, so that couples on phones convert as well as desktop users.
26. As a couple on tablet, I want the mobile scroll link behavior below the large breakpoint, so that narrow viewports get the same wayfinding aid.
27. As a developer configuring environments, I want dev vs production controlled by AbacatePay API key only, without an extra CHECKOUT_SANDBOX env var, so that configuration stays minimal.
28. As a couple who already paid, I want checkout to still redirect to thank-you, so that this delivery does not change paid-state guards.
29. As a developer maintaining checkout orchestration, I want empty brCode/brCodeBase64 treated as non-reusable charge data, so that reuse decisions stay pure and testable at the model layer.
30. As a developer calling simulate payment from the UI, I want the server to proxy the AbacatePay request with the API key, so that secrets never reach the browser.

## Implementation Decisions

### Preview — checkout presentation

- Remove modal trigger, "Ampliar prévia" button, and click-to-open behavior from the checkout invite preview component.
- Keep the standalone preview modal component in the invite-preview slice; do not delete it.
- Remove checkout-only modal copy props passed from the checkout page (expand label, modal title, modal description).
- Checkout preview section receives a stable element id (e.g. `invite-preview`) for scroll targeting.
- Desktop: preview remains in the right grid column; use a sidebar-appropriate variant with moderate scale (~0.75), light watermark, minimal blur.
- Mobile: no CSS scale transform that squashes content; preview renders full-width with light watermark for legibility.
- Responsive variant styling lives in the watermarked preview shell (breakpoint-aware), not scattered across checkout layout.

### Mobile scroll link

- Render a text/button link with copy "Ver prévia do convite" at the end of the payment column (after order summary, before the preview block in document order).
- Visible only below the large breakpoint (`lg:hidden`).
- On click: smooth scroll to the preview anchor id.
- Desktop: no scroll link; preview always visible in the adjacent column.

### PIX charge reuse on reload

- Preserve existing orchestration: reuse pending non-expired charges; create new on expired, cancelled, or missing charge.
- Extend reuse eligibility: if an existing pending charge lacks `brCode` or `brCodeBase64`, treat it as non-reusable and create a new transparent charge, persisting the new `transparentChargeId` on the invitation.
- Encapsulate the empty-payload check in the checkout orchestration model as a pure function input (charge status, expiry, and PIX payload presence) so reload behavior is testable without hitting AbacatePay.
- Pass `devMode` from AbacatePay charge responses through server initialization to the checkout client for UI gating.

### AbacatePay dev-mode sandbox

- No separate `CHECKOUT_SANDBOX` environment variable. Dev vs production is determined by the AbacatePay API key (dev keys create charges with `devMode: true`).
- PIX creation continues via existing transparent create flow — dev mode returns real sandbox QR and copy-paste codes from AbacatePay.
- Add server-side AbacatePay client method for `POST /v2/transparents/simulate-payment?id={chargeId}`.
- Add a server route that validates invitation ownership (invitation id + charge id match), rejects in production unless charge is dev mode, proxies simulate-payment, and returns the updated charge status.
- Checkout client shows a discrete dev banner when `devMode` is true: message along the lines of "Ambiente de testes — pagamento simulado via AbacatePay".
- Show "Simulate payment" control only when `devMode === true` AND `NODE_ENV === 'development'`.
- On simulate click: call the server simulate route; do not activate invitation or redirect directly from the simulate handler.
- After simulation: existing ~3s polling via check-status detects `PAID`, runs `activateInvitationAndSendEmail` (including Resend email), and redirects to `/v2/obrigado/[invitationId]` — same path as a real PIX confirmation.
- Webhook `transparent.completed` may also fire from AbacatePay after simulation; existing idempotent activation must remain safe.

### Feature slice boundaries

- **invite-preview slice**: checkout preview component refactor, responsive shell variants; modal component untouched on disk.
- **checkout slice**: orchestration extension, AbacatePay simulate client, simulate route, checkout client banner + simulate button + mobile scroll link, copy updates.
- **app route**: checkout page passes `devMode` and simplified preview props.
- No cross-feature imports beyond existing app-level composition.

### Copy updates

- Add checkout copy for mobile scroll link label and dev-mode banner.
- Add copy for simulate payment button and loading/error states as needed.
- Remove or stop passing unused modal-related checkout copy at the page boundary.

## Testing Decisions

### What makes a good test

- Test external behavior at the model layer: given charge status, expiry, and PIX payload presence, assert reuse vs create decisions.
- Do not test CSS breakpoints, scroll animation mechanics, or React component structure.
- Do not test AbacatePay HTTP calls directly in unit tests; the simulate route and client are covered by manual QA in dev.

### Testing seam (proposed — same as issue #27, extended)

Single model-layer seam: **checkout orchestration model** in the checkout feature slice.

Pure functions accepting:
- Existing charge id (optional)
- Charge status (`PENDING`, `PAID`, `EXPIRED`, `CANCELLED`)
- Expiry timestamp (optional)
- PIX payload presence (`brCode` and `brCodeBase64` non-empty)

Asserting:
- Reuse when pending, not expired, and PIX payload complete
- Create when pending but PIX payload incomplete (reload fix)
- Existing scenarios unchanged: expired, cancelled, missing charge → create

UI (scroll link, dev banner, simulate button, responsive preview), simulate API route, and polling redirect remain manual QA for this delivery.

### Modules under test

- Checkout orchestration model (charge lifecycle decisions, including empty PIX payload edge case)

### Prior art

- `src/features/checkout/model/orchestration.test.ts` — vitest describe/it style with reuse vs create scenarios; extend with empty brCode/brCodeBase64 cases.

### Example test scenarios

- Pending charge, not expired, valid brCode + brCodeBase64 → reuse.
- Pending charge, not expired, empty brCode → create.
- Pending charge, not expired, empty brCodeBase64 → create.
- Pending charge, expired → create (unchanged).
- No existing charge → create (unchanged).

## Out of Scope

- Deleting the preview modal component or its exports
- Replacing AbacatePay dev mode with fully mocked local PIX (fake QR codes generated without API)
- Adding a `CHECKOUT_SANDBOX` environment variable
- Migrating legacy v1 hosted billing or Stripe flows
- Automated UI, E2E, or visual regression tests for preview layout
- Webhook HMAC signature validation
- Changing PIX expiry duration, pricing, or planner add-on logic
- TanStack Query or other polling library introduction
- Production exposure of simulate-payment controls
- Skipping post-payment email on simulated dev payments

## Further Notes

- Builds on the delivered v2 checkout from issue #27 (`ready-for-agent`); this spec is a focused UX and dev-experience follow-up, not a rewrite of the PIX integration.
- AbacatePay dev and production share the same API base URL; environment is determined by API key. Dev keys prefix pattern includes `abc_dev_`.
- AbacatePay simulate-payment documentation: `POST /v2/transparents/simulate-payment?id={chargeId}` — dev mode only; triggers webhooks and returns `PAID`.
- Polling remains UX-only; webhook remains authoritative — simulation should exercise both paths without changing that contract.
- Prior user story #7 in issue #27 (enlarged preview modal on checkout) is superseded for checkout by this spec; modal remains available for other surfaces if needed later.
