import { useSearchAnalyticsQuery } from "../api/analytics";
import { AnalyticsChart1 } from "../components/home/chart";
import WalletBalanceCard from "../components/home/wallet-balance-card";
import LoadingComponent from "@/components/shared/Loading-component";
import WalletSkeleton from "../components/home/WalletSkeleton";

const Home = () => {
  const { data: analytics, isLoading: isLoadingToFetchAnalyticsData } =
    useSearchAnalyticsQuery();

  return (
    <div>
      {isLoadingToFetchAnalyticsData ? (
        <div className="grid gap-2 w-full grid-cols-1">
          <div className="border w-full min-h-32 rounded-lg shadow-sm p-6 bg-background">
            <LoadingComponent className="h-full w-full" size={30} />
          </div>
          <WalletSkeleton />
        </div>
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
