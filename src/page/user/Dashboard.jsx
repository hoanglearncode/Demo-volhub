import React, { useState } from "react";
import { 
  BarChart3, 
  TrendingUp,
  Calendar,
  Clock,
  Users,
  Award,
  Star,
  Trophy,
  Target,
  Activity,
  Bell,
  ChevronRight,
  ChevronDown,
  Plus,
  Filter,
  Download,
  Share2,
  Eye,
  Heart,
  MessageSquare,
  MapPin,
  User,
  CheckCircle,
  AlertCircle,
  XCircle,
  ArrowUp,
  ArrowDown,
  Zap,
  Bookmark,
  Globe,
  PieChart,
  LineChart,
  RefreshCw,
  Settings,
  Info,
  ExternalLink,
  Flag,
  Navigation
} from "lucide-react";

export default function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");
  const [showQuickStats, setShowQuickStats] = useState(true);
  const [activeMetric, setActiveMetric] = useState("hours");

  // Mock user data
  const userStats = {
    totalHours: 245,
    completedEvents: 42,
    organizedEvents: 8,
    reputation: 4.8,
    level: "Gold",
    rank: 156,
    badges: 15,
    friends: 234,
    certificates: 12,
    nextLevelHours: 255, // Hours needed for next level
    currentLevelHours: 200 // Hours needed for current level
  };

  // Recent activity data
  const recentActivities = [
    {
      id: 1,
      type: "event_completed",
      title: "Hoàn thành sự kiện 'Làm sạch môi trường Hồ Gươm'",
      time: "2 giờ trước",
      points: "+5 điểm uy tín",
      hours: 4,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      id: 2,
      type: "badge_earned",
      title: "Đạt huy hiệu 'Tình nguyện viên tích cực'",
      time: "1 ngày trước", 
      badge: "Tình nguyện viên tích cực",
      icon: Award,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50"
    },
    {
      id: 3,
      type: "event_registered",
      title: "Đăng ký tham gia 'Dạy học cho trẻ em vùng cao'",
      time: "3 ngày trước",
      role: "Trưởng nhóm",
      icon: Calendar,
      color: "text-blue-500", 
      bgColor: "bg-blue-50"
    },
    {
      id: 4,
      type: "level_up",
      title: "Thăng cấp lên Gold Level",
      time: "1 tuần trước",
      previousLevel: "Silver",
      currentLevel: "Gold",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    }
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Dạy học cho trẻ em vùng cao",
      date: "2025-10-15",
      time: "08:00",
      location: "Sa Pa, Lào Cai",
      role: "Trưởng nhóm",
      participants: "12/15",
      urgency: "high",
      image: "/api/placeholder/100/80"
    },
    {
      id: 2,
      title: "Hỗ trợ người khuyết tật",
      date: "2025-09-30", 
      time: "09:00",
      location: "Hà Nội",
      role: "Tình nguyện viên",
      participants: "40/50",
      urgency: "medium",
      image: "/api/placeholder/100/80"
    },
    {
      id: 3,
      title: "Workshop Leadership cho TNV",
      date: "2025-10-05",
      time: "14:00",
      location: "Online",
      role: "Người học",
      participants: "85/100",
      urgency: "low",
      image: "/api/placeholder/100/80"
    }
  ];

  // Goals and targets
  const goals = [
    {
      id: 1,
      title: "Hoàn thành 300 giờ tình nguyện trong năm",
      current: 245,
      target: 300,
      deadline: "31/12/2025",
      category: "hours",
      color: "blue"
    },
    {
      id: 2,
      title: "Tham gia 50 sự kiện",
      current: 42,
      target: 50,
      deadline: "31/12/2025", 
      category: "events",
      color: "green"
    },
    {
      id: 3,
      title: "Đạt level Platinum",
      current: 245,
      target: 500,
      deadline: "Không thời hạn",
      category: "level",
      color: "purple"
    }
  ];

  // Chart data (mock)
  const chartData = {
    hours: [20, 35, 45, 30, 55, 40, 65, 50, 70, 60, 45, 35],
    events: [2, 4, 3, 5, 4, 6, 5, 7, 6, 4, 3, 2],
    reputation: [4.2, 4.3, 4.1, 4.4, 4.5, 4.6, 4.7, 4.8, 4.7, 4.8, 4.8, 4.8]
  };

  // Quick actions
  const quickActions = [
    {
      title: "Tìm sự kiện mới",
      description: "Khám phá các hoạt động phù hợp",
      icon: Calendar,
      color: "blue",
      action: "explore"
    },
    {
      title: "Tạo sự kiện",
      description: "Tổ chức hoạt động của riêng bạn",
      icon: Plus,
      color: "green", 
      action: "create"
    },
    {
      title: "Kết nối cộng đồng",
      description: "Tham gia các nhóm tình nguyện",
      icon: Users,
      color: "purple",
      action: "connect"
    },
    {
      title: "Xem huy hiệu",
      description: "Theo dõi thành tích của bạn",
      icon: Award,
      color: "yellow",
      action: "badges"
    }
  ];

  // Achievements to unlock
  const nextAchievements = [
    {
      name: "Siêu tình nguyện",
      description: "Hoàn thành 500 giờ tình nguyện",
      progress: 245,
      target: 500,
      icon: Zap,
      rarity: "legendary"
    },
    {
      name: "Người kết nối",
      description: "Có 100 bạn bè trong mạng lưới",
      progress: 78,
      target: 100,
      icon: Users,
      rarity: "rare"
    },
    {
      name: "Chuyên gia tổ chức",
      description: "Tổ chức thành công 20 sự kiện",
      progress: 8,
      target: 20,
      icon: Target,
      rarity: "epic"
    }
  ];

  // Get urgency color
  const getUrgencyColor = (urgency) => {
    const colors = {
      high: "bg-red-100 text-red-700 border-red-200",
      medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
      low: "bg-green-100 text-green-700 border-green-200"
    };
    return colors[urgency] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  // Get level progress
  const getLevelProgress = () => {
    const progress = ((userStats.totalHours - userStats.currentLevelHours) / 
                     (userStats.nextLevelHours - userStats.currentLevelHours)) * 100;
    return Math.min(progress, 100);
  };

  // Get user level color
  const getUserLevelColor = (level) => {
    const colors = {
      Bronze: "from-amber-600 to-orange-600",
      Silver: "from-slate-400 to-slate-600", 
      Gold: "from-yellow-400 to-yellow-600",
      Platinum: "from-purple-400 to-purple-600"
    };
    return colors[level] || "from-blue-500 to-purple-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Chào mừng trở lại, Mai! 👋
              </h1>
              <p className="text-slate-600 mt-2">
                Đây là tổng quan về các hoạt động tình nguyện của bạn
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="week">Tuần này</option>
                <option value="month">Tháng này</option>
                <option value="quarter">Quý này</option>
                <option value="year">Năm này</option>
              </select>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download size={18} />
                Xuất báo cáo
              </button>
            </div>
          </div>
        </div>

        {/* Level Progress Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getUserLevelColor(userStats.level)} flex items-center justify-center text-white font-bold text-lg border-4 border-white/20`}>
                {userStats.level.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{userStats.level} Level</h2>
                <p className="text-blue-100">Xếp hạng #{userStats.rank} toàn quốc</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold mb-1">{userStats.totalHours}h</div>
              <div className="text-blue-100 text-sm">Tổng giờ tình nguyện</div>
            </div>
          </div>
          
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-2">
              <span>Tiến độ lên level tiếp theo</span>
              <span>{userStats.totalHours}/{userStats.nextLevelHours}h</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-white h-3 rounded-full transition-all duration-500"
                style={{ width: `${getLevelProgress()}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-blue-100">
            <span>Còn {userStats.nextLevelHours - userStats.totalHours} giờ để đạt Platinum</span>
            <span>{getLevelProgress().toFixed(0)}% hoàn thành</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Stats & Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="text-blue-600" size={20} />
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <ArrowUp size={14} />
                    <span className="text-xs font-medium">+12%</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">{userStats.totalHours}</div>
                <div className="text-sm text-slate-600">Tổng giờ TNV</div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="text-green-600" size={20} />
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <ArrowUp size={14} />
                    <span className="text-xs font-medium">+5%</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">{userStats.completedEvents}</div>
                <div className="text-sm text-slate-600">Sự kiện hoàn thành</div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="text-yellow-600" size={20} />
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <ArrowUp size={14} />
                    <span className="text-xs font-medium">+0.2</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">{userStats.reputation}</div>
                <div className="text-sm text-slate-600">Điểm uy tín</div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Award className="text-purple-600" size={20} />
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <ArrowUp size={14} />
                    <span className="text-xs font-medium">+3</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">{userStats.badges}</div>
                <div className="text-sm text-slate-600">Huy hiệu đạt được</div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Thống kê hoạt động</h3>
                <div className="flex items-center gap-2">
                  <select
                    value={activeMetric}
                    onChange={(e) => setActiveMetric(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="hours">Giờ tình nguyện</option>
                    <option value="events">Số sự kiện</option>
                    <option value="reputation">Điểm uy tín</option>
                  </select>
                  <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-gray-50 transition-colors">
                    <RefreshCw size={18} />
                  </button>
                </div>
              </div>
              
              {/* Mock Chart */}
              <div className="h-80 flex items-end justify-between gap-2 mb-4">
                {chartData[activeMetric].map((value, index) => {
                  const maxValue = Math.max(...chartData[activeMetric]);
                  const height = (value / maxValue) * 100;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-600 hover:to-blue-500 cursor-pointer"
                        style={{ height: `${height}%` }}
                        title={`Tháng ${index + 1}: ${value}`}
                      ></div>
                      <div className="text-xs text-slate-500 mt-2">T{index + 1}</div>
                    </div>
                  );
                })}
              </div>
              
              <div className="text-center text-sm text-slate-600">
                {activeMetric === 'hours' && 'Giờ tình nguyện theo tháng'}
                {activeMetric === 'events' && 'Số sự kiện tham gia theo tháng'} 
                {activeMetric === 'reputation' && 'Điểm uy tín trung bình theo tháng'}
              </div>
            </div>

            {/* Goals Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Mục tiêu năm 2025</h3>
                <button className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm">
                  <Plus size={16} />
                  Thêm mục tiêu
                </button>
              </div>
              
              <div className="space-y-4">
                {goals.map(goal => {
                  const progress = (goal.current / goal.target) * 100;
                  const isCompleted = goal.current >= goal.target;
                  
                  return (
                    <div key={goal.id} className={`p-4 rounded-lg border-2 transition-all ${
                      isCompleted 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-slate-800">{goal.title}</h4>
                        {isCompleted && <CheckCircle className="text-green-600" size={20} />}
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">
                          {goal.current} / {goal.target} 
                          {goal.category === 'hours' && ' giờ'}
                          {goal.category === 'events' && ' sự kiện'}
                        </span>
                        <span className="text-sm font-medium text-slate-800">
                          {progress.toFixed(0)}%
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            isCompleted ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                      </div>
                      
                      <div className="text-xs text-slate-500">
                        Hạn chót: {goal.deadline}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Activities & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Hành động nhanh</h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <button
                      key={index}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                    >
                      <div className={`p-2 rounded-lg ${
                        action.color === 'blue' ? 'bg-blue-100' :
                        action.color === 'green' ? 'bg-green-100' :
                        action.color === 'purple' ? 'bg-purple-100' :
                        'bg-yellow-100'
                      }`}>
                        <IconComponent className={`${
                          action.color === 'blue' ? 'text-blue-600' :
                          action.color === 'green' ? 'text-green-600' :
                          action.color === 'purple' ? 'text-purple-600' :
                          'text-yellow-600'
                        }`} size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                          {action.title}
                        </div>
                        <div className="text-sm text-slate-600">{action.description}</div>
                      </div>
                      <ChevronRight className="text-slate-400 group-hover:text-slate-600" size={16} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Sự kiện sắp tới</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Xem tất cả
                </button>
              </div>
              
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-16 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-800 truncate">{event.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500">
                          {new Date(event.date).toLocaleDateString('vi-VN')}
                        </span>
                        <span className={`px-2 py-0.5 text-xs rounded-full font-medium border ${getUrgencyColor(event.urgency)}`}>
                          {event.urgency === 'high' ? 'Khẩn cấp' : 
                           event.urgency === 'medium' ? 'Bình thường' : 'Không gấp'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        {event.role} • {event.participants}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Hoạt động gần đây</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Xem tất cả
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map(activity => {
                  const IconComponent = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${activity.bgColor} flex-shrink-0`}>
                        <IconComponent className={activity.color} size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 leading-tight">
                          {activity.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-500">{activity.time}</span>
                          {activity.points && (
                            <span className="text-xs text-green-600 font-medium">{activity.points}</span>
                          )}
                          {activity.hours && (
                            <span className="text-xs text-blue-600">+{activity.hours}h</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Achievements */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Huy hiệu sắp đạt được</h3>
              <div className="space-y-4">
                {nextAchievements.map((achievement, index) => {
                  const IconComponent = achievement.icon;
                  const progress = (achievement.progress / achievement.target) * 100;
                  
                  return (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg ${
                          achievement.rarity === 'legendary' ? 'bg-yellow-100' :
                          achievement.rarity === 'epic' ? 'bg-purple-100' :
                          'bg-blue-100'
                        }`}>
                          <IconComponent className={`${
                            achievement.rarity === 'legendary' ? 'text-yellow-600' :
                            achievement.rarity === 'epic' ? 'text-purple-600' :
                            'text-blue-600'
                          }`} size={20} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-800">{achievement.name}</h4>
                          <p className="text-xs text-slate-600">{achievement.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">
                          {achievement.progress} / {achievement.target}
                        </span>
                        <span className="text-sm font-medium text-slate-800">
                          {progress.toFixed(0)}%
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            achievement.rarity === 'legendary' ? 'bg-yellow-500' :
                            achievement.rarity === 'epic' ? 'bg-purple-500' :
                            'bg-blue-500'
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}