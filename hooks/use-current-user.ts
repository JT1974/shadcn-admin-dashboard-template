import { createClient } from "@/lib/supabase/client"
import { UserMetadata } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

export interface ICurrentUser {
  name: string
  firstname: string
  lastname: string
  initials: string
  email: string
  isAdmin: boolean
  phone: string
  roles: string[]
}

export const useCurrentUser = (): ICurrentUser => {
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
    firstname: userMeta?.user.firstname ?? "?",
    lastname: userMeta?.user.lastname ?? "?",
    initials: userMeta?.user ? `${userMeta.user.lastname[0]}${userMeta.user.firstname[0]}` : "?",
    email: userMeta?.user?.email ?? "?",
    isAdmin: userMeta?.user?.isAdmin || false,
    phone: userMeta?.user?.phone ?? "?",
    roles: userMeta?.user?.roles ?? []
  }
}
