import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Typography from "@/components/ui/typography";
import { ny, stringToDate } from "@/lib/utils";
import { format } from "date-fns";
import { ar, enGB } from "date-fns/locale";
import { CalendarIcon, CreditCard, Pen, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDeletePaymentMutation } from "../../api/payments";
import AddEditPaymentDialogDrawer from "./add-edit-dialog-drawer";

const PaymentsList = ({
  payments,
  isLoading,
}: {
  payments: PaymentType[];
  isLoading: boolean;
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const dir = i18n.dir();
  const dummyArray = Array.from({ length: 3 });

  const { mutate: deletePayment } = useDeletePaymentMutation();

  const handleDeletePayment = (paymentId: string) => {
    const isSettled = confirm(
      t("Are you sure you want to delete this payment?")
    );
    if (isSettled) {
      deletePayment({ paymentId });
    }
  };

  return (
    <ScrollArea className="flex flex-col divide-y border border-t-0 rounded-sm max-h-80">
      {isLoading ? (
        dummyArray.map((_, index) => (
          <Skeleton key={index} className="h-20 mt-2 first:mt-0" />
        ))
      ) : payments && payments.length > 0 ? (
        payments.map((payment) => (
          <div
            dir={dir}
            key={payment.id}
            className="p-4 flex flex-wrap gap-4 items-center justify-between last:border-b-0 border-b hover:bg-secondary/40 transition-all duration-200 ease-in-out cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-secondary border p-2">
                <CreditCard className="h-6 w-6 text-gray-500" />
              </div>
              <div className="flex flex-col gap-2">
                <Typography
                  element="span"
                  className="scroll-m-20 font-semibold tracking-tight text-xl"
                >
                  {lang === "ar"
                    ? payment?.user?.fullNameArabic
                    : payment?.user?.fullNameEnglish}
                </Typography>
                <div className="gap-1 flex items-center">
                  <CalendarIcon className="mr-1 h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    {format(stringToDate(payment.date), "eeee, d-MM-y", {
                      locale: lang === "ar" ? ar : enGB,
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex md:w-fit w-full md:justify-normal justify-between items-center gap-2 h-10">
              <div className="text-center items-center flex gap-4">
                <Badge size={"lg"} className="text-xl">
                  {payment.amount} <sup className="text-lg">₪</sup>
                </Badge>
                <Badge
                  size={"lg"}
                  variant={"leftBordered"}
                  className={ny("text-xl", {
                    "border-green-400 text-white": payment?.type === "full",
                    "border-orange-400 text-white": payment?.type === "advance",
                  })}
                >
                  {t(payment?.type)}
                </Badge>
              </div>
              <Separator orientation="vertical" />
              <div className="flex items-center gap-2">
                <AddEditPaymentDialogDrawer payment={payment}>
                  <Button variant={"secondary"} size={"icon"}>
                    <Pen />
                  </Button>
                </AddEditPaymentDialogDrawer>
                <Button
                  onClick={() => handleDeletePayment(payment?.id)}
                  variant={"destructive"}
                  size={"icon"}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 flex items-center justify-center">
          <div className="flex flex-col gap-2 items-center justify-center">
            <img
              src="/assets/noexpenses.png"
              alt="no data"
              className=" object-cover w-60"
            />
            <Typography
              element="span"
              className="text-4xl font-bold text-secondary-foreground drop-shadow-xl"
            >
              {t("No payments found")}
            </Typography>
          </div>
        </div>
      )}
    </ScrollArea>
  );
};

export default PaymentsList;
