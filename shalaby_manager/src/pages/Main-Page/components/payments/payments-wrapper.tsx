import LocalSearchBar from "@/components/shared/loacal-search";
import PaymentsFilters from "./filters";
import TablePagiation from "@/components/shared/pagination";
import PaymentsList from "./list";
import { useSearchPaymentsQuery } from "../../api/payments";
import Typography from "@/components/ui/typography";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

export default function PaymentsWrapper() {
  const {
    data: searchPaymentsResponse,
    isLoading: isLoadingToFetchPaymentsData,
  } = useSearchPaymentsQuery();

  const { t } = useTranslation();

  return (
    <div className="border flex flex-col gap-2 p-4 rounded-xl">
      <div className="border rounded-md w-full p-4 flex items-center justify-center gap-2">
        <Typography element="span" as="p">
          {t("All time total amount")}:
        </Typography>
        <Badge size={"lg"}>
          {searchPaymentsResponse?.allTimeTotalValue ?? 0}{" "}
          <sup className="text-lg">₪</sup>
        </Badge>
      </div>
      <div className="flex items-center justify-between gap-2">
        <LocalSearchBar route="/payments" placeholder="Search for a payment" />
        <div className="flex gap-2 items-center">
          <PaymentsFilters />
        </div>
      </div>
      <PaymentsList
        payments={searchPaymentsResponse?.payments ?? []}
        isLoading={isLoadingToFetchPaymentsData}
      />
      <div className="flex items-center w-full border rounded-md py-2 bg-secondary/50">
        <TablePagiation totalPages={searchPaymentsResponse?.totalPages ?? 1} />
      </div>
    </div>
  );
}
