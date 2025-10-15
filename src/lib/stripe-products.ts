export const STRIPE_PRODUCTS = {
  garden: {
    priceId: process.env.STRIPE_GARDEN_PRICE_ID!,
    name: "Convite Garden - Básico",
    templateId: "garden"
  },
  romantic: {
    priceId: process.env.STRIPE_ROMANTIC_PRICE_ID!,
    name: "Convite Romântico - Pro",
    templateId: "romantic"
  },
  modern: {
    priceId: process.env.STRIPE_MODERN_PRICE_ID!,
    name: "Convite Modern - Pro",
    templateId: "modern"
  }
} as const;

export type StripeProductId = keyof typeof STRIPE_PRODUCTS;
