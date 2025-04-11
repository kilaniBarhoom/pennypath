import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface GeneralFormTemplateProps<T extends object> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => Promise<void>;
  title: string;
  description?: string;
  children: React.ReactNode;
  trigger?: React.ReactNode;
  isLoading?: boolean;
  showQuickAdd?: boolean;
  onQuickAdd?: () => void;
  defaultOpen?: boolean;
}

export function GeneralFormTemplate<T extends object>({
  form,
  onSubmit,
  title,
  description,
  children,
  trigger,
  isLoading = false,
  showQuickAdd = false,
  onQuickAdd,
  defaultOpen = false,
}: GeneralFormTemplateProps<T>) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleSubmit = async (data: T) => {
    await onSubmit(data);
    if (!showQuickAdd) {
      setIsOpen(false);
    }
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4 p-1"
            >
              <div className="p-4">{children}</div>
              <DialogFooter className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {showQuickAdd && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onQuickAdd}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      {t("Add Another")}
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("Cancel")}
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? t("Saving...") : t("Save")}
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
