import MiniTaskListItem from "@/app/dashboard/tasks/MiniTaskListItem"
import { cn } from "@/lib/utils"
import { PencilIcon } from "lucide-react"
import Link from "next/link"

interface Props {
  tasks: ITask[] | null
  className?: string
}

function MiniTaskList({ tasks, className = "" }: Props) {
  return (
    <ul
      role="list"
      className={cn("relative my-2 space-y-2 divide-y divide-slate-200 dark:divide-slate-800", className)}
    >
      {tasks?.map((task) => (
        <MiniTaskListItem
          key={task.id}
          task={task}
          buttons={
            <Link href={`/dashboard/tasks/${task.id}`} title="Edit task">
              <PencilIcon className="size-4" />
            </Link>
          }
          buttonPosition="bottom"
        />
      )) ?? <>&mdash;</>}
    </ul>
  )
}

export default MiniTaskList
