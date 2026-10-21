import { describe, expect, it } from 'vitest'

import {
  resolveCreateInviteMetadataBySlug,
  resolveCreateInviteOgCopy,
  resolveDemoMetadataBySlug,
  resolveDemoOgCopy,
  resolveHomeMetadata,
  resolveHomeOgCopy,
  toAbsoluteAssetUrl,
} from './copy'

describe('v2 og copy', () => {
  it('resolves home og copy from HOME_HERO and collage assets', () => {
    const copy = resolveHomeOgCopy()

    expect(copy.eyebrow).toBe('Para o seu casamento')
    expect(copy.headline).toMatch(/convite de todo mundo/)
    expect(copy.description).toMatch(/navegador/)
    expect(copy.visual).toMatchObject({
      type: 'collage',
      gardenPhotoUrl: 'https://casarme.site/images/home-redesigned/hero-wedding-garden.png',
      templateThumbUrl: 'https://casarme.site/images/thumbs/azul/01.png',
    })
    expect(copy.metadata.title).toBe(`${copy.headline} — CasarMe`)
    expect(copy.metadata.description).toBe(copy.description)
  })

  it('resolves home metadata from HOME_HERO', () => {
    const metadata = resolveHomeMetadata()

    expect(metadata.title).toMatch(/convite de todo mundo/)
    expect(metadata.title).toContain('CasarMe')
    expect(metadata.description).toMatch(/navegador/)
  })

  it.each([
    ['verde-oliva', 'Verde Oliva', 'R$ 76,50', '/images/thumbs/verde-oliva/01.png'],
    ['rosa', 'Rosa Florido', 'R$ 76,50', '/images/thumbs/rosa/01.png'],
    ['azul', 'Azul', 'R$ 76,50', '/images/thumbs/azul/01.png'],
    ['dourado', 'Dourado', 'R$ 76,50', '/images/thumbs/dourado/01.png'],
    ['terracota', 'Terracota', 'R$ 76,50', '/images/thumbs/terracota/01.png'],
  ] as const)(
    'resolves create-invite og copy for slug %s',
    (slug, name, price, imagePath) => {
      const copy = resolveCreateInviteOgCopy(slug)

      expect(copy).not.toBeNull()
      expect(copy?.headline).toBe(`Crie seu convite ${name}`)
      expect(copy?.eyebrow).toBe('CRIAR CONVITE DIGITAL')
      expect(copy?.visual).toMatchObject({
        type: 'template',
        badge: price,
        thumbUrl: `https://casarme.site${imagePath}`,
      })
      expect(copy?.metadata.title).toBe(`Criar convite ${name} — CasarMe`)
      expect(copy?.metadata.description).toBe(copy?.description)
    },
  )

  it.each([
    ['verde-oliva', 'Verde Oliva', 'R$ 76,50', '/images/thumbs/verde-oliva/01.png'],
    ['rosa', 'Rosa Florido', 'R$ 76,50', '/images/thumbs/rosa/01.png'],
    ['azul', 'Azul', 'R$ 76,50', '/images/thumbs/azul/01.png'],
    ['dourado', 'Dourado', 'R$ 76,50', '/images/thumbs/dourado/01.png'],
    ['terracota', 'Terracota', 'R$ 76,50', '/images/thumbs/terracota/01.png'],
  ] as const)(
    'resolves demo og copy for slug %s',
    (slug, name, price, imagePath) => {
      const copy = resolveDemoOgCopy(slug)

      expect(copy).not.toBeNull()
      expect(copy?.headline).toBe(`Demonstração ${name}`)
      expect(copy?.eyebrow).toBe('DEMONSTRAÇÃO')
      expect(copy?.visual).toMatchObject({
        type: 'template',
        badge: price,
        thumbUrl: `https://casarme.site${imagePath}`,
      })
      expect(copy?.metadata.title).toBe(`Demonstração ${name} — CasarMe`)
    },
  )

  it('returns null for unknown create-invite slugs', () => {
    expect(resolveCreateInviteOgCopy('inexistente')).toBeNull()
    expect(resolveCreateInviteMetadataBySlug('inexistente')).toBeNull()
    expect(resolveDemoOgCopy('inexistente')).toBeNull()
    expect(resolveDemoMetadataBySlug('inexistente')).toBeNull()
  })

  it('returns distinct metadata titles per template slug', () => {
    const titles = ['verde-oliva', 'rosa', 'azul', 'dourado', 'terracota'].map(
      (slug) => resolveCreateInviteMetadataBySlug(slug)?.title,
    )

    expect(new Set(titles).size).toBe(5)
    expect(titles).toEqual([
      'Criar convite Verde Oliva — CasarMe',
      'Criar convite Rosa Florido — CasarMe',
      'Criar convite Azul — CasarMe',
      'Criar convite Dourado — CasarMe',
      'Criar convite Terracota — CasarMe',
    ])
  })

  it('builds absolute asset urls from relative paths', () => {
    expect(toAbsoluteAssetUrl('/images/thumbs/blue/01.png')).toBe(
      'https://casarme.site/images/thumbs/blue/01.png',
    )
    expect(toAbsoluteAssetUrl('https://cdn.example.com/thumb.png')).toBe(
      'https://cdn.example.com/thumb.png',
    )
  })
})
