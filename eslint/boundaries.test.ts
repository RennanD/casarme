import { describe, expect, it } from 'vitest'

import {
  appSharedUiPublicApiZones,
  boundaryZones,
  coreLayerZones,
  v2IsolationZones,
} from './boundaries.mjs'

describe('eslint boundary zones', () => {
  it('blocks shared from importing v1 and upper layers', () => {
    const sharedZone = coreLayerZones().find(
      (zone) => zone.target === './src/shared',
    )

    expect(sharedZone?.from).toEqual(
      expect.arrayContaining([
        './src/features',
        './src/app',
        './src/components',
        './src/lib',
        './src/hooks',
      ]),
    )
  })

  it('blocks v2 routes from importing v1 code', () => {
    expect(v2IsolationZones()).toEqual([
      {
        target: './src/app/v2',
        from: ['./src/components', './src/lib', './src/hooks'],
      },
    ])
  })

  it('requires app to import shared UI via the barrel', () => {
    expect(appSharedUiPublicApiZones()).toEqual([
      {
        target: './src/app',
        from: './src/shared/ui',
        except: ['./index.ts', './index'],
      },
    ])
  })

  it('includes all core zones in the exported config', () => {
    const zones = boundaryZones()

    expect(zones.some((zone) => zone.target === './src/shared')).toBe(true)
    expect(zones.some((zone) => zone.target === './src/app/v2')).toBe(true)
    expect(zones.some((zone) => zone.target === './src/features')).toBe(true)
  })
})
