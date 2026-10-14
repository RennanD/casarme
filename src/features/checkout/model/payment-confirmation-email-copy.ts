export const PAYMENT_CONFIRMATION_EMAIL_COPY = {
  subject: (groomName: string, brideName: string) =>
    `CasarMe — Pagamento confirmado: convite de ${groomName} & ${brideName}`,

  preview: 'Compartilhe o link do convite com seus convidados.',

  eyebrow: 'PAGAMENTO CONFIRMADO',

  title: (groomName: string, brideName: string) => `Tudo certo, ${groomName} & ${brideName}!`,

  lead: 'Seu convite está ativo e pronto para compartilhar.',

  inviteLinkLabel: 'Link do convite',

  cta: 'Ver convite',

  plannerTitle: 'Planner de casamento',

  plannerDescription: 'Seu planner digital está pronto para download.',

  plannerCta: 'Baixar planner',

  retentionNote:
    'Guarde este e-mail para acessar seu link depois. Se não encontrar na caixa de entrada, verifique o spam e adicione nosso remetente aos seus contatos.',

  footerTagline: 'casarme · Convites digitais para celebrar',

  contactEmail: 'casarm.site@gmail.com',

  siteUrl: 'https://casarme.site',

  brandName: 'CasarMe',
} as const
