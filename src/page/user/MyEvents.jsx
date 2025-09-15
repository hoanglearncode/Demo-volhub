import React, { useState } from "react";
import { 
  Calendar, 
  Search,
  Filter,
  Clock,
  MapPin,
  Users,
  User,
  Star,
  Award,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical,
  Download,
  Share2,
  Heart,
  MessageSquare,
  Eye,
  Plus,
  Grid,
  List,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ExternalLink,
  FileText,
  Camera,
  Bookmark,
  Flag,
  Settings,
  Edit,
  Trash2,
  Copy,
  Phone,
  Mail,
  Globe,
  Navigation,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";

export default function MyEvents() {
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [sortBy, setSortBy] = useState("date_desc");

  // Mock events data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Làm sạch môi trường Hồ Gươm",
      description: "Hoạt động dọn dẹp và bảo vệ môi trường khu vực Hồ Gươm, góp phần xây dựng Hà Nội xanh - sạch - đẹp.",
      image: "/api/placeholder/400/200",
      startDate: "2025-09-25",
      endDate: "2025-09-25", 
      startTime: "08:00",
      endTime: "12:00",
      location: "Hồ Gươm, Hoàn Kiếm, Hà Nội",
      organizer: "Sở Tài nguyên & Môi trường Hà Nội",
      myRole: "volunteer",
      status: "confirmed",
      participantCount: 85,
      maxParticipants: 100,
      category: "environment",
      urgency: "normal",
      hoursEarned: 4,
      rating: 4.8,
      myRating: 5,
      certificate: true,
      tags: ["môi_trường", "dọn_dẹp", "hà_nội"],
      contact: { phone: "0123456789", email: "contact@event.com" },
      skills: ["Làm việc nhóm", "Bảo vệ môi trường"],
      requirements: ["Độ tuổi: 16+", "Sức khỏe tốt", "Tinh thần trách nhiệm cao"],
      benefits: ["Chứng nhận tham gia", "4 giờ tình nguyện", "Bữa trưa miễn phí"],
      isBookmarked: true,
      notes: "Nhớ mang găng tay và nón"
    },
    {
      id: 2,
      title: "Dạy học cho trẻ em vùng cao",
      description: "Chương trình giáo dục hỗ trợ trẻ em vùng cao Sa Pa, giúp các em tiếp cận kiến thức và phát triển toàn diện.",
      image: "/api/placeholder/400/200",
      startDate: "2025-10-15",
      endDate: "2025-10-20",
      startTime: "08:00",
      endTime: "17:00",
      location: "Sa Pa, Lào Cai",
      organizer: "Quỹ Hỗ trợ Giáo dục Việt Nam",
      myRole: "leader",
      status: "registered",
      participantCount: 12,
      maxParticipants: 15,
      category: "education", 
      urgency: "high",
      hoursEarned: 0,
      rating: 0,
      myRating: 0,
      certificate: true,
      tags: ["giáo_dục", "trẻ_em", "vùng_cao"],
      contact: { phone: "0987654321", email: "education@ngo.org" },
      skills: ["Giảng dạy", "Giao tiếp", "Tiếng Anh"],
      requirements: ["Kinh nghiệm giảng dạy", "Thể lực tốt", "Cam kết tham gia đầy đủ"],
      benefits: ["Chứng nhận tham gia", "40 giờ tình nguyện", "Chi phí đi lại được hỗ trợ"],
      isBookmarked: false,
      notes: "Cần chuẩn bị giáo án và đồ dùng học tập"
    },
    {
      id: 3,
      title: "Chăm sóc người cao tuổi",
      description: "Hoạt động thăm hỏi, chăm sóc và mang niềm vui đến với các cụ già tại viện dưỡng lão.",
      image: "/api/placeholder/400/200",
      startDate: "2025-09-20",
      endDate: "2025-09-20",
      startTime: "14:00", 
      endTime: "17:00",
      location: "Viện Dưỡng lão Hà Nội, Đống Đa, Hà Nội",
      organizer: "Hội Chăm sóc Người cao tuổi Hà Nội",
      myRole: "volunteer",
      status: "completed",
      participantCount: 25,
      maxParticipants: 30,
      category: "healthcare",
      urgency: "normal",
      hoursEarned: 3,
      rating: 4.9,
      myRating: 5,
      certificate: true,
      tags: ["chăm_sóc", "người_cao_tuổi", "y_tế"],
      contact: { phone: "0123987654", email: "elderly@care.vn" },
      skills: ["Giao tiếp", "Kiên nhẫn", "Chăm sóc"],
      requirements: ["Tình yêu thương", "Kỹ năng giao tiếp tốt"],
      benefits: ["Chứng nhận tham gia", "3 giờ tình nguyện", "Kinh nghiệm quý báu"],
      isBookmarked: true,
      notes: "Hoạt động rất ý nghĩa, sẽ tham gia tiếp"
    },
    {
      id: 4,
      title: "Hỗ trợ người khuyết tật",
      description: "Đồng hành cùng người khuyết tật trong các hoạt động sinh hoạt, học tập và phát triển kỹ năng sống.",
      image: "/api/placeholder/400/200", 
      startDate: "2025-09-30",
      endDate: "2025-10-02",
      startTime: "09:00",
      endTime: "16:00",
      location: "Trung tâm Hỗ trợ NKT, Hai Bà Trưng, Hà Nội",
      organizer: "Trung tâm Hỗ trợ Người khuyết tật",
      myRole: "organizer",
      status: "confirmed",
      participantCount: 40,
      maxParticipants: 50,
      category: "social",
      urgency: "normal",
      hoursEarned: 0,
      rating: 0,
      myRating: 0,
      certificate: true,
      tags: ["hỗ_trợ", "người_khuyết_tật", "kỹ_năng_sống"],
      contact: { phone: "0123456780", email: "support@disability.org" },
      skills: ["Hỗ trợ", "Kiên nhẫn", "Kỹ năng mềm"],
      requirements: ["Tình yêu thương", "Kiên nhẫn", "Kỹ năng giao tiếp"],
      benefits: ["Chứng nhận tham gia", "21 giờ tình nguyện", "Phát triển kỹ năng"],
      isBookmarked: false,
      notes: "Là người tổ chức, cần chuẩn bị kỹ lưỡng"
    },
    {
      id: 5,
      title: "Marathon Từ thiện Hà Nội",
      description: "Sự kiện chạy marathon gây quỹ từ thiện hỗ trợ trẻ em có hoàn cảnh khó khăn.",
      image: "/api/placeholder/400/200",
      startDate: "2025-08-15",
      endDate: "2025-08-15", 
      startTime: "06:00",
      endTime: "12:00",
      location: "Mỹ Đình, Nam Từ Liêm, Hà Nội",
      organizer: "CLB Chạy bộ Hà Nội",
      myRole: "volunteer",
      status: "cancelled",
      participantCount: 500,
      maxParticipants: 1000,
      category: "sports",
      urgency: "low",
      hoursEarned: 0,
      rating: 0,
      myRating: 0,
      certificate: false,
      tags: ["chạy_bộ", "từ_thiện", "thể_thao"],
      contact: { phone: "0987123456", email: "marathon@charity.vn" },
      skills: ["Thể lực", "Tinh thần đồng đội"],
      requirements: ["Sức khỏe tốt", "Tinh thần thể thao"],
      benefits: ["Áo kỷ niệm", "6 giờ tình nguyện", "Góp phần từ thiện"],
      isBookmarked: false,
      notes: "Bị hủy do thời tiết xấu"
    }
  ]);

  // Tabs for filtering events
  const eventTabs = [
    { id: "all", label: "Tất cả", count: events.length, icon: Calendar },
    { id: "upcoming", label: "Sắp diễn ra", count: events.filter(e => ["registered", "confirmed"].includes(e.status)).length, icon: Clock },
    { id: "completed", label: "Đã hoàn thành", count: events.filter(e => e.status === "completed").length, icon: CheckCircle },
    { id: "cancelled", label: "Đã hủy", count: events.filter(e => e.status === "cancelled").length, icon: XCircle }
  ];

  // Status/role/sort options
  const statusOptions = [
    { value: "all", label: "Tất cả trạng thái" },
    { value: "registered", label: "Đã đăng ký" },
    { value: "confirmed", label: "Đã xác nhận" },
    { value: "completed", label: "Hoàn thành" },
    { value: "cancelled", label: "Đã hủy" }
  ];
  const roleOptions = [
    { value: "all", label: "Tất cả vai trò" },
    { value: "volunteer", label: "Tình nguyện viên" },
    { value: "leader", label: "Trưởng nhóm" },
    { value: "organizer", label: "Ban tổ chức" }
  ];
  const sortOptions = [
    { value: "date_desc", label: "Mới nhất" },
    { value: "date_asc", label: "Cũ nhất" },
    { value: "rating_desc", label: "Đánh giá cao" },
    { value: "hours_desc", label: "Nhiều giờ nhất" }
  ];

  // helpers for color / badge
  const getStatusColor = (status) => {
    const colors = {
      registered: "bg-blue-100 text-blue-700 border-blue-200",
      confirmed: "bg-green-100 text-green-700 border-green-200",
      completed: "bg-purple-100 text-purple-700 border-purple-200",
      cancelled: "bg-red-100 text-red-700 border-red-200"
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-200";
  };
  const getRoleColor = (role) => {
    const colors = {
      volunteer: "bg-blue-100 text-blue-700",
      leader: "bg-green-100 text-green-700",
      organizer: "bg-purple-100 text-purple-700"
    };
    return colors[role] || "bg-gray-100 text-gray-700";
  };
  const getUrgencyColor = (urgency) => {
    const colors = { low: "bg-gray-400", normal: "bg-blue-500", high: "bg-red-500" };
    return colors[urgency] || "bg-gray-400";
  };

  // Filter & sort events
  const filteredEvents = events
    .filter(event => {
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch = !q || event.title.toLowerCase().includes(q) || event.description.toLowerCase().includes(q) || event.location.toLowerCase().includes(q);
      if (!matchesSearch) return false;

      if (activeTab === "upcoming" && !["registered", "confirmed"].includes(event.status)) return false;
      if (activeTab === "completed" && event.status !== "completed") return false;
      if (activeTab === "cancelled" && event.status !== "cancelled") return false;

      if (selectedStatus !== "all" && event.status !== selectedStatus) return false;
      if (selectedRole !== "all" && event.myRole !== selectedRole) return false;

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date_desc": return new Date(b.startDate) - new Date(a.startDate);
        case "date_asc": return new Date(a.startDate) - new Date(b.startDate);
        case "rating_desc": return b.rating - a.rating;
        case "hours_desc": return b.hoursEarned - a.hoursEarned;
        default: return 0;
      }
    });

  // Stats
  const stats = {
    totalEvents: events.length,
    completedEvents: events.filter(e => e.status === "completed").length,
    totalHours: events.filter(e => e.status === "completed").reduce((sum, e) => sum + e.hoursEarned, 0),
    averageRating: (() => {
      const rated = events.filter(e => e.myRating > 0);
      if (rated.length === 0) return 0;
      return rated.reduce((s, e) => s + e.myRating, 0) / rated.length;
    })()
  };

  // Actions
  const toggleBookmark = (eventId) => {
    setEvents(prev => prev.map(ev => ev.id === eventId ? { ...ev, isBookmarked: !ev.isBookmarked } : ev));
  };

  const handleShare = async (ev) => {
    const url = `${window.location.origin}/events/${ev.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: ev.title, text: ev.description, url });
      } catch (err) {
        // user cancelled or error
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        alert("Đã sao chép liên kết vào clipboard.");
      } catch {
        alert("Không thể sao chép. Liên kết: " + url);
      }
    } else {
      alert("Liên kết: " + url);
    }
  };

  const handleDownload = (ev) => {
    // placeholder: in real app generate PDF or CSV
    alert(`Tải báo cáo sự kiện: ${ev.title} (simulated)`);
  };

  const handleEdit = (ev) => {
    // Redirect / open modal in real app
    alert(`Mở chỉnh sửa cho: ${ev.title}`);
  };

  const handleDelete = (ev) => {
    if (window.confirm(`Bạn có chắc muốn xóa sự kiện "${ev.title}" không?`)) {
      setEvents(prev => prev.filter(e => e.id !== ev.id));
    }
  };

  const toggleRegistration = (ev) => {
    // For simple demo: if volunteer can register/cancel
    setEvents(prev => prev.map(e => {
      if (e.id !== ev.id) return e;
      if (e.status === "cancelled") return { ...e, status: "registered" };
      if (e.status === "registered") return { ...e, status: "cancelled" };
      if (e.status === "confirmed") return { ...e, status: "cancelled" }; // allow cancel
      return e;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Tìm kiếm sự kiện..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select className="px-3 py-2.5 border border-gray-300 rounded-lg" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
                {statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>

              <select className="px-3 py-2.5 border border-gray-300 rounded-lg" value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
                {roleOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>

              <select className="px-3 py-2.5 border border-gray-300 rounded-lg" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>

              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button onClick={() => setViewMode("grid")} className={`p-2 rounded-md ${viewMode === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600"}`}><Grid size={16} /></button>
                <button onClick={() => setViewMode("list")} className={`p-2 rounded-md ${viewMode === "list" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600"}`}><List size={16} /></button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
            {eventTabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${activeTab === tab.id ? "bg-blue-50 text-blue-600 border border-blue-200" : "text-slate-600 hover:bg-gray-50"}`}>
                  <Icon size={16} />
                  {tab.label}
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${activeTab === tab.id ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>{tab.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Events Display */}
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Calendar size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-800 mb-2">Không tìm thấy sự kiện</h3>
            <p className="text-slate-600 mb-6">Thử thay đổi bộ lọc hoặc tìm kiếm khác</p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">Khám phá sự kiện mới</button>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredEvents.map(event => (
              <div key={event.id} className={`bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 group ${viewMode === "list" ? "flex" : ""}`}>
                {/* Image */}
                <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : "h-48"}`}>
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>{statusOptions.find(s => s.value === event.status)?.label || event.status}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(event.myRole)}`}>{roleOptions.find(r => r.value === event.myRole)?.label}</span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1">
                    <div className={`w-3 h-3 rounded-full ${getUrgencyColor(event.urgency)}`}></div>
                    <button onClick={() => toggleBookmark(event.id)} className={`p-2 rounded-full transition-colors ${event.isBookmarked ? "bg-yellow-500 text-white" : "bg-black/20 text-white hover:bg-black/30"}`}>
                      <Bookmark size={16} className={event.isBookmarked ? "fill-current" : ""} />
                    </button>
                  </div>
                  {event.hoursEarned > 0 && <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium"><Clock size={12} />{event.hoursEarned}h</div>}
                </div>

                {/* Content */}
                <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">{event.title}</h3>
                    <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-gray-50 transition-colors"><MoreVertical size={18} /></button>
                  </div>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar size={16} className="text-blue-500" />
                      <span>{new Date(event.startDate).toLocaleDateString('vi-VN')} • {event.startTime} - {event.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin size={16} className="text-red-500" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Users size={16} className="text-green-500" />
                      <span>{event.participantCount}/{event.maxParticipants} người tham gia</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <User size={16} className="text-purple-500" />
                      <span>{event.organizer}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleShare(event)} className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">
                        <Share2 size={16} /> Chia sẻ
                      </button>
                      <button onClick={() => handleDownload(event)} className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">
                        <Download size={16} /> Tải
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Role-specific actions */}
                      {event.myRole === "organizer" && (
                        <>
                          <button onClick={() => handleEdit(event)} className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"><Edit size={14} /> Sửa</button>
                          <button onClick={() => handleDelete(event)} className="px-3 py-2 bg-red-50 text-red-700 rounded-lg text-sm hover:bg-red-100"><Trash2 size={14} /> Xóa</button>
                        </>
                      )}

                      {/* Volunteer actions */}
                      {event.myRole === "volunteer" && (
                        <>
                          {(event.status === "registered" || event.status === "confirmed") ? (
                            <button onClick={() => toggleRegistration(event)} className="px-3 py-2 bg-red-50 text-red-700 rounded-lg text-sm hover:bg-red-100">Rút lui</button>
                          ) : event.status === "cancelled" ? (
                            <button onClick={() => toggleRegistration(event)} className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Đăng ký lại</button>
                          ) : (
                            <button onClick={() => toggleRegistration(event)} className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Đăng ký</button>
                          )}
                        </>
                      )}

                      <button onClick={() => alert(`Xem chi tiết: ${event.title}`)} className="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">
                        <Eye size={14} /> Xem
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
