import TablePagiation from "@/components/shared/pagination";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Typography from "@/components/ui/typography";
import { ChartBar, ChartColumnBig, ChartSpline } from "lucide-react";
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
      {isLoadingToFetchExpensesData ? (
        <Skeleton className="w-full h-40" />
      ) : (
        <div className="flex flex-col border rounded-sm items-start bg-background p-4 gap-2 w-full">
          <div className="flex items-center gap-2">
            <ChartBar className="w-10 h-10 border border-white rounded-full p-2 bg-green-500 text-black" />
            <Typography
              element="h2"
              className="md:text-3xl text-lg font-normal text-white"
            >
              {t("Stats")}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <ChartColumnBig className="w-5 h-5 text-muted-foreground" />
            <div className="flex items-center gap-1">
              <span className="flex items-center">
                <span>₪</span>
                {searchExpensesResponse?.allTimeTotalValue ?? 0}
              </span>
              <Typography
                element="span"
                className="tracking-tight leading-none text-sm font-normal text-muted-foreground"
              >
                {t("All time total")}
              </Typography>
            </div>
          </div>
          <div className="flex-1 flex gap-2 items-center">
            <ChartSpline className="w-5 h-5 text-muted-foreground" />
            <div className="flex items-center gap-1">
              <span className="animate-pulse text-base text-red-500 flex items-center">
                <span>₪</span>
                {searchExpensesResponse?.mostSpentInADay ?? 0}
              </span>
              <Typography
                onClick={() =>
                  setSearchAmount(
                    String(searchExpensesResponse?.mostSpentInADay)
                  )
                }
                element="span"
                className="tracking-tight hover:underline hover:text-white transition-all duration-200 ease-in-out cursor-pointer leading-none text-sm font-normal text-muted-foreground"
              >
                {t("Most Spent In A Day")}
              </Typography>
            </div>
          </div>
          <Separator />
          <div className="flex items-center lg:justify-normal justify-between gap-4 flex-wrap w-full">
            <div className="flex items-center gap-2">
              <svg
                width="8"
                height="8"
                fill="currentColor"
                viewBox="0 0 8 8"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 text-blue-500"
                aria-hidden="true"
              >
                <circle cx="4" cy="4" r="4"></circle>
              </svg>
              <div className="flex items-center gap-1">
                <span className="flex items-center">
                  <span>₪</span>
                  {searchExpensesResponse?.weekTotal ?? 0}
                </span>
                <Typography
                  element="span"
                  className="tracking-tight leading-none text-sm font-normal text-muted-foreground"
                >
                  {t("Week Total")}
                </Typography>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <svg
                width="8"
                height="8"
                fill="currentColor"
                viewBox="0 0 8 8"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 text-orange-500"
                aria-hidden="true"
              >
                <circle cx="4" cy="4" r="4"></circle>
              </svg>
              <div className="flex items-center gap-1">
                <span className="flex items-center">
                  <span>₪</span>
                  {searchExpensesResponse?.monthTotal ?? 0}
                </span>
                <Typography
                  element="span"
                  className="tracking-tight leading-none text-sm font-normal text-muted-foreground"
                >
                  {t("Month Total")}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="border flex flex-col gap-4 p-4 rounded-sm">
        <ExpensesFilters />
        <ExpensesList
          expenses={searchExpensesResponse?.expenses ?? []}
          isLoading={isLoadingToFetchExpensesData}
        />
        <div className="flex items-center w-full border rounded-sm py-2 bg-secondary/50">
          <TablePagiation
            totalPages={searchExpensesResponse?.totalPages ?? 1}
          />
        </div>
      </div>
    </>
  );
}
