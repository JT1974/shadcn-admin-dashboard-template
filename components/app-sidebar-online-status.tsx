"use client"

import { SidebarMenuItem } from "@/components/ui/sidebar"
import useOnlineStatus from "@/hooks/use-online-status"
import { DotIcon } from "lucide-react"

function AppSidebarOnlineStatus() {
  const isOnline = useOnlineStatus()

  return (
    <SidebarMenuItem title={isOnline ? "online" : "offline"}>
      <DotIcon color={isOnline ? "green" : "red"} strokeWidth={5} />
    </SidebarMenuItem>
  )
}

export default AppSidebarOnlineStatus
