import { describe, expect, it } from 'vitest'

import componentsJson from './components.json'
import componentsV1Json from './components.v1.json'

describe('shadcn CLI configuration', () => {
  describe('components.json (v2 default)', () => {
    it('points CSS to the v2 self-contained global stylesheet', () => {
      expect(componentsJson.tailwind.css).toBe('src/app/v2/globals.css')
    })

    it('does not reference the legacy neutral token file', () => {
      expect(componentsJson.tailwind.css).not.toBe('src/styles/globals.css')
    })

    it('targets the v2 shared UI layer for component output', () => {
      expect(componentsJson.aliases.ui).toBe('@/src/shared/ui')
      expect(componentsJson.aliases.components).toBe('@/src/shared/ui')
    })

    it('targets the shared cn utility and lib barrel', () => {
      expect(componentsJson.aliases.utils).toBe('@/src/shared/lib/cn')
      expect(componentsJson.aliases.lib).toBe('@/src/shared/lib')
    })
  })

  describe('components.v1.json (legacy)', () => {
    it('keeps v1 paths for intentional legacy additions', () => {
      expect(componentsV1Json.aliases.ui).toBe('@/components/ui')
      expect(componentsV1Json.aliases.components).toBe('@/components')
      expect(componentsV1Json.tailwind.css).toBe('app/globals.css')
    })
  })
})
