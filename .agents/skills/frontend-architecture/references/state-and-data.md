# Estado & Data Access

## Três tipos de estado — cada um com sua ferramenta

- **Server state** — dados que vivem no servidor, cacheados no client (respostas de API). → **TanStack Query**, sempre. Nunca no Redux.
- **UI state local** — modal aberto, tab selecionada, input de form. → `useState`/`useReducer` no componente.
- **UI state global** — usuário autenticado, tema, carrinho que sobrevive à navegação. → state manager, com parcimônia.

Regra recorrente das fontes: "80% do que vai pro Redux é server state que pertence ao TanStack Query."

## Ladder de UI state — suba só quando doer

1. **Local** (`useState`) — default sempre. Zero overhead, previsível.
2. **Context / provide-inject** — quando surgir prop drilling. Cuidado: re-render "tudo ou nada"; divida contexts pra otimizar.
3. **Zustand** — default pra estado global reativo. ~8KB, sem boilerplate, subscription seletiva. Adote em gargalo de performance (updates de alta frequência) ou estado global genuíno.
4. **Redux Toolkit** — escale pra cá só em lógica complexa/auditável: workflows multi-step, colaboração real-time, undo/redo, trilha de auditoria (DevTools time-travel). Custo: boilerplate + curva.

Suba de nível com dor observável, nunca preventivamente.

## Server state — TanStack Query

Ganhos que você não deve reimplementar à mão: caching, stale-while-revalidate, refetch em background, retries, dedup de request, invalidação, optimistic updates.

- O client de query fica na **Presentation**; o domain não conhece TanStack.
- Acesso ao dado sempre via `api/` (repository) — o hook de query chama o repository, não `fetch` cru no componente.
- Redux e TanStack não são mutuamente exclusivos: Redux pra UI global, TanStack pra server state.

## Data access — REST / GraphQL / BFF

Diversidade de clientes é o sinal mais forte pra GraphQL.

| Fator | Favorece REST | Favorece GraphQL |
|---|---|---|
| Necessidades dos clients | Parecidas | Diversas (mobile 5 campos, web 50) |
| Complexidade das fontes | Simples / poucos joins | Múltiplos serviços |
| Público da API | Externo / terceiros | Times internos |
| Profundidade das relações | Rasa | Profunda / aninhada |
| Volatilidade dos requisitos | Estável | Evolui rápido |

- **Under-fetching / over-fetching** são os problemas que puxam pra GraphQL ou pra endpoints especializados (`/cars/summary`, `/cars/full`).
- **Filtro REST**, do simples ao complexo: query params (cacheável) → OData-style → POST + body (queries complexas, perde cache HTTP) → híbrido.
- **BFF (Backend For Frontend)** — camada de API dedicada por tipo de client que agrega/transforma/otimiza. Custa infra + coordenação de time.
- **GraphQL** — um endpoint, client-driven. Cuidados: caching (use **APQ** pra recuperar cache HTTP), *depth attacks* (limite o nesting, ex. 5 níveis), query cost / DoS (análise de complexidade). Apollo Client/Server como ferramentas.

Coexistência > substituição: REST, GraphQL e BFF convivem no mesmo sistema conforme o requisito. GraphQL **não** é substituto do REST.
