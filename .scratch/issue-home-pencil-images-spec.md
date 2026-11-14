## Problem Statement

A página inicial do CasarMe exibe imagens de convites desatualizadas ou que não pertencem ao acervo atual. Thumbnails provisórios, mockups de modelos legados (Romântico, Blue, Golden, Garden) e fotos genéricas de celular não refletem os cinco convites estendidos disponíveis no catálogo (Verde Oliva, Rosa Florido, Azul, Dourado, Terracota). Isso quebra a promessa visual da home — o casal vê na vitrine algo diferente do que encontra ao explorar demonstrações ou criar um convite — e enfraquece a credibilidade do catálogo recém-implementado.

## Solution

Reexportar e substituir todas as imagens de convite usadas na home a partir dos frames de referência no Pencil (`mockup.pen`), mantendo as fotos lifestyle existentes (jardim, celebração, casal no CTA). Os cinco modelos estendidos passam a ser distribuídos ao longo das seções narrativas da página, enquanto o grid de catálogo recebe thumbnails limpos com scroll parcial (capa + nomes + início da citação). Mockups contextuais no Pencil (celular, flatlay) substituem composições genéricas onde o convite é protagonista. A imagem Open Graph da home herda automaticamente a prévia atualizada do hero collage.

## User Stories

1. As a casal visitando a home, I want to ver thumbnails dos cinco modelos estendidos que correspondem ao design Pencil aprovado, so that eu reconheça o visual antes de clicar em "Ver demonstração".
2. As a casal, I want to que cada card do catálogo mostre capa, nomes e início da citação do convite, so that eu entenda o estilo editorial sem abrir a demo.
3. As a casal, I want to ver o modelo Verde Oliva em um mockup de celular nas seções "Como funciona" e "Experiência do convidado", so that eu visualize como o convite aparece no navegador mobile.
4. As a casal, I want to ver o modelo Terracota em um flatlay editorial na fase "Antes da comemoração", so that eu perceba o convite como peça de design, não como screenshot solto.
5. As a casal, I want to ver o modelo Rosa Florido no polaroid do hero collage, so that a primeira impressão da página destaque um convite do acervo atual.
6. As a casal, I want to ver o modelo Azul na seção de destaque de recursos estendidos (bento), so that eu associe funcionalidades premium a um visual concreto.
7. As a casal, I want to ver o modelo Dourado no polaroid do CTA final, so that o fechamento da página reforce outro estilo disponível no catálogo.
8. As a casal, I want to que os cinco modelos apareçam distribuídos ao longo da página (showcase-all), so that eu conheça a variedade do acervo sem repetir sempre o mesmo tema.
9. As a casal, I want to manter as fotos lifestyle de casamento (jardim, celebração, casal) nas seções emocionais, so that a página preserve calor humano sem substituir tudo por mockups de produto.
10. As a casal compartilhando o link da home, I want to que a imagem Open Graph mostre a prévia de convite atualizada, so that a vitrine social reflita o catálogo real.
11. As a casal, I want to que placeholders genéricos ([Noivo], [Noiva]) apareçam nos exports, so that nenhum dado pessoal fictício seja inventado nas imagens.
12. As a casal, I want to que textos essenciais (nomes, datas, endereços) não fiquem embutidos de forma definitiva nos PNGs exportados, so that as imagens funcionem como vitrine e não como convite final.
13. As a visitante mobile, I want to que o mockup de celular com Verde Oliva seja legível em telas pequenas, so that eu consiga identificar o layout do convite sem zoom.
14. As a visitante, I want to que o flatlay Terracota funcione com object-contain na seção "Antes da comemoração", so that o convite não seja cortado de forma estranha.
15. As a casal filtrando modelos, I want to que nenhuma imagem da home ativa referencie slugs legados (romantic, blue, golden, garden), so that eu não veja modelos fora do acervo.
16. As a casal explorando demos, I want to que a expectativa visual da home se alinhe ao design Pencil mesmo que os templates React ainda estejam em refatoração de fidelidade, so that o marketing prometa o visual aprovado no design.
17. As a mantenedor, I want to documentar frame IDs Pencil, região de crop e mapeamento seção→modelo, so that futuros re-exports sejam reproduzíveis manualmente.
18. As a mantenedor, I want to reutilizar o pipeline de otimização sharp existente para WebP/PNG, so that os novos assets mantenham qualidade e peso consistentes com a home atual.
19. As a mantenedor, I want to atualizar captions e textos alternativos quando a rotação de modelos mudar, so that leitores de tela descrevam o convite correto em cada seção.
20. As a mantenedor, I want to que testes automatizados verifiquem paths e rotação de modelos na configuração de marketing, so that regressões de wiring sejam detectadas sem inspecionar pixels.
21. As a convidado acessando via link compartilhado, I want to que a home carregue imagens otimizadas (WebP quality 92), so that a experiência permaneça rápida em conexões móveis.
22. As a casal, I want to que o grid de catálogo continue exibindo exatamente cinco modelos na ordem verde-oliva → rosa → azul → dourado → terracota, so that a navegação por templates permaneça previsível.
23. As a casal, I want to que preços, copy de marketing e CTAs da home não sejam alterados nesta entrega, so that a mudança seja estritamente visual.
24. As a mantenedor, I want to que os paths públicos dos assets permaneçam nos mesmos locais (thumbs por slug, home-redesigned para mockups), so that não seja necessário refatorar componentes além de captions/alts.
25. As a casal, I want to ver distinção visual clara entre os cinco temas (CDI Minimalista, Editorial Romântico, Porcelain Framed, Selo Clássico, Boho Botânico), so that eu consiga comparar estilos no grid.
26. As a visitante, I want to que a colagem do hero combine foto lifestyle com polaroid de convite real, so that a home equilibre emoção e produto.
27. As a mantenedor exportando do Pencil, I want to usar export manual seguido de script sharp, so that o fluxo seja simples e não dependa de automação contínua Pencil→CI.
28. As a casal, I want to que a seção Guest Experience reutilize o mesmo asset de celular da fase "Na hora de celebrar", so that a página mantenha consistência visual.
29. As a visitante de redes sociais, I want to que a OG image use a foto de jardim lifestyle + thumb do hero collage (Rosa Florido após rotação), so that o preview social combine marca emocional e produto.
30. As a mantenedor, I want to validar manualmente que nenhum export referencia frames ou slugs de modelos legados no Pencil "Home Redesigned" antigo, so that a vitrine esteja 100% alinhada ao acervo estendido.

## Implementation Decisions

### Escopo e fonte visual

- Escopo: todas as imagens de convite na home ativa + imagem Open Graph derivada do hero collage. Fotos lifestyle permanecem inalteradas.
- Fonte de verdade: cinco frames Pencil dos convites estendidos — Verde Oliva (`wyhur`), Rosa Florido (`TIq1g`), Azul (`M8JZEQ`), Dourado (`BmNOt`), Terracota (`adw9H`) em `mockup.pen`.
- Pencil prevalece sobre templates React para marketing, mesmo enquanto a refatoração de fidelidade visual (#42) estiver em andamento.

### Tipos de asset por contexto

- **Catálogo (5 cards):** screenshot limpo top-scroll exportado de cada frame Pencil (~520–600px de altura a partir da capa).
- **Seções narrativas:** mockups contextuais compostos no Pencil — celular (Verde Oliva), flatlay (Terracota), polaroids (Rosa no hero, Dourado no CTA).
- **Fotos lifestyle:** mantidas sem alteração (hero jardim, celebração, casal no CTA).

### Distribuição showcase-all dos modelos

| Seção | Modelo | Formato |
|-------|--------|---------|
| Grid catálogo | Todos os 5 | Screenshot top-scroll |
| Hero collage (polaroid) | Rosa Florido | Screenshot |
| Feature bento | Azul | Screenshot |
| Before Celebration fase 1 | Terracota | Flatlay |
| Before Celebration fase 2 + Guest Experience | Verde Oliva | Mockup celular (asset compartilhado) |
| Final CTA (polaroid) | Dourado | Screenshot |
| OG home | Rosa Florido | Derivado do hero collage via resolução OG existente |

### Pipeline de exportação

- Export manual do Pencil (PNG) → otimização via script sharp existente ou extensão dele.
- Thumbs: ~780×1040px (2× retina), PNG otimizado.
- Mockups marketing: WebP quality 92, variantes PNG onde OG ou testes referenciam PNG.
- Documentar frame IDs, região de crop e mapeamento em nota de export (`.scratch/home-images-export.md`).

### Ajustes de código (mínimos)

- Paths de imagem permanecem nos mesmos locais públicos; mudam apenas captions, alts e atribuição de modelos nas constantes de copy da home e no componente hero collage.
- Catálogo (`HOME_CATALOG`) não altera estrutura — apenas sobrescreve assets in-place.
- Resolver OG home continua derivando `templateThumbUrl` da cadeia hero collage → catálogo; atualizar expectativas de teste quando hero mudar de Azul para Rosa.

### Conteúdo nos exports

- Placeholders genéricos nos frames Pencil ([Noivo], [Noiva]); sem inventar nomes, datas, horários ou locais.
- Textos essenciais não embutidos de forma definitiva — imagens são vitrine, não convite final.

## Testing Decisions

**Princípio:** testar comportamento externo observável na configuração de marketing, não pixels de assets binários nem qualidade visual de exports Pencil.

**Seam principal (único foco de regressão automatizada):** módulo de **configuração de marketing da home** — constantes de copy, catálogo da home e resolução OG. Verificar:

- Cada entrada do catálogo da home aponta para thumb do slug estendido correto (`/images/thumbs/{slug}/01.png`).
- Rotação de modelos nas seções narrativas corresponde ao mapa acordado (Rosa hero, Azul bento, Verde Oliva phone, Terracota flatlay, Dourado CTA).
- Nenhuma constante ativa da home referencia slugs legados (romantic, blue, golden, garden) ou paths inexistentes.
- Resolução OG da home deriva thumb do hero collage atualizado.

Prior art: testes existentes em `home.test.ts` (catálogo, feature highlights, hero collage) e `copy.test.ts` do módulo OG v2.

**Fora dos testes automatizados:** fidelidade pixel-perfect dos exports Pencil, composição visual de mockups, legibilidade em viewports, peso final dos arquivos. Checklist manual: home desktop + mobile, OG preview, grid de 5 cards, seções Before Celebration, Guest Experience, hero e CTA final.

## Out of Scope

- Refatoração de fidelidade visual dos templates React (#42).
- Regeneração automática contínua de assets a partir do Pencil (CI/CD).
- Substituição das fotos lifestyle de casamento.
- Alteração de preços, copy de marketing, CTAs ou estrutura de seções da home.
- Testes E2E ou screenshot testing automatizado.
- Redesign dos frames "Home Redesigned" no Pencil (salvo composição pontual para mockups de export).
- Modelos legados (Romântico, Blue, Golden, Garden) e categorias "Em breve" (cover-photo, simple).
- Alteração do wizard, schema de convite ou API.

## Further Notes

- **Contexto:** complementa #34 (catálogo estendido na home) e #37 (thumbnails Pencil iniciais — agora desatualizados). Distinto de #42, que trata fidelidade React→Pencil nos templates renderizados.
- **Decisões de produto (grilling):** escopo full-home; mix screenshot + mockup contextual; manter lifestyle; Pencil como fonte; thumbs top-scroll; showcase-all; phone mockup Verde Oliva; export manual + sharp.
- **Manifest existente:** `public/images/demo/manifest.json` mapeia frames Pencil para demos — referência útil, mas esta entrega foca assets de marketing da home, não demo sample-data.
- **Risco aceito:** marketing pode divergir temporariamente das demos React até #42 concluir; decisão explícita de priorizar Pencil na vitrine.
