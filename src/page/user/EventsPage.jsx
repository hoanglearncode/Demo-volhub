import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, MapPin, DollarSign, Clock, Users, Filter, Search, X } from "lucide-react";

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
    isVolunteer: false
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
    isVolunteer: true
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
    isVolunteer: false
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
    isVolunteer: false
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
    isVolunteer: true
  },
  {
    id: 6,
    title: "Triển lám Nghệ thuật Đương đại",
    location: "TP.HCM",
    salary: "250,000 - 400,000 VNĐ/ngày",
    time: "12/07/2025 - 20/07/2025",
    type: "Part-time",
    category: "Triển lãm",
    volunteers: 15,
    description: "Tuyển hướng dẫn viên và nhân viên bảo vệ cho triển lãm nghệ thuật đương đại.",
    isVolunteer: false
  }
];

const locations = ["Tất cả", "Hà Nội", "TP.HCM", "Đà Nẵng", "Cần Thơ"];
const salaryRanges = ["Tất cả", "Phi lợi nhuận", "Dưới 200k", "200k - 500k", "Trên 500k"];
const eventTypes = ["Tất cả", "Part-time", "Full-time", "Tình nguyện"];
const categories = ["Tất cả", "Sự kiện", "Từ thiện", "Festival", "Hội thảo", "Môi trường", "Triển lãm"];

export default function EventsPage() {
  

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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

  const hasActiveFilters = Object.values(filters).some(val => val !== "Tất cả") || searchTerm;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sự kiện..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
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
              <span className="font-semibold text-gray-900">Bộ lọc</span>
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

                {/* Salary Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Mức phụ cấp
                  </label>
                  <select
                    value={filters.salary}
                    onChange={(e) => updateFilter('salary', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {salaryRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Loại hình
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => updateFilter('type', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
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
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <div className="flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <X className="w-4 h-4" />
                    Xóa bộ lọc
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Tìm thấy <span className="font-semibold text-blue-600">{filteredEvents.length}</span> sự kiện
          </p>
        </div>

        {/* Events List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                    {event.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.isVolunteer 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {event.type}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2 text-blue-600" />
                    <span className={event.isVolunteer ? 'text-green-600 font-medium' : ''}>
                      {event.salary}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Cần {event.volunteers} người</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                    {event.category}
                  </span>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    {event.isVolunteer ? 'Đăng ký TNV' : 'Ứng tuyển'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy sự kiện nào</h3>
            <p className="text-gray-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}
      </div>
    </div>
  );
}