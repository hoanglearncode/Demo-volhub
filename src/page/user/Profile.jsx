import React, { useState } from "react";
import { 
  User, 
  Edit3,
  Camera,
  Mail,
  Phone,
  MapPin,
  Award,
  Star,
  Trophy,
  Clock,
  Users,
  Heart,
  Shield,
  Globe,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Link,
  Settings,
  Eye,
  EyeOff,
  Check,
  X,
  Plus,
  Trash2,
  Save,
  Upload,
  Download,
  Share2,
  Flag,
  BookOpen,
  Briefcase,
  GraduationCap,
  Target,
  Activity,
  TrendingUp,
  BarChart3,
  PieChart,
  Calendar as CalendarIcon,
  MessageSquare,
  Bell,
  Lock,
  ChevronRight,
  ExternalLink,
  Copy,
  QrCode,
  UserCheck,
  Zap,
  CheckCircle
} from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showQRCode, setShowQRCode] = useState(false);
  
  // User profile data
  const [userProfile, setUserProfile] = useState({
    // Basic Info
    name: "Nguyễn Thị Mai",
    email: "mai.nguyen@email.com",
    phone: "0123456789",
    dateOfBirth: "1998-05-15",
    gender: "female",
    location: "Hà Nội, Việt Nam",
    bio: "Tôi là một tình nguyện viên nhiệt huyết với 3 năm kinh nghiệm trong các hoạt động cộng đồng. Đam mê giáo dục và bảo vệ môi trường. Luôn sẵn sàng đóng góp cho xã hội và học hỏi những điều mới mẻ.",
    avatar: "/api/placeholder/200/200",
    coverImage: "/api/placeholder/800/300",
    
    // Verification & Status
    isVerified: true,
    level: "Gold",
    joinDate: "2022-03-15",
    lastActive: "Hôm nay",
    
    // Social Links
    socialLinks: {
      facebook: "https://facebook.com/mai.nguyen",
      linkedin: "https://linkedin.com/in/mai-nguyen",
      instagram: "@mai_volunteer",
      website: "https://mai-nguyen.com"
    },
    
    // Skills & Interests
    skills: [
      { name: "Giảng dạy", level: 90, category: "education" },
      { name: "Giao tiếp", level: 85, category: "soft" },
      { name: "Tổ chức sự kiện", level: 80, category: "management" },
      { name: "Tiếng Anh", level: 75, category: "language" },
      { name: "Nhiếp ảnh", level: 70, category: "creative" },
      { name: "Chăm sóc trẻ em", level: 88, category: "care" }
    ],
    
    interests: [
      "Giáo dục", "Môi trường", "Chăm sóc trẻ em", "Người cao tuổi", 
      "Nghệ thuật", "Thể thao", "Công nghệ", "Du lịch"
    ],
    
    // Professional Info
    education: [
      {
        school: "Đại học Sư phạm Hà Nội",
        degree: "Cử nhân Giáo dục Tiểu học",
        year: "2016-2020",
        gpa: "3.7/4.0"
      },
      {
        school: "Trường THPT Chu Văn An",
        degree: "Tốt nghiệp THPT",
        year: "2013-2016",
        gpa: "8.5/10"
      }
    ],
    
    experience: [
      {
        title: "Trưởng nhóm tình nguyện",
        organization: "Quỹ Hỗ trợ Giáo dục Việt Nam",
        period: "2023 - Hiện tại",
        description: "Lãnh đạo nhóm 15 tình nguyện viên trong các dự án giáo dục tại vùng cao"
      },
      {
        title: "Giáo viên tình nguyện",
        organization: "Trung tâm Hỗ trợ Trẻ em",
        period: "2022 - 2023", 
        description: "Dạy tiếng Việt và toán cho trẻ em có hoàn cảnh khó khăn"
      }
    ],
    
    // Privacy Settings
    privacy: {
      showEmail: "friends", // public, friends, private
      showPhone: "private",
      showLocation: "public",
      showStats: "public",
      showBadges: "public"
    }
  });

  // Statistics data
  const stats = {
    totalHours: 245,
    eventsJoined: 42,
    eventsOrganized: 8,
    reputation: 4.8,
    badgesEarned: 15,
    friendsCount: 156,
    followersCount: 234,
    followingCount: 189,
    certificatesEarned: 12
  };

  // Achievements/Badges data
  const badges = [
    {
      id: 1,
      name: "Tình nguyện viên tích cực",
      description: "Hoàn thành 50 giờ tình nguyện",
      icon: Award,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
      earnedDate: "2024-08-15",
      rarity: "common"
    },
    {
      id: 2, 
      name: "Người lãnh đạo",
      description: "Tổ chức thành công 5 sự kiện",
      icon: Trophy,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
      earnedDate: "2024-07-20",
      rarity: "rare"
    },
    {
      id: 3,
      name: "Chuyên gia giáo dục",
      description: "Tham gia 10 dự án giáo dục",
      icon: GraduationCap,
      color: "text-blue-500", 
      bgColor: "bg-blue-100",
      earnedDate: "2024-06-10",
      rarity: "epic"
    },
    {
      id: 4,
      name: "Trái tim vàng",
      description: "Nhận 100 lượt cảm ơn từ cộng đồng",
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-100", 
      earnedDate: "2024-09-01",
      rarity: "legendary"
    }
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: "event_completed",
      title: "Hoàn thành sự kiện 'Làm sạch môi trường'",
      description: "Tham gia 4 giờ, nhận được đánh giá 5 sao",
      timestamp: "2 ngày trước",
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      id: 2,
      type: "badge_earned", 
      title: "Đạt huy hiệu 'Trái tim vàng'",
      description: "Nhận 100 lượt cảm ơn từ cộng đồng",
      timestamp: "1 tuần trước",
      icon: Award,
      color: "text-yellow-500"
    },
    {
      id: 3,
      type: "event_joined",
      title: "Tham gia sự kiện 'Dạy học vùng cao'", 
      description: "Đăng ký thành công với vai trò trưởng nhóm",
      timestamp: "2 tuần trước",
      icon: Users,
      color: "text-blue-500"
    }
  ];

  // Profile tabs
  const profileTabs = [
    { id: "overview", label: "Tổng quan", icon: User },
    { id: "stats", label: "Thống kê", icon: BarChart3 },
    { id: "badges", label: "Huy hiệu", icon: Award },
    { id: "timeline", label: "Hoạt động", icon: Activity },
    { id: "settings", label: "Cài đặt", icon: Settings }
  ];

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

  // Get badge rarity color
  const getBadgeRarityColor = (rarity) => {
    const colors = {
      common: "ring-gray-300",
      rare: "ring-blue-300",
      epic: "ring-purple-300", 
      legendary: "ring-yellow-300"
    };
    return colors[rarity] || "ring-gray-300";
  };

  // Handle profile update
  const handleSaveProfile = () => {
    // Save logic here (API call...)
    setIsEditing(false);
  };

  // Handle avatar upload
  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserProfile(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* About Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Giới thiệu</h3>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit3 size={16} />
              <span className="text-sm">Chỉnh sửa</span>
            </button>
          )}
        </div>
        
        {isEditing ? (
          <div className="space-y-4">
            <textarea
              value={userProfile.bio}
              onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="Viết vài dòng về bản thân..."
            />
            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save size={16} />
                Lưu
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 text-slate-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        ) : (
          <p className="text-slate-700 leading-relaxed">{userProfile.bio}</p>
        )}
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Kỹ năng</h3>
          <button className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Plus size={16} />
            <span className="text-sm">Thêm kỹ năng</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userProfile.skills.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                <span className="text-sm text-slate-500">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interests Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Sở thích</h3>
          <button className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Edit3 size={16} />
            <span className="text-sm">Chỉnh sửa</span>
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {userProfile.interests.map((interest, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors cursor-pointer"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Thông tin liên hệ</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="text-blue-500" size={20} />
            <div className="flex-1">
              <span className="text-slate-700">{userProfile.email}</span>
              {userProfile.privacy.showEmail === "private" && (
                <EyeOff className="inline-block ml-2 text-slate-400" size={16} />
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Phone className="text-green-500" size={20} />
            <div className="flex-1">
              <span className="text-slate-700">{userProfile.phone}</span>
              {userProfile.privacy.showPhone === "private" && (
                <EyeOff className="inline-block ml-2 text-slate-400" size={16} />
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <MapPin className="text-red-500" size={20} />
            <span className="text-slate-700">{userProfile.location}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <CalendarIcon className="text-purple-500" size={20} />
            <span className="text-slate-700">Tham gia từ {new Date(userProfile.joinDate).toLocaleDateString('vi-VN')}</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-slate-800 mb-3">Liên kết xã hội</h4>
          <div className="flex items-center gap-4">
            {userProfile.socialLinks.facebook && (
              <a href={userProfile.socialLinks.facebook} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" target="_blank" rel="noreferrer">
                <Facebook size={20} />
              </a>
            )}
            {userProfile.socialLinks.linkedin && (
              <a href={userProfile.socialLinks.linkedin} className="p-2 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors" target="_blank" rel="noreferrer">
                <Linkedin size={20} />
              </a>
            )}
            {userProfile.socialLinks.instagram && (
              <a href={userProfile.socialLinks.instagram} className="p-2 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors" target="_blank" rel="noreferrer">
                <Instagram size={20} />
              </a>
            )}
            {userProfile.socialLinks.website && (
              <a href={userProfile.socialLinks.website} className="p-2 text-slate-600 hover:bg-gray-50 rounded-lg transition-colors" target="_blank" rel="noreferrer">
                <Globe size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStatsTab = () => (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
          <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-3">
            <Clock className="text-blue-600" size={24} />
          </div>
          <div className="text-2xl font-bold text-slate-800 mb-1">{stats.totalHours}</div>
          <div className="text-sm text-slate-600">Giờ tình nguyện</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
          <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-3">
            <CalendarIcon className="text-green-600" size={24} />
          </div>
          <div className="text-2xl font-bold text-slate-800 mb-1">{stats.eventsJoined}</div>
          <div className="text-sm text-slate-600">Sự kiện tham gia</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
          <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-3">
            <Trophy className="text-purple-600" size={24} />
          </div>
          <div className="text-2xl font-bold text-slate-800 mb-1">{stats.eventsOrganized}</div>
          <div className="text-sm text-slate-600">Sự kiện tổ chức</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
          <div className="p-3 bg-yellow-100 rounded-full w-fit mx-auto mb-3">
            <Star className="text-yellow-600" size={24} />
          </div>
          <div className="text-2xl font-bold text-slate-800 mb-1">{stats.reputation}</div>
          <div className="text-sm text-slate-600">Đánh giá trung bình</div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Tiến độ theo thời gian</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <BarChart3 size={48} className="text-gray-400 mx-auto mb-2" />
            <p className="text-slate-600">Biểu đồ thống kê sẽ được hiển thị tại đây</p>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Phân bố theo lĩnh vực</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: "Giáo dục", hours: 85, color: "bg-blue-500" },
            { name: "Môi trường", hours: 62, color: "bg-green-500" }, 
            { name: "Y tế", hours: 45, color: "bg-red-500" },
            { name: "Xã hội", hours: 38, color: "bg-purple-500" },
            { name: "Thể thao", hours: 15, color: "bg-orange-500" }
          ].map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">{category.name}</span>
                <span className="text-sm text-slate-500">{category.hours}h</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`${category.color} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${(category.hours / Math.max(stats.totalHours, 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBadgesTab = () => (
    <div className="space-y-6">
      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map(badge => {
          const IconComponent = badge.icon;
          return (
            <div 
              key={badge.id} 
              className={`bg-white rounded-xl border-2 ${getBadgeRarityColor(badge.rarity)} p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group`}
            >
              <div className="text-center">
                <div className={`w-16 h-16 ${badge.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className={badge.color} size={32} />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{badge.name}</h3>
                <p className="text-sm text-slate-600 mb-3">{badge.description}</p>
                <div className="text-xs text-slate-500">
                  Đạt được: {new Date(badge.earnedDate).toLocaleDateString('vi-VN')}
                </div>
                <div className={`inline-block px-2 py-1 mt-2 rounded-full text-xs font-medium ${badge.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-700' : badge.rarity === 'epic' ? 'bg-purple-100 text-purple-700' : badge.rarity === 'rare' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                  {badge.rarity === 'legendary' ? 'Huyền thoại' : badge.rarity === 'epic' ? 'Sử thi' : badge.rarity === 'rare' ? 'Hiếm' : 'Thường'}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Badge Progress */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Tiến độ huy hiệu</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="text-blue-600" size={20} />
              </div>
              <div>
                <div className="font-medium text-slate-800">Người kết nối</div>
                <div className="text-sm text-slate-600">Có 100 bạn bè trong mạng lưới</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-blue-600">78/100</div>
              <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Zap className="text-green-600" size={20} />
              </div>
              <div>
                <div className="font-medium text-slate-800">Siêu tình nguyện</div>
                <div className="text-sm text-slate-600">Hoàn thành 500 giờ tình nguyện</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-green-600">245/500</div>
              <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '49%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTimelineTab = () => (
    <div className="space-y-6">
      {/* Activity Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Hoạt động gần đây</h3>
        <div className="space-y-6 relative">
          {recentActivities.map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <div key={activity.id} className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'event_completed' ? 'bg-green-100' : activity.type === 'badge_earned' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                  <IconComponent className={activity.color} size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800">{activity.title}</h4>
                  <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
                  <span className="text-xs text-slate-500">{activity.timestamp}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h3 className="text-lg font-semibold text-slate-800">Cài đặt quyền riêng tư</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-600 mb-1">Hiển thị email</label>
          <select value={userProfile.privacy.showEmail} onChange={(e) => setUserProfile(prev => ({ ...prev, privacy: { ...prev.privacy, showEmail: e.target.value } }))} className="w-full px-3 py-2 border rounded-lg">
            <option value="public">Công khai</option>
            <option value="friends">Bạn bè</option>
            <option value="private">Riêng tư</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Hiển thị số điện thoại</label>
          <select value={userProfile.privacy.showPhone} onChange={(e) => setUserProfile(prev => ({ ...prev, privacy: { ...prev.privacy, showPhone: e.target.value } }))} className="w-full px-3 py-2 border rounded-lg">
            <option value="public">Công khai</option>
            <option value="friends">Bạn bè</option>
            <option value="private">Riêng tư</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => alert("Lưu cài đặt (giả lập)")} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Lưu</button>
        <button onClick={() => alert("Đặt lại về mặc định (giả lập)")} className="px-4 py-2 border rounded-lg">Đặt lại</button>
      </div>
    </div>
  );

  // MAIN RENDER
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="relative h-48 md:h-64">
            <img src={userProfile.coverImage} alt="Cover" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <label className="absolute top-4 right-4 p-2 bg-black/20 text-white rounded-lg hover:bg-black/30 transition-colors cursor-pointer">
              <Camera size={20} />
              <input type="file" accept="image/*" onChange={() => {}} className="hidden" />
            </label>

            {/* Avatar & basic info */}
            <div className="absolute left-6 bottom-[-36px] flex items-center gap-4">
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${getUserLevelColor(userProfile.level)} flex items-center justify-center text-white overflow-hidden border-4 border-white`}>
                <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover rounded-full" />
              </div>

              <div className="ml-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-white drop-shadow">{userProfile.name}</h2>
                  {userProfile.isVerified && <div className="bg-white/20 text-white rounded-full px-2 py-0.5 text-xs flex items-center gap-1"><UserCheck size={14} /> Verified</div>}
                </div>
                <div className="text-sm text-white/90">{userProfile.level} • Đã tham gia {new Date(userProfile.joinDate).getFullYear()}</div>
              </div>
            </div>

            {/* Cover action buttons */}
            <div className="absolute right-4 bottom-4 flex items-center gap-2">
              <button onClick={() => setShowQRCode(s => !s)} className="px-3 py-2 bg-white/10 text-white rounded-lg flex items-center gap-2 hover:bg-white/20 transition">
                <QrCode size={16} /> {showQRCode ? "Ẩn QR" : "QR"}
              </button>
              <button className="px-3 py-2 bg-white text-slate-800 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition">
                <Share2 size={16} /> Chia sẻ
              </button>
            </div>
          </div>

          {/* Spacer so avatar doesn't overlap content */}
          <div className="h-20"></div>

          {/* Header content area */}
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-slate-800 font-semibold">{userProfile.bio.split(".")[0]}.</div>
                  <div className="text-sm text-slate-500">{userProfile.lastActive} • {userProfile.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => setIsEditing(prev => !prev)} className="px-3 py-2 border rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
                  <Edit3 size={16} /> {isEditing ? "Đang sửa" : "Chỉnh sửa hồ sơ"}
                </button>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700">
                  <MessageSquare size={16} /> Nhắn
                </button>
                <button className="px-3 py-2 bg-gray-100 text-slate-700 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-200">
                  <ExternalLink size={16} /> Xem trang
                </button>
              </div>
            </div>

            {/* Small stats row */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-8 gap-3 text-center">
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <div className="text-sm text-slate-500">Giờ</div>
                <div className="font-semibold text-slate-800">{stats.totalHours}</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <div className="text-sm text-slate-500">Sự kiện</div>
                <div className="font-semibold text-slate-800">{stats.eventsJoined}</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <div className="text-sm text-slate-500">Tổ chức</div>
                <div className="font-semibold text-slate-800">{stats.eventsOrganized}</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <div className="text-sm text-slate-500">Điểm</div>
                <div className="font-semibold text-slate-800">{stats.reputation}</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <div className="text-sm text-slate-500">Huy hiệu</div>
                <div className="font-semibold text-slate-800">{stats.badgesEarned}</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <div className="text-sm text-slate-500">Bạn bè</div>
                <div className="font-semibold text-slate-800">{stats.friendsCount}</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <div className="text-sm text-slate-500">Người theo dõi</div>
                <div className="font-semibold text-slate-800">{stats.followersCount}</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <div className="text-sm text-slate-500">Chứng chỉ</div>
                <div className="font-semibold text-slate-800">{stats.certificatesEarned}</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                {profileTabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${activeTab === tab.id ? "bg-blue-50 text-blue-600 border border-blue-200" : "text-slate-600 hover:bg-gray-50"}`}>
                      <Icon size={16} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "overview" && renderOverviewTab()}
          {activeTab === "stats" && renderStatsTab()}
          {activeTab === "badges" && renderBadgesTab()}
          {activeTab === "timeline" && renderTimelineTab()}
          {activeTab === "settings" && renderSettingsTab()}
        </div>
      </div>
    </div>
  );
}
