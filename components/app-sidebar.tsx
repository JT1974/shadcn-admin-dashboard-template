import * as React from "react"
import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { COMPANY_NAME, SITE_DESCRIPTION, SITE_NAME } from "@/constants/general"
import Link from "next/link"
import Image from "next/image"
import AppSidebarOnlineStatus from "@/components/app-sidebar-online-status"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu className="flex-row items-center">
          <SidebarMenuItem className="grow">
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/dashboard">
                <Image height={20} width={20} src="/icon.png" alt={SITE_DESCRIPTION} title={SITE_NAME} />
                <span className="text-base font-semibold">{COMPANY_NAME}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <AppSidebarOnlineStatus />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavDocuments />
        <NavSecondary className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
