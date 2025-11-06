export function isTikTokBrowser(userAgent: string): boolean {
  return /tiktok/i.test(userAgent)
}

