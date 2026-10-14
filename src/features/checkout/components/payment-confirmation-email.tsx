import { Img, Link, Section, Text } from '@react-email/components'

import {
  EmailButton,
  EmailFooter,
  EmailLayout,
  EMAIL_COLORS,
  EMAIL_FONTS,
  EMAIL_RADIUS,
} from '@/src/shared/email'

import { PAYMENT_CONFIRMATION_EMAIL_COPY } from '../model/payment-confirmation-email-copy'

type PaymentConfirmationEmailProps = {
  groomName: string
  brideName: string
  invitationUrl: string
  baseUrl: string
  plannerDownloadUrl?: string
}

export function PaymentConfirmationEmail({
  groomName,
  brideName,
  invitationUrl,
  baseUrl,
  plannerDownloadUrl,
}: PaymentConfirmationEmailProps) {
  const copy = PAYMENT_CONFIRMATION_EMAIL_COPY
  const heartIconUrl = `${baseUrl}/brand/icon-heart-cm.png`

  return (
    <EmailLayout
      preview={copy.preview}
      title={copy.subject(groomName, brideName)}
    >
      <Section style={{ marginBottom: '32px', textAlign: 'center' }}>
        <Link
          href={copy.siteUrl}
          style={{
            display: 'inline-block',
            textDecoration: 'none',
            color: EMAIL_COLORS.foreground,
          }}
        >
          <table
            cellPadding="0"
            cellSpacing="0"
            role="presentation"
            style={{ margin: '0 auto' }}
          >
            <tbody>
              <tr>
                <td style={{ verticalAlign: 'middle', paddingRight: '8px' }}>
                  <Img
                    src={heartIconUrl}
                    alt=""
                    width="24"
                    height="24"
                    style={{ display: 'block' }}
                  />
                </td>
                <td style={{ verticalAlign: 'middle' }}>
                  <Text
                    style={{
                      margin: 0,
                      fontSize: '22px',
                      fontFamily: EMAIL_FONTS.serif,
                      fontWeight: 400,
                      color: EMAIL_COLORS.foreground,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {copy.brandName}
                  </Text>
                </td>
              </tr>
            </tbody>
          </table>
        </Link>
      </Section>

      <Section style={{ marginBottom: '24px' }}>
        <Text
          style={{
            margin: '0 0 8px 0',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: EMAIL_COLORS.muted,
            fontFamily: EMAIL_FONTS.sans,
          }}
        >
          {copy.eyebrow}
        </Text>
        <Text
          style={{
            margin: '0 0 8px 0',
            fontSize: '28px',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: EMAIL_COLORS.foreground,
            fontFamily: EMAIL_FONTS.serif,
            lineHeight: '1.2',
          }}
        >
          {copy.title(groomName, brideName)}
        </Text>
        <Text
          style={{
            margin: 0,
            fontSize: '15px',
            lineHeight: '1.6',
            color: EMAIL_COLORS.muted,
            fontFamily: EMAIL_FONTS.sans,
          }}
        >
          {copy.lead}
        </Text>
      </Section>

      <Section
        style={{
          backgroundColor: EMAIL_COLORS.card,
          border: `1px solid ${EMAIL_COLORS.border}`,
          borderRadius: EMAIL_RADIUS.card,
          padding: '24px',
          marginBottom: '24px',
        }}
      >
        <Text
          style={{
            margin: '0 0 8px 0',
            fontSize: '14px',
            fontWeight: 600,
            color: EMAIL_COLORS.foreground,
            fontFamily: EMAIL_FONTS.sans,
          }}
        >
          {copy.inviteLinkLabel}
        </Text>
        <Text
          style={{
            margin: '0 0 20px 0',
            padding: '12px 16px',
            backgroundColor: EMAIL_COLORS.background,
            border: `1px solid ${EMAIL_COLORS.border}`,
            borderRadius: EMAIL_RADIUS.inner,
            fontSize: '14px',
            lineHeight: '1.5',
            color: EMAIL_COLORS.foreground,
            fontFamily: EMAIL_FONTS.sans,
            wordBreak: 'break-all',
          }}
        >
          {invitationUrl}
        </Text>
        <EmailButton href={invitationUrl}>{copy.cta}</EmailButton>
      </Section>

      {plannerDownloadUrl ? (
        <Section
          style={{
            backgroundColor: EMAIL_COLORS.secondary,
            border: `1px solid ${EMAIL_COLORS.border}`,
            borderRadius: EMAIL_RADIUS.card,
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <Text
            style={{
              margin: '0 0 8px 0',
              fontSize: '16px',
              fontWeight: 600,
              color: EMAIL_COLORS.foreground,
              fontFamily: EMAIL_FONTS.serif,
            }}
          >
            {copy.plannerTitle}
          </Text>
          <Text
            style={{
              margin: '0 0 20px 0',
              fontSize: '15px',
              lineHeight: '1.6',
              color: EMAIL_COLORS.muted,
              fontFamily: EMAIL_FONTS.sans,
            }}
          >
            {copy.plannerDescription}
          </Text>
          <EmailButton href={plannerDownloadUrl} variant="secondary">
            {copy.plannerCta}
          </EmailButton>
        </Section>
      ) : null}

      <Text
        style={{
          margin: '0 0 8px 0',
          fontSize: '14px',
          lineHeight: '1.6',
          color: EMAIL_COLORS.muted,
          fontFamily: EMAIL_FONTS.sans,
        }}
      >
        {copy.retentionNote}
      </Text>

      <EmailFooter
        tagline={copy.footerTagline}
        contactEmail={copy.contactEmail}
        siteUrl={copy.siteUrl}
      />
    </EmailLayout>
  )
}
