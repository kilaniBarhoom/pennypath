import BreadcrumbComponent from "@/components/shared/bread-crumb";
import { Button } from "@/components/ui/button";
import { dateToString } from "@/lib/utils";
import { Banknote, DollarSign } from "lucide-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import AddEditExpenseSheet from "../components/expenses/add-edit-sheet";
import ExpensesWrapper from "../components/expenses/expenses-wrapper";
import PageTitleWithIcon from "../components/PageTitleWithIcon";

const Expenses = () => {
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

  // const { pathname } = useLocation();

  return (
    <div className="flex flex-col gap-2">
      <Helmet>
        <title>Expenses</title>
      </Helmet>

      <BreadcrumbComponent
        tree={[
          {
            title: "Expenses",
          },
        ]}
        currentPage={"All"}
      />
      {/* <Separator />
      <nav>
        <ul className="flex gap-2">
          <li>
            <Link
              to="/expenses"
              className={ny(
                buttonVariants({
                  size: "lg",
                  variant: ["plan"].includes(pathname) ? "outline" : "navBtn",
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
                  size: "lg",
                  variant: ["plan"].includes(pathname) ? "navBtn" : "outline",
                })
              )}
            >
              {t("Saving Plan")}
            </Link>
          </li>
        </ul>
      </nav> */}
      <div className="w-full flex items-center flex-wrap justify-between gap-2">
        <PageTitleWithIcon
          title={t("Expenses")}
          icon={<DollarSign size={35} />}
        />
        <div className="flex items-center lg:w-fit w-full">
          <AddEditExpenseSheet>
            <Button
              className="px-6 xl:py-4 py-6 xl:w-fit w-full"
              Icon={Banknote}
            >
              {t("Add Expense")}
            </Button>
          </AddEditExpenseSheet>
        </div>
      </div>
      <ExpensesWrapper />
    </div>
  );
};

export default Expenses;
