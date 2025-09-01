import { useEffect, useState } from "react";
import { dashboardService } from '../../services/oganations/index.js';
import RecommendedCandidates from '../../components/oganations/RecommendedCandidates.jsx'
import ImportantNotification from '../../components/oganations/ImportantNotification.jsx'
import VerificationBanner from '../../components/oganations/VerificationBanner.jsx'
import ExploreFeatures from '../../components/oganations/ExploreFeatures.jsx'
import SystemUpdates from '../../components/oganations/SystemUpdates.jsx'
import ErrorState from '../../components/oganations/ErrorState.jsx'
import EventStatusCard from "../../components/oganations/EventStatusCard.jsx"
import PostingHeatmap from "../../components/oganations/PostingHeatmap.jsx";
import RegistrationTrendChart from "../../components/oganations/RegistrationTrendChart.jsx";
import KPIDashboard from "../../components/oganations/KPIDashboard.jsx";

export default function Dashboard() {
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [status, setStatus] = useState(404);
  const [notification, setNotification] = useState(null);
  const [recommendedCandidates, setRecommendedCandidates] = useState([]);
  const [systemUpdates, setSystemUpdates] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    setIsError(false);
    
    try {
      const value = await dashboardService.getDashboardData();
      console.log(value.data)
      if (value.success) {
        setData(value.data);
        setNotification(value.data?.notification);
        setRecommendedCandidates(value.data?.recommendedCandidates);
        setSystemUpdates(value.data?.systemUpdates);
      }
      setIsError(!value.success);
    } catch (error) {
      setIsError(true);
      // console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={`bg-gray-50 w-full min-h-screen transition-all duration-300`}>
      {/* Content */}
      <div className="px-6 w-full h-full overflow-y-auto pb-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : isError ? (
          <ErrorState status={status} onRetry={fetchData} />
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="mt-6 space-y-6">
              <ImportantNotification notification={notification} />
              <VerificationBanner isVerified={data?.isVerified} />
              <ExploreFeatures />
              <KPIDashboard />
              <RecommendedCandidates candidates={recommendedCandidates} />
              <SystemUpdates updates={systemUpdates} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}