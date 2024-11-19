import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import { ExpenseFormSchemaType, ExpenseFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useExpenseFormMutation } from "@/pages/Main-Page/api/expenses";
import ExpenseForm from "@/components/forms/main-page/expenses";

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
      amount: String(expense?.amount) || "0",
    },
  });

  const { mutateAsync } = useExpenseFormMutation();

  const onSubmit = async (data: ExpenseFormSchemaType) => {
    try {
      toast(t("Saving expense"), {
        description: "",
      });
      await mutateAsync({
        data: data,
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {expense ? t("Edit expense") : t("Add a new expense")}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="p-4">
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
