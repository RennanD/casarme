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
  eyebrow: string
  headlineLine1: string
  headlineLine2: string
  body: string
  ctaLabel: string
  ctaSecondaryLabel: string
  note: string
}

export type HomePhaseBlock = {
  eyebrow: string
  title: string
  description: string
  image: string
  alt: string
  caption?: string
  imageContain?: boolean
}

export type HomeBeforeCelebrationCopy = {
  eyebrow: string
  title: string
  subtitle: string
  phases: HomePhaseBlock[]
}

export type HomeDemoSectionCopy = {
  eyebrow: string
  title: string
  subtitle: string
  disclaimer: string
}

export type HomeFeatureHighlight = {
  title: string
  description: string
  eyebrow?: string
  image?: string
  alt?: string
}

export type HomeObjectionSectionCopy = {
  title: string
  solutionLabel: string
  ctaHeading: string
  ctaLabel: string
}

export type HomeHowItWorksSectionCopy = {
  title: string
  imagePath: string
  imageAlt: string
}

export type HomeTemplateSectionCopy = {
  title: string
  subtitle: string
}

export type HomeWhatsappBenefit = {
  iconKey: 'check-circle' | 'calendar' | 'message-circle'
  title: string
  description: string
}

export type HomeWhatsappSectionCopy = {
  title: string
  subtitle: string
  painHeading: string
  painBody: string
  benefits: HomeWhatsappBenefit[]
  footerNote: string
  primaryCtaLabel: string
  secondaryCtaLabel: string
  imagePath: string
  imageAlt: string
}

export type HomeWhyChooseSectionCopy = {
  title: string
}

export type HomeTestimonialsSectionCopy = {
  title: string
}

export type HomeFinalCtaCopy = {
  title: string
  body: string
  ctaLabel: string
}

export type HomeFooterCopy = {
  brandName: string
  copyright: string
}

export const HOME_OBJECTION_SECTION: HomeObjectionSectionCopy = {
  title: 'Você Não Precisa Ser Designer para Ter um Convite Lindo!',
  solutionLabel: 'Solução CasarMe:',
  ctaHeading:
    'Pare de se preocupar com design. Deixe o CasarMe fazer isso por você!',
  ctaLabel: 'Criar meu convite  →',
}

export const HOME_HOW_IT_WORKS_SECTION: HomeHowItWorksSectionCopy = {
  title: 'Como funciona',
  imagePath: '/mockups.webp',
  imageAlt: 'Prévia de convites digitais de casamento',
}

export const HOME_TEMPLATE_SECTION: HomeTemplateSectionCopy = {
  title: 'Escolha o modelo de vocês.',
  subtitle:
    'Um pagamento por convite, sem assinatura. Compare os recursos de cada modelo antes de escolher.',
}

export const HOME_WHATSAPP_SECTION: HomeWhatsappSectionCopy = {
  title: 'Confirmação de Presença via WhatsApp',
  subtitle:
    'Facilite o fechamento do seu buffet e tenha controle total dos convidados confirmados',
  painHeading: 'A Dor Real do Planejamento',
  painBody:
    'Você já passou pela dificuldade de fechar o buffet sem saber quantos convidados realmente vão comparecer? Com a confirmação de presença integrada via WhatsApp, você tem controle total e pode fechar o buffet com segurança, sabendo exatamente quantas pessoas estarão presentes no seu grande dia.',
  benefits: [
    {
      iconKey: 'check-circle',
      title: 'Controle Total',
      description:
        'Receba todas as confirmações diretamente no seu WhatsApp, organizadas e fáceis de contar',
    },
    {
      iconKey: 'calendar',
      title: 'Fechamento Seguro',
      description:
        'Feche o buffet com confiança, sabendo exatamente quantos convidados confirmaram presença',
    },
    {
      iconKey: 'message-circle',
      title: 'Simples e Rápido',
      description:
        'Seus convidados confirmam com um clique, sem complicação ou necessidade de apps extras',
    },
  ],
  footerNote:
    'Todos os nossos modelos incluem confirmação de presença via WhatsApp',
  primaryCtaLabel: 'Ver Modelos',
  secondaryCtaLabel: 'Criar meu convite  →',
  imagePath: '/modern-wedding-couple-photo.jpg',
  imageAlt: 'Casal de noivos em foto de casamento',
}

export const HOME_WHY_CHOOSE_SECTION: HomeWhyChooseSectionCopy = {
  title: 'Por que Mais de 500 Casais Escolheram o CasarMe?',
}

export const HOME_TESTIMONIALS_SECTION: HomeTestimonialsSectionCopy = {
  title: 'Depoimentos de Casais que Criaram seus Convites Digitais',
}

export const HOME_FINAL_CTA: HomeFinalCtaCopy = {
  title: 'Comece pelo convite.',
  body: 'Escolha a data, personalize o convite e veja a prévia. Depois, compartilhe o link com os convidados.',
  ctaLabel: 'Criar meu convite',
}

export const HOME_FOOTER: HomeFooterCopy = {
  brandName: 'CasarMe',
  copyright: 'CasarMe. Todos os direitos reservados.',
}

export const HOME_HERO: HomeHeroCopy = {
  eyebrow: 'Para o seu casamento',
  headlineLine1: 'O convite de todo mundo.',
  headlineLine2: 'Num só link.',
  body: 'A data, o local, a confirmação. Com um link, seus convidados abrem o convite pelo navegador — sem baixar aplicativo nem criar conta.',
  ctaLabel: 'Criar meu convite',
  ctaSecondaryLabel: 'Ver demonstração',
  note: 'A partir de R$ 25,90. Personalize antes de pagar.',
}

export const HOME_BEFORE_CELEBRATION: HomeBeforeCelebrationCopy = {
  eyebrow: 'Como funciona',
  title: 'Do convite à confirmação, sem complicar.',
  subtitle:
    'Personalizem o convite, compartilhem o link com os convidados e acompanhem as confirmações. Depois, o convite continua disponível.',
  phases: [
    {
      eyebrow: 'Antes da comemoração',
      title: 'Crie um convite com a cara de vocês.',
      description:
        'Escolham nome, data, local e mensagem. Vejam a prévia antes de pagar. Depois, compartilhem o link para imprimir ou enviar.',
      image: '/images/home-redesigned/invite-flatlay.webp',
      alt: 'Convite de casamento sobre mesa de madeira',
      caption: 'Casamento de Ana e Pedro',
      imageContain: true,
    },
    {
      eyebrow: 'Na hora de celebrar',
      title: 'Deixem o link à mão.',
      description:
        'Ao abrir o link, o convite carrega no navegador do celular. O convidado vê as informações e confirma presença, sem baixar aplicativo nem criar conta.',
      image: '/images/home-redesigned/invitation-phone.webp',
      alt: 'Convite digital aberto no celular',
      caption: 'Na mesa, um link. No celular, todos os detalhes.',
    },
    {
      eyebrow: 'Depois do grande dia',
      title: 'Um lugar para todas as informações.',
      description:
        'O link do convite continua disponível. Vocês revisam os detalhes, compartilham novamente e mantêm tudo organizado para quem ainda precisa confirmar.',
      image: '/images/home-redesigned/celebration-guests.webp',
      alt: 'Noivos e convidados durante a celebração',
      caption: 'o nosso sim, por todos os olhares.',
    },
  ],
}

export const HOME_DEMO_SECTION: HomeDemoSectionCopy = {
  eyebrow: 'Um exemplo para você explorar',
  title: 'Do convite ao compartilhar.',
  subtitle: 'Veja como o convite fica para quem recebe. Depois, explore a demonstração completa.',
  disclaimer: 'É só uma demonstração. Nenhum dado é enviado.',
}

export const HOME_INCLUDED_FEATURES = [
  'Mapa do local e endereço completo',
  'Convidados sem conta e sem instalar aplicativo',
  'Confirmação de presença pelo WhatsApp',
] as const

export const HOME_FEATURE_HIGHLIGHTS: HomeFeatureHighlight[] = [
  {
    eyebrow: 'No modelo Romântico',
    title: 'Tem detalhe que merece destaque.',
    description:
      'Música do YouTube, galeria com até 6 fotos e contagem regressiva. No modelo Romântico, o convite ganha ainda mais a cara de vocês.',
    image: '/images/thumbs/romantico/01.png',
    alt: 'Prévia do modelo Romântico',
  },
  {
    title: 'Um convite para as suas pessoas.',
    description:
      'O convite fica disponível pelo link que vocês compartilham. Vocês decidem com quem compartilhar — família, amigos e quem faz parte desse dia.',
  },
]

export const HOME_HERO_COLLAGE: HomeHeroCollageImage[] = [
  {
    src: '/images/home-redesigned/hero-wedding-garden.webp',
    alt: 'Foto de uma celebração de casamento em um jardim',
  },
  {
    src: '/images/thumbs/blue/01.png',
    alt: 'Prévia do convite Azul',
  },
]

export const HOME_PRODUCT_DEMO = {
  eyebrow: 'UMA EXPERIÊNCIA COMPLETA',
  title: 'Mais do que um convite. Um espaço para celebrar.',
  body: 'Veja como seus convidados vão receber os detalhes, confirmar presença e encontrar o caminho até a cerimônia.',
  points: ['Localização com mapa', 'Confirmação por WhatsApp', 'Informações do grande dia'],
  ctaLabel: 'Explorar a demonstração',
  imagePath: '/romantic-couple-wedding-photo-in-garden.jpg',
  imageAlt: 'Casal celebrando ao ar livre em um jardim',
}

export const HOME_BENTO_SECTION = {
  eyebrow: 'Cada detalhe, no lugar certo',
  title: 'O convite reúne o que os convidados precisam.',
  subtitle: 'Data, horário, endereço, mapa e confirmação ficam juntos no mesmo link.',
}

export const HOME_BENTO_FEATURES = [
  {
    iconKey: 'map-pin',
    title: 'O caminho até a cerimônia',
    description: 'Mapa e endereço organizados para seus convidados chegarem com tranquilidade. Incluído em todos os modelos.',
    imagePath: '/romantic-couple-wedding-celebration.jpg',
    imageAlt: 'Cerimônia de casamento ao ar livre',
    tone: 'card',
  },
  {
    iconKey: 'message-circle',
    title: 'Confirmação sem complicação',
    description: 'Seus convidados confirmam pelo WhatsApp. O recurso está incluído em todos os convites.',
    imagePath: '/smiling-couple-wedding-photo.jpg',
    imageAlt: 'Casal sorrindo no dia do casamento',
    tone: 'secondary',
  },
  {
    iconKey: 'images',
    eyebrow: 'NO MODELO ROMÂNTICO',
    title: 'Galeria de fotos',
    description: 'Uma galeria com até 6 fotos para deixar o convite com a cara do casal.',
    imagePath: '/happy-couple-wedding-portrait.jpg',
    imageAlt: 'Retrato de um casal de noivos',
    tone: 'secondary',
  },
  {
    iconKey: 'music-2',
    eyebrow: 'NO MODELO ROMÂNTICO',
    title: 'Música e contagem regressiva',
    description: 'Adicione música do YouTube e conte os dias até o grande momento.',
    imagePath: '/romantic-couple-wedding-natural-light-soft-focus.jpg',
    imageAlt: 'Casal de noivos em luz natural',
    tone: 'card',
  },
] as const

export const HOME_BENEFIT_STRIP = [
  { iconKey: 'map-pin', title: 'Localização com mapa', description: 'Endereço interativo para seus convidados.' },
  { iconKey: 'message-circle', title: 'Confirmação pelo WhatsApp', description: 'Respostas organizadas para vocês.' },
] as const

export const HOME_FAQ = [
  { question: 'O pagamento é único?', answer: 'Sim. Você paga uma única vez pelo modelo escolhido, sem mensalidade para manter o convite.' },
  { question: 'Por quanto tempo o convite fica disponível?', answer: 'O link do convite continua disponível permanentemente para vocês compartilharem com os convidados.' },
  { question: 'Os convidados precisam criar uma conta?', answer: 'Não. O convite abre pelo link no navegador do celular, sem instalar aplicativo ou criar uma conta.' },
  { question: 'Como funciona a confirmação pelo WhatsApp?', answer: 'Os convidados confirmam presença direto pelo WhatsApp, sem complicação.' },
  { question: 'Posso ver a demonstração antes de escolher?', answer: 'Sim. Vocês podem explorar uma demonstração completa antes de escolher o modelo.' },
] as const

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
    title: 'Deixe o convite com a cara de vocês.',
    description: 'Nome, data e modelo. Veja a prévia antes de pagar.',
  },
  {
    iconKey: 'file-text',
    title: 'Compartilhe o link na hora certa.',
    description: 'No grupo dos convidados, na cerimônia ou antes do grande dia.',
  },
  {
    iconKey: 'sparkles',
    title: 'Receba as confirmações e compartilhe.',
    description: 'Os convidados confirmam pelo WhatsApp. O link continua disponível.',
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
