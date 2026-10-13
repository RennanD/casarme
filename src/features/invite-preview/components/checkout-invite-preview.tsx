import type { InvitePreviewData } from '../model/types'

import { InvitePreview } from './invite-preview'

type CheckoutInvitePreviewProps = {
  data: InvitePreviewData
  previewLabel: string
}

export function CheckoutInvitePreview({ data, previewLabel }: CheckoutInvitePreviewProps) {
  return (
    <section id="invite-preview" className="scroll-mt-8 space-y-3">
      <p className="text-sm font-semibold text-foreground">{previewLabel}</p>
      <InvitePreview data={data} variant="checkout" />
    </section>
  )
}
