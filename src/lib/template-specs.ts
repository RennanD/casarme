export interface TemplateSpec {
  id: string
  name: string
  description: string
  shortDescription: string
  price: string
  plan: "Básico" | "Pro"
  color: string
  variant: "garden" | "romantico" | "modern"
  exampleLink: string
  features: string[]
  specifications: {
    colors: string[]
    style: string
    paper?: string
    size?: string
    customization: string[]
  }
  galleryImages: string[] // Placeholders por enquanto
  persuasiveCopy: {
    headline: string
    subheadline: string
    benefits: string[]
    cta: string
    seoDescription: string
  }
  relatedTemplateIds?: string[]
}

export const templateSpecs: Record<string, TemplateSpec> = {
  garden: {
    id: "garden",
    name: "Verde Oliva",
    description: "Template de convite de casamento botânico com elegância natural e tons de verde oliva",
    shortDescription: "Design botânico elegante para casamentos ao ar livre e celebrações naturais",
    price: "R$ 26,90",
    plan: "Básico",
    color: "#8B9D7F",
    variant: "garden",
    exampleLink: "/exemplo/garden",
    features: [
      "Design botânico elegante para convite digital",
      "1 foto de capa personalizada",
      "Localização interativa no mapa",
      "Confirmação de presença via WhatsApp",
      "Compartilhamento ilimitado do convite",
    ],
    specifications: {
      colors: ["Verde Oliva (#8B9D7F)", "Bege (#FAF3E0)", "Marrom Dourado (#D4A373)"],
      style: "Botânico e Natural",
      customization: [
        "Nomes do casal personalizados",
        "Data e horário do casamento",
        "Localização com mapa interativo",
        "Mensagem de boas-vindas personalizada",
        "História do casal",
        "Foto de capa do casal",
      ],
    },
    galleryImages: [
      "/images/thumbs/garden/01.png",
      "/images/thumbs/garden/02.png",
      "/images/thumbs/garden/03.png",
    ],
    persuasiveCopy: {
      headline: "Crie Seu Convite Verde Oliva em Minutos e Receba Imediatamente",
      subheadline:
        "Um convite digital elegante e botânico que captura a essência natural do seu amor. Perfeito para casamentos ao ar livre, celebrações rústicas e casais que amam a natureza.",
      benefits: [
        "✨ Criado e enviado instantaneamente para seu e-mail após a aprovação da compra",
        "🌿 Design único inspirado na natureza com tons de verde oliva e bege",
        "📱 Totalmente responsivo - funciona perfeitamente em celulares, tablets e computadores",
        "🔗 Link único e personalizado para compartilhar com todos os seus convidados",
        "💚 Fácil de personalizar com suas fotos e informações do casamento",
        "📧 Envio imediato - não precisa esperar dias ou semanas",
      ],
      cta: "Comece Agora - Receba Seu Convite em Minutos",
      seoDescription:
        "Crie seu convite de casamento digital Garden com design botânico elegante. Receba instantaneamente após a compra. Personalize com suas fotos e informações. Perfeito para casamentos ao ar livre.",
    },
    relatedTemplateIds: ["romantic"],
  },
  romantic: {
    id: "romantic",
    name: "Romântico",
    description: "Modelo de convite romântico com flores, galeria de fotos e música de fundo",
    shortDescription: "Design romântico com flores delicadas, perfeito para casamentos clássicos e elegantes",
    price: "R$ 37,90",
    plan: "Pro",
    color: "#E8B4B8",
    variant: "romantico",
    exampleLink: "/exemplo/romantic",
    features: [
      "Design romântico com flores para convite digital",
      "Fotos individuais do casal",
      "Galeria com até 6 fotos do casal",
      "História do casal personalizada",
      "Música de fundo (YouTube)",
      "Contagem regressiva até o casamento",
      "Localização interativa no mapa",
      "Confirmação de presença via WhatsApp",
    ],
    specifications: {
      colors: ["Rosa Suave (#E8B4B8)", "Rosa Pálido (#F5D5D8)", "Bege Rosado (#FFF8F3)"],
      style: "Romântico e Clássico",
      customization: [
        "Nomes do casal personalizados",
        "Data e horário do casamento",
        "Fotos individuais do noivo e noiva",
        "Galeria com até 6 fotos do casal",
        "História completa do casal",
        "Histórias individuais do noivo e noiva",
        "Música de fundo (link do YouTube)",
        "Contagem regressiva até o casamento",
        "Localização com mapa interativo",
        "Confirmação de presença via WhatsApp",
      ],
    },
    galleryImages: [
      "/images/thumbs/romantico/01.png",
      "/images/thumbs/romantico/02.png",
      "/images/thumbs/romantico/03.png",
      "/images/thumbs/romantico/04.png",
    ],
    persuasiveCopy: {
      headline: "Convite Romântico Completo - Receba em Minutos",
      subheadline:
        "O modelo mais completo e romântico para o seu grande dia. Com galeria de fotos, música, contagem regressiva e muito mais. Tudo isso entregue instantaneamente após a aprovação da compra.",
      benefits: [
        "💕 Criado e enviado imediatamente para seu e-mail após a aprovação da compra",
        "🌹 Design romântico com flores delicadas e tons rosados",
        "📸 Galeria completa com até 6 fotos do casal",
        "🎵 Música de fundo personalizada (YouTube)",
        "⏰ Contagem regressiva até o grande dia",
        "💬 Confirmação de presença integrada via WhatsApp",
        "📱 Totalmente responsivo e compartilhável",
        "✨ Entrega instantânea - sem espera, sem complicação",
      ],
      cta: "Crie Seu Convite Romântico Agora - Receba em Minutos",
      seoDescription:
        "Crie seu convite de casamento digital romântico com galeria de fotos, música e contagem regressiva. Receba instantaneamente após a compra. O modelo mais completo para seu casamento.",
    },
    relatedTemplateIds: ["garden"],
  },
}

export function getTemplateSpec(templateId: string): TemplateSpec | null {
  return templateSpecs[templateId] || null
}

export function getAllTemplateSpecs(): TemplateSpec[] {
  return Object.values(templateSpecs)
}

export function getRelatedTemplates(templateId: string): TemplateSpec[] {
  const spec = getTemplateSpec(templateId)
  if (!spec || !spec.relatedTemplateIds) return []
  
  return spec.relatedTemplateIds
    .map(id => getTemplateSpec(id))
    .filter((spec): spec is TemplateSpec => spec !== null)
}

