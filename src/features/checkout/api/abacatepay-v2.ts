import type { TransparentChargeStatus, TransparentCreatePayload } from '../model/types'

const ABACATEPAY_V2_BASE_URL = 'https://api.abacatepay.com/v2'

export type TransparentChargeData = {
  id: string
  amount: number
  status: TransparentChargeStatus
  brCode: string
  brCodeBase64: string
  expiresAt: string | null
  metadata?: Record<string, unknown>
}

type AbacatePayEnvelope<T> = {
  data: T | null
  error: { message?: string } | null
  success?: boolean | { message?: string }
}

function getApiKey(): string {
  const apiKey = process.env.ABACATEPAY_API_KEY
  if (!apiKey) {
    throw new Error('Missing environment variable: ABACATEPAY_API_KEY')
  }
  return apiKey
}

async function abacatePayRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<AbacatePayEnvelope<T>> {
  const response = await fetch(`${ABACATEPAY_V2_BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  const body = (await response.json().catch(() => ({}))) as AbacatePayEnvelope<T>

  if (!response.ok) {
    const message = body.error?.message ?? response.statusText
    throw new Error(`AbacatePay v2 request failed: ${message}`)
  }

  return body
}

export async function createTransparentCharge(
  payload: TransparentCreatePayload,
): Promise<TransparentChargeData> {
  const body = await abacatePayRequest<TransparentChargeData>('/transparents/create', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  if (!body.data) {
    throw new Error('AbacatePay v2 create returned empty data')
  }

  return body.data
}

export async function checkTransparentCharge(chargeId: string): Promise<TransparentChargeData> {
  const body = await abacatePayRequest<TransparentChargeData>(
    `/transparents/check?id=${encodeURIComponent(chargeId)}`,
    { method: 'GET' },
  )

  if (!body.data) {
    throw new Error('AbacatePay v2 check returned empty data')
  }

  return body.data
}

export async function getTransparentCharge(chargeId: string): Promise<TransparentChargeData> {
  const body = await abacatePayRequest<TransparentChargeData>(
    `/transparents/get?id=${encodeURIComponent(chargeId)}`,
    { method: 'GET' },
  )

  if (!body.data) {
    throw new Error('AbacatePay v2 get returned empty data')
  }

  return body.data
}
