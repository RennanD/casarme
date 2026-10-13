'use client'

import { useCallback, useState } from 'react'

import { Button, Card } from '@/src/shared/ui'

import { CHECKOUT_COPY } from '../model/copy'

type PixPanelProps = {
  brCode: string
  brCodeBase64: string
}

export function PixPanel({ brCode, brCodeBase64 }: PixPanelProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(brCode)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [brCode])

  return (
    <Card className="gap-5 rounded-[18px] border border-border bg-card p-6 shadow-none">
      <p className="body-sm text-muted-foreground">{CHECKOUT_COPY.pixInstructions}</p>

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
    </Card>
  )
}
