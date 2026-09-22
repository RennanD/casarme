import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { getInviteProduct, getAbacateProductId } from "./invite-products"

describe("getInviteProduct", () => {
  it("returns blue product metadata", () => {
    const product = getInviteProduct("blue")

    expect(product).toEqual({
      label: "Modelo Azul",
      productName: "Convite de Casamento - Modelo Azul",
      displayPrice: "R$ 30,90",
      priceCents: 3090,
      accentColor: "#08265E",
    })
  })

  it("returns golden product metadata", () => {
    const product = getInviteProduct("golden")

    expect(product).toEqual({
      label: "Modelo Dourado",
      productName: "Convite de Casamento - Modelo Dourado",
      displayPrice: "R$ 25,90",
      priceCents: 2590,
      accentColor: "#D4A373",
    })
  })

  it("returns null for unknown templates", () => {
    expect(getInviteProduct("unknown")).toBeNull()
    expect(getInviteProduct("garden")).toBeNull()
  })
})

describe("getAbacateProductId", () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it("returns blue product ID from env when set", () => {
    process.env.ABACATEPAY_API_BLUE_INVITE_PRODUCT = "prod_JycUteZGLFkMJKwPRQSBu04D"

    expect(getAbacateProductId("blue")).toBe("prod_JycUteZGLFkMJKwPRQSBu04D")
  })

  it("throws when blue product env var is unset", () => {
    delete process.env.ABACATEPAY_API_BLUE_INVITE_PRODUCT

    expect(() => getAbacateProductId("blue")).toThrow(
      "Missing environment variable: ABACATEPAY_API_BLUE_INVITE_PRODUCT"
    )
  })

  it("returns golden product ID from env when set", () => {
    process.env.ABACATEPAY_API_GOLDEN_INVITE_PRODUCT = "prod_golden123"

    expect(getAbacateProductId("golden")).toBe("prod_golden123")
  })

  it("throws when golden product env var is unset", () => {
    delete process.env.ABACATEPAY_API_GOLDEN_INVITE_PRODUCT

    expect(() => getAbacateProductId("golden")).toThrow(
      "Missing environment variable: ABACATEPAY_API_GOLDEN_INVITE_PRODUCT"
    )
  })
})
