import React, { useState, useEffect } from "react";
import { Search, Home, Users, HeartHandshake, Phone, Mail, ArrowRight } from "lucide-react";

const NotFoundPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const FloatingCircle = ({ delay, size = "w-4 h-4" }) => (
    <div
      className={`${size} bg-white/20 rounded-full absolute animate-pulse`}
      style={{
        animationDelay: `${delay}s`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
      }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <FloatingCircle key={i} delay={i * 0.5} />
        ))}
        {[...Array(4)].map((_, i) => (
          <FloatingCircle key={`large-${i}`} delay={i * 1.2} size="w-6 h-6" />
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center relative z-10 border border-white/20">
        {/* Error Code */}
        <div className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-4 animate-pulse">
          404
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Trang Không Tồn Tại
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          Có thể chương trình cộng tác viên hoặc tình nguyện viên bạn muốn xem đã được cập nhật.
        </p>

        {/* Icon Section */}
        <div className="flex justify-center gap-4 mb-8">
          {["🤝", "💡", "🌍"].map((icon, index) => (
            <div
              key={index}
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl shadow-lg transform hover:scale-110 transition-transform duration-300"
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              {icon}
            </div>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tìm kiếm chương trình, dự án tình nguyện..."
            className="text-gray-700 w-full px-6 py-4 pr-14 text-lg border-2 border-gray-200 rounded-full focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-300 group"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={() => (window.location.href = "/")}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Về Trang Chủ
          </button>

          <button
            onClick={() => (window.location.href = "/opportunities")}
            className="flex items-center justify-center gap-3 px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            <Users className="w-5 h-5" />
            Cơ Hội Tham Gia
          </button>
        </div>

        {/* Popular Categories */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Lĩnh vực phổ biến:
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Cộng tác viên sự kiện",
              "Truyền thông & Marketing",
              "Giáo dục & Hỗ trợ học tập",
              "Tình nguyện môi trường",
              "Hỗ trợ cộng đồng",
              "Dự án xã hội",
            ].map((category, index) => (
              <button
                key={index}
                onClick={() =>
                  (window.location.href = `/category/${encodeURIComponent(category.toLowerCase())}`)
                }
                className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors duration-300 flex items-center gap-1 group"
              >
                {category}
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="pt-6 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Cần hỗ trợ? Chúng tôi luôn sẵn sàng giúp đỡ!
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-blue-600">
              <Phone className="w-4 h-4" />
              <a href="tel:0123456789" className="font-semibold hover:underline">
                0123-456-789
              </a>
            </div>
            <div className="hidden sm:block text-gray-400">|</div>
            <div className="flex items-center gap-2 text-purple-600">
              <Mail className="w-4 h-4" />
              <a href="mailto:support@ctvtnv.org" className="font-semibold hover:underline">
                support@ctvtnv.org
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
