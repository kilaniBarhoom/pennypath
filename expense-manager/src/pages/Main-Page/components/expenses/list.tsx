import ShekelIcon from "@/components/shared/icons/shekel-icon";
import LoadingComponent from "@/components/shared/Loading-component";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { BellDot } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDeleteExpenseMutation } from "../../api/expenses";
import AddEditExpenseDialogDrawer from "./add-edit-sheet";
import { format } from "date-fns";

const ExpensesList = ({
  expenses,
  isLoading,
}: {
  expenses: ExpenseType[];
  isLoading: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <>
      {isLoading ? (
        <LoadingComponent className="max-h-60 h-60 w-full" size={25} />
      ) : expenses && expenses.length > 0 ? (
        <div className="grid w-full gap-2 grid-flow-dense">
          <div className="flex items-center max-sm:text-sm justify-between gap-2 bg-primary p-4 text-white rounded-md">
            <span>{t("Name/Category/Date")}</span>
            <span>{t("Amount/Actions")}</span>
          </div>
          {expenses.map((expense) => {
            return <ExpenseCard key={expense?.id} expense={expense} />;
          })}
        </div>
      ) : (
        <div className="p-4 flex items-center justify-center">
          <div className="flex flex-col gap-2 items-center justify-center">
            <img
              src="/assets/noexpenses.png"
              alt="no data"
              className=" object-cover w-56"
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

export const ExpenseCard = ({
  expense,
  readonly,
}: {
  expense: ExpenseType;
  readonly?: boolean;
}) => {
  const { t, i18n } = useTranslation();
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
    <div
      key={expense.id}
      dir={dir}
      className="p-4 py-2 border rounded-sm w-full bg-secondary shadow-lg grid items-start transition-all relative duration-1000 ease-in-out cursor-pointer group"
    >
      {expense?.description && (
        <BellDot className="w-4 animate-bounce text-yellow-500 absolute -top-2 -right-2 transition-opacity ease-in-out opacity-100 group-hover:opacity-0" />
      )}

      <div className="flex items-center overflow-hidden text-ellipsis whitespace-nowrap">
        <Typography
          element="span"
          className="font-normal tracking-tight text-2xl"
          color="secondary"
        >
          {expense?.name}
        </Typography>
        <div className="gap-1 flex-1 items-end text-xl justify-end flex font-semibold text-red-400 tabular-nums">
          -{expense.amount}
          <sup>
            <ShekelIcon />
          </sup>
        </div>
      </div>
      <span className="leading-none text-muted-foreground">
        {expense.category.name}
      </span>
      <div className="justify-between flex items-center gap-2 mt-3">
        <span>{format(expense?.date, "eeee, dd/MM/yyyy")}</span>
        {!readonly && (
          <div className="flex items-center gap-2">
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
              size={"sm"}
              variant={"destructive"}
              className=" font-normal"
              onClick={() => handleDeleteExpense(expense?.id)}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
