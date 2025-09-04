"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

function Error() {
  const router = useRouter()

  return (
    <div>
      <h2>Oops!</h2>
      <p>Something happened.</p>
      <Button onClick={() => router.back()}>Back to quotations</Button>
    </div>
  )
}

export default Error
