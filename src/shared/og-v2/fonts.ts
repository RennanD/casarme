const GOOGLE_FONTS_USER_AGENT =
  'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/533.21 (KHTML, like Gecko) Chrome/15.0.875.86 Safari/533.21'

async function fetchGoogleFont(family: string, weight: number): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`,
    { headers: { 'User-Agent': GOOGLE_FONTS_USER_AGENT } },
  ).then((response) => response.text())

  const match = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype|woff2?|woff)'\)/)
  if (!match?.[1]) {
    throw new Error(`Failed to load font ${family} ${weight}`)
  }

  return fetch(match[1]).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch font file for ${family} ${weight}`)
    }
    return response.arrayBuffer()
  })
}

export type OgFontDefinition = {
  name: string
  data: ArrayBuffer
  weight: 400 | 600
  style: 'normal'
}

export async function loadOgFonts(): Promise<OgFontDefinition[]> {
  const [playfair, interRegular, interSemibold] = await Promise.all([
    fetchGoogleFont('Playfair Display', 400),
    fetchGoogleFont('Inter', 400),
    fetchGoogleFont('Inter', 600),
  ])

  return [
    { name: 'Playfair Display', data: playfair, weight: 400, style: 'normal' },
    { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
    { name: 'Inter', data: interSemibold, weight: 600, style: 'normal' },
  ]
}
