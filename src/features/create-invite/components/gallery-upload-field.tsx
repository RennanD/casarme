'use client'

import { ImagePlus, Loader2, X } from 'lucide-react'
import { useRef, useState } from 'react'

import { ROMANTIC_GALLERY_MAX_PHOTOS } from '@/src/features/create-invite/model/defaults'
import type { ImageMetadataValues } from '@/src/features/create-invite/model/schemas'
import { useImageUpload } from '@/src/features/create-invite/hooks/use-image-upload'
import { getImageUrl } from '@/src/shared/lib/image-url'
import { cn } from '@/src/shared/lib/cn'
import { Button } from '@/src/shared/ui'

type GalleryUploadFieldProps = {
  id: string
  label: string
  helper?: string
  uploadType?: string
  value: ImageMetadataValues[]
  maxPhotos?: number
  error?: string
  onChange: (gallery: ImageMetadataValues[]) => void
}

export function GalleryUploadField({
  id,
  label,
  helper,
  uploadType = 'gallery',
  value,
  maxPhotos = ROMANTIC_GALLERY_MAX_PHOTOS,
  error,
  onChange,
}: GalleryUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { uploadImage, isUploading, error: uploadError, clearError } = useImageUpload()
  const [localError, setLocalError] = useState<string | null>(null)

  const displayError = error ?? uploadError ?? localError ?? undefined
  const remainingSlots = maxPhotos - value.length
  const canAddMore = remainingSlots > 0

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ''

    if (files.length === 0) return

    clearError()
    setLocalError(null)

    const availableSlots = maxPhotos - value.length
    if (availableSlots <= 0) {
      setLocalError(`Você já adicionou o máximo de ${maxPhotos} fotos.`)
      return
    }

    const filesToUpload = files.slice(0, availableSlots)
    const uploaded: ImageMetadataValues[] = []

    for (const file of filesToUpload) {
      const metadata = await uploadImage(file, uploadType)
      if (metadata) {
        uploaded.push(metadata)
      }
    }

    if (uploaded.length > 0) {
      onChange([...value, ...uploaded].slice(0, maxPhotos))
    }

    if (files.length > availableSlots) {
      setLocalError(`Só é possível adicionar mais ${availableSlots} foto(s).`)
    }
  }

  const handleRemove = (index: number) => {
    onChange(value.filter((_, itemIndex) => itemIndex !== index))
    setLocalError(null)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={cn(
          'flex flex-col gap-3 rounded-lg border border-border bg-background px-3.5 py-3',
          displayError && 'border-destructive',
        )}
      >
        <div>
          <p className="text-xs font-semibold text-foreground">{label}</p>
          {helper ? <p className="text-xs text-muted-foreground">{helper}</p> : null}
        </div>

        {canAddMore ? (
          <button
            type="button"
            id={id}
            disabled={isUploading}
            onClick={() => inputRef.current?.click()}
            className={cn(
              'flex min-h-24 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-card px-4 py-5 text-center transition-[transform,background-color,border-color] duration-150 ease-out',
              'motion-safe:enabled:active:scale-[0.96] motion-reduce:enabled:active:scale-100',
              'hover:border-primary/40 hover:bg-background',
            )}
          >
            {isUploading ? (
              <Loader2 className="size-5 animate-spin text-muted-foreground" aria-hidden />
            ) : (
              <ImagePlus className="size-5 text-muted-foreground" aria-hidden />
            )}
            <span className="text-xs text-muted-foreground">
              {isUploading
                ? 'Enviando fotos...'
                : `Selecionar fotos (${value.length}/${maxPhotos})`}
            </span>
          </button>
        ) : (
          <p className="text-xs text-muted-foreground">
            Galeria completa — {maxPhotos} fotos adicionadas.
          </p>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          aria-hidden
          onChange={handleFileChange}
        />

        {value.length > 0 ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {value.map((item, index) => (
              <li key={`${item.filename}-${index}`} className="group relative">
                <div className="overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getImageUrl(item.filename)}
                    alt={item.originalName}
                    className="aspect-square w-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute -top-2 -right-2 size-7 rounded-full border border-border bg-background opacity-100 shadow-sm sm:opacity-0 sm:group-hover:opacity-100"
                  aria-label={`Remover ${item.originalName}`}
                  onClick={() => handleRemove(index)}
                >
                  <X className="size-3.5" aria-hidden />
                </Button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {displayError ? (
        <p className="text-xs text-destructive" role="alert">
          {displayError}
        </p>
      ) : null}
    </div>
  )
}
