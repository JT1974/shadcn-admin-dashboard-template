import { getQuotationById } from "@/app/dashboard/quotations/_lib/actions"
import QuotationForm from "@/app/dashboard/quotations/_components/quotation-form"
import { Button } from "@/components/ui/button"
import BackButton from "@/components/back-button"

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const quotation = await getQuotationById({ id })

  return (
    <>
      <div className="mb-9 flex w-full flex-col gap-4">
        <div className="flex grow flex-col">
          <span className="text-foreground text-2xl font-bold">{quotation.number}</span>
          <span className="text-muted-foreground font-semibold capitalize">
            {quotation.customer.name} {quotation.customer.companyForm}.
          </span>
        </div>
      </div>
      <div className="flex max-w-184 flex-col gap-4 overflow-y-auto text-sm">
        <QuotationForm
          prefill={quotation}
          actionButtons={
            <>
              <Button type="submit">Submit</Button>
              <BackButton />
            </>
          }
        />
      </div>
    </>
  )
}
