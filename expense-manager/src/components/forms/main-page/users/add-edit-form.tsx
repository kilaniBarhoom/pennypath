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
import { SheetClose } from "@/components/ui/sheet";
import { ny } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const UsersForm = ({
  user,
  userForm,
  onSubmit,
  inSheet,
}: {
  user?: UserType;
  userForm: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  inSheet?: boolean;
}) => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const isLoading = userForm.formState.isSubmitting;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form {...userForm}>
      <form
        onSubmit={userForm.handleSubmit(onSubmit)}
        className="flex flex-col p-4 gap-y-5"
      >
        <div className={ny("flex flex-col gap-y-2")}>
          <div className="flex gap-2 w-full">
            <FormField
              control={userForm.control}
              name="fullNameEnglish"
              render={({ field }) => (
                <FormItem className="flex-1 w-full">
                  <FormLabel>
                    <span className="text-red-500">*</span>&nbsp;
                    {t("Full Name In English")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      className="text-left"
                      {...field}
                      autoComplete="fullNameEnglish"
                      error={
                        !!userForm.formState.errors.fullNameEnglish?.message
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={userForm.control}
              name="fullNameArabic"
              render={({ field }) => (
                <FormItem className="flex-1 w-full">
                  <FormLabel>
                    <span className="text-red-500">*</span>&nbsp;
                    {t("Full Name In Arabic")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="جون دو"
                      autoComplete="fullNameArabic"
                      className="text-right"
                      error={
                        !!userForm.formState.errors.fullNameArabic?.message
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={userForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1 w-full">
                <FormLabel>
                  <span className="text-red-500">*</span>&nbsp;
                  {t("Email")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="johndoe@gmail.com"
                    autoComplete="email"
                    error={!!userForm.formState.errors.email?.message}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!user && (
            <FormField
              control={userForm.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex-1 w-full">
                  <FormLabel>
                    <span className="text-red-500">*</span>&nbsp;
                    {t("Password")}
                  </FormLabel>
                  <FormControl>
                    <Trans i18nKey={"passwordInput"}>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                          autoComplete="password"
                          placeholder="********"
                        />
                        {showPassword ? (
                          <Eye
                            onClick={() => setShowPassword(false)}
                            size={23}
                            className={ny("cursor-pointer absolute top-2", {
                              "right-3": dir === "ltr",
                              "left-3": dir === "rtl",
                            })}
                          />
                        ) : (
                          <EyeOff
                            onClick={() => setShowPassword(true)}
                            size={23}
                            className={ny("cursor-pointer absolute top-2", {
                              "right-3": dir === "ltr",
                              "left-3": dir === "rtl",
                            })}
                          />
                        )}
                      </div>
                    </Trans>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        {inSheet ? (
          <div className="flex items-center gap-3 justify-end">
            <SheetClose asChild>
              <Button
                className=" w-full"
                variant="outline"
                onClick={() => userForm.reset()}
              >
                {t("Discard")}
              </Button>
            </SheetClose>
            <Button
              className=" w-full"
              type="submit"
              loading={isLoading}
              disabled={isLoading}
            >
              {t("Save")}
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 flex-col">
            <Button
              className=" w-full"
              type="submit"
              loading={isLoading}
              disabled={isLoading}
            >
              {t("Register")}
            </Button>
            <p className="text-sm text-secondary-foreground">
              {t("Already have an account?")}{" "}
              <Link to="/" className="text-primary">
                {t("Login")}
              </Link>
            </p>
          </div>
        )}
      </form>
    </Form>
  );
};

export default UsersForm;
