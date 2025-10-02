import { useIsMobile } from "@/hooks/use-mobile"
import { useRouter } from "next/navigation"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import QuotationForm from "@/app/dashboard/quotations/_components/quotation-form"

interface Props {
  item: QuotationDetails
}

function QuotationViewer({ item }: Props) {
  const router = useRouter()
  const isMobile = useIsMobile()

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.number}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.number ?? "New quotation"}</DrawerTitle>
          {item.customer && (
            <DrawerDescription className="capitalize">
              {item.customer?.name} {item.customer?.companyForm}
            </DrawerDescription>
          )}
        </DrawerHeader>
        <DrawerFooter className="grow overflow-y-auto px-4 pb-4">
          <QuotationForm
            prefill={item}
            onSave={router.refresh}
            actionButtons={
              <>
                <DrawerClose asChild>
                  <Button type="submit">Submit</Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button variant="outline">Done</Button>
                </DrawerClose>
              </>
            }
            className="grow"
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default QuotationViewer
