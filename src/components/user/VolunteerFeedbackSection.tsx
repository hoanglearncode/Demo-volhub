import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Heart, ThumbsUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function VolunteerFeedbackSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Mock data cho feedback
  const testimonials = [
    {
      id: 1,
      name: "Nguyễn Minh Anh",
      age: 22,
      location: "TP.HCM",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      role: "Sinh viên Đại học Bách Khoa",
      rating: 5,
      feedback:
        "Tham gia các hoạt động tình nguyện đã giúp tôi trưởng thành rất nhiều. Không chỉ có cơ hội giúp đỡ cộng đồng mà còn học hỏi được những kinh nghiệm quý báu và kết bạn với nhiều bạn trẻ có cùng chí hướng.",
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
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      role: "Kỹ sư phần mềm",
      rating: 5,
      feedback:
        "Platform này thật sự tuyệt vời! Giao diện dễ sử dụng, thông tin rõ ràng và đặc biệt là có rất nhiều hoạt động ý nghĩa để lựa chọn. Tôi đã tìm được niềm đam mê mới thông qua việc tham gia các dự án môi trường.",
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
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      role: "Giáo viên tiểu học",
      rating: 5,
      feedback:
        "Làm tình nguyện viên đã mang lại cho tôi cảm giác hạnh phúc và ý nghĩa. Được nhìn thấy nụ cười hồn nhiên của các em nhỏ, sự biết ơn từ cộng đồng thực sự là động lực lớn để tôi tiếp tục cống hiến.",
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
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      role: "Sinh viên Y khoa",
      rating: 5,
      feedback:
        "Qua các hoạt động tình nguyện y tế, tôi không chỉ áp dụng được kiến thức đã học mà còn hiểu rõ hơn về trách nhiệm của người thầy thuốc. Mỗi lần được giúp đỡ bà con vùng sâu vùng xa là một trải nghiệm không thể quên.",
      event: "Khám bệnh miễn phí vùng sâu",
      joinedEvents: 6,
      volunteerHours: 90,
    },
    {
      id: 5,
      name: "Võ Thị Mai",
      age: 30,
      location: "Vũng Tàu",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      role: "Nhân viên văn phòng",
      rating: 4,
      feedback:
        "Nền tảng này đã kết nối tôi với những người bạn tuyệt vời và những hoạt động ý nghĩa. Ban đầu tôi còn ngại ngùng nhưng giờ đây tôi đã tự tin hơn và có thêm nhiều kỹ năng mới.",
      event: "Xây dựng nhà tình thương",
      joinedEvents: 10,
      volunteerHours: 150,
    },
  ];

  const stats = [
    { icon: ThumbsUp, label: "Đánh giá tích cực", value: "98%", color: "text-green-600" },
    { icon: Users, label: "Tình nguyện viên hài lòng", value: "15,000+", color: "text-blue-600" },
    { icon: Heart, label: "Sự kiện được yêu thích", value: "1,200+", color: "text-red-600" },
    { icon: Star, label: "Đánh giá trung bình", value: "4.9/5", color: "text-yellow-600" },
  ];

  // Auto slide
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = () => {
    const rating = 5;
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
        aria-hidden="true"
      />
    ));
  };

  return (
    <section className="w-full mt-20 py-12 rounded-3xl sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-pink-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-tl from-blue-100/30 to-indigo-100/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 px-4 md:px-20">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Tiếng nói từ tình nguyện viên
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Những câu chuyện truyền cảm hứng từ cộng đồng tình nguyện viên của chúng tôi
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Icon className={`w-8 h-8 sm:w-10 sm:h-10 ${stat.color} mx-auto mb-3`} aria-hidden="true" />
                <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main Testimonial */}
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="flex flex-col lg:flex-row">
              {/* Avatar Section */}
              <div className="lg:w-1/3 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 sm:p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
                    <img
                      src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-1">{testimonials[currentTestimonial].name}</h3>
                  <p className="text-white/80 text-sm sm:text-base mb-2">
                    {testimonials[currentTestimonial].age} tuổi • {testimonials[currentTestimonial].location}
                  </p>
                  <p className="text-white/90 font-medium text-sm sm:text-base mb-4">{testimonials[currentTestimonial].role}</p>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3">
                      <div className="text-lg sm:text-xl font-bold">{testimonials[currentTestimonial].joinedEvents}</div>
                      <div className="text-xs sm:text-sm text-white/80">Sự kiện</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3">
                      <div className="text-lg sm:text-xl font-bold">{testimonials[currentTestimonial].volunteerHours}</div>
                      <div className="text-xs sm:text-sm text-white/80">Giờ TNV</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-2/3 p-8 sm:p-12 relative">
                <Quote className="w-12 h-12 text-indigo-200 mb-6" />

                <div className="flex items-center gap-2 mb-4">
                  {renderStars()}
                  <span className="text-sm text-gray-500 ml-2">({testimonials[currentTestimonial].rating}/5)</span>
                </div>

                <blockquote className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6 italic">
                  {testimonials[currentTestimonial].feedback}
                </blockquote>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 mb-6">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Sự kiện gần nhất:</span> {testimonials[currentTestimonial].event}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevTestimonial}
                      onMouseEnter={() => setIsAutoPlaying(false)}
                      onMouseLeave={() => setIsAutoPlaying(true)}
                      className="p-2 rounded-full bg-gray-100 hover:bg-indigo-100 text-gray-600 hover:text-indigo-600 transition-all duration-200"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      onMouseEnter={() => setIsAutoPlaying(false)}
                      onMouseLeave={() => setIsAutoPlaying(true)}
                      className="p-2 rounded-full bg-gray-100 hover:bg-indigo-100 text-gray-600 hover:text-indigo-600 transition-all duration-200"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          currentTestimonial === index ? "bg-indigo-600 w-6" : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Testimonials Preview */}
        <div className="mt-8 sm:mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {testimonials.slice(0, 4).map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => setCurrentTestimonial(index)}
                className={`text-left p-4 sm:p-6 bg-white rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                  currentTestimonial === index ? "border-indigo-300 bg-indigo-50" : "border-gray-100 hover:border-indigo-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-800">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2">{renderStars()}</div>
                <p className="text-sm text-gray-600 line-clamp-3">{testimonial.feedback}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Bạn cũng có câu chuyện để chia sẻ?</h3>
            <p className="text-lg text-indigo-100 mb-6 max-w-2xl mx-auto">
              Hãy tham gia cộng đồng tình nguyện viên và tạo nên những kỷ niệm đáng nhớ
            </p>
            <Link to={'/login'} className="bg-white hover:bg-gray-50 text-indigo-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Tham gia ngay hôm nay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
