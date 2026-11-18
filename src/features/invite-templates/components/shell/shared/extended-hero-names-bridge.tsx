import type { ReactNode } from 'react'

import type { HeroNamesBridge } from '../../../model/extended-hero-bridge'

type ExtendedHeroNamesBridgeProps = {
  bridge: HeroNamesBridge
  className?: string
  children: ReactNode
  style?: React.CSSProperties
}

/** Standalone names block after hero (legacy). Prefer ExtendedHeroCap. */
export function ExtendedHeroNamesBridge({
  bridge,
  className = '',
  children,
  style,
}: ExtendedHeroNamesBridgeProps) {
  return (
    <section
      className="relative"
      style={{
        backgroundColor: bridge.backgroundColor,
        paddingTop: bridge.contentPaddingTopPx,
        ...style,
      }}
    >
      <div className={className.trim()}>{children}</div>
    </section>
  )
}
