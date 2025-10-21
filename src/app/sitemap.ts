import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://casarme.site'
  const currentDate = new Date()

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
    },
    {
      url: `${baseUrl}/criar`,
      lastModified: currentDate,
    },
    {
      url: `${baseUrl}/exemplo/garden`,
      lastModified: currentDate,
    },
    {
      url: `${baseUrl}/exemplo/romantic`,
      lastModified: currentDate,
    },
    {
      url: `${baseUrl}/exemplo/modern`,
      lastModified: currentDate,
    },
    {
      url: `${baseUrl}/convite/exemplo`,
      lastModified: currentDate,
    },
    {
      url: `${baseUrl}/termos-de-uso`,
      lastModified: currentDate,
    },
    {
      url: `${baseUrl}/politica-de-privacidade`,
      lastModified: currentDate,
    },
  ]
}
