import { NextResponse } from 'next/server'

export async function GET() {
  const urls = [
    '',
    '/criar',
    '/exemplo/garden',
    '/exemplo/romantic',
    '/exemplo/modern',
    '/convite/exemplo',
    '/termos-de-uso',
    '/politica-de-privacidade',
  ]

  const baseUrl = 'https://casarme.site'
  const currentDate = new Date().toISOString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
      .map(
        (path) => `<url>
  <loc>${baseUrl}${path}</loc>
  <lastmod>${currentDate}</lastmod>
</url>`
      )
      .join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}