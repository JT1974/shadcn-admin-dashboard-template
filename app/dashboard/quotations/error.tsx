"use client"

import { IconArrowBack } from "@tabler/icons-react"
import Link from "next/link"

function Error() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-4">
      <h2 className="text-4xl font-semibold text-red-600 sm:text-6xl dark:text-red-500">Not found</h2>
      <h3 className="text-center text-2xl sm:text-3xl">The requested data cannot be found in our database.</h3>
      <Link href="/dashboard/quotations" className="flex gap-2 hover:text-blue-700 dark:hover:text-blue-400">
        <IconArrowBack />
        Back to quotations
      </Link>
    </div>
  )
}

export default Error
