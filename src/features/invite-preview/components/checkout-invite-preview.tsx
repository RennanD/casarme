'use client'

import { useState } from 'react'

import { Button } from '@/src/shared/ui'

import type { InvitePreviewData } from '../model/types'

import { InvitePreview } from './invite-preview'
import { PreviewModal } from './preview-modal'

type CheckoutInvitePreviewProps = {
  data: InvitePreviewData
  previewLabel: string
  expandLabel: string
  modalTitle: string
  modalDescription: string
}

export function CheckoutInvitePreview({
  data,
  previewLabel,
  expandLabel,
  modalTitle,
  modalDescription,
}: CheckoutInvitePreviewProps) {
  const [previewOpen, setPreviewOpen] = useState(false)

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-foreground">{previewLabel}</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPreviewOpen(true)}
          >
            {expandLabel}
          </Button>
        </div>
        <button
          type="button"
          onClick={() => setPreviewOpen(true)}
          className="w-full cursor-pointer text-left transition-opacity duration-150 ease-out hover:opacity-95 motion-reduce:transition-none"
        >
          <InvitePreview data={data} variant="compact" />
        </button>
      </div>

      <PreviewModal
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        data={data}
        title={modalTitle}
        description={modalDescription}
      />
    </>
  )
}
