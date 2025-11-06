export function detectBrowser(userAgent: string): string {
  const ua = userAgent.toLowerCase()

  // Apps de redes sociais - VERIFICAR PRIMEIRO (antes de qualquer navegador)
  // TikTok - apenas padrões muito específicos para evitar falsos positivos
  // O TikTok sempre terá "tiktok" ou "musical_ly" no user-agent
  if (ua.includes('tiktok') || ua.includes('musical_ly')) {
    return "TikTok"
  }

  if (ua.includes('instagram')) {
    return "Instagram"
  }
  if (ua.includes('fban') || ua.includes('fbav') || ua.includes('fbsv')) {
    return "Facebook"
  }

  // Navegadores específicos que podem ter "chrome" no user-agent
  // Verificar Edge antes de Chrome (Edge tem "Edg" no user-agent)
  if (ua.includes('edg') && !ua.includes('edgios') && !ua.includes('edga')) {
    return "Microsoft Edge"
  }

  // Opera (verificar antes de Chrome)
  if (ua.includes('opr') || ua.includes('opera')) {
    return "Opera"
  }

  // Samsung Internet
  if (ua.includes('samsungbrowser')) {
    return "Samsung Internet"
  }

  // UC Browser
  if (ua.includes('ucbrowser') || ua.includes('uc browser')) {
    return "UC Browser"
  }

  // Firefox (não tem "chrome" no user-agent)
  if (ua.includes('firefox') && !ua.includes('seamonkey')) {
    return "Mozilla Firefox"
  }

  // Safari (tem "safari" mas não "chrome")
  if (ua.includes('safari') && !ua.includes('chrome') && !ua.includes('chromium')) {
    return "Safari"
  }

  // Chrome (tem "chrome" mas não é nenhum dos navegadores acima)
  if (ua.includes('chrome') && !ua.includes('edg') && !ua.includes('opr')) {
    return "Google Chrome"
  }

  // Brave (tem "brave" no user-agent)
  if (ua.includes('brave')) {
    return "Brave"
  }

  // Vivaldi
  if (ua.includes('vivaldi')) {
    return "Vivaldi"
  }

  return "Navegador Desconhecido"
}

