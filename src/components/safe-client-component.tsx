"use client"

import { useEffect, useState, ReactNode } from "react"

interface SafeClientComponentProps {
  children: ReactNode
  fallback?: ReactNode
  timeout?: number
}

/**
 * Wrapper que garante que componentes client-side não bloqueiem a renderização
 * Se houver erro ou timeout, mostra fallback
 */
export function SafeClientComponent({
  children,
  fallback = null,
  timeout = 5000
}: SafeClientComponentProps) {
  const [hasError, setHasError] = useState(false)
  const [isTimedOut, setIsTimedOut] = useState(false)

  useEffect(() => {
    // Timeout para garantir que não trave indefinidamente
    const timer = setTimeout(() => {
      if (!hasError) {
        setIsTimedOut(true)
      }
    }, timeout)

    return () => clearTimeout(timer)
  }, [timeout, hasError])

  if (hasError || isTimedOut) {
    return <>{fallback}</>
  }

  try {
    return <>{children}</>
  } catch (error) {
    console.error("SafeClientComponent error:", error)
    setHasError(true)
    return <>{fallback}</>
  }
}

