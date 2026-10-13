export const PLANNER_ADDON_PRICE = 9.9
export const PLANNER_ADDON_DISPLAY = 'R$ 9,90'

export type CreateInviteTemplate = {
  slug: string
  name: string
  displayPrice: string
  imagePath: string
}

export function resolveTemplateBySlug(
  slug: string,
  catalog: CreateInviteTemplate[],
): CreateInviteTemplate | null {
  return catalog.find((entry) => entry.slug === slug) ?? null
}

export function parseDisplayPrice(displayPrice: string): number {
  const normalized = displayPrice.replace(/[^\d,]/g, '').replace(',', '.')
  return Number.parseFloat(normalized)
}

export function formatDisplayPrice(amount: number): string {
  return `R$ ${amount.toFixed(2).replace('.', ',')}`
}

export function calculateOrderTotal(
  templateDisplayPrice: string,
  includePlanner: boolean,
): { templatePrice: number; total: number; formattedTotal: string } {
  const templatePrice = parseDisplayPrice(templateDisplayPrice)
  const total = templatePrice + (includePlanner ? PLANNER_ADDON_PRICE : 0)

  return {
    templatePrice,
    total,
    formattedTotal: formatDisplayPrice(total),
  }
}

export function buildOrderSummaryLabel(
  templateName: string,
  includePlanner: boolean,
): string {
  return includePlanner ? `Convite ${templateName} + planner` : `Convite ${templateName}`
}

export const INVITE_FEATURE_LIST = [
  'Detalhes da cerimônia e recepção',
  'Endereço com mapa integrado',
  'Contagem regressiva para o grande dia',
  'Confirmação de presença pelo WhatsApp',
  'Galeria de fotos personalizada',
  'Música de fundo do YouTube',
  'Link compartilhável e acesso permanente',
] as const
