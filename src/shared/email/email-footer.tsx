import { Hr, Link, Section, Text } from '@react-email/components'

import { EMAIL_COLORS, EMAIL_FONTS } from './tokens'

type EmailFooterProps = {
  tagline: string
  contactEmail: string
  siteUrl: string
}

export function EmailFooter({ tagline, contactEmail, siteUrl }: EmailFooterProps) {
  const siteLabel = siteUrl.replace(/^https?:\/\//, '')

  return (
    <Section style={{ marginTop: '32px' }}>
      <Hr style={{ borderColor: EMAIL_COLORS.border, margin: '0 0 24px 0' }} />
      <Text
        style={{
          margin: '0 0 8px 0',
          fontSize: '11px',
          lineHeight: '1.5',
          color: EMAIL_COLORS.muted,
          fontFamily: EMAIL_FONTS.sans,
          textAlign: 'center',
        }}
      >
        {tagline}
      </Text>
      <Text
        style={{
          margin: '0 0 4px 0',
          fontSize: '11px',
          lineHeight: '1.5',
          color: EMAIL_COLORS.muted,
          fontFamily: EMAIL_FONTS.sans,
          textAlign: 'center',
        }}
      >
        <Link
          href={`mailto:${contactEmail}`}
          style={{ color: EMAIL_COLORS.muted, textDecoration: 'underline' }}
        >
          {contactEmail}
        </Link>
      </Text>
      <Text
        style={{
          margin: 0,
          fontSize: '11px',
          lineHeight: '1.5',
          color: EMAIL_COLORS.muted,
          fontFamily: EMAIL_FONTS.sans,
          textAlign: 'center',
        }}
      >
        <Link href={siteUrl} style={{ color: EMAIL_COLORS.muted, textDecoration: 'underline' }}>
          {siteLabel}
        </Link>
      </Text>
    </Section>
  )
}
