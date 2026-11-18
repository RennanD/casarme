import { describe, expect, it } from 'vitest'

import {
  formatWeddingDate,
  formatWeddingTime,
  parseWeddingDateParts,
} from './wedding-date'

describe('formatWeddingDate', () => {
  it('formats ISO date in pt-BR long form', () => {
    expect(formatWeddingDate('2025-12-20')).toBe('20 de dezembro de 2025')
  })

  it('returns empty string for missing date', () => {
    expect(formatWeddingDate('')).toBe('')
  })
})

describe('parseWeddingDateParts', () => {
  it('extracts editorial date parts', () => {
    expect(parseWeddingDateParts('2025-12-20')).toEqual({
      day: '20',
      month: 'dezembro',
      monthShort: 'dez',
      year: '2025',
      weekday: 'sábado',
    })
  })

  it('returns null for invalid date', () => {
    expect(parseWeddingDateParts('')).toBeNull()
  })
})

describe('formatWeddingTime', () => {
  it('returns HH:MM from time string', () => {
    expect(formatWeddingTime('18:30:00')).toBe('18:30')
    expect(formatWeddingTime('18:30')).toBe('18:30')
  })
})
