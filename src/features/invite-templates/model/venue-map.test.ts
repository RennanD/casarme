import { describe, expect, it } from 'vitest'

import {
  buildGoogleMapsEmbedUrl,
  buildGoogleMapsSearchUrl,
} from './venue-map'

describe('venue-map', () => {
  it('builds embed url from address', () => {
    const url = buildGoogleMapsEmbedUrl('Rua das Flores, 123 - São Paulo')
    expect(url).toContain('maps.google.com/maps?q=')
    expect(url).toContain('output=embed')
    expect(url).toContain(encodeURIComponent('Rua das Flores, 123 - São Paulo'))
  })

  it('returns empty embed url for blank address', () => {
    expect(buildGoogleMapsEmbedUrl('')).toBe('')
    expect(buildGoogleMapsEmbedUrl('   ')).toBe('')
  })

  it('builds search url for external navigation', () => {
    const url = buildGoogleMapsSearchUrl('Rua das Flores, 123')
    expect(url).toBe(
      'https://www.google.com/maps/search/?api=1&query=Rua%20das%20Flores%2C%20123',
    )
  })
})
