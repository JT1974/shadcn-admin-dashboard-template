import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface Props {
  name: string
  label: string
  defaultValue?: string
  className?: string
}

function InputWithLabel({ name, label, defaultValue, className = "" }: Props) {
  return (
    <div className={className}>
      <Label htmlFor={name}>{label}</Label>
      <Input name={name} defaultValue={defaultValue} />
    </div>
  )
}

export default InputWithLabel
