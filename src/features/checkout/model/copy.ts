export const CHECKOUT_COPY = {
  eyebrow: 'CHECKOUT',
  title: 'Finalize seu pagamento',
  description: 'Escaneie o QR Code ou copie o código PIX para concluir a compra do convite.',
  orderSummary: 'Resumo do pedido',
  pixInstructions:
    'Abra o app do seu banco, escolha pagar via PIX e cole o código abaixo ou escaneie o QR Code.',
  copyCode: 'Copiar código PIX',
  copied: 'Código copiado!',
  pixExpiresPrefix: 'Este código expira em',
  pixExpiredRefreshing: 'Código PIX expirado. Gerando um novo código…',
  awaitingPayment: 'Aguardando pagamento',
  previewLabel: 'Prévia do convite',
  previewScrollLink: 'Ver prévia do convite',
  devModeBanner: 'Ambiente de testes — pagamento simulado via AbacatePay',
  simulatePayment: 'Simular pagamento',
  simulatePaymentLoading: 'Simulando pagamento…',
  simulatePaymentError: 'Não foi possível simular o pagamento. Tente novamente.',
  simulatePaymentExpired:
    'Este PIX expirou. Recarregue a página para gerar um novo código e simular novamente.',
  simulatePaymentNotPending: 'Só é possível simular pagamentos com PIX pendente.',
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

export const CHANGE_TEMPLATE_HREF = '/#templates'

export const TEMPLATE_DISPLAY_NAMES: Record<string, string> = {
  blue: 'Azul',
  golden: 'Dourado',
  garden: 'Verde Oliva',
  romantic: 'Romântico',
}
