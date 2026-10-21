export type CalendarCell =
  | { kind: 'empty' }
  | { kind: 'day'; day: number; isWeddingDay: boolean }

const WEEKDAY_LABELS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'] as const

export function getWeekdayLabels(): readonly string[] {
  return WEEKDAY_LABELS
}

export function buildMonthCalendar(
  year: number,
  month: number,
  weddingDay: number,
): CalendarCell[][] {
  const firstDay = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()

  const cells: CalendarCell[] = [
    ...Array.from({ length: firstDay }, () => ({ kind: 'empty' as const })),
    ...Array.from({ length: daysInMonth }, (_, index) => ({
      kind: 'day' as const,
      day: index + 1,
      isWeddingDay: index + 1 === weddingDay,
    })),
  ]

  const rows: CalendarCell[][] = []
  for (let index = 0; index < cells.length; index += 7) {
    const row = cells.slice(index, index + 7)
    while (row.length < 7) {
      row.push({ kind: 'empty' })
    }
    rows.push(row)
  }

  return rows
}

export type WeekDayCell = {
  day: number
  isWeddingDay: boolean
}

/** Seven days of the calendar week containing the wedding date (Sun–Sat). */
export function buildEventWeekDays(weddingDate: string): WeekDayCell[] {
  const date = new Date(`${weddingDate}T00:00:00`)
  if (Number.isNaN(date.getTime())) return []

  const weddingDay = date.getDate()
  const weddingMonth = date.getMonth()
  const startOfWeek = new Date(date)
  startOfWeek.setDate(date.getDate() - date.getDay())

  return Array.from({ length: 7 }, (_, index) => {
    const cellDate = new Date(startOfWeek)
    cellDate.setDate(startOfWeek.getDate() + index)
    return {
      day: cellDate.getDate(),
      isWeddingDay:
        cellDate.getDate() === weddingDay && cellDate.getMonth() === weddingMonth,
    }
  })
}
