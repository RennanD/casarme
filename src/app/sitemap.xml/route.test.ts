import { describe, expect, it } from 'vitest'

import {
  EXTENDED_TEMPLATE_SLUGS,
  getTemplateCreateHref,
  getTemplateDemoHref,
} from '@/src/shared/catalog'

import { GET } from './route'

describe('sitemap.xml', () => {
  it('includes demo and criar URLs for every extended template slug', async () => {
    const response = await GET()
    const xml = await response.text()

    for (const slug of EXTENDED_TEMPLATE_SLUGS) {
      expect(xml).toContain(`https://casarme.site${getTemplateDemoHref(slug)}`)
      expect(xml).toContain(`https://casarme.site${getTemplateCreateHref(slug)}`)
    }
  })

  it('includes static marketing pages', async () => {
    const response = await GET()
    const xml = await response.text()

    expect(xml).toContain('https://casarme.site')
    expect(xml).toContain('https://casarme.site/convite-padrinhos')
    expect(xml).toContain('https://casarme.site/termos-de-uso')
    expect(xml).toContain('https://casarme.site/politica-de-privacidade')
  })

  it('does not include legacy template slugs', async () => {
    const response = await GET()
    const xml = await response.text()

    for (const legacySlug of ['romantic', 'garden', 'blue', 'golden'] as const) {
      expect(xml).not.toContain(`/demo/${legacySlug}`)
      expect(xml).not.toContain(`/criar/${legacySlug}`)
    }
  })
})
