import { Badge } from "@/components/ui/badge"
import { IconCircleCheckFilled, IconCircleXFilled, IconTrashFilled, IconLoader } from "@tabler/icons-react"

interface Props {
  status: "created" | "accepted" | "rejected" | "deleted"
}

function QuotationStatusBadge({ status }: Props) {
  return (
    <Badge variant="outline" className="text-muted-foreground px-1.5">
      {status === "accepted" && <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />}
      {status === "rejected" && <IconCircleXFilled className="fill-red-500 dark:fill-red-400" />}
      {status === "deleted" && <IconTrashFilled className="fill-gray-500 dark:fill-gray-400" />}
      {status === "created" && <IconLoader color="royalblue" />}
      {status}
    </Badge>
  )
}

export default QuotationStatusBadge
