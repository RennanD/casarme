import { z } from 'zod'

export const coupleStepSchema = z.object({
  brideName: z.string().trim().min(2, 'Informe o nome da noiva'),
  groomName: z.string().trim().min(2, 'Informe o nome do noivo'),
  weddingDate: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Use o formato DD/MM/AAAA'),
})

export const ceremonyStepSchema = z.object({
  venueAddress: z.string().trim().min(10, 'Informe o endereço completo da cerimônia'),
  whatsapp: z.string().trim().min(14, 'Informe um WhatsApp válido'),
  musicUrl: z
    .string()
    .url('Informe um link válido do YouTube')
    .optional()
    .or(z.literal('')),
})

export const paymentStepSchema = z.object({
  email: z.string().trim().email('Informe um e-mail válido'),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Informe um CPF válido'),
  includePlanner: z.boolean(),
})

export const createInviteFormSchema = coupleStepSchema
  .merge(ceremonyStepSchema)
  .merge(paymentStepSchema)

export type CoupleStepValues = z.infer<typeof coupleStepSchema>
export type CeremonyStepValues = z.infer<typeof ceremonyStepSchema>
export type PaymentStepValues = z.infer<typeof paymentStepSchema>
export type CreateInviteFormValues = z.infer<typeof createInviteFormSchema>
