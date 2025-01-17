import BreadcrumbComponent from "@/components/shared/bread-crumb";
import { Button } from "@/components/ui/button";
import { Banknote, DollarSign } from "lucide-react";
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
      <div className="w-full flex items-center flex-wrap justify-between gap-2">
        <PageTitleWithIcon
          title={t("Expenses")}
          icon={<DollarSign size={35} />}
        />
        <div className="flex items-center lg:w-fit w-full">
          {/* <DateRangePicker
            showCompare={false}
            onUpdate={({ range }) => {
              setDateRange(dateToString(range.from), dateToString(range.to));
            }}
          /> */}
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
