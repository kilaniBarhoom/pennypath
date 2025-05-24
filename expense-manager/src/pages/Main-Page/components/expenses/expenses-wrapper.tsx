import ShekelIcon from "@/components/shared/icons/shekel-icon";
import TablePagiation from "@/components/shared/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import { useSearchExpensesQuery } from "../../api/expenses";
import ExpensesFilters from "./filters";
import ExpensesTable from "./table";

export default function PaymentsWrapper() {
  const {
    data: searchExpensesResponse,
    isLoading: isLoadingToFetchExpensesData,
  } = useSearchExpensesQuery();

  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-10">
      {isLoadingToFetchExpensesData ? (
        <div className="grid gap-2 md:grid-cols-2 w-full">
          {/* skeletons */}
          <Skeleton className="h-32 grid gap-2 p-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-40" />
          </Skeleton>
          <Skeleton className="h-32 grid gap-2 p-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-40" />
          </Skeleton>
        </div>
      ) : (
        <div className="grid gap-2 md:grid-cols-2 w-full">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("Total Sum")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {searchExpensesResponse?.allTimeTotalValue ?? 0}
                <ShekelIcon className="ms-1" />
              </div>
              <p className="text-xs text-muted-foreground">
                {t("Total expenses")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("Filtered Sum")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {searchExpensesResponse?.filteredTotalValue ?? 0}
                <ShekelIcon className="ms-1" />
              </div>
              <p className="text-xs text-muted-foreground">
                {t("Based on current filters")}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
      <div className="flex flex-col gap-4">
        <ExpensesFilters />
        <ExpensesTable
          expenses={searchExpensesResponse?.expenses ?? []}
          isLoadingToFetchExpenses={isLoadingToFetchExpensesData}
        />
        <div className="flex items-center w-full border rounded-sm py-2 bg-secondary/50">
          <TablePagiation
            totalPages={searchExpensesResponse?.totalPages ?? 1}
          />
        </div>
      </div>
    </section>
  );
}
