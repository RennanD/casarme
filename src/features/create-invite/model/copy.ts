import type { StepKind } from './wizard-config'

export const CREATE_INVITE_HEADER = {
  brandLabel: 'casarme',
  draftStatus: 'Rascunho salvo automaticamente',
} as const

export const CREATE_INVITE_EYEBROW = 'ESCOLHA SEU MODELO  /  PERSONALIZE'

const INTRO_BY_KIND: Record<
  StepKind,
  { title: string; description: string }
> = {
  couple: {
    title: 'Vamos criar o convite de vocês.',
    description: 'Leva poucos minutos. No final, você revisa tudo antes de gerar o PIX.',
  },
  ceremony: {
    title: 'Agora, os detalhes da cerimônia.',
    description: 'Compartilhe onde será o grande dia e como os convidados podem confirmar presença.',
  },
  media: {
    title: 'Hora de personalizar com fotos.',
    description: 'Envie as imagens que vão dar vida ao convite de vocês.',
  },
  payment: {
    title: 'Só falta um passo para o convite.',
    description: 'Informe seus dados para gerar o PIX e receber o link de acesso.',
  },
}

const FORM_COPY_BY_KIND: Record<
  StepKind,
  { title: string; description: string; eyebrowSuffix: string }
> = {
  couple: {
    title: 'Dados do casal',
    description: 'Como vocês querem aparecer no convite?',
    eyebrowSuffix: '2 MINUTOS',
  },
  ceremony: {
    title: 'Onde e como celebrar',
    description: 'Essas informações vão direto para o convite.',
    eyebrowSuffix: '3 MINUTOS',
  },
  media: {
    title: 'Fotos do convite',
    description: 'Escolha as imagens que representam o casal e a celebração.',
    eyebrowSuffix: '4 MINUTOS',
  },
  payment: {
    title: 'Seus dados para o PIX',
    description: 'Com esses dados, geramos o PIX e enviamos o acesso ao convite.',
    eyebrowSuffix: 'PAGAMENTO',
  },
}

export function buildStepEyebrow(stepNumber: number, stepCount: number, suffix: string): string {
  return `ETAPA ${stepNumber} DE ${stepCount}  ·  ${suffix}`
}

export function getIntroCopy(kind: StepKind) {
  return INTRO_BY_KIND[kind]
}

export function getFormCopy(kind: StepKind, stepNumber: number, stepCount: number) {
  const copy = FORM_COPY_BY_KIND[kind]
  return {
    eyebrow: buildStepEyebrow(stepNumber, stepCount, copy.eyebrowSuffix),
    title: copy.title,
    description: copy.description,
  }
}

export function getContinueActionLabel(kind: StepKind): string {
  switch (kind) {
    case 'couple':
      return 'Continuar para a cerimônia'
    case 'ceremony':
      return 'Continuar'
    case 'media':
      return 'Continuar para o pagamento'
    default:
      return 'Continuar'
  }
}

export const COUPLE_STEP_FIELDS = {
  brideName: {
    label: 'Nome da noiva',
    placeholder: 'Ex.: Bárbara',
  },
  groomName: {
    label: 'Nome do noivo',
    placeholder: 'Ex.: Rennan',
  },
  weddingDate: {
    label: 'Data do casamento',
    placeholder: 'DD/MM/AAAA',
  },
  weddingTime: {
    label: 'Horário da cerimônia',
    placeholder: 'HH:MM',
  },
} as const

export const CEREMONY_STEP_FIELDS = {
  venueName: {
    label: 'Nome do local',
    placeholder: 'Ex.: Espaço Jardim das Flores',
  },
  welcomeMessage: {
    label: 'Mensagem de boas-vindas',
    placeholder: 'Ex.: Você está convidado para celebrar conosco!',
    helper: 'Texto de abertura que os convidados verão ao abrir o convite.',
  },
  venueAddress: {
    label: 'Endereço completo',
    placeholder: 'Rua, número, bairro, cidade — UF',
  },
  whatsapp: {
    label: 'WhatsApp para confirmações',
    placeholder: '(11) 99999-9999',
    helper: 'É por este número que os convidados enviarão a confirmação de presença.',
  },
  musicUrl: {
    label: 'Link da música no YouTube (opcional)',
    placeholder: 'https://youtu.be/...',
    helper: 'No YouTube, toque em Compartilhar → Copiar link e cole aqui.',
  },
} as const

export const MEDIA_STEP_FIELDS = {
  hero: {
    label: 'Foto de capa',
    helper: 'Esta imagem aparece no topo do convite.',
  },
  groom: {
    label: 'Foto do noivo',
    helper: 'Retrato individual do noivo.',
  },
  bride: {
    label: 'Foto da noiva',
    helper: 'Retrato individual da noiva.',
  },
  gallery: {
    label: 'Galeria de fotos',
    helper: 'Selecione até 6 fotos de uma vez. Pelo menos uma é obrigatória.',
  },
  coupleStory: {
    label: 'História do casal (opcional)',
    placeholder: 'Como vocês se conheceram...',
  },
  groomStory: {
    label: 'História do noivo (opcional)',
    placeholder: 'Um pouco sobre o noivo...',
  },
  brideStory: {
    label: 'História da noiva (opcional)',
    placeholder: 'Um pouco sobre a noiva...',
  },
} as const

export const PAYMENT_STEP_FIELDS = {
  email: {
    label: 'E-mail para acesso',
    placeholder: 'seu@email.com',
  },
  cpf: {
    label: 'CPF do pagador',
    placeholder: '000.000.000-00',
  },
} as const

export const PLANNER_ORDER_BUMP = {
  label: 'ADICIONE AO SEU PEDIDO',
  title: 'Planner de casamento',
  description: 'Um guia digital para organizar tarefas e prazos até o grande dia.',
} as const

export const PAYMENT_PRIVACY_NOTE =
  'Usaremos seu e-mail e CPF para identificar o pagamento e enviar o acesso. Seus dados são protegidos.'

export const CREATE_INVITE_ACTIONS = {
  continueToCeremony: 'Continuar para a cerimônia',
  continueToPayment: 'Continuar para o pagamento',
  generatePix: 'Gerar PIX e criar meu convite',
  createInvite: 'Criar meu convite',
  back: 'Voltar',
  changeTemplate: 'Trocar modelo',
  pixUnavailable: 'Pagamento via PIX em breve — estamos finalizando esta etapa.',
  submitError: 'Não foi possível criar o convite. Tente novamente.',
  submitting: 'Criando convite...',
} as const

export const SIDEBAR_COPY = {
  modelEyebrow: 'Seu modelo',
  featuresTitle: 'O que vem no convite',
  oneTimePayment: 'Pagamento único',
} as const

export const ORDER_SUMMARY_COPY = {
  totalLabel: 'TOTAL DO PEDIDO',
} as const

/** Matches home anchor id for the templates section. */
export const CHANGE_TEMPLATE_HREF = '/#templates'

