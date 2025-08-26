import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, MapPin, Heart, Clock, Users, Filter, Search, X, Calendar, Award, Star } from "lucide-react";

// Mock data - dữ liệu tình nguyện mẫu
const mockVolunteerEvents = [
  {
    id: 1,
    title: `Chương trình "Mùa đông không lạnh" - Hỗ trợ người vô gia cư`,
    location: "Hà Nội",
    duration: "3 tháng",
    time: "01/12/2024 - 28/02/2025",
    commitment: "2-3 giờ/tuần",
    cause: "Xã hội",
    volunteers: 100,
    joined: 65,
    difficulty: "Dễ",
    description: "Phân phát cơm từ thiện, chăn ấm cho người vô gia cư trong mùa đông lạnh giá. Mang lại sự ấm áp và yêu thương.",
    organization: "Hội Chữ thập đỏ",
    skills: ["Giao tiếp", "Đồng cảm"],
    benefits: ["Chứng nhận", "Kinh nghiệm xã hội"],
    urgent: true,
    featured: false
  },
  {
    id: 2,
    title: "Dạy học miễn phí cho trẻ em vùng cao",
    location: "Sapa, Lào Cai",
    duration: "6 tháng",
    time: "15/03/2025 - 15/09/2025",
    commitment: "20 giờ/tuần",
    cause: "Giáo dục",
    volunteers: 20,
    joined: 8,
    difficulty: "Khó",
    description: "Giảng dạy tiếng Việt, toán học cơ bản cho trẻ em dân tộc thiểu số. Góp phần xóa mù chữ và nâng cao dân trí.",
    organization: "Quỹ Vì tầm vóc Việt",
    skills: ["Giảng dạy", "Tiếng dân tộc", "Kiên nhẫn"],
    benefits: ["Chứng nhận", "Phụ cấp ăn ở", "Trải nghiệm văn hóa"],
    urgent: false,
    featured: true
  },
  {
    id: 3,
    title: "Bảo vệ rùa biển và làm sạch bãi biển",
    location: "Côn Đảo, Bà Rịa - Vũng Tàu",
    duration: "2 tuần",
    time: "10/06/2025 - 24/06/2025",
    commitment: "Full-time",
    cause: "Môi trường",
    volunteers: 30,
    joined: 22,
    difficulty: "Vừa",
    description: "Tham gia bảo vệ rùa biển, thu gom rác thải nhựa và tuyên truyền bảo vệ môi trường biển.",
    organization: "WWF Việt Nam",
    skills: ["Yêu thiên nhiên", "Sức khỏe tốt"],
    benefits: ["Chứng nhận quốc tế", "Kiến thức sinh thái"],
    urgent: false,
    featured: true
  },
  {
    id: 4,
    title: "Chăm sóc người cao tuổi cô đơn",
    location: "TP.HCM",
    duration: "6 tháng",
    time: "01/01/2025 - 30/06/2025",
    commitment: "4 giờ/tuần",
    cause: "Xã hội",
    volunteers: 50,
    joined: 35,
    difficulty: "Dễ",
    description: "Trò chuyện, đọc sách, hỗ trợ sinh hoạt hàng ngày cho các cụ già cô đơn tại viện dư양lão.",
    organization: "Viện Dư양Lão Thành Phố",
    skills: ["Giao tiếp", "Chăm sóc", "Kiên nhẫn"],
    benefits: ["Chứng nhận", "Kinh nghiệm chăm sóc"],
    urgent: true,
    featured: false
  },
  {
    id: 5,
    title: "Xây dựng thư viện cho trẻ em nông thôn",
    location: "Đồng Tháp",
    duration: "1 tháng",
    time: "01/07/2025 - 31/07/2025",
    commitment: "Full-time",
    cause: "Giáo dục",
    volunteers: 15,
    joined: 3,
    difficulty: "Vừa",
    description: "Tham gia xây dựng, sơn sửa và trang bị sách vở cho thư viện trường học vùng nông thôn.",
    organization: "Room to Read Việt Nam",
    skills: ["Thủ công", "Làm việc nhóm"],
    benefits: ["Chứng nhận", "Kỹ năng thực hành"],
    urgent: false,
    featured: false
  },
  {
    id: 6,
    title: "Cứu trợ khẩn cấp - Hỗ trợ vùng bão lũ",
    location: "Quảng Nam",
    duration: "2 tuần",
    time: "Ngay lập tức",
    commitment: "Full-time",
    cause: "Khẩn cấp",
    volunteers: 200,
    joined: 45,
    difficulty: "Khó",
    description: "Hỗ trợ khẩn cấp cho người dân vùng bão lũ: phân phát lương thực, dọn dẹp, xây dựng lại nhà cửa.",
    organization: "Mặt trận Tổ quốc VN",
    skills: ["Sức khỏe tốt", "Kỹ năng sơ cứu", "Tinh thần vượt khó"],
    benefits: ["Chứng nhận đặc biệt", "Đóng góp cộng đồng"],
    urgent: true,
    featured: true
  },
  {
    id: 7,
    title: `Chương trình "Nụ cười cho em" - Phẫu thuật từ thiện`,
    location: "Cần Thơ",
    duration: "1 tuần",
    time: "20/08/2025 - 27/08/2025",
    commitment: "8 giờ/ngày",
    cause: "Y tế",
    volunteers: 25,
    joined: 18,
    difficulty: "Vừa",
    description: "Hỗ trợ đội ngũ y bác sĩ trong chương trình phẫu thuật miễn phí cho trẻ em có dị tật bẩm sinh.",
    organization: "Operation Smile VN",
    skills: ["Y tế cơ bản", "Chăm sóc trẻ em"],
    benefits: ["Chứng nhận y tế", "Kinh nghiệm quý báu"],
    urgent: false,
    featured: false
  },
  {
    id: 8,
    title: "Marathon từ thiện `Chạy vì trẻ em`",
    location: "Hà Nội",
    duration: "1 ngày",
    time: "15/04/2025",
    commitment: "1 ngày",
    cause: "Thể thao",
    volunteers: 300,
    joined: 267,
    difficulty: "Dễ",
    description: "Tham gia tổ chức sự kiện marathon gây quỹ từ thiện cho trẻ em có hoàn cảnh khó khăn.",
    organization: "Quỹ Bảo trợ trẻ em VN",
    skills: ["Tổ chức sự kiện", "Giao tiếp"],
    benefits: ["Chứng nhận", "Áo kỷ niệm", "Networking"],
    urgent: false,
    featured: false
  }
];

const locations = ["Tất cả", "Hà Nội", "TP.HCM", "Đà Nẵng", "Cần Thơ", "Sapa, Lào Cai", "Côn Đảo, Bà Rịa - Vũng Tàu", "Đồng Tháp", "Quảng Nam"];
const causes = ["Tất cả", "Xã hội", "Giáo dục", "Môi trường", "Y tế", "Khẩn cấp", "Thể thao"];
const commitments = ["Tất cả", "1 ngày", "1 tuần", "2 tuần", "1 tháng", "2-3 giờ/tuần", "4 giờ/tuần", "Full-time"];
const difficulties = ["Tất cả", "Dễ", "Vừa", "Khó"];

export default function Volunteer() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyUrgent, setShowOnlyUrgent] = useState(false);
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
  const [filters, setFilters] = useState({
    location: "Tất cả",
    cause: "Tất cả",
    commitment: "Tất cả",
    difficulty: "Tất cả"
  });

  // Filter logic
  const filteredEvents = useMemo(() => {
    return mockVolunteerEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.organization.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = filters.location === "Tất cả" || event.location === filters.location;
      const matchesCause = filters.cause === "Tất cả" || event.cause === filters.cause;
      const matchesCommitment = filters.commitment === "Tất cả" || event.commitment === filters.commitment;
      const matchesDifficulty = filters.difficulty === "Tất cả" || event.difficulty === filters.difficulty;
      const matchesUrgent = !showOnlyUrgent || event.urgent;
      const matchesFeatured = !showOnlyFeatured || event.featured;

      return matchesSearch && matchesLocation && matchesCause && matchesCommitment && 
             matchesDifficulty && matchesUrgent && matchesFeatured;
    });
  }, [searchTerm, filters, showOnlyUrgent, showOnlyFeatured]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      location: "Tất cả",
      cause: "Tất cả",
      commitment: "Tất cả",
      difficulty: "Tất cả"
    });
    setSearchTerm("");
    setShowOnlyUrgent(false);
    setShowOnlyFeatured(false);
  };

  const hasActiveFilters = Object.values(filters).some(val => val !== "Tất cả") || 
                          searchTerm || showOnlyUrgent || showOnlyFeatured;

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case "Dễ": return "bg-green-100 text-green-700";
      case "Vừa": return "bg-yellow-100 text-yellow-700";
      case "Khó": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getCauseIcon = (cause) => {
    switch(cause) {
      case "Xã hội": return "👥";
      case "Giáo dục": return "📚";
      case "Môi trường": return "🌱";
      case "Y tế": return "🏥";
      case "Khẩn cấp": return "🚨";
      case "Thể thao": return "🏃";
      default: return "❤️";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-blue-200" />
            <h1 className="text-3xl font-bold">Tình Nguyện Việt Nam</h1>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl">
            Tham gia các hoạt động tình nguyện ý nghĩa, góp phần xây dựng cộng đồng và tạo ra sự thay đổi tích cực cho xã hội
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-gray-900">{mockVolunteerEvents.length}</p>
                <p className="text-gray-600 text-sm">Dự án tình nguyện</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-gray-900">
                  {mockVolunteerEvents.reduce((sum, event) => sum + event.joined, 0)}
                </p>
                <p className="text-gray-600 text-sm">Tình nguyện viên</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-gray-900">
                  {mockVolunteerEvents.filter(e => e.urgent).length}
                </p>
                <p className="text-gray-600 text-sm">Cần gấp</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-gray-900">
                  {mockVolunteerEvents.filter(e => e.featured).length}
                </p>
                <p className="text-gray-600 text-sm">Nổi bật</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm dự án tình nguyện, tổ chức..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Quick Filter Toggles */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <button
            onClick={() => setShowOnlyUrgent(!showOnlyUrgent)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              showOnlyUrgent 
                ? 'bg-red-600 text-white' 
                : 'bg-white border border-red-200 text-red-600 hover:bg-red-50'
            }`}
          >
            🚨 Cần gấp
          </button>
          <button
            onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              showOnlyFeatured 
                ? 'bg-purple-600 text-white' 
                : 'bg-white border border-purple-200 text-purple-600 hover:bg-purple-50'
            }`}
          >
            ⭐ Nổi bật
          </button>
        </div>

        {/* Filter Section */}
        <div className={`bg-white rounded-lg shadow-sm border transition-all duration-300 overflow-hidden ${
          isFilterOpen ? 'mb-6' : 'mb-6'
        }`}>
          {/* Filter Header */}
          <div 
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Bộ lọc chi tiết</span>
              {hasActiveFilters && (
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                  Đang áp dụng
                </span>
              )}
            </div>
            {isFilterOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>

          {/* Filter Content */}
          <div className={`transition-all duration-300 ${
            isFilterOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="p-4 pt-0 space-y-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Địa điểm
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) => updateFilter('location', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Cause Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Heart className="w-4 h-4 inline mr-1" />
                    Lĩnh vực
                  </label>
                  <select
                    value={filters.cause}
                    onChange={(e) => updateFilter('cause', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {causes.map(cause => (
                      <option key={cause} value={cause}>{cause}</option>
                    ))}
                  </select>
                </div>

                {/* Commitment Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Cam kết thời gian
                  </label>
                  <select
                    value={filters.commitment}
                    onChange={(e) => updateFilter('commitment', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {commitments.map(commitment => (
                      <option key={commitment} value={commitment}>{commitment}</option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Award className="w-4 h-4 inline mr-1" />
                    Độ khó
                  </label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) => updateFilter('difficulty', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <div className="flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <X className="w-4 h-4" />
                    Xóa tất cả bộ lọc
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Tìm thấy <span className="font-semibold text-blue-600">{filteredEvents.length}</span> dự án tình nguyện
          </p>
        </div>

        {/* Volunteer Events List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 overflow-hidden">
              {/* Event Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{getCauseIcon(event.cause)}</span>
                      {event.urgent && (
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium animate-pulse">
                          🚨 KHẨN CẤP
                        </span>
                      )}
                      {event.featured && (
                        <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs font-medium">
                          ⭐ NỔI BẬT
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-blue-600 font-medium">{event.organization}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(event.difficulty)}`}>
                    {event.difficulty}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>

                {/* Event Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                    <span>{event.commitment} • {event.duration}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-blue-600" />
                    <span>
                      {event.joined}/{event.volunteers} người tham gia
                    </span>
                    <div className="ml-2 flex-1 bg-gray-200 rounded-full h-2 max-w-20">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${Math.min(100, (event.joined / event.volunteers) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Skills & Benefits */}
                <div className="mb-4 space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Kỹ năng: </span>
                    <span className="text-sm text-gray-600">{event.skills.join(", ")}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Lợi ích: </span>
                    <span className="text-sm text-gray-600">{event.benefits.join(", ")}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-medium">
                      {event.cause}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                      Tìm hiểu thêm
                    </button>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                      Đăng ký ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Heart className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy dự án tình nguyện nào</h3>
            <p className="text-gray-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để tìm các cơ hội phù hợp</p>
          </div>
        )}
      </div>
    </div>
  );
}