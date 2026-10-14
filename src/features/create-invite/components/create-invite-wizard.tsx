'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
  clearCreateInviteDraft,
  useCreateInviteDraft,
} from '@/src/features/create-invite/hooks/use-create-invite-draft'
import type { CreateInviteTemplate } from '@/src/features/create-invite/model/catalog'
import { getDefaultValuesForTemplate } from '@/src/features/create-invite/model/defaults'
import { mapFormToApiPayload } from '@/src/features/create-invite/model/map-form-to-api'
import { CREATE_INVITE_ACTIONS } from '@/src/features/create-invite/model/copy'
import type { CreateInviteFormValues } from '@/src/features/create-invite/model/schemas'
import { buildStepHref, parseStep } from '@/src/features/create-invite/model/steps'
import {
  getStepKind,
  getWizardConfig,
  type WizardStep,
} from '@/src/features/create-invite/model/wizard-config'
import { Card } from '@/src/shared/ui'

import { CeremonyStepForm } from './ceremony-step-form'
import { CoupleStepForm } from './couple-step-form'
import { CreateInviteHeader } from './create-invite-header'
import { CreateInviteIntro } from './create-invite-intro'
import { MediaStepForm } from './media-step-form'
import { PaymentStepForm } from './payment-step-form'
import { TemplateSidebar } from './template-sidebar'

type CreateInviteWizardProps = {
  template: CreateInviteTemplate
}

export function CreateInviteWizard({ template }: CreateInviteWizardProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const config = useMemo(() => getWizardConfig(template), [template])
  const currentStep = parseStep(searchParams.get('step') ?? undefined, config.stepCount)
  const currentKind = getStepKind(config, currentStep)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const defaultValues = useMemo(() => getDefaultValuesForTemplate(template), [template])

  const methods = useForm<CreateInviteFormValues>({
    defaultValues,
    mode: 'onSubmit',
    resolver: zodResolver(config.createSchema()),
  })

  useCreateInviteDraft(template, methods)

  const navigateToStep = useCallback(
    (step: WizardStep) => {
      router.push(buildStepHref(template.slug, step))
    },
    [router, template.slug],
  )

  const handleContinue = useCallback(async () => {
    setIsSubmitting(true)
    const fields = config.stepFields[currentStep] ?? []
    const isValid = await methods.trigger([...fields])
    setIsSubmitting(false)

    if (!isValid) return

    if (currentStep < config.stepCount) {
      navigateToStep((currentStep + 1) as WizardStep)
    }
  }, [config.stepFields, config.stepCount, currentStep, methods, navigateToStep])

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      navigateToStep((currentStep - 1) as WizardStep)
    }
  }, [currentStep, navigateToStep])

  const handleSubmit = useCallback(async () => {
    setSubmitError(null)
    setIsSubmitting(true)

    const paymentFields = config.stepFields[config.stepCount as WizardStep] ?? []
    const paymentValid = await methods.trigger([...paymentFields])

    if (!paymentValid) {
      setIsSubmitting(false)
      return
    }

    const fullValid = await methods.trigger()
    if (!fullValid) {
      setIsSubmitting(false)
      return
    }

    try {
      const values = methods.getValues()
      const payload = mapFormToApiPayload(values, template)

      const response = await fetch('/api/invitations/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('create_failed')
      }

      const data = (await response.json()) as { invitationId: string }
      clearCreateInviteDraft(template.slug)
      router.push(`/checkout/${data.invitationId}`)
    } catch {
      setSubmitError(CREATE_INVITE_ACTIONS.submitError)
      setIsSubmitting(false)
    }
  }, [config.stepCount, config.stepFields, methods, router, template])

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-background">
        <CreateInviteHeader />
        <CreateInviteIntro config={config} currentStep={currentStep} currentKind={currentKind} />

        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 pb-12 lg:grid-cols-2 lg:px-8">
          <Card className="gap-0 rounded-2xl border border-border bg-card p-6 shadow-none sm:p-8 lg:order-1">
            {currentKind === 'couple' ? (
              <CoupleStepForm
                config={config}
                onContinue={handleContinue}
                isSubmitting={isSubmitting}
              />
            ) : null}
            {currentKind === 'ceremony' ? (
              <CeremonyStepForm
                config={config}
                stepNumber={currentStep}
                onContinue={handleContinue}
                onBack={handleBack}
                isSubmitting={isSubmitting}
              />
            ) : null}
            {currentKind === 'media' ? (
              <MediaStepForm
                template={template}
                config={config}
                stepNumber={currentStep}
                onContinue={handleContinue}
                onBack={handleBack}
                isSubmitting={isSubmitting}
              />
            ) : null}
            {currentKind === 'payment' ? (
              <PaymentStepForm
                template={template}
                config={config}
                stepNumber={currentStep}
                onBack={handleBack}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submitError={submitError}
              />
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
