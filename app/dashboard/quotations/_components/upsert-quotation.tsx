"use client"

import { createQuotation, updateQuotation } from "@/app/dashboard/quotations/_lib/actions"
import QuotationForm from "@/app/dashboard/quotations/_components/quotation-form"
import BackButton from "@/components/back-button"
import { Button } from "@/components/ui/button"

interface Props {
  quotation?: IQuotation
  customers?: IPartner[]
}

function UpsertQuotation({ quotation, customers }: Props) {
  return (
    <div className="flex max-w-184 flex-col gap-4 overflow-y-auto text-sm">
      <QuotationForm
        prefill={quotation}
        customers={customers}
        onSave={quotation ? updateQuotation : createQuotation}
        actionButtons={
          <>
            <Button type="submit">Submit</Button>
            <BackButton />
          </>
        }
      />
    </div>
  )
}

export default UpsertQuotation
