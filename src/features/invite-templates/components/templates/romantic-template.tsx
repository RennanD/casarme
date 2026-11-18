'use client'

import { InviteMusicPlayer } from '../shell/invite-music-player'
import { RomanticCeremonySection } from '../shell/romantic/ceremony-section'
import { RomanticCountdownSection } from '../shell/romantic/countdown-section'
import { RomanticCoupleSection } from '../shell/romantic/couple-section'
import { RomanticFooterSection } from '../shell/romantic/footer-section'
import { RomanticGallerySection } from '../shell/romantic/gallery-section'
import { RomanticHeroSection } from '../shell/romantic/hero-section'
import { RomanticRsvpSection } from '../shell/romantic/rsvp-section'
import { RomanticWelcomeSection } from '../shell/romantic/welcome-section'
import type { InviteShellData, InviteShellPhotos } from '../../model/invite-shell-types'
import { ROMANTIC_THEME } from '../../model/themes/romantic-theme'

type RomanticTemplateProps = InviteShellPhotos & {
  data: InviteShellData
}

export function RomanticTemplate({
  data,
  heroPhoto,
  groomPhoto,
  bridePhoto,
  galleryPhotos = [],
}: RomanticTemplateProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: ROMANTIC_THEME.bg }}>
      <InviteMusicPlayer musicUrl={data.musicUrl} />
      <RomanticHeroSection data={data} heroPhoto={heroPhoto} />
      <RomanticCountdownSection data={data} />
      <RomanticGallerySection galleryPhotos={galleryPhotos} />
      <RomanticWelcomeSection welcomeMessage={data.welcomeMessage} />
      <RomanticCoupleSection data={data} groomPhoto={groomPhoto} bridePhoto={bridePhoto} />
      <RomanticCeremonySection data={data} />
      <RomanticRsvpSection whatsapp={data.whatsapp} />
      <RomanticFooterSection groomName={data.groomName} brideName={data.brideName} />
    </div>
  )
}
