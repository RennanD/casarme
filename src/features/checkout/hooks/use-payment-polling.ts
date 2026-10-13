'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const POLL_INTERVAL_MS = 3000

export function usePaymentPolling(invitationId: string, chargeId: string) {
  const router = useRouter()

  useEffect(() => {
    let cancelled = false

    const poll = async () => {
      try {
        const response = await fetch(
          `/api/payments/v2/check-status?invitationId=${encodeURIComponent(invitationId)}&chargeId=${encodeURIComponent(chargeId)}`,
        )

        if (!response.ok || cancelled) return

        const data = (await response.json()) as { status?: string }

        if (data.status === 'PAID') {
          router.replace(`/v2/obrigado/${invitationId}`)
        }
      } catch {
        // Polling is UX-only; webhook remains authoritative
      }
    }

    const intervalId = window.setInterval(poll, POLL_INTERVAL_MS)
    void poll()

    return () => {
      cancelled = true
      window.clearInterval(intervalId)
    }
  }, [chargeId, invitationId, router])
}
