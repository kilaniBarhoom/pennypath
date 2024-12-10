import LoadingComponent from "@/components/shared/Loading-component";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { ny, stringToDate } from "@/lib/utils";
import { format } from "date-fns";
import { ar, enGB } from "date-fns/locale";
import { BellDot, CalendarIcon, CreditCard } from "lucide-react";
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

  const { mutate: deleteExpense } = useDeleteExpenseMutation();

  const handleDeleteExpense = (expenseId: string | undefined) => {
    if (!expenseId) return;
    const isSettled = confirm(
      t("Are you sure you want to delete this expense?")
    );
    if (isSettled) {
      deleteExpense({ expenseId });
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingComponent className="max-h-60 h-60 w-full" size={25} />
      ) : expenses && expenses.length > 0 ? (
        <div className="flex flex-col gap-2 w-full">
          <div className="grid md:grid-cols-3 gap-2 sm:grid-cols-2 grid-cols-1">
            {expenses.map((expense) => {
              return (
                <ExpenseCard expense={expense}>
                  <div
                    dir={dir}
                    key={expense.id}
                    className={ny(
                      "p-4 border rounded-md grid items-start transition-all relative duration-1000 ease-in-out cursor-pointer group",
                      new Date(expense.createdAt).getDate() ===
                        new Date().getDate()
                        ? "w-full  bg-gradient-to-tr from-primary-500 to-primary-600 border-white"
                        : "bg-background"
                    )}
                  >
                    {expense?.description && (
                      <BellDot className="w-4 animate-bounce text-yellow-500 absolute -top-2 -right-2 transition-opacity ease-in-out opacity-100 group-hover:opacity-0" />
                    )}

                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 text-gray-500" />
                      <Typography
                        element="span"
                        as="smallText"
                        className="text-xs tracking-wider leading-none"
                        color="white"
                      >
                        {expense?.name}
                      </Typography>
                      <div className="gap-3 flex-1 items-end justify-end flex">
                        <div className="text-green-500 font-semibold tabular-nums">
                          {expense.amount} <sup className="text-lg">₪</sup>
                        </div>
                      </div>
                    </div>
                    <div className="gap-3 flex items-center">
                      <CalendarIcon className="h-4 w-4 text-gray-500" />
                      <span className="text-sm leading-none text-gray-500">
                        {format(
                          stringToDate(expense.createdAt),
                          "eeee, d-MM-y",
                          {
                            locale: lang === "ar" ? ar : enGB,
                          }
                        )}
                      </span>
                    </div>
                    <div className="justify-end flex items-center gap-2 mt-3">
                      <AddEditExpenseDialogDrawer expense={expense}>
                        <Button
                          size={"link"}
                          variant={"none"}
                          className="text-muted-foreground hover:underline font-normal"
                        >
                          Edit
                        </Button>
                      </AddEditExpenseDialogDrawer>
                      •
                      <Button
                        size={"link"}
                        variant={"none"}
                        className="text-muted-foreground hover:underline font-normal"
                        onClick={() => handleDeleteExpense(expense?.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </ExpenseCard>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-4 flex items-center justify-center">
          <div className="flex flex-col gap-2 items-center justify-center">
            <img
              src="/assets/noexpenses.png"
              alt="no data"
              className=" object-cover w-28"
            />
            <Typography
              element="span"
              className="text-2xl font-bold text-secondary-foreground"
            >
              {t("No expenses found")}
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpensesList;

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function ExpenseCard({
  children,
  expense,
}: {
  children?: React.ReactNode;
  expense: ExpenseType;
}) {
  return (
    <div className="max-w-md text-sm">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          {expense?.description && (
            <TooltipContent className="py-3 w-[320px] flex flex-col gap-1 items-start text-start justify-center">
              <Typography element="span" as="mutedText">
                Description
              </Typography>
              <Typography element="p" as="smallText" color="white">
                {expense?.description}
              </Typography>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
