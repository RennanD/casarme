import type { InvitePreviewData } from '../model/types'

import { RealInviteTemplate } from './real-invite-template'
import { WatermarkedPreviewShell } from './watermarked-preview-shell'

type InvitePreviewProps = {
  data: InvitePreviewData
  variant?: 'compact' | 'enlarged'
  className?: string
}

export function InvitePreview({
  data,
  variant = 'compact',
  className,
}: InvitePreviewProps) {
  return (
    <WatermarkedPreviewShell variant={variant} className={className}>
      <RealInviteTemplate data={data} />
    </WatermarkedPreviewShell>
  )
}
