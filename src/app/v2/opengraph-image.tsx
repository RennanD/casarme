import {
  createV2OgImageResponse,
  OG_CONTENT_TYPE,
  OG_SIZE,
  resolveHomeOgCopy,
  resolveOgAssetBaseUrl,
} from '@/src/shared/og-v2'

export const runtime = 'edge'

export const alt = 'O começo de uma história merece um convite à altura. — CasarMe'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  return createV2OgImageResponse(resolveHomeOgCopy(resolveOgAssetBaseUrl()))
}
