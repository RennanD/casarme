# Corrigir preço e product ID do convite azul

**Status:** ready-for-agent  
**Labels:** casarme, pagamentos, convite-interativo

---

## Problem Statement

Casais que criam um convite com o **Modelo Azul** veem na tela de preview (após a criação) o preço do **Modelo Dourado** (R$ 25,90) em vez do preço correto do azul (R$ 30,90). Ao clicar em "Finalizar Pagamento", a cobrança na AbacatePay também é criada com o product ID e valor do dourado, cobrando menos do que deveria e vinculando ao produto errado no gateway.

## Solution

Centralizar preços, nomes e metadados de produto dos modelos interativos (dourado e azul) num módulo compartilhado. A tela de preview e a API de criação de billing passam a resolver preço, nome e product ID com base no `template` do convite salvo no banco. O modelo azul usa R$ 30,90, accent visual azul (#08265E) no resumo do pedido, e o product ID AbacatePay configurado via env var `ABACATEPAY_API_BLUE_INVITE_PRODUCT` (`prod_JycUteZGLFkMJKwPRQSBu04D`).

## User Stories

1. As a noiva/noivo que escolheu o Modelo Azul, I want to see R$ 30,90 no resumo do pedido na preview, so that I saiba exatamente quanto vou pagar antes de finalizar.
2. As a noiva/noivo que escolheu o Modelo Azul, I want the total do pedido destacado na cor azul do modelo, so that a experiência visual seja consistente com o convite que criei.
3. As a noiva/noivo que escolheu o Modelo Azul, I want that clicking "Finalizar Pagamento" creates a billing for R$ 30,90, so that I am charged the correct amount.
4. As a noiva/noivo que escolheu o Modelo Azul, I want the AbacatePay checkout linked to the blue product (`prod_JycUteZGLFkMJKwPRQSBu04D`), so that the payment gateway records the correct product.
5. As a noiva/noivo que escolheu o Modelo Dourado, I want to continue seeing R$ 25,90 na preview, so that nothing changes for my existing flow.
6. As a noiva/noivo que escolheu o Modelo Dourado, I want the golden accent color (#D4A373) preserved on the order total, so that the visual identity of the golden model remains intact.
7. As a noiva/noivo that escolheu o Modelo Dourado, I want billing created with the golden AbacatePay product ID, so that payments continue to work as before.
8. As a visitor browsing the homepage templates section, I want to see the same prices shown on preview and model pages, so that I am not surprised by a different price later.
9. As a visitor on the /modelos/azul page, I want the displayed price to match what I will pay at checkout, so that I can trust the pricing shown during discovery.
10. As a visitor on the /modelos/dourado page, I want the displayed price to remain R$ 25,90, so that marketing and checkout stay aligned.
11. As the Casarme platform, I want a single source of truth for interactive invite pricing, so that future price changes do not require editing multiple hardcoded values.
12. As the Casarme platform, I want billing metadata to reflect the actual invitation template, so that payment records are auditable per model.
13. As the Casarme platform, I want missing AbacatePay product env vars to fail loudly, so that we never silently charge the wrong product due to a fallback.
14. As a developer maintaining Casarme, I want pure functions for product lookup by template, so that pricing logic is testable without mocking HTTP or database.
15. As a developer deploying Casarme, I want a clear env var for the blue product ID, so that staging and production can point to the correct AbacatePay products independently.
16. As a noiva/noivo with an unsupported template on preview, I want a safe fallback instead of a broken page, so that I still understand what I am purchasing.
17. As the Casarme webhook handler, I want billing.paid events to continue activating invitations by billingId/invitationId, so that fixing product IDs does not break post-payment activation.
18. As a product owner, I want golden and blue models to have independently configurable AbacatePay product IDs via env vars, so that each model can be managed separately in the payment provider.
19. As a noiva/noivo paying via PIX, I want the checkout amount to match the preview total, so that I can confirm the PIX value before paying.
20. As a support agent, I want billing metadata.template to match the invitation template, so that I can diagnose payment issues per model.

## Implementation Decisions

- **New shared module**: Create an `invite-products` module as the single source of truth for interactive invite product metadata (golden and blue).
- **Product registry shape** (from prototype):

```typescript
const INTERACTIVE_INVITE_PRODUCTS = {
  golden: {
    label: "Modelo Dourado",
    productName: "Convite de Casamento - Modelo Dourado",
    displayPrice: "R$ 25,90",
    priceCents: 2590,
    accentColor: "#D4A373",
  },
  blue: {
    label: "Modelo Azul",
    productName: "Convite de Casamento - Modelo Azul",
    displayPrice: "R$ 30,90",
    priceCents: 3090,
    accentColor: "#08265E",
  },
} as const
```

- **Public API of the module**:
  - `getInviteProduct(template)` — returns product metadata or null for unknown templates
  - `getAbacateProductId(template)` — server-only; reads env vars per template
- **Env var mapping**:
  - Golden: `ABACATEPAY_API_GOLDEN_INVITE_PRODUCT` (existing)
  - Blue: `ABACATEPAY_API_BLUE_INVITE_PRODUCT` = `prod_JycUteZGLFkMJKwPRQSBu04D`
- **Error handling**: If env var is missing for a supported template, throw/return error — no silent fallback to golden product ID.
- **Billing API**: The create-billing endpoint reads `invitation.template` from the database and builds the AbacatePay payload dynamically (externalId, name, price, metadata.template).
- **Preview page**: Resolves product from invitation template; replaces all hardcoded price strings; applies accent color to order total.
- **Display price consolidation**: Homepage templates grid and both model landing pages import display prices from the shared module.
- **No schema changes**: Invitation model already stores `template`; no Prisma migration required.
- **No webhook changes**: Webhook identifies invitations by billingId and metadata.invitationId, not by product ID.

## Testing Decisions

- **Seam (confirmed)**: Test the `invite-products` module as pure functions — highest seam, single point across preview, billing, and marketing pages.
- **What makes a good test**: Assert external behavior (given template → correct price, name, accent; given env → correct product ID; missing env → explicit failure). Do not test implementation details of consumers.
- **Test cases**:
  - `getInviteProduct('blue')` returns priceCents 3090, displayPrice "R$ 30,90", accentColor "#08265E"
  - `getInviteProduct('golden')` returns priceCents 2590, displayPrice "R$ 25,90", accentColor "#D4A373"
  - `getInviteProduct('unknown')` returns null
  - `getAbacateProductId('blue')` returns env value when set; throws when unset
  - `getAbacateProductId('golden')` returns env value when set; throws when unset
- **Prior art**: No automated tests exist in the repo today; this will be the first unit test file. Manual verification remains for preview UI and AbacatePay checkout flow.

## Out of Scope

- Fixing `inviteType` assignment for blue invitations (currently saved as 'site' instead of 'interactive') — separate issue.
- Adding automated integration tests for the billing API route or E2E tests for AbacatePay checkout.
- Pricing changes for site-model templates (garden, romantic).
- Stripe payment flow (legacy; Casarme uses AbacatePay for interactive invites).
- Webhook signature validation improvements.

## Further Notes

- Deploy must set `ABACATEPAY_API_BLUE_INVITE_PRODUCT=prod_JycUteZGLFkMJKwPRQSBu04D` before release.
- Confirm `ABACATEPAY_API_GOLDEN_INVITE_PRODUCT` is already configured in production.
- Manual smoke test after deploy: create blue invite → verify preview R$ 30,90 + blue accent → initiate payment → confirm AbacatePay shows 3090 cents and blue product ID.
