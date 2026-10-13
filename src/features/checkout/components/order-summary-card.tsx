import { Card } from '@/src/shared/ui'

import { CHECKOUT_COPY } from '../model/copy'
import type { OrderSummary } from '../model/types'

type OrderSummaryCardProps = {
  summary: OrderSummary
  brideName: string
  groomName: string
  email: string
}

export function OrderSummaryCard({
  summary,
  brideName,
  groomName,
  email,
}: OrderSummaryCardProps) {
  return (
    <Card className="gap-4 rounded-[18px] border border-border bg-card p-6 shadow-none">
      <h2 className="text-sm font-semibold text-foreground">{CHECKOUT_COPY.orderSummary}</h2>

      <div className="space-y-3">
        {summary.lineItems.map((item) => (
          <div
            key={item.label}
            className="flex items-start justify-between gap-4 rounded-xl border border-border bg-background px-4 py-3.5"
          >
            <p className="text-[13px] font-medium text-foreground">{item.label}</p>
            <p className="text-[13px] text-foreground">{item.displayAmount}</p>
          </div>
        ))}
      </div>

      <div className="flex items-start justify-between gap-4 border-t border-border pt-4">
        <div>
          <p className="text-[13px] font-semibold text-foreground">{summary.summaryLabel}</p>
          <p className="text-[13px] text-muted-foreground">
            {brideName} & {groomName}
          </p>
          <p className="text-[11px] text-muted-foreground">{email}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
            {CHECKOUT_COPY.totalLabel}
          </p>
          <p className="font-serif text-[22px] text-foreground">{summary.totalDisplay}</p>
        </div>
      </div>
    </Card>
  )
}
