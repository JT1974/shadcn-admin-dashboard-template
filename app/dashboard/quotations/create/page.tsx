import { getPartners } from "@/app/dashboard/partners/_lib/actions"
import QuotationForm from "@/app/dashboard/quotations/_components/quotation-form"
import BackButton from "@/components/back-button"
import { Button } from "@/components/ui/button"

export default async function Page() {
  const { data: customers } = await getPartners({
    select: "*",
    filters: [{ field: "relation", method: "eq", value: "customer" }]
  })

  return (
    <div className="flex max-w-184 flex-col gap-4 overflow-y-auto text-sm">
      <QuotationForm
        customers={customers}
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
