import BreadcrumbComponent from "@/components/shared/bread-crumb";
import { Button, buttonVariants } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { Banknote } from "lucide-react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { dateToString, ny } from "@/lib/utils";
import { useEffect } from "react";
import ExpensesWrapper from "../components/expenses/expenses-wrapper";
import AddEditExpenseDialogDrawer from "../components/expenses/add-edit-dialog-drawer";
import { Separator } from "@/components/ui/separator";

const SavingPlan = () => {
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

  const { pathname } = useLocation();

  return (
    <div className="flex flex-col gap-2">
      <Helmet>
        <title>Expenses</title>
      </Helmet>
      <nav>
        <ul className="flex gap-2">
          <li>
            <Link
              to="/expenses"
              className={ny(
                buttonVariants({
                  variant: ["plan"].includes(pathname) ? "outline" : "default",
                })
              )}
            >
              {t("List")}
            </Link>
          </li>
          <li>
            <Link
              to="/expenses/plan"
              className={ny(
                buttonVariants({
                  variant: ["plan"].includes(pathname) ? "default" : "outline",
                })
              )}
            >
              {t("Saving Plan")}
            </Link>
          </li>
        </ul>
      </nav>
      <Separator />
      <BreadcrumbComponent
        tree={[
          {
            title: "Expenses",
          },
        ]}
        currentPage={"All"}
      />
      <div className="w-full flex items-center flex-wrap justify-between gap-2">
        <Typography
          className="flex items-center gap-2"
          element="h4"
          as="h4"
          color="secondary"
        >
          <Banknote size={35} fill="#99BFC5" stroke="#000" />
          {t("Expenses")}
        </Typography>
        <div className="flex items-center lg:w-fit w-full">
          <AddEditExpenseDialogDrawer>
            <Button
              className="px-6 lg:py-4 py-6 lg:w-fit w-full border-2"
              Icon={Banknote}
            >
              {t("Add Expense")}
            </Button>
          </AddEditExpenseDialogDrawer>
        </div>
      </div>
      <ExpensesWrapper />
    </div>
  );
};

export default SavingPlan;
