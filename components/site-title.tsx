"use client"

import { useParams, useSelectedLayoutSegment } from "next/navigation"

function SiteTitle() {
  const id = useParams()?.id
  const segment = useSelectedLayoutSegment()
  const title = segment ? `${segment}${id ? ` — ${id}` : ""}` : "Dashboard"

  return <h1 className="text-base font-medium capitalize">{title}</h1>
}

export default SiteTitle
