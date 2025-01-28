import ShekelIcon from "@/components/shared/icons/shekel-icon";
import { TableCell, TableRow } from "@/components/ui/table";
// import ActionsDropDown from "./actions-dropdown";
import { Button } from "@/components/ui/button";
import { useDeleteExpenseMutation } from "@/pages/Main-Page/api/expenses";
import { format } from "date-fns";
import { t } from "i18next";
import AddEditExpenseSheetDrawer from "../add-edit-sheet-drawer";
// import ActionsDrawer from "./actions-drawer";
const TableRows = ({ expenses }: { expenses: ExpenseType[] }) => {
  const { mutate: deletePayment } = useDeleteExpenseMutation();

  const handleDeletePayment = (expenseId: string) => {
    const isSettled = confirm("Are you sure you want to delete this expense?");
    if (isSettled) {
      deletePayment({ expenseId });
    }
  };
  return (
    <>
      {expenses.map((expense) => (
        <TableRow
          key={expense.id}
          className="cursor-pointer even:bg-secondary/50"
        >
          <TableCell className=" min-w-72 overflow-x-auto max-w-80 whitespace-nowrap text-ellipsis text-lg">
            {expense.name}
          </TableCell>
          <TableCell className=" max-w-20 overflow-x-hidden text-lg">
            {expense.category.name}
          </TableCell>
          <TableCell className=" min-w-40 overflow-x-hidden text-lg">
            {format(new Date(expense.date), "eee, dd/MM/yyyy")}
          </TableCell>
          <TableCell className="font-medium  max-w-20 overflow-x-hidden text-lg text-center">
            <span className="bg-red-100 text-red-800 font-medium px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">
              -{expense.amount}
              <ShekelIcon className="text-xl ms-1" />
            </span>
          </TableCell>
          <TableCell>
            <div className="justify-end flex items-center gap-2">
              <AddEditExpenseSheetDrawer expense={expense}>
                <Button
                  size={"link"}
                  variant={"none"}
                  className="text-muted-foreground hover:underline font-normal"
                >
                  {t("Edit")}
                </Button>
              </AddEditExpenseSheetDrawer>
              •
              <Button
                size={"sm"}
                variant={"destructive"}
                className=" font-normal"
                onClick={() => handleDeletePayment(expense?.id)}
              >
                {t("Delete")}
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default TableRows;
