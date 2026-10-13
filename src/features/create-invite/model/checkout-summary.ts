import {
  buildOrderSummaryLabel,
  formatDisplayPrice,
  parseDisplayPrice,
} from './catalog'

export type CheckoutSummary = {
  summaryLabel: string
  total: string
  brideName: string
  groomName: string
  email: string
}

export function buildCheckoutSummary(input: {
  templateName: string
  displayPrice: string
  brideName: string
  groomName: string
  email: string
}): CheckoutSummary {
  return {
    summaryLabel: buildOrderSummaryLabel(input.templateName, false),
    total: formatDisplayPrice(parseDisplayPrice(input.displayPrice)),
    brideName: input.brideName,
    groomName: input.groomName,
    email: input.email,
  }
}
