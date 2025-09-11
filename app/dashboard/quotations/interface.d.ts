type IQuotation = QuotationsTable["Row"]

type IQuotationDetails = QuotationsDetailsView["Row"]

interface QuotationFormErrorFields {
  description?: string
  paymentTime?: string
  fulfillmentTime?: string
  taskIds?: string
  customerId?: string
}

interface IQuotationForm {
  number?: string | null
  description: string | null
  reference: SupabaseEnums["quotationReference"]
  status: SupabaseEnums["quotationStatus"]
  paymentTime: number
  paymentTimeUnit: SupabaseEnums["workingTimeUnit"]
  fulfillmentTime: number
  fulfillmentTimeUnit: SupabaseEnums["workingTimeUnit"]
  taskIds: number[]
  customerId: number
  customer?: IPartner
}

type IUpsertQuotationBody = QuotationsTable["Insert"]
