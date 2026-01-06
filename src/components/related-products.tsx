"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { TemplateSpec, getRelatedTemplates } from "@/src/lib/template-specs"
import { Check } from "lucide-react"

interface RelatedProductsProps {
  currentTemplateId: string
  className?: string
}

export function RelatedProducts({ currentTemplateId, className }: RelatedProductsProps) {
  const relatedTemplates = getRelatedTemplates(currentTemplateId)

  if (relatedTemplates.length === 0) {
    return null
  }

  return (
    <section className={className} aria-labelledby="related-products-title">
      <div className="container mx-auto px-4">
        <h2 id="related-products-title" className="font-serif text-2xl md:text-3xl text-[#3E3E3E] mb-6 text-center">
          Outros Modelos que Você Pode Gostar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {relatedTemplates.map((template) => (
            <Card
              key={template.id}
              className="overflow-hidden bg-white border-none shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="p-4 bg-gradient-to-b from-[#FAF3E0] to-white">
                <figure className="aspect-[3/4] relative rounded-lg overflow-hidden">
                  <Image
                    src={template.galleryImages[0] || "/placeholder.jpg"}
                    alt={`Preview do modelo ${template.name}`}
                    fill
                    className="object-cover"
                    loading="lazy"
                    quality={80}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </figure>
              </div>

              <div className="p-6">
                <header className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-xl font-semibold text-[#3E3E3E]">{template.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      template.plan === "Pro"
                        ? "bg-[#D4A373] text-white"
                        : "bg-[#8B9D7F] text-white"
                    }`}
                  >
                    {template.plan}
                  </span>
                </header>

                <div className="mb-3">
                  <span className="text-2xl font-bold text-[#D4A373]">{template.price}</span>
                </div>

                <p className="text-[#6B6B6B] text-sm mb-4 leading-relaxed line-clamp-2">
                  {template.shortDescription}
                </p>

                <ul className="space-y-1.5 mb-6">
                  {template.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#6B6B6B]">
                      <Check className="w-3 h-3 text-[#D4A373] flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={`/modelo/${template.id}`} className="block">
                  <Button
                    className={`w-full transition-colors ${
                      template.plan === "Pro"
                        ? "bg-[#D4A373] text-white hover:bg-[#C49363]"
                        : "bg-[#8B9D7F] text-white hover:bg-[#7A8C70]"
                    }`}
                    type="button"
                  >
                    Ver Detalhes
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

