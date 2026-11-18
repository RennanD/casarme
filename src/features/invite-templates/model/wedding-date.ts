export function formatWeddingDate(dateString: string): string {
  if (!dateString) return ''
  const date = new Date(`${dateString}T00:00:00`)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export type WeddingDateParts = {
  day: string
  month: string
  monthShort: string
  year: string
  weekday: string
}

export function parseWeddingDateParts(dateString: string): WeddingDateParts | null {
  if (!dateString) return null
  const date = new Date(`${dateString}T00:00:00`)
  if (Number.isNaN(date.getTime())) return null

  return {
    day: date.toLocaleDateString('pt-BR', { day: '2-digit' }),
    month: date.toLocaleDateString('pt-BR', { month: 'long' }),
    monthShort: date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', ''),
    year: date.toLocaleDateString('pt-BR', { year: 'numeric' }),
    weekday: date.toLocaleDateString('pt-BR', { weekday: 'long' }),
  }
}

export function formatWeddingTime(timeString: string): string {
  if (!timeString) return ''
  return timeString.slice(0, 5)
}
