// import {
//   CREATE_QUOTATION_ERROR,
//   DELETE_QUOTATION_ERROR,
//   DELETE_QUOTATIONS_ERROR,
//   GET_QUOTATION_ERROR,
//   GET_QUOTATIONS_ERROR,
//   QUOTATIONS,
//   QUOTATIONS_DETAILS,
//   UPDATE_QUOTATION_ERROR
// } from "@/app/dashboard/quotations/constants"
// import { supabase } from "@/services/api"

// export const getQuotationById = async ({ id }: IByIdParams) => {
//   const { data, error } = await supabase.from(QUOTATIONS_DETAILS).select().eq("id", Number(id)).single()

//   if (error) throw new Error(GET_QUOTATION_ERROR)

//   return data as IQuotation
// }

// export const createQuotation = async (quotation: IUpsertQuotationBody) => {
//   const { data, error } = await supabase.from(QUOTATIONS).insert(quotation).select().single()

//   if (error) throw new Error(CREATE_QUOTATION_ERROR)

//   return data
// }

// export const updateQuotation = async (quotation: IUpsertQuotationBody) => {
//   const { id, ...updatedQuotation } = quotation

//   if (!id) throw new Error(UPDATE_QUOTATION_ERROR)

//   const { data, error } = await supabase.from(QUOTATIONS).update(updatedQuotation).eq("id", id).select().single()

//   if (error) throw new Error(UPDATE_QUOTATION_ERROR)

//   return data
// }

// export const deleteQuotationById = async ({ id }: IByIdParams) => {
//   const { error } = await supabase.from(QUOTATIONS).delete().eq("id", Number(id))

//   if (error) throw new Error(DELETE_QUOTATION_ERROR)

//   return id
// }

// export const deleteQuotationsById = async ({ ids }: IByIdsParams) => {
//   const { error } = await supabase
//     .from(QUOTATIONS)
//     .delete()
//     .in(
//       "id",
//       ids.map((id) => Number(id))
//     )

//   if (error) throw new Error(DELETE_QUOTATIONS_ERROR)

//   return ids
// }
