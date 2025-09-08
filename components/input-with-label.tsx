import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface Props {
  name: string
  label: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  error?: string
  type?: "text" | "number"
}

function InputWithLabel({ name, label, className = "", error, ...props }: Props) {
  return (
    <div className={className}>
      <Label htmlFor={name}>{label}</Label>

      <Input name={name} {...props} />

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400/60" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}

export default InputWithLabel
