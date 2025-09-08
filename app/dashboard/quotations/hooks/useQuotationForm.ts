import { mapQuotationFormToQuotationBody, mapQuotationToQuotationForm } from "@/app/dashboard/quotations/lib/mappers"
import { quotationFormSchema } from "@/app/dashboard/quotations/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { toast } from "sonner"

interface Props {
  prefill?: IQuotation
  onSave: (body: IUpsertQuotationBody) => void
}

function useQuotationForm({ prefill, onSave }: Props) {
  const {
    control,
    formState: { errors, isDirty },
    register,
    handleSubmit,
    setValue,
    reset
  } = useForm<IQuotationForm>({
    resolver: zodResolver(quotationFormSchema),
    defaultValues: mapQuotationToQuotationForm(prefill)
  })

  const onSubmit: SubmitHandler<IQuotationForm> = (form) => {
    if (!isDirty) return

    onSave({
      ...mapQuotationFormToQuotationBody(form),
      id: prefill?.id
    })

    toast.success("Quotation saved successfully!")
  }

  useEffect(() => {
    if (prefill) reset(mapQuotationToQuotationForm(prefill))
  }, [prefill, reset])

  return {
    control,
    register,
    setValue,
    errors,
    onSubmit: handleSubmit(onSubmit)
  }
}

export default useQuotationForm
