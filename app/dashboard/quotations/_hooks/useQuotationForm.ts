import { createQuotation, updateQuotation } from "@/app/dashboard/quotations/_lib/actions"
import {
  mapQuotationFormToQuotationBody,
  mapQuotationDetailsToQuotationForm
} from "@/app/dashboard/quotations/_lib/mappers"
import { QuotationForm, quotationFormSchema } from "@/app/dashboard/quotations/_lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { toast } from "sonner"

interface Props {
  prefill?: QuotationDetails
  onSave?: () => void
}

function useQuotationForm({ prefill, onSave }: Props) {
  const {
    control,
    formState: { errors, isDirty, isSubmitting },
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

    await (prefill
      ? updateQuotation({
          ...mapQuotationFormToQuotationBody(form),
          id: prefill.id
        })
      : createQuotation({
          ...mapQuotationFormToQuotationBody(form)
        }))

    onSave?.()

    reset()

    toast.success("Quotation saved successfully!")
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
    isLoading: isSubmitting
  }
}

export default useQuotationForm
