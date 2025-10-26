import { NextRequest, NextResponse } from 'next/server'
import { uploadToCloudinary } from '@/src/lib/cloudinary'
import { validateImage } from '@/src/lib/image-utils'

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

    // Upload to Cloudinary
    let cloudinaryResult

    try {
      cloudinaryResult = await uploadToCloudinary(file, `casarme/${type}`)
    } catch (cloudinaryError) {
      throw new Error(`Cloudinary upload failed: ${cloudinaryError instanceof Error ? cloudinaryError.message : 'Unknown error'}`)
    }

    // Return metadata in the same format as before
    const imageMetadata = {
      filename: cloudinaryResult.public_id,
      originalName: file.name,
      width: cloudinaryResult.width,
      height: cloudinaryResult.height,
      size: cloudinaryResult.bytes,
      type: type,
      url: cloudinaryResult.secure_url
    }

    console.log('📤 Returning success response')
    return NextResponse.json({
      success: true,
      image: imageMetadata
    })

  } catch (error) {
    console.error('❌ Upload error:', error)
    console.error('❌ Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      cause: error instanceof Error ? error.cause : 'No cause'
    })

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      {
        error: `Failed to upload image: ${errorMessage}`,
        details: error instanceof Error ? error.stack : 'No additional details'
      },
      { status: 500 }
    )
  }
}
