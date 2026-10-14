'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

import { Button } from '@/src/shared/ui'

import { usePaymentPolling } from '../hooks/use-payment-polling'
import { CHANGE_TEMPLATE_HREF, CHECKOUT_COPY } from '../model/copy'
import type { OrderSummary } from '../model/types'

import { OrderSummaryCard } from './order-summary-card'
import { PaymentStatusBadge } from './payment-status-badge'
import { PixPanel } from './pix-panel'

type CheckoutClientProps = {
  invitationId: string
  chargeId: string
  chargeStatus: string
  expiresAt: string | null
  brCode: string
  brCodeBase64: string
  devMode: boolean
  orderSummary: OrderSummary
  brideName: string
  groomName: string
  email: string
  preview: ReactNode
}

export function CheckoutClient({
  invitationId,
  chargeId,
  chargeStatus,
  expiresAt,
  brCode,
  brCodeBase64,
  devMode,
  orderSummary,
  brideName,
  groomName,
  email,
  preview,
}: CheckoutClientProps) {
  const showDevControls = devMode && process.env.NODE_ENV === 'development'

  usePaymentPolling(invitationId, chargeId)

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-12 lg:px-8">
        {showDevControls ? (
          <div
            role="status"
            className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:text-amber-100"
          >
            {CHECKOUT_COPY.devModeBanner}
          </div>
        ) : null}

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              {CHECKOUT_COPY.eyebrow}
            </p>
            <h1 className="font-serif text-3xl font-normal tracking-tight text-foreground lg:text-4xl">
              {CHECKOUT_COPY.title}
            </h1>
            <p className="text-sm leading-6 text-muted-foreground">{CHECKOUT_COPY.description}</p>
          </div>
          <PaymentStatusBadge />
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="space-y-6">
            <PixPanel
              brCode={brCode}
              brCodeBase64={brCodeBase64}
              expiresAt={expiresAt}
              invitationId={invitationId}
              chargeId={chargeId}
              chargeStatus={chargeStatus}
              showSimulatePayment={showDevControls}
            />
            <OrderSummaryCard
              summary={orderSummary}
              brideName={brideName}
              groomName={groomName}
              email={email}
            />
            <Button asChild variant="ghost" className="justify-start px-0">
              <Link href={CHANGE_TEMPLATE_HREF}>{CHECKOUT_COPY.backToHome}</Link>
            </Button>
          </div>

          {preview}
        </div>
      </div>
    </div>
  )
}
