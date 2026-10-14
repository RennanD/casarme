export const PLANNER_ADDON_CENTAVOS = 990
export const PLANNER_ADDON_DISPLAY = 'R$ 9,90'
export const PIX_EXPIRES_IN_SECONDS = 3600

export function displayPriceToCentavos(displayPrice: string): number {
  const normalized = displayPrice.replace(/[^\d,]/g, '').replace(',', '.')
  return Math.round(Number.parseFloat(normalized) * 100)
}

export function centavosToDisplay(amountCentavos: number): string {
  const reais = amountCentavos / 100
  return `R$ ${reais.toFixed(2).replace('.', ',')}`
}
