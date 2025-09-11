"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Props {
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

// WARNING!: SSR static pages (without dynamic segments, eg. [id]) will not be refreshed after client-side navigation
// Do NOT use this button to go back to static SSR pages with server data!
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
