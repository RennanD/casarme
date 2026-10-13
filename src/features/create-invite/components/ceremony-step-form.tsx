'use client'

import { useFormContext } from 'react-hook-form'

import {
  CEREMONY_STEP_FIELDS,
  CREATE_INVITE_ACTIONS,
  getContinueActionLabel,
  getFormCopy,
} from '@/src/features/create-invite/model/copy'
import { maskWhatsApp } from '@/src/features/create-invite/model/masks'
import type { CreateInviteFormValues } from '@/src/features/create-invite/model/schemas'
import type { WizardConfig, WizardStep } from '@/src/features/create-invite/model/wizard-config'
import { Button, Input } from '@/src/shared/ui'

import { FormFieldGroup } from './form-field-group'

const borderlessInputClass =
  'h-auto border-0 bg-transparent px-0 py-0 shadow-none focus-visible:border-transparent focus-visible:ring-0'

type CeremonyStepFormProps = {
  config: WizardConfig
  stepNumber: WizardStep
  onContinue: () => void
  onBack: () => void
  isSubmitting: boolean
}

export function CeremonyStepForm({
  config,
  stepNumber,
  onContinue,
  onBack,
  isSubmitting,
}: CeremonyStepFormProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateInviteFormValues>()

  const copy = getFormCopy('ceremony', stepNumber, config.stepCount)
  const whatsapp = watch('whatsapp')
  const showVenueName = config.isFieldVisible(stepNumber, 'venueName')
  const showWelcomeMessage = config.isFieldVisible(stepNumber, 'welcomeMessage')
  const showMusicUrl = config.isFieldVisible(stepNumber, 'musicUrl')
  const nextKind = config.steps.find((step) => step.number === stepNumber + 1)?.kind
  const continueLabel =
    nextKind === 'media'
      ? 'Continuar para as fotos'
      : nextKind === 'payment'
        ? CREATE_INVITE_ACTIONS.continueToPayment
        : getContinueActionLabel('ceremony')

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <p className="text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
          {copy.eyebrow}
        </p>
        <h2 className="font-serif text-[28px] font-normal text-foreground">{copy.title}</h2>
        <p className="body-sm text-muted-foreground">{copy.description}</p>
      </div>

      {showVenueName ? (
        <>
          <FormFieldGroup
            id="venueName"
            label={CEREMONY_STEP_FIELDS.venueName.label}
            error={errors.venueName?.message}
          >
            <Input
              id="venueName"
              placeholder={CEREMONY_STEP_FIELDS.venueName.placeholder}
              className={borderlessInputClass}
              aria-invalid={Boolean(errors.venueName)}
              {...register('venueName')}
            />
          </FormFieldGroup>

          <FormFieldGroup
            id="venueAddress"
            label={CEREMONY_STEP_FIELDS.venueAddress.label}
            error={errors.venueAddress?.message}
          >
            <Input
              id="venueAddress"
              placeholder={CEREMONY_STEP_FIELDS.venueAddress.placeholder}
              className={borderlessInputClass}
              aria-invalid={Boolean(errors.venueAddress)}
              {...register('venueAddress')}
            />
          </FormFieldGroup>
        </>
      ) : (
        <FormFieldGroup
          id="venueAddress"
          label={CEREMONY_STEP_FIELDS.venueAddress.label}
          helper="Inclua o nome do espaço ou da igreja para ajudar seus convidados."
          error={errors.venueAddress?.message}
        >
          <Input
            id="venueAddress"
            placeholder={CEREMONY_STEP_FIELDS.venueAddress.placeholder}
            className={borderlessInputClass}
            aria-invalid={Boolean(errors.venueAddress)}
            {...register('venueAddress')}
          />
        </FormFieldGroup>
      )}

      {showWelcomeMessage ? (
        <FormFieldGroup
          id="welcomeMessage"
          label={CEREMONY_STEP_FIELDS.welcomeMessage.label}
          helper={CEREMONY_STEP_FIELDS.welcomeMessage.helper}
          error={errors.welcomeMessage?.message}
        >
          <textarea
            id="welcomeMessage"
            rows={4}
            placeholder={CEREMONY_STEP_FIELDS.welcomeMessage.placeholder}
            className={`${borderlessInputClass} min-h-[96px] w-full resize-y body-sm text-foreground outline-none`}
            aria-invalid={Boolean(errors.welcomeMessage)}
            {...register('welcomeMessage')}
          />
        </FormFieldGroup>
      ) : null}

      <FormFieldGroup
        id="whatsapp"
        label={CEREMONY_STEP_FIELDS.whatsapp.label}
        helper={CEREMONY_STEP_FIELDS.whatsapp.helper}
        error={errors.whatsapp?.message}
      >
        <Input
          id="whatsapp"
          inputMode="tel"
          placeholder={CEREMONY_STEP_FIELDS.whatsapp.placeholder}
          className={borderlessInputClass}
          aria-invalid={Boolean(errors.whatsapp)}
          value={whatsapp}
          {...register('whatsapp')}
          onChange={(event) => {
            setValue('whatsapp', maskWhatsApp(event.target.value), { shouldDirty: true })
          }}
        />
      </FormFieldGroup>

      {showMusicUrl ? (
        <FormFieldGroup
          id="musicUrl"
          label={CEREMONY_STEP_FIELDS.musicUrl.label}
          helper={CEREMONY_STEP_FIELDS.musicUrl.helper}
          error={errors.musicUrl?.message}
        >
          <Input
            id="musicUrl"
            type="url"
            placeholder={CEREMONY_STEP_FIELDS.musicUrl.placeholder}
            className={borderlessInputClass}
            aria-invalid={Boolean(errors.musicUrl)}
            {...register('musicUrl')}
          />
        </FormFieldGroup>
      ) : null}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <Button type="button" variant="ghost" className="justify-start" onClick={onBack}>
          ← {CREATE_INVITE_ACTIONS.back}
        </Button>
        <Button
          type="button"
          className="w-full rounded-3xl enabled:active:scale-[0.96] motion-reduce:enabled:active:scale-100 sm:w-auto sm:min-w-[270px]"
          disabled={isSubmitting}
          onClick={onContinue}
        >
          {continueLabel} <span aria-hidden>→</span>
        </Button>
      </div>
    </div>
  )
}
