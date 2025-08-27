import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  FileText,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Calendar,
  MessageSquare,
  Shield,
  Activity,
  BarChart3,
  PieChart,
  Download,
  Bell,
  Search,
  Filter,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie } from 'recharts';

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState('7d');
  
  // Mock data
  const stats = {
    totalUsers: 15420,
    userGrowth: 12.5,
    activeJobs: 89,
    jobsGrowth: 8.2,
    pendingApplications: 234,
    applicationsGrowth: -5.3,
    moderationQueue: 47,
    moderationGrowth: 15.7,
    systemAlerts: 3,
    alertsGrowth: -25.0
  };

  const chartData = [
    { name: 'T2', applications: 45, views: 120, users: 23 },
    { name: 'T3', applications: 52, views: 135, users: 28 },
    { name: 'T4', applications: 38, views: 98, users: 19 },
    { name: 'T5', applications: 67, views: 180, users: 34 },
    { name: 'T6', applications: 72, views: 195, users: 41 },
    { name: 'T7', applications: 89, views: 230, users: 38 },
    { name: 'CN', applications: 34, views: 145, users: 22 }
  ];

  const jobStatusData = [
    { name: 'Đang tuyển', value: 45, color: '#10b981' },
    { name: 'Tạm dừng', value: 23, color: '#f59e0b' },
    { name: 'Đã đóng', value: 21, color: '#ef4444' },
    { name: 'Nháp', value: 12, color: '#6b7280' }
  ];

  const recentApplications = [
    { id: 1, candidate: 'Nguyễn Văn A', job: 'Senior Developer', status: 'pending', time: '5 phút trước', avatar: 'A' },
    { id: 2, candidate: 'Trần Thị B', job: 'UI/UX Designer', status: 'reviewing', time: '12 phút trước', avatar: 'B' },
    { id: 3, candidate: 'Lê Văn C', job: 'Product Manager', status: 'approved', time: '25 phút trước', avatar: 'C' },
    { id: 4, candidate: 'Phạm Thị D', job: 'Marketing Executive', status: 'rejected', time: '1 giờ trước', avatar: 'D' },
    { id: 5, candidate: 'Hoàng Văn E', job: 'Data Analyst', status: 'pending', time: '2 giờ trước', avatar: 'E' }
  ];

  const topJobs = [
    { title: 'Senior Full-stack Developer', applications: 89, views: 1250, status: 'active' },
    { title: 'UI/UX Designer', applications: 67, views: 980, status: 'active' },
    { title: 'Product Manager', applications: 54, views: 850, status: 'paused' },
    { title: 'DevOps Engineer', applications: 43, views: 720, status: 'active' },
    { title: 'Marketing Manager', applications: 38, views: 650, status: 'active' }
  ];

  const StatCard = ({ title, value, change, icon: Icon, color = "blue" }) => {
    const isPositive = change > 0;
    const colorClasses = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      orange: 'bg-orange-50 text-orange-600',
      red: 'bg-red-50 text-red-600',
      purple: 'bg-purple-50 text-purple-600'
    };

    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{value.toLocaleString()}</p>
            <div className={`flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="ml-1 font-medium">{Math.abs(change)}%</span>
              <span className="ml-1 text-gray-500">so với tuần trước</span>
            </div>
          </div>
          <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
            <Icon size={24} />
          </div>
        </div>
      </div>
    );
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewing: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      active: 'bg-green-100 text-green-800',
      paused: 'bg-yellow-100 text-yellow-800'
    };
    
    const labels = {
      pending: 'Chờ xử lý',
      reviewing: 'Đang xem xét',
      approved: 'Đã duyệt',
      rejected: 'Từ chối',
      active: 'Đang tuyển',
      paused: 'Tạm dừng'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Tuyển dụng</h1>
            <p className="text-gray-600 mt-1">Tổng quan hoạt động nền tảng tuyển dụng</p>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={timeFilter} 
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7d">7 ngày qua</option>
              <option value="30d">30 ngày qua</option>
              <option value="90d">90 ngày qua</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download size={16} />
              Xuất báo cáo
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard
            title="Tổng người dùng"
            value={stats.totalUsers}
            change={stats.userGrowth}
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Việc làm đang tuyển"
            value={stats.activeJobs}
            change={stats.jobsGrowth}
            icon={Briefcase}
            color="green"
          />
          <StatCard
            title="Đơn ứng tuyển chờ"
            value={stats.pendingApplications}
            change={stats.applicationsGrowth}
            icon={Clock}
            color="orange"
          />
          <StatCard
            title="Chờ kiểm duyệt"
            value={stats.moderationQueue}
            change={stats.moderationGrowth}
            icon={AlertTriangle}
            color="red"
          />
          <StatCard
            title="Cảnh báo hệ thống"
            value={stats.systemAlerts}
            change={stats.alertsGrowth}
            icon={Shield}
            color="purple"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications Trend */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Xu hướng ứng tuyển</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Ứng tuyển</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Lượt xem</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="applications" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                <Area type="monotone" dataKey="views" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Job Status Distribution */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Phân bố trạng thái việc làm</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={jobStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {jobStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Applications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Ứng tuyển gần đây</h3>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Xem tất cả
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium">
                        {app.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{app.candidate}</p>
                        <p className="text-sm text-gray-600">{app.job}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(app.status)}
                      <p className="text-xs text-gray-500 mt-1">{app.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Jobs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Việc làm hàng đầu</h3>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Xem tất cả
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topJobs.map((job, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-medium text-gray-900">{job.title}</p>
                        {getStatusBadge(job.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users size={14} />
                          {job.applications} ứng tuyển
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={14} />
                          {job.views} lượt xem
                        </span>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { icon: Briefcase, label: 'Tạo việc làm mới', color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
              { icon: Users, label: 'Quản lý người dùng', color: 'bg-green-50 text-green-600 hover:bg-green-100' },
              { icon: FileText, label: 'Kiểm duyệt nội dung', color: 'bg-orange-50 text-orange-600 hover:bg-orange-100' },
              { icon: BarChart3, label: 'Xem báo cáo', color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
              { icon: AlertTriangle, label: 'Cảnh báo hệ thống', color: 'bg-red-50 text-red-600 hover:bg-red-100' },
              { icon: Activity, label: 'Giám sát hệ thống', color: 'bg-gray-50 text-gray-600 hover:bg-gray-100' }
            ].map((action, index) => (
              <button
                key={index}
                className={`p-4 rounded-lg transition-colors text-center ${action.color}`}
              >
                <action.icon size={24} className="mx-auto mb-2" />
                <span className="text-sm font-medium block">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;