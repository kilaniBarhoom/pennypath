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
import { stringToDate } from "@/lib/utils";
import { useExpenseFormMutation } from "@/pages/Main-Page/api/expenses";
import { ExpenseFormSchema, ExpenseFormSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type AddEditExpenseSheetProps = {
  children: React.ReactNode;
  expense?: ExpenseType;
};

const AddEditExpenseSheet = ({
  children,
  expense,
}: AddEditExpenseSheetProps) => {
  const [sheetOpen, setSheetOpen] = useState(false);

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
          category: "678408c6debdfad37ae65a3e",
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
      setSheetOpen(false);
    } catch (error: any) {
      toast(t("Error"), {
        description: t(error?.response?.data?.[0]) || t("Something went wrong"),
      });
    }
  };

  const isLoading = expenseForm.formState.isSubmitting;

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        disableBackdrop
        className="bg-background sm:min-w-[500px] rounded-sm w-full transition-all duration-300 ease-in-out"
        side={"right"}
      >
        <SheetHeader>
          <SheetTitle>
            {expense ? t("Edit expense") : t("Add a new expense")}
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="overflow-y-auto">
          <ExpenseForm
            expenseForm={expenseForm}
            isLoading={isLoading}
            onSubmit={onSubmit}
            expense={expense}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddEditExpenseSheet;
