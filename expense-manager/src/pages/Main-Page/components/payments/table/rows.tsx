import ShekelIcon from "@/components/shared/icons/shekel-icon";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { ny } from "@/lib/utils";
// import ActionsDropDown from "./actions-dropdown";
import { Button } from "@/components/ui/button";
import { useDeletePaymentMutation } from "@/pages/Main-Page/api/payments";
import { format } from "date-fns";
import { t } from "i18next";
import AddEditPaymentSheetDrawer from "../add-edit-sheet-drawer";
import AuthorizedRender from "@/components/shared/authorized-conditional-render";
// import ActionsDrawer from "./actions-drawer";
const TableRows = ({ payments }: { payments: PaymentType[] }) => {
  const { mutate: deletePayment } = useDeletePaymentMutation();

  const handleDeletePayment = (paymentId: string) => {
    const isSettled = confirm("Are you sure you want to delete this payment?");
    if (isSettled) {
      deletePayment({ paymentId });
    }
  };
  return (
    <>
      {payments.map((payment) => (
        <TableRow
          key={payment.id}
          className="cursor-pointer even:bg-secondary/50"
        >
          <AuthorizedRender authorizedRoles={["admin", "superadmin"]}>
            <TableCell className="font-medium  min-w-40 overflow-x-hidden text-lg">
              {payment.user?.fullNameEnglish}
            </TableCell>
          </AuthorizedRender>
          <TableCell className="font-medium  max-w-20 overflow-x-hidden text-lg">
            {format(new Date(payment.date), "dd/MM/yyyy")}
          </TableCell>
          <TableCell className="font-medium  max-w-20 overflow-x-hidden text-lg">
            <Badge
              size={"sm"}
              variant={"leftBordered"}
              className={ny("text-sm", {
                "border-green-400 text-secondary-foreground":
                  payment?.type === "full",
                "border-orange-400 text-secondary-foreground":
                  payment?.type === "advance",
              })}
            >
              {t(payment?.type)}
            </Badge>
          </TableCell>{" "}
          <TableCell className="font-medium  max-w-20 overflow-x-hidden text-lg text-center">
            <span className="bg-green-100 text-green-800 font-medium px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">
              +{payment.amount}
              <ShekelIcon className="text-xl ms-1" />
            </span>
          </TableCell>
          <TableCell>
            <div className="justify-end flex items-center gap-2">
              <AddEditPaymentSheetDrawer payment={payment}>
                <Button
                  size={"link"}
                  variant={"none"}
                  className="text-muted-foreground hover:underline font-normal"
                >
                  {t("Edit")}
                </Button>
              </AddEditPaymentSheetDrawer>
              •
              <Button
                size={"sm"}
                variant={"destructive"}
                className=" font-normal"
                onClick={() => handleDeletePayment(payment?.id)}
              >
                {t("Delete")}
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default TableRows;
