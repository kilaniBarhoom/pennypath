import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "react-i18next";
import TableRows from "./rows";
import ExpensesTableSkeleton from "./skeleton";
import Typography from "@/components/ui/typography";

const ExpensesTable = ({
  expenses,
  isLoadingToFetchExpenses,
}: {
  expenses: ExpenseType[];
  isLoadingToFetchExpenses: boolean;
}) => {
  const { t } = useTranslation();
  const dummyArray = Array.from({ length: 5 });

  return (
    <Table className="min-w-max">
      <TableHeader>
        <TableRow>
          <TableHead>{t("Name")}</TableHead>
          <TableHead className="min-w-32 overflow-x-hidden">
            {t("Category")}
          </TableHead>
          <TableHead className="min-w-32 overflow-x-hidden">
            {t("Date")}
          </TableHead>
          <TableHead className="min-w-60 text-end overflow-x-hidden">
            {t("Amount")}
          </TableHead>
          <TableHead className="w-20">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoadingToFetchExpenses ? (
          dummyArray.map((_, index) => <ExpensesTableSkeleton key={index} />)
        ) : expenses && expenses.length > 0 ? (
          <TableRows expenses={expenses} />
        ) : (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center text-lg fond-bold py-5"
            >
              <div className="p-4 flex items-center justify-center">
                <div className="flex flex-col gap-2 items-center justify-center">
                  <img
                    src="/assets/noexpenses.png"
                    alt="no data"
                    className=" object-cover w-60"
                  />
                  <Typography
                    element="span"
                    className="text-4xl font-bold text-secondary-foreground drop-shadow-xl"
                  >
                    {t("No expenses found")}
                  </Typography>
                </div>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ExpensesTable;
