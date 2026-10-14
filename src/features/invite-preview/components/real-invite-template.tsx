'use client'

import { InviteRenderer } from '@/src/features/invite-templates'

import type { InvitePreviewData } from '../model/types'

type RealInviteTemplateProps = {
  data: InvitePreviewData
}

export function RealInviteTemplate({ data }: RealInviteTemplateProps) {
  return <InviteRenderer data={data} variant="preview" />
}
