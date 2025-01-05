import AuthorizedRender from "@/components/shared/authorized-conditional-render";
import BreadcrumbComponent from "@/components/shared/bread-crumb";
import { Button } from "@/components/ui/button";
import { UserPlus, Users2 } from "lucide-react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import PageTitleWithIcon from "../components/PageTitleWithIcon";
import AddUsersSheet from "../components/users/add-sheet";
import UsersWrapper from "../components/users/users-wrapper";

const Users = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2">
      <Helmet>
        <title>Users</title>
      </Helmet>
      <BreadcrumbComponent
        tree={[
          {
            title: "Users",
          },
        ]}
        currentPage={"All"}
      />
      <div className="w-full flex items-center justify-between gap-2">
        <PageTitleWithIcon title={t("Users")} icon={<Users2 />} />
        <AuthorizedRender authorizedRoles={["superadmin", "admin"]}>
          <AddUsersSheet>
            <Button className="px-6 border" Icon={UserPlus}>
              {t("Create User")}
            </Button>
          </AddUsersSheet>
        </AuthorizedRender>
      </div>
      <UsersWrapper />
    </div>
  );
};

export default Users;
