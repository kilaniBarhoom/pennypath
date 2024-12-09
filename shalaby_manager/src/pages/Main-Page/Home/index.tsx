import { useSearchAnalyticsQuery } from "../api/analytics";
import { AnalyticsChart1 } from "../components/home/chart";

const Home = () => {
  const { data: analytics, isLoading } = useSearchAnalyticsQuery();
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <AnalyticsChart1 data={analytics?.[0]?.totals} />
      )}
    </div>
  );
};

export default Home;
