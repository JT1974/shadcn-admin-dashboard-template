"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Props {
  children?: React.ReactNode
  type?: "submit" | "button"
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost"
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

function RefreshButton({ children = "Refresh", type = "button", variant = "default", onClick }: Props) {
  const router = useRouter()

  return (
    <Button
      type={type}
      variant={variant}
      onClick={(e) => {
        onClick?.(e)
        router.refresh()
      }}
    >
      {children}
    </Button>
  )
}

export default RefreshButton
