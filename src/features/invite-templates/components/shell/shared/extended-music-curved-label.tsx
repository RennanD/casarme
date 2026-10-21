'use client'

import { useId } from 'react'

type ExtendedMusicCurvedLabelProps = {
  accentColor: string
  fontFamily: string
  label?: string
}

/** "Tocar música" arqueado com contorno — referência Pencil (verde-oliva capa). */
export function ExtendedMusicCurvedLabel({
  accentColor,
  fontFamily,
  label = 'Tocar música',
}: ExtendedMusicCurvedLabelProps) {
  const arcId = useId()

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full overflow-visible"
      viewBox="0 0 148 148"
    >
      <defs>
        <path id={arcId} d="M 26 112 A 48 48 0 0 0 122 112" fill="none" />
      </defs>
      <text
        fontFamily={fontFamily}
        fontSize="12.5"
        letterSpacing="0.06em"
        fill={accentColor}
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinejoin="round"
        paintOrder="stroke fill"
      >
        <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
          {label}
        </textPath>
      </text>
    </svg>
  )
}
