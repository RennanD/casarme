'use client'

import type { ReactNode } from 'react'

import { WatermarkedPreview } from '@/src/components/watermarked-preview'
import { cn } from '@/src/shared/lib/cn'

type WatermarkedPreviewShellProps = {
  children: ReactNode
  className?: string
  variant?: 'compact' | 'enlarged'
}

const VARIANT_STYLES = {
  compact:
    'scale-[0.65] origin-top opacity-75 blur-[1px] motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:blur-none',
  enlarged:
    'scale-[0.85] origin-top opacity-90 blur-[0.5px] motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:blur-none',
} as const

export function WatermarkedPreviewShell({
  children,
  className,
  variant = 'compact',
}: WatermarkedPreviewShellProps) {
  return (
    <div
      className={cn(
        'pointer-events-none overflow-hidden rounded-[14px] border border-border bg-card shadow-none transition-[opacity,transform,filter] duration-300 ease-out motion-reduce:transition-none',
        VARIANT_STYLES[variant],
        className,
      )}
    >
      <WatermarkedPreview>{children}</WatermarkedPreview>
    </div>
  )
}
