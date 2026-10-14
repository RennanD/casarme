export function getRemainingSeconds(expiresAt: string | null, now: Date = new Date()): number {
  if (!expiresAt) {
    return 0
  }

  const diffMs = new Date(expiresAt).getTime() - now.getTime()
  return Math.max(0, Math.floor(diffMs / 1000))
}

export function formatPixCountdown(totalSeconds: number): string {
  const safe = Math.max(0, totalSeconds)
  const hours = Math.floor(safe / 3600)
  const minutes = Math.floor((safe % 3600) / 60)
  const seconds = safe % 60
  const pad = (value: number) => value.toString().padStart(2, '0')

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}`
  }

  return `${pad(minutes)}:${pad(seconds)}`
}
