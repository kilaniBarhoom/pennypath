import LocalSearchBar from "@/components/shared/loacal-search";

const ExpensesFilters = () => {
  return (
    <LocalSearchBar
      route="/expenses"
      placeholder="Search for an expense"
      otherClasses="md:w-80 w-full"
    />
  );
};

export default ExpensesFilters;
