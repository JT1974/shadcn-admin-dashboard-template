"use client"

import * as React from "react"
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconLayoutColumns,
  IconLoader,
  IconPlus,
  IconSortAscending,
  IconSortDescending
} from "@tabler/icons-react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
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
import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import QuotationForm from "@/app/dashboard/quotations/QuotationForm"
import { useRouter, useSearchParams } from "next/navigation"
import { DEFAULT_PAGINATION_LIMIT } from "@/constants/general"

export function QuotationsDataTable({ data, rowCount }: { data: IQuotation[]; rowCount: number }) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])

  //const navigation = useNavigation()
  const params = useSearchParams()
  const page = params.get("page")
  const limit = params.get("limit")
  const [pagination, setPagination] = React.useState({
    pageIndex: page ? Number(page) - 1 : 0,
    pageSize: limit ? Number(limit) : DEFAULT_PAGINATION_LIMIT
  })
  const router = useRouter()

  const columns = React.useMemo<ColumnDef<IQuotation>[]>(
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
        ),
        enableSorting: false,
        enableHiding: false
      },
      {
        accessorKey: "number",
        header: "Number",
        cell: ({ row }) => {
          return <TableCellViewer item={row.original} />
        },
        enableHiding: false
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => <p className="max-w-160 text-wrap">{row.original.description}</p>,
        enableHiding: true,
        enableSorting: false
      },
      {
        accessorKey: "reference",
        header: "Reference",
        cell: ({ row }) => row.original.reference,
        enableHiding: true
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant="outline" className="text-muted-foreground px-1.5">
            {row.original.status === "accepted" ? (
              <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
            ) : (
              <IconLoader />
            )}
            {row.original.status}
          </Badge>
        )
      },
      {
        accessorKey: "tasks",
        header: "Tasks",
        cell: ({ row }) =>
          row.original.tasks?.map((task) => (
            <Link key={task.id} href={`/dashboard/tasks/${task.id}`}>
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {/* taskStatus: "open" | "inprogress" | "closed" | "suspended" | "continuous" | "cancelled" */}
                {task.status === "closed" ? (
                  <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                ) : task.status === "suspended" ? (
                  <IconCircleCheckFilled className="fill-orange-500 dark:fill-orange-400" />
                ) : task.status === "cancelled" ? (
                  <IconCircleCheckFilled className="fill-red-500 dark:fill-red-400" />
                ) : (
                  <IconLoader />
                )}
                {task.id}
              </Badge>
            </Link>
          )),
        enableSorting: false
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => <p>{formatDate(row.original.createdAt)}</p>,
        enableHiding: true,
        sortingFn: "datetime"
      },
      {
        id: "actions",
        cell: () => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                size="icon"
              >
                <IconDotsVertical />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Make a copy</DropdownMenuItem>
              <DropdownMenuItem>Favorite</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
        enableSorting: false
      }
    ],
    [data]
  )

  // TODO: sorting
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
    let url = "/dashboard/quotations?"

    const newPage = (pagination.pageIndex + 1) * pagination.pageSize <= rowCount ? pagination.pageIndex + 1 : 1

    url += `page=${newPage}&limit=${pagination.pageSize}`

    if (sorting.length) {
      url += `&sort=${sorting[0].id}&order=${sorting[0].desc ? "desc" : "asc"}`
    }

    if (url) {
      router.push(url)
    }
  }, [pagination.pageSize, pagination.pageIndex, sorting, rowCount, router])

  return (
    <div className="flex w-full flex-col items-start gap-6">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <IconLayoutColumns />
              <span className="hidden lg:inline">Customize Columns</span>
              <span className="lg:hidden">Columns</span>
              <IconChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {table
              .getAllColumns()
              .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" size="sm">
          <IconPlus />
          <span className="hidden lg:inline">Add Section</span>
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
        {/* table footer */}
        <div className="flex items-center justify-between">
          {/* number of rows selected */}
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
            selected.
          </div>
          {/* pagination */}
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TableCellViewer({ item }: { item: IQuotation }) {
  const isMobile = useIsMobile()

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.number}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.number ?? "New quotation"}</DrawerTitle>
          {item.customer && (
            <DrawerDescription className="capitalize">
              {item.customer?.name} {item.customer?.companyForm}
            </DrawerDescription>
          )}
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <QuotationForm id="quotation-form" item={item} />
        </div>
        <DrawerFooter>
          <Button type="submit" form="quotation-form">
            Submit
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
