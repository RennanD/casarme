import { useId } from 'react'

import {
  buildMonthCalendar,
  getWeekdayLabels,
} from '../../../model/wedding-calendar'
import type { ExtendedInviteTheme } from '../../../model/themes/extended-invite-theme'
import { parseWeddingDateParts } from '../../../model/wedding-date'

type ExtendedCalendarSectionProps = {
  weddingDate: string
  theme: ExtendedInviteTheme
}

export function ExtendedCalendarSection({
  weddingDate,
  theme,
}: ExtendedCalendarSectionProps) {
  const weekdayHeaderId = useId()
  const dateParts = parseWeddingDateParts(weddingDate)
  if (!dateParts) return null

  const weddingDay = Number.parseInt(dateParts.day, 10)
  const weddingYear = Number.parseInt(dateParts.year, 10)
  const weddingMonth = new Date(`${weddingDate}T00:00:00`).getMonth() + 1
  const calendarRows = buildMonthCalendar(weddingYear, weddingMonth, weddingDay)

  return (
    <section
      className="mx-4 flex flex-col items-center gap-3 rounded-xl px-4 py-6 sm:mx-6"
      style={{ backgroundColor: theme.surface }}
    >
      <p
        className="text-[23px] capitalize"
        style={{ fontFamily: theme.fontSerif, color: theme.text }}
      >
        {dateParts.month} {dateParts.year}
      </p>
      <div className="w-full max-w-sm">
        <div className="mb-1 grid grid-cols-7 gap-1">
          {getWeekdayLabels().map((label, index) => (
            <span
              key={`${weekdayHeaderId}-${index}`}
              className="text-center text-[14px] font-medium uppercase"
              style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
            >
              {label}
            </span>
          ))}
        </div>
        {calendarRows.map((row, rowIndex) => (
          <div key={rowIndex} className="mb-1 grid grid-cols-7 gap-1">
            {row.map((cell, cellIndex) => {
              if (cell.kind === 'empty') {
                return <div key={cellIndex} className="aspect-square" />
              }

              if (cell.isWeddingDay) {
                return (
                  <div
                    key={cellIndex}
                    className="flex aspect-square items-center justify-center rounded-full text-[17px] font-medium text-white"
                    style={{ backgroundColor: theme.accent, fontFamily: theme.fontSans }}
                    aria-label={`Dia do casamento: ${cell.day}`}
                  >
                    {cell.day}
                  </div>
                )
              }

              return (
                <span
                  key={cellIndex}
                  className="flex aspect-square items-center justify-center text-[15px]"
                  style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
                >
                  {cell.day}
                </span>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
