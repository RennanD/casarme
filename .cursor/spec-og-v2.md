## Problem Statement

The CasarMe v2 funnel (`/v2`, create-invite wizard, checkout, thank-you) currently inherits Open Graph previews from the legacy v1 site. Those previews use an outdated visual language (pink/green gradients, system fonts, emoji logo) that does not match the v2 "Dourado Suave" design system (cream background, gold primary, Playfair + Inter typography). When v2 pages are shared on WhatsApp, iMessage, Slack, or social networks, the preview card misrepresents the product and breaks brand consistency.

Additionally, there is no dedicated OG image generation under the v2 route tree, and page-level metadata for v2 public routes is minimal or absent.

## Solution

Design and ship a shared-family of Open Graph images (1200×630) aligned with the v2 design system. Visual layouts are first composed in the existing Pencil mockup file (which already holds v2 tokens and screen references), then implemented as dynamic `ImageResponse` routes in Next.js so copy can stay in sync with the home and catalog models without re-exporting static PNGs.

Custom OG art applies only to public v2 routes: the v2 home and the four template-specific create-invite entry points. Transactional and internal routes inherit the generic v2 OG without dedicated artwork. SEO robots directives remain `noindex/nofollow` on v2 until launch; OG metadata is still wired so link previews work when URLs are pasted directly.

## User Stories

1. As a couple discovering CasarMe, I want the shared link to `/v2` to show a polished preview with v2 branding, so that I trust the product before clicking.
2. As a couple discovering CasarMe, I want the preview headline to reflect the v2 home message ("O começo de uma história merece um convite à altura."), so that the preview matches what they will see on the page.
3. As a couple discovering CasarMe, I want the preview to use cream and gold tones consistent with the live v2 site, so that the brand feels cohesive end-to-end.
4. As a couple discovering CasarMe, I want the preview to show real invite mockups rather than generic phone illustrations, so that I understand what I am buying.
5. As a couple choosing a template, I want `/v2/criar/azul` (and each template slug) to show a preview naming that template, so that I know which model the link refers to.
6. As a couple choosing a template, I want the create-invite OG to display the template thumbnail and price badge, so that price and visual style are visible before opening the link.
7. As a couple choosing a template, I want all four templates (Azul, Dourado, Verde Oliva, Romântico) to share the same OG layout with swapped mockup and copy, so that the family feels consistent across models.
8. As a marketer sharing CasarMe links, I want OG images generated dynamically from the same catalog data as the home page, so that price or copy updates do not require manual re-export of PNG assets.
9. As a developer maintaining v2, I want a single shared OG layout component with slots for eyebrow, headline, description, optional badge, and visual, so that new public v2 routes can reuse the pattern without duplicating layout code.
10. As a developer maintaining v2, I want OG color and typography tokens to mirror the design system brand swatches, so that drift between UI and previews is minimized.
11. As a developer maintaining v2, I want Playfair Display and Inter loaded correctly inside `ImageResponse`, so that rendered OG PNGs match the intended typography rather than falling back to system-ui.
12. As a developer maintaining v2, I want invalid template slugs in create-invite OG routes to 404 consistently with the page route, so that broken links do not produce misleading previews.
13. As a SEO-conscious product owner, I want v2 to remain `noindex/nofollow` for now, so that the unfinished funnel is not indexed while OG previews are still prepared for sharing.
14. As a SEO-conscious product owner, I want v2 home and create-invite pages to expose correct `og:title`, `og:description`, and Twitter card metadata, so that when indexing is enabled later the textual layer is already correct.
15. As a user on checkout (`/v2/checkout/[invitationId]`), I do not need a bespoke OG image, so that private payment URLs are not optimized for public sharing.
16. As a user on the thank-you page (`/v2/obrigado/[invitationId]`), I do not need a bespoke OG image, so that post-payment URLs do not leak invitation-specific visuals in previews.
17. As a designer, I want OG frames documented in Pencil at 1200×630 using existing v2 variables, so that engineering has a visual reference for implementation and future iteration.
18. As a designer, I want OG compositions to follow "Dourado Suave" rules: solid cream background, gold reserved for badges/accents, no decorative v1 gradients, so that previews feel refined rather than loud.
19. As a designer, I want template thumbnails in OG images to use a neutral 1px outline (black at 10% opacity), so that mockup edges read cleanly on cream backgrounds.
20. As a designer, I want mockup visuals placed in a secondary-surface card with soft elevation shadow rather than a hard border-only frame, so that depth matches v2 surface language.
21. As a QA reviewer, I want to verify OG PNG output at `/v2/opengraph-image` and `/v2/criar/{slug}/opengraph-image` for all four slugs, so that regressions are caught before launch.
22. As a QA reviewer, I want to compare Pencil screenshots against generated PNGs for typographic alignment and contrast, so that implementation fidelity is validated.
23. As an agent implementing this work, I want copy resolution for OG metadata centralized and unit-tested, so that headline/title/description mapping is safe to refactor.
24. As a future maintainer, I want the v1 root OG generator left unchanged in this iteration, so that legacy routes are not accidentally broken while v2 OG is introduced.
25. As a future maintainer, I want dynamic per-invite OG (`/convite/[slug]`) explicitly out of scope, so that this spec stays focused on the v2 funnel entry points.

## Implementation Decisions

### Scope and routing

- **In scope for custom OG art:** v2 home (`/v2`) and create-invite entry (`/v2/criar/[slug]` for slugs `azul`, `dourado`, `garden`, `romantic`).
- **Out of scope for dedicated art:** checkout, thank-you, design-system — these inherit the nearest parent OG (v2 layout tree) without new generators.
- **Delivery mechanism:** Next.js App Router `opengraph-image.tsx` files using `ImageResponse` with `runtime = 'edge'`, standard size 1200×630, `contentType = image/png`.
- **SEO:** Keep existing v2 layout robots `{ index: false, follow: false }`. Add page-level title/description/openGraph/twitter metadata on public routes only; do not change indexing policy in this work.

### Visual design (Pencil → code)

- Compose reference frames in the existing Pencil mockup file at 1200×630 using variables already defined there (`background #fffdfa`, `primary #d4a373`, `foreground #3e3e3e`, `secondary #f8f6f2`, `font-serif Playfair Display`, `font-sans Inter`).
- **Shared family layout:** left column (~55%) with eyebrow (Inter, uppercase, tracked), Playfair headline, Inter description (single line where possible), lowercase `casarme` wordmark; right column (~45%) with visual in a secondary-surface card and soft box-shadow.
- **Home visual:** collage echoing the v2 home hero — wedding garden photo plus at least one catalog template thumb.
- **Create-invite visual:** single catalog template thumb for the resolved slug; gold price badge using primary color.
- **Polish constraints (better-ui / emil-design-eng):** no v1 pink/green gradients; no system-ui fallback as primary typography; no decorative animation; image outlines on content photos/thumbs use neutral black at 10% opacity, not tinted neutrals.
- Optional subtle wax-seal pattern background at low opacity; must not harm text contrast.
- Take Pencil screenshots after frames are complete for visual QA against generated PNGs.

### Shared OG module

Introduce a dedicated v2 OG module under shared code (not inside feature folders) containing:

| Concern | Responsibility |
| --- | --- |
| Tokens | OG dimensions plus color/type constants mirroring design-system brand swatches |
| Font loading | Fetch Playfair Display + Inter for `ImageResponse` (Google Fonts pattern used by Next OG examples) |
| Layout | Single JSX layout accepting props: `eyebrow`, `headline`, `description`, optional `badge`, `visual` (image URL or element) |
| Copy resolution | Pure functions mapping route context → OG copy objects |

**Copy sources (single source of truth):**

- Home: reuse `HOME_HERO` eyebrow, headline, body.
- Create-invite: lookup slug in `HOME_CATALOG`; headline pattern `Crie seu convite {name}`; description from catalog entry; badge from `displayPrice`; visual from `imagePath`.
- Invalid slug: throw/not-found consistent with page behavior.

**Metadata copy (parallel to image copy):**

- Home title/description aligned with hero messaging and CasarMe suffix.
- Create-invite title pattern `Criar convite {Template} — CasarMe`; description from catalog entry.
- Next.js should auto-resolve sibling `opengraph-image` routes when openGraph images are not manually overridden with stale v1 paths.

### Route wiring

- Add `opengraph-image.tsx` at the v2 segment root for home.
- Add `opengraph-image.tsx` under the create-invite dynamic segment; resolve slug from route params; 404 on unknown slug.
- Add static `metadata` export on v2 home page.
- Add `generateMetadata` on create-invite page keyed by slug.
- Leave v2 layout robots unchanged; adjust default title fallback only if needed for non-public child routes.

### Assets

- Prefer existing public assets: home-redesigned hero photo, catalog thumbs under `/images/thumbs/`, optional `public/brand/pattern-wax-seal.png`.
- Resolve relative image paths to absolute URLs using site `metadataBase` (`https://casarme.site`) for OG image fetching.
- Do not introduce emoji-as-logo pattern from v1 OG generators.

## Testing Decisions

**Principle:** Test external, stable behavior — copy and metadata resolution — not JSX layout internals or pixel output from `ImageResponse` (Next/edge rendering is integration-level and validated manually).

**Single test seam (confirmed):** unit tests on the v2 OG copy-resolution module.

**What to test:**

- Home resolver returns expected eyebrow, headline, description, and metadata title/description derived from `HOME_HERO`.
- Each valid catalog slug (`azul`, `dourado`, `garden`, `romantic`) returns template name, price badge text, description, and absolute-ready image path.
- Unknown slug resolver signals failure (null throw pattern matching catalog lookup conventions) so OG route can 404.
- Metadata builder returns distinct titles per template slug.

**What not to test:**

- `ImageResponse` pixel output, font fetch success, or shadow/card CSS values.
- Export constants like 1200×630 unless they become part of the copy module (prefer manual verification for image route exports).

**Prior art:** Vitest unit tests on pure model/copy modules — e.g. create-invite catalog/copy tests and home catalog tests — same pattern: fixture catalog, `describe/it/expect`, no DOM.

**Manual verification checklist:**

- Hit `/v2/opengraph-image` and `/v2/criar/{slug}/opengraph-image` for all four slugs in dev.
- Inspect `og:image`, `og:title`, `og:description` on `/v2` and each create URL.
- Side-by-side compare Pencil screenshot vs generated PNG.

## Out of Scope

- Dedicated OG for checkout, thank-you, or design-system routes.
- Removing v2 `noindex/nofollow` or canonical/launch SEO work.
- Migrating or redesigning v1 root `/opengraph-image` and `/criar/opengraph-image`.
- Dynamic OG images for published invites (`/convite/[slug]`).
- Automated visual regression / screenshot testing of PNG output.
- Twitter-image separate routes (rely on openGraph + twitter card metadata inheritance).
- Changing WhatsApp or social sharing behavior beyond standard OG tags.

## Further Notes

- The Pencil mockup file already contains v2 screen frames (Home V2, create-invite steps, PIX checkout) and aligned design tokens — OG frames should be added alongside these, not in a separate file.
- v2 UI wordmark is text-based (`casarme` in Playfair); OG should follow that unless brand PNG logos are explicitly chosen during implementation — prefer text wordmark for consistency with live navbar.
- Even with `noindex`, OG tags matter for direct link pasting during beta and for eventual launch readiness.
- Implementation order: Pencil reference frames → shared OG module → route generators → page metadata → manual QA across five OG endpoints (home + 4 slugs).
