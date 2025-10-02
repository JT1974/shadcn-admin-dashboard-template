import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quotations",
  description: "Quotations for existing and potential new clients"
}

export default async function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
