import { describe, expect, it } from 'vitest'

import { resolveTemplateBranch } from './resolve-template-branch'

describe('resolveTemplateBranch', () => {
  it.each(['blue', 'golden', 'garden', 'romantic'] as const)(
    'resolves catalog template %s',
    (templateId) => {
      expect(resolveTemplateBranch(templateId)).toBe(templateId)
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
