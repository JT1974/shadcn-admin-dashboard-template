"use server"

import { createClient } from "@supabase/supabase-js"

export const createUser = async ({
  email,
  firstname,
  lastname,
  phone,
  password
}: Partial<ICurrentUser> & { password: string }) => {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      autoRefreshToken: true,
      persistSession: true
    }
  })

  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    phone,
    user_metadata: {
      firstname,
      lastname
    },
    email_confirm: true
  })

  if (error) throw error

  return
}
