import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Typography from "@/components/ui/typography";
import { stringToDate } from "@/lib/utils";
import { format } from "date-fns";
import { ar, enGB } from "date-fns/locale";
import { CalendarIcon, CreditCard, Pen, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDeleteExpenseMutation } from "../../api/expenses";
import AddEditExpenseDialogDrawer from "./add-edit-dialog-drawer";

const ExpensesList = ({
  expenses,
  isLoading,
}: {
  expenses: ExpenseType[];
  isLoading: boolean;
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const dir = i18n.dir();
  const dummyArray = Array.from({ length: 3 });

  const { mutate: deleteExpense } = useDeleteExpenseMutation();

  const handleDeleteExpense = (expenseId: string) => {
    const isSettled = confirm(
      t("Are you sure you want to delete this expense?")
    );
    if (isSettled) {
      deleteExpense({ expenseId });
    }
  };

  return (
    <ScrollArea className="flex flex-col divide-y border border-t-0 rounded-md max-h-80">
      {isLoading ? (
        dummyArray.map((_, index) => (
          <Skeleton key={index} className="h-20 mt-2 first:mt-0" />
        ))
      ) : expenses && expenses.length > 0 ? (
        expenses.map((expense) => {
          return (
            <div
              dir={dir}
              key={expense.id}
              className="p-4 flex flex-wrap gap-4 items-center justify-between last:border-b-0 border-b hover:bg-secondary/40 transition-all duration-200 ease-in-out cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className=" rounded-full bg-secondary border p-2">
                  <CreditCard className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex flex-col gap-2">
                  <Typography element="span" as="h6">
                    {expense?.name}
                  </Typography>
                  <div className="gap-1 flex items-center">
                    <CalendarIcon className="mr-1 h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">
                      {format(stringToDate(expense.createdAt), "eeee, d-MM-y", {
                        locale: lang === "ar" ? ar : enGB,
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex md:w-fit w-full md:justify-normal justify-between items-center gap-2 h-10">
                <Badge size={"lg"} className="text-xl">
                  {expense.amount} <sup className="text-lg">₪</sup>
                </Badge>
                <Separator orientation="vertical" />
                <div className="flex items-center gap-2">
                  <AddEditExpenseDialogDrawer expense={expense}>
                    <Button variant={"secondary"} size={"icon"}>
                      <Pen />
                    </Button>
                  </AddEditExpenseDialogDrawer>
                  <Button
                    onClick={() => handleDeleteExpense(expense?.id)}
                    variant={"destructive"}
                    size={"icon"}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="p-4 flex items-center justify-center">
          <div className="flex flex-col gap-2 items-center justify-center">
            <img
              src="/assets/noexpenses.png"
              alt="no data"
              className=" object-cover w-60"
            />
            <Typography
              element="span"
              className="text-4xl font-bold text-secondary-foreground"
            >
              {t("No expenses found")}
            </Typography>
          </div>
        </div>
      )}
    </ScrollArea>
  );
};

export default ExpensesList;
