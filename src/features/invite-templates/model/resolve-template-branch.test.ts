import { describe, expect, it } from 'vitest'

import { EXTENDED_TEMPLATE_SLUGS } from '@/src/shared/catalog'

import { resolveTemplateBranch } from './resolve-template-branch'

describe('resolveTemplateBranch', () => {
  it.each(['blue', 'golden', 'garden', 'romantic'] as const)(
    'resolves legacy catalog template %s',
    (templateId) => {
      expect(resolveTemplateBranch(templateId)).toBe(templateId)
    },
  )

  it('routes rosa extended template to its own branch', () => {
    expect(resolveTemplateBranch('rosa')).toBe('rosa')
  })

  it.each(EXTENDED_TEMPLATE_SLUGS.filter((slug) => slug !== 'rosa'))(
    'routes extended template %s to romantic renderer branch',
    (templateId) => {
      expect(resolveTemplateBranch(templateId)).toBe('romantic')
    },
  )

  it('routes legacy modern template to modern branch', () => {
    expect(resolveTemplateBranch('modern')).toBe('modern')
  })

  it('returns fallback for unknown template ids', () => {
    expect(resolveTemplateBranch('unknown')).toBe('fallback')
    expect(resolveTemplateBranch('')).toBe('fallback')
  })
})
