import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

const AttendanceTableSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-8 rounded-sm w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 rounded-sm w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 rounded-sm w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 rounded-sm w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 rounded-sm w-full" />
      </TableCell>
    </TableRow>
  );
};

export default AttendanceTableSkeleton;
