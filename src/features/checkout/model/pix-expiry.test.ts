import { describe, expect, it } from 'vitest'

import { formatPixCountdown, getRemainingSeconds } from './pix-expiry'

describe('pix expiry', () => {
  it('formats sub-hour countdown as mm:ss', () => {
    expect(formatPixCountdown(754)).toBe('12:34')
    expect(formatPixCountdown(59)).toBe('00:59')
    expect(formatPixCountdown(0)).toBe('00:00')
  })

  it('formats hour-or-more countdown as h:mm:ss', () => {
    expect(formatPixCountdown(3600)).toBe('1:00:00')
    expect(formatPixCountdown(3661)).toBe('1:01:01')
  })

  it('returns remaining seconds until expiresAt', () => {
    const now = new Date('2026-10-13T20:00:00.000Z')
    const expiresAt = '2026-10-13T20:15:30.000Z'

    expect(getRemainingSeconds(expiresAt, now)).toBe(930)
  })

  it('returns zero when expiresAt is null or already passed', () => {
    const now = new Date('2026-10-13T20:00:00.000Z')

    expect(getRemainingSeconds(null, now)).toBe(0)
    expect(getRemainingSeconds('2026-10-13T19:00:00.000Z', now)).toBe(0)
  })
})
