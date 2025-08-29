import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Heart, Users, Award, MapPin } from "lucide-react";

export default function VolunteerFeedbackSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Mock data cho feedback
  const testimonials = [
    {
      id: 1,
      name: "Nguyễn Minh Anh",
      age: 22,
      location: "TP.HCM",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
      role: "Sinh viên Đại học Bách Khoa",
      rating: 5,
      feedback:
        "Tham gia các hoạt động tình nguyện đã giúp tôi trưởng thành rất nhiều. Không chỉ có cơ hội giúp đỡ cộng đồng mà còn học hỏi được những kinh nghiệm quý báu.",
      event: "Dạy học cho trẻ em vùng cao",
      joinedEvents: 8,
      volunteerHours: 120,
    },
    {
      id: 2,
      name: "Trần Văn Hùng",
      age: 28,
      location: "Hà Nội",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      role: "Kỹ sư phần mềm",
      rating: 5,
      feedback:
        "Nền tảng này thật sự tuyệt vời! Giao diện dễ sử dụng, thông tin rõ ràng và có rất nhiều hoạt động ý nghĩa để lựa chọn. Tôi đã tìm được niềm đam mê mới.",
      event: "Làm sạch bãi biển",
      joinedEvents: 15,
      volunteerHours: 200,
    },
    {
      id: 3,
      name: "Lê Thị Hương",
      age: 35,
      location: "Đà Nẵng",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      role: "Giáo viên tiểu học",
      rating: 5,
      feedback:
        "Làm tình nguyện viên đã mang lại cho tôi cảm giác hạnh phúc và ý nghĩa. Được nhìn thấy nụ cười hồn nhiên của các em nhỏ thực sự là động lực lớn.",
      event: "Chăm sóc trẻ em mồ côi",
      joinedEvents: 12,
      volunteerHours: 180,
    },
    {
      id: 4,
      name: "Phạm Đức Nam",
      age: 24,
      location: "Cần Thơ",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
      role: "Sinh viên Y khoa",
      rating: 5,
      feedback:
        "Qua các hoạt động tình nguyện y tế, tôi không chỉ áp dụng được kiến thức đã học mà còn hiểu rõ hơn về trách nhiệm của người thầy thuốc.",
      event: "Khám bệnh miễn phí vùng sâu",
      joinedEvents: 6,
      volunteerHours: 90,
    }
  ];

  const stats = [
    { icon: Star, label: "Đánh giá trung bình", value: "4.9/5", color: "text-blue-600" },
    { icon: Users, label: "Tình nguyện viên", value: "15,000+", color: "text-blue-600" },
    { icon: Heart, label: "Sự kiện yêu thích", value: "1,200+", color: "text-blue-600" },
    { icon: Award, label: "Giải thưởng", value: "25+", color: "text-blue-600" }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ));
  };

  const currentUser = testimonials[currentTestimonial];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Simple & Clean */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl py-1 sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-500 bg-clip-text text-transparent mb-4">
            Chia sẻ từ cộng đồng
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Những câu chuyện truyền cảm hứng từ các tình nguyện viên
          </p>
        </div>

        {/* Stats - Simplified Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-3">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main Testimonial - Clean Card Design */}
        <div className="relative mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-12">
              
              {/* User Info */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                      {currentUser.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{currentUser.role}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{currentUser.location}</span>
                      <span className="mx-1">•</span>
                      <span>{currentUser.age} tuổi</span>
                    </div>
                  </div>
                </div>
                
                {/* Stats - Mobile Friendly */}
                <div className="flex gap-4 sm:ml-auto">
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-blue-600">{currentUser.joinedEvents}</div>
                    <div className="text-xs text-gray-500">Sự kiện</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-blue-600">{currentUser.volunteerHours}</div>
                    <div className="text-xs text-gray-500">Giờ TNV</div>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(currentUser.rating)}
                </div>
                <span className="text-sm text-gray-500">({currentUser.rating}/5)</span>
              </div>

              {/* Feedback */}
              <blockquote className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                "{currentUser.feedback}"
              </blockquote>

              {/* Event Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-lg mb-6">
                <Heart className="w-4 h-4" />
                <span>{currentUser.event}</span>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors duration-200"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors duration-200"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        currentTestimonial === index 
                          ? "bg-blue-600 w-6" 
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Testimonials Preview - Simplified */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 text-center">
            Thêm nhiều chia sẻ khác
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => setCurrentTestimonial(index)}
                className={`text-left p-4 bg-white rounded-xl border transition-all duration-200 hover:shadow-md ${
                  currentTestimonial === index 
                    ? "border-blue-200 bg-blue-50" 
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-gray-800 truncate">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate">{testimonial.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {testimonial.feedback}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Call to Action - Simple & Effective */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-white">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
              Bạn cũng có câu chuyện để chia sẻ?
            </h3>
            <p className="text-blue-100 mb-6 sm:mb-8 text-sm sm:text-base max-w-2xl mx-auto">
              Hãy tham gia cộng đồng tình nguyện viên và tạo nên những kỷ niệm đáng nhớ
            </p>
            <button className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-xl transition-all duration-200 transform hover:scale-105">
              Tham gia ngay hôm nay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}