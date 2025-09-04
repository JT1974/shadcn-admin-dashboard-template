"use client"

import { QUOTATION_REFERENCE } from "@/app/dashboard/quotations/constants"
import InputWithLabel from "@/components/input-with-label"
import SelectWithLabel from "@/components/select-with-label"
import TextareaWithLabel from "@/components/textarea-with-label"
import { getSupabaseEnumValues } from "@/constants/supabase"
import { parseEnumIntoOptions } from "@/lib/utils"

interface Props {
  id?: string
  item: IQuotation
  customers?: IPartner[]
}

function QuotationForm({ id, item, customers = [] }: Props) {
  // TODO: react-hook-form

  return (
    <form
      id={id}
      method="post"
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        // TODO: submit handler
        e.preventDefault()
        const data = new FormData(e.target as HTMLFormElement)

        let dataObj = {}

        for (const pair of data.entries()) {
          dataObj = { ...dataObj, [pair[0]]: pair[1] }
        }

        console.log(dataObj)
      }}
    >
      {!item.customer && (
        <SelectWithLabel
          name="customerId"
          label="Customer"
          placeholder="Select a customer"
          values={customers.map(({ id }) => String(id))}
          className="flex flex-col gap-3"
        />
      )}
      <SelectWithLabel
        name="status"
        label="Status"
        placeholder="Select a status"
        defaultValue={item.status ?? getSupabaseEnumValues("quotationStatus")[0]}
        values={getSupabaseEnumValues("quotationStatus")}
        className="flex flex-col gap-3"
      />
      <TextareaWithLabel
        name="description"
        label="Description"
        defaultValue={item.description ?? ""}
        className="flex flex-col gap-3"
      />
      <SelectWithLabel
        name="reference"
        label="Reference"
        placeholder="Select a reference"
        defaultValue={item.reference ?? parseEnumIntoOptions(QUOTATION_REFERENCE)[1]}
        values={parseEnumIntoOptions(QUOTATION_REFERENCE)}
        className="flex flex-col gap-3"
      />
      <div className="grid grid-cols-2 items-end gap-4">
        <InputWithLabel
          name="fulfillmentTime"
          label="Fulfillment time"
          defaultValue={item.fulfillmentTime ? String(item.fulfillmentTime) : "0"}
          className="flex flex-col gap-3"
        />
        <SelectWithLabel
          name="fulfillmentTimeUnit"
          defaultValue={item.fulfillmentTimeUnit ?? getSupabaseEnumValues("workingTimeUnit")[3]}
          values={getSupabaseEnumValues("workingTimeUnit")}
          className="flex flex-col gap-3"
        />
      </div>
      <div className="grid grid-cols-2 items-end gap-4">
        <InputWithLabel
          name="paymentTime"
          label="Payment time"
          defaultValue={item.paymentTime ? String(item.paymentTime) : "0"}
          className="flex flex-col gap-3"
        />
        <SelectWithLabel
          name="paymentTimeUnit"
          defaultValue={item.paymentTimeUnit ?? getSupabaseEnumValues("workingTimeUnit")[3]}
          values={getSupabaseEnumValues("workingTimeUnit")}
          className="flex flex-col gap-3"
        />
      </div>
    </form>
  )
}

export default QuotationForm
