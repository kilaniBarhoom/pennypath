import { Skeleton } from "@/components/ui/skeleton";
import { useSearchAnalyticsQuery } from "../api/analytics";
import { AnalyticsChart1 } from "../components/home/chart";

const Home = () => {
  const { data: analytics, isLoading: isLoadingToFetchAnalyticsData } =
    useSearchAnalyticsQuery();
  return (
    <div>
      {isLoadingToFetchAnalyticsData ? (
        <Skeleton className="h-40 w-full" />
      ) : (
        <AnalyticsChart1 data={analytics?.[0]?.totals} />
      )}
    </div>
  );
};

export default Home;
