import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IconArrowBack } from "@tabler/icons-react"
import Link from "next/link"

export default async function Page({ searchParams }: { searchParams: Promise<{ error: string }> }) {
  const params = await searchParams

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card className="gap-2">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold">Sorry, something went wrong.</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {params?.error ? (
              <p className="text-muted-foreground text-lg sm:text-xl">Code error: {params.error}</p>
            ) : (
              <p className="text-muted-foreground text-lg sm:text-xl">An unspecified error occurred.</p>
            )}
            <Link href="/login" className="flex gap-2 hover:text-blue-700 dark:hover:text-blue-400">
              <IconArrowBack />
              Back to login
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
