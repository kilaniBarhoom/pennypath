import LocalSearchBar from "@/components/shared/loacal-search";
import { useSearchAttendanceQuery } from "@/pages/Main-Page/api/attendance";
import AttendanceFilters from "./filters";
// import AttendanceStats from "./stats";
import TablePagiation from "@/components/shared/pagination";
import AttendanceTable from "./table";

export default function AttendanceWrapper() {
  const { data: tableResponse, isLoading: isLoadingToFetchAttendanceData } =
    useSearchAttendanceQuery();

  return (
    <div className="w-full flex flex-col gap-2">
      {/* <AttendanceStats
        avgAttendanceTime={tableResponse?.averageAttendanceTime ?? ""}
        avgLeaveTime={tableResponse?.averageLeaveTime ?? ""}
        // analyticsOfUsersAttendances={
        //   tableResponse?.analyticsOfUsersAttendances ?? []
        // }
        loadingToFetchAnalytics={isLoadingToFetchAttendanceData}
      /> */}
      <div className="border flex flex-col gap-2 p-4 rounded-sm">
        <div className="flex items-center sm:flex-row flex-col justify-between gap-2">
          <LocalSearchBar
            route="/attendance"
            placeholder="Search for an attendance"
            otherClasses="sm:w-fit w-full"
          />
          <AttendanceFilters />
        </div>
        <AttendanceTable
          attendance={tableResponse?.attendances ?? []}
          isLoading={isLoadingToFetchAttendanceData}
        />
        <div className="flex items-center w-full border rounded-sm py-2 bg-secondary/50">
          <TablePagiation totalPages={tableResponse?.totalPages ?? 1} />
        </div>
      </div>
    </div>
  );
}
