import TablePagiation from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useSearchExpensesQuery } from "../../api/expenses";
import ExpensesFilters from "./filters";
import ExpensesList from "./list";

export default function PaymentsWrapper() {
  const {
    data: searchExpensesResponse,
    isLoading: isLoadingToFetchExpensesData,
  } = useSearchExpensesQuery();

  const { t } = useTranslation();

  const [_, setSearchParams] = useSearchParams();

  const setSearchAmount = (amount: string) => {
    setSearchParams((prev) => {
      prev.delete("amount");
      if (amount) {
        prev.set("amount", amount);
      }
      return prev;
    });
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-col bg-background border rounded-md p-4 items-center w-full justify-center gap-2">
          <Typography
            element="span"
            className="md:text-lg text-sm font-semibold"
            color="white"
          >
            {t("All time total")}
          </Typography>
          <Badge size={"lg"} className="gap-1">
            {searchExpensesResponse?.allTimeTotalValue ?? 0}
            <sup className="text-lg">₪</sup>
          </Badge>
        </div>
        <div
          onClick={() =>
            setSearchAmount(String(searchExpensesResponse?.mostSpentInADay))
          }
          className="shadow-md flex-col justify-center items-center bg-red-600 cursor-pointer border rounded-md flex-1 w-full p-4 flex gap-2"
        >
          <Typography
            element="span"
            className="md:text-lg text-sm font-semibold"
            color="white"
          >
            {t("Most Spent In A Day")}
          </Typography>
          <Badge size={"lg"} className="animate-pulse gap-1">
            {searchExpensesResponse?.mostSpentInADay ?? 0}
            <sup className="text-lg">₪</sup>
          </Badge>
        </div>
        <div className="shadow-md flex-col justify-center items-center bg-background border rounded-md flex-1 w-full p-4 flex gap-2">
          <div className="flex items-center gap-2">
            <Typography
              element="span"
              className="md:text-lg text-sm font-semibold"
              color="white"
            >
              {t("Week T")}:&nbsp;
            </Typography>
            <Badge size={"sm"} className="gap-1">
              {searchExpensesResponse?.weekTotal ?? 0}
              <sup className="text-lg">₪</sup>
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Typography
              element="span"
              className="md:text-lg text-sm font-semibold"
              color="white"
            >
              {t("Month T")}:&nbsp;
            </Typography>
            <Badge size={"sm"} className="gap-1">
              {searchExpensesResponse?.monthTotal ?? 0}
              <sup className="text-lg">₪</sup>
            </Badge>
          </div>
        </div>
      </div>
      <div className="border flex flex-col gap-4 p-4 rounded-xl">
        <ExpensesFilters />
        <ExpensesList
          expenses={searchExpensesResponse?.expenses ?? []}
          isLoading={isLoadingToFetchExpensesData}
        />
        <div className="flex items-center w-full border rounded-md py-2 bg-secondary/50">
          <TablePagiation
            totalPages={searchExpensesResponse?.totalPages ?? 1}
          />
        </div>
      </div>
    </>
  );
}
