import LocalSearchBar from "@/components/shared/loacal-search";

const ExpensesFilters = () => {
  return (
    <div className="flex md:flex-row flex-col gap-2 items-center justify-between">
      <div className=" md:w-fit w-full ">
        <LocalSearchBar
          route="/expenses"
          placeholder="Search for an expense"
          otherClasses="md:w-80 w-full"
        />
      </div>
      {/* <LocalSearchBar
        variant="amount"
        searchQuery="amount"
        placeholder="Amount"
        route="expenses"
        otherClasses="w-fit"
      /> */}
    </div>
  );
};

export default ExpensesFilters;
