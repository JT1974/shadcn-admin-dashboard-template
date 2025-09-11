import { getPartners } from "@/app/dashboard/partners/_lib/actions"

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: Props) {
  const { partnerType, redirectTo } = await searchParams
  const filters = Array.isArray(partnerType)
    ? [{ field: "relation", method: "eq" as const, value: partnerType[0] }]
    : partnerType
      ? [{ field: "relation", method: "eq" as const, value: partnerType }]
      : undefined

  const { data: partners } = await getPartners({ select: "*", filters })

  // TODO: redirect to referring page after mutation is successful, if search param is provided
  console.log(redirectTo)

  return <div>{JSON.stringify(partners)}</div>
}
