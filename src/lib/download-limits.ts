const DOWNLOAD_LIMIT = 3
const COOKIE_NAME = 'godparent_downloads'

export interface DownloadCount {
  count: number
  resetDate: string
}

// Client-side functions
export function getDownloadCountClient(): DownloadCount {
  if (typeof window === 'undefined') {
    return { count: 0, resetDate: new Date().toISOString() }
  }

  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${COOKIE_NAME}=`))

  if (!cookie) {
    return {
      count: 0,
      resetDate: new Date().toISOString()
    }
  }

  try {
    const cookieValue = cookie.split('=')[1]
    const data = JSON.parse(decodeURIComponent(cookieValue))
    const resetDate = new Date(data.resetDate)
    const now = new Date()

    // Reset count if it's a new day
    if (resetDate.toDateString() !== now.toDateString()) {
      return {
        count: 0,
        resetDate: now.toISOString()
      }
    }

    return data
  } catch {
    return {
      count: 0,
      resetDate: new Date().toISOString()
    }
  }
}

export function setDownloadCountClient(count: DownloadCount): void {
  if (typeof window === 'undefined') return

  const expires = new Date()
  expires.setDate(expires.getDate() + 1) // Expire in 1 day

  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(count))}; expires=${expires.toUTCString()}; path=/`
}

export function incrementDownloadCountClient(): DownloadCount {
  const current = getDownloadCountClient()
  const newCount = {
    count: current.count + 1,
    resetDate: current.resetDate
  }

  setDownloadCountClient(newCount)
  return newCount
}

export function canDownloadClient(): boolean {
  const current = getDownloadCountClient()
  return current.count < DOWNLOAD_LIMIT
}

export function getRemainingDownloadsClient(): number {
  const current = getDownloadCountClient()
  return Math.max(0, DOWNLOAD_LIMIT - current.count)
}

// Server-side functions (for API routes) - simplified since we're using client-side control
export function getDownloadCount(): DownloadCount {
  return { count: 0, resetDate: new Date().toISOString() }
}

export function incrementDownloadCount(): DownloadCount {
  return { count: 0, resetDate: new Date().toISOString() }
}

export function canDownload(): boolean {
  return true // Always allow on server side, client will handle the limit
}

export function getRemainingDownloads(): number {
  return DOWNLOAD_LIMIT
}