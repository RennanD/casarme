import type { WizardStep } from './steps'

export const CREATE_INVITE_HEADER = {
  brandLabel: 'casarme',
  draftStatus: 'Rascunho salvo automaticamente',
} as const

export const CREATE_INVITE_EYEBROW = 'ESCOLHA SEU MODELO  /  PERSONALIZE'

export const CREATE_INVITE_INTRO: Record<
  WizardStep,
  { title: string; description: string }
> = {
  1: {
    title: 'Vamos criar o convite de vocês.',
    description: 'Leva poucos minutos. No final, você revisa tudo antes de gerar o PIX.',
  },
  2: {
    title: 'Agora, os detalhes da cerimônia.',
    description: 'Compartilhe onde será o grande dia e como os convidados podem confirmar presença.',
  },
  3: {
    title: 'Só falta um passo para o convite.',
    description: 'Informe seus dados para gerar o PIX e receber o link de acesso.',
  },
}

export const CREATE_INVITE_FORM_COPY: Record<
  WizardStep,
  { eyebrow: string; title: string; description: string }
> = {
  1: {
    eyebrow: 'ETAPA 1 DE 3  ·  2 MINUTOS',
    title: 'Dados do casal',
    description: 'Como vocês querem aparecer no convite?',
  },
  2: {
    eyebrow: 'ETAPA 2 DE 3  ·  3 MINUTOS',
    title: 'Onde e como celebrar',
    description: 'Essas informações vão direto para o convite.',
  },
  3: {
    eyebrow: 'ETAPA 3 DE 3  ·  PAGAMENTO',
    title: 'Seus dados para o PIX',
    description: 'Com esses dados, geramos o PIX e enviamos o acesso ao convite.',
  },
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
} as const

export const CEREMONY_STEP_FIELDS = {
  venueAddress: {
    label: 'Endereço da cerimônia',
    placeholder: 'Rua, número, bairro, cidade — UF',
    helper: 'Inclua o nome do espaço ou da igreja para ajudar seus convidados.',
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
  back: 'Voltar',
  changeTemplate: 'Trocar modelo',
  pixUnavailable: 'Pagamento via PIX em breve — estamos finalizando esta etapa.',
} as const

export const SIDEBAR_COPY = {
  modelEyebrow: 'Seu modelo',
  featuresTitle: 'O que vem no convite',
  oneTimePayment: 'Pagamento único',
} as const

export const ORDER_SUMMARY_COPY = {
  totalLabel: 'TOTAL DO PEDIDO',
} as const

/** Matches home anchor id for the templates section — composed at app layer, not imported cross-feature. */
export const CHANGE_TEMPLATE_HREF = '/v2#templates'
