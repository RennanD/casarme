import Image from 'next/image'
import { Star } from 'lucide-react'

import {
  HOME_TESTIMONIALS,
  HOME_TESTIMONIALS_SECTION,
} from '@/src/features/home/model/copy'
import { Card, CardContent } from '@/src/shared/ui'

export function TestimonialsSection() {
  return (
    <section
      className="bg-secondary px-4 py-16 sm:py-24"
      aria-labelledby="testimonials-title"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="testimonials-title" className="h2 mb-12 text-center md:mb-16">
          {HOME_TESTIMONIALS_SECTION.title}
        </h2>

        <div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Depoimentos de clientes"
        >
          {HOME_TESTIMONIALS.map((testimonial) => (
            <article key={testimonial.name} role="listitem">
              <Card className="h-full border-none bg-card py-6 shadow-md transition-shadow hover:shadow-lg motion-reduce:transition-none">
                <CardContent className="space-y-6">
                  <div
                    className="flex gap-1"
                    aria-label="5 estrelas"
                    aria-hidden
                  >
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className="fill-primary text-primary size-5"
                      />
                    ))}
                  </div>

                  <blockquote className="body italic">
                    <p>&ldquo;{testimonial.text}&rdquo;</p>
                  </blockquote>

                  <footer className="flex items-center gap-3">
                    <figure className="relative size-12 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.imagePath}
                        alt={`Foto de ${testimonial.name}`}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </figure>
                    <cite className="font-serif text-base font-semibold not-italic">
                      {testimonial.name}
                    </cite>
                  </footer>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
