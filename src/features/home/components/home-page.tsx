import { HOME_ANCHORS } from '@/src/features/home/model/anchors'

import { HomeFooter } from './home-footer'
import { HomeHero } from './home-hero'
import { HomeNavbar } from './home-navbar'
import { SkipLinks } from './skip-links'
import { TemplateGridSection } from './template-grid-section'

export function HomePage() {
  return (
    <>
      <SkipLinks />

      <header>
        <HomeNavbar />
      </header>

      <main id={HOME_ANCHORS.mainContent}>
        <HomeHero />
        <TemplateGridSection />
      </main>

      <HomeFooter />
    </>
  )
}
