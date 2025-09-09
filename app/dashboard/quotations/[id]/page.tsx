import { getQuotationById } from "@/app/dashboard/quotations/_lib/actions"
import UpsertQuotation from "@/app/dashboard/quotations/_components/upsert-quotation"

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const quotation = await getQuotationById({ id })

  return <UpsertQuotation quotation={quotation} />
}
