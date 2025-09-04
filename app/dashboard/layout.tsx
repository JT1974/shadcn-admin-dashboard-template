import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard - Robbkontrol Kft",
  description: "Robbkontrol Kft. admin dashboard"
}

export default async function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
