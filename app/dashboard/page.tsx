import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"

// TODO: replace with real data
// use useTransition in DataTable not to block the rendering until the data arrives from the server
import data from "./data.json"

export default async function Page() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <SectionCards />
      </div>

      <ChartAreaInteractive />
      {/* TODO: dashboardra nem kell majd adat tábla, csak diagramok és kártyák */}
      <DataTable data={data} />
    </div>
  )
}
