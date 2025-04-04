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

import { useUsersEditFormMutation } from "@/pages/Main-Page/api/Users";
import { UsersEditFormSchema, UsersEditFormSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const AddEditUsersSheet = ({
  user,
  children,
}: {
  user?: UserType;
  children: React.ReactNode;
}) => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const language = i18n.language;

  //   const { data: employee, isLoading: isLoadingToFetchEmployee } =
  //     useGetEmployeeByIdQuery();

  const [isOpen, setIsOpen] = useState(false);

  const userForm = useForm<UsersEditFormSchemaType>({
    resolver: zodResolver(UsersEditFormSchema),
    defaultValues: {
      fullNameArabic: user?.fullNameArabic || "",
      fullNameEnglish: user?.fullNameEnglish || "",
      email: user?.email || "",
    },
  });

  const { mutateAsync } = useUsersEditFormMutation();

  const onSubmit = async (data: UsersEditFormSchemaType) => {
    try {
      await mutateAsync({
        data,
        userId: user?.id ?? "",
      });
      toast(t("User Saved"), {
        description: "",
      });
      setIsOpen(false);
    } catch (error: any) {
      toast(t("Error"), {
        description: t(error.response.data.message) || "",
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
              <SheetTitle>
                {user
                  ? language === "ar"
                    ? `مستخدم ${user.fullNameEnglish}`
                    : `${user.fullNameEnglish}${t("'s Information")}`
                  : t("User Information")}
              </SheetTitle>
              <SheetDescription>
                {t("Edit user's information")}
              </SheetDescription>
            </div>
          </SheetHeader>
          <Separator />
          <UsersForm
            inSheet
            userForm={userForm}
            onSubmit={onSubmit}
            user={user}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddEditUsersSheet;
