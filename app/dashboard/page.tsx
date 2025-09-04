import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"

// TODO: replace with real data
import data from "./data.json"

export default async function Page() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <SectionCards />
      <ChartAreaInteractive />
      <DataTable data={data} />
    </div>
  )
}
