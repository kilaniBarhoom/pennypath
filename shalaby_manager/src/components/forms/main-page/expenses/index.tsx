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
import { useState } from "react";
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

  const updateTotal = () => {
    const mainAmount = expenseForm.getValues("amount") || 0;
    const categoriesTotal =
      expenseForm
        .getValues("categories")
        ?.reduce(
          (sum: number, category: { amount: number }) =>
            sum + (category.amount || 0),
          0
        ) || 0;
    setTotal(mainAmount + categoriesTotal);
    expenseForm.setValue("amount", categoriesTotal);
  };

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
          <FormField
            control={expenseForm.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-red-500">*</span>&nbsp;{t("Amount")}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
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
          <div>
            <h3 className="text-sm font-medium">
              {t("Categorized Expenses")} ({t("Optional")})
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
                        <Input {...field} placeholder={t("Category name")} />
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
                    remove(index);
                    updateTotal();
                  }}
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
                <FormItem className="flex-1 w-full">
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
        <DialogFooter className="flex items-center justify-end gap-2 p-0 w-full">
          <DialogClose asChild>
            <Button
              type="button"
              className="md:w-fit w-full"
              variant={"outline"}
            >
              {t("Discard")}
            </Button>
          </DialogClose>
          <Button
            loading={isLoading}
            disabled={isLoading}
            type="submit"
            className="px-8 md:w-fit w-full"
          >
            {expense ? t("Save") : t("Add")}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ExpenseForm;
