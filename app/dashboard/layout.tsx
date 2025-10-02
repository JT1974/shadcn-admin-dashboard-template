import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/general"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION
}

export default async function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
