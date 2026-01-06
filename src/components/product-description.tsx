"use client"

import { Check, Sparkles, Zap, Mail, ExternalLink } from "lucide-react"
import { TemplateSpec } from "@/src/lib/template-specs"
import { cn } from "@/src/lib/utils"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"

interface ProductDescriptionProps {
  template: TemplateSpec
  className?: string
}

export function ProductDescription({ template, className }: ProductDescriptionProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {/* Headline Section */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#D4A373]/10 text-[#D4A373] px-4 py-2 rounded-full text-sm font-medium">
          <Zap className="w-4 h-4" />
          Entrega Imediata
        </div>
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#3E3E3E] leading-tight">
          {template.persuasiveCopy.headline}
        </h1>
        <p className="text-lg md:text-xl text-[#6B6B6B] leading-relaxed">
          {template.persuasiveCopy.subheadline}
        </p>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-br from-[#FAF3E0] to-white rounded-2xl p-6 md:p-8 border border-[#D4A373]/20">
        <h2 className="font-serif text-2xl md:text-3xl text-[#3E3E3E] mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#D4A373]" />
          Por que escolher este modelo?
        </h2>
        <ul className="space-y-4 mb-6">
          {template.persuasiveCopy.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4A373]/20 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-[#D4A373]" />
              </div>
              <span className="text-[#6B6B6B] text-base md:text-lg leading-relaxed">{benefit}</span>
            </li>
          ))}
        </ul>
        <Link href={template.exampleLink}>
          <Button
            variant="outline"
            className="w-full border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373] hover:text-white transition-colors"
          >
            Ver Exemplo Interativo
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

      {/* Immediate Delivery Highlight */}
      <div className="bg-gradient-to-r from-[#D4A373] to-[#C49363] rounded-2xl p-6 md:p-8 text-white shadow-xl">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-xl md:text-2xl mb-2">Entrega Instantânea</h3>
            <p className="text-white/95 leading-relaxed">
              Após a aprovação da sua compra, seu convite é criado e enviado imediatamente para o
              e-mail cadastrado. Não há espera, não há atrasos. Você recebe seu convite pronto para
              compartilhar em minutos!
            </p>
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl md:text-3xl text-[#3E3E3E]">Especificações do Modelo</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Colors */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-[#3E3E3E] mb-4">Paleta de Cores</h3>
            <div className="flex flex-wrap gap-3">
              {template.specifications.colors.map((color, index) => {
                // Extract hex color if available
                const hexMatch = color.match(/#[0-9A-Fa-f]{6}/)
                const hexColor = hexMatch ? hexMatch[0] : undefined
                const colorName = color.split("(")[0].trim()
                
                return (
                  <div key={index} className="flex items-center gap-2">
                    {hexColor && (
                      <div
                        className="w-6 h-6 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: hexColor }}
                        aria-label={colorName}
                      />
                    )}
                    <span className="text-sm text-[#6B6B6B]">{colorName}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Style */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-[#3E3E3E] mb-4">Estilo</h3>
            <p className="text-[#6B6B6B]">{template.specifications.style}</p>
          </div>
        </div>

        {/* Customization Options */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-[#3E3E3E] mb-4">Personalizações Incluídas</h3>
          <ul className="grid md:grid-cols-2 gap-3">
            {template.specifications.customization.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#D4A373] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[#6B6B6B]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Features List */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-[#3E3E3E] mb-4">Recursos Incluídos</h3>
        <ul className="space-y-2">
          {template.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#D4A373] flex-shrink-0 mt-0.5" />
              <span className="text-[#6B6B6B]">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

