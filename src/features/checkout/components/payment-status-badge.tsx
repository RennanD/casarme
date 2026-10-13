import { Badge } from '@/src/shared/ui'

import { CHECKOUT_COPY } from '../model/copy'

export function PaymentStatusBadge() {
  return (
    <Badge
      variant="outline"
      className="border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100"
    >
      {CHECKOUT_COPY.awaitingPayment}
    </Badge>
  )
}
