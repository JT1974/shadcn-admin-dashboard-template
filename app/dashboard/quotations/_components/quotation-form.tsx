"use client"

import useQuotationForm from "@/app/dashboard/quotations/_hooks/useQuotationForm"
import SelectWithLabel from "@/components/select-with-label"
import TextareaWithLabel from "@/components/textarea-with-label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
    <form className={cn("flex flex-col justify-between gap-9", className)} onSubmit={onSubmit}>
      <fieldset className="flex w-full flex-col gap-6" disabled={disabled || isLoading}>
        {/* TODO: ehelyett kell egy partnerSelector, és ha választunk, a customerId-t seteljük a kiválasztott id-ra
        és így a QuotationForm-ból ki lehet venni a customer-t, és egy ugyanilyen kell taskSelector-nak */}
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

        <div className="flex grow flex-col gap-3">
          <Label htmlFor="fulfillmentTime">Fulfillment time</Label>

          <div className="flex flex-wrap gap-4">
            <div className="grow">
              <Input
                type="number"
                // add transform function to convert string to number
                {...register("fulfillmentTime", {
                  setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10))
                })}
              />
            </div>

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
                    className="min-w-32 grow"
                    error={error?.message}
                  />
                )
              }}
            />
          </div>

          {errors.fulfillmentTime?.message && (
            <p className="text-sm text-red-600 dark:text-red-400/60" id="fulfillmentTime-error">
              {errors.fulfillmentTime.message}
            </p>
          )}
        </div>

        <div className="flex grow flex-col gap-3">
          <Label htmlFor="paymentTime">Payment time</Label>

          <div className="flex flex-wrap gap-4">
            <div className="grow">
              <Input
                type="number"
                // add transform function to convert string to number
                {...register("paymentTime", {
                  setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10))
                })}
              />
            </div>

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
                    className="min-w-32 grow"
                    error={error?.message}
                  />
                )
              }}
            />
          </div>

          {errors.paymentTime?.message && (
            <p className="text-sm text-red-600 dark:text-red-400/60" id="paymentTime-error">
              {errors.paymentTime.message}
            </p>
          )}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4" disabled={disabled || isLoading}>
        {actionButtons}
      </fieldset>
    </form>
  )
}

export default QuotationForm
