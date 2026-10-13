import { ImageResponse } from 'next/og'

import type { OgImageCopy } from './copy'
import { loadOgFonts } from './fonts'
import { OgLayout } from './layout'
import { OG_CONTENT_TYPE, OG_SIZE } from './tokens'

export { OG_CONTENT_TYPE, OG_SIZE }

export async function createV2OgImageResponse(copy: OgImageCopy) {
  const fonts = await loadOgFonts()

  return new ImageResponse(<OgLayout copy={copy} />, {
    ...OG_SIZE,
    fonts,
  })
}
