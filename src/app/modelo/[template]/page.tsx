import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navbar } from "@/src/components/navbar"
import { Footer } from "@/src/components/footer"
import { ProductImageGallery } from "@/src/components/product-image-gallery"
import { ProductDescription } from "@/src/components/product-description"
import { RelatedProducts } from "@/src/components/related-products"
import { getTemplateSpec } from "@/src/lib/template-specs"
import CreateInvitationFormWrapper from "./create-invitation-form-wrapper"
import { MobileCTAButton } from "./mobile-cta-button"

interface PageProps {
  params: Promise<{ template: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { template: templateId } = await params
  const template = getTemplateSpec(templateId)

  if (!template) {
    return {
      title: "Modelo não encontrado - CasarMe",
    }
  }

  return {
    title: `${template.name} - Convite de Casamento Digital | CasarMe`,
    description: template.persuasiveCopy.seoDescription,
    keywords: [
      `convite de casamento ${template.name.toLowerCase()}`,
      "convite digital",
      "convite casamento online",
      "criar convite casamento",
      "template convite casamento",
      template.name.toLowerCase(),
    ],
    openGraph: {
      title: `${template.name} - Convite de Casamento Digital | CasarMe`,
      description: template.persuasiveCopy.seoDescription,
      type: "website",
      url: `https://casarme.com.br/modelo/${template.id}`,
      siteName: "CasarMe",
      images: [
        {
          url: template.galleryImages[0] || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `Modelo ${template.name} - CasarMe`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${template.name} - Convite de Casamento Digital`,
      description: template.persuasiveCopy.seoDescription,
      images: [template.galleryImages[0] || "/og-image.jpg"],
    },
  }
}

export default async function ModeloPage({ params }: PageProps) {
  const { template: templateId } = await params
  const template = getTemplateSpec(templateId)

  if (!template) {
    notFound()
  }

  // Structured Data for Product
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Convite de Casamento Digital ${template.name}`,
    description: template.persuasiveCopy.seoDescription,
    image: template.galleryImages,
    brand: {
      "@type": "Brand",
      name: "CasarMe",
    },
    offers: {
      "@type": "Offer",
      price: template.price.replace("R$ ", "").replace(",", "."),
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url: `https://casarme.com.br/modelo/${template.id}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header>
        <Navbar />
      </header>
      <main className="min-h-screen bg-gradient-to-b from-[#FAF3E0] to-white">
        <div className="pt-24 pb-16">
          {/* Breadcrumbs */}
          <div className="container mx-auto px-4 mb-8">
            <nav aria-label="Breadcrumb" className="text-sm text-[#6B6B6B]">
              <ol className="flex items-center gap-2">
                <li>
                  <a href="/" className="hover:text-[#D4A373] transition-colors">
                    Início
                  </a>
                </li>
                <li>/</li>
                <li>
                  <a href="/#templates" className="hover:text-[#D4A373] transition-colors">
                    Modelos
                  </a>
                </li>
                <li>/</li>
                <li className="text-[#3E3E3E] font-medium">{template.name}</li>
              </ol>
            </nav>
          </div>

          {/* Hero Section */}
          <section className="container mx-auto px-4 mb-12">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`text-xs px-3 py-1 rounded-full ${template.plan === "Pro"
                      ? "bg-[#D4A373] text-white"
                      : "bg-[#8B9D7F] text-white"
                    }`}
                >
                  {template.plan}
                </span>
                <span className="text-2xl md:text-3xl font-bold text-[#D4A373]">{template.price}</span>
              </div>
            </div>
          </section>

          {/* Main Content Grid - Desktop: Gallery/Description | Form, Mobile: Gallery → CTA → Description → Form */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-6xl mx-auto">
              {/* Mobile Layout: Gallery → CTA → Description → Form */}
              <div className="lg:hidden space-y-8">
                {/* Image Gallery */}
                <div>
                  <ProductImageGallery images={template.galleryImages} alt={`Modelo ${template.name}`} />
                </div>

                {/* CTA Button for Mobile */}
                <MobileCTAButton templatePlan={template.plan} templateName={template.name} />

                {/* Product Description */}
                <div>
                  <ProductDescription template={template} />
                </div>

                {/* Form Section */}
                <div id="form-section" className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <CreateInvitationFormWrapper selectedTemplateId={template.id} />
                </div>
              </div>

              {/* Desktop Layout: Gallery/Description | Form */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Column: Gallery and Description */}
                <div className="space-y-8">
                  {/* Image Gallery */}
                  <div>
                    <ProductImageGallery images={template.galleryImages} alt={`Modelo ${template.name}`} />
                  </div>

                  {/* Product Description */}
                  <div>
                    <ProductDescription template={template} />
                  </div>
                </div>

                {/* Right Column: Form */}
                <div className="lg:sticky lg:top-24 lg:h-fit">
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200">
                    <CreateInvitationFormWrapper selectedTemplateId={template.id} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Products */}
          <section className="container mx-auto px-4">
            <RelatedProducts currentTemplateId={template.id} />
          </section>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

