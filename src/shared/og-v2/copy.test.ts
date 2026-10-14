import { describe, expect, it } from 'vitest'

import {
  resolveCreateInviteMetadataBySlug,
  resolveCreateInviteOgCopy,
  resolveHomeMetadata,
  resolveHomeOgCopy,
  toAbsoluteAssetUrl,
} from './copy'

describe('v2 og copy', () => {
  it('resolves home og copy from HOME_HERO and collage assets', () => {
    const copy = resolveHomeOgCopy()

    expect(copy.eyebrow).toBe('CONVITES DIGITAIS DE CASAMENTO')
    expect(copy.headline).toMatch(/história merece um convite à altura/)
    expect(copy.description).toMatch(/Escolham um modelo/)
    expect(copy.visual).toMatchObject({
      type: 'collage',
      gardenPhotoUrl: 'https://casarme.site/images/home-redesigned/hero-wedding-garden.png',
      templateThumbUrl: 'https://casarme.site/images/thumbs/blue/01.png',
    })
    expect(copy.metadata.title).toBe(`${copy.headline} — CasarMe`)
    expect(copy.metadata.description).toBe(copy.description)
  })

  it('resolves home metadata from HOME_HERO', () => {
    const metadata = resolveHomeMetadata()

    expect(metadata.title).toMatch(/história merece um convite à altura/)
    expect(metadata.title).toContain('CasarMe')
    expect(metadata.description).toMatch(/Escolham um modelo/)
  })

  it.each([
    ['azul', 'Azul', 'R$ 30,90', '/images/thumbs/blue/01.png'],
    ['dourado', 'Dourado', 'R$ 25,90', '/images/thumbs/golden/01.png'],
    ['garden', 'Verde Oliva', 'R$ 58,90', '/images/thumbs/garden/01.png'],
    ['romantic', 'Romântico', 'R$ 76,50', '/images/thumbs/romantico/01.png'],
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

  it('returns null for unknown create-invite slugs', () => {
    expect(resolveCreateInviteOgCopy('inexistente')).toBeNull()
    expect(resolveCreateInviteMetadataBySlug('inexistente')).toBeNull()
  })

  it('returns distinct metadata titles per template slug', () => {
    const titles = ['azul', 'dourado', 'garden', 'romantic'].map(
      (slug) => resolveCreateInviteMetadataBySlug(slug)?.title,
    )

    expect(new Set(titles).size).toBe(4)
    expect(titles).toEqual([
      'Criar convite Azul — CasarMe',
      'Criar convite Dourado — CasarMe',
      'Criar convite Verde Oliva — CasarMe',
      'Criar convite Romântico — CasarMe',
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
