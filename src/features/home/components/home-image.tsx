import Image, { type ImageProps } from 'next/image'

type HomeImageProps = Omit<ImageProps, 'quality'> & {
  quality?: number
}

export function HomeImage({ quality = 92, ...props }: HomeImageProps) {
  return <Image quality={quality} {...props} />
}
