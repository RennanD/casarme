## Parent

#34

## What to build

Exportar thumbnails das cinco capas do Pencil como assets públicos por slug e referenciá-los no catálogo. Implementar módulo `catalog-filters` testável: dado catálogo + categoria + tema, retorna o subconjunto correto; categorias sem modelos ficam preparadas para UI "Em breve"; combinações sem resultados retornam lista vazia. Função pura, sem DOM.

## Acceptance criteria

- [ ] Thumbnails exportados do Pencil existem em paths públicos por slug (`verde-oliva`, `rosa`, `azul`, `dourado`, `terracota`)
- [ ] Entradas do catálogo referenciam os thumbnails corretos
- [ ] Função pura de filtros retorna todos os modelos da categoria `extended` com tema "Todos"
- [ ] Filtro por tema específico retorna apenas modelos daquele tema
- [ ] Categorias `cover-photo` e `simple` sem entradas retornam conjunto vazio
- [ ] Testes isolados do módulo de filtros passam

## Blocked by

- #35
