'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { usePixCountdown } from '../hooks/use-pix-countdown'
import { CHECKOUT_COPY } from '../model/copy'

type PixExpiryCountdownProps = {
  expiresAt: string | null
}

export function PixExpiryCountdown({ expiresAt }: PixExpiryCountdownProps) {
  const router = useRouter()
  const hasRefreshed = useRef(false)
  const { formatted, isExpired } = usePixCountdown(expiresAt)

  useEffect(() => {
    if (!isExpired || hasRefreshed.current || !expiresAt) {
      return
    }

    hasRefreshed.current = true
    router.refresh()
  }, [expiresAt, isExpired, router])

  if (!expiresAt) {
    return null
  }

  return (
    <div
      role="timer"
      aria-live="polite"
      className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-center"
    >
      {isExpired ? (
        <p className="text-sm text-muted-foreground">{CHECKOUT_COPY.pixExpiredRefreshing}</p>
      ) : (
        <p className="text-sm text-muted-foreground">
          {CHECKOUT_COPY.pixExpiresPrefix}{' '}
          <span className="font-mono text-base font-semibold tabular-nums text-foreground">
            {formatted}
          </span>
        </p>
      )}
    </div>
  )
}
