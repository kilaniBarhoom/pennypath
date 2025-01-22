import LoadingComponent from "@/components/shared/Loading-component";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectNative } from "@/components/ui/select-native";
import useAxios from "@/hooks/use-axios";
import useMediaQuery from "@/hooks/use-media-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

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
        const { data: categories } = response;

        setCategories(categories);
      } catch (error) {
        toast(t("Error"), {
          description: t("Failed to fetch categories"),
        });
      } finally {
        setLoadingToFetchCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const [searchParams, setSearchParams] = useSearchParams({
    category: "",
  });

  const category = searchParams.get("category") || "";

  const setCategory = (category: string) => {
    setSearchParams((prev) => {
      prev.delete("category");
      if (category) prev.set("category", category);
      return prev;
    });
  };

  const isDesktop = useMediaQuery(1024);

  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent
          className="w-full p-3"
          align={isDesktop ? "end" : "start"}
        >
          <div className="space-y-3">
            <div className="text-xs font-medium text-muted-foreground">
              {t("Filters")}
            </div>
            {loadingToFetchCategories ? (
              <div className="h-20 w-full flex items-center justify-center">
                <LoadingComponent />
              </div>
            ) : (
              <>
                {t("Category")}
                <SelectNative
                  defaultValue={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled>
                    {t("Please select a category")}
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </SelectNative>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
