import { toast } from "sonner";

import ExpenseForm from "@/components/forms/main-page/expenses";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { stringToDate } from "@/lib/utils";
import { useExpenseFormMutation } from "@/pages/Main-Page/api/expenses";
import { ExpenseFormSchema, ExpenseFormSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useMediaQuery from "@/hooks/use-media-query";
import { ScrollArea } from "@/components/ui/scroll-area";

type AddEditExpenseSheetProps = {
  children: React.ReactNode;
  expense?: ExpenseType;
};

const AddEditExpenseSheet = ({
  children,
  expense,
}: AddEditExpenseSheetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { t } = useTranslation();

  const expenseForm = useForm<ExpenseFormSchemaType>({
    resolver: zodResolver(ExpenseFormSchema),
    defaultValues: expense
      ? {
          ...expense,
          date: stringToDate(expense.date ?? new Date()),
          description: expense.description ?? "",
          category: expense.category.id,
        }
      : {
          name: "",
          description: "",
          amount: 0,
          category: "",
          date: new Date(),
        },
  });

  const { mutateAsync } = useExpenseFormMutation();

  const onSubmit = async (data: ExpenseFormSchemaType) => {
    try {
      await mutateAsync({
        data,
        expenseId: expense?.id,
      });
      toast(t("Expense Saved"), {
        description: "",
      });
      expenseForm.reset();
      setIsOpen(false);
    } catch (error: any) {
      toast(t("Error"), {
        description:
          t(error.response.data.message) || t("Something went wrong"),
      });
    }
  };

  const isLoading = expenseForm.formState.isSubmitting;

  const isDesktop = useMediaQuery(1024);

  const content = {
    title: expense ? t("Edit expense") : t("Add a new expense"),
    trigger: children,
    content: (
      <ExpenseForm
        expenseForm={expenseForm}
        isLoading={isLoading}
        onSubmit={onSubmit}
        expense={expense}
        footer={isDesktop ? "sheet" : "drawer"}
      />
    ),
  };

  return;
  {
    isDesktop ? (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>{content.trigger}</SheetTrigger>
        <SheetContent
          disableBackdrop
          className="bg-background sm:min-w-[500px] rounded-sm w-full transition-all duration-300 ease-in-out"
          side={"right"}
        >
          <SheetHeader>
            <SheetTitle>{content.title}</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="overflow-y-auto">{content.content}</div>
        </SheetContent>
      </Sheet>
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
  }
};

export default AddEditExpenseSheet;
