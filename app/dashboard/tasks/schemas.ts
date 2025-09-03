import { SupabaseEnums } from "@/constants/supabase"
import z, { number, object, string } from "zod"

export const taskFormSchema = object({
  comments: string().nullable(),
  deadline: string().nullable(),
  description: string().nullable(),
  remainingTime: number().nullable(),
  timeAmount: number(),
  unitPrice: number(),

  // enums
  category: z.enum(SupabaseEnums.taskCategory).nullable(),
  currency: z.enum(SupabaseEnums.currency).nullable(),
  status: z.enum(SupabaseEnums.taskStatus),
  timeUnit: z.enum(SupabaseEnums.workingTimeUnit).nullable(),

  // dto ids - temporary fields
  ownerId: string().nullable(),
  subcontractorId: number().nullable(),
  workplaceId: number().nullable()
})
