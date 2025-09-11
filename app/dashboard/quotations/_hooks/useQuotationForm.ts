import { createQuotation, updateQuotation } from "@/app/dashboard/quotations/_lib/actions"
import {
  mapQuotationFormToQuotationBody,
  mapQuotationDetailsToQuotationForm
} from "@/app/dashboard/quotations/_lib/mappers"
import { QuotationForm, quotationFormSchema } from "@/app/dashboard/quotations/_lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { toast } from "sonner"

interface Props {
  prefill?: QuotationDetails
  onSave?: () => void
}

function useQuotationForm({ prefill, onSave }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const {
    control,
    formState: { errors, isDirty },
    register,
    handleSubmit,
    setValue,
    reset
  } = useForm<QuotationForm>({
    resolver: zodResolver(quotationFormSchema),
    defaultValues: mapQuotationDetailsToQuotationForm(prefill)
  })

  const onSubmit: SubmitHandler<QuotationForm> = async (form) => {
    if (!isDirty) return

    setIsLoading(true)

    await (prefill
      ? updateQuotation({
          ...mapQuotationFormToQuotationBody(form),
          id: prefill.id
        })
      : createQuotation({
          ...mapQuotationFormToQuotationBody(form)
        }))

    onSave?.()

    if (!prefill) {
      reset()
    }

    toast.success("Quotation saved successfully!")

    setIsLoading(false)
  }

  useEffect(() => {
    if (prefill) reset(mapQuotationDetailsToQuotationForm(prefill))
  }, [prefill, reset])

  return {
    control,
    register,
    setValue,
    errors,
    onSubmit: handleSubmit(onSubmit),
    isLoading
  }
}

export default useQuotationForm
