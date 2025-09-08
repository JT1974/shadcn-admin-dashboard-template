import { SupabaseEnums } from "@/constants/supabase"
import { VALIDATION_KEYS } from "@/constants/validationKeys"
import z, { number, object, string } from "zod"

export const quotationFormSchema = object({
  description: string().nullable(),
  paymentTime: number({ error: VALIDATION_KEYS.invalidNumber }),
  fulfillmentTime: number({ error: VALIDATION_KEYS.invalidNumber }),

  // enums
  reference: z.enum(SupabaseEnums.quotationReference),
  status: z.enum(SupabaseEnums.quotationStatus),
  paymentTimeUnit: z.enum(SupabaseEnums.workingTimeUnit),
  fulfillmentTimeUnit: z.enum(SupabaseEnums.workingTimeUnit),

  // dto ids - temporary fields
  taskIds: number().array(),
  customerId: number({ error: VALIDATION_KEYS.required }).nullable()
})
