import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, MoreHorizontal, Eye, Shield, AlertTriangle, 
  CheckCircle, XCircle, Clock, Star, MapPin, Calendar, Award,
  User, Phone, Mail, Camera, Edit, Ban, Trash2, FileText,
  TrendingUp, Users, Activity, Target, ChevronDown, Download,
  MessageSquare, Flag, History, Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
 
const VolunteerManagementPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);
  const [viewMode, setViewMode] = useState('list');
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  // Mock data
  const [volunteers, setVolunteers] = useState([
    {
      id: 1,
      name: "Nguyễn Thị Lan",
      email: "lan.nguyen@email.com",
      phone: "*******8901",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e70f?w=150",
      status: "finish",
      trustScore: 4.8,
      joinDate: "2024-01-15",
      lastActive: "2024-12-05",
      eventsCompleted: 12,
      hoursContributed: 156,
      skills: ["Giáo dục", "Tổ chức sự kiện", "Marketing"],
      badges: ["finish", "Top Contributor", "Reliable"],
      violations: 0,
      location: "Hà Nội",
      bio: "Tình nguyện viên tích cực với kinh nghiệm 3 năm trong các hoạt động giáo dục và phát triển cộng đồng.",
      impactScore: 2340,
      privacy: "partial"
    },
    {
      id: 2,
      name: "Trần Văn Minh",
      email: "minh.tran@email.com", 
      phone: "*******7890",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      status: "pending",
      trustScore: 0,
      joinDate: "2024-12-01",
      lastActive: "2024-12-05",
      eventsCompleted: 0,
      hoursContributed: 0,
      skills: ["IT", "Thiết kế"],
      badges: [],
      violations: 0,
      location: "TP.HCM",
      bio: "Mới tham gia nền tảng, mong muốn đóng góp vào cộng đồng qua các kỹ năng IT.",
      impactScore: 0,
      privacy: "full"
    },
    {
      id: 3,
      name: "Lê Thị Hương",
      email: "huong.le@email.com",
      phone: "*******6789",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      status: "warned",
      trustScore: 3.2,
      joinDate: "2023-08-20",
      lastActive: "2024-12-04",
      eventsCompleted: 8,
      hoursContributed: 89,
      skills: ["Y tế", "Chăm sóc"],
      badges: ["finish"],
      violations: 2,
      location: "Đà Nẵng",
      bio: "Nhân viên y tế, tham gia các hoạt động tình nguyện về sức khỏe cộng đồng.",
      impactScore: 1150,
      privacy: "partial"
    },
    {
      id: 4,
      name: "Phạm Hoàng Nam",
      email: "nam.pham@email.com",
      phone: "*******5678",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      status: "suspended",
      trustScore: 1.5,
      joinDate: "2024-03-10",
      lastActive: "2024-11-28",
      eventsCompleted: 3,
      hoursContributed: 25,
      skills: ["Logistics"],
      badges: [],
      violations: 5,
      location: "Hà Nội",
      bio: "Tham gia các hoạt động logistics và vận chuyển.",
      impactScore: 240,
      privacy: "full"
    }
  ]);

  const [stats, setStats] = useState({
    total: 1547,
    finish: 892,
    pending: 234,
    warned: 67,
    suspended: 23,
    totalHours: 45230,
    avgTrustScore: 4.2,
    monthlyGrowth: 12.5
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'finish': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'warned': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'finish': return 'Đã xác minh';
      case 'pending': return 'Chờ xác minh';
      case 'warned': return 'Cảnh báo';
      case 'suspended': return 'Tạm khóa';
      default: return status;
    }
  };

  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && volunteer.status === activeTab;
  });

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for volunteers:`, selectedVolunteers);
    setSelectedVolunteers([]);
  };

  const handleVerifyVolunteer = (id) => {
    setVolunteers(prev => prev.map(v => 
      v.id === id ? { ...v, status: 'finish', trustScore: 4.0 } : v
    ));
  };

  const handleSuspendVolunteer = (id) => {
    setVolunteers(prev => prev.map(v => 
      v.id === id ? { ...v, status: 'suspended' } : v
    ));
  };


  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="mb-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng TNV</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">+{stats.monthlyGrowth}% tháng này</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đã cộng tác</p>
                <p className="text-2xl font-bold text-gray-900">{stats.finish.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mt-1">{((stats.finish/stats.total)*100).toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng giờ công</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalHours.toLocaleString()}h</p>
                <p className="text-sm text-blue-600 mt-1">Trung bình {Math.round(stats.totalHours/stats.total)}h/người</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Activity className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Điểm uy tín TB</p>
                <p className="text-2xl flex items-center gap-2 font-bold text-gray-900">{stats.avgTrustScore.toFixed(1)} <Star className={`w-6 h-6 text-yellow-400 fill-current`} /></p>
                <Link to="/btc/profile/evaluate" className="text-sm text-blue-600 mt-1">Xem chi tiết đánh giá</Link>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Target className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm TNV theo tên, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {selectedVolunteers.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{selectedVolunteers.length} đã chọn</span>
                <button 
                  onClick={() => handleBulkAction('verify')}
                  className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-lg hover:bg-green-200"
                >
                  Xác minh
                </button>
                <button 
                  onClick={() => handleBulkAction('suspend')}
                  className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-lg hover:bg-red-200"
                >
                  Tạm khóa
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'all', label: 'Tất cả', count: stats.total },
            { key: 'finish', label: 'Đã cộng tác', count: stats.finish },
            { key: 'pending', label: 'Chờ xác nhận', count: stats.pending },
            { key: 'recommend', label: 'Đề xuất', count: stats.warned },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Volunteers List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedVolunteers(filteredVolunteers.map(v => v.id));
                      } else {
                        setSelectedVolunteers([]);
                      }
                    }}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tình nguyện viên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Điểm uy tín
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hoạt động
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVolunteers.map((volunteer) => (
                <tr key={volunteer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedVolunteers.includes(volunteer.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedVolunteers([...selectedVolunteers, volunteer.id]);
                        } else {
                          setSelectedVolunteers(selectedVolunteers.filter(id => id !== volunteer.id));
                        }
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={volunteer.avatar} 
                        alt={volunteer.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{volunteer.name}</div>
                        <div className="text-sm text-gray-500">{volunteer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(volunteer.status)}`}>
                      {getStatusText(volunteer.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{volunteer.trustScore.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {volunteer.eventsCompleted} sự kiện
                    </div>
                    <div className="text-sm text-gray-500">
                      {volunteer.hoursContributed}h đóng góp
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      volunteer.violations === 0 ? 'bg-green-100 text-green-800' :
                      volunteer.violations < 3 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {volunteer.violations} vi phạm
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {volunteer.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedVolunteer(volunteer);
                          setShowProfile(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="Xem hồ sơ"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {volunteer.status === 'pending' && (
                        <button 
                          onClick={() => handleVerifyVolunteer(volunteer.id)}
                          className="text-green-600 hover:text-green-900 p-1 rounded"
                          title="Xác minh"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {volunteer.status !== 'suspended' && (
                        <button 
                          onClick={() => handleSuspendVolunteer(volunteer.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Tạm khóa"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      )}
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Trước
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Tiếp
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">10</span> của{' '}
                <span className="font-medium">{filteredVolunteers.length}</span> kết quả
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Trước
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Tiếp
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerManagementPage;