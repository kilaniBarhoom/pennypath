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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { ny, stringToDate } from "@/lib/utils";
import { format } from "date-fns";
import { ar, enGB } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

type PaymentFormProps = {
  paymentForm: any;
  isLoading: boolean;
  onSubmit: any;
  payment?: PaymentType;
  footer: "sheet" | "drawer";
};

const PaymentForm = ({
  paymentForm,
  isLoading,
  onSubmit,
  payment,
  footer,
}: PaymentFormProps) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const dir = i18n.dir();

  const footerAttributes = {
    className:
      "flex flex-row items-center gap-2 px-4 py-2 justify-between w-full",
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
        {payment ? t("Save") : t("Add")}
      </Button>
    ),
  };
  return (
    <Form {...paymentForm}>
      <form
        onSubmit={paymentForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-10"
      >
        <div className={ny("flex flex-col gap-y-3 p-4")}>
          <FormField
            control={paymentForm.control}
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
                        "ps-3 text-left font-normal text-base flex-1 w-full hover:border-secondary-foreground/70",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(stringToDate(field.value), "dd-LL-y", {
                          locale: language === "ar" ? ar : enGB,
                        })
                      ) : (
                        <span>{t("Permit Expiration Date")}</span>
                      )}
                      <CalendarIcon className="ms-auto h-4 w-4 opacity-50" />
                    </Button>
                  </DatePicker>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-start w-full gap-2">
            <FormField
              control={paymentForm.control}
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
                      placeholder="e.g. 100"
                      onChange={(e) => {
                        field.onChange(parseFloat(e.target.value));
                      }}
                      autoComplete="amount"
                      error={!!paymentForm.formState.errors.amount?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={paymentForm.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>
                    <span className="text-red-500">*</span>&nbsp;{t("Type")}
                  </FormLabel>
                  <Select
                    dir={dir}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="full">{t("full")}</SelectItem>
                      <SelectItem value="advance">
                        {t("Advance Payment")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={paymentForm.control}
            name="note"
            render={({ field }) => (
              <FormItem className="flex-1 w-full">
                <FormLabel>{t("Note")}</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    autoComplete="note"
                    className="h-32"
                    placeholder={t("Add a note")}
                    // error={!!paymentForm.formState.errors.note?.message}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {footer === "sheet" ? (
          <SheetFooter className={footerAttributes.className}>
            <SheetClose>{footerAttributes.closeBtn}</SheetClose>
            {footerAttributes.submitBtn}
          </SheetFooter>
        ) : (
          <DrawerFooter className={footerAttributes.className}>
            <DrawerClose>{footerAttributes.closeBtn}</DrawerClose>
            {footerAttributes.submitBtn}
          </DrawerFooter>
        )}
      </form>
    </Form>
  );
};

export default PaymentForm;
