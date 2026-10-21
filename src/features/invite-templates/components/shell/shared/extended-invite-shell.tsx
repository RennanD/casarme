import type { ReactNode } from 'react'

import { cn } from '@/src/shared/lib/cn'

import type { ExtendedInviteTheme } from '../../../model/themes/extended-invite-theme'

type ExtendedInviteShellProps = {
  theme: ExtendedInviteTheme
  className?: string
  children: ReactNode
}

export function ExtendedInviteShell({ theme, className, children }: ExtendedInviteShellProps) {
  return (
    <div
      className={cn('mx-auto min-h-screen w-full max-w-6xl', className)}
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      {children}
    </div>
  )
}
