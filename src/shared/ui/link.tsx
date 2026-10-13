import * as React from 'react'
import NextLink from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/src/shared/lib/cn'

const linkVariants = cva(
  'inline-flex items-center gap-1 rounded-sm no-underline transition-colors outline-none hover:no-underline focus:no-underline focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  {
    variants: {
      variant: {
        default: 'text-primary',
        muted: 'text-muted-foreground hover:text-foreground',
        nav: 'text-foreground font-medium hover:text-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Link({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof NextLink> &
  VariantProps<typeof linkVariants>) {
  return (
    <NextLink
      data-slot="link"
      className={cn(linkVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Link, linkVariants }
