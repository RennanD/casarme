import { Check } from 'lucide-react'

import { HomeIconBadge } from '@/src/features/home/components/home-icon-badge'
import { cn } from '@/src/shared/lib/cn'

type HomeCheckListProps = {
  items: readonly string[]
  className?: string
  itemClassName?: string
}

export function HomeCheckList({ items, className, itemClassName }: HomeCheckListProps) {
  return (
    <ul className={cn('space-y-2.5', className)}>
      {items.map((item) => (
        <li key={item} className={cn('flex items-start gap-2.5 text-xs text-foreground', itemClassName)}>
          <HomeIconBadge icon={Check} className="mt-0.5" />
          <span className="pt-0.5 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}
