import { useSearchAnalyticsQuery } from "../api/analytics";
import AlertBanner from "../components/home/AlertBanner";
import AnalyticsSkeleton from "../components/home/AnalyticsSkeleton";
import Overview from "../components/home/Overview";
import RecentTransactionsCard from "../components/home/RecentTransactionsCard";

const Home = () => {
  const { data: analytics, isLoading: isLoadingToFetchAnalyticsData } =
    useSearchAnalyticsQuery();

  const alerts: { message: string }[] = [];
  if (!isLoadingToFetchAnalyticsData) {
    if (
      analytics?.expensesGroupedByCategory.length > 0 &&
      Object.entries(analytics?.expensesGroupedByCategory[0].categories)
        .length > 10
    )
      alerts.push({
        message:
          "You have more than 10 categories, consider merging some of them to make your life easier",
      });
  }

  return (
    <div>
      {isLoadingToFetchAnalyticsData ? (
        <AnalyticsSkeleton />
      ) : (
        <div className="flex gap-2 items-center flex-wrap">
          {alerts.length > 0 && <AlertBanner alerts={alerts} />}
          <div className="flex max-lg:flex-col gap-2 w-full">
            <Overview analytics={analytics} />
            {/* <CategoryExpensesCard analytics={analytics} /> */}
          </div>
          <div className="flex max-lg:flex-col gap-2 w-full">
            {/* <AnalyticsChart1 data={analytics?.totalSpentMonthly} /> */}
            <RecentTransactionsCard analytics={analytics} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
