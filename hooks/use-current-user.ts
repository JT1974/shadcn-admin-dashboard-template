import { createClient } from "@/lib/supabase/client"
import { UserMetadata } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

export const useCurrentUser = () => {
  const [userMeta, setUserMeta] = useState<UserMetadata | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await createClient().auth.getSession()

      if (error) {
        console.error(error)
      }

      setUserMeta(data.session?.user.user_metadata ?? null)
    }

    fetchUser()
  }, [])

  return {
    name: userMeta?.user ? `${userMeta.user.lastname} ${userMeta.user.firstname}` : "?",
    email: userMeta?.user?.email || "?",
    isAdmin: userMeta?.user?.isAdmin || false,
    phone: userMeta?.user?.phone || "?",
    roles: userMeta?.user?.roles || []
  }
}
