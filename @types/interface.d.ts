interface IByIdParams {
  id: number
}

interface IByIdsParams {
  ids: number[]
}

interface IQueryParams {
  select: string
  order?: {
    field: string
    ascending: boolean
  }
  range?: {
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

interface ICurrentUser {
  name: string
  firstname: string
  lastname: string
  initials: string
  email: string
  isAdmin: boolean
  phone: string
}
