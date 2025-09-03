import { getQuotations } from "@/app/dashboard/quotations/actions"
import { QuotationsDataTable } from "@/app/dashboard/quotations/QuotationsDataTable"

export default async function Page() {
  // TODO: URL paraméterek kezelése (pl. pagination, filters)
  const { data: quotations_details, count } = await getQuotations({
    select: "*",
    order: {
      field: "createdAt",
      ascending: false
    },
    range: {
      from: 0,
      to: 9
    }
  })

  return (
    <div className="py-4 md:py-6">
      <QuotationsDataTable data={quotations_details} />
    </div>
  )
}
