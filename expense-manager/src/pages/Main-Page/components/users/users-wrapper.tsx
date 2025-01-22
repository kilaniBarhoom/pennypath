import LocalSearchBar from "@/components/shared/loacal-search";
import UsersFilters from "./filters";
// import UsersStats from "./stats";
import TablePagiation from "@/components/shared/pagination";
import { useSearchUsersQuery } from "../../api/Users";
import UsersTable from "./table";

export default function UsersWrapper() {
  const { data: tableResponse, isLoading: isLoadingToFetchUsersData } =
    useSearchUsersQuery();

  return (
    <div className="border flex flex-col gap-2 p-4 rounded-sm">
      <div className="flex items-center justify-between gap-2 md:flex-row flex-col w-full mb-2">
        <div className="md:w-fit w-full">
          <LocalSearchBar
            route="/users"
            placeholder="Search for a user"
            otherClasses="md:w-fit w-full"
          />
        </div>
        <div className="flex gap-2 items-center w-full">
          <UsersFilters usersResponse={tableResponse?.users ?? []} />
        </div>
      </div>
      <UsersTable
        userResponse={tableResponse?.users ?? []}
        isLoading={isLoadingToFetchUsersData}
      />
      <div className="flex items-center w-full border rounded-sm py-2 bg-secondary/50">
        <TablePagiation totalPages={tableResponse?.totalPages ?? 1} />
      </div>
    </div>
  );
}
