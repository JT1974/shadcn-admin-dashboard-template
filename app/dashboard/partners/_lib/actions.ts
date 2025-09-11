"use server"

import { GET_PARTNERS_ERROR, PARTNERS } from "@/app/dashboard/partners/_lib/constants"
import { createClient } from "@/lib/supabase/server"

export const getPartners = async ({ select, order, range, filters }: IQueryParams) => {
  const supabase = await createClient()

  let query = supabase.from(PARTNERS).select(select, {
    count: "exact"
  })

  filters?.forEach(({ method, field, value }) => {
    switch (method) {
      case "ilike":
        query = query.ilike(field, value as string)
        break
      case "is":
        query = query.is(field, value as boolean)
        break
      case "eq":
        query = query.eq(field, value)
      default:
        break
    }
  })

  if (order) {
    query = query.order(order.field, { ascending: order.ascending })
  }

  if (range) {
    query = query.range(range.from, range.to)
  }

  const { data, error, count } = await query

  if (error) throw new Error(GET_PARTNERS_ERROR)

  return { data: data as unknown as Partner[], count }
}
