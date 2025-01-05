import { Skeleton } from "@/components/ui/skeleton";

export default function WalletSkeleton() {
  return (
    <div className="w-full p-6 bg-background rounded-lg shadow-sm">
      {/* Header */}
      <div className="space-y-2 mb-6">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Balance */}
      <div className="mb-8">
        <Skeleton className="h-12 w-28" />
      </div>

      {/* Transactions */}
      <div className="space-y-4">
        {/* Transaction 1 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Transaction 2 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Transaction 3 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* View all link */}
      <div className="mt-4 flex justify-center">
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}
