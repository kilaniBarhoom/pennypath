import AuthorizedRender from "@/components/shared/authorized-conditional-render";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  UserRolesResponseType,
  UsersResponseType,
} from "@/pages/Main-Page/api/Users";
import { Calendar, Mail, Settings, User, UserCheck2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import TableRows from "./rows";
import UsersTableSkeleton from "./skeleton";

const UsersTable = ({
  userResponse,
  isLoading,
}: {
  userResponse: UserRolesResponseType[] | UsersResponseType[];
  isLoading: boolean;
}) => {
  const { t } = useTranslation();
  const dummyArray = Array.from({ length: 5 });
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <p className="flex items-center gap-1">
              <User size={20} strokeWidth={2.3} />
              {t("Full Name")}
            </p>
          </TableHead>
          <TableHead>
            <p className="flex items-center gap-1 min-w-56">
              <Mail size={20} strokeWidth={2.3} />
              {t("Email")}
            </p>
          </TableHead>
          <TableHead>
            <p className="flex items-center gap-1 min-w-max">
              <Calendar size={20} strokeWidth={2.3} />
              {t("Created At")}
            </p>
          </TableHead>
          <TableHead>
            <p className="flex items-center gap-1">
              <UserCheck2 size={20} strokeWidth={2.3} />
              {t("Role")}
            </p>
          </TableHead>
          {
            <AuthorizedRender authorizedRoles={["superadmin"]}>
              <TableHead className="max-w-28">
                <p className="flex items-center gap-1 justify-end">
                  <Settings size={20} strokeWidth={2.3} />
                  {t("Options")}
                </p>
              </TableHead>
            </AuthorizedRender>
          }
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          dummyArray.map((_, index) => <UsersTableSkeleton key={index} />)
        ) : userResponse && userResponse.length ? (
          <TableRows userResponse={userResponse} />
        ) : (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center text-lg fond-bold py-5"
            >
              {t("No users found.")}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
