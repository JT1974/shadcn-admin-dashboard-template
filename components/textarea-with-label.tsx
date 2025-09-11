import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Props {
  name: string
  label: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  error?: string
}

function TextareaWithLabel({ name, label, error, className = "", ...props }: Props) {
  return (
    <div className={className}>
      <Label htmlFor={name}>{label}</Label>

      <Textarea name={name} {...props} />

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400/60" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}

export default TextareaWithLabel
