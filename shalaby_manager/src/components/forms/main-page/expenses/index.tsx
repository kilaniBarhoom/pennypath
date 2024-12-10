import { Button } from "@/components/ui/button";
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
import { useTranslation } from "react-i18next";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";

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
              <FormItem className="flex-1">
                <FormLabel>
                  <span className="text-red-500">*</span>&nbsp;{t("Amount")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    defaultValue={0}
                    min={0}
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
        <DialogFooter className="flex items-center gap-2 p-2 justify-end w-full">
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
