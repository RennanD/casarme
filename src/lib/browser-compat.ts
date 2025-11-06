// Verificação de compatibilidade de browser
export function isBrowserCompatible(): boolean {
  if (typeof window === "undefined") return true

  // Verificar APIs essenciais
  try {
    // Verificar se Promise está disponível
    if (typeof Promise === "undefined") return false

    // Verificar se fetch está disponível (ou usar polyfill)
    if (typeof fetch === "undefined") return false

    // Verificar se localStorage está disponível (não crítico, mas útil)
    try {
      localStorage.setItem("test", "test")
      localStorage.removeItem("test")
    } catch {
      // localStorage não disponível, mas não é crítico
    }

    return true
  } catch {
    return false
  }
}

// Polyfill básico para fetch se não estiver disponível
export function ensureFetch(): void {
  if (typeof window === "undefined") return

  if (typeof fetch === "undefined") {
    // Fallback básico - em produção, usar polyfill completo
    console.warn("Fetch not available, some features may not work")
  }
}

