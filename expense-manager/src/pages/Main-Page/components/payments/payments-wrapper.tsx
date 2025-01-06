import LocalSearchBar from "@/components/shared/loacal-search";
import TablePagiation from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { useTranslation } from "react-i18next";
import { useSearchPaymentsQuery } from "../../api/payments";
import PaymentsList from "./list";

export default function PaymentsWrapper() {
  const {
    data: searchPaymentsResponse,
    isLoading: isLoadingToFetchPaymentsData,
  } = useSearchPaymentsQuery();

  const { t } = useTranslation();

  return (
    <div className="border flex flex-col gap-2 p-4 rounded-sm">
      <div className="shadow-md bg-blue-500 rounded-sm w-full p-4 flex items-center justify-center gap-2">
        <Typography element="span" as="largeText" color="white">
          {t("All time total amount")}:
        </Typography>
        <Badge size={"lg"}>
          {searchPaymentsResponse?.allTimeTotalValue ?? 0}{" "}
          <sup className="text-lg">₪</sup>
        </Badge>
      </div>
      <div className="md:w-fit w-full">
        <LocalSearchBar
          route="/payments"
          placeholder="Search for a payment"
          otherClasses="md:w-fit w-full"
        />
        {/* <div className="flex gap-2 items-center">
          <PaymentsFilters />
        </div> */}
      </div>
      <PaymentsList
        payments={searchPaymentsResponse?.payments ?? []}
        isLoading={isLoadingToFetchPaymentsData}
      />
      <div className="flex items-center w-full border rounded-sm py-2 bg-secondary/50">
        <TablePagiation totalPages={searchPaymentsResponse?.totalPages ?? 1} />
      </div>
    </div>
  );
}
