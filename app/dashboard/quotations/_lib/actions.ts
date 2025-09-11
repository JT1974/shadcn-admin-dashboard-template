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
} from "@/app/dashboard/quotations/_lib/constants"
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

  if (order) {
    query = query.order(order.field, { ascending: order.ascending })
  }

  if (range) {
    query = query.range(range.from, range.to)
  }

  const { data, error, count } = await query

  if (error) throw new Error(GET_QUOTATIONS_ERROR)

  return { data: data as unknown as IQuotationDetails[], count }
}

export const getQuotationById = async ({ id }: IByIdParams) => {
  const supabase = await createClient()

  const { data, error } = await supabase.from(QUOTATIONS_DETAILS).select().eq("id", Number(id)).single()

  if (error) throw new Error(GET_QUOTATION_ERROR)

  return data as IQuotationDetails
}

export const createQuotation = async (quotation: IUpsertQuotationBody) => {
  const supabase = await createClient()

  const { data, error } = await supabase.from(QUOTATIONS).insert(quotation)

  if (error) throw new Error(CREATE_QUOTATION_ERROR)

  return
}

export const updateQuotation = async (quotation: IUpsertQuotationBody) => {
  const supabase = await createClient()

  const { id, ...updatedQuotation } = quotation

  if (!id) throw new Error(UPDATE_QUOTATION_ERROR)

  const { data, error } = await supabase.from(QUOTATIONS).update(updatedQuotation).eq("id", id)

  if (error) throw new Error(UPDATE_QUOTATION_ERROR)

  return
}

export const deleteQuotationById = async ({ id }: IByIdParams) => {
  const supabase = await createClient()
  const { error } = await supabase.from(QUOTATIONS).delete().eq("id", Number(id))

  if (error) throw new Error(DELETE_QUOTATION_ERROR)

  return id
}

export const deleteQuotationsById = async ({ ids }: IByIdsParams) => {
  const supabase = await createClient()
  const { error } = await supabase
    .from(QUOTATIONS)
    .delete()
    .in(
      "id",
      ids.map((id) => Number(id))
    )

  if (error) throw new Error(DELETE_QUOTATIONS_ERROR)

  return ids
}
