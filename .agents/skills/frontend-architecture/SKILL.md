---
name: frontend-architecture
description: Arquitetura de projetos frontend React/Next.js — guia decisões (onde vai a lógica, qual ferramenta de estado/dados, REST vs GraphQL), faz scaffold de feature slices e migra código existente pra convenção.
disable-model-invocation: true
---

# Frontend Architecture

Organize código frontend em **feature slices** — uma pasta por feature de negócio, cada uma com suas próprias camadas PDD dentro. Esta skill guia decisões de arquitetura, faz scaffold de slices novos e ajuda a migrar código existente pra esta convenção.

Esta convenção é a **fonte de verdade**. A skill não se adapta ao layout do repo — ela direciona o repo pra esta convenção e ajuda a trazer pra conformidade o que estiver fora. Código novo sempre nasce conforme.

Princípio-mãe: **comece simples, adicione estrutura quando doer** (*pain test*). Não crie camada, service ou abstração antes de sentir a dor que ela resolve.

## Modelo mental — dois eixos

**Eixo 1 — Feature slices (horizontal).** Organize por feature de negócio, não por tipo técnico. O top-level grita o domínio (*Screaming Architecture*): `features/checkout`, não `controllers/`. Escalar = adicionar slices (largura), não camadas (profundidade).

**Eixo 2 — Camadas PDD (vertical, dentro do slice).** Presentation → Domain → Data. Dependências fluem **só pra baixo**. Cada slice contém as três camadas; slices complementam as camadas, não as substituem.

Direção de dependência do projeto: **`shared → features → app`**. Features **não** importam umas das outras — a composição sobe pro `app/`. Isso mantém o grafo acíclico. (Regras e enforcement: `references/boundaries.md`.)

Regra dura: **lógica de negócio é framework-agnostic** — TS/JS puro em `model/`, sem imports de React. Componentes são presenters. Acesso a dados só via `api/` (repositories).

## Template do feature slice

```
src/features/<feature>/
  components/   # Presentation — componentes (recebem dados, exibem, capturam input)
  hooks/        # Presentation — view logic (loading, form, paginação)
  model/        # Domain — entities + services (agnóstico, sem React)
  api/          # Data — repositories, mappers, DTOs
  stores/       # UI state local da feature (Zustand) — só se precisar
  types/        # tipos da feature
  index.ts      # public API do slice — re-exports NOMEADOS
```

Crie só as pastas que a feature precisa. `stores/`, `types/`, `assets/`, `utils/` são opcionais. Código genuinamente reutilizável entre features vive em `shared/` (top-level), nunca dentro de um slice.

## Fluxo: guiar uma decisão

Quando a pergunta for "onde isso vai" ou "qual ferramenta":

1. **Onde vai este código?**
   - Regra/cálculo que existiria em qualquer framework → `model/` (Domain).
   - Renderização, input, estado de UI (spinner, form) → `components/` ou `hooks/` (Presentation).
   - Chamada de API, cache, transformação de formato → `api/` (Data).
   - Reutilizável e agnóstico de projeto → `shared/`.
   - Aplique o *pain test* antes de extrair service/repository/entity. Critérios de skip: `references/vocabulary.md`.
2. **Qual ferramenta de estado?** Server state → TanStack Query (sempre). UI local → `useState`. UI global → Zustand; escale pra Redux Toolkit só em fluxo complexo/auditável. Ladder e critérios: `references/state-and-data.md`.
3. **REST ou GraphQL?** REST-first; GraphQL quando há diversidade de clientes; BFF pra agregação. Matriz: `references/state-and-data.md`.

Feche toda recomendação com o *porquê* ancorado no eixo (agnosticismo, direção de dependência, pain test).

## Fluxo: scaffold de um feature slice

1. **Situe a slice na nossa convenção.** Leia a árvore (`src/`, `app/`) pra saber onde a nova slice entra sob `src/features/`. Toda slice nova nasce conforme o template abaixo — se o repo diverge, **não** adote o layout dele; use o fluxo de adoção pra trazer a área pra conformidade.
   - Feito quando: você sabe onde a slice mora sob `src/features/` e não introduziu nenhum desvio da convenção.
2. **Nomeie no domínio.** O nome grita o negócio (`reviews`, `cancel-booking`), nunca a tecnologia, e é consistente com os slices vizinhos.
3. **Crie as pastas do template** que a feature precisa (mínimo: `components/`, `model/`, `api/`, `index.ts`).
4. **Stub o `index.ts`** com re-exports **nomeados** (nunca `export *`) — só o que é public API do slice.
5. **Mantenha `model/` agnóstico** — sem imports de React nos stubs de domain.
6. **Ofereça o boundary lint** (`references/boundaries.md`) — só aplique a config no repo se a Bárbara confirmar.

Feito quando: toda pasta PDD necessária existe, `index.ts` só tem re-exports nomeados, `model/` não importa React, e nenhum import cruzado entre features foi introduzido.

## Fluxo: adoção / migração pra convenção

Quando a codebase (ou uma área dela) está fora da convenção, traga-a pra dentro — não a acomode.

1. **Diagnostique o gap.** Compare a estrutura atual com a convenção: falta `src/features/`? lógica de negócio em componentes? sem `index.ts`/public API? import cruzado entre features? server state no Redux? Use a skill `architecture-review` pra medir o ponto de partida.
2. **Priorize.** Monte um plano de migração ordenado por leverage/risco — comece pela área de maior dor e menor risco (ex: extrair uma slice pra `src/features/`, dar a ela um `index.ts`).
3. **Migre incrementalmente.** Um passo/slice por vez, com confirmação antes de editar. Cada passo mantém o build verde e move pelo menos uma área pra conformidade — nunca um big-bang.
4. **Trave a fronteira.** Ao migrar cada área, configure o boundary lint (`references/boundaries.md`) pra impedir regressão.

Feito quando: a área migrada bate com o template, tem public API, respeita `shared → features → app`, e o lint de fronteira está ativo.

## Mapa App Router (Next.js)

`app/` é **só roteamento** — mantenha fino. `page.tsx`/`layout.tsx`/`route.ts` importam a public API dos slices (`@/features/*`) e compõem; zero lógica de feature em `app/`.

- **Route groups** `(grupo)` — organizam seções sem afetar a URL.
- **Private folders** `_folder` — só pra peças genuinamente locais de uma rota (opt-out de roteamento).
- Feature usada por 1 rota pode começar colocada em `app/`; ao ser usada por 2+, promova pra `src/features/`.

Compatível com Pages Router: o eixo de slices independe do App Router; só o mapa de rotas acima é específico.

## Referências (carregue sob demanda)

- `references/state-and-data.md` — ladder de estado, server state (TanStack Query), matriz de data-access (REST/GraphQL/BFF).
- `references/boundaries.md` — direção de dependência, ESLint `import/no-restricted-paths`, política de public API.
- `references/vocabulary.md` — glossário canônico + critérios de skip de camadas (pain test).
