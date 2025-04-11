import PaymentForm from "@/components/forms/main-page/payments";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { toast } from "sonner";

import { ScrollArea } from "@/components/ui/scroll-area";
import useMediaQuery from "@/hooks/use-media-query";
import { stringToDate } from "@/lib/utils";
import { usePaymentFormMutation } from "@/pages/Main-Page/api/payments";
import { PaymentFormSchema, PaymentFormSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type AddEditPaymentSheetDrawerProps = {
  children: React.ReactNode;
  payment?: PaymentType;
};

const AddEditPaymentSheetDrawer = ({
  children,
  payment,
}: AddEditPaymentSheetDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { t } = useTranslation();

  const paymentForm = useForm<PaymentFormSchemaType>({
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: payment
      ? {
          date: stringToDate(payment.date ?? new Date()),
          note: payment.note ?? "",
          amount: payment.amount,
          type: payment.type,
        }
      : {
          date: new Date(),
          note: "",
          amount: 0,
          type: "full",
        },
  });

  const { mutateAsync } = usePaymentFormMutation();

  const onSubmit = async (data: PaymentFormSchemaType) => {
    try {
      await mutateAsync({
        data: data,
        paymentId: payment?.id,
      });
      toast(t("Payment Saved"), {
        description: "",
      });
      paymentForm.reset();
      setIsOpen(false);
    } catch (error: any) {
      toast(t("Error"), {
        description:
          t(error.response.data.message) || t("Something went wrong"),
      });
    }
  };

  const isDesktop = useMediaQuery(1024);
  const isLoading = paymentForm.formState.isSubmitting;

  const content = {
    title: payment ? t("Edit payment") : t("Add a new payment"),
    description: "",
    trigger: children,
    content: (
      <PaymentForm
        paymentForm={paymentForm}
        isLoading={isLoading}
        onSubmit={onSubmit}
        payment={payment}
        footer={isDesktop ? "sheet" : "drawer"}
      />
    ),
  };

  return isDesktop ? (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{content.trigger}</DialogTrigger>
      <DialogContent className="bg-background sm:min-w-[500px] rounded-sm w-full transition-all duration-300 ease-in-out">
        <DialogHeader>
          <DialogTitle>{content.title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto">{content.content}</div>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{content.trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{content.title}</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-fit">{content.content}</ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default AddEditPaymentSheetDrawer;
