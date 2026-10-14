import { describe, expect, it } from 'vitest'

import { BRAND_TOKEN_SWATCHES, SHOWCASE_SECTION_ORDER } from './brand-tokens'

describe('design-system brand tokens', () => {
  it('orders showcase sections like the Dourado Suave design frame', () => {
    expect([...SHOWCASE_SECTION_ORDER]).toEqual([
      'brand-tokens',
      'typography',
      'buttons',
      'forms',
    ])
  })

  it('includes the brand and surface colors shown in the design frame', () => {
    expect(BRAND_TOKEN_SWATCHES.map((token) => token.name)).toEqual([
      'background',
      'secondary',
      'card',
      'primary',
      'foreground',
      'border',
      'surface-sage',
      'surface-peach',
      'surface-lilac',
    ])
  })
})
