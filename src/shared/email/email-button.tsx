import { Button } from '@react-email/components'
import type { CSSProperties, ReactNode } from 'react'

import { EMAIL_COLORS, EMAIL_FONTS, EMAIL_RADIUS } from './tokens'

type EmailButtonProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

const baseStyle: CSSProperties = {
  display: 'inline-block',
  padding: '14px 28px',
  borderRadius: EMAIL_RADIUS.button,
  fontSize: '15px',
  fontWeight: 600,
  fontFamily: EMAIL_FONTS.sans,
  textDecoration: 'none',
  textAlign: 'center',
  border: 'none',
}

const variantStyles: Record<NonNullable<EmailButtonProps['variant']>, CSSProperties> = {
  primary: {
    backgroundColor: EMAIL_COLORS.primary,
    color: EMAIL_COLORS.primaryForeground,
  },
  secondary: {
    backgroundColor: EMAIL_COLORS.foreground,
    color: EMAIL_COLORS.primaryForeground,
  },
}

export function EmailButton({ href, children, variant = 'primary' }: EmailButtonProps) {
  return (
    <Button href={href} style={{ ...baseStyle, ...variantStyles[variant] }}>
      {children}
    </Button>
  )
}
