# Vocabulário canônico

Glossário do domínio (fonte: curso advancedfrontendcourse.com + convenções de comunidade). Termos técnicos em inglês por serem o vocabulário corrente.

## Camadas & building blocks

- **PDD (Presentation-Domain-Data)** — três camadas lógicas: UI, regras de negócio, acesso a dados. Separação lógica, não física.
- **Presentation Layer** — renderiza UI e captura input (components, hooks). Guarda **view logic** (loading, form, paginação).
- **Domain Layer** — regras e cálculos de negócio que existiriam em qualquer framework (entities, services). Vive em `model/`.
- **Data Layer** — comunicação externa (repositories, mappers, API clients). Vive em `api/`.
- **Business Logic** — lógica que sobreviveria a uma reescrita em outro framework ("premium ganha 15% off" é; "mostrar spinner" não é).
- **Framework-agnostic** — funciona sem React/Vue/Angular (TS/JS puro).
- **Entity** — objeto de domínio com identidade que junta dados + regras (Product, Cart). Métodos revelam intenção (`entity.canCheckout()`).
- **Service** — coordena operações entre múltiplas entities/sistemas. Só orquestra, não contém regra. Opcional.
- **Repository** — abstrai onde o dado mora (REST/GraphQL/localStorage). O domain não sabe a origem.
- **Mapper / DTO** — transformam entre formato da API (DTO) e domain object (`toDomain`/`toDTO`). Seam que impede mudança de API de quebrar o domain.

## Princípios comportamentais

- **CQS (Command-Query Separation)** — um método ou muda estado (command) ou retorna dado (query), nunca os dois.
- **Tell, Don't Ask** — diga ao objeto o que fazer; não pergunte os dados dele pra decidir por fora.
- **Tolerant Reader** — extraia só os campos que precisa da API, ignore o resto.
- **Separation of Concerns** — cada peça com uma responsabilidade clara.

## Organização

- **Feature slice / Vertical Slice** — organizar por feature de negócio; cada slice contém todas as camadas.
- **Screaming Architecture** — a estrutura de pastas grita o negócio, não a tecnologia (`cancel-booking`, não `deleteBooking`).
- **High Cohesion** — o que muda junto vive junto (dentro do slice).
- **Low Coupling** — o que muda independente não depende dos internals do outro (entre slices).
- **Vertical / Horizontal Scaling** — profundidade (mais camadas) vs largura (mais slices). Prefira horizontal.
- **Public API** — o `index.ts` que é o contrato do slice.

## Estado & dados

- **Server / Client / UI / Global State** — detalhes em `state-and-data.md`.
- **Prop Drilling** — passar dados por muitos níveis pra chegar num componente fundo.
- **Caching / Stale-While-Revalidate / Optimistic Update / Cache Invalidation** — mecânica que o TanStack Query dá de graça.

## Critérios de skip (pain test)

Adicione a camada só com dor real. Sinais pra adicionar: lógica de negócio duplicada; testar um cálculo exige montar componente; "onde isso vai?" aparece toda semana.

- **Pule Service** — CRUD simples, sem orquestração entre entities.
- **Pule Repository** — sem transformação de dado; chamada direta na query.
- **Pule Entity** — sem regra client-side; só exibição/CRUD simples.
- **Evite layering inteiro** — MVP < 2 semanas, site estático, CRUD simples.
- **Regra de três** — extraia pra `shared/` na terceira cópia, não antes.
