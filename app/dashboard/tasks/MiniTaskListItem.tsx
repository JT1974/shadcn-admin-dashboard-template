import TaskStatus from "@/app/dashboard/tasks/TaskStatus"
import Currency from "@/components/currency"
import { Badge } from "@/components/ui/badge"
import { classNames, formatDate, getFullName } from "@/lib/utils"
import { BanknoteIcon, ClockIcon, UserIcon } from "lucide-react"
import type { ReactNode } from "react"

interface Props {
  task?: ITask
  className?: string
  buttons?: ReactNode
  buttonPosition?: "bottom" | "right"
}

function MiniTaskListItem({ task, className = "", buttons, buttonPosition = "right" }: Props) {
  if (!task?.id) return null

  const { currency, deadline, description, status, owner, unitPrice } = task

  return (
    <div className={classNames("flex w-full justify-between gap-x-3 py-1", className)}>
      <div className="flex flex-col pb-1.5">
        <p className="text-sm/6 font-medium">{description ?? "No description"}</p>

        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs/5">
          {status ? <TaskStatus status={status} /> : null}
          <Badge className="flex shrink-0 items-center gap-1" color="purple">
            <ClockIcon className="size-3" />
            {deadline ? <time dateTime={deadline}>{formatDate(new Date(deadline))}</time> : "No due date"}
          </Badge>
          <Badge className="flex shrink-0 items-center gap-1 capitalize" color="blue">
            <UserIcon className="size-3" />
            {getFullName({
              lastname: owner?.lastname,
              firstname: owner?.firstname
            }) || "No owner"}
          </Badge>
          <Badge className="flex shrink-0 items-center gap-1" color="orange">
            <BanknoteIcon className="size-3" />
            {unitPrice ? <Currency value={unitPrice} currency={currency} /> : "No price"}
          </Badge>

          {buttonPosition === "bottom" && <div className="flex flex-col gap-1 pl-2.5">{buttons}</div>}
        </div>
      </div>
      {buttonPosition === "right" && (
        <div className="my-1 flex flex-col gap-1 border-l border-slate-200 p-1.5 pl-2.5 dark:border-slate-600">
          {buttons}
        </div>
      )}
    </div>
  )
}

export default MiniTaskListItem
