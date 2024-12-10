import LoadingComponent from "@/components/shared/Loading-component";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { ny, stringToDate } from "@/lib/utils";
import { format } from "date-fns";
import { ar, enGB } from "date-fns/locale";
import { BellDot, CalendarIcon, CreditCard } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDeleteExpenseMutation } from "../../api/expenses";
import AddEditExpenseDialogDrawer from "./add-edit-sheet";

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
        <div className="grid md:grid-cols-3 w-full gap-2 sm:grid-cols-2 grid-cols-1 grid-flow-dense">
          {expenses.map((expense) => {
            return (
              <ExpenseCard expense={expense} key={expense.id}>
                <div
                  dir={dir}
                  className={ny(
                    "p-4 border rounded-sm w-full grid items-start transition-all relative duration-1000 ease-in-out cursor-pointer group",
                    new Date(expense.createdAt).getDate() ===
                      new Date().getDate()
                      ? "bg-gradient-to-tr from-primary-500 to-primary-600 border-white"
                      : "bg-background"
                  )}
                >
                  {expense?.description && (
                    <BellDot className="w-4 animate-bounce text-yellow-500 absolute -top-2 -right-2 transition-opacity ease-in-out opacity-100 group-hover:opacity-0" />
                  )}

                  <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
                    <CreditCard className="min-w-4 min-h-4 h-4 w-4 text-gray-500" />
                    <Typography
                      element="span"
                      as="smallText"
                      className="text-xs overflow-hidden text-ellipsis whitespace-nowrap tracking-wider leading-none"
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
                  <div className="gap-2 flex items-center">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm leading-none text-gray-500">
                      {format(stringToDate(expense.createdAt), "eeee, d-MM-y", {
                        locale: lang === "ar" ? ar : enGB,
                      })}
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
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
    <div>
      <div className="md:flex hidden">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            {(expense?.description ||
              (expense?.categories && expense?.categories.length > 0)) && (
              <TooltipContent
                align="start"
                className="py-3 w-[200px] border flex flex-col gap-2 items-start text-start justify-center"
              >
                <Content expense={expense} />
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="md:hidden flex">
        <Popover>
          <PopoverTrigger asChild>{children}</PopoverTrigger>
          <PopoverContent
            align="start"
            side="top"
            className="py-3 w-[200px] border flex flex-col gap-2 items-start text-start justify-center"
          >
            <Content expense={expense} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

const Content = ({ expense }: { expense: ExpenseType }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  return (
    <div className="flex flex-col gap-3 items-start w-full text-start justify-start">
      <div className="gap-1 flex items-center">
        <CalendarIcon className="h-3 w-3 text-white" />
        <span className="text-xs leading-none text-white">
          {format(stringToDate(expense.createdAt), "eeee, d-MM-y", {
            locale: lang === "ar" ? ar : enGB,
          })}
        </span>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="text-muted-foreground text-xs leading-none">Name</span>
        <Typography
          element="p"
          className="text-xs text-wrap tracking-wide"
          color="white"
        >
          {expense?.name}
        </Typography>
      </div>
      {expense?.description && (
        <div className="flex flex-col">
          <span className="text-muted-foreground text-xs leading-none">
            Description
          </span>
          <Typography
            element="p"
            className="text-xs tracking-wide"
            color="white"
          >
            {expense?.description}
          </Typography>
        </div>
      )}
      <Separator />
      {expense?.categories && expense?.categories?.length > 0 && (
        <div className="flex flex-col w-full ">
          <span className="text-muted-foreground text-xs leading-none">
            Categories
          </span>
          {expense?.categories.map((category, ind: number) => (
            <div
              key={category.name}
              className="flex w-full text-white gap-2 items-center md:text-base text-xs"
            >
              <div className="flex items-center gap-2">
                <svg
                  width="8"
                  height="8"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`shrink-0 text-${
                    ind % 2 === 0 ? "rose" : "blue"
                  }-500`}
                  aria-hidden="true"
                >
                  <circle cx="4" cy="4" r="4"></circle>
                </svg>
              </div>
              {category?.name}
              <span className="flex ml-auto md:text-base text-xs">
                <span>₪{category?.amount}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
