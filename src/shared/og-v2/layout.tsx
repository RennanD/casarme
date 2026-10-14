import type { ReactNode } from 'react'

import type { OgImageCopy, OgVisual } from './copy'
import { OG_COLORS, OG_FONTS, OG_SIZE } from './tokens'

type OgLayoutProps = {
  copy: OgImageCopy
}

const imageFrameStyle = {
  objectFit: 'contain' as const,
  borderRadius: 12,
  border: `1px solid ${OG_COLORS.imageOutline}`,
  boxShadow: OG_COLORS.thumbShadow,
}

function renderCollage(visual: Extract<OgVisual, { type: 'collage' }>) {
  return (
    <>
      <img
        src={visual.gardenPhotoUrl}
        alt=""
        width={230}
        height={300}
        style={{
          ...imageFrameStyle,
          objectFit: 'cover',
          borderRadius: 12,
          position: 'absolute',
          left: 12,
          top: 56,
        }}
      />
      <img
        src={visual.templateThumbUrl}
        alt=""
        width={190}
        height={310}
        style={{
          ...imageFrameStyle,
          position: 'absolute',
          left: 188,
          top: 28,
          transform: 'rotate(5deg)',
        }}
      />
    </>
  )
}

function renderTemplate(visual: Extract<OgVisual, { type: 'template' }>) {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          display: 'flex',
          background: OG_COLORS.primary,
          color: OG_COLORS.primaryForeground,
          borderRadius: 999,
          padding: '8px 16px',
          fontFamily: OG_FONTS.sans,
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        {visual.badge}
      </div>
      <img
        src={visual.thumbUrl}
        alt=""
        width={280}
        height={400}
        style={{
          ...imageFrameStyle,
          position: 'absolute',
          left: 70,
          top: 40,
        }}
      />
    </>
  )
}

function renderVisual(visual: OgVisual): ReactNode {
  if (visual.type === 'collage') {
    return renderCollage(visual)
  }

  return renderTemplate(visual)
}

export function OgLayout({ copy }: OgLayoutProps) {
  return (
    <div
      style={{
        width: OG_SIZE.width,
        height: OG_SIZE.height,
        display: 'flex',
        background: OG_COLORS.background,
        position: 'relative',
        fontFamily: OG_FONTS.sans,
      }}
    >
      <div
        style={{
          width: 660,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '56px 48px 56px 72px',
          gap: 16,
          position: 'relative',
        }}
      >
        <div
          style={{
            fontFamily: OG_FONTS.sans,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: OG_COLORS.mutedForeground,
          }}
        >
          {copy.eyebrow}
        </div>

        <div
          style={{
            fontFamily: OG_FONTS.serif,
            fontSize: 44,
            lineHeight: 1.15,
            color: OG_COLORS.foreground,
            margin: 0,
          }}
        >
          {copy.headline}
        </div>

        <div
          style={{
            fontFamily: OG_FONTS.sans,
            fontSize: 16,
            lineHeight: 1.45,
            color: OG_COLORS.mutedForeground,
            margin: 0,
          }}
        >
          {copy.description}
        </div>

        <div style={{ height: 8 }} />

        <div
          style={{
            fontFamily: OG_FONTS.serif,
            fontSize: 22,
            color: OG_COLORS.foreground,
          }}
        >
          casarme
        </div>
      </div>

      <div
        style={{
          width: 540,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 40px 40px 16px',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: 460,
            height: 520,
            display: 'flex',
            background: OG_COLORS.secondary,
            borderRadius: 24,
            boxShadow: OG_COLORS.cardShadow,
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 20,
              top: 20,
              width: 420,
              height: 480,
              display: 'flex',
            }}
          >
            {renderVisual(copy.visual)}
          </div>
        </div>
      </div>
    </div>
  )
}
