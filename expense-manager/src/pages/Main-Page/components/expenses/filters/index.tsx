import LocalSearchBar from "@/components/shared/loacal-search";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  dateToString,
  getFirstDayOfCurrentMonth,
  getLastDayOfCurrentMonth,
  stringToDate,
} from "@/lib/utils";
import { format } from "date-fns";
import { Calendar, Filter, MoveRight, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import FiltersDropdown from "./filters-dropdown";

const ExpensesFilters = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams({
    from: getFirstDayOfCurrentMonth(),
    to: getLastDayOfCurrentMonth(),
    q: "",
  });

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  const setDateRange = (from: string, to: string) => {
    setSearchParams((prev) => {
      prev.delete("from");
      prev.delete("to");
      if (from) prev.set("from", from);
      if (to) prev.set("to", to);
      return prev;
    });
  };

  const setCategory = (category: string) => {
    setSearchParams((prev) => {
      prev.delete("category");
      if (category) prev.set("category", category);
      return prev;
    });
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex items-center justify-between max-sm:flex-col gap-2 mb-2">
        <div className="max-sm:w-full">
          <LocalSearchBar
            route="/expenses"
            placeholder="Search for an expense"
            otherClasses=" md:w-fit w-full"
          />
        </div>
        <div className="flex items-center gap-2 max-sm:w-full">
          <FiltersDropdown>
            <Button variant={"outline"} size={"icon"}>
              <Filter
                size={16}
                strokeWidth={2}
                className="text-muted-foreground"
              />
            </Button>
          </FiltersDropdown>
          {/* <DateRangePickerV2 /> */}
          <DateRangePicker
            className="max-lg:w-full"
            showCompare={false}
            onUpdate={({ range }) => {
              setDateRange(dateToString(range.from), dateToString(range.to));
            }}
          />
        </div>
      </div>
      {(from || to || q || category) && (
        <div className="bg-muted border rounded-md p-4 flex items-center gap-2 flex-wrap">
          <span className="text-lg md:text-xl"> {t("Filters")}:</span>
          {(from || to) && (
            <div className="flex items-center gap-2 w-fit flex-wrap rounded-sm font-normal text-lg px-2 py-1 border bg-secondary">
              <Calendar size={20} strokeWidth={2} className="me-2" />
              {t("From")}:
              <span className="bg-blue-300 text-secondary-foreground text-lg font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 ">
                {format(stringToDate(from), "dd-MM-yy")}
              </span>
              <MoveRight /> {t("To")}:
              <span className="bg-blue-300 text-secondary-foreground text-lg font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 ">
                {format(stringToDate(to), "dd-MM-yy")}
              </span>{" "}
              <Button
                size={"xs"}
                variant={"hover"}
                className="rounded-full bg-muted  ms-2"
                onClick={() => {
                  setDateRange("", "");
                }}
              >
                <X size={16} />
              </Button>
            </div>
          )}
          {q && (
            <div className="flex items-center gap-2 w-fit rounded-sm font-normal text-lg px-2 py-1 border bg-secondary">
              <span className="bg-blue-300 text-secondary-foreground text-lg font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 ">
                {q}
              </span>
            </div>
          )}
          {category && (
            <div className="flex items-center gap-2 w-fit rounded-sm font-normal text-lg px-2 py-1 border bg-secondary">
              {t("Category")}:
              <span className="bg-blue-300 text-secondary-foreground text-lg font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 max-w-24 overflow-hidden text-ellipsis whitespace-nowrap">
                {category}
              </span>
              <Button
                size={"xs"}
                variant={"hover"}
                className="rounded-full bg-muted"
                onClick={() => {
                  setCategory("");
                }}
              >
                <X size={16} />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpensesFilters;
