import { getQuotationById } from "@/app/dashboard/quotations/actions"
import QuotationForm from "@/app/dashboard/quotations/QuotationForm"
import { Button } from "@/components/ui/button"

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const item = await getQuotationById({ id })

  return (
    <div className="flex max-w-184 flex-col gap-4 overflow-y-auto text-sm">
      <QuotationForm id="quotation-form" item={item} />
      <Button type="submit" form="quotation-form">
        Submit
      </Button>
    </div>
  )
}
