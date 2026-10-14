import { describe, expect, it } from 'vitest'

import { HOME_CATALOG } from '@/src/shared/catalog'

import { getSampleDataBySlug } from './sample-data'

describe('demo sample-data', () => {
  it('provides a complete sample payload for every catalog slug', () => {
    for (const entry of HOME_CATALOG) {
      const sample = getSampleDataBySlug(entry.slug)

      expect(sample).not.toBeNull()
      expect(sample?.template).toBe(entry.id)
      expect(sample?.groomName.length).toBeGreaterThan(0)
      expect(sample?.brideName.length).toBeGreaterThan(0)
      expect(sample?.venueAddress.length).toBeGreaterThan(0)
      expect(sample?.welcomeMessage.length).toBeGreaterThan(0)
    }
  })

  it('returns null for unknown slugs', () => {
    expect(getSampleDataBySlug('modern')).toBeNull()
    expect(getSampleDataBySlug('invalid')).toBeNull()
  })
})
