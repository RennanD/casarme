import { NextRequest, NextResponse } from 'next/server'
import { processAndSaveImage, validateImage } from '@/src/lib/image-utils'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('image') as File
    const type = formData.get('type') as string

    if (!file || !type) {
      return NextResponse.json(
        { error: 'File and type are required' },
        { status: 400 }
      )
    }

    // Validate image
    const validation = await validateImage(file)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // Process and save image
    const imageMetadata = await processAndSaveImage(file, type)

    return NextResponse.json({
      success: true,
      image: imageMetadata
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}
