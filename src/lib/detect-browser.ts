export function detectBrowser(userAgent: string): string {
  if (/tiktok/i.test(userAgent)) {
    return "TikTok"
  }
  if (/instagram/i.test(userAgent)) {
    return "Instagram"
  }
  if (/facebook/i.test(userAgent)) {
    return "Facebook"
  }
  if (/edg/i.test(userAgent)) {
    return "Microsoft Edge"
  }
  if (/chrome/i.test(userAgent) && !/edg/i.test(userAgent)) {
    return "Google Chrome"
  }
  if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) {
    return "Safari"
  }
  if (/firefox/i.test(userAgent)) {
    return "Mozilla Firefox"
  }
  if (/opera|opr/i.test(userAgent)) {
    return "Opera"
  }
  if (/samsungbrowser/i.test(userAgent)) {
    return "Samsung Internet"
  }
  if (/ucbrowser/i.test(userAgent)) {
    return "UC Browser"
  }

  return "Navegador Desconhecido"
}

