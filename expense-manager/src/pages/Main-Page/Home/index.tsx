import { useSearchAnalyticsQuery } from "../api/analytics";
// import AlertBanner from "../components/home/AlertBanner";
import AnalyticsSkeleton from "../components/home/AnalyticsSkeleton";
import CategoryExpensesCard from "../components/home/CategoryExpensesCard";
import Overview from "../components/home/Overview";
import RecentTransactionsCard from "../components/home/RecentTransactionsCard";

const Home = () => {
  const { data: analytics, isLoading: isLoadingToFetchAnalyticsData } =
    useSearchAnalyticsQuery();

  // const alerts = [
  //   {
  //     message:
  //       "You have more than 10 categories, consider merging some of them to make your life easier",
  //   },
  //   {
  //     message: "You have spent a lot in the past week, chill out",
  //   },
  // ];

  return (
    <div>
      {isLoadingToFetchAnalyticsData ? (
        <AnalyticsSkeleton />
      ) : (
        <div className="grid lg:grid-cols-3 gap-2 w-full">
          <div className="lg:col-span-2 grid gap-2">
            <Overview analytics={analytics} />
            {/* alerts */}
            {/* {alerts.length > 0 && <AlertBanner alerts={alerts} />} */}
            <div className="flex max-lg:flex-col gap-2 w-full">
              {/* <AnalyticsChart1 data={analytics?.totalSpentMonthly} /> */}
            </div>
          </div>
          <div className="grid gap-2">
            <RecentTransactionsCard analytics={analytics} />
            <CategoryExpensesCard analytics={analytics} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
