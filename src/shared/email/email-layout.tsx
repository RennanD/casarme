import { Body, Container, Head, Html, Preview } from '@react-email/components'
import type { ReactNode } from 'react'

import { EMAIL_COLORS, EMAIL_FONTS, EMAIL_GOOGLE_FONTS_URL, EMAIL_LAYOUT } from './tokens'

type EmailLayoutProps = {
  preview: string
  title: string
  children: ReactNode
}

export function EmailLayout({ preview, title, children }: EmailLayoutProps) {
  return (
    <Html lang="pt-BR">
      <Head>
        <title>{title}</title>
        <link href={EMAIL_GOOGLE_FONTS_URL} rel="stylesheet" />
      </Head>
      <Preview>{preview}</Preview>
      <Body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: EMAIL_COLORS.background,
          fontFamily: EMAIL_FONTS.sans,
          lineHeight: '1.6',
        }}
      >
        <Container
          style={{
            maxWidth: EMAIL_LAYOUT.maxWidth,
            margin: '0 auto',
            padding: EMAIL_LAYOUT.containerPadding,
          }}
        >
          {children}
        </Container>
      </Body>
    </Html>
  )
}
