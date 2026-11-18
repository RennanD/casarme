import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const exportDir = path.join(root, '.scratch', 'issue-43', 'pencil-exports')
const publicDir = path.join(root, 'public', 'images')
const models = [
  { id: 'wyhur', slug: 'verde-oliva', name: 'Verde Oliva', bg: '#e9ede5', surface: '#fbfaf6', accent: '#75846b' },
  { id: 'TIq1g', slug: 'rosa', name: 'Rosa Florido', bg: '#f7e9eb', surface: '#fffaf8', accent: '#c8818e' },
  { id: 'M8JZEQ', slug: 'azul', name: 'Azul', bg: '#e9f0f6', surface: '#fcfbf8', accent: '#3f6388' },
  { id: 'BmNOt', slug: 'dourado', name: 'Dourado', bg: '#f2ead5', surface: '#fffdf7', accent: '#b69843' },
  { id: 'adw9H', slug: 'terracota', name: 'Terracota', bg: '#f3e7dc', surface: '#fffaf4', accent: '#b96c4d' },
]

function background(model, width, height) {
  return `<rect width="${width}" height="${height}" fill="${model.bg}"/><circle cx="${width * 0.16}" cy="${height * 0.18}" r="${height * 0.34}" fill="${model.surface}" opacity=".54"/><circle cx="${width * 0.9}" cy="${height * 0.86}" r="${height * 0.3}" fill="${model.accent}" opacity=".08"/><g fill="none" stroke="${model.accent}" stroke-width="3" opacity=".18"><path d="M 30 ${height * 0.84} C 150 ${height * 0.7}, 190 ${height * 0.5}, 135 ${height * 0.25}"/><path d="M 120 ${height * 0.67} C 72 ${height * 0.62}, 70 ${height * 0.55}, 103 ${height * 0.48} C 148 ${height * 0.52}, 147 ${height * 0.6}, 120 ${height * 0.67} Z"/><path d="M ${width - 25} ${height * 0.2} C ${width - 150} ${height * 0.34}, ${width - 190} ${height * 0.54}, ${width - 135} ${height * 0.77}"/><path d="M ${width - 120} ${height * 0.42} C ${width - 70} ${height * 0.47}, ${width - 72} ${height * 0.55}, ${width - 105} ${height * 0.62} C ${width - 150} ${height * 0.57}, ${width - 147} ${height * 0.49}, ${width - 120} ${height * 0.42} Z"/></g>`
}

function cardSvg(model, image) {
  const width = 1400
  const height = 1200
  const src = `data:image/png;base64,${image.toString('base64')}`
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><filter id="shadow" x="-30%" y="-20%" width="160%" height="160%"><feDropShadow dx="0" dy="20" stdDeviation="22" flood-color="#372a20" flood-opacity=".2"/></filter><clipPath id="phone-screen"><rect x="178" y="145" width="320" height="880" rx="37"/></clipPath><clipPath id="paper-screen"><rect x="730" y="85" width="420" height="1020"/></clipPath></defs>${background(model, width, height)}<g transform="rotate(-7 338 585)" filter="url(#shadow)"><rect x="154" y="105" width="368" height="960" rx="56" fill="#17191c"/><rect x="166" y="117" width="344" height="936" rx="46" fill="#090a0b"/><image href="${src}" x="178" y="145" width="320" height="880" preserveAspectRatio="xMidYMin slice" clip-path="url(#phone-screen)"/><rect x="273" y="120" width="130" height="24" rx="12" fill="#090a0b"/><rect x="294" y="1029" width="88" height="4" rx="2" fill="#a4a6a7" opacity=".7"/></g><g filter="url(#shadow)"><rect x="702" y="55" width="476" height="1080" rx="5" fill="${model.surface}"/><image href="${src}" x="730" y="85" width="420" height="1020" preserveAspectRatio="xMidYMin slice" clip-path="url(#paper-screen)"/><path d="M 702 1135 H 1178" stroke="${model.accent}" stroke-opacity=".24"/></g><circle cx="1244" cy="146" r="9" fill="${model.accent}" opacity=".48"/><circle cx="1265" cy="174" r="5" fill="${model.accent}" opacity=".28"/></svg>`
}

function phoneSvg(model, image) {
  const width = 1200
  const height = 1000
  const src = `data:image/png;base64,${image.toString('base64')}`
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><filter id="shadow" x="-30%" y="-20%" width="160%" height="150%"><feDropShadow dx="0" dy="22" stdDeviation="24" flood-color="#372a20" flood-opacity=".22"/></filter><clipPath id="screen"><rect x="432" y="112" width="336" height="726" rx="38"/></clipPath></defs>${background(model, width, height)}<g transform="rotate(-4 600 500)" filter="url(#shadow)"><rect x="408" y="72" width="384" height="806" rx="56" fill="#17191c"/><rect x="420" y="84" width="360" height="782" rx="46" fill="#090a0b"/><image href="${src}" x="432" y="112" width="336" height="726" preserveAspectRatio="xMidYMin slice" clip-path="url(#screen)"/><rect x="535" y="87" width="130" height="24" rx="12" fill="#090a0b"/><rect x="555" y="851" width="88" height="4" rx="2" fill="#a4a6a7" opacity=".7"/></g></svg>`
}

function flatlaySvg(model, image) {
  const width = 1200
  const height = 900
  const src = `data:image/png;base64,${image.toString('base64')}`
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><filter id="shadow" x="-25%" y="-20%" width="150%" height="150%"><feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#372a20" flood-opacity=".2"/></filter><clipPath id="paper"><rect x="402" y="84" width="396" height="704"/></clipPath></defs>${background(model, width, height)}<g transform="rotate(3 600 450)" filter="url(#shadow)"><rect x="370" y="52" width="460" height="768" rx="5" fill="${model.surface}"/><image href="${src}" x="402" y="84" width="396" height="704" preserveAspectRatio="xMidYMin slice" clip-path="url(#paper)"/></g><ellipse cx="250" cy="728" rx="68" ry="20" fill="${model.accent}" opacity=".12" transform="rotate(-24 250 728)"/><ellipse cx="958" cy="176" rx="64" ry="18" fill="${model.accent}" opacity=".13" transform="rotate(30 958 176)"/></svg>`
}

await mkdir(path.join(publicDir, 'home-redesigned'), { recursive: true })

for (const model of models) {
  const rawModel = path.join(exportDir, `${model.id}.png`)
  const modelMetadata = await sharp(rawModel).metadata()
  const source = await sharp(rawModel)
    .extract({ left: 0, top: 0, width: 780, height: Math.min(2200, modelMetadata.height) })
    .png()
    .toBuffer()
  const cardPath = path.join(publicDir, 'thumbs', model.slug, '01.png')
  await mkdir(path.dirname(cardPath), { recursive: true })
  await sharp(Buffer.from(cardSvg(model, source))).png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(cardPath)
}

if (process.argv.includes('--cards-only')) process.exit(0)

const verde = models[0]
const rosa = models[1]
const azul = models[2]
const dourado = models[3]
const terracota = models[4]
const greenSource = await sharp(path.join(exportDir, `${verde.id}.png`)).extract({ left: 0, top: 0, width: 780, height: 1800 }).png().toBuffer()
await sharp(Buffer.from(cardSvg(verde, greenSource)))
  .webp({ quality: 92, effort: 6 })
  .toFile(path.join(root, 'public', 'mockups.webp'))

const tabletInvite = `data:image/png;base64,${greenSource.toString('base64')}`
for (const assetName of ['hero-wedding-garden.webp', 'hero-wedding-garden.png']) {
  const sourcePath = path.join(publicDir, 'home-redesigned', assetName)
  const outputName = assetName.replace('hero-wedding-garden', 'hero-wedding-garden-with-invitation')
  const outputPath = path.join(publicDir, 'home-redesigned', outputName)
  const metadata = await sharp(sourcePath).metadata()
  const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${metadata.width}" height="${metadata.height}" viewBox="0 0 960 960"><defs><clipPath id="tablet-screen"><path d="M 458 516 L 632 524 L 629 740 L 454 732 Z"/></clipPath></defs><image href="${tabletInvite}" x="451" y="508" width="184" height="240" preserveAspectRatio="xMidYMin slice" clip-path="url(#tablet-screen)"/></svg>`)
  await sharp(sourcePath).composite([{ input: overlay }]).toFile(outputPath)
}
for (const [model, assetName] of [
  [rosa, 'hero-invitation-rosa.webp'],
  [azul, 'invitation-azul.webp'],
  [dourado, 'invitation-dourado.webp'],
]) {
  await sharp(path.join(exportDir, `${model.id}.png`))
    .extract({ left: 0, top: 0, width: 780, height: 1040 })
    .webp({ quality: 92, effort: 6 })
    .toFile(path.join(publicDir, 'home-redesigned', assetName))
}
const terraSource = await sharp(path.join(exportDir, `${terracota.id}.png`)).extract({ left: 0, top: 0, width: 780, height: 1300 }).png().toBuffer()
await sharp(Buffer.from(phoneSvg(verde, greenSource))).webp({ quality: 92, effort: 6 }).toFile(path.join(publicDir, 'home-redesigned', 'invitation-phone.webp'))
await sharp(Buffer.from(flatlaySvg(terracota, terraSource))).webp({ quality: 92, effort: 6 }).toFile(path.join(publicDir, 'home-redesigned', 'invite-flatlay.webp'))
