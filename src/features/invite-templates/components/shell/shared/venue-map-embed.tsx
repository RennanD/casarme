import { cn } from '@/src/shared/lib/cn'

import { buildGoogleMapsEmbedUrl } from '../../../model/venue-map'

type VenueMapEmbedProps = {
  address: string
  title?: string
  className?: string
}

export function VenueMapEmbed({ address, title = 'Local do evento', className }: VenueMapEmbedProps) {
  const src = buildGoogleMapsEmbedUrl(address)
  if (!src) return null

  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="size-full border-0"
        allowFullScreen
      />
    </div>
  )
}
