import { DatePicker } from "@/components/shared/date-picker";
import { Button } from "@/components/ui/button";
import { SelectNative } from "@/components/ui/select-native";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { ny, stringToDate } from "@/lib/utils";
import { format } from "date-fns";
import { ar, enGB } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import useAxios from "@/hooks/use-axios";
import { toast } from "sonner";
import LoadingComponent from "@/components/shared/Loading-component";

type ExpenseFormProps = {
  expenseForm: any;
  isLoading: boolean;
  onSubmit: any;
  expense?: ExpenseType;
};

const ExpenseForm = ({
  expenseForm,
  isLoading,
  onSubmit,
  expense,
}: ExpenseFormProps) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  // Update total when categories change

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

  return (
    <Form {...expenseForm}>
      <form
        onSubmit={expenseForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-10"
      >
        <div className={ny("flex flex-col gap-y-3 p-4")}>
          <FormField
            control={expenseForm.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  <span className="text-red-500">*</span>&nbsp;{t("Name")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. Salary"
                    autoComplete="name"
                    error={!!expenseForm.formState.errors.name?.message}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={expenseForm.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex-1 w-full">
                <FormLabel>
                  <span className="text-red-500">*</span>&nbsp;
                  {t("Date")}
                </FormLabel>
                <FormControl>
                  <DatePicker
                    selected={field.value}
                    onSelect={(value: Date) => {
                      field.onChange(value);
                    }}
                  >
                    <Button
                      variant={"outline"}
                      className={ny(
                        "pl-3 text-left font-normal text-base flex-1 w-full hover:scale-100 active:scale-100",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(stringToDate(field.value), "dd-LL-yy", {
                          locale: language === "ar" ? ar : enGB,
                        })
                      ) : (
                        <span>{t("Date")}</span>
                      )}
                      <CalendarIcon className="ltr:ml-auto rtl:mr-auto h-4 w-4 opacity-50" />
                    </Button>
                  </DatePicker>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={expenseForm.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex-1 w-full">
                <FormLabel>
                  <span className="text-red-500">*</span>&nbsp;
                  {t("Amount")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    min={1}
                    placeholder="e.g. 100"
                    onChange={(e) => {
                      field.onChange(parseFloat(e.target.value));
                    }}
                    autoComplete="amount"
                    error={!!expenseForm.formState.errors.amount?.message}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={expenseForm.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex-1 w-full">
                <FormLabel>
                  <span className="text-red-500">*</span>&nbsp;
                  {t("Category")}
                </FormLabel>
                <FormControl>
                  <SelectNative {...field}>
                    {loadingToFetchCategories ? (
                      <option value="" disabled>
                        <LoadingComponent />
                      </option>
                    ) : (
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))
                    )}
                  </SelectNative>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <SheetFooter className="flex rounded-b-md flex-row items-center justify-end gap-2 px-4 py-2 w-full">
          <SheetClose asChild>
            <Button type="button" className="w-fit" variant={"outline"}>
              {t("Discard")}
            </Button>
          </SheetClose>
          <Button
            loading={isLoading}
            disabled={isLoading}
            type="submit"
            className="px-8 w-fit"
          >
            {expense ? t("Save") : t("Add")}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
};

export default ExpenseForm;
