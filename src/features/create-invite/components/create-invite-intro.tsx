import {
  CREATE_INVITE_EYEBROW,
  CREATE_INVITE_INTRO,
} from '@/src/features/create-invite/model/copy'
import type { WizardStep } from '@/src/features/create-invite/model/steps'

import { CreateInviteStepper } from './create-invite-stepper'

type CreateInviteIntroProps = {
  currentStep: WizardStep
}

export function CreateInviteIntro({ currentStep }: CreateInviteIntroProps) {
  const intro = CREATE_INVITE_INTRO[currentStep]

  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-2.5 px-5 pt-8 pb-5 lg:px-[120px] lg:pt-[34px]">
      <p className="text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
        {CREATE_INVITE_EYEBROW}
      </p>
      <h1 className="font-serif text-[clamp(1.75rem,4vw,2.25rem)] font-normal tracking-tight text-foreground">
        {intro.title}
      </h1>
      <p className="body-sm text-muted-foreground">{intro.description}</p>
      <CreateInviteStepper currentStep={currentStep} />
    </section>
  )
}
