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
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-2.5 px-5 pt-8 pb-5 lg:px-8 lg:pt-8">
      <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        {CREATE_INVITE_EYEBROW}
      </p>
      <h1 className="font-serif text-3xl font-normal tracking-tight text-foreground lg:text-4xl">
        {intro.title}
      </h1>
      <p className="text-sm leading-6 text-muted-foreground">{intro.description}</p>
      <CreateInviteStepper config={config} currentStep={currentStep} />
    </section>
  )
}
