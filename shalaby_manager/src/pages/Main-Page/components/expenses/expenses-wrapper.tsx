import LocalSearchBar from "@/components/shared/loacal-search";
import TablePagiation from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { useTranslation } from "react-i18next";
import { useSearchExpensesQuery } from "../../api/expenses";
import ExpensesList from "./list";

export default function PaymentsWrapper() {
  const {
    data: searchExpensesResponse,
    isLoading: isLoadingToFetchExpensesData,
  } = useSearchExpensesQuery();

  const { t } = useTranslation();

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
          <Badge size={"lg"}>
            {searchExpensesResponse?.allTimeTotalValue ?? 0}
            <sup className="text-lg">₪</sup>
          </Badge>
        </div>
        <div className="shadow-md flex-col justify-center items-center bg-red-500/70 border rounded-md flex-1 w-full p-4 flex gap-2">
          <Typography
            element="span"
            className="md:text-lg text-sm font-semibold"
            color="white"
          >
            {t("Most Spent In A Day")}
          </Typography>
          <Badge size={"lg"} className="animate-pulse">
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
              {t("Week Total")}:&nbsp;
            </Typography>
            <Badge size={"sm"}>
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
              {t("Month Total")}:&nbsp;
            </Typography>
            <Badge size={"sm"}>
              {searchExpensesResponse?.monthTotal ?? 0}
              <sup className="text-lg">₪</sup>
            </Badge>
          </div>
        </div>
      </div>
      <div className="border flex flex-col gap-4 p-4 rounded-xl">
        <div className=" md:w-fit w-full ">
          <LocalSearchBar
            route="/expenses"
            placeholder="Search for an expense"
            otherClasses="md:w-fit w-full"
          />
          {/* <div className="flex gap-2 items-center">
          <PaymentsFilters />
        </div> */}
        </div>
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
