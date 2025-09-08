import { getQuotations } from "@/app/dashboard/quotations/lib/actions"
import { QuotationsDataTable } from "@/app/dashboard/quotations/quotation-data-table"
import { DEFAULT_PAGINATION_LIMIT } from "@/constants/general"

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: Props) {
  const { page = 1, limit = DEFAULT_PAGINATION_LIMIT, sort, order } = await searchParams

  const { data: quotations_details, count } = await getQuotations({
    select: "*",
    order: {
      field: sort ? (typeof sort === "string" ? sort : sort[0]) : "createdAt",
      ascending: order ? (typeof order === "string" ? order === "asc" : order[0] === "asc") : false
    },
    range: {
      from: (Number(page) - 1) * Number(limit),
      to: Number(page) * Number(limit) - 1
    }
  })

  return <QuotationsDataTable data={quotations_details} rowCount={count ?? 0} />
}
