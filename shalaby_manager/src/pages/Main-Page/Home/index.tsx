import { Skeleton } from "@/components/ui/skeleton";
import { useSearchAnalyticsQuery } from "../api/analytics";
import { AnalyticsChart1 } from "../components/home/chart";
import WalletBalanceCard from "../components/home/wallet-balance-card";

const Home = () => {
  const { data: analytics, isLoading: isLoadingToFetchAnalyticsData } =
    useSearchAnalyticsQuery();

  return (
    <div>
      {isLoadingToFetchAnalyticsData ? (
        <Skeleton className="h-40 w-full" />
      ) : (
        <div className="grid gap-2">
          <AnalyticsChart1 data={analytics?.totalSpentMonthly} />
          <WalletBalanceCard analytics={analytics} />
        </div>
      )}
    </div>
  );
};

export default Home;
