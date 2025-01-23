import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

const ExpensesTableSkeleton = () => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Skeleton className="h-8 rounded-md w-full" />
      </TableCell>
      <TableCell className="md:table-cell">
        <Skeleton className="h-8 rounded-md w-full" />
      </TableCell>
      <TableCell className="md:table-cell">
        <Skeleton className="h-8 rounded-md w-full" />
      </TableCell>
      <TableCell className="md:table-cell">
        <Skeleton className="h-8 rounded-md w-full" />
      </TableCell>
      <TableCell className="md:table-cell">
        <Skeleton className="h-8 rounded-md w-full" />
      </TableCell>
    </TableRow>
  );
};

export default ExpensesTableSkeleton;
