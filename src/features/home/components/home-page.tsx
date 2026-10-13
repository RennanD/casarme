import { HOME_ANCHORS } from '@/src/features/home/model/anchors'

import { FinalCtaSection } from './final-cta-section'
import { FaqSection } from './faq-section'
import { FeatureBentoSection } from './feature-bento-section'
import { HomeFooter } from './home-footer'
import { HomeHero } from './home-hero'
import { HomeNavbar } from './home-navbar'
import { HowItWorksSection } from './how-it-works-section'
import { BeforeCelebrationSection } from './before-celebration-section'
import { GuestExperienceSection } from './guest-experience-section'
import { PermanentPurchaseSection } from './permanent-purchase-section'
import { ProductDemoSection } from './product-demo-section'
import { SkipLinks } from './skip-links'
import { TemplateGridSection } from './template-grid-section'

export function HomePage() {
  return (
    <>
      <SkipLinks />

      <header>
        <HomeNavbar />
      </header>

      <main id={HOME_ANCHORS.mainContent} tabIndex={-1}>
        <HomeHero />
        <HowItWorksSection />
        <TemplateGridSection />
        <BeforeCelebrationSection />
        <ProductDemoSection />
        <FeatureBentoSection />
        <GuestExperienceSection />
        <PermanentPurchaseSection />
        <FaqSection />
        <FinalCtaSection />
      </main>

      <HomeFooter />
    </>
  )
}
