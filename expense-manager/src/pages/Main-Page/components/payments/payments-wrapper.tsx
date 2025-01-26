import ShekelIcon from "@/components/shared/icons/shekel-icon";
import LocalSearchBar from "@/components/shared/loacal-search";
import TablePagiation from "@/components/shared/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useSearchPaymentsQuery } from "../../api/payments";
import PaymentsTable from "./table";

export default function PaymentsWrapper() {
  const {
    data: searchPaymentsResponse,
    isLoading: isLoadingToFetchPaymentsData,
  } = useSearchPaymentsQuery();

  const { t, i18n } = useTranslation();
  const language = i18n.language;
  return (
    <div className="flex flex-col gap-2">
      {searchPaymentsResponse?.payments &&
        searchPaymentsResponse?.payments.length > 0 && (
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("Sum of all payments for")} (
                {language === "ar"
                  ? searchPaymentsResponse?.payments?.[0].user?.fullNameArabic
                  : searchPaymentsResponse?.payments?.[0].user?.fullNameEnglish}
                )
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {searchPaymentsResponse?.allTimeTotalValue ?? 0}
                <ShekelIcon className="ms-1" />
              </div>
              <p className="text-xs text-muted-foreground">
                {t("Total payments")}
              </p>
            </CardContent>
          </Card>
        )}
      <div className="border flex flex-col gap-2 p-4 rounded-sm">
        <div className="w-full md:w-fit mb-2">
          <LocalSearchBar
            route="/payments"
            placeholder="Search for a payment"
            otherClasses="md:w-fit w-full"
          />
        </div>
        <PaymentsTable
          payments={searchPaymentsResponse?.payments ?? []}
          isLoadingToFetchPayments={isLoadingToFetchPaymentsData}
        />
        <div className="flex items-center w-full border rounded-sm py-2 bg-secondary/50">
          <TablePagiation
            totalPages={searchPaymentsResponse?.totalPages ?? 1}
          />
        </div>
      </div>
    </div>
  );
}
