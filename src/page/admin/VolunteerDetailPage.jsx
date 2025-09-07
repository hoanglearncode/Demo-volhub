import React, { useState } from 'react';
import { 
  Search, Filter, MoreHorizontal, Eye, Shield, AlertTriangle, 
  CheckCircle, XCircle, Clock, Star, MapPin, Calendar, Award,
  User, Phone, Mail, Camera, Edit, Ban, Trash2, FileText,
  TrendingUp, Users, Activity, Target, ChevronDown, Download,
  MessageSquare, Flag, History, Settings, ArrowLeft, Share2,
  Heart, ThumbsUp, Clock3, DollarSign, BookOpen, Zap,
  AlertCircle, Info, CheckSquare, X, Plus, Minus
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadialBarChart, RadialBar
} from 'recharts';

export default function VolunteerDetailPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViolationModal, setShowViolationModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  // ---------------------------
  // Mock volunteer data (replace with API data)
  // ---------------------------
  const volunteerData = {
    id: 1,
    name: "Nguyễn Thị Lan",
    email: "lan.nguyen@email.com",
    phone: "0901234567",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e70f?w=150",
    coverPhoto: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200",
    status: "verified",
    trustScore: 4.8,
    joinDate: "2024-01-15T10:30:00Z",
    lastActive: "2024-12-05T14:20:00Z",
    lastSeen: "2024-12-05T18:45:00Z",
    location: {
      city: "Hà Nội",
      district: "Ba Đình",
      fullAddress: "123 Điện Biên Phủ, Ba Đình, Hà Nội"
    },
    personalInfo: {
      dateOfBirth: "1995-03-15",
      gender: "Nữ",
      education: "Đại học Kinh tế Quốc dân",
      occupation: "Giáo viên Tiếng Anh",
      maritalStatus: "Độc thân",
      idNumber: "001095****",
      emergencyContact: {
        name: "Nguyễn Văn Nam",
        relationship: "Anh trai",
        phone: "0912345678"
      }
    },
    bio: "Tình nguyện viên tích cực với kinh nghiệm 3 năm trong các hoạt động giáo dục và phát triển cộng đồng. Đam mê giúp đỡ trẻ em có hoàn cảnh khó khăn và tham gia các dự án bảo vệ môi trường.",
    skills: [
      { name: "Giáo dục", level: "Expert", verified: true },
      { name: "Tổ chức sự kiện", level: "Advanced", verified: true },
      { name: "Marketing", level: "Intermediate", verified: false },
      { name: "Tiếng Anh", level: "Expert", verified: true },
      { name: "Nhiếp ảnh", level: "Beginner", verified: false }
    ],
    languages: ["Tiếng Việt (Bản ngữ)", "Tiếng Anh (Thành thạo)", "Tiếng Trung (Cơ bản)"],
    interests: ["Giáo dục", "Môi trường", "Trẻ em", "Nghệ thuật", "Du lịch"],
    stats: {
      eventsCompleted: 24,
      eventsRegistered: 28,
      hoursContributed: 312,
      impactScore: 4680,
      ratingsReceived: 18,
      avgRating: 4.7,
      completionRate: 95.8,
      punctualityRate: 98.2,
      responseRate: 92.1,
      teamworkScore: 4.6
    },
    badges: [
      { name: "Top Contributor", icon: "⭐", earnedDate: "2024-11-01", description: "Hoàn thành 20+ sự kiện với đánh giá cao" },
      { name: "Reliable Volunteer", icon: "🎯", earnedDate: "2024-09-15", description: "Tỷ lệ hoàn thành 95%+" },
      { name: "Community Leader", icon: "👑", earnedDate: "2024-08-20", description: "Dẫn dắt 5+ nhóm tình nguyện" },
      { name: "Education Champion", icon: "📚", earnedDate: "2024-07-10", description: "Chuyên gia trong lĩnh vực giáo dục" }
    ],
    eventHistory: [
      { id: "EVT-001", title: "Dạy học cho trẻ em vùng cao", category: "Giáo dục", date: "2024-11-20", status: "completed", rating: 4.9, hours: 16, role: "Team Leader", feedback: "Lan rất tận tâm và có kỹ năng dạy học tuyệt vời. Các em học sinh rất yêu thích." },
      { id: "EVT-002", title: "Làm sạch bờ biển Vũng Tàu", category: "Môi trường", date: "2024-10-15", status: "completed", rating: 4.6, hours: 8, role: "Volunteer", feedback: "Tham gia tích cực và có tinh thần trách nhiệm cao." },
      { id: "EVT-003", title: "Tổ chức Mid-Autumn Festival", category: "Cộng đồng", date: "2024-09-22", status: "completed", rating: 4.8, hours: 12, role: "Event Coordinator", feedback: "Kỹ năng tổ chức sự kiện xuất sắc, sự kiện diễn ra rất thành công." }
    ],
    violations: [],
    warnings: [],
    verificationStatus: {
      identity: { status: "verified", date: "2024-01-16", verifiedBy: "Admin A" },
      phone: { status: "verified", date: "2024-01-15", verifiedBy: "System" },
      email: { status: "verified", date: "2024-01-15", verifiedBy: "System" },
      background: { status: "verified", date: "2024-01-20", verifiedBy: "Admin B" },
      skills: { status: "partial", date: "2024-02-01", verifiedBy: "Admin C" }
    },
    privacy: {
      profileVisibility: "public",
      phoneVisibility: "verified_only",
      emailVisibility: "organizers_only",
      activityVisibility: "public",
      skillsVisibility: "public"
    },
    performanceData: [
      { month: "T7", events: 3, hours: 24, rating: 4.6 },
      { month: "T8", events: 4, hours: 32, rating: 4.7 },
      { month: "T9", events: 5, hours: 40, rating: 4.8 },
      { month: "T10", events: 4, hours: 28, rating: 4.5 },
      { month: "T11", events: 6, hours: 48, rating: 4.9 },
      { month: "T12", events: 2, hours: 16, rating: 4.8 }
    ],
    financialData: {
      totalEarnings: 0,
      allowancesReceived: 1500000,
      reimbursements: 450000,
      donationsMade: 2000000
    }
  };

  // ---------------------------
  // Helpers
  // ---------------------------
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    // if invalid date, just return original
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getStatusConfig = (status) => {
    const configs = {
      verified: { color: 'bg-green-100 text-green-800', label: 'Đã xác minh', icon: CheckCircle },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Chờ xác minh', icon: Clock },
      warned: { color: 'bg-orange-100 text-orange-800', label: 'Cảnh báo', icon: AlertTriangle },
      suspended: { color: 'bg-red-100 text-red-800', label: 'Tạm khóa', icon: Ban }
    };
    return configs[status] || configs.pending;
  };

  const handleStatusChange = (newStatus) => {
    // TODO: call API to change status; for now just log & close modals if any
    console.log(`Changing status to: ${newStatus}`);
  };

  const handleSendMessage = () => setShowMessageModal(true);
  const handleAddViolation = () => setShowViolationModal(true);

  const statusConfig = getStatusConfig(volunteerData.status);
  const StatusIcon = statusConfig.icon;

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: User },
    { id: 'activity', label: 'Hoạt động', icon: Activity },
    { id: 'verification', label: 'Xác minh', icon: Shield },
    { id: 'performance', label: 'Hiệu suất', icon: TrendingUp },
    { id: 'settings', label: 'Cài đặt', icon: Settings }
  ];

  // ---------------------------
  // Render
  // ---------------------------
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Chi tiết Tình nguyện viên</h1>
                <p className="text-gray-600">ID: {volunteerData.id}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button onClick={handleSendMessage} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <MessageSquare className="w-4 h-4 mr-2" /> Nhắn tin
              </button>

              <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <Share2 className="w-4 h-4 mr-2" /> Chia sẻ
              </button>

              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div
                className="h-32 relative bg-cover bg-center"
                style={{ backgroundImage: `url(${volunteerData.coverPhoto})` }}
              >
                <div className="absolute inset-0 bg-black opacity-20" />
              </div>

              <div className="relative px-6 pb-6">
                <div className="flex justify-center -mt-12">
                  <img src={volunteerData.avatar} alt={volunteerData.name} className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover" />
                </div>

                <div className="text-center mt-4">
                  <h2 className="text-xl font-bold text-gray-900">{volunteerData.name}</h2>
                  <p className="text-gray-600 mt-1">{volunteerData.personalInfo.occupation}</p>

                  <div className="flex items-center justify-center mt-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}>
                      <StatusIcon className="w-4 h-4 mr-1" /> {statusConfig.label}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="text-2xl font-bold text-blue-600">{volunteerData.trustScore}</div>
                    <div className="flex justify-center mt-1">
                      {[1,2,3,4,5].map(star => (
                        <Star key={star} className={`w-4 h-4 ${star <= Math.round(volunteerData.trustScore) ? 'text-yellow-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Điểm uy tín</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600"><MapPin className="w-4 h-4" /><span>{volunteerData.location.city}</span></div>
                  <div className="flex items-center space-x-2 text-gray-600"><Mail className="w-4 h-4" /><span>{volunteerData.email}</span></div>
                  <div className="flex items-center space-x-2 text-gray-600"><Phone className="w-4 h-4" /><span>{volunteerData.phone}</span></div>
                  <div className="flex items-center space-x-2 text-gray-600"><Calendar className="w-4 h-4" /><span>Tham gia {formatDate(volunteerData.joinDate)}</span></div>
                </div>

                <div className="mt-6 space-y-2">
                  {volunteerData.status === 'pending' && (
                    <button onClick={() => handleStatusChange('verified')} className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-2" /> Xác minh
                    </button>
                  )}
                  <button onClick={handleAddViolation} className="w-full flex items-center justify-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                    <Flag className="w-4 h-4 mr-2" /> Thêm cảnh báo
                  </button>
                  {volunteerData.status !== 'suspended' && (
                    <button onClick={() => handleStatusChange('suspended')} className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      <Ban className="w-4 h-4 mr-2" /> Tạm khóa
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Thống kê nhanh</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center"><span className="text-gray-600">Sự kiện hoàn thành</span><span className="font-semibold">{volunteerData.stats.eventsCompleted}</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-600">Giờ đóng góp</span><span className="font-semibold">{volunteerData.stats.hoursContributed}h</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-600">Impact Score</span><span className="font-semibold text-blue-600">{volunteerData.stats.impactScore}</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-600">Tỷ lệ hoàn thành</span><span className="font-semibold text-green-600">{volunteerData.stats.completionRate}%</span></div>
              </div>
            </div>

            {/* Recent activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2"><div className="w-2 h-2 bg-green-500 rounded-full" /> <span>Online 2 giờ trước</span></div>
                <div className="flex items-center space-x-2"><div className="w-2 h-2 bg-blue-500 rounded-full" /> <span>Hoàn thành "Dạy học vùng cao"</span></div>
                <div className="flex items-center space-x-2"><div className="w-2 h-2 bg-purple-500 rounded-full" /> <span>Đăng ký sự kiện mới</span></div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 px-6">
                  {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                      <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                        <Icon className="w-4 h-4 mr-2" /> {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Giới thiệu</h3>
                      <p className="text-gray-700 leading-relaxed">{volunteerData.bio}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Kỹ năng</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {volunteerData.skills.map((skill, i) => (
                          <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">{skill.name}</span>
                              {skill.verified && <Shield className="w-4 h-4 text-blue-500" />}
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${skill.level === 'Expert' ? 'bg-green-100 text-green-800' : skill.level === 'Advanced' ? 'bg-blue-100 text-blue-800' : skill.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>{skill.level}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Ngôn ngữ</h3>
                        <div className="space-y-2">
                          {volunteerData.languages.map((l, i) => <div key={i} className="flex items-center space-x-2"><div className="w-2 h-2 bg-blue-500 rounded-full" /> <span>{l}</span></div>)}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Sở thích</h3>
                        <div className="flex flex-wrap gap-2">
                          {volunteerData.interests.map((it, i) => <span key={i} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">{it}</span>)}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Huy hiệu & Thành tựu</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {volunteerData.badges.map((b, i) => (
                          <div key={i} className="flex items-start space-x-3 p-4 border rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50">
                            <div className="text-2xl">{b.icon}</div>
                            <div>
                              <h4 className="font-medium text-gray-900">{b.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{b.description}</p>
                              <p className="text-xs text-gray-500 mt-2">Đạt được: {formatDate(b.earnedDate)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Thông tin cá nhân</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div><label className="text-sm font-medium text-gray-700">Ngày sinh</label><p className="text-gray-900">{new Date(volunteerData.personalInfo.dateOfBirth).toLocaleDateString('vi-VN')}</p></div>
                          <div><label className="text-sm font-medium text-gray-700">Giới tính</label><p className="text-gray-900">{volunteerData.personalInfo.gender}</p></div>
                          <div><label className="text-sm font-medium text-gray-700">Học vấn</label><p className="text-gray-900">{volunteerData.personalInfo.education}</p></div>
                        </div>
                        <div className="space-y-3">
                          <div><label className="text-sm font-medium text-gray-700">Nghề nghiệp</label><p className="text-gray-900">{volunteerData.personalInfo.occupation}</p></div>
                          <div><label className="text-sm font-medium text-gray-700">Tình trạng hôn nhân</label><p className="text-gray-900">{volunteerData.personalInfo.maritalStatus}</p></div>
                          <div><label className="text-sm font-medium text-gray-700">CMND/CCCD</label><p className="text-gray-900">{volunteerData.personalInfo.idNumber}</p></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Activity tab */}
                {activeTab === 'activity' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Biểu đồ hoạt động</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={volunteerData.performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="events" name="Sự kiện" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} />
                          <Area type="monotone" dataKey="hours" name="Giờ" stroke="#10b981" fill="#10b981" fillOpacity={0.15} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Lịch sử tham gia</h3>
                      <div className="space-y-4">
                        {volunteerData.eventHistory.map(ev => (
                          <div key={ev.id} className="border rounded-lg p-4 hover:bg-gray-50">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{ev.title}</h4>
                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                  <span className="flex items-center space-x-1"><Calendar className="w-4 h-4" /><span>{new Date(ev.date).toLocaleDateString('vi-VN')}</span></span>
                                  <span className="flex items-center space-x-1"><Clock className="w-4 h-4" /><span>{ev.hours} giờ</span></span>
                                  <span className="flex items-center space-x-1"><Star className="w-4 h-4" /><span>{ev.rating}</span></span>
                                </div>
                                <p className="text-sm text-gray-700 mt-3">{ev.feedback}</p>
                              </div>
                              <div className="ml-4 text-sm text-gray-500">
                                <div className="mb-2"><span className="px-2 py-1 rounded-full bg-gray-100">{ev.role}</span></div>
                                <div className="flex gap-2">
                                  <button className="flex items-center gap-2 px-3 py-1 border rounded text-sm hover:bg-gray-50"><Eye className="w-4 h-4" /> Xem</button>
                                  <button className="flex items-center gap-2 px-3 py-1 border rounded text-sm hover:bg-gray-50"><Download className="w-4 h-4" /> Báo cáo</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Verification tab */}
                {activeTab === 'verification' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Trạng thái xác minh</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(volunteerData.verificationStatus).map(([key, val]) => {
                        const Icon = val.status === 'verified' ? CheckCircle : val.status === 'partial' ? Info : XCircle;
                        const color = val.status === 'verified' ? 'text-green-600' : val.status === 'partial' ? 'text-yellow-600' : 'text-red-600';
                        return (
                          <div key={key} className="p-4 border rounded-lg flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium capitalize">{key}</div>
                              <div className="text-xs text-gray-500">Xác minh: {val.date} • bởi {val.verifiedBy}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Icon className={`${color} w-5 h-5`} />
                              <button onClick={() => handleStatusChange(key)} className="px-3 py-1 border rounded text-sm">Gửi lại xác minh</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Performance tab */}
                {activeTab === 'performance' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Hiệu suất & Điểm</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="p-4 border rounded-lg text-center">
                          <div className="text-sm text-gray-600">Avg Rating</div>
                          <div className="text-2xl font-semibold">{volunteerData.stats.avgRating}</div>
                          <div className="text-xs text-gray-500">{volunteerData.stats.ratingsReceived} đánh giá</div>
                        </div>
                        <div className="p-4 border rounded-lg text-center">
                          <div className="text-sm text-gray-600">Punctuality</div>
                          <div className="text-2xl font-semibold">{volunteerData.stats.punctualityRate}%</div>
                          <div className="text-xs text-gray-500">Tỷ lệ đúng giờ</div>
                        </div>
                        <div className="p-4 border rounded-lg text-center">
                          <div className="text-sm text-gray-600">Response Rate</div>
                          <div className="text-2xl font-semibold">{volunteerData.stats.responseRate}%</div>
                          <div className="text-xs text-gray-500">Phản hồi tổ chức</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Xu hướng điểm theo tháng</h4>
                        <ResponsiveContainer width="100%" height={260}>
                          <LineChart data={volunteerData.performanceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="rating" stroke="#f59e0b" strokeWidth={2} />
                            <Line type="monotone" dataKey="events" stroke="#3b82f6" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}

                {/* Settings tab */}
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Cài đặt riêng tư & hiển thị</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2"><div><div className="text-sm font-medium">Hiển thị hồ sơ</div><div className="text-xs text-gray-500">Ai có thể xem hồ sơ</div></div>
                          <select defaultValue={volunteerData.privacy.profileVisibility} className="px-3 py-1 border rounded">
                            <option value="public">Công khai</option>
                            <option value="organizers_only">Chỉ tổ chức</option>
                            <option value="private">Riêng tư</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between mb-2"><div className="text-sm font-medium">Phone visibility</div>
                          <select defaultValue={volunteerData.privacy.phoneVisibility} className="px-3 py-1 border rounded">
                            <option value="verified_only">Chỉ sau xác minh</option>
                            <option value="organizers_only">Chỉ tổ chức</option>
                            <option value="private">Riêng tư</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between"><div className="text-sm font-medium">Email visibility</div>
                          <select defaultValue={volunteerData.privacy.emailVisibility} className="px-3 py-1 border rounded">
                            <option value="organizers_only">Chỉ tổ chức</option>
                            <option value="private">Riêng tư</option>
                          </select>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="mb-3"><div className="text-sm font-medium">Activity Visibility</div><div className="text-xs text-gray-500">Ai có thể xem các hoạt động đã tham gia</div></div>
                        <select defaultValue={volunteerData.privacy.activityVisibility} className="px-3 py-1 border rounded w-full">
                          <option value="public">Công khai</option>
                          <option value="organizers_only">Chỉ tổ chức</option>
                          <option value="private">Riêng tư</option>
                        </select>

                        <div className="mt-4">
                          <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked={volunteerData.privacy.skillsVisibility === 'public'} /> Cho phép hiển thị kỹ năng</label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowMessageModal(false)} />
          <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">Gửi tin nhắn tới {volunteerData.name}</h3>
            <textarea className="w-full p-3 border rounded mb-3" rows={5} placeholder="Nhập tin nhắn..."></textarea>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowMessageModal(false)} className="px-4 py-2 border rounded">Hủy</button>
              <button onClick={() => { setShowMessageModal(false); alert('Tin nhắn đã gửi (mock)'); }} className="px-4 py-2 bg-blue-600 text-white rounded">Gửi</button>
            </div>
          </div>
        </div>
      )}

      {showViolationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowViolationModal(false)} />
          <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">Thêm cảnh báo / vi phạm</h3>
            <select className="w-full p-2 border rounded mb-3">
              <option value="warning">Cảnh báo</option>
              <option value="violation">Vi phạm</option>
            </select>
            <textarea className="w-full p-3 border rounded mb-3" rows={4} placeholder="Mô tả lý do..." />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowViolationModal(false)} className="px-4 py-2 border rounded">Hủy</button>
              <button onClick={() => { setShowViolationModal(false); alert('Đã thêm cảnh báo (mock)'); }} className="px-4 py-2 bg-orange-600 text-white rounded">Thêm</button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowEditModal(false)} />
          <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-3">Chỉnh sửa hồ sơ</h3>
            {/* For brevity: simple mock form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input className="p-2 border rounded" defaultValue={volunteerData.name} />
              <input className="p-2 border rounded" defaultValue={volunteerData.email} />
              <input className="p-2 border rounded" defaultValue={volunteerData.phone} />
              <input className="p-2 border rounded" defaultValue={volunteerData.personalInfo.occupation} />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 border rounded">Hủy</button>
              <button onClick={() => { setShowEditModal(false); alert('Lưu thay đổi (mock)'); }} className="px-4 py-2 bg-green-600 text-white rounded">Lưu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
