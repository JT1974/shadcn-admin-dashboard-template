"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Props {
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

function BackButton({ children = "Back", onClick }: Props) {
  const router = useRouter()

  return (
    <Button
      type="button"
      variant="outline"
      onClick={(e) => {
        onClick?.(e)
        router.back()
      }}
    >
      {children}
    </Button>
  )
}

export default BackButton
