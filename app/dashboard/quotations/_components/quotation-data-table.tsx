"use client"

import { IconPlus, IconSortAscending, IconSortDescending } from "@tabler/icons-react"
import { flexRender } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import TableColumnsToggle from "@/components/table-columns-toggle"
import useQuotationsDataTable from "@/app/dashboard/quotations/_hooks/useQuotationsDataTable"
import TablePagination from "@/components/table-pagination"
import { use } from "react"

export function QuotationsDataTable({
  quotationsPromise
}: {
  quotationsPromise: Promise<{ data: QuotationDetails[]; count: number | null }>
}) {
  const { data, count } = use(quotationsPromise)
  const { table, columns, router } = useQuotationsDataTable({ data, rowCount: count ?? 0 })

  return (
    <div className="flex w-full flex-col items-start gap-6">
      {/* page top buttons */}
      <div className="flex items-center gap-2">
        {/* show/hide columns */}
        <TableColumnsToggle table={table} />

        {/* add new quotation */}
        <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/quotations/create")}>
          <IconPlus />
          <span className="hidden lg:inline">Add Quotation</span>
        </Button>
      </div>

      <div className="relative flex w-full flex-col gap-4 overflow-auto">
        {/* table */}
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <div
                            className={header.column.getCanSort() ? "cursor-pointer select-none" : ""}
                            onClick={header.column.getToggleSortingHandler()}
                            title={
                              header.column.getCanSort()
                                ? header.column.getNextSortingOrder() === "asc"
                                  ? "Sort ascending"
                                  : header.column.getNextSortingOrder() === "desc"
                                    ? "Sort descending"
                                    : "Clear sort"
                                : undefined
                            }
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <IconSortAscending className="ml-2 inline-block size-4 align-middle" />,
                              desc: <IconSortDescending className="ml-2 inline-block size-4 align-middle" />
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {table.getRowModel().rows?.length ? (
                <>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* pagination */}
        <TablePagination table={table} />
      </div>
    </div>
  )
}
