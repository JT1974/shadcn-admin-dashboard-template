import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { IconArrowBack } from "@tabler/icons-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card className="gap-2">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold">Page not found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-muted-foreground text-lg sm:text-xl">The requested page cannot be found.</p>
            <Link href="/dashboard" className="flex gap-2 hover:text-blue-700 dark:hover:text-blue-400">
              <IconArrowBack />
              Back to home
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
