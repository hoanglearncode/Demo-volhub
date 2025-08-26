import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, MapPin, Trophy, Clock, Users, Filter, Search, X, Calendar, Star, Zap, Gift, Target } from "lucide-react";

// Mock data - dữ liệu cuộc thi mẫu
const mockContests = [
  {
    id: 1,
    title: "Cuộc thi Khởi nghiệp Đổi mới Sáng tạo 2025",
    location: "Toàn quốc",
    category: "Khởi nghiệp",
    registrationDeadline: "31/03/2025",
    contestDate: "15/04/2025 - 20/04/2025",
    prize: "500,000,000 VNĐ",
    participants: 1000,
    registered: 657,
    difficulty: "Khó",
    format: "Online + Offline",
    description: "Cuộc thi dành cho các dự án khởi nghiệp sáng tạo, đặc biệt trong lĩnh vực công nghệ và chuyển đổi số.",
    organizer: "Bộ Khoa học & Công nghệ",
    requirements: ["Sinh viên/Người đi làm", "Có ý tưởng khởi nghiệp", "Làm việc nhóm"],
    benefits: ["Giải thưởng lớn", "Mentor 1-1", "Kết nối nhà đầu tư"],
    status: "Đang mở",
    featured: true,
    trending: false
  },
  {
    id: 2,
    title: "Olympic Tin học Việt Nam 2025",
    location: "Hà Nội",
    category: "Lập trình",
    registrationDeadline: "15/02/2025",
    contestDate: "01/03/2025",
    prize: "50,000,000 VNĐ",
    participants: 500,
    registered: 423,
    difficulty: "Rất khó",
    format: "Offline",
    description: "Cuộc thi lập trình danh giá nhất Việt Nam dành cho học sinh, sinh viên và các lập trình viên chuyên nghiệp.",
    organizer: "Hội Tin học Việt Nam",
    requirements: ["Kiến thức thuật toán", "Ngôn ngữ lập trình", "Tư duy logic"],
    benefits: ["Chứng chỉ Olympic", "Cơ hội việc làm", "Học bổng"],
    status: "Sắp đóng",
    featured: true,
    trending: true
  },
  {
    id: 3,
    title: "Cuộc thi Thiết kế Đồ họa Creative Awards",
    location: "TP.HCM",
    category: "Thiết kế",
    registrationDeadline: "20/04/2025",
    contestDate: "05/05/2025 - 10/05/2025",
    prize: "100,000,000 VNĐ",
    participants: 300,
    registered: 178,
    difficulty: "Vừa",
    format: "Online",
    description: "Cuộc thi dành cho các nhà thiết kế đồ họa, tìm kiếm những ý tưởng sáng tạo và độc đáo nhất.",
    organizer: "Adobe Vietnam",
    requirements: ["Kỹ năng thiết kế", "Phần mềm đồ họa", "Tư duy sáng tạo"],
    benefits: ["Phần mềm Adobe", "Internship", "Portfolio"],
    status: "Đang mở",
    featured: false,
    trending: true
  },
  {
    id: 4,
    title: "Hội thi Hùng biện Tiếng Anh 2025",
    location: "Đà Nẵng", 
    category: "Ngôn ngữ",
    registrationDeadline: "10/03/2025",
    contestDate: "25/03/2025",
    prize: "30,000,000 VNĐ",
    participants: 200,
    registered: 156,
    difficulty: "Vừa",
    format: "Offline",
    description: "Cuộc thi hùng biện tiếng Anh dành cho sinh viên, nâng cao kỹ năng thuyết trình và giao tiếp.",
    organizer: "IDP Education",
    requirements: ["Tiếng Anh tốt", "Kỹ năng thuyết trình", "Tự tin"],
    benefits: ["Học bổng du học", "Chứng chỉ IELTS", "Networking"],
    status: "Đang mở",
    featured: false,
    trending: false
  },
  {
    id: 5,
    title: "Cuộc thi Ảnh Du lịch Việt Nam",
    location: "Toàn quốc",
    category: "Nghệ thuật",
    registrationDeadline: "30/06/2025",
    contestDate: "15/07/2025",
    prize: "80,000,000 VNĐ",
    participants: 1500,
    registered: 234,
    difficulty: "Dễ",
    format: "Online",
    description: "Cuộc thi chụp ảnh du lịch, giới thiệu vẻ đẹp Việt Nam qua góc nhìn của nhiếp ảnh gia.",
    organizer: "Tổng cục Du lịch VN",
    requirements: ["Máy ảnh/Điện thoại", "Đam mê du lịch", "Góc nhìn sáng tạo"],
    benefits: ["Du lịch miễn phí", "Thiết bị chụp ảnh", "Triển lãm ảnh"],
    status: "Đang mở",
    featured: false,
    trending: false
  },
  {
    id: 6,
    title: "Hackathon Fintech Challenge 2025",
    location: "TP.HCM",
    category: "Công nghệ",
    registrationDeadline: "28/02/2025",
    contestDate: "15/03/2025 - 17/03/2025",
    prize: "200,000,000 VNĐ",
    participants: 400,
    registered: 389,
    difficulty: "Khó",
    format: "Offline",
    description: "Cuộc thi phát triển ứng dụng tài chính trong 48 giờ, tập trung vào blockchain và AI.",
    organizer: "Techcombank & FPT",
    requirements: ["Lập trình", "Hiểu biết fintech", "Làm việc nhóm"],
    benefits: ["Việc làm ngay", "Đầu tư startup", "Mentorship"],
    status: "Sắp đóng",
    featured: true,
    trending: true
  },
  {
    id: 7,
    title: "Cuộc thi Viết Blog Du lịch",
    location: "Online",
    category: "Văn học",
    registrationDeadline: "15/05/2025",
    contestDate: "01/06/2025",
    prize: "25,000,000 VNĐ",
    participants: 800,
    registered: 145,
    difficulty: "Dễ",
    format: "Online",
    description: "Cuộc thi viết blog chia sẻ trải nghiệm du lịch, khuyến khích khám phá văn hóa Việt Nam.",
    organizer: "Vietnam Airlines",
    requirements: ["Kỹ năng viết", "Trải nghiệm du lịch", "Sáng tạo nội dung"],
    benefits: ["Vé máy bay", "Voucher khách sạn", "Cơ hội hợp tác"],
    status: "Đang mở",
    featured: false,
    trending: false
  },
  {
    id: 8,
    title: "Cuộc thi Nhảy Street Dance Battle",
    location: "Hà Nội",
    category: "Thể thao",
    registrationDeadline: "20/03/2025",
    contestDate: "05/04/2025",
    prize: "40,000,000 VNĐ",
    participants: 150,
    registered: 98,
    difficulty: "Vừa",
    format: "Offline",
    description: "Cuộc thi nhảy street dance quy mô lớn, tìm kiếm những dancer tài năng nhất Việt Nam.",
    organizer: "Youth Dance Vietnam",
    requirements: ["Kỹ năng nhảy", "Thể lực tốt", "Tinh thần thi đấu"],
    benefits: ["Hợp đồng biểu diễn", "Đào tạo chuyên nghiệp", "Quảng bá"],
    status: "Đang mở",
    featured: false,
    trending: true
  }
];

const locations = ["Tất cả", "Toàn quốc", "Online", "Hà Nội", "TP.HCM", "Đà Nẵng"];
const categories = ["Tất cả", "Khởi nghiệp", "Lập trình", "Thiết kế", "Ngôn ngữ", "Nghệ thuật", "Công nghệ", "Văn học", "Thể thao"];
const difficulties = ["Tất cả", "Dễ", "Vừa", "Khó", "Rất khó"];
const formats = ["Tất cả", "Online", "Offline", "Online + Offline"];
const statuses = ["Tất cả", "Đang mở", "Sắp đóng", "Đã đóng"];

export default function ContestPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
  const [showOnlyTrending, setShowOnlyTrending] = useState(false);
  const [filters, setFilters] = useState({
    location: "Tất cả",
    category: "Tất cả",
    difficulty: "Tất cả",
    format: "Tất cả",
    status: "Tất cả"
  });

  // Filter logic
  const filteredContests = useMemo(() => {
    return mockContests.filter(contest => {
      const matchesSearch = contest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contest.organizer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = filters.location === "Tất cả" || contest.location === filters.location;
      const matchesCategory = filters.category === "Tất cả" || contest.category === filters.category;
      const matchesDifficulty = filters.difficulty === "Tất cả" || contest.difficulty === filters.difficulty;
      const matchesFormat = filters.format === "Tất cả" || contest.format === filters.format;
      const matchesStatus = filters.status === "Tất cả" || contest.status === filters.status;
      const matchesFeatured = !showOnlyFeatured || contest.featured;
      const matchesTrending = !showOnlyTrending || contest.trending;

      return matchesSearch && matchesLocation && matchesCategory && matchesDifficulty && 
             matchesFormat && matchesStatus && matchesFeatured && matchesTrending;
    });
  }, [searchTerm, filters, showOnlyFeatured, showOnlyTrending]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      location: "Tất cả",
      category: "Tất cả",
      difficulty: "Tất cả",
      format: "Tất cả",
      status: "Tất cả"
    });
    setSearchTerm("");
    setShowOnlyFeatured(false);
    setShowOnlyTrending(false);
  };

  const hasActiveFilters = Object.values(filters).some(val => val !== "Tất cả") || 
                          searchTerm || showOnlyFeatured || showOnlyTrending;

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case "Dễ": return "bg-green-100 text-green-700";
      case "Vừa": return "bg-yellow-100 text-yellow-700";
      case "Khó": return "bg-orange-100 text-orange-700";
      case "Rất khó": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Đang mở": return "bg-green-100 text-green-700 border-green-200";
      case "Sắp đóng": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Đã đóng": return "bg-gray-100 text-gray-700 border-gray-200";
      default: return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case "Khởi nghiệp": return "🚀";
      case "Lập trình": return "💻";
      case "Thiết kế": return "🎨";
      case "Ngôn ngữ": return "🗣️";
      case "Nghệ thuật": return "📸";
      case "Công nghệ": return "⚡";
      case "Văn học": return "✍️";
      case "Thể thao": return "🏆";
      default: return "🎯";
    }
  };

  const formatPrize = (prize) => {
    if (prize.includes("000,000,000")) {
      return prize.replace("000,000,000 VNĐ", " tỷ VNĐ");
    }
    if (prize.includes("000,000")) {
      return prize.replace("000,000 VNĐ", " triệu VNĐ");
    }
    return prize;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-300" />
            <h1 className="text-3xl font-bold">Cuộc Thi & Giải Đấu</h1>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl">
            Tham gia các cuộc thi hấp dẫn, thử thách bản thân và giành những giải thưởng giá trị
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-gray-900">{mockContests.length}</p>
                <p className="text-gray-600 text-sm">Cuộc thi</p>
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
                  {mockContests.reduce((sum, contest) => sum + contest.registered, 0)}
                </p>
                <p className="text-gray-600 text-sm">Thí sinh đăng ký</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Gift className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(mockContests.reduce((sum, contest) => {
                    const prizeNum = parseFloat(contest.prize.replace(/[^\d]/g, '')) / 1000000;
                    return sum + prizeNum;
                  }, 0))}M
                </p>
                <p className="text-gray-600 text-sm">Tổng giải thưởng</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="bg-red-100 p-2 rounded-lg">
                <Zap className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-gray-900">
                  {mockContests.filter(c => c.trending).length}
                </p>
                <p className="text-gray-600 text-sm">Đang hot</p>
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
              placeholder="Tìm kiếm cuộc thi, giải đấu, tổ chức..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Quick Filter Toggles */}
        <div className="flex gap-3 mb-6 flex-wrap">
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
          <button
            onClick={() => setShowOnlyTrending(!showOnlyTrending)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              showOnlyTrending 
                ? 'bg-red-600 text-white' 
                : 'bg-white border border-red-200 text-red-600 hover:bg-red-50'
            }`}
          >
            🔥 Đang hot
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
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Target className="w-4 h-4 inline mr-1" />
                    Danh mục
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => updateFilter('category', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Trophy className="w-4 h-4 inline mr-1" />
                    Độ khó
                  </label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) => updateFilter('difficulty', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {difficulties.map(diff => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                </div>

                {/* Format Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Hình thức
                  </label>
                  <select
                    value={filters.format}
                    onChange={(e) => updateFilter('format', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {formats.map(format => (
                      <option key={format} value={format}>{format}</option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Star className="w-4 h-4 inline mr-1" />
                    Trạng thái
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => updateFilter('status', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
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
            Tìm thấy <span className="font-semibold text-blue-600">{filteredContests.length}</span> cuộc thi
          </p>
        </div>

        {/* Contest List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredContests.map(contest => (
            <div key={contest.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 overflow-hidden">
              {/* Contest Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-2xl">{getCategoryIcon(contest.category)}</span>
                      {contest.featured && (
                        <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs font-medium">
                          ⭐ NỔI BẬT
                        </span>
                      )}
                      {contest.trending && (
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                          🔥 HOT
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(contest.status)}`}>
                        {contest.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 mb-2">
                      {contest.title}
                    </h3>
                    <p className="text-sm text-blue-600 font-medium">{contest.organizer}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(contest.difficulty)}`}>
                    {contest.difficulty}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">{contest.description}</p>

                {/* Prize & Participants */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Gift className="w-5 h-5 text-yellow-600 mr-2" />
                      <div>
                        <p className="text-sm text-gray-600">Tổng giải thưởng</p>
                        <p className="text-lg font-bold text-yellow-700">{formatPrize(contest.prize)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Đã đăng ký</p>
                      <p className="text-lg font-bold text-blue-600">
                        {contest.registered}/{contest.participants}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="bg-white rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (contest.registered / contest.participants) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Contest Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                    <span>{contest.location} • {contest.format}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Đăng ký đến: {contest.registrationDeadline}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Thi đấu: {contest.contestDate}</span>
                  </div>
                </div>

                {/* Requirements & Benefits */}
                <div className="mb-4 space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Yêu cầu: </span>
                    <span className="text-sm text-gray-600">{contest.requirements.join(", ")}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Lợi ích: </span>
                    <span className="text-sm text-gray-600">{contest.benefits.join(", ")}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-medium">
                      {contest.category}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                      Chi tiết
                    </button>
                    <button 
                      className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                        contest.status === 'Đã đóng' 
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : contest.status === 'Sắp đóng'
                          ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                      disabled={contest.status === 'Đã đóng'}
                    >
                      {contest.status === 'Đã đóng' ? 'Đã đóng' : 'Đăng ký ngay'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredContests.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Trophy className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy cuộc thi nào</h3>
            <p className="text-gray-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để tìm các cuộc thi phù hợp</p>
          </div>
        )}

        {/* CTA Banner */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Bạn muốn tổ chức cuộc thi?</h2>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Đăng thông tin cuộc thi của bạn trên nền tảng để tiếp cận hàng ngàn thí sinh tài năng
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Đăng cuộc thi miễn phí
          </button>
        </div>
      </div>
    </div>
  );
}