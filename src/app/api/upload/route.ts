import { NextRequest, NextResponse } from 'next/server'
import { uploadToCloudinary } from '@/src/lib/cloudinary'
import { validateImage } from '@/src/lib/image-utils'

export async function POST(request: NextRequest) {
  console.log('=== UPLOAD API CALLED ===')

  try {
    // Check Cloudinary configuration
    console.log('🔧 Cloudinary config check:', {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Missing',
      apiKey: process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing',
      apiSecret: process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing'
    })

    const formData = await request.formData()
    console.log('FormData received')

    const file = formData.get('image') as File
    const type = formData.get('type') as string

    console.log('File info:', {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      type: type
    })

    if (!file || !type) {
      console.log('❌ File and type are required')
      return NextResponse.json(
        { error: 'File and type are required' },
        { status: 400 }
      )
    }

    // Validate image
    console.log('🔍 Validating image...')
    const validation = await validateImage(file)
    console.log('Validation result:', validation)

    if (!validation.valid) {
      console.log('❌ Validation failed:', validation.error)
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // Upload to Cloudinary
    console.log('☁️ Uploading to Cloudinary...')
    let cloudinaryResult

    try {
      cloudinaryResult = await uploadToCloudinary(file, `casarme/${type}`)
      console.log('✅ Cloudinary upload successful:', {
        public_id: cloudinaryResult.public_id,
        secure_url: cloudinaryResult.secure_url,
        width: cloudinaryResult.width,
        height: cloudinaryResult.height
      })
    } catch (cloudinaryError) {
      console.error('❌ Cloudinary upload failed:', cloudinaryError)
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
