import type { LucideIcon } from 'lucide-react'

import { cn } from '@/src/shared/lib/cn'

type HomeIconBadgeProps = {
  icon: LucideIcon
  size?: 'sm' | 'lg'
  className?: string
}

export function HomeIconBadge({ icon: Icon, size = 'sm', className }: HomeIconBadgeProps) {
  return (
    <span className={cn(size === 'lg' ? 'icon-badge-lg' : 'icon-badge', className)}>
      <Icon className="size-3.5 stroke-[1.75]" aria-hidden />
    </span>
  )
}
