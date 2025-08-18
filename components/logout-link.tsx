"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function LogoutLink() {
  const router = useRouter()

  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace("/auth/login")
  }

  return (
    <Link href="#" onClick={logout}>
      Logout
    </Link>
  )
}
