'use client'

import { useEffect, useState } from 'react'

import { formatPixCountdown, getRemainingSeconds } from '../model/pix-expiry'

export function usePixCountdown(expiresAt: string | null) {
  const [remainingSeconds, setRemainingSeconds] = useState(() => getRemainingSeconds(expiresAt))

  useEffect(() => {
    setRemainingSeconds(getRemainingSeconds(expiresAt))

    const intervalId = window.setInterval(() => {
      setRemainingSeconds(getRemainingSeconds(expiresAt))
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [expiresAt])

  return {
    remainingSeconds,
    formatted: formatPixCountdown(remainingSeconds),
    isExpired: remainingSeconds <= 0,
  }
}
