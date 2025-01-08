import { useSearchAnalyticsQuery } from "../api/analytics";
import AnalyticsSkeleton from "../components/home/AnalyticsSkeleton";
import CategoryExpensesCard from "../components/home/CategoryExpensesCard";
import { AnalyticsChart1 } from "../components/home/chart";
import Overview from "../components/home/Overview";
import RecentTransactionsCard from "../components/home/RecentTransactionsCard";

const Home = () => {
  const { data: analytics, isLoading: isLoadingToFetchAnalyticsData } =
    useSearchAnalyticsQuery();

  return (
    <div>
      {isLoadingToFetchAnalyticsData ? (
        <AnalyticsSkeleton />
      ) : (
        <div className="flex gap-2 items-center flex-wrap">
          <div className="flex max-lg:flex-col gap-2 w-full">
            <Overview analytics={analytics} />
            <CategoryExpensesCard analytics={analytics} />
          </div>
          <div className="flex max-lg:flex-col gap-2 w-full">
            <AnalyticsChart1 data={analytics?.totalSpentMonthly} />
            <RecentTransactionsCard analytics={analytics} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
