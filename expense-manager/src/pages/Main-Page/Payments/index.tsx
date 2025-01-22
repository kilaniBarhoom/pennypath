import BreadcrumbComponent from "@/components/shared/bread-crumb";
import { Button } from "@/components/ui/button";
import { dateToString } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import AddEditPaymentDialogDrawer from "../components/payments/add-edit-dialog-drawer";
import PaymentsWrapper from "../components/payments/payments-wrapper";

const Payments = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const from = searchParams.get("from") || dateToString(new Date());

  const setFromDate = (from: string) => {
    setSearchParams((prev) => {
      prev.delete("from");
      if (from) {
        prev.set("from", from);
      }
      return prev;
    });
  };

  useEffect(() => {
    if (
      !searchParams.get("from") ||
      searchParams.get("from") === "" ||
      searchParams.get("from") === "1970-01-01"
    ) {
      setFromDate(dateToString(new Date()));
    }
  }, [from]);

  return (
    <div className="flex flex-col gap-2">
      <Helmet>
        <title>Payments</title>
      </Helmet>
      <div className="w-full flex items-center justify-between gap-2">
        <BreadcrumbComponent
          tree={[
            {
              title: "Payments",
            },
          ]}
          currentPage={"All"}
        />
        <AddEditPaymentDialogDrawer>
          <Button className="px-6" Icon={Plus}>
            {t("Add Payment")}
          </Button>
        </AddEditPaymentDialogDrawer>
      </div>
      <PaymentsWrapper />
    </div>
  );
};

export default Payments;
