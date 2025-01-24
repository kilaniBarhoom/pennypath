import LocalSearchBar from "@/components/shared/loacal-search";
import TooltipComponent from "@/components/shared/tooltip-component";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  dateToString,
  getFirstDayOfCurrentMonth,
  getLastDayOfCurrentMonth,
  stringToDate,
} from "@/lib/utils";
import { format } from "date-fns";
import { ar, enGB } from "date-fns/locale";
import { Calendar, Filter, MoveRight, Search, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import FiltersDropdown from "./filters-dropdown";
import { SelectNative } from "@/components/ui/select-native";
import useCategories from "@/pages/Main-Page/hooks/use-categories";

const ExpensesFilters = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const { categories, loadingToFetchCategories } = useCategories();

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
    setSearchParams(
      (prev) => {
        prev.delete("from");
        prev.delete("to");
        if (from) prev.set("from", from);
        if (to) prev.set("to", to);
        return prev;
      },
      { replace: true }
    );
  };

  const setCategory = (category: string) => {
    setSearchParams(
      (prev) => {
        prev.delete("category");
        if (category) prev.set("category", category);
        return prev;
      },
      {
        replace: true,
      }
    );
  };

  const DateFormatComponent = ({ date }: { date: string }) => (
    <span className="bg-blue-300 flex items-center gap-2 text-secondary-foreground text-sm md:text-lg font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 ">
      {format(stringToDate(date), "eee, dd-MM-yyyy", {
        locale: language === "ar" ? ar : enGB,
      })}
    </span>
  );

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex items-center justify-between max-sm:flex-col gap-2 border-b pb-2">
        <div className="max-sm:w-full">
          <LocalSearchBar
            route="/expenses"
            placeholder="Search for an expense"
            otherClasses=" md:w-fit w-full"
          />
        </div>
        <div className="flex items-center gap-2 max-sm:w-full">
          <FiltersDropdown>
            <Button
              variant={"outline"}
              Icon={Filter}
              iconClassNames={"text-secondary-foreground size-4"}
              iconPosition="left"
            >
              {t("Filters")}
            </Button>
          </FiltersDropdown>
          <DateRangePicker
            locale={language}
            className="max-lg:w-full bg-transparent"
            showCompare={false}
            align="end"
            onUpdate={({ range }) => {
              setDateRange(dateToString(range.from), dateToString(range.to));
            }}
          />
        </div>
      </div>
      {(from || to || q || category) && (
        <div className="flex items-center gap-2 flex-wrap w-fit">
          {(from || to) && (
            <div className="flex items-center gap-2 w-fit flex-wrap rounded-sm font-normal p-1 border bg-secondary">
              <Calendar size={20} strokeWidth={2} className="me-1" />
              {from && to && from === to ? (
                <DateFormatComponent date={from} />
              ) : from && to ? (
                <>
                  <DateFormatComponent date={from} />{" "}
                  <MoveRight className="rtl:rotate-180" />
                  <DateFormatComponent date={to} />
                </>
              ) : from ? (
                <DateFormatComponent date={from} />
              ) : to ? (
                <DateFormatComponent date={to} />
              ) : null}
              <TooltipComponent content="Clear">
                <Button
                  size={"xs"}
                  variant={"ghost"}
                  className="rounded-full ms-2"
                  onClick={() => {
                    setDateRange("", "");
                  }}
                >
                  <X size={16} />
                </Button>
              </TooltipComponent>
            </div>
          )}
          {q && (
            <div className="flex items-center gap-2 w-fit rounded-sm font-normal text-lg px-2 py-1 border bg-secondary">
              <Search size={20} strokeWidth={2} className="me-1" />
              <span className="bg-blue-300 text-secondary-foreground text-lg font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 ">
                {q}
              </span>
            </div>
          )}
          {category && (
            <div className="flex items-center gap-2 w-fit rounded-sm font-normal text-lg px-2 py-1 border bg-secondary">
              {t("Category")}:
              {loadingToFetchCategories ? (
                <></>
              ) : (
                <SelectNative
                  defaultValue={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </SelectNative>
              )}
              <TooltipComponent variant="invert" content="Clear">
                <Button
                  size={"xs"}
                  variant={"ghost"}
                  className="rounded-full"
                  onClick={() => {
                    setCategory("");
                  }}
                >
                  <X size={16} />
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
