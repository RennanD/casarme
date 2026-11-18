import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { getImageUrl } from './image-url'

describe('getImageUrl', () => {
  const originalCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  beforeEach(() => {
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'test-cloud'
  })

  afterEach(() => {
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = originalCloudName
  })

  it('returns local public asset paths as-is', () => {
    expect(getImageUrl('/images/demo/rosa/hero.jpg')).toBe('/images/demo/rosa/hero.jpg')
    expect(getImageUrl('/images/demo/shared/gallery-01.jpg')).toBe(
      '/images/demo/shared/gallery-01.jpg',
    )
  })

  it('returns absolute urls as-is', () => {
    const url = 'https://example.com/photo.jpg'
    expect(getImageUrl(url)).toBe(url)
  })

  it('returns the upload api route for plain filenames', () => {
    expect(getImageUrl('abc123.jpg')).toBe('/api/image/abc123.jpg')
  })

  it('returns cloudinary urls for folder-style public ids', () => {
    expect(getImageUrl('uploads/folder/image.jpg')).toBe(
      'https://res.cloudinary.com/test-cloud/image/upload/q_auto,f_auto/uploads/folder/image.jpg',
    )
  })
})
