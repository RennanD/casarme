export const CHECKOUT_COPY = {
  eyebrow: 'CHECKOUT',
  title: 'Finalize seu pagamento',
  description: 'Escaneie o QR Code ou copie o código PIX para concluir a compra do convite.',
  orderSummary: 'Resumo do pedido',
  pixInstructions:
    'Abra o app do seu banco, escolha pagar via PIX e cole o código abaixo ou escaneie o QR Code.',
  copyCode: 'Copiar código PIX',
  copied: 'Código copiado!',
  awaitingPayment: 'Aguardando pagamento',
  previewLabel: 'Prévia do convite',
  previewExpand: 'Ampliar prévia',
  previewModalTitle: 'Prévia do convite',
  previewModalDescription:
    'Visualização protegida do convite. Complete o pagamento para liberar a versão final.',
  backToHome: 'Voltar para modelos',
  totalLabel: 'Total',
} as const

export const THANK_YOU_COPY = {
  eyebrow: 'PAGAMENTO CONFIRMADO',
  title: 'Tudo certo!',
  description: 'Seu convite está ativo e pronto para compartilhar.',
  inviteLinkLabel: 'Link do convite',
  copyLink: 'Copiar link',
  copied: 'Link copiado!',
  emailNote: (email: string) =>
    `Também enviamos o link para ${email}. Confira sua caixa de entrada (e o spam, por precaução).`,
  openInvite: 'Ver convite',
} as const

export const CHANGE_TEMPLATE_HREF = '/v2#templates'

export const TEMPLATE_DISPLAY_NAMES: Record<string, string> = {
  blue: 'Azul',
  golden: 'Dourado',
  garden: 'Verde Oliva',
  romantic: 'Romântico',
}
