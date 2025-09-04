import { cn } from "@/lib/utils"

interface Props {
  className?: string
}

function Loader({ className }: Props) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-10 flex size-full items-center justify-center",
        className ?? "text-slate-700 opacity-500 dark:text-slate-200"
      )}
    >
      <div className="absolute inset-0 size-full"></div>
      <svg
        className="size-12 animate-spin sm:size-16"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="text-white opacity-50 dark:text-slate-800"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  )
}
export default Loader
