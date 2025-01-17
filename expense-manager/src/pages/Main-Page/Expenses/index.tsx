import BreadcrumbComponent from "@/components/shared/bread-crumb";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Banknote } from "lucide-react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import AddEditExpenseSheet from "../components/expenses/add-edit-sheet";
import ExpensesWrapper from "../components/expenses/expenses-wrapper";
import PageTitleWithIcon from "../components/PageTitleWithIcon";
// import { DateRangePicker } from "@/components/ui/date-range-picker";

const Expenses = () => {
  const { t } = useTranslation();
  // const [_, setSearchParams] = useSearchParams({
  //   search: "",
  //   from: getFirstDayOfCurrentMonth(),
  //   to: getLastDayOfCurrentMonth(),
  // });

  // const setDateRange = (from: string, to: string) => {
  //   setSearchParams((prev) => {
  //     prev.delete("from");
  //     prev.delete("to");
  //     if (from) prev.set("from", from);
  //     if (to) prev.set("to", to);
  //     return prev;
  //   });
  // };

  return (
    <div className="flex flex-col gap-4">
      <Helmet>
        <title>Expenses</title>
      </Helmet>
      <div className="flex md:items-center max-md:flex-col gap-2 justify-between ">
        <BreadcrumbComponent
          tree={[
            {
              title: "Expenses",
            },
          ]}
          currentPage={"All"}
        />
        <div className="flex items-center gap-2 max-md:w-full">
          <Button
            Icon={Icons.exportIcon}
            variant={"none"}
            className="p-4 bg-green-500 max-md:w-full text-white"
          >
            {t("Export")}
          </Button>
          <AddEditExpenseSheet>
            <Button className="p-4 max-md:w-full" Icon={Banknote}>
              {t("Add Expense")}
            </Button>
          </AddEditExpenseSheet>
        </div>
      </div>
      <div className="w-full flex items-center flex-wrap justify-between gap-2 mt-4">
        <PageTitleWithIcon
          title={t("Expenses")}
          icon={<Icons.expenseMoney />}
        />
        {/* <DateRangePicker
          showCompare={false}
          onUpdate={({ range }) => {
            setDateRange(dateToString(range.from), dateToString(range.to));
          }}
        /> */}
        <Button variant={"secondary"}>{t("Options")}</Button>
      </div>
      <ExpensesWrapper />
    </div>
  );
};

export default Expenses;
