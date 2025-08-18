'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface Props {
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null
}

export function LogoutButton({variant}:Props) {
  const router = useRouter()

  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return <Button onClick={logout} variant={variant}>Logout</Button>
}
