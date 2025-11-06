"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export default function GoogleTagManagerScripts() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Timeout para garantir que não bloqueie a página
    const timeout = setTimeout(() => {
      setIsLoaded(true)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!isLoaded || !pathname || !GTM_ID) return

    try {
      // Carregar GTM de forma não-bloqueante
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "pageview",
          page: pathname,
        })
      }
    } catch (error) {
      console.error("GTM error:", error)
    }
  }, [pathname, searchParams, isLoaded])

  // Não renderizar se não estiver em produção ou sem GTM_ID
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" || !GTM_ID) {
    return null
  }

  // Inicializar dataLayer ANTES de carregar o script
  useEffect(() => {
    if (typeof window !== "undefined" && !window.dataLayer) {
      window.dataLayer = window.dataLayer || []
    }
  }, [])

  // Carregar GTM de forma assíncrona e não-bloqueante
  useEffect(() => {
    if (!isLoaded) return

    try {
      // Inicializar dataLayer se ainda não foi inicializado
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || []
      }

      // Carregar script de forma assíncrona
      const script = document.createElement("script")
      script.async = true
      script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
      script.onerror = () => {
        console.warn("GTM failed to load, continuing without it")
      }
      document.head.appendChild(script)

      // Enviar evento de inicialização
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" })
      }
    } catch (error) {
      console.error("GTM initialization error:", error)
    }
  }, [isLoaded])

  return (
    <>
      <noscript>
        <iframe
          height="0"
          title="GTM"
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          style={{ display: "none", visibility: "hidden" }}
          width="0"
        />
      </noscript>
    </>
  )
}
