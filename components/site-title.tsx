"use client"

import { useSelectedLayoutSegment } from "next/navigation"

function SiteTitle() {
  const segment = useSelectedLayoutSegment()
  const title = segment ?? "Dashboard"

  return <h1 className="text-base font-medium capitalize">{title}</h1>
}

export default SiteTitle
