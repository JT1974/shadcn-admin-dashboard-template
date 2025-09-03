import { Badge } from "@/components/ui/badge"
import { useMemo } from "react"

interface Props {
  status?: SupabaseEnums["taskStatus"]
  className?: string
}

function TaskStatus({ status, className }: Props) {
  const color = useMemo(() => {
    switch (status) {
      case "open":
      case "suspended":
        return "yellow"
      case "cancelled":
        return "red"
      case "closed":
        return "green"
      default:
        return "gray"
    }
  }, [status])

  if (!status) return null

  return (
    <Badge color={color} className={className}>
      {status}
    </Badge>
  )
}

export default TaskStatus
