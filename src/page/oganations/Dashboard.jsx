import { useEffect, useState } from "react";


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
      const value = {};
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
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="mt-6 space-y-6">
            </div>
          </div>
        )}
      </div>
    </div>
  );
}