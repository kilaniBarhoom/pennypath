import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import ExpenseForm from "@/components/forms/main-page/expenses";
import { useExpenseFormMutation } from "@/pages/Main-Page/api/expenses";
import { ExpenseFormSchema, ExpenseFormSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type AddEditExpenseDialogDrawerProps = {
  children: React.ReactNode;
  expense?: ExpenseType;
};

const AddEditExpenseDialogDrawer = ({
  children,
  expense,
}: AddEditExpenseDialogDrawerProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { t } = useTranslation();

  const expenseForm = useForm<ExpenseFormSchemaType>({
    resolver: zodResolver(ExpenseFormSchema),
    defaultValues: {
      name: expense?.name || "",
      description: expense?.description || "",
      amount: expense?.amount || 0,
      categories: expense?.categories || [],
    },
  });

  const { mutateAsync } = useExpenseFormMutation();

  const onSubmit = async (data: ExpenseFormSchemaType) => {
    try {
      const updatedData = {
        ...data,
        categories: data.categories?.filter((category) => category.name.trim()),
      };

      toast(t("Saving expense"), {
        description: "",
      });
      await mutateAsync({
        data: updatedData,
        expenseId: expense?.id,
      });
      expenseForm.reset();
      setDialogOpen(false);
    } catch (error: any) {
      toast(t("Error"), {
        description: t(error?.response?.data?.[0]) || t("Something went wrong"),
      });
    }
  };

  const isLoading = expenseForm.formState.isSubmitting;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(600px,70vh)] sm:max-w-lg [&>button:last-child]:hidden relative pb-14">
        <DialogHeader>
          <DialogTitle>
            {expense ? t("Edit expense") : t("Add a new expense")}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="p-4 overflow-y-auto">
          <ExpenseForm
            expenseForm={expenseForm}
            isLoading={isLoading}
            onSubmit={onSubmit}
            expense={expense}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditExpenseDialogDrawer;
