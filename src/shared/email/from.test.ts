import { describe, expect, it } from 'vitest'

import { resolveFromEmail } from './from'

describe('resolveFromEmail', () => {
  it('adds CasarMe display name to a bare email address', () => {
    expect(resolveFromEmail('no-reply@casarme.site')).toBe(
      'CasarMe <no-reply@casarme.site>',
    )
  })

  it('returns an already formatted address unchanged', () => {
    expect(resolveFromEmail('CasarMe <no-reply@casarme.site>')).toBe(
      'CasarMe <no-reply@casarme.site>',
    )
  })
})
