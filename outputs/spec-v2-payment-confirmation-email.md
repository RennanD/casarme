## Problem Statement

Couples who complete payment through the v2 checkout flow receive a post-payment confirmation email that still uses the legacy v1 template: informal tone (emojis in subject and body), outdated visual styling (Arial/Georgia, ad-hoc colors), and code living outside the v2 feature-slice architecture. This creates a jarring experience after the polished v2 thank-you page and undermines brand trust at the moment of highest engagement — right after payment.

## Solution

Replace the v2 post-payment email with a professional confirmation message aligned to the v2 design system (Dourado Suave tokens, Playfair + Inter typography, layout mirroring `/v2/obrigado`). Move email infrastructure into `shared/email` (reusable layout shell) and checkout-specific copy/template into the `checkout` feature slice. Keep legacy v1 and Stripe email paths unchanged in this delivery.

## User Stories

1. As a couple who paid via v2 PIX, I want to receive a confirmation email with a professional tone, so that I trust CasarMe handled my purchase correctly.
2. As a couple who paid via v2 PIX, I want the email subject to mention CasarMe and my names, so that I can find it quickly in my inbox.
3. As a couple who paid via v2 PIX, I want the email subject to contain no emojis, so that it looks legitimate and avoids spam filters.
4. As a couple who paid via v2 PIX, I want the email body to confirm payment and state my invite is active, so that I know the next step is sharing.
5. As a couple who paid via v2 PIX, I want a clear, copy-friendly invite link in the email, so that I can forward it or reopen it later.
6. As a couple who paid via v2 PIX, I want a prominent "Ver convite" button linking to my invite, so that I can open it in one tap.
7. As a couple who paid with the planner add-on, I want the same email to include a planner download section, so that I receive everything in one message.
8. As a couple who paid without the planner add-on, I want no planner section in the email, so that the message stays focused.
9. As a couple who paid via v2 PIX, I want a reminder to check spam and save the sender, so that I do not lose access to my invite link.
10. As a couple who paid via v2 PIX, I want the email visual style to match the v2 thank-you page, so that the brand feels consistent end-to-end.
11. As a couple who paid via v2 PIX, I want CasarMe branding in the email header (heart icon + CasarMe wordmark, same as v1 home navbar), so that I recognize the sender immediately.
12. As a couple who paid via v2 PIX, I want footer contact information (casarme.site@gmail.com and casarme.site), so that I know how to reach support.
13. As a couple who paid via v2 PIX, I want the email preview snippet to describe sharing the invite, so that the inbox preview is informative.
14. As a developer maintaining checkout, I want post-payment email copy defined in checkout domain model (framework-agnostic), so that copy is testable and separate from React Email components.
15. As a developer maintaining checkout, I want the email template to live inside the checkout feature slice, so that v2 payment delivery stays co-located with checkout orchestration.
16. As a developer maintaining shared UI, I want reusable email layout primitives in `shared/email`, so that future emails (e.g. abandoned cart) can share tokens and shell without cross-feature imports.
17. As a developer maintaining boundaries, I want checkout to import email shell from `shared/` only — not from other features like design-system, so that feature-slice dependency rules hold.
18. As a developer maintaining post-payment flow, I want `activateInvitationAndSendEmail` to use the new template and copy, so that v2 webhook and polling paths send the updated email automatically.
19. As a developer maintaining legacy flows, I want v1 AbacatePay billing.paid and Stripe webhooks to keep using the old template in this delivery, so that migration is incremental and low-risk.
20. As a developer maintaining abandoned-cart emails, I want that template untouched in this delivery, so that scope stays focused on payment confirmation.
21. As a QA engineer validating v2 checkout, I want to test the full flow via simulate-payment and confirm the Resend email content, so that no separate preview route is required.
22. As a developer writing regression tests, I want unit tests on payment confirmation email copy helpers (subject, preview, static strings), so that copy changes are caught without mocking Resend or Prisma.
23. As a developer configuring Resend, I want the existing `RESEND_FROM_EMAIL` sender unchanged, so that deliverability settings stay stable.
24. As a couple using Outlook or Gmail, I want web fonts loaded with safe fallbacks (Georgia/Arial), so that the email remains readable even when custom fonts are blocked.
25. As a couple whose email client blocks images, I want the CasarMe wordmark text visible even if the heart icon is hidden, so that branding is not lost entirely.

## Implementation Decisions

### Scope and migration

- Change only the v2 post-payment path: `activateInvitationAndSendEmail` (called from AbacatePay `transparent.completed` webhook and `/api/payments/v2/check-status` polling).
- Do not modify v1 `billing.paid` inline email send, Stripe webhook, or abandoned-cart template in this delivery.
- Do not add an email preview dev route; validate via existing simulate-payment flow.
- Phase 2 (future): migrate v1/Stripe to the same template and remove legacy `email-template.tsx`.

### Architecture (feature slices + PDD)

- Create `shared/email` with:
  - Design tokens as inline-safe constants (colors, font stacks) mirroring v2 globals — background `#FFFDFA`, primary `#D4A373`, foreground `#3E3E3E`, muted `#6B6B6B`, border `#EEEAE4`, secondary `#F8F6F2`, card radius ~18px.
  - `EmailLayout` shell: Html, Head (Google Fonts link for Playfair Display + Inter), body background, centered container, shared footer.
  - `EmailButton` for primary CTA styling.
  - Named re-exports only from public `index.ts` — no `export *`.
- Extend `checkout` feature slice with:
  - `PAYMENT_CONFIRMATION_EMAIL_COPY` in domain model (plain TS, no React imports) including:
    - `subject(groomName, brideName)` → `CasarMe — Pagamento confirmado: convite de {groom} & {bride}`
    - `preview` → `Compartilhe o link do convite com seus convidados.`
    - Static strings for eyebrow, title, lead, card label, CTA, planner block, retention note, footer tagline, contact email, site URL.
  - `PaymentConfirmationEmail` React Email component composing shared shell + checkout copy.
  - Update post-payment repository function to use new copy helpers and template instead of legacy `EmailTemplate`.
- Dependency direction: `shared/email` ← `features/checkout` ← API routes. No feature-to-feature imports (design-system tokens duplicated into shared/email, not imported from design-system slice).

### Email content contract

Props passed to the template:

```
{
  groomName: string
  brideName: string
  invitationUrl: string
  plannerDownloadUrl?: string  // present only when includePlanner is true
  baseUrl: string             // for hosted brand assets (heart icon)
}
```

Subject and preview come from copy helpers, not hardcoded in the send call.

Body structure (top to bottom):

1. Header: heart icon (`/brand/icon-heart-cm.png` hosted at `{baseUrl}`) + "CasarMe" wordmark in Playfair, linked to casarme.site.
2. Eyebrow: "PAGAMENTO CONFIRMADO" (uppercase, muted, letter-spaced).
3. Title: "Tudo certo, {groom} & {bride}!"
4. Lead: invite is active and ready to share.
5. Card block: "Link do convite" label + URL in bordered box (mirrors thank-you page).
6. Primary CTA button: "Ver convite" → invitationUrl.
7. Conditional planner block (only if plannerDownloadUrl provided): title, description, "Baixar planner" button.
8. Retention note: save email, check spam, add sender to contacts.
9. Footer: "casarme · Convites digitais para celebrar", casarme.site@gmail.com, link to casarme.site.

Contact email: **casarme.site@gmail.com** (matches v2 home footer).

### Visual alignment with v2 thank-you page

- Layout mirrors `/v2/obrigado`: light background, white card with border, single primary button, professional copy aligned with existing `THANK_YOU_COPY` tone.
- No emojis anywhere in subject or body.
- Typography: Playfair for headings/wordmark, Inter for body; inline styles only (React Email constraint).

### Post-payment send behavior (unchanged semantics)

- Send only when invitation has an email address.
- Idempotent activation: if already paid and active, skip re-activation (existing behavior); email resend behavior on duplicate calls should remain as-is (do not introduce duplicate sends unless already the case).
- Planner download URL format unchanged: `{baseUrl}/api/planner/download?invitationId={id}` when `includePlanner` is true.

## Testing Decisions

### What makes a good test here

- Test **external, user-visible behavior** (copy strings, subject format) — not React Email component implementation details or Resend API calls.
- Do not mock Prisma or Resend for unit tests; integration validation is manual via simulate-payment.

### Seam (single primary seam)

**Checkout domain copy helpers** in the checkout model layer — the same seam used by existing checkout orchestration tests (`orchestration.test.ts` prior art).

Tests should assert:

- `subject('João', 'Maria')` returns `CasarMe — Pagamento confirmado: convite de João & Maria`
- Preview text matches spec constant
- Title interpolates couple names correctly
- Planner-related copy constants exist and are distinct from base copy
- Subject and preview contain no emoji characters
- Contact email constant is `casarme.site@gmail.com`

No snapshot tests on HTML render in this delivery (no prior art for `@react-email/render` in the repo). Manual QA via v2 simulate-payment confirms end-to-end email delivery.

### Modules tested

- Checkout model copy (new payment confirmation email copy section)

### Manual test plan

1. Create invitation via v2 wizard with planner enabled.
2. Simulate payment on checkout dev flow.
3. Verify redirect to `/v2/obrigado`.
4. Verify Resend received email with correct subject, invite link, planner block, and footer contact.
5. Repeat without planner — confirm planner block absent.

## Out of Scope

- Legacy v1 AbacatePay `billing.paid` email template swap
- Stripe webhook email template swap
- Abandoned cart email redesign
- Email preview route under design-system
- Consolidating v1 inline webhook send into `activateInvitationAndSendEmail`
- Removing `src/lib/email-template.tsx`
- ESLint boundary lint configuration for `shared/email` (optional follow-up)
- Reply-to header changes
- Including wedding date in email copy (not available as a settled requirement)

## Further Notes

- v1 home navbar brand mark is Lucide filled heart + "CasarMe" text; email uses hosted `icon-heart-cm.png` as the closest brand asset for image clients, with text wordmark as fallback when images are blocked.
- Grilling session decisions are captured above; implementation should follow frontend-architecture skill conventions (PDD layers, named public API exports, pain test — no new `features/email` slice yet).
- After this delivery, a small follow-up can point v1/Stripe sends at the same shared template and delete the legacy lib template.
