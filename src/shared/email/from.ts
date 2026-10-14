export const EMAIL_SENDER_NAME = 'CasarMe'

export function resolveFromEmail(fromAddress = process.env.RESEND_FROM_EMAIL): string {
  if (!fromAddress) {
    throw new Error('RESEND_FROM_EMAIL is not configured')
  }

  if (fromAddress.includes('<')) {
    return fromAddress
  }

  return `${EMAIL_SENDER_NAME} <${fromAddress}>`
}
