import {
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers
} from "@tabler/icons-react"

export const navigation = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard
    },
    {
      title: "Quotations",
      url: "/dashboard/quotations",
      icon: IconListDetails
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar
    },
    {
      title: "Projects",
      url: "#",
      icon: IconFolder
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers
    }
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch
    }
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord
    }
  ]
}
