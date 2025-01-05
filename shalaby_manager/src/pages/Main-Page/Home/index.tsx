import LoadingComponent from "@/components/shared/Loading-component";
import { useSearchAnalyticsQuery } from "../api/analytics";
import { AnalyticsChart1 } from "../components/home/chart";
import RecentTransactionsCard from "../components/home/RecentTransactionsCard";
import WalletBalanceCard from "../components/home/wallet-balance-card";
import WalletSkeleton from "../components/home/WalletSkeleton";
import CategoryExpensesCard from "../components/home/CategoryExpensesCard";

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
        <div className="flex gap-2 items-center flex-wrap">
          <WalletBalanceCard analytics={analytics} />
          <div className="flex max-md:flex-col gap-2 w-full">
            <RecentTransactionsCard analytics={analytics} />
            <CategoryExpensesCard analytics={analytics} />
          </div>
          <AnalyticsChart1 data={analytics?.totalSpentMonthly} />
        </div>
      )}
    </div>
  );
};

export default Home;
