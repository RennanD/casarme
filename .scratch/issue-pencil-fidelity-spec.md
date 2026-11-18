## Problem Statement

Os cinco convites estendidos (`verde-oliva`, `rosa`, `azul`, `dourado`, `terracota`) foram implementados nas issues #34 e #39, mas o resultado visual diverge significativamente dos frames de referência no Pencil (`mockup.pen`). Capas, tipografia, ordem das seções, estilos de ações rápidas, calendários e layouts de galeria não correspondem ao design aprovado. Isso quebra a promessa do catálogo — thumbnails e demonstrações não refletem o que o casal recebe — e impede validar a identidade visual distintiva de cada tema (CDI Minimalista, Editorial Romântico, Porcelain Framed, Selo Clássico, Boho Botânico).

## Solution

Refatorar os cinco templates React para reproduzir fielmente os frames Pencil, mantendo apenas três exceções acordadas:

1. **Local do evento:** substituir a foto estática da seção de endereço por um iframe de mapa com a localização derivada do endereço informado.
2. **Galerias:** implementar todas as variantes de galeria com Embla Carousel (via wrapper existente no projeto), preservando o layout visual distintivo de cada tema.
3. **Responsividade:** limitar a largura máxima do convite a `max-w-6xl` (1152px), centralizado, para escalar bem além da base mobile de 390px do Pencil.

Além disso, a `welcomeMessage` passará a ser exibida **somente** na seção de citação (estilo editorial itálico com monograma das iniciais do casal). A seção "Mensagem Convite" usará copy estática definida por tema, conforme o Pencil — sem duplicar a mensagem de boas-vindas do wizard.

## User Stories

1. As a casal que escolheu Verde Oliva CDI Minimalista, I want to ver o convite com capa em foto full-bleed, fade e botão de música como no Pencil, so that a identidade minimalista do tema seja respeitada.
2. As a casal que escolheu Verde Oliva, I want to ver os nomes em Great Vibes com decoração editorial, so that a tipografia corresponda ao mockup.
3. As a casal, I want to ver minha welcomeMessage como citação centralizada com monograma das iniciais, so that a mensagem personalizada apareça no lugar certo sem repetir em outra seção.
4. As a casal, I want to ver a seção "Mensagem Convite" com texto estático do tema, so that o fluxo de leitura siga o design sem confundir com a citação.
5. As a casal, I want to ver ações rápidas em cards brancos com ícones circulares coloridos, so that os botões de confirmar presença e como chegar correspondam ao Pencil.
6. As a casal, I want to ver a galeria Verde Oliva em carousel center-focus (slide central maior + laterais + indicadores), so that a variante carousel do tema funcione como desenhado.
7. As a casal que escolheu Rosa Florido, I want to ver capa com gradiente, nomes em Parisienne e ordem de seções do Pencil, so that o convite editorial romântico seja reconhecível.
8. As a casal Rosa, I want to ver a galeria em duas colunas 9:16 com coluna direita escalonada, so that o layout de colunas do Pencil seja preservado dentro do Embla.
9. As a casal que escolheu Azul Porcelain, I want to ver tipografia Tangerine + Playfair + Inter e molduras porcelain (bordas laterais), so that a identidade Porcelain Framed seja fiel.
10. As a casal Azul, I want to ver a galeria em polaroid stack sobreposto com navegação, so that a variante polaroid do Pencil seja respeitada (não colunas).
11. As a casal que escolheu Dourado Selo, I want to ver capa com foto hero e filete dourado, so that o selo clássico tenha a presença visual do mockup (não apenas iniciais em círculo).
12. As a casal Dourado, I want to ver calendário como faixa "Semana do evento" com dia ativo em círculo dourado, so that o calendário siga o Pencil (não o grid mensual genérico).
13. As a casal Dourado, I want to ver a galeria em layout mosaico (banner + grid), so that a variante mosaic do Pencil seja implementada (não polaroid).
14. As a casal que escolheu Terracota Boho, I want to ver Dancing Script, anéis boho na capa e paleta do Pencil, so that o tema boho botânico seja distinto.
15. As a casal Terracota, I want to ver galeria filmstrip horizontal com fade lateral, so that a variante filmstrip do Pencil funcione via Embla.
16. As a convidado, I want to ver mapa integrado (iframe) abaixo dos dados do local, so that eu localize o evento sem foto genérica de venue.
17. As a convidado, I want to navegar galerias com gestos/deslize e setas Embla, so that a interação seja fluida no mobile.
18. As a convidado no desktop, I want to ver o convite centralizado até 1152px de largura, so that o layout não fique excessivamente largo em telas grandes.
19. As a casal, I want to que demos `/demo/verde-oliva`, `/demo/rosa`, `/demo/azul`, `/demo/dourado` e `/demo/terracota` reflitam o design atualizado, so that eu possa validar antes de criar.
20. As a casal com convite publicado, I want to que links existentes continuem renderizando com os mesmos slugs/ids, so that convites já compartilhados não quebrem.
21. As a casal, I want to ver história do casal (`coupleStory`) na seção dedicada com foto lateral, so that o conteúdo do wizard apareça no slot correto.
22. As a casal, I want to ver calendário mensal editorial nos temas que o Pencil prevê (Verde, Rosa, Azul, Terracota), so that a data do casamento seja destacada visualmente.
23. As a casal, I want to ver seção de confirmação de presença via WhatsApp, so that o funil RSVP permaneça intacto.
24. As a casal, I want to ver footer com mensagem de encerramento, link CasarMe e monograma, so that o fechamento do convite siga o Pencil.
25. As a casal, I want to ouvir música de fundo via botão na capa, so that a integração YouTube existente continue funcionando.
26. As a convidado, I want to abrir "Como chegar" e o mapa embedado com o endereço do evento, so that eu chegue ao local sem app extra.
27. As a desenvolvedor, I want to reutilizar seções compartilhadas entre templates (hero, citação, ações, calendário, local, galeria, footer), so that correções visuais propaguem sem cinco implementações independentes.
28. As a desenvolvedor, I want to tokens de cor e tipografia sincronizados com variáveis Pencil por tema, so that futuras alterações de paleta tenham fonte única de verdade.
29. As a casal filtrando no catálogo, I want to que thumbnails continuem representando o visual correto após a refatoração, so that a expectativa na home bata com a demo.
30. As a convidado com leitor de tela, I want to que iframe de mapa e carousels tenham labels acessíveis, so that as seções interativas permaneçam usáveis.

## Implementation Decisions

### Escopo e referência visual

- Escopo: os cinco slugs estendidos (`verde-oliva`, `rosa`, `azul`, `dourado`, `terracota`). Templates legados (`blue`, `golden`, `garden`, `romantic`, `modern`) permanecem inalterados.
- Fonte de verdade visual: frames Pencil `wyhur` (Verde Oliva), `TIq1g` (Rosa), `M8JZEQ` (Azul), `BmNOt` (Dourado), `adw9H` (Terracota) em `mockup.pen`.
- Ordem canônica de seções (com variações de fundo/tipografia por tema): Capa → Nomes → Citação (`welcomeMessage`) → Ações → Mensagem (copy estática) → História (`coupleStory`) → Data editorial → Calendário → Onde será → Mapa (iframe) → Confirmação → Galeria → Footer.

### Conteúdo e dados do wizard

- `welcomeMessage` → exclusivamente na seção de citação (itálico, centralizado, monograma com iniciais de noivo/noiva). Remover uso de `welcomeMessage` na seção "Mensagem Convite" e em outros slots onde hoje aparece duplicada.
- `coupleStory` → seção "História do Casal" (condicional se vazia).
- "Mensagem Convite" → copy estática por tema, extraída do Pencil (não vem do wizard).
- Sem alteração de schema, API ou wizard nesta entrega.

### Tokens visuais por tema

Sincronizar paleta e fontes com variáveis Pencil:

| Tema | Decisões principais |
|---|---|
| Verde Oliva | bg `#FAFAF7`, accent `#6B7F5E`, Great Vibes (display), Cormorant, Lato |
| Rosa | bg `#FFFCFA`, accent `#C8898E`, Parisienne, Cormorant, Lato |
| Azul | bg `#F8FAFC`, accent `#1E4D7B`, light `#E8EFF6`, Tangerine, Playfair Display, Inter |
| Dourado | bg `#FFFCF5`, accent `#B8943F`, line `#C9A84C`, light `#F5EDD8`, Great Vibes, Cormorant, Lato |
| Terracota | bg `#FAF3EB`, surface `#F5E8DC`, accent `#C4704B`, Dancing Script, Cormorant, Lato |

### Shell e layout responsivo

- Wrapper compartilhado: `mx-auto w-full max-w-6xl`, fundo do tema, min-height viewport.
- Capas: full-bleed dentro do wrapper com alturas por tema (360–440px), gradiente fade inferior, botão de música posicionado conforme Pencil.
- Dourado: incluir filete/moldura dourada na capa e seção "Moldura Dourada" onde previsto no frame.

### Seções compartilhadas (refatorar/criar)

- Hero/capa com variantes por tema.
- Nomes do casal com layout tipográfico distinto por tema.
- Citação (`welcomeMessage` + monograma).
- Mensagem convite (copy estática).
- Ações rápidas: cards brancos com ícone em círculo colorido (substituir botões circulares grandes atuais).
- Data editorial e calendário: variante mensal (4 temas) vs faixa semanal "Semana do evento" (Dourado).
- Local + mapa: manter dados textuais do venue; substituir slot "Foto Local" por iframe Google Maps derivado do endereço (embed URL builder existente).
- RSVP WhatsApp e footer editorial.

### Galerias Embla (5 variantes visuais)

Todas usam Embla Carousel (wrapper shadcn existente). Layout por tema:

| Tema | Variante Pencil | Comportamento |
|---|---|---|
| Verde Oliva | Center-focus carousel | Slide central maior, laterais menores, dots indicadores |
| Rosa | Colunas 9:16 escalonadas | Duas colunas; direita com offset; Embla pagina pares ou scroll horizontal da grade |
| Azul | Polaroid stack | Polaroids sobrepostos com rotação; nav prev/contador/next |
| Dourado | Mosaico | Banner superior + row de 2 + row de 3 thumbs; Embla pagina grupos de fotos |
| Terracota | Filmstrip | Frames horizontais com fade lateral; dragFree/loop conforme Pencil |

### Integrações preservadas

- `resolveTemplateBranch` continua roteando os cinco ids estendidos.
- Demos e convites publicados usam os mesmos slugs.
- Música YouTube, WhatsApp RSVP e mapa externo ("Abrir no Google Maps") permanecem.
- Embla já instalado no projeto; não adicionar dependência nova.

## Testing Decisions

**Princípio:** testar comportamento externo observável, não detalhes de layout CSS ou estrutura de componentes React. Fidelidade visual pixel-perfect é validação manual contra frames Pencil.

**Seam principal (único foco de regressão automatizada):** módulo de **demo sample-data** — garantir payload completo e válido para cada slug estendido após a refatoração (nomes, endereço, welcomeMessage, imagens de galeria). Prior art: `sample-data.test.ts`.

**Seams de não-regressão (smoke, sem expandir cobertura):**

- `resolveTemplateBranch` — ids estendidos e legados inalterados. Prior art: `resolve-template-branch.test.ts`.
- `buildGoogleMapsEmbedUrl` (ou equivalente) — endereço válido produz URL de embed; endereço vazio retorna null. Prior art: testes existentes em venue-map, se houver.

**Fora dos testes automatizados:** comparação visual template vs Pencil, gestos Embla, render iframe em runtime, responsividade em viewports intermediárias. Checklist manual: demos dos cinco slugs no mobile (390px) e desktop (até 1152px).

## Out of Scope

- Alterações no wizard, schema de convite ou API de criação.
- Novo campo para citação bíblica ou mensagem convite editável.
- Templates legados interativos (`blue`, `golden`) e modelos antigos (`garden`, `romantic`, `modern`).
- Regeneração automática contínua de assets/thumbnails a partir do Pencil.
- Testes E2E ou screenshot testing automatizado.
- Redesign da home, catálogo ou thumbnails (salvo re-export pontual se necessário após validação visual).

## Further Notes

- **Parent/context:** complementa #34 (catálogo e taxonomia) e #39 (implementação inicial dos quatro temas + shell). Esta issue trata exclusivamente de **fidelidade visual** ao Pencil.
- **Decisão de produto (grilling):** `welcomeMessage` exclusiva na seção de citação; mensagem convite estática por tema.
- **Exceções ao Pencil (intencionais):** mapa iframe no lugar de foto de local; Embla em todas as galerias; `max-w-6xl`.
- **Verde Oliva** foi implementado nas primeiras entregas de #34 e compartilha o mesmo gap visual dos demais — incluído no escopo dos cinco.
- Export de referência gerado durante planejamento: `.scratch/pencil-templates.html` (Tailwind a partir dos frames).
- Ordem sugerida de implementação: tokens → seções shared → variantes de galeria → templates (Verde e Dourado primeiro por maior delta) → validação manual demos.
