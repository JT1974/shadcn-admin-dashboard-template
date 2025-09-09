import { SupabaseEnums } from "@/constants/supabase"

// map prefill values to form values
export const mapQuotationToQuotationForm = (quotation?: IQuotation) => {
  return {
    ...quotation,
    taskIds: quotation?.tasks?.map((task) => task.id) ?? [],
    customerId: quotation?.customer?.id,
    paymentTime: quotation?.paymentTime ? quotation.paymentTime : 8,
    paymentTimeUnit: quotation?.paymentTimeUnit ?? SupabaseEnums.workingTimeUnit[1],
    fulfillmentTime: quotation?.fulfillmentTime ? quotation.fulfillmentTime : 4,
    fulfillmentTimeUnit: quotation?.fulfillmentTimeUnit ?? SupabaseEnums.workingTimeUnit[2],
    status: quotation?.status ?? SupabaseEnums.quotationStatus[0],
    reference: quotation?.reference ?? SupabaseEnums.quotationReference[1]
  }
}

// map form values to api request body
export const mapQuotationFormToQuotationBody = ({
  taskIds,
  customerId,
  status,
  paymentTime,
  paymentTimeUnit,
  fulfillmentTime,
  fulfillmentTimeUnit,
  ...form
}: IQuotationForm) => {
  return {
    ...form,
    tasks: taskIds,
    customer: customerId,
    status: status,
    paymentTime: paymentTime,
    paymentTimeUnit: paymentTimeUnit,
    fulfillmentTime: fulfillmentTime,
    fulfillmentTimeUnit: fulfillmentTimeUnit,
    reference: form.reference
  }
}
