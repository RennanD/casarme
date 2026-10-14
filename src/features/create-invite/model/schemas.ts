import { z } from 'zod'

import { ROMANTIC_GALLERY_MAX_PHOTOS } from './defaults'

export const imageMetadataSchema = z.object({
  filename: z.string().min(1),
  originalName: z.string(),
  width: z.number(),
  height: z.number(),
  size: z.number(),
  type: z.string(),
})

export type ImageMetadataValues = z.infer<typeof imageMetadataSchema>

export const imagesSchema = z.object({
  hero: imageMetadataSchema.optional(),
  groom: imageMetadataSchema.optional(),
  bride: imageMetadataSchema.optional(),
  gallery: z.array(imageMetadataSchema).default([]),
})

const weddingTimeSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Informe o horário no formato HH:MM')

export const coupleStepSchema = z.object({
  brideName: z.string().trim().min(2, 'Informe o nome da noiva'),
  groomName: z.string().trim().min(2, 'Informe o nome do noivo'),
  weddingDate: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Use o formato DD/MM/AAAA'),
  weddingTime: weddingTimeSchema,
})

const optionalUrlSchema = z
  .string()
  .url('Informe um link válido do YouTube')
  .optional()
  .or(z.literal(''))

export const interactiveCeremonyStepSchema = z.object({
  venueAddress: z.string().trim().min(10, 'Informe o endereço completo da cerimônia'),
  whatsapp: z.string().trim().min(14, 'Informe um WhatsApp válido'),
  musicUrl: optionalUrlSchema,
  venueName: z.string().optional(),
  welcomeMessage: z.string().optional(),
})

export const siteCeremonyStepSchema = z.object({
  venueName: z.string().trim().min(2, 'Informe o nome do local'),
  welcomeMessage: z.string().trim().min(10, 'Informe uma mensagem de boas-vindas'),
  venueAddress: z.string().trim().min(10, 'Informe o endereço completo da cerimônia'),
  whatsapp: z.string().trim().min(14, 'Informe um WhatsApp válido'),
  musicUrl: z.string().optional(),
})

export const romanticCeremonyStepSchema = siteCeremonyStepSchema.extend({
  musicUrl: optionalUrlSchema,
})

const storiesSchema = z.object({
  coupleStory: z.string().optional(),
  groomStory: z.string().optional(),
  brideStory: z.string().optional(),
})

function heroRequiredImagesSchema() {
  return z.object({
    images: imagesSchema.superRefine((data, ctx) => {
      if (!data.hero) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Envie a foto de capa do convite',
          path: ['hero'],
        })
      }
    }),
  })
}

function romanticImagesSchema() {
  return z.object({
    images: imagesSchema.superRefine((data, ctx) => {
      if (!data.hero) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Envie a foto de capa do convite',
          path: ['hero'],
        })
      }
      if (!data.groom) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Envie a foto do noivo',
          path: ['groom'],
        })
      }
      if (!data.bride) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Envie a foto da noiva',
          path: ['bride'],
        })
      }
      if (!data.gallery?.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Envie pelo menos uma foto para a galeria',
          path: ['gallery'],
        })
      }
      if ((data.gallery?.length ?? 0) > ROMANTIC_GALLERY_MAX_PHOTOS) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Envie no máximo ${ROMANTIC_GALLERY_MAX_PHOTOS} fotos para a galeria`,
          path: ['gallery'],
        })
      }
    }),
  })
}

const optionalMediaStepSchema = z.object({
  images: imagesSchema,
}).merge(storiesSchema)

export const paymentStepSchema = z.object({
  email: z.string().trim().email('Informe um e-mail válido'),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Informe um CPF válido'),
  includePlanner: z.boolean(),
})

export type CoupleStepValues = z.infer<typeof coupleStepSchema>
export type PaymentStepValues = z.infer<typeof paymentStepSchema>
export type CreateInviteFormValues = CoupleStepValues &
  z.infer<typeof interactiveCeremonyStepSchema> &
  z.infer<typeof optionalMediaStepSchema> &
  PaymentStepValues

export function createInviteSchemaForTemplate(slug: string) {
  const base = coupleStepSchema.merge(paymentStepSchema)

  if (slug === 'dourado') {
    return base.merge(interactiveCeremonyStepSchema).merge(optionalMediaStepSchema)
  }

  if (slug === 'azul') {
    return base
      .merge(interactiveCeremonyStepSchema)
      .merge(heroRequiredImagesSchema())
      .merge(storiesSchema)
  }

  if (slug === 'garden') {
    return base
      .merge(siteCeremonyStepSchema)
      .merge(heroRequiredImagesSchema())
      .merge(storiesSchema)
  }

  if (slug === 'romantic') {
    return base.merge(romanticCeremonyStepSchema).merge(romanticImagesSchema()).merge(storiesSchema)
  }

  return base.merge(interactiveCeremonyStepSchema).merge(optionalMediaStepSchema)
}

/** @deprecated Use createInviteSchemaForTemplate(slug) for adaptive validation */
export const createInviteFormSchema = createInviteSchemaForTemplate('dourado')

export const ceremonyStepSchema = interactiveCeremonyStepSchema
