export const INTERACTIVE_INVITE_PRODUCTS = {
  golden: {
    label: "Modelo Dourado",
    productName: "Convite de Casamento - Modelo Dourado",
    displayPrice: "R$ 25,90",
    priceCents: 2590,
    accentColor: "#D4A373",
  },
  blue: {
    label: "Modelo Azul",
    productName: "Convite de Casamento - Modelo Azul",
    displayPrice: "R$ 30,90",
    priceCents: 3090,
    accentColor: "#08265E",
  },
} as const

export type InteractiveInviteTemplate = keyof typeof INTERACTIVE_INVITE_PRODUCTS

export type InviteProduct = (typeof INTERACTIVE_INVITE_PRODUCTS)[InteractiveInviteTemplate]

const ABACATE_PRODUCT_ENV_KEYS: Record<InteractiveInviteTemplate, string> = {
  golden: "ABACATEPAY_API_GOLDEN_INVITE_PRODUCT",
  blue: "ABACATEPAY_API_BLUE_INVITE_PRODUCT",
}

export function getInviteProduct(template: string): InviteProduct | null {
  if (template in INTERACTIVE_INVITE_PRODUCTS) {
    return INTERACTIVE_INVITE_PRODUCTS[template as InteractiveInviteTemplate]
  }
  return null
}

export function getAbacateProductId(template: InteractiveInviteTemplate): string {
  const envKey = ABACATE_PRODUCT_ENV_KEYS[template]
  const productId = process.env[envKey]

  if (!productId) {
    throw new Error(`Missing environment variable: ${envKey}`)
  }

  return productId
}
