"use client";

import LoadingComponent from "@/components/shared/Loading-component";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectNative } from "@/components/ui/select-native";
import { Button } from "@/components/ui/button";
import useAxios from "@/hooks/use-axios";
import useMediaQuery from "@/hooks/use-media-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom"; // Use react-router-dom or your router's equivalent
import { toast } from "sonner";
import { X } from "lucide-react";

type CategoryType = {
  id: string;
  name: string;
};

export default function FiltersDropdown({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation();

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loadingToFetchCategories, setLoadingToFetchCategories] =
    useState(false);
  const axios = useAxios();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingToFetchCategories(true);
        const { data: response } = await axios.get("/category");
        // Assuming the actual categories array is nested under 'data'
        const { data: categoriesData } = response;
        // Add type check if necessary
        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData);
        } else {
          console.error("Fetched categories is not an array:", categoriesData);
          setCategories([]); // Set to empty array on error
        }
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.data?.message ||
          "Something went wrong fetching categories";
        toast(t("Error"), {
          description: t(errorMessage),
        });
        setCategories([]); // Ensure categories is an array even on error
      } finally {
        setLoadingToFetchCategories(false);
      }
    };

    fetchCategories();
  }, [axios, t]); // Removed t from deps if not strictly needed for API call logic

  const [searchParams, setSearchParams] = useSearchParams({
    category: "",
    sort: "",
    groupby: "", // Added groupby
  });

  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const groupby = searchParams.get("groupby") || ""; // Added groupby getter

  const setCategory = (categoryValue: string) => {
    setSearchParams(
      (prev) => {
        prev.delete("category");
        if (categoryValue) prev.set("category", categoryValue);
        prev.set("PageNumber", "1"); // Reset page number on filter change
        return prev;
      },
      { replace: true } // Use replace to avoid history clutter
    );
  };

  const setSort = (sortValue: string) => {
    setSearchParams(
      (prev) => {
        prev.delete("sort");
        if (sortValue) prev.set("sort", sortValue);
        prev.set("PageNumber", "1"); // Reset page number on filter change
        return prev;
      },
      { replace: true }
    );
  };

  // Added function to set groupby
  const setGroupby = (groupbyValue: string) => {
    setSearchParams(
      (prev) => {
        prev.delete("groupby");
        if (groupbyValue) prev.set("groupby", groupbyValue);
        prev.set("PageNumber", "1"); // Reset page number on filter change
        return prev;
      },
      { replace: true }
    );
  };

  const clearFilters = () => {
    setSearchParams(
      (prev) => {
        prev.delete("category");
        prev.delete("sort");
        prev.delete("groupby"); // Clear groupby as well
        prev.delete("PageNumber"); // Optionally clear page number or set to 1
        // Keep other params like 'q', 'from', 'to' if needed
        return prev;
      },
      { replace: true }
    );
  };

  const isDesktop = useMediaQuery(1024); // Assuming useMediaQuery("(min-width: 1024px)")

  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent
          className="w-full p-3"
          align={isDesktop ? "end" : "start"}
        >
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="text-xs font-medium text-muted-foreground">
                {t("Filters")}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-8 px-2 lg:px-3"
              >
                {t("Clear")}
                <X className="ml-2 h-4 w-4 rtl:mr-2 rtl:ml-0" />
              </Button>
            </div>
            {loadingToFetchCategories ? (
              <div className="h-32 w-full flex items-center justify-center">
                {" "}
                {/* Increased height */}
                <LoadingComponent />
              </div>
            ) : (
              <>
                {/* Category Select */}
                <div>
                  <label
                    htmlFor="category-select"
                    className="block text-sm font-medium mb-1"
                  >
                    {t("Category")}
                  </label>
                  <SelectNative
                    id="category-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">{t("All categories")}</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </SelectNative>
                </div>

                {/* Sort Select */}
                <div>
                  <label
                    htmlFor="sort-select"
                    className="block text-sm font-medium mb-1"
                  >
                    {t("Sort by")}
                  </label>
                  <SelectNative
                    id="sort-select"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="">{t("Default sorting")}</option>
                    <option value="date_asc">{t("Date (Oldest first)")}</option>
                    <option value="date_desc">
                      {t("Date (Newest first)")}
                    </option>
                    <option value="amount_asc">
                      {t("Amount (Low to High)")}
                    </option>
                    <option value="amount_desc">
                      {t("Amount (High to Low)")}
                    </option>
                  </SelectNative>
                </div>

                {/* Group By Select - Added */}
                <div>
                  <label
                    htmlFor="groupby-select"
                    className="block text-sm font-medium mb-1"
                  >
                    {t("Group By")}
                  </label>
                  <SelectNative
                    id="groupby-select"
                    value={groupby}
                    onChange={(e) => setGroupby(e.target.value)}
                  >
                    <option value="">{t("No Grouping")}</option>
                    <option value="date">{t("Group by Date")}</option>
                    <option value="category">{t("Group by Category")}</option>
                    {/* Add other potential grouping options here */}
                  </SelectNative>
                </div>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
