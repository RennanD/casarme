'use client'

import { ImagePlus, Loader2, X } from 'lucide-react'
import { useRef } from 'react'

import type { ImageMetadataValues } from '@/src/features/create-invite/model/schemas'
import { useImageUpload } from '@/src/hooks/use-image-upload'
import { getImageUrl } from '@/src/lib/image-url'
import { cn } from '@/src/shared/lib/cn'
import { Button } from '@/src/shared/ui'

type ImageUploadFieldProps = {
  id: string
  label: string
  helper?: string
  uploadType: string
  value?: ImageMetadataValues
  error?: string
  onChange: (metadata: ImageMetadataValues | undefined) => void
}

export function ImageUploadField({
  id,
  label,
  helper,
  uploadType,
  value,
  error,
  onChange,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { uploadImage, isUploading, error: uploadError, clearError } = useImageUpload()

  const displayError = error ?? uploadError ?? undefined

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    clearError()
    const metadata = await uploadImage(file, uploadType)
    if (metadata) {
      onChange(metadata)
    }

    event.target.value = ''
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={cn(
          'flex flex-col gap-3 rounded-lg border border-border bg-background px-3.5 py-3',
          displayError && 'border-destructive',
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-foreground">{label}</p>
            {helper ? <p className="text-xs text-muted-foreground">{helper}</p> : null}
          </div>
          {value ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-7 shrink-0"
              aria-label={`Remover ${label}`}
              onClick={() => onChange(undefined)}
            >
              <X className="size-4" aria-hidden />
            </Button>
          ) : null}
        </div>

        {value ? (
          <div className="overflow-hidden rounded-lg border border-transparent">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getImageUrl(value.filename)}
              alt={value.originalName}
              className="aspect-[4/3] w-full object-cover outline -outline-offset-1 outline-black/10 dark:outline-white/10"
            />
            <p className="mt-1.5 truncate text-xs text-muted-foreground">{value.originalName}</p>
          </div>
        ) : (
          <button
            type="button"
            id={id}
            disabled={isUploading}
            onClick={() => inputRef.current?.click()}
            className={cn(
              'flex min-h-28 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-card px-4 py-6 text-center transition-[transform,background-color,border-color] duration-150 ease-out',
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
              {isUploading ? 'Enviando foto...' : 'Clique para enviar uma foto'}
            </span>
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          aria-hidden
          onChange={handleFileChange}
        />
      </div>

      {displayError ? (
        <p className="text-xs text-destructive" role="alert">
          {displayError}
        </p>
      ) : null}
    </div>
  )
}
