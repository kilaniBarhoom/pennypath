import UsersForm from "@/components/forms/main-page/users/add-edit-form";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useUsersFormMutation } from "@/pages/Main-Page/api/Users";
import { RegisterFormSchema, RegisterFormSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const AddEditUsersSheet = ({ children }: { children: React.ReactNode }) => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  //   const { data: employee, isLoading: isLoadingToFetchEmployee } =
  //     useGetEmployeeByIdQuery();

  const [isOpen, setIsOpen] = useState(false);

  const userForm = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      fullNameArabic: "",
      fullNameEnglish: "",
      email: "",
    },
  });

  const { mutateAsync } = useUsersFormMutation();

  const onSubmit = async (data: RegisterFormSchemaType) => {
    try {
      await mutateAsync({
        data,
      });
      toast(t("Success"), {
        description: t("Saved Successfully"),
      });
      setIsOpen(false);
    } catch (error: any) {
      toast(t("Error"), {
        description: t(error?.response?.data?.[0]) || "",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        disableBackdrop
        className="bg-background sm:min-w-[500px] rounded-sm w-full transition-all duration-300 ease-in-out"
        side={dir === "ltr" ? "right" : "left"}
      >
        <div className=" flex flex-col gap-2 overflow-auto">
          <SheetHeader className="flex-[0.3] flex-row items-center gap-2">
            <img
              src="/assets/create-user.png"
              alt="create user image"
              className="object-contain w-16"
            />
            <div className="flex flex-col">
              <SheetTitle>{t("Create a new user")}</SheetTitle>
              <SheetDescription>
                {t("Create a new user by entering user's info")}
              </SheetDescription>
            </div>
          </SheetHeader>
          <Separator />
          <UsersForm inSheet userForm={userForm} onSubmit={onSubmit} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddEditUsersSheet;
