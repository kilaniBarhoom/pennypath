import useAxios from "@/hooks/use-axios";
import { t } from "i18next"; // Adjust the import path as necessary
import { useEffect, useState } from "react";
import { toast } from "sonner"; // Adjust the import path as necessary

const useCategories = () => {
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
  }, [axios]);

  return { categories, loadingToFetchCategories };
};

export default useCategories;
