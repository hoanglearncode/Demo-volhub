import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, MapPin, DollarSign, Clock, Users, Filter, Search, X, Heart, Share2, Bookmark, Star } from "lucide-react";

// Mock data - sẽ được thay thế bằng dữ liệu từ Facebook API
const mockEvents = [
  {
    id: 1,
    title: "Hội chợ Xuân 2025 - Tuyển MC và Staff",
    location: "Hà Nội",
    salary: "200,000 - 500,000 VNĐ/ngày",
    time: "15/02/2025 - 20/02/2025",
    type: "Part-time",
    category: "Sự kiện",
    volunteers: 50,
    description: "Tuyển MC và nhân viên hỗ trợ cho hội chợ xuân tại Hà Nội. Yêu cầu có kinh nghiệm.",
    isVolunteer: false,
    rating: 4.8,
    applicants: 120,
    urgency: "high",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop"
  },
  {
    id: 2,
    title: "Chương trình từ thiện vì trẻ em nghèo",
    location: "TP.HCM",
    salary: "Phi lợi nhuận",
    time: "10/03/2025",
    type: "Tình nguyện",
    category: "Từ thiện",
    volunteers: 100,
    description: "Chương trình giúp đỡ trẻ em có hoàn cảnh khó khăn. Tìm kiếm những tình nguyện viên nhiệt huyết.",
    isVolunteer: true,
    rating: 4.9,
    applicants: 85,
    urgency: "medium",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=200&fit=crop"
  },
  {
    id: 3,
    title: "Festival Âm nhạc Hè 2025",
    location: "Đà Nẵng",
    salary: "300,000 - 800,000 VNĐ/ngày",
    time: "01/06/2025 - 03/06/2025",
    type: "Full-time",
    category: "Festival",
    volunteers: 30,
    description: "Tuyển nhân viên tổ chức festival âm nhạc lớn nhất miền Trung. Ưu tiên có kinh nghiệm.",
    isVolunteer: false,
    rating: 4.7,
    applicants: 200,
    urgency: "low",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop"
  },
  {
    id: 4,
    title: "Hội thảo Khởi nghiệp Công nghệ",
    location: "Hà Nội",
    salary: "150,000 - 300,000 VNĐ/ngày",
    time: "25/04/2025",
    type: "Part-time",
    category: "Hội thảo",
    volunteers: 20,
    description: "Hỗ trợ tổ chức hội thảo khởi nghiệp công nghệ. Tuyển nhân viên check-in và hỗ trợ kỹ thuật.",
    isVolunteer: false,
    rating: 4.6,
    applicants: 45,
    urgency: "medium",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop"
  },
  {
    id: 5,
    title: "Chiến dịch Trồng cây xanh",
    location: "Cần Thơ",
    salary: "Phi lợi nhuận",
    time: "05/05/2025",
    type: "Tình nguyện",
    category: "Môi trường",
    volunteers: 200,
    description: "Tham gia chiến dịch trồng cây xanh bảo vệ môi trường. Chung tay vì một Việt Nam xanh.",
    isVolunteer: true,
    rating: 4.8,
    applicants: 300,
    urgency: "high",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop"
  },
  {
    id: 6,
    title: "Triển lãm Nghệ thuật Đương đại",
    location: "TP.HCM",
    salary: "250,000 - 400,000 VNĐ/ngày",
    time: "12/07/2025 - 20/07/2025",
    type: "Part-time",
    category: "Triển lãm",
    volunteers: 15,
    description: "Tuyển hướng dẫn viên và nhân viên bảo vệ cho triển lãm nghệ thuật đương đại.",
    isVolunteer: false,
    rating: 4.5,
    applicants: 60,
    urgency: "low",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop"
  }
];

const locations = ["Tất cả", "Hà Nội", "TP.HCM", "Đà Nẵng", "Cần Thơ"];
const salaryRanges = ["Tất cả", "Phi lợi nhuận", "Dưới 200k", "200k - 500k", "Trên 500k"];
const eventTypes = ["Tất cả", "Part-time", "Full-time", "Tình nguyện"];
const categories = ["Tất cả", "Sự kiện", "Từ thiện", "Festival", "Hội thảo", "Môi trường", "Triển lãm"];

export default function EventsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("newest");
  const [savedEvents, setSavedEvents] = useState(new Set());
  const [userStatus, setUserStatus] = useState("available");
  const [filters, setFilters] = useState({
    location: "Tất cả",
    salary: "Tất cả", 
    type: "Tất cả",
    category: "Tất cả"
  });

  // Filter logic
  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = filters.location === "Tất cả" || event.location === filters.location;
      const matchesType = filters.type === "Tất cả" || event.type === filters.type;
      const matchesCategory = filters.category === "Tất cả" || event.category === filters.category;
      
      let matchesSalary = true;
      if (filters.salary !== "Tất cả") {
        if (filters.salary === "Phi lợi nhuận") {
          matchesSalary = event.isVolunteer;
        } else if (filters.salary === "Dưới 200k") {
          matchesSalary = !event.isVolunteer && event.salary.includes("200,000") && !event.salary.includes("500,000");
        } else if (filters.salary === "200k - 500k") {
          matchesSalary = !event.isVolunteer && (event.salary.includes("200,000") || event.salary.includes("300,000") || event.salary.includes("500,000"));
        } else if (filters.salary === "Trên 500k") {
          matchesSalary = !event.isVolunteer && event.salary.includes("800,000");
        }
      }

      return matchesSearch && matchesLocation && matchesType && matchesCategory && matchesSalary;
    });
  }, [searchTerm, filters]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      location: "Tất cả",
      salary: "Tất cả",
      type: "Tất cả", 
      category: "Tất cả"
    });
    setSearchTerm("");
  };

  const toggleSaveEvent = (eventId) => {
    setSavedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const hasActiveFilters = Object.values(filters).some(val => val !== "Tất cả") || searchTerm;

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getUrgencyText = (urgency) => {
    switch (urgency) {
      case 'high': return 'Gấp';
      case 'medium': return 'Bình thường';
      default: return 'Không gấp';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Cơ hội Việc làm & Tình nguyện</h1>
              <p className="text-gray-600">Khám phá {filteredEvents.length} cơ hội phù hợp với bạn</p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sự kiện..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
            >
              <Filter className="h-4 w-4" />
              Bộ lọc
              {isFilterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
              >
                <X className="h-3 w-3" />
                Xóa lọc
              </button>
            )}

            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(([key, value]) => 
                value !== "Tất cả" && (
                  <span key={key} className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {value}
                    <button onClick={() => updateFilter(key, "Tất cả")} className="hover:bg-blue-200 rounded-full p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )
              )}
            </div>
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Địa điểm</label>
                  <select 
                    value={filters.location} 
                    onChange={(e) => updateFilter("location", e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lương</label>
                  <select 
                    value={filters.salary} 
                    onChange={(e) => updateFilter("salary", e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {salaryRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loại hình</label>
                  <select 
                    value={filters.type} 
                    onChange={(e) => updateFilter("type", e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                  <select 
                    value={filters.category} 
                    onChange={(e) => updateFilter("category", e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Events List */}
          <div className="lg:col-span-9">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                Hiển thị <span className="font-medium">{filteredEvents.length}</span> kết quả
              </p>
              <div className="flex items-center gap-2">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="salary">Lương cao</option>
                  <option value="rating">Đánh giá</option>
                  <option value="urgent">Gấp</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {filteredEvents.length > 0 ? filteredEvents.map(event => (
                <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  <div className="flex flex-col md:flex-row">
                    {/* Event Image */}
                    <div className="md:w-48 h-48 md:h-auto bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getUrgencyColor(event.urgency)}`}>
                          {getUrgencyText(event.urgency)}
                        </span>
                      </div>
                    </div>

                    {/* Event Content */}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {event.title}
                            </h3>
                            <div className="flex items-center text-yellow-500">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="text-sm text-gray-600 ml-1">{event.rating}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{event.description}</p>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => toggleSaveEvent(event.id)}
                            className={`p-2 rounded-full transition-colors ${
                              savedEvents.has(event.id) 
                                ? 'bg-red-100 text-red-600' 
                                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${savedEvents.has(event.id) ? 'fill-current' : ''}`} />
                          </button>
                          <button className="p-2 rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                          <span className={`text-sm ${event.isVolunteer ? 'text-green-600 font-medium' : ''}`}>
                            {event.salary}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-2 text-purple-500" />
                          <span className="text-sm">{event.time}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-2 text-orange-500" />
                          <span className="text-sm">Cần {event.volunteers} người</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            event.isVolunteer 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {event.type}
                          </span>
                          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                            {event.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {event.applicants} người đã ứng tuyển
                          </span>
                        </div>
                        
                        <button className={`px-6 py-2.5 rounded-lg font-medium transition-all transform hover:scale-105 ${
                          event.isVolunteer 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/25' 
                            : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25'
                        }`}>
                          {event.isVolunteer ? 'Đăng ký TNV' : 'Ứng tuyển'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-20 h-20 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy sự kiện nào</h3>
                  <p className="text-gray-600 mb-4">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                  <button 
                    onClick={clearFilters}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Xóa tất cả bộ lọc
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3 mt-8 lg:mt-0">
            <div className="space-y-6">
              {/* User Status Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Trạng thái của bạn</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => setUserStatus("available")}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      userStatus === "available" 
                        ? 'bg-green-50 border-2 border-green-200 text-green-800' 
                        : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Sẵn sàng làm việc</div>
                        <div className="text-sm opacity-75">Tìm kiếm cơ hội mới</div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${userStatus === "available" ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => setUserStatus("busy")}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      userStatus === "busy" 
                        ? 'bg-yellow-50 border-2 border-yellow-200 text-yellow-800' 
                        : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Đang bận</div>
                        <div className="text-sm opacity-75">Không nhận công việc mới</div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${userStatus === "busy" ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống kê nhanh</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Sự kiện đã lưu</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                      {savedEvents.size}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Đang ứng tuyển</span>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium">
                      3
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Hoàn thành</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      12
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Đã ứng tuyển "Hội chợ Xuân 2025"</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Đã lưu "Festival Âm nhạc Hè"</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-600">Hoàn thành "Chương trình từ thiện"</span>
                  </div>
                </div>
              </div>

              {/* Recommended Events */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-sm border border-purple-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Đề xuất cho bạn</h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-purple-100">
                    <h4 className="font-medium text-gray-900 text-sm">Hội chợ Sách Hà Nội</h4>
                    <p className="text-xs text-gray-600 mt-1">Phù hợp với sở thích của bạn</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">Part-time</span>
                      <button className="text-xs text-blue-600 hover:underline">Xem chi tiết</button>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 border border-purple-100">
                    <h4 className="font-medium text-gray-900 text-sm">Tình nguyện dạy học</h4>
                    <p className="text-xs text-gray-600 mt-1">Dựa trên kinh nghiệm của bạn</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Tình nguyện</span>
                      <button className="text-xs text-blue-600 hover:underline">Xem chi tiết</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-20">
        <div className="relative group">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
            <Bookmark className="w-6 h-6" />
          </button>
          <div className="absolute bottom-16 right-0 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Sự kiện đã lưu ({savedEvents.size})
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden">
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl p-6 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Bộ lọc</h3>
              <button onClick={() => setIsFilterOpen(false)}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Địa điểm</label>
                <select 
                  value={filters.location} 
                  onChange={(e) => updateFilter("location", e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lương</label>
                <select 
                  value={filters.salary} 
                  onChange={(e) => updateFilter("salary", e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {salaryRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loại hình</label>
                <select 
                  value={filters.type} 
                  onChange={(e) => updateFilter("type", e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                <select 
                  value={filters.category} 
                  onChange={(e) => updateFilter("category", e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={clearFilters}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Xóa tất cả
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Áp dụng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}