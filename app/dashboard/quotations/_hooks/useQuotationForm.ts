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

    const quotation = await (prefill
      ? updateQuotation({
          ...mapQuotationFormToQuotationBody(form),
          id: prefill.id
        })
      : createQuotation({
          ...mapQuotationFormToQuotationBody(form)
        }))

    onSave?.()

    // TODO: mentés után az update form (errorok és dirtyFieldek) resetelődjenek, az értékek pedig maradjanak meg,
    // így nem lehet majd mégegyszer elküldeni változatlan értékekkel, de nem kell törölni csak a create formot
    // ha megvan a partnerSelector, akkor a QuotationForm type-ból ki lehet venni a customer-t
    // és akkor ez is jó lesz
    //reset(mapQuotationDetailsToQuotationForm(quotation))

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
