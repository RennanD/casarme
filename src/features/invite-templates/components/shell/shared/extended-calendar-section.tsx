import {
  buildEventWeekDays,
  buildMonthCalendar,
  getWeekdayLabels,
} from '../../../model/wedding-calendar'
import type { ExtendedInviteTheme } from '../../../model/themes/extended-invite-theme'
import { parseWeddingDateParts } from '../../../model/wedding-date'

type CalendarVariant = 'month' | 'week-agenda' | 'week-event'

type ExtendedCalendarSectionProps = {
  weddingDate: string
  theme: ExtendedInviteTheme
  variant?: CalendarVariant
}

export function ExtendedCalendarSection({
  weddingDate,
  theme,
  variant = 'month',
}: ExtendedCalendarSectionProps) {
  const dateParts = parseWeddingDateParts(weddingDate)
  if (!dateParts) return null

  const weddingDay = Number.parseInt(dateParts.day, 10)
  const weddingYear = Number.parseInt(dateParts.year, 10)
  const weddingMonth = new Date(`${weddingDate}T00:00:00`).getMonth() + 1

  if (variant === 'week-agenda') {
    const weekDays = buildEventWeekDays(weddingDate)

    return (
      <section
        className="mx-6 flex flex-col gap-3 rounded-xl px-6 py-5"
        style={{ backgroundColor: theme.surface }}
      >
        <p
          className="text-[8px] tracking-[0.2px]"
          style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
        >
          MARQUE NA AGENDA
        </p>
        <div className="flex justify-between gap-1.5">
          {weekDays.map((cell) =>
            cell.isWeddingDay ? (
              <div
                key={cell.day}
                className="flex size-11 flex-col items-center justify-center rounded-full text-white"
                style={{ backgroundColor: theme.accent, fontFamily: theme.fontSans }}
              >
                <span className="text-xs">{cell.day}</span>
                <span className="text-[6px] tracking-[0.05px]">evento</span>
              </div>
            ) : (
              <div key={cell.day} className="flex w-9 flex-col items-center gap-1">
                <div
                  className="size-2 rounded-full"
                  style={{ backgroundColor: `${theme.accent}33` }}
                />
                <span
                  className="text-[9px]"
                  style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
                >
                  {cell.day}
                </span>
              </div>
            ),
          )}
        </div>
        <div className="h-px w-full" style={{ backgroundColor: `${theme.accent}22` }} />
      </section>
    )
  }

  if (variant === 'week-event') {
    const weekDays = buildEventWeekDays(weddingDate)

    return (
      <section className="flex flex-col gap-2.5 px-6 py-6" style={{ backgroundColor: theme.bg }}>
        <p className="text-[13px] italic" style={{ fontFamily: theme.fontSerif }}>
          Semana do evento
        </p>
        <div
          className="flex justify-between px-2 py-2.5"
          style={{ backgroundColor: theme.accentLight }}
        >
          {weekDays.map((cell) =>
            cell.isWeddingDay ? (
              <div
                key={cell.day}
                className="flex size-9 items-center justify-center rounded-full text-[11px] text-white"
                style={{ backgroundColor: theme.accent, fontFamily: theme.fontSans }}
              >
                {cell.day}
              </div>
            ) : (
              <span
                key={cell.day}
                className="text-[9px]"
                style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
              >
                {cell.day}
              </span>
            ),
          )}
        </div>
      </section>
    )
  }

  const calendarRows = buildMonthCalendar(weddingYear, weddingMonth, weddingDay)

  return (
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
  )
}
