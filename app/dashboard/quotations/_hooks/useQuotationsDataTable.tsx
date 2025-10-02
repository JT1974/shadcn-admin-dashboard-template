import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { DEFAULT_PAGINATION_LIMIT } from "@/constants/general"
import QuotationViewer from "@/app/dashboard/quotations/_components/quotation-viewer"
import QuotationsDataTableActionDialog from "@/app/dashboard/quotations/_components/quotations-data-table-action-dialog"
import QuotationsTaskStatusBadge from "@/app/dashboard/quotations/_components/quotations-task-status-badge"
import QuotationStatusBadge from "@/app/dashboard/quotations/_components/quotation-status-badge"

interface Props {
  data: QuotationDetails[]
  rowCount: number
}

function useQuotationsDataTable({ data, rowCount }: Props) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const params = useSearchParams()
  const currentSearchStr = params.toString()
  const page = params.get("page")
  const limit = params.get("limit")
  const sort = params.getAll("sort")
  const order = params.getAll("order")
  const [pagination, setPagination] = React.useState({
    pageIndex: Number(page) >= 1 ? Number(page) - 1 : 0, // cannot be less, than 1
    pageSize: Number(limit) || DEFAULT_PAGINATION_LIMIT // cannot be less, than 1
  })
  const [sorting, setSorting] = React.useState<SortingState>(
    sort?.map((s, i) => ({ id: s, desc: order.at(i) !== "asc" })) ?? []
  )
  const router = useRouter()
  const pathname = usePathname()

  const columns = React.useMemo<ColumnDef<QuotationDetails>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        )
      },
      {
        accessorKey: "number",
        header: "Number",
        cell: ({ row }) => {
          return <QuotationViewer item={row.original} />
        },
        enableHiding: false
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => <p className="max-w-160 text-wrap">{row.original.description}</p>,
        enableSorting: false
      },
      {
        accessorKey: "reference",
        header: "Reference",
        cell: ({ row }) => row.original.reference
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({
          row: {
            original: { status }
          }
        }) => <QuotationStatusBadge status={status} />,
        enableHiding: false
      },
      {
        accessorKey: "tasks",
        header: "Tasks",
        cell: ({ row }) => (
          <div className="flex max-w-40 flex-wrap items-center gap-1">
            {row.original.tasks?.map((task) => (
              <Link key={task.id} href={`/dashboard/tasks/${task.id}`}>
                <QuotationsTaskStatusBadge task={task} />
              </Link>
            ))}
          </div>
        ),
        enableSorting: false
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => <p>{formatDate(row.original.createdAt)}</p>,
        sortingFn: "datetime"
      },
      {
        id: "actions",
        cell: ({ row: { original } }) => (
          <QuotationsDataTableActionDialog item={original} refreshPage={() => router.refresh()} />
        )
      }
    ],
    [router]
  )

  const table = useReactTable({
    manualPagination: true,
    rowCount,
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    enableSorting: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  })

  React.useEffect(() => {
    let searchStr = ""
    const newPage = pagination.pageIndex * pagination.pageSize < rowCount ? pagination.pageIndex + 1 : 1
    searchStr += `page=${newPage}&limit=${pagination.pageSize}`
    sorting?.forEach(({ id, desc }) => (searchStr += `&sort=${id}&order=${desc ? "desc" : "asc"}`))

    if (searchStr !== currentSearchStr) {
      router.push(`${pathname}?${searchStr}`)
    }
  }, [pagination, sorting, rowCount, router, pathname, currentSearchStr])

  return { table, columns, router }
}

export default useQuotationsDataTable
