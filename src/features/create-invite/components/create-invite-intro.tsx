import {
  CREATE_INVITE_EYEBROW,
  getIntroCopy,
} from '@/src/features/create-invite/model/copy'
import type { StepKind, WizardConfig, WizardStep } from '@/src/features/create-invite/model/wizard-config'

import { CreateInviteStepper } from './create-invite-stepper'

type CreateInviteIntroProps = {
  config: WizardConfig
  currentStep: WizardStep
  currentKind: StepKind
}

export function CreateInviteIntro({
  config,
  currentStep,
  currentKind,
}: CreateInviteIntroProps) {
  const intro = getIntroCopy(currentKind)

  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-2.5 px-5 pt-8 pb-5 lg:px-[120px] lg:pt-[34px]">
      <p className="text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
        {CREATE_INVITE_EYEBROW}
      </p>
      <h1 className="font-serif text-[clamp(1.75rem,4vw,2.25rem)] font-normal tracking-tight text-foreground">
        {intro.title}
      </h1>
      <p className="body-sm text-muted-foreground">{intro.description}</p>
      <CreateInviteStepper config={config} currentStep={currentStep} />
    </section>
  )
}
