import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Clock, 
  Star, 
  TrendingUp, 
  FileText, 
  Play, 
  CheckCircle,
  UserCheck,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EventStatusCard from './EventStatusCard';
import KPICard from './KPICard';
import RegistrationTrendChart from './RegistrationTrendChart';
import PostingHeatmap from './PostingHeatmap'
const KPIDashboard = () => {
  // Sample data - trong thực tế sẽ lấy từ API hoặc props
  const [kpiData] = useState({
    events: {
      draft: 8,
      active: 5,
      completed: 23
    },
    volunteers: {
      total: 1247,
      approved: 892,
      showUpRate: 78.5
    },
    totalHours: 3456,
    orgRating: 4.7
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* KPI Cards Grid */}
        <div className="flex flex-col gap-6 mb-8">
          <EventStatusCard events={kpiData.events} />
        </div>

        {/* Second row with rating */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <KPICard
                title="Tổng TNV ứng tuyển"
                value={kpiData.volunteers.total.toLocaleString()}
                subtitle={`${kpiData.volunteers.approved} được duyệt`}
                icon={Users}
                bgColor="bg-blue-50"
                iconColor="bg-blue-500"
                textColor="text-blue-700"
            />
            
            <KPICard
                title="Tỉ lệ show-up"
                value={`${kpiData.volunteers.showUpRate}%`}
                subtitle="Tham gia thực tế"
                icon={UserCheck}
                bgColor="bg-green-50"
                iconColor="bg-green-500"
                textColor="text-green-700"
            />
            
            <KPICard
                title="Tổng giờ đóng góp"
                value={kpiData.totalHours.toLocaleString()}
                subtitle="Giờ tình nguyện"
                icon={Clock}
                bgColor="bg-purple-50"
                iconColor="bg-purple-500"
                textColor="text-purple-700"
            />
            <KPICard
                title="Điểm uy tín tổ chức"
                value={kpiData.orgRating}
                subtitle="Đánh giá từ TNV"
                icon={Star}
                bgColor="bg-yellow-50"
                iconColor="bg-yellow-500"
                textColor="text-yellow-700"
            />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RegistrationTrendChart />
          <PostingHeatmap />
        </div>
      </div>
    </div>
  );
};

export default KPIDashboard;