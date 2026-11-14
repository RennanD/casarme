Implementado em `71e3b2b` na branch `issue-34/extended-invitation-catalog`.

**Entregue:**
- Thumbnails públicos em `public/images/thumbs/{verde-oliva,rosa,azul,dourado,terracota}/01.png`, referenciados no `HOME_CATALOG`
- Módulo puro `src/features/home/model/catalog-filters.ts` com `filterHomeCatalog`, `hasCatalogEntriesForCategory` e `isCategoryComingSoon`
- Testes isolados em `catalog-filters.test.ts` (7 casos, incluindo verificação de assets no disco)
- Lógica de filtro removida de `shared/catalog` e movida para o slice da home

**Nota:** export fiel do Pencil pendente — thumbnails provisionados a partir das capas legadas mais próximas enquanto o app Pencil estava offline. Re-exportar os frames do `mockup.pen` quando possível.
