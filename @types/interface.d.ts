interface IByIdParams {
  id: string | number
}

interface IByIdsParams {
  ids: string[]
}

interface IQueryParams {
  select: string
  order: {
    field: string
    ascending: boolean
  }
  range: {
    from: number
    to: number
  }
  filters?: {
    method: "eq" | "ilike" | "is"
    field: string
    value: string | boolean
  }[]
}

interface IGenericPaginationResponse<T> {
  data: T[] | null
  count: number | null
}

interface IFilter {
  id: string
  key: string
  name: string
  type: string
  param: string
  value?: string | boolean
  values?: (string | number)[]
}

type IFilterOption = Omit<IFilter, "id">

type IOrderByFields = Record<string, string | null>
