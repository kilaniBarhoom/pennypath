import BreadcrumbComponent from "@/components/shared/bread-crumb";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import AddEditExpenseSheetDrawer from "../components/expenses/add-edit-sheet-drawer/index.tsx";
import ExpensesWrapper from "../components/expenses/expenses-wrapper";
// import { DateRangePicker } from "@/components/ui/date-range-picker";

const Expenses = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2">
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
          {/* <Button
            Icon={Icons.exportIcon}
            variant={"outline"}
            className="p-4 max-md:w-ful"
          >
            {t("Export")}
          </Button> */}
          <AddEditExpenseSheetDrawer>
            <Button className="p-4 max-md:w-full" Icon={Plus}>
              {t("Add Expense")}
            </Button>
          </AddEditExpenseSheetDrawer>
        </div>
      </div>
      <ExpensesWrapper />
    </div>
  );
};

export default Expenses;
