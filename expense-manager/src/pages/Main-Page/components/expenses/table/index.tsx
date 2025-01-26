import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Typography from "@/components/ui/typography";
import { Banknote, Calendar, ChartBarStacked, Notebook } from "lucide-react";
import { useTranslation } from "react-i18next";
import TableRows from "./rows";
import ExpensesTableSkeleton from "./skeleton";

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
          <TableHead>
            <span className="flex items-center gap-1">
              <Notebook size={20} className="text-secondary-foreground" />
              {t("Name")}
            </span>
          </TableHead>
          <TableHead className="min-w-32 overflow-x-hidden">
            <span className="flex items-center gap-1">
              <ChartBarStacked
                size={20}
                className="text-secondary-foreground"
              />
              {t("Category")}
            </span>
          </TableHead>
          <TableHead className="min-w-32 overflow-x-hidden">
            <span className="flex items-center gap-1">
              <Calendar size={20} className="text-secondary-foreground" />
              {t("Date")}
            </span>
          </TableHead>
          <TableHead className="min-w-60 overflow-x-hidden">
            <span className="flex items-center gap-1 justify-center">
              <Banknote size={20} className="text-secondary-foreground" />
              {t("Amount")}
            </span>
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
