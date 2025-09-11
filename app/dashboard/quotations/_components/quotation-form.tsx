"use client"

import useQuotationForm from "@/app/dashboard/quotations/_hooks/useQuotationForm"
import InputWithLabel from "@/components/input-with-label"
import SelectWithLabel from "@/components/select-with-label"
import TextareaWithLabel from "@/components/textarea-with-label"
import { Button } from "@/components/ui/button"
import { getSupabaseEnumValues } from "@/constants/supabase"
import { cn } from "@/lib/utils"
import { IconPlus } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { Controller } from "react-hook-form"

interface Props {
  customers?: Partner[]
  prefill?: QuotationDetails
  onSave?: () => void
  actionButtons: React.ReactNode
  disabled?: boolean
  className?: string
}

function QuotationForm({ customers = [], prefill, onSave, actionButtons, disabled = false, className }: Props) {
  const router = useRouter()
  const { control, register, setValue, errors, onSubmit, isLoading } = useQuotationForm({
    prefill,
    onSave
  })

  return (
    <form className={cn("flex flex-col justify-between gap-4", className)} onSubmit={onSubmit}>
      <fieldset className="flex w-full flex-col gap-4" disabled={disabled}>
        {customers.length > 0 && (
          <div className="flex items-start gap-2">
            <Controller
              control={control}
              name="customer"
              render={({ field: { name, onChange, value } }) => {
                return (
                  <SelectWithLabel
                    label="Customer"
                    name={name}
                    value={value?.name}
                    placeholder="Select a customer"
                    onSelect={({ target: { value } }) => {
                      const customer = customers.find((customer) => customer.name === value)
                      if (customer) {
                        onChange(customer)
                        setValue("customerId", customer.id)
                      }
                    }}
                    options={customers?.map(({ name }) => name ?? "Unknown")}
                    className="flex grow flex-col gap-3"
                    error={errors.customerId?.message}
                  />
                )
              }}
            />
            <Button
              variant="outline"
              size="default"
              onClick={(e) => {
                e.preventDefault()
                router.push("/dashboard/partners/create?partnerType=customer&redirectTo=/dashboard/quotations/create")
              }}
              className="mt-6.5"
            >
              <IconPlus />
              <span className="hidden lg:inline">Add Customer</span>
            </Button>
          </div>
        )}

        <TextareaWithLabel
          label="Description"
          {...register("description")}
          className="flex flex-col gap-3"
          error={errors.description?.message}
        />
        <Controller
          control={control}
          name="status"
          render={({ field: { name, onChange, value }, fieldState: { error } }) => {
            return (
              <SelectWithLabel
                label="Status"
                name={name}
                value={value}
                onSelect={onChange}
                options={getSupabaseEnumValues("quotationStatus")}
                className="flex flex-col gap-3"
                error={error?.message}
              />
            )
          }}
        />
        <Controller
          control={control}
          name="reference"
          render={({ field: { name, onChange, value }, fieldState: { error } }) => {
            return (
              <SelectWithLabel
                label="Reference"
                name={name}
                value={value}
                onSelect={onChange}
                options={getSupabaseEnumValues("quotationReference")}
                className="flex flex-col gap-3"
                error={error?.message}
              />
            )
          }}
        />
        <InputWithLabel
          label="Fulfillment time"
          type="number"
          // add transform function to convert string to number
          {...register("fulfillmentTime", {
            setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10))
          })}
          className="flex flex-col gap-3"
          error={errors.fulfillmentTime?.message}
        />
        <Controller
          control={control}
          name="fulfillmentTimeUnit"
          render={({ field: { name, onChange, value }, fieldState: { error } }) => {
            return (
              <SelectWithLabel
                name={name}
                value={value}
                onSelect={onChange}
                options={getSupabaseEnumValues("workingTimeUnit")}
                className="flex flex-col gap-3"
                error={error?.message}
              />
            )
          }}
        />
        <InputWithLabel
          label="Payment time"
          type="number"
          // add transform function to convert string to number
          {...register("paymentTime", {
            setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10))
          })}
          className="flex flex-col gap-3"
          error={errors.paymentTime?.message}
        />
        <Controller
          control={control}
          name="paymentTimeUnit"
          render={({ field: { name, onChange, value }, fieldState: { error } }) => {
            return (
              <SelectWithLabel
                name={name}
                value={value}
                onSelect={onChange}
                options={getSupabaseEnumValues("workingTimeUnit")}
                className="flex flex-col gap-3"
                error={error?.message}
              />
            )
          }}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-4" disabled={disabled || isLoading}>
        {actionButtons}
      </fieldset>
    </form>
  )
}

export default QuotationForm
