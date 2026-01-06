"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/src/lib/utils"

interface ProductImageGalleryProps {
  images: string[]
  alt: string
  className?: string
}

export function ProductImageGallery({ images, alt, className }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  const selectedImage = images[selectedImageIndex] || images[0]

  return (
    <div className={cn("flex flex-col md:flex-row gap-4", className)}>
      {/* Thumbnails - Vertical on desktop, horizontal on mobile */}
      <div className="flex md:flex-col gap-2 md:gap-4 order-2 md:order-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={cn(
              "relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200",
              selectedImageIndex === index
                ? "border-[#D4A373] ring-2 ring-[#D4A373]/20 shadow-md"
                : "border-gray-200 hover:border-[#D4A373]/50"
            )}
            aria-label={`Ver imagem ${index + 1} de ${images.length}`}
          >
            <Image
              src={image}
              alt={`${alt} - Imagem ${index + 1}`}
              fill
              className="object-cover"
              sizes="96px"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative w-full md:flex-1 aspect-[9/16] rounded-xl overflow-hidden bg-gray-100 order-1 md:order-2 shadow-lg">
        <Image
          src={selectedImage}
          alt={alt}
          fill
          className="object-cover transition-opacity duration-300"
          priority
          sizes="(max-width: 768px) 100vw, 70vw"
        />
      </div>
    </div>
  )
}

