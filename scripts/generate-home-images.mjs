import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(root, '..')
const outDir = path.join(projectRoot, 'public/images/home-redesigned')

const jobs = [
  {
    src: 'images/generated-1791311768737.png',
    dest: 'hero-wedding-garden.webp',
    width: 960,
    height: 960,
    fit: 'cover',
    position: 'centre',
  },
  {
    src: 'images/generated-1791311763488.png',
    dest: 'invitation-phone.webp',
    width: 960,
    height: 1080,
    fit: 'cover',
    position: 'centre',
  },
  {
    src: 'images/generated-1791311768737.png',
    dest: 'celebration-guests.webp',
    width: 1200,
    height: 675,
    fit: 'cover',
    position: 'top',
  },
  {
    src: 'images/generated-1791311768737.png',
    dest: 'cta-wedding-photo.webp',
    width: 720,
    height: 900,
    fit: 'cover',
    position: 'left',
  },
  {
    src: 'images/generated-1791311131029.png',
    dest: 'invite-flatlay.webp',
    width: 960,
    height: 720,
    fit: 'cover',
    position: 'centre',
  },
]

for (const job of jobs) {
  const input = path.join(projectRoot, job.src)
  const output = path.join(outDir, job.dest)

  await sharp(input)
    .resize(job.width, job.height, { fit: job.fit, position: job.position })
    .webp({ quality: 92, effort: 6 })
    .toFile(output)

  const meta = await sharp(output).metadata()
  console.log(`${job.dest}: ${meta.width}x${meta.height}`)
}
