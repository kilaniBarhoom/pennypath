import AuthorizedRender from "@/components/shared/authorized-conditional-render";
import BreadcrumbComponent from "@/components/shared/bread-crumb";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import AddUsersSheet from "../components/users/add-sheet";
import UsersWrapper from "../components/users/users-wrapper";

const Users = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2">
      <Helmet>
        <title>Users</title>
      </Helmet>
      <div className="flex items-center justify-between gap-2 max-md:flex-col mb-4">
        <BreadcrumbComponent
          tree={[
            {
              title: "Users",
            },
          ]}
          currentPage={"All"}
        />
        <AuthorizedRender authorizedRoles={["superadmin", "admin"]}>
          <AddUsersSheet>
            <Button className="border max-md:w-full" Icon={UserPlus}>
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
