import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Heart, MapPin, Users, Star, Award, Globe } from 'lucide-react';


// Mock data for demonstration
const stats = [
  { label: "Sự kiện đã tổ chức", value: "1,250+", icon: Calendar },
  { label: "Tình nguyện viên", value: "15,000+", icon: Users },
  { label: "Tỉnh thành", value: "63", icon: MapPin },
  { label: "Giờ tình nguyện", value: "50,000+", icon: Heart }
];

const mockActivities = [
  {
    id: 1,
    title: "Trồng cây xanh tại Hà Nội",
    location: "Hà Nội",
    date: "2024-09-15",
    volunteers: 50,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop",
    category: "Môi trường"
  },
  {
    id: 2,
    title: "Hỗ trợ trẻ em vùng cao",
    location: "Sapa, Lào Cai",
    date: "2024-09-20",
    volunteers: 30,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=250&fit=crop",
    category: "Giáo dục"
  },
  {
    id: 3,
    title: "Dọn dẹp bãi biển",
    location: "Đà Nẵng",
    date: "2024-09-25",
    volunteers: 75,
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=250&fit=crop",
    category: "Môi trường"
  },
  {
    id: 4,
    title: "Chăm sóc người già",
    location: "TP. Hồ Chí Minh",
    date: "2024-09-30",
    volunteers: 25,
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop",
    category: "Xã hội"
  }
];

const partners = [
  { id: 1, name: "Tổ chức Giáo dục", partners: [
    { name: "UNESCO", logoSrc: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop", official: "#" },
    { name: "UNICEF", logoSrc: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=60&h=60&fit=crop", official: "#" },
    { name: "WWF", logoSrc: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=60&h=60&fit=crop", official: "#" }
  ]},
  { id: 2, name: "Tổ chức Môi trường", partners: [
    { name: "Greenpeace", logoSrc: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=60&h=60&fit=crop", official: "#" },
    { name: "WWF", logoSrc: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=60&h=60&fit=crop", official: "#" }
  ]},
  { id: 3, name: "Tổ chức Y tế", partners: [
    { name: "WHO", logoSrc: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=60&h=60&fit=crop", official: "#" },
    { name: "Red Cross", logoSrc: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=60&h=60&fit=crop", official: "#" }
  ]}
];


// Main Home Component
const Home = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [pannerActive, setPannerActive] = useState(0);
  const [activity, setActivity] = useState(mockActivities);

  const handlePrevious = () => {
    setActiveTab(prev => prev === 0 ? mockActivities.length - 4 : prev - 1);
  };

  const handleNext = () => {
    setActiveTab(prev => prev >= mockActivities.length - 4 ? 0 : prev + 1);
  };

  return (
    <div className="min-h-screen bg-white">
   
      
      {/* Platform Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-500 bg-clip-text text-transparent mb-4">
              Khám phá nền tảng của chúng tôi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cùng nhau xây dựng cộng đồng tình nguyện mạnh mẽ trên khắp Việt Nam
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-2xl mb-4">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Activities Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
              Các hoạt động nổi bật
            </h2>
            <div className="flex items-center gap-3">
              <button 
                onClick={handlePrevious}
                className="p-2 sm:p-3 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              </button>
              <button className="hidden sm:block px-4 py-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">
                Xem tất cả
              </button>
              <button 
                onClick={handleNext}
                className="p-2 sm:p-3 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
          </div>
          
          <div className="text-center mt-8 sm:hidden">
            <button className="px-6 py-3 text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">
              Xem tất cả hoạt động
            </button>
          </div>
        </div>
      </section>

      {/* Trusted Partners Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-500 bg-clip-text text-transparent mb-4">
              Đối tác tin cậy
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Cùng với hàng trăm tổ chức uy tín, chúng tôi xây dựng cộng đồng tình nguyện bền vững
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
            {partners.slice(0, 3).map((item, idx) => (
              <button 
                key={item.id} 
                onClick={() => setPannerActive(idx)}
                className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold border rounded-xl transition-all duration-200 ${
                  idx === pannerActive 
                    ? "bg-blue-100 text-blue-600 border-blue-300" 
                    : "text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-12 mb-12">
            {partners[pannerActive]?.partners.map((partner, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <img 
                    src={partner.logoSrc} 
                    alt={partner.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-sm sm:text-base font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
          
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">
                Trở thành đối tác của chúng tôi ngay!
              </h3>
              <p className="text-blue-100 mb-6 sm:mb-8 text-sm sm:text-base max-w-2xl mx-auto">
                Cùng chúng tôi tạo ra những thay đổi tích cực cho cộng đồng
              </p>
              <button className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30">
                Đăng ký ngay
                <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;