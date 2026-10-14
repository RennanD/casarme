'use client'

import { useCallback, useState } from 'react'

import { Button, Card } from '@/src/shared/ui'

import { CHECKOUT_COPY } from '../model/copy'

import { PixExpiryCountdown } from './pix-expiry-countdown'

type PixPanelProps = {
  brCode: string
  brCodeBase64: string
  expiresAt: string | null
  invitationId: string
  chargeId: string
  chargeStatus: string
  showSimulatePayment?: boolean
}

export function PixPanel({
  brCode,
  brCodeBase64,
  expiresAt,
  invitationId,
  chargeId,
  chargeStatus,
  showSimulatePayment = false,
}: PixPanelProps) {
  const [copied, setCopied] = useState(false)
  const [simulating, setSimulating] = useState(false)
  const [simulateError, setSimulateError] = useState<string | null>(null)
  const canSimulate = showSimulatePayment && chargeStatus === 'PENDING'

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(brCode)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [brCode])

  const handleSimulate = useCallback(async () => {
    setSimulating(true)
    setSimulateError(null)

    try {
      const response = await fetch('/api/payments/v2/simulate-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invitationId, chargeId }),
      })

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string }
        setSimulateError(data.error ?? CHECKOUT_COPY.simulatePaymentError)
      }
    } catch {
      setSimulateError(CHECKOUT_COPY.simulatePaymentError)
    } finally {
      setSimulating(false)
    }
  }, [chargeId, invitationId])

  return (
    <Card className="gap-5 rounded-2xl border border-border bg-card p-6 shadow-none">
      <p className="text-sm leading-6 text-muted-foreground">{CHECKOUT_COPY.pixInstructions}</p>

      <PixExpiryCountdown expiresAt={expiresAt} />

      <div className="flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={brCodeBase64}
          alt="QR Code PIX"
          className="size-48 rounded-xl border border-border bg-white p-3 outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="pix-code" className="text-xs font-medium text-muted-foreground">
          Código copia e cola
        </label>
        <textarea
          id="pix-code"
          readOnly
          value={brCode}
          rows={3}
          className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2 text-xs text-foreground"
        />
      </div>

      <Button type="button" onClick={handleCopy} className="w-full">
        {copied ? CHECKOUT_COPY.copied : CHECKOUT_COPY.copyCode}
      </Button>

      <Button asChild variant="ghost" className="w-full lg:hidden">
        <a
          href="#invite-preview"
          onClick={(event) => {
            event.preventDefault()
            document.getElementById('invite-preview')?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }}
        >
          {CHECKOUT_COPY.previewScrollLink}
        </a>
      </Button>

      {showSimulatePayment ? (
        <div className="space-y-2 border-t border-border pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleSimulate}
            disabled={simulating || !canSimulate}
            className="w-full"
          >
            {simulating ? CHECKOUT_COPY.simulatePaymentLoading : CHECKOUT_COPY.simulatePayment}
          </Button>
          {!canSimulate && chargeStatus !== 'PENDING' ? (
            <p className="text-xs text-muted-foreground">{CHECKOUT_COPY.simulatePaymentExpired}</p>
          ) : null}
          {simulateError ? <p className="text-xs text-destructive">{simulateError}</p> : null}
        </div>
      ) : null}
    </Card>
  )
}
