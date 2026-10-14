import { notFound } from 'next/navigation'

import {
  createV2OgImageResponse,
  OG_CONTENT_TYPE,
  OG_SIZE,
  resolveCreateInviteOgCopy,
  resolveOgAssetBaseUrl,
} from '@/src/shared/og-v2'

export const runtime = 'edge'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

type CreateInviteOgImageProps = {
  params: Promise<{ slug: string }>
}

export default async function Image({ params }: CreateInviteOgImageProps) {
  const { slug } = await params
  const copy = resolveCreateInviteOgCopy(slug, resolveOgAssetBaseUrl())

  if (!copy) {
    notFound()
  }

  return createV2OgImageResponse(copy)
}
