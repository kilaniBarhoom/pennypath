import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "react-i18next";
import TableRows from "./rows";
import PaymentsTableSkeleton from "./payments-table-skeleton";
import Typography from "@/components/ui/typography";
import { Banknote, Calendar, ChartBarStacked } from "lucide-react";
import AuthorizedRender from "@/components/shared/authorized-conditional-render";

const PaymentsTable = ({
  payments,
  isLoadingToFetchPayments,
}: {
  payments: PaymentType[];
  isLoadingToFetchPayments: boolean;
}) => {
  const { t } = useTranslation();
  const dummyArray = Array.from({ length: 5 });

  return (
    <Table className="min-w-max">
      <TableHeader>
        <TableRow>
          <AuthorizedRender authorizedRoles={["admin", "superadmin"]}>
            <TableHead>{t("User")}</TableHead>
          </AuthorizedRender>
          <TableHead className="min-w-32 overflow-x-hidden">
            <span className="flex items-center gap-1">
              <Calendar size={20} className="text-white" />
              {t("Date")}
            </span>
          </TableHead>

          <TableHead className="min-w-32 overflow-x-hidden">
            <span className="flex items-center gap-1">
              <ChartBarStacked size={20} className="text-white" />
              {t("Type")}
            </span>
          </TableHead>
          <TableHead className="min-w-32 overflow-x-hidden">
            <span className="flex items-center gap-1 justify-center">
              <Banknote size={20} className="text-white" />
              {t("Amount")}
            </span>
          </TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoadingToFetchPayments ? (
          dummyArray.map((_, index) => <PaymentsTableSkeleton key={index} />)
        ) : payments && payments.length > 0 ? (
          <TableRows payments={payments} />
        ) : (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center text-lg fond-bold py-5"
            >
              <div className="p-4 flex items-center justify-center">
                <div className="flex flex-col gap-2 items-center justify-center">
                  <img
                    src="/assets/noexpenses.png"
                    alt="no data"
                    className=" object-cover w-32 md:w-60"
                  />
                  <Typography
                    element="span"
                    className="text-xl md:text-4xl tracking-wide text-secondary-foreground drop-shadow-xl"
                  >
                    {t("No payments found")}
                  </Typography>
                </div>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PaymentsTable;
