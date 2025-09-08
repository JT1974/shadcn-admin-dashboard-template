import { getQuotationById } from "@/app/dashboard/quotations/lib/actions"
import UpsertQuotation from "@/app/dashboard/quotations/upsert-quotation"

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const quotation = await getQuotationById({ id })

  return <UpsertQuotation quotation={quotation} />
}
