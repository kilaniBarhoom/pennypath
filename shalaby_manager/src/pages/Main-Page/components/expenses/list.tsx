import LoadingComponent from "@/components/shared/Loading-component";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { dateToString, stringToDate } from "@/lib/utils";
import { format } from "date-fns";
import { ar, enGB } from "date-fns/locale";
import { CalendarIcon, CreditCard, Pin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDeleteExpenseMutation } from "../../api/expenses";
import AddEditExpenseDialogDrawer from "./add-edit-dialog-drawer";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

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

  let todaysExpense: ExpenseType | undefined;

  if (!isLoading && expenses?.length > 0) {
    todaysExpense = expenses?.find((expense) => {
      return (
        dateToString(new Date(expense?.createdAt)) === dateToString(new Date())
      );
    });
  }

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
          <div
            dir={dir}
            key={todaysExpense?.id}
            className="px-4 py-7 w-full border bg-gradient-to-tr from-blue-900 to bg-purple-400 rounded-md grid items-start transition-all duration-200 ease-in-out cursor-pointer relative"
          >
            <div className="absolute bottom-2 right-2 flex items-center gap-2">
              <AddEditExpenseDialogDrawer expense={todaysExpense}>
                <Button
                  size={"link"}
                  variant={"none"}
                  className="text-white hover:underline font-normal"
                >
                  Edit
                </Button>
              </AddEditExpenseDialogDrawer>
              •
              <Button
                size={"link"}
                variant={"none"}
                className="text-white hover:underline font-normal"
                onClick={() => handleDeleteExpense(todaysExpense?.id)}
              >
                Delete
              </Button>
            </div>
            <Pin className="absolute top-2 left-2 h-6 w-6 text-white -rotate-45" />
            <div className="flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-white" />
              <Typography
                element="span"
                as="h6"
                className="md:text-xl text-base tracking-wider"
                color="white"
              >
                {todaysExpense?.name}
              </Typography>
              <div className="gap-1 flex-1 items-end justify-end flex">
                <div className="border rounded-md p-2 text-lg tabular-nums">
                  {todaysExpense?.amount} <sup className="text-lg">₪</sup>
                </div>
              </div>
            </div>
            <div className="gap-1 flex items-center text-white">
              <CalendarIcon className="mr-1 h-4 w-4" />
              <span className="text-sm">
                {format(
                  stringToDate(todaysExpense?.createdAt),
                  "eeee, d-MM-y",
                  {
                    locale: lang === "ar" ? ar : enGB,
                  }
                )}
              </span>
            </div>

            <Typography element="p" as={"mutedText"}>
              {todaysExpense?.description}
            </Typography>
          </div>
          <div className="grid md:grid-cols-3 gap-2 sm:grid-cols-2 grid-cols-1">
            {expenses.map((expense) => {
              if (
                dateToString(new Date(expense?.createdAt)) ===
                dateToString(new Date())
              )
                return;
              return (
                <div
                  dir={dir}
                  key={expense.id}
                  className="p-4 pb-8 border bg-background rounded-md grid items-start hover:bg-secondary/40 transition-all relative duration-200 ease-in-out cursor-pointer"
                >
                  <div className="absolute bottom-2 right-2 flex items-center gap-2">
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
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-6 w-6 text-gray-500" />
                    <Typography
                      element="span"
                      as="h6"
                      className="md:text-xl text-base tracking-wider"
                    >
                      {expense?.name}
                    </Typography>
                    <div className="gap-1 flex-1 items-end justify-end flex">
                      <div className="border rounded-md p-2 tabular-nums">
                        {expense.amount} <sup className="text-lg">₪</sup>
                      </div>
                    </div>
                  </div>
                  <div className="gap-1 flex items-center">
                    <CalendarIcon className="mr-1 h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">
                      {format(stringToDate(expense.createdAt), "eeee, d-MM-y", {
                        locale: lang === "ar" ? ar : enGB,
                      })}
                    </span>
                  </div>
                  {expense?.description && (
                    <div className="gap-1 flex items-center">
                      <ChatBubbleIcon className="mr-1 h-4 w-4 text-gray-500" />
                      <Typography
                        element="p"
                        as={"smallText"}
                        className="text-muted-foreground"
                      >
                        {expense?.description}
                      </Typography>
                    </div>
                  )}
                </div>
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
    </>
  );
};

export default ExpensesList;
