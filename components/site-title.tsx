"use client"

import { SITE_NAME } from "@/constants/general"
import { useSelectedLayoutSegment } from "next/navigation"

function SiteTitle() {
  const segment = useSelectedLayoutSegment()
  const title = segment ?? SITE_NAME

  return <h1 className="text-base font-medium capitalize">{title}</h1>
}

export default SiteTitle
