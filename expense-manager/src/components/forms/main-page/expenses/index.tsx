import { DatePicker } from "@/components/shared/date-picker";
import { Button } from "@/components/ui/button";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectNative } from "@/components/ui/select-native";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { ny, stringToDate } from "@/lib/utils";
import useCategories from "@/pages/Main-Page/hooks/use-categories";
import { format } from "date-fns";
import { ar, enGB } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

type ExpenseFormProps = {
  expenseForm: any;
  isLoading: boolean;
  onSubmit: any;
  expense?: ExpenseType;
  footer: "sheet" | "drawer";
};

const ExpenseForm = ({
  expenseForm,
  isLoading,
  onSubmit,
  expense,
  footer,
}: ExpenseFormProps) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  // Update total when categories change

  const { categories, loadingToFetchCategories } = useCategories();

  const footerAttributes = {
    className:
      "flex flex-row items-center gap-2 px-4 justify-between py-2 w-full",
    closeBtn: (
      <Button type="button" variant={"outline"}>
        {t("Discard")}
      </Button>
    ),
    submitBtn: (
      <Button
        loading={isLoading}
        disabled={isLoading}
        type="submit"
        className="px-8"
      >
        {expense ? t("Save") : t("Add")}
      </Button>
    ),
  };

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
                        "ps-3 text-start font-normal text-base flex-1 w-full hover:border-secondary-foreground/70",
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
                      <CalendarIcon className="ms-auto h-4 w-4 opacity-50" />
                    </Button>
                  </DatePicker>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-start gap-2">
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
                <FormItem className="flex-[2] w-full">
                  <FormLabel>
                    <span className="text-red-500">*</span>&nbsp;
                    {t("Category")}
                  </FormLabel>
                  <FormControl>
                    <SelectNative {...field} defaultValue="" className="h-10">
                      <option value="" disabled>
                        {t("Please select a category")}
                      </option>
                      {loadingToFetchCategories ? (
                        <></>
                      ) : (
                        categories &&
                        categories.length > 0 &&
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
          <FormField
            control={expenseForm.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex-1 w-full">
                <FormLabel>
                  <span className="text-red-500">*</span>&nbsp;
                  {t("Description")}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="min-h-32"
                    placeholder="e.g. Monthly salary for June"
                    autoComplete="description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {footer === "sheet" ? (
          <SheetFooter className={footerAttributes.className}>
            <SheetClose asChild>{footerAttributes.closeBtn}</SheetClose>
            {footerAttributes.submitBtn}
          </SheetFooter>
        ) : (
          <DrawerFooter className={footerAttributes.className}>
            <DrawerClose asChild>{footerAttributes.closeBtn}</DrawerClose>
            {footerAttributes.submitBtn}
          </DrawerFooter>
        )}
      </form>
    </Form>
  );
};

export default ExpenseForm;
