import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

export const useCurrentUser = (): ICurrentUser => {
  const [userMeta, setUserMeta] = useState<User | null>(null)
  const user = userMeta?.user_metadata

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await createClient().auth.getUser()

      if (error) {
        console.error(error)
      }

      setUserMeta(data.user ?? null)
    }

    fetchUser()
  }, [])

  return {
    name: user?.lastname || user?.firstname ? `${user.lastname} ${user.firstname}` : "Anonymous",
    firstname: user?.firstname ?? "Anonymous",
    lastname: user?.lastname ?? "",
    initials: user?.lastname || user?.firstname ? `${user.lastname[0]}${user.firstname[0]}` : "A",
    email: userMeta?.email ?? "-",
    isAdmin: userMeta?.role === "admin",
    phone: userMeta?.phone ?? "-"
  }
}
