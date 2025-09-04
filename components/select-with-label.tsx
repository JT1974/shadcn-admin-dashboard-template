import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface Props {
  name: string
  label?: string
  placeholder?: string
  defaultValue?: string
  values: string[]
  className?: string
}

function SelectWithLabel({ name, label, placeholder, defaultValue, values, className }: Props) {
  return (
    <div className={className}>
      <Label htmlFor={name}>{label}</Label>
      <Select name={name} defaultValue={defaultValue}>
        <SelectTrigger id={name} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {values.map((value) => (
            <SelectItem key={value} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectWithLabel
