import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ny } from "@/lib/utils";
import { PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [total, setTotal] = useState(expense?.amount || 0);

  const { fields, append, remove } = useFieldArray({
    control: expenseForm.control,
    name: "categories",
  });

  // Update total when categories change
  const updateTotal = () => {
    const categoriesTotal =
      expenseForm
        .getValues("categories")
        ?.reduce(
          (sum: number, category: { amount: number }) =>
            sum + (category.amount || 0),
          0
        ) || 0;

    setTotal(categoriesTotal);
    expenseForm.setValue("amount", categoriesTotal); // Auto-update hidden amount field
  };

  useEffect(() => {
    updateTotal();
  }, [fields]);

  return (
    <Form {...expenseForm}>
      <form
        onSubmit={expenseForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-10"
      >
        <div className={ny("flex flex-col gap-y-3")}>
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
          <div>
            <h3 className="text-sm font-medium">
              {t("Categorized Expenses")} ({t("Required")})
            </h3>
            {fields.map((field: any, index: number) => (
              <div key={field.id} className="flex items-end space-x-2 mt-2">
                <FormField
                  control={expenseForm.control}
                  name={`categories.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={index !== 0 ? "sr-only" : undefined}
                      >
                        {t("Category")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t("Category name")}
                          error={
                            !!expenseForm.formState.errors.categories?.[index]
                              ?.name?.message
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={expenseForm.control}
                  name={`categories.${index}.amount`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={index !== 0 ? "sr-only" : undefined}
                      >
                        {t("Amount")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder={t("Amount")}
                          onChange={(e) => {
                            field.onChange(parseFloat(e.target.value));
                            updateTotal();
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    if (fields.length > 1) {
                      remove(index);
                      updateTotal();
                    }
                  }}
                  disabled={fields.length === 1} // Prevent removing the last category
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ name: "", amount: 0 })}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              {t("Add Category")}
            </Button>

            <div className="text-lg font-semibold w-full text-center p-2 mt-2 rounded-md bg-blue-500 text-white tracking-wider">
              {t("Total")}: <span className="text-2xl">₪</span>
              {total.toFixed(2)}
            </div>

            <FormField
              control={expenseForm.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex-1 w-full mt-2">
                  <FormLabel>{t("Description")}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="e.g. Salary for the month of January"
                      autoComplete="description"
                      className="h-32"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <DialogFooter className="flex bg-muted rounded-b-md flex-row fixed bottom-0 left-0 items-center justify-end gap-2 px-4 py-2 w-full">
          <DialogClose asChild>
            <Button type="button" className="w-fit" variant={"outline"}>
              {t("Discard")}
            </Button>
          </DialogClose>
          <Button
            loading={isLoading}
            disabled={isLoading}
            type="submit"
            className="px-8 w-fit"
          >
            {expense ? t("Save") : t("Add")}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ExpenseForm;
