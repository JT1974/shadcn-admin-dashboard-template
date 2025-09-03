import { SupabaseEnums } from "@/constants/supabase"
import z, { number, object, string } from "zod"

export const quotationFormSchema = object({
  number: string().nullable(),
  description: string().nullable(),
  reference: string().nullable(),
  paymentTime: string().nullable(),
  fulfillmentTime: string().nullable(),

  // enums
  status: z.enum(SupabaseEnums.quotationStatus).nullable(),
  paymentTimeUnit: z.enum(SupabaseEnums.workingTimeUnit).nullable(),
  fulfillmentTimeUnit: z.enum(SupabaseEnums.workingTimeUnit).nullable(),

  // dto ids - temporary fields
  taskIds: number().array(),
  customerId: number().nullable()
})
