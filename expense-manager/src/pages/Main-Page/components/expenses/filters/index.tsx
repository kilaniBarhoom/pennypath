import LocalSearchBar from "@/components/shared/loacal-search";
import TooltipComponent from "@/components/shared/tooltip-component";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
// Remove unused SelectNative if category selection is only in dropdown
// import { SelectNative } from "@/components/ui/select-native";
import { dateToString, stringToDate } from "@/lib/utils";
import useCategories from "@/pages/Main-Page/hooks/use-categories"; // Keep if needed for displaying category name
import { format } from "date-fns";
import { ar, enGB } from "date-fns/locale";
import { Calendar, Filter, Group, MoveRight, Search, X } from "lucide-react"; // Added Group icon
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom"; // Use react-router-dom or your router's equivalent
import FiltersDropdown from "./filters-dropdown";
import { useMemo } from "react"; // Import useMemo

const ExpensesFilters = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  // Fetch categories to display the name if a category filter is active
  const { categories, loadingToFetchCategories } = useCategories();

  const [searchParams, setSearchParams] = useSearchParams({
    q: "",
    from: "",
    to: "",
    category: "",
    groupby: "", // Ensure groupby is initialized
    sort: "", // Ensure sort is initialized if used elsewhere
  });

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const q = searchParams.get("q") || "";
  const categoryId = searchParams.get("category") || ""; // Renamed to avoid conflict
  const groupby = searchParams.get("groupby") || ""; // Get groupby value

  // Find the category name for display purposes
  const activeCategoryName = useMemo(() => {
    if (!categoryId || loadingToFetchCategories || !categories?.length)
      return null;
    return categories.find((c) => c.id === categoryId)?.name;
  }, [categoryId, categories, loadingToFetchCategories]);

  // Get display text for the active grouping
  const activeGroupbyText = useMemo(() => {
    if (groupby === "date") return t("Group by Date");
    if (groupby === "category") return t("Group by Category");
    return null; // No active grouping or unknown value
  }, [groupby, t]);

  const setDateRange = (fromValue: string, toValue: string) => {
    setSearchParams(
      (prev) => {
        prev.delete("from");
        prev.delete("to");
        if (fromValue) prev.set("from", fromValue);
        if (toValue) prev.set("to", toValue);
        prev.set("PageNumber", "1"); // Reset page number
        return prev;
      },
      { replace: true }
    );
  };

  const setCategory = (categoryValue: string) => {
    setSearchParams(
      (prev) => {
        prev.delete("category");
        if (categoryValue) prev.set("category", categoryValue);
        prev.set("PageNumber", "1"); // Reset page number
        return prev;
      },
      {
        replace: true,
      }
    );
  };

  // Added function to clear groupby specifically from the badge
  const clearGroupby = () => {
    setSearchParams(
      (prev) => {
        prev.delete("groupby");
        prev.set("PageNumber", "1"); // Reset page number
        return prev;
      },
      { replace: true }
    );
  };

  const DateFormatComponent = ({ date }: { date: string }) => (
    <span className="bg-blue-300 flex items-center gap-2 text-secondary-foreground text-sm md:text-base font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 ">
      {" "}
      {/* Adjusted text size */}
      {format(stringToDate(date), "eee, dd MMM yyyy", {
        // Changed format slightly
        locale: language === "ar" ? ar : enGB,
      })}
    </span>
  );

  // Determine if any filters (including groupby) are active
  const areFiltersActive = !!(from || to || q || categoryId || groupby);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Top row: Search, Filters Dropdown, Date Picker */}
      <div className="w-full flex items-center justify-between max-sm:flex-col gap-2 border-b pb-2">
        <div className="max-sm:w-full">
          <LocalSearchBar
            route="/expenses" // Ensure this updates the 'q' param
            placeholder={t("Search expenses by name/description...")} // More specific placeholder
            otherClasses=" md:w-fit w-full"
          />
        </div>
        <div className="flex items-center gap-2 max-sm:w-full max-sm:justify-between">
          <FiltersDropdown>
            {/* Button that triggers the dropdown */}
            <Button
              variant={"outline"}
              size="sm" // Consistent button size
              className="h-10 px-3" // Adjust padding/height as needed
            >
              <Filter className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
              {t("Filters")}
            </Button>
          </FiltersDropdown>
          <DateRangePicker
            className="max-lg:w-full bg-transparent" // Check if this class is needed
            // range={ from && to ? { from: stringToDate(from), to: stringToDate(to)} : undefined } // Pre-fill if needed
            showCompare={false}
            align="end"
            onUpdate={({ range }) => {
              // Ensure dates are valid before converting
              const fromDateStr = range.from ? dateToString(range.from) : "";
              const toDateStr = range.to ? dateToString(range.to) : "";
              setDateRange(fromDateStr, toDateStr);
            }}
          />
        </div>
      </div>

      {/* Active Filters Display Area */}
      {areFiltersActive && (
        <div className="flex items-center gap-2 flex-wrap w-full">
          {" "}
          {/* Changed w-fit to w-full */}
          {/* Date Range Filter Badge */}
          {(from || to) && (
            <div className="flex items-center gap-2 w-fit flex-wrap rounded-md font-normal p-1.5 border bg-secondary text-sm">
              {" "}
              {/* Adjusted padding/rounding */}
              <Calendar
                size={16}
                strokeWidth={2}
                className="mr-1 rtl:ml-1 rtl:mr-0"
              />{" "}
              {/* Adjusted size/margin */}
              {from && to && from === to ? (
                <DateFormatComponent date={from} />
              ) : from && to ? (
                <>
                  <DateFormatComponent date={from} />{" "}
                  <MoveRight size={16} className="rtl:rotate-180" />{" "}
                  {/* Adjusted size */}
                  <DateFormatComponent date={to} />
                </>
              ) : from ? (
                <>
                  <span>{t("From")}:</span> <DateFormatComponent date={from} />
                </> // Label for single date
              ) : to ? (
                <>
                  <span>{t("To")}:</span> <DateFormatComponent date={to} />
                </> // Label for single date
              ) : null}
              <TooltipComponent
                variant="invert"
                content={t("Clear Date Range")}
              >
                <Button
                  size={"icon"} // Use icon size
                  variant={"ghost"}
                  className="rounded-full h-6 w-6 ml-1 rtl:mr-1 rtl:ml-0" // Adjusted size/margin
                  onClick={() => {
                    setDateRange("", "");
                  }}
                >
                  <X size={14} /> {/* Adjusted size */}
                </Button>
              </TooltipComponent>
            </div>
          )}
          {/* Search Query Badge */}
          {q && (
            <div className="flex items-center gap-2 w-fit rounded-md font-normal px-2 py-1 border bg-secondary text-sm">
              {" "}
              {/* Adjusted padding/rounding/text size */}
              <Search
                size={16}
                strokeWidth={2}
                className="mr-1 rtl:ml-1 rtl:mr-0"
              />{" "}
              {/* Adjusted size/margin */}
              <span className="bg-green-200 text-green-900 text-sm font-medium px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-200 ">
                {" "}
                {/* Style as needed */}
                {q}
              </span>
              {/* No clear button shown for search, assuming LocalSearchBar handles it */}
            </div>
          )}
          {/* Category Filter Badge */}
          {categoryId &&
            activeCategoryName && ( // Only show if categoryId and name are available
              <div className="flex items-center gap-2 w-fit rounded-md font-normal p-1.5 border bg-secondary text-sm">
                {" "}
                {/* Adjusted padding/rounding */}
                {/* Optional: Add category icon */}
                <span>{t("Category")}:</span>
                <span className="bg-purple-200 text-purple-900 text-sm font-medium px-2 py-0.5 rounded dark:bg-purple-900 dark:text-purple-200">
                  {" "}
                  {/* Style as needed */}
                  {loadingToFetchCategories
                    ? "..."
                    : activeCategoryName || categoryId}
                </span>
                <TooltipComponent
                  variant="invert"
                  content={t("Clear Category")}
                >
                  <Button
                    size={"icon"} // Use icon size
                    variant={"ghost"}
                    className="rounded-full h-6 w-6 ml-1 rtl:mr-1 rtl:ml-0" // Adjusted size/margin
                    onClick={() => {
                      setCategory(""); // Use the specific clear function
                    }}
                  >
                    <X size={14} /> {/* Adjusted size */}
                  </Button>
                </TooltipComponent>
              </div>
            )}
          {/* Group By Filter Badge - Added */}
          {groupby &&
            activeGroupbyText && ( // Only show if groupby is active and we have text for it
              <div className="flex items-center gap-2 w-fit rounded-md font-normal p-1.5 border bg-secondary text-sm">
                {" "}
                {/* Adjusted padding/rounding */}
                <Group
                  size={16}
                  strokeWidth={2}
                  className="mr-1 rtl:ml-1 rtl:mr-0"
                />{" "}
                {/* Added Group icon */}
                <span className="bg-yellow-200 text-yellow-900 text-sm font-medium px-2 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-200">
                  {" "}
                  {/* Style as needed */}
                  {activeGroupbyText}
                </span>
                <TooltipComponent
                  variant="invert"
                  content={t("Clear Grouping")}
                >
                  <Button
                    size={"icon"} // Use icon size
                    variant={"ghost"}
                    className="rounded-full h-6 w-6 ml-1 rtl:mr-1 rtl:ml-0" // Adjusted size/margin
                    onClick={clearGroupby} // Use the specific clear function
                  >
                    <X size={14} /> {/* Adjusted size */}
                  </Button>
                </TooltipComponent>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default ExpensesFilters;
