## Parent

#34

## What to build

Incluir os cinco slugs estendidos no sitemap e nas imagens Open Graph. Remover modelos legados (Romântico, Verde Oliva garden, Azul/Dourado interativos) do catálogo público da home — convites existentes continuam renderizando normalmente via ids legados.

## Acceptance criteria

- [ ] Sitemap inclui `verde-oliva`, `rosa`, `azul`, `dourado`, `terracota` (demo e criar)
- [ ] Open Graph configurado para novos slugs com thumbnail e copy corretos
- [ ] Modelos legados não aparecem mais na listagem pública da home
- [ ] Convites existentes com ids `romantic`, `garden`, `blue`, `golden` continuam abrindo
- [ ] Testes de OG/sitemap passam para os novos slugs

## Blocked by

- #38
- #36
