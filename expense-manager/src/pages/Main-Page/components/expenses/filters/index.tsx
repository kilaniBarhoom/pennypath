import LocalSearchBar from "@/components/shared/loacal-search";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useTranslation } from "react-i18next";

const ExpensesFilters = ({
  totalExpenses,
  currentPageExpenseCount,
}: {
  totalExpenses?: number;
  currentPageExpenseCount?: number;
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex items-center justify-between max-sm:flex-col gap-2 mb-2">
        <div className="max-sm:w-full">
          <LocalSearchBar
            route="/expenses"
            placeholder="Search for an expense"
            otherClasses=" md:w-fit w-full"
          />
        </div>
        <Button
          Icon={Filter}
          variant={"outline"}
          className="text-lg py-5 max-sm:w-full"
        >
          {t("Filters")}
        </Button>
      </div>{" "}
      <div className="bg-muted text-muted-foreground text-center p-4 border rounded-sm w-full">
        <span className="md:text-2xl text-lg">
          Showing {currentPageExpenseCount ?? 0} of {totalExpenses ?? 0}{" "}
          expenses
        </span>
      </div>
    </div>
  );
};

export default ExpensesFilters;
