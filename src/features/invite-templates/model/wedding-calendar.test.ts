import { describe, expect, it } from 'vitest'

import { buildMonthCalendar, getWeekdayLabels } from './wedding-calendar'

describe('buildMonthCalendar', () => {
  it('highlights the wedding day in December 2025', () => {
    const rows = buildMonthCalendar(2025, 12, 20)
    const weddingCells = rows.flatMap((row) =>
      row.filter((cell) => cell.kind === 'day' && cell.isWeddingDay),
    )

    expect(weddingCells).toHaveLength(1)
    expect(weddingCells[0]).toMatchObject({ kind: 'day', day: 20, isWeddingDay: true })
  })

  it('pads the final row to seven columns', () => {
    const rows = buildMonthCalendar(2025, 12, 20)
    expect(rows.every((row) => row.length === 7)).toBe(true)
  })
})

describe('getWeekdayLabels', () => {
  it('returns Portuguese weekday initials', () => {
    expect(getWeekdayLabels()).toEqual(['D', 'S', 'T', 'Q', 'Q', 'S', 'S'])
  })
})
