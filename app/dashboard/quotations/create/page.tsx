import { getPartners } from "@/app/dashboard/partners/lib/actions"
import UpsertQuotation from "@/app/dashboard/quotations/upsert-quotation"

export default async function Page() {
  const { data: customers } = await getPartners({
    select: "*",
    filters: [{ field: "relation", method: "eq", value: "customer" }]
  })

  return <UpsertQuotation customers={customers} />
}
