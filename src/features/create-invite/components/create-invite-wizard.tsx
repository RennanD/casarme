'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import type { CreateInviteTemplate } from '@/src/features/create-invite/model/catalog'
import { CREATE_INVITE_DEFAULT_VALUES } from '@/src/features/create-invite/model/defaults'
import {
  createInviteFormSchema,
  type CreateInviteFormValues,
} from '@/src/features/create-invite/model/schemas'
import {
  buildStepHref,
  parseStep,
  STEP_FIELDS,
  type WizardStep,
} from '@/src/features/create-invite/model/steps'
import { Card } from '@/src/shared/ui'

import { CeremonyStepForm } from './ceremony-step-form'
import { CoupleStepForm } from './couple-step-form'
import { CreateInviteHeader } from './create-invite-header'
import { CreateInviteIntro } from './create-invite-intro'
import { PaymentStepForm } from './payment-step-form'
import { TemplateSidebar } from './template-sidebar'

type CreateInviteWizardProps = {
  template: CreateInviteTemplate
}

export function CreateInviteWizard({ template }: CreateInviteWizardProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentStep = parseStep(searchParams.get('step') ?? undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const methods = useForm<CreateInviteFormValues>({
    defaultValues: CREATE_INVITE_DEFAULT_VALUES,
    mode: 'onSubmit',
    resolver: zodResolver(createInviteFormSchema),
  })

  const navigateToStep = useCallback(
    (step: WizardStep) => {
      router.push(buildStepHref(template.slug, step))
    },
    [router, template.slug],
  )

  const handleContinue = useCallback(async () => {
    setIsSubmitting(true)
    const fields = STEP_FIELDS[currentStep]
    const isValid = await methods.trigger([...fields])
    setIsSubmitting(false)

    if (!isValid) return

    if (currentStep < 3) {
      navigateToStep((currentStep + 1) as WizardStep)
    }
  }, [currentStep, methods, navigateToStep])

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      navigateToStep((currentStep - 1) as WizardStep)
    }
  }, [currentStep, navigateToStep])

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-background">
        <CreateInviteHeader />
        <CreateInviteIntro currentStep={currentStep} />

        <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 pb-12 lg:grid-cols-[minmax(0,740px)_380px] lg:px-[120px]">
          <Card className="gap-0 rounded-[18px] border border-border bg-card p-6 shadow-none sm:p-[30px] lg:order-1">
            {currentStep === 1 ? (
              <CoupleStepForm onContinue={handleContinue} isSubmitting={isSubmitting} />
            ) : null}
            {currentStep === 2 ? (
              <CeremonyStepForm
                onContinue={handleContinue}
                onBack={handleBack}
                isSubmitting={isSubmitting}
              />
            ) : null}
            {currentStep === 3 ? (
              <PaymentStepForm template={template} onBack={handleBack} />
            ) : null}
          </Card>

          <div className="lg:order-2">
            <TemplateSidebar template={template} />
          </div>
        </div>
      </div>
    </FormProvider>
  )
}
