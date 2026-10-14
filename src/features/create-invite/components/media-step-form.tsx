'use client'

import { useFormContext } from 'react-hook-form'

import type { CreateInviteTemplate } from '@/src/features/create-invite/model/catalog'
import {
  CREATE_INVITE_ACTIONS,
  getContinueActionLabel,
  getFormCopy,
  MEDIA_STEP_FIELDS,
} from '@/src/features/create-invite/model/copy'
import type { CreateInviteFormValues } from '@/src/features/create-invite/model/schemas'
import type { WizardConfig } from '@/src/features/create-invite/model/wizard-config'
import { Button } from '@/src/shared/ui'

import { FormFieldGroup } from './form-field-group'
import { GalleryUploadField } from './gallery-upload-field'
import { ImageUploadField } from './image-upload-field'

const borderlessInputClass =
  'h-auto border-0 bg-transparent px-0 py-0 shadow-none focus-visible:border-transparent focus-visible:ring-0'

type MediaStepFormProps = {
  template: CreateInviteTemplate
  config: WizardConfig
  stepNumber: number
  onContinue: () => void
  onBack: () => void
  isSubmitting: boolean
}

export function MediaStepForm({
  template,
  config,
  stepNumber,
  onContinue,
  onBack,
  isSubmitting,
}: MediaStepFormProps) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateInviteFormValues>()

  const copy = getFormCopy('media', stepNumber, config.stepCount)
  const images = watch('images')
  const isRomantic = template.slug === 'romantic'

  const heroError = errors.images?.hero?.message as string | undefined
  const groomError = errors.images?.groom?.message as string | undefined
  const brideError = errors.images?.bride?.message as string | undefined
  const galleryError = errors.images?.gallery?.message as string | undefined

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          {copy.eyebrow}
        </p>
        <h2 className="font-serif text-3xl font-normal text-foreground">{copy.title}</h2>
        <p className="text-sm leading-6 text-muted-foreground">{copy.description}</p>
      </div>

      <ImageUploadField
        id="hero-image"
        label={MEDIA_STEP_FIELDS.hero.label}
        helper={MEDIA_STEP_FIELDS.hero.helper}
        uploadType="hero"
        value={images?.hero}
        error={heroError}
        onChange={(metadata) =>
          setValue('images.hero', metadata, { shouldDirty: true, shouldValidate: true })
        }
      />

      {isRomantic ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <ImageUploadField
              id="groom-image"
              label={MEDIA_STEP_FIELDS.groom.label}
              helper={MEDIA_STEP_FIELDS.groom.helper}
              uploadType="groom"
              value={images?.groom}
              error={groomError}
              onChange={(metadata) =>
                setValue('images.groom', metadata, { shouldDirty: true, shouldValidate: true })
              }
            />
            <ImageUploadField
              id="bride-image"
              label={MEDIA_STEP_FIELDS.bride.label}
              helper={MEDIA_STEP_FIELDS.bride.helper}
              uploadType="bride"
              value={images?.bride}
              error={brideError}
              onChange={(metadata) =>
                setValue('images.bride', metadata, { shouldDirty: true, shouldValidate: true })
              }
            />
          </div>

          <GalleryUploadField
            id="gallery-image"
            label={MEDIA_STEP_FIELDS.gallery.label}
            helper={MEDIA_STEP_FIELDS.gallery.helper}
            uploadType="gallery"
            value={images?.gallery ?? []}
            error={galleryError}
            onChange={(gallery) =>
              setValue('images.gallery', gallery, { shouldDirty: true, shouldValidate: true })
            }
          />

          <FormFieldGroup
            id="coupleStory"
            label={MEDIA_STEP_FIELDS.coupleStory.label}
            error={errors.coupleStory?.message}
          >
            <textarea
              id="coupleStory"
              rows={3}
              placeholder={MEDIA_STEP_FIELDS.coupleStory.placeholder}
              className={`${borderlessInputClass} min-h-18 w-full resize-y text-sm leading-6 text-foreground outline-none`}
              value={watch('coupleStory') ?? ''}
              onChange={(event) =>
                setValue('coupleStory', event.target.value, { shouldDirty: true })
              }
            />
          </FormFieldGroup>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormFieldGroup
              id="groomStory"
              label={MEDIA_STEP_FIELDS.groomStory.label}
              error={errors.groomStory?.message}
            >
              <textarea
                id="groomStory"
                rows={3}
                placeholder={MEDIA_STEP_FIELDS.groomStory.placeholder}
                className={`${borderlessInputClass} min-h-18 w-full resize-y text-sm leading-6 text-foreground outline-none`}
                value={watch('groomStory') ?? ''}
                onChange={(event) =>
                  setValue('groomStory', event.target.value, { shouldDirty: true })
                }
              />
            </FormFieldGroup>

            <FormFieldGroup
              id="brideStory"
              label={MEDIA_STEP_FIELDS.brideStory.label}
              error={errors.brideStory?.message}
            >
              <textarea
                id="brideStory"
                rows={3}
                placeholder={MEDIA_STEP_FIELDS.brideStory.placeholder}
                className={`${borderlessInputClass} min-h-18 w-full resize-y text-sm leading-6 text-foreground outline-none`}
                value={watch('brideStory') ?? ''}
                onChange={(event) =>
                  setValue('brideStory', event.target.value, { shouldDirty: true })
                }
              />
            </FormFieldGroup>
          </div>
        </>
      ) : null}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <Button type="button" variant="ghost" className="justify-start" onClick={onBack}>
          ← {CREATE_INVITE_ACTIONS.back}
        </Button>
        <Button
          type="button"
          className="w-full rounded-3xl sm:w-auto sm:min-w-64"
          disabled={isSubmitting}
          onClick={onContinue}
        >
          {getContinueActionLabel('media')} <span aria-hidden>→</span>
        </Button>
      </div>
    </div>
  )
}
