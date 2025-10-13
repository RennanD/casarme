import { NextRequest, NextResponse } from 'next/server'
import { uploadToCloudinary } from '@/src/lib/cloudinary'
import { validateImage } from '@/src/lib/image-utils'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('image') as File
    const type = formData.get('type') as string

    if (!file || !type) {
      console.log('File and type are required')
      return NextResponse.json(
        { error: 'File and type are required' },
        { status: 400 }
      )
    }

    // Validate image
    const validation = await validateImage(file)
    if (!validation.valid) {
      console.log(validation.error)
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // Upload to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(file, `casarme/${type}`)

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
