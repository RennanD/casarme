import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  "inline-flex px-4 py-2 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium no-underline transition-[transform,background-color,color,box-shadow,opacity,text-decoration] duration-150 ease-out hover:no-underline focus:no-underline motion-safe:enabled:active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-primary-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20',
        outline:
          'border border-input bg-card shadow-xs hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary',
      },
      size: {
        default: 'h-12 px-5 py-2 has-[>svg]:px-4',
        sm: 'h-11 gap-1.5 px-4 has-[>svg]:px-3',
        lg: 'h-[52px] px-6 has-[>svg]:px-5',
        icon: 'size-11',
        'icon-sm': 'size-11',
        'icon-lg': 'size-[52px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)
