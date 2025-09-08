import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface Props {
  name: string
  label?: string
  placeholder?: string | number
  value?: string | number | null
  options: (string | number)[]
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
  className?: string
  disabled?: boolean
  error?: string
}

function SelectWithLabel({
  name,
  label,
  placeholder,
  value,
  options,
  error,
  className,
  onSelect,
  disabled = false
}: Props) {
  return (
    <div className={className}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Select
        name={name}
        value={String(value)}
        onValueChange={(val) => onSelect({ target: { name, value: val } } as React.ChangeEvent<HTMLSelectElement>)}
        disabled={disabled}
      >
        <SelectTrigger id={name} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400/60" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}

export default SelectWithLabel
