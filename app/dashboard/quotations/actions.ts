"use server"

import {
  CREATE_QUOTATION_ERROR,
  DELETE_QUOTATION_ERROR,
  DELETE_QUOTATIONS_ERROR,
  GET_QUOTATION_ERROR,
  GET_QUOTATIONS_ERROR,
  QUOTATIONS,
  QUOTATIONS_DETAILS,
  UPDATE_QUOTATION_ERROR
} from "@/app/dashboard/quotations/constants"
import { createClient } from "@/lib/supabase/server"

export const getQuotations = async ({ select, order, range, filters }: IQueryParams) => {
  const supabase = await createClient()

  let query = supabase.from(QUOTATIONS_DETAILS).select(select, {
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
      default:
        query = query.eq(field, value)
    }
  })

  query = query.order(order.field, { ascending: order.ascending }).range(range.from, range.to)

  const { data, error, count } = await query

  if (error) throw new Error(GET_QUOTATIONS_ERROR)

  return { data: data as unknown as IQuotation[], count }
}

export const getQuotationById = async ({ id }: IByIdParams) => {
  const supabase = await createClient()

  const { data, error } = await supabase.from(QUOTATIONS_DETAILS).select().eq("id", Number(id)).single()

  if (error) throw new Error(GET_QUOTATION_ERROR)

  return data as IQuotation
}
