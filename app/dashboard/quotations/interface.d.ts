type IQuotation = QuotationsDetailsView["Row"] & {
  customer: IPartner | null
  lastModifiedBy: IUser | null
  tasks: ITask[] | null
}

interface QuotationFormErrorFields {
  number?: string
  description?: string
  reference?: string
  status?: string
  paymentTime?: string
  paymentTimeUnit?: string
  fulfillmentTime?: string
  fulfillmentTimeUnit?: string
  taskIds?: string
  customerId?: string
}

interface IQuotationForm {
  number: string | null
  description: string | null
  reference: string | null
  status: SupabaseEnums["quotationStatus"] | null
  paymentTime: string | null
  paymentTimeUnit: SupabaseEnums["workingTimeUnit"] | null
  fulfillmentTime: string | null
  fulfillmentTimeUnit: SupabaseEnums["workingTimeUnit"] | null
  taskIds: number[]
  customerId: number | null
}

type IUpsertQuotationBody = QuotationsTable["Insert"]
