import { redirect } from "next/navigation"
import { type NextRequest } from "next/server"

// there's nothing at "/" route, requests are redirected to /dashboard
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const _next = searchParams.get("next")
  const next = _next?.startsWith("/") ? _next : "/dashboard"

  redirect(next)
}
