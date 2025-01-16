import LocalSearchBar from "@/components/shared/loacal-search";

const ExpensesFilters = () => {
  return (
    <div className="mb-2">
      <LocalSearchBar
        route="/expenses"
        placeholder="Search for an expense"
        otherClasses=" w-full"
      />
    </div>
  );
};

export default ExpensesFilters;
