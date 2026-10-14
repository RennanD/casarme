import { describe, expect, it } from 'vitest'

import { buttonVariants } from './button-variants'

const variants = [
  'default',
  'secondary',
  'outline',
  'ghost',
  'destructive',
  'link',
] as const

const sizes = ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'] as const

describe('buttonVariants', () => {
  it('uses rounded-full on base and all size variants', () => {
    for (const variant of variants) {
      for (const size of sizes) {
        const classes = buttonVariants({ variant, size })
        expect(classes).toContain('rounded-full')
        expect(classes).not.toContain('rounded-md')
      }
    }
  })

  it('default variant renders gold pill with white text and opacity hover', () => {
    const classes = buttonVariants({ variant: 'default' })
    expect(classes).toContain('bg-primary')
    expect(classes).toContain('text-primary-foreground')
    expect(classes).toContain('hover:bg-primary/90')
  })
})
