import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename

    // Use public directory for now
    const filePath = path.resolve(process.cwd(), 'public', 'uploads', filename)

    // Check if file exists
    try {
      await fs.access(filePath)
    } catch {
      return new NextResponse('Image not found', { status: 404 })
    }

    // Read the file
    const fileBuffer = await fs.readFile(filePath)

    // Determine content type based on file extension
    const ext = path.extname(filename).toLowerCase()
    let contentType = 'image/jpeg'

    switch (ext) {
      case '.png':
        contentType = 'image/png'
        break
      case '.webp':
        contentType = 'image/webp'
        break
      case '.gif':
        contentType = 'image/gif'
        break
      case '.bmp':
        contentType = 'image/bmp'
        break
      case '.tiff':
      case '.tif':
        contentType = 'image/tiff'
        break
      case '.svg':
        contentType = 'image/svg+xml'
        break
      case '.avif':
        contentType = 'image/avif'
        break
      case '.heic':
        contentType = 'image/heic'
        break
      case '.heif':
        contentType = 'image/heif'
        break
      case '.ico':
        contentType = 'image/x-icon'
        break
      default:
        contentType = 'image/jpeg'
    }

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })

  } catch (error) {
    console.error('Error serving image:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
