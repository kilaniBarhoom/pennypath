import ShekelIcon from "@/components/shared/icons/shekel-icon";
import LocalSearchBar from "@/components/shared/loacal-search";
import TablePagiation from "@/components/shared/pagination";
import Typography from "@/components/ui/typography";
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
          <div className="shadow-md bg-blue-500 rounded-sm w-full p-4 flex items-center justify-center gap-2">
            <Typography element="span" as="h4" color="white">
              {t("Sum of all payments for")} (
              {language === "ar"
                ? searchPaymentsResponse?.payments?.[0].user?.fullNameArabic
                : searchPaymentsResponse?.payments?.[0].user?.fullNameEnglish}
              ):
            </Typography>

            <span className="bg-green-100 text-green-800 flex items-center gap-2 text-2xl font-medium px-3 py-1 rounded dark:bg-green-900 dark:text-green-300">
              <ShekelIcon />
              {searchPaymentsResponse?.allTimeTotalValue ?? 0}
            </span>
          </div>
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
