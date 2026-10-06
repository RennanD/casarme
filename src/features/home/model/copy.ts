export type HomeObjection = {
  problem: string
  problemDescription: string
  solution: string
}

export type HomeHowItWorksStep = {
  iconKey: 'palette' | 'file-text' | 'sparkles'
  title: string
  description: string
}

export type HomeBenefit = {
  iconKey: 'sparkles' | 'dollar-sign' | 'map-pin' | 'heart'
  title: string
  description: string
}

export type HomeTestimonial = {
  name: string
  text: string
  imagePath: string
}

export type HomeHeroCollageImage = {
  src: string
  alt: string
}

export type HomeHeroCopy = {
  headlineLead: string
  scriptAccent: string
  headlineTail: string
  subcopy: string
  ctaLabel: string
}

export type HomeObjectionSectionCopy = {
  title: string
  ctaHeading: string
  ctaLabel: string
}

export type HomeHowItWorksSectionCopy = {
  title: string
}

export const HOME_OBJECTION_SECTION: HomeObjectionSectionCopy = {
  title: 'Você Não Precisa Ser Designer para Ter um Convite Lindo!',
  ctaHeading:
    'Pare de se preocupar com design. Deixe o CasarMe fazer isso por você!',
  ctaLabel: 'Criar Meu Convite',
}

export const HOME_HOW_IT_WORKS_SECTION: HomeHowItWorksSectionCopy = {
  title: 'Como Criar seu Convite Digital em 3 Passos Simples',
}

export const HOME_HERO: HomeHeroCopy = {
  headlineLead: 'Seu Convite Digital',
  scriptAccent: 'Interativo',
  headlineTail: 'Pronto em 5 Minutos',
  subcopy:
    'Sem Canva, sem designers caros e sem complicação. Escolha um dos nossos modelos de luxo, preencha os dados e receba seu link interativo instantaneamente logo após o pagamento.',
  ctaLabel: 'Criar Meu Convite',
}

export const HOME_HERO_COLLAGE: HomeHeroCollageImage[] = [
  {
    src: '/romantic-couple-wedding-photo-in-garden.jpg',
    alt: 'Casal romântico em jardim com flores',
  },
  {
    src: '/romantic-couple-wedding-natural-light-soft-focus.jpg',
    alt: 'Casal celebrando o casamento com luz natural',
  },
  {
    src: '/mockups.webp',
    alt: 'Preview de convites digitais de casamento em diferentes modelos',
  },
]

export const HOME_OBJECTIONS: HomeObjection[] = [
  {
    problem: 'Não tenho dinheiro para designer',
    problemDescription:
      'Designer custa R$ 500+ e demora semanas para entregar seu arquivo',
    solution:
      'Pague menos de R$ 30 e tenha seu convite pronto HOJE. Sem espera, sem taxas extras!',
  },
  {
    problem: 'Não sei usar Canva ou Photoshop',
    problemDescription:
      'Aprender do zero leva tempo e o resultado nem sempre fica como você sonhou',
    solution:
      'Esqueça o Canva. No CasarMe é só preencher os campos e seu convite de luxo está pronto!',
  },
  {
    problem: 'Tenho pressa para enviar',
    problemDescription:
      'Preciso enviar os convites agora e não posso esperar dias pela criação',
    solution:
      'Recebimento imediato. Pagou, recebeu seu link e já pode enviar pelo WhatsApp!',
  },
  {
    problem: 'Quero algo que funcione no celular',
    problemDescription:
      'JPGs estáticos são ruins de ler e não têm mapa ou confirmação',
    solution:
      'Experiência interativa nativa. Seus convidados confirmam com um clique e abrem o mapa direto!',
  },
]

export const HOME_HOW_IT_WORKS_STEPS: HomeHowItWorksStep[] = [
  {
    iconKey: 'palette',
    title: 'Escolha seu modelo de luxo',
    description:
      'Selecione entre nossos designs interativos premium focados em experiência mobile.',
  },
  {
    iconKey: 'file-text',
    title: 'Preencha seus dados em 2 minutos',
    description:
      'Nós guiamos você passo a passo. Sem necessidade de habilidades em design ou ferramentas.',
  },
  {
    iconKey: 'sparkles',
    title: 'Receba seu link na hora',
    description:
      'Logo após o pagamento, seu convite interativo está pronto para ser enviado instantaneamente.',
  },
]

export const HOME_BENEFITS: HomeBenefit[] = [
  {
    iconKey: 'sparkles',
    title: 'Criação em 3 cliques - Sem complicação',
    description:
      'Esqueça o Canva ou designers caros. Escolha um modelo de luxo, preencha os dados e pronto em 5 minutos.',
  },
  {
    iconKey: 'dollar-sign',
    title: 'Preço Justo - Recebimento Imediato',
    description:
      'Sem mensalidade, pague uma vez e receba seu link na hora. Mais barato que convites tradicionais e muito mais funcional.',
  },
  {
    iconKey: 'map-pin',
    title: 'MAPA INTERATIVO - Seus convidados não se perdem',
    description:
      'Botão direto para abrir o local no Google Maps ou Waze. Experiência premium para seus convidados.',
  },
  {
    iconKey: 'heart',
    title: 'Confirmação via WhatsApp - Lista Automática',
    description:
      'Foco total na facilidade: seus convidados confirmam com um clique e você organiza sua lista sem esforço.',
  },
]

export const HOME_TESTIMONIALS: HomeTestimonial[] = [
  {
    name: 'Ana & Lucas',
    text: 'Nossos convidados amaram o convite digital! Parecia um mini site do nosso amor com mapa e contagem regressiva.',
    imagePath: '/happy-couple-wedding-portrait.jpg',
  },
  {
    name: 'Mariana & Pedro',
    text: 'O convite de casamento digital ficou lindo e foi super fácil de criar. Recomendo demais para outros casais!',
    imagePath: '/smiling-couple-wedding-photo.jpg',
  },
  {
    name: 'Julia & Rafael',
    text: 'A música de fundo e galeria de fotos no convite deixaram tudo ainda mais especial e emocionante para nossos convidados.',
    imagePath: '/romantic-couple-wedding-celebration.jpg',
  },
]
