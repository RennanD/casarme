import { describe, expect, it } from 'vitest'

import { BRAND_TOKEN_SWATCHES, SHOWCASE_SECTION_ORDER } from './brand-tokens'

describe('design-system brand tokens', () => {
  it('orders showcase sections per issue #14', () => {
    expect([...SHOWCASE_SECTION_ORDER]).toEqual([
      'brand-tokens',
      'typography',
      'buttons',
      'badges',
      'cards',
      'links',
      'forms',
      'separator',
    ])
  })

  it('includes all eight core semantic color swatches', () => {
    expect(BRAND_TOKEN_SWATCHES.map((token) => token.name)).toEqual([
      'primary',
      'secondary',
      'background',
      'foreground',
      'muted-foreground',
      'accent',
      'border',
      'card',
    ])
  })
})
