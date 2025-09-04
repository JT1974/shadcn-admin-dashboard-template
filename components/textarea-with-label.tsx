import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Props {
  name: string
  label: string
  defaultValue?: string
  className?: string
}

function TextareaWithLabel({ name, label, defaultValue, className = "" }: Props) {
  return (
    <div className={className}>
      <Label htmlFor={name}>{label}</Label>
      <Textarea name={name} defaultValue={defaultValue} />
    </div>
  )
}

export default TextareaWithLabel
