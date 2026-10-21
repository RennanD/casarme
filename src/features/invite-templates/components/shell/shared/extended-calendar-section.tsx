import {
  buildMonthCalendar,
  getWeekdayLabels,
} from '../../../model/wedding-calendar'
import type { ExtendedInviteTheme } from '../../../model/themes/extended-invite-theme'
import {
  formatWeddingTime,
  parseWeddingDateParts,
} from '../../../model/wedding-date'

type ExtendedCalendarSectionProps = {
  weddingDate: string
  weddingTime: string
  theme: ExtendedInviteTheme
}

export function ExtendedCalendarSection({
  weddingDate,
  weddingTime,
  theme,
}: ExtendedCalendarSectionProps) {
  const dateParts = parseWeddingDateParts(weddingDate)
  if (!dateParts) return null

  const weddingDay = Number.parseInt(dateParts.day, 10)
  const weddingYear = Number.parseInt(dateParts.year, 10)
  const weddingMonth = new Date(`${weddingDate}T00:00:00`).getMonth() + 1
  const calendarRows = buildMonthCalendar(weddingYear, weddingMonth, weddingDay)

  return (
    <>
      <section
        className="flex flex-col items-center px-7 py-8"
        style={{ backgroundColor: theme.surface }}
      >
        <div className="flex items-end justify-center gap-3">
          <span
            className="text-[13px] capitalize tracking-[0.15px]"
            style={{ color: theme.textMuted, fontFamily: theme.fontSerif }}
          >
            {dateParts.month}
          </span>
          <span
            className="text-[72px] leading-[61px]"
            style={{ color: theme.accent, fontFamily: theme.fontSerif }}
          >
            {dateParts.day}
          </span>
          <span
            className="text-[13px] tracking-[0.15px]"
            style={{ color: theme.textMuted, fontFamily: theme.fontSerif }}
          >
            {dateParts.year}
          </span>
        </div>
        <p
          className="mt-2 text-[10px] capitalize"
          style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
        >
          {dateParts.weekday} · {formatWeddingTime(weddingTime) || 'Horário'}
        </p>
      </section>

      <section className="flex flex-col items-center gap-2.5 px-[18px] py-6">
        <p className="text-[15px] capitalize" style={{ fontFamily: theme.fontSerif }}>
          {dateParts.month} {dateParts.year}
        </p>
        <div className="flex w-full flex-col gap-1">
          <div className="grid grid-cols-7 gap-0.5">
            {getWeekdayLabels().map((label) => (
              <span
                key={label}
                className="text-center text-[9px]"
                style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
              >
                {label}
              </span>
            ))}
          </div>
          {calendarRows.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-7 gap-0.5">
              {row.map((cell, cellIndex) => {
                if (cell.kind === 'empty') {
                  return <div key={cellIndex} className="h-9" />
                }

                if (cell.isWeddingDay) {
                  return (
                    <div
                      key={cellIndex}
                      className="flex h-9 items-center justify-center rounded-full text-[10px] text-white"
                      style={{ backgroundColor: theme.accent, fontFamily: theme.fontSans }}
                    >
                      {cell.day}
                    </div>
                  )
                }

                return (
                  <span
                    key={cellIndex}
                    className="flex h-9 items-center justify-center text-[9px]"
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
    </>
  )
}
