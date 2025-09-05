import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Eye,
  CheckCircle,
  XCircle,
  MessageSquare,
  BookText,
  UserCheck,
  Building2,
  Zap,
  FileText,
  Shield,
  BarChart3,
  Activity
} from 'lucide-react';

const Dashboard = () => {
  // Mock data - trong thực tế sẽ fetch từ API
  const [kpiData, setKpiData] = useState({
    totalUsers: { current: 12847, change: 8.5 },
    activeEvents: { current: 156, change: 12.3 },
    pendingApplications: { current: 234, change: -5.2 },
    pendingApprovals: { current: 47, change: 15.8 },
    systemAlerts: { current: 3, change: -25.0 }
  });

  const [trendData, setTrendData] = useState([
    { name: 'T2', applications: 45, views: 1200, completed: 38 },
    { name: 'T3', applications: 52, views: 1350, completed: 44 },
    { name: 'T4', applications: 48, views: 1180, completed: 41 },
    { name: 'T5', applications: 61, views: 1450, completed: 52 },
    { name: 'T6', applications: 55, views: 1320, completed: 48 },
    { name: 'T7', applications: 73, views: 1680, completed: 65 },
    { name: 'CN', applications: 68, views: 1520, completed: 59 }
  ]);

  const [queueData, setQueueData] = useState([
    { id: 1, type: 'event', title: 'Sự kiện làm sạch bãi biển Vũng Tàu', status: 'pending', priority: 'high', time: '2 giờ trước' },
    { id: 2, type: 'connect', title: 'Yêu cầu kết nối từ UNICEF Vietnam', status: 'pending', priority: 'medium', time: '4 giờ trước' },
    { id: 3, type: 'content', title: 'Bài viết chia sẻ từ Nguyễn Minh Anh', status: 'flagged', priority: 'high', time: '6 giờ trước' },
    { id: 4, type: 'volunteer', title: 'Xác minh hồ sơ TNV - Trần Thị Bình', status: 'pending', priority: 'low', time: '1 ngày trước' },
    { id: 5, type: 'partner', title: 'Đăng ký đối tác mới - Green Earth Foundation', status: 'review', priority: 'medium', time: '2 ngày trước' }
  ]);

  const quickActions = [
    { title: 'Tạo sự kiện mới', icon: Calendar, color: 'bg-blue-500', href: '/admin/events/create' },
    { title: 'Quản lý người dùng', icon: Users, color: 'bg-green-500', href: '/admin/volunteers' },
    { title: 'Kiểm duyệt nội dung', icon: BookText, color: 'bg-purple-500', href: '/admin/content' },
    { title: 'Xem báo cáo', icon: BarChart3, color: 'bg-orange-500', href: '/admin/report' },
    { title: 'Cảnh báo hệ thống', icon: AlertTriangle, color: 'bg-red-500', href: '/admin/system' },
    { title: 'Gửi thông báo', icon: Zap, color: 'bg-yellow-500', href: '/admin/notifications' },
    { title: 'Spotlight sự kiện', icon: Activity, color: 'bg-indigo-500', href: '/admin/spotlight' },
    { title: 'Giám sát hệ thống', icon: Shield, color: 'bg-teal-500', href: '/admin/system/monitor' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'flagged': return 'bg-red-100 text-red-800 border-red-200';
      case 'review': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'event': return Calendar;
      case 'connect': return MessageSquare;
      case 'content': return BookText;
      case 'volunteer': return UserCheck;
      case 'partner': return Building2;
      default: return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Tổng quan hệ thống VHub - Tuần từ 30/08 đến 05/09/2025</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng người dùng</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData.totalUsers.current.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-2">
              {kpiData.totalUsers.change > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              )}
              <span className={`text-sm font-medium ${kpiData.totalUsers.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(kpiData.totalUsers.change)}%
              </span>
              <span className="text-sm text-gray-500 ml-2">vs tuần trước</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sự kiện đang tuyển</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData.activeEvents.current}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm font-medium text-green-600">{kpiData.activeEvents.change}%</span>
              <span className="text-sm text-gray-500 ml-2">vs tuần trước</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đơn đăng ký chờ</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData.pendingApplications.current}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              <span className="text-sm font-medium text-red-600">{Math.abs(kpiData.pendingApplications.change)}%</span>
              <span className="text-sm text-gray-500 ml-2">vs tuần trước</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Chờ kiểm duyệt</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData.pendingApprovals.current}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm font-medium text-green-600">{kpiData.pendingApprovals.change}%</span>
              <span className="text-sm text-gray-500 ml-2">vs tuần trước</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cảnh báo hệ thống</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData.systemAlerts.current}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm font-medium text-green-600">{Math.abs(kpiData.systemAlerts.change)}%</span>
              <span className="text-sm text-gray-500 ml-2">vs tuần trước</span>
            </div>
          </div>
        </div>

        {/* Charts and Queue Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Trend Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Xu hướng hoạt động (7 ngày qua)</h2>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>Ứng tuyển</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Lượt xem</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                  <span>Hoàn thành</span>
                </div>
              </div>
            </div>
            
            {/* Simple Chart Representation */}
            <div className="space-y-4">
              {trendData.map((day, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-8 text-sm font-medium text-gray-600">{day.name}</div>
                  <div className="flex-1 flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <div 
                        className="bg-blue-500 h-4 rounded"
                        style={{ width: `${(day.applications / 80) * 100}px` }}
                      ></div>
                      <span className="text-xs text-gray-500">{day.applications}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div 
                        className="bg-green-500 h-4 rounded"
                        style={{ width: `${(day.views / 2000) * 100}px` }}
                      ></div>
                      <span className="text-xs text-gray-500">{day.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div 
                        className="bg-purple-500 h-4 rounded"
                        style={{ width: `${(day.completed / 80) * 100}px` }}
                      ></div>
                      <span className="text-xs text-gray-500">{day.completed}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-gray-900">156 TNV mới đăng ký</p>
                  <p className="text-xs text-gray-500">2 giờ trước</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-gray-900">23 sự kiện được tạo mới</p>
                  <p className="text-xs text-gray-500">4 giờ trước</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-gray-900">89 kết nối được chấp thuận</p>
                  <p className="text-xs text-gray-500">6 giờ trước</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-gray-900">12 nội dung được kiểm duyệt</p>
                  <p className="text-xs text-gray-500">8 giờ trước</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-gray-900">3 cảnh báo bảo mật</p>
                  <p className="text-xs text-gray-500">1 ngày trước</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Queue and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Queue */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Hàng đợi cần xử lý</h2>
              <span className="text-sm text-gray-500">{queueData.length} mục</span>
            </div>
            
            <div className="space-y-4">
              {queueData.map((item) => {
                const TypeIcon = getTypeIcon(item.type);
                return (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3 flex-1">
                      <TypeIcon className="h-5 w-5 text-gray-600 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                          <span className={`text-xs font-medium ${getPriorityColor(item.priority)}`}>
                            {item.priority}
                          </span>
                          <span className="text-xs text-gray-500">{item.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                Xem tất cả hàng đợi →
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Thao tác nhanh</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  onClick={() => console.log(`Navigate to ${action.href}`)}
                >
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 text-center leading-tight">{action.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;