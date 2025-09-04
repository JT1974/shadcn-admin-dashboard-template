import Link from "next/link"

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested quotation</p>
      <Link href="/dashboard/quotations">Back to quotations</Link>
    </div>
  )
}
