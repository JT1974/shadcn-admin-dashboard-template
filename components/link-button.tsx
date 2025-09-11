"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Props {
  to: string
  children: React.ReactNode
  onClick?: () => void
}

function LinkButton({ to, children, onClick }: Props) {
  return (
    <Button type="button" variant="outline" className="p-0" onClick={() => onClick?.()}>
      <Link href={to} className="flex size-full items-center justify-center">
        {children}
      </Link>
    </Button>
  )
}

export default LinkButton
