import { Badge } from "@/components/ui/badge"
import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react"

interface Props {
  task: Partial<TaskDetails>
}

function QuotationsTaskStatusBadge({ task }: Props) {
  return (
    <Badge variant="outline" className="text-muted-foreground px-1.5">
      {task.status === "closed" ? (
        <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
      ) : task.status === "suspended" ? (
        <IconCircleCheckFilled className="fill-orange-500 dark:fill-orange-400" />
      ) : task.status === "cancelled" ? (
        <IconCircleCheckFilled className="fill-red-500 dark:fill-red-400" />
      ) : (
        /* taskStatus: "open" | "inprogress" | "continuous" */
        <IconLoader color="royalblue" />
      )}
      {task.id}
    </Badge>
  )
}

export default QuotationsTaskStatusBadge
