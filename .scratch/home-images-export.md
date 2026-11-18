# Home image export map

Source: `mockup.pen`, exported through the Pencil MCP on 2026-10-29 at 2× scale.

## Catalog mockups

Each catalog asset combines a phone view and a paper invitation using up to the first 1,100 CSS pixels of the matching Pencil invitation frame. The taller paper mockup reveals more invitation sections while keeping the original card composition. The captured model content uses the frame's generic placeholders.

| Model | Pencil frame | Asset |
| --- | --- | --- |
| Verde Oliva — CDI Minimalista | `wyhur` | `/images/thumbs/verde-oliva/01.png` |
| Rosa Florido — Editorial Romântico | `TIq1g` | `/images/thumbs/rosa/01.png` |
| Azul — Porcelain Framed | `M8JZEQ` | `/images/thumbs/azul/01.png` |
| Dourado — Selo Clássico | `BmNOt` | `/images/thumbs/dourado/01.png` |
| Terracota — Boho Botânico | `adw9H` | `/images/thumbs/terracota/01.png` |

## Home sections

| Section | Model or photo | Asset |
| --- | --- | --- |
| Hero collage | Rosa Florido top-scroll screenshot, with the existing garden lifestyle photo | `/images/home-redesigned/hero-invitation-rosa.webp` |
| Feature bento | Azul top-scroll screenshot | `/images/home-redesigned/invitation-azul.webp` |
| Before the celebration | Terracota flatlay composition | `/images/home-redesigned/invite-flatlay.webp` |
| Guest experience and celebration steps | Verde Oliva phone composition | `/images/home-redesigned/invitation-phone.webp` |
| Final CTA | Dourado top-scroll screenshot, with the existing couple lifestyle photo | `/images/home-redesigned/invitation-dourado.webp` |
| Hero tablet | Verde Oliva invitation placed into the tablet held by the garden couple | `/images/home-redesigned/hero-wedding-garden-with-invitation.webp` |

## Reproduction

The raw exports are in `.scratch/issue-43/pencil-exports/`. Run `node .scratch/issue-43/build-home-mockups.mjs` from the repository root to regenerate the composed assets with Sharp. Catalog art uses each Pencil frame's first 780×1040 export pixels; the hero screenshot uses the Rosa frame at the same crop, and larger editorial mockups use the first 780×1300 export pixels.
