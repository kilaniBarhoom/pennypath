import ShekelIcon from "@/components/shared/icons/shekel-icon";
import TablePagiation from "@/components/shared/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <>
      <div className="flex flex-col gap-2 rounded-sm">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("Total Sum")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <ShekelIcon />
                {searchExpensesResponse?.allTimeTotalValue ?? 0}
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
                <ShekelIcon />
                {searchExpensesResponse?.filteredTotalValue ?? 0}
              </div>
              <p className="text-xs text-muted-foreground">
                {t("Based on current filters")}
              </p>
            </CardContent>
          </Card>
        </div>
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
    </>
  );
}
