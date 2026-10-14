import type { ReactNode } from 'react'

import { cn } from '@/src/shared/lib/cn'

import { Label } from '@/src/shared/ui'

type FormFieldGroupProps = {
  id: string
  label: string
  helper?: string
  error?: string
  children: ReactNode
  className?: string
}

export function FormFieldGroup({
  id,
  label,
  helper,
  error,
  children,
  className,
}: FormFieldGroupProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div
        className={cn(
          'flex flex-col gap-1.5 rounded-lg border border-border bg-background px-3.5 py-3',
          error && 'border-destructive',
        )}
      >
        <Label htmlFor={id} className="text-xs font-semibold text-foreground">
          {label}
        </Label>
        {children}
      </div>
      {helper ? <p className="text-xs text-muted-foreground">{helper}</p> : null}
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
