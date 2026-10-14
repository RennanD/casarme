'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/src/shared/ui'

import type { InvitePreviewData } from '../model/types'

import { InvitePreview } from './invite-preview'

type PreviewModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: InvitePreviewData
  title: string
  description: string
}

export function PreviewModal({
  open,
  onOpenChange,
  data,
  title,
  description,
}: PreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-dvh max-w-md gap-0 overflow-hidden p-0 sm:max-w-md">
        <DialogHeader className="gap-1 border-b border-border px-6 py-5 text-left">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="overscroll-contain overflow-y-auto px-4 py-5 sm:px-6">
          <InvitePreview data={data} variant="enlarged" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
