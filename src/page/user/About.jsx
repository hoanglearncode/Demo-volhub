"use client";
import React, { useState, useEffect } from 'react';
import { Heart, Users, Globe, Award, Target, Lightbulb, Shield, Handshake, Star, ArrowRight, Play, CheckCircle, TrendingUp, Calendar, MapPin } from "lucide-react";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: '75,000+', label: 'Tình nguyện viên', icon: Users, color: 'from-blue-500 to-blue-600' },
    { number: '3,500+', label: 'Dự án hoàn thành', icon: Award, color: 'from-blue-600 to-blue-700' },
    { number: '250+', label: 'Tổ chức đối tác', icon: Handshake, color: 'from-blue-500 to-blue-600' },
    { number: '63+', label: 'Tỉnh thành', icon: Globe, color: 'from-blue-600 to-blue-700' }
  ];

  const achievements = [
    { icon: Star, title: 'Top 1 Nền tảng tình nguyện', desc: 'Được bình chọn là nền tảng tình nguyện hàng đầu Việt Nam 2024' },
    { icon: Award, title: 'Giải thưởng Công nghệ vì Cộng đồng', desc: 'Nhận giải thưởng từ Bộ TT&TT cho đóng góp vì xã hội' },
    { icon: TrendingUp, title: '500M+ giờ tình nguyện', desc: 'Tổng số giờ tình nguyện được thực hiện qua nền tảng' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Tình yêu thương',
      description: 'Lan tỏa tình yêu thương và sự quan tâm sâu sắc đến cộng đồng thông qua mỗi hành động ý nghĩa.',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Minh bạch tuyệt đối',
      description: 'Cam kết minh bạch 100% trong mọi hoạt động, từ quản lý tài chính đến thực hiện dự án.',
      gradient: 'from-blue-600 to-blue-700'
    },
    {
      icon: Users,
      title: 'Đoàn kết cộng đồng',
      description: 'Xây dựng mạng lưới tình nguyện viên đoàn kết, hỗ trợ và phát triển cùng nhau.',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Target,
      title: 'Tác động bền vững',
      description: 'Tạo ra những thay đổi tích cực lâu dài, góp phần xây dựng xã hội tốt đẹp hơn.',
      gradient: 'from-blue-600 to-blue-700'
    }
  ];

  const team = [
    {
      name: 'Nguyễn Minh Khôi',
      role: 'Founder & CEO',
      description: '15 năm kinh nghiệm phát triển các dự án tác động xã hội. Từng làm việc tại các tổ chức quốc tế.',
      avatar: '👨‍💼',
      linkedin: '#',
      achievements: 'TEDx Speaker, Forbes 30 Under 30'
    },
    {
      name: 'Trần Thúy An',
      role: 'Chief Impact Officer',
      description: 'Chuyên gia đo lường tác động xã hội với bằng Thạc sĩ từ Harvard Kennedy School.',
      avatar: '👩‍💼',
      linkedin: '#',
      achievements: 'Ashoka Fellow, MIT Alumni'
    },
    {
      name: 'Lê Đức Nam',
      role: 'CTO & Co-founder',
      description: 'Kỹ sư phần mềm với 12 năm kinh nghiệm tại các công ty công nghệ hàng đầu.',
      avatar: '👨‍💻',
      linkedin: '#',
      achievements: 'Ex-Google, Stanford PhD'
    },
    {
      name: 'Phạm Thu Linh',
      role: 'Head of Community',
      description: 'Chuyên gia xây dựng cộng đồng với kinh nghiệm quản lý hơn 100,000 thành viên.',
      avatar: '👩‍🎨',
      linkedin: '#',
      achievements: 'Community Builder Award'
    }
  ];

  const testimonials = [
    {
      name: 'Nguyễn Thị Mai',
      role: 'Tình nguyện viên 3 năm',
      content: 'Nền tảng này đã thay đổi cuộc sống tôi. Tôi đã tìm thấy mục đích sống và kết nối với những người cùng chí hướng.',
      avatar: '👩‍🦰',
      rating: 5
    },
    {
      name: 'Trần Văn Hùng',
      role: 'Trưởng phòng tại NGO',
      content: 'Việc tìm kiếm tình nguyện viên chất lượng trở nên dễ dàng hơn bao giờ hết. Nền tảng thực sự hiệu quả.',
      avatar: '👨‍💼',
      rating: 5
    },
    {
      name: 'Lê Thị Hoa',
      role: 'Sinh viên năm 3',
      content: 'Giao diện thân thiện, dễ sử dụng. Tôi đã tham gia nhiều dự án ý nghĩa và học hỏi được rất nhiều.',
      avatar: '👩‍🎓',
      rating: 5
    }
  ];

  const timeline = [
    { year: '2019', title: 'Ý tưởng khởi nguồn', desc: 'Nhóm sáng lập gặp nhau tại một dự án tình nguyện và nhận ra nhu cầu kết nối', icon: Lightbulb },
    { year: '2020', title: 'Ra mắt MVP', desc: 'Phiên bản đầu tiên được phát triển và thử nghiệm với 100 tình nguyện viên', icon: Play },
    { year: '2021', title: 'Tăng trưởng vượt bậc', desc: 'Đạt 10,000 người dùng và mở rộng ra 20 tỉnh thành trên cả nước', icon: TrendingUp },
    { year: '2022', title: 'Đối tác chiến lược', desc: 'Hợp tác với 100+ tổ chức và ra mắt ứng dụng di động', icon: Handshake },
    { year: '2023', title: 'Công nhận quốc gia', desc: 'Nhận các giải thưởng prestigous và đạt 50,000 tình nguyện viên', icon: Award },
    { year: '2024', title: 'Dẫn đầu thị trường', desc: 'Trở thành nền tảng #1 và chuẩn bị mở rộng quốc tế', icon: Globe }
  ];

  const tabContent = {
    mission: {
      title: 'Sứ mệnh & Tầm nhìn',
      content: (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
            <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
              <Target className="mr-3 text-blue-600" size={28} />
              Sứ mệnh của chúng tôi
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Chúng tôi tin rằng mỗi con người đều có tiềm năng tạo ra những thay đổi tích cực cho thế giới. 
              Sứ mệnh của chúng tôi là xây dựng cầu nối giữa những trái tim nhân ái và những cơ hội tình nguyện 
              ý nghĩa, tạo ra một hệ sinh thái tình nguyện bền vững và hiệu quả.
            </p>
          </div>

          <div className="bg-gradient-to-r from-white to-blue-50 p-8 rounded-2xl border border-blue-100">
            <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
              <Globe className="mr-3 text-blue-600" size={28} />
              Tầm nhìn 2030
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Trở thành nền tảng tình nguyện hàng đầu Đông Nam Á, kết nối 1 triệu tình nguyện viên 
              và tạo ra 1 tỷ giờ tình nguyện, góp phần xây dựng một xã hội nhân văn và phát triển bền vững.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <CheckCircle className="mr-2 text-blue-600" size={20} />
                  Mục tiêu 2025
                </h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    200,000 tình nguyện viên tích cực
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    10,000 dự án cộng đồng
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    500 tổ chức đối tác
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Mở rộng ra các nước ASEAN
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <TrendingUp className="mr-2 text-blue-600" size={20} />
                  Tác động dự kiến
                </h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    50 triệu người được hỗ trợ
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    100 triệu giờ tình nguyện
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    1000 tỷ VNĐ giá trị xã hội
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Giảm 30% bất bình đẳng xã hội
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    story: {
      title: 'Hành trình phát triển',
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Từ ý tưởng đến hiện thực</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Mỗi bước đi của chúng tôi đều hướng tới mục tiêu tạo ra tác động tích cực và bền vững cho cộng đồng
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
            <div className="space-y-8">
              {timeline.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="relative flex items-start space-x-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg z-10">
                      <IconComponent size={24} />
                    </div>
                    <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-all">
                      <div className="flex items-center mb-2">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">
                          {item.year}
                        </span>
                        <h4 className="text-xl font-semibold text-gray-900">{item.title}</h4>
                      </div>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )
    },
    team: {
      title: 'Đội ngũ lãnh đạo',
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Những người kiến tạo</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Đội ngũ lãnh đạo giàu kinh nghiệm với tầm nhìn chung về một thế giới tốt đẹp hơn
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100 hover:shadow-lg transition-all group">
                <div className="flex items-start space-x-6">
                  <div className="text-4xl bg-gradient-to-br from-blue-500 to-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl shadow-lg">
                    {member.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h4>
                    <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600 mb-4 leading-relaxed">{member.description}</p>
                    <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                      <p className="text-sm text-blue-800 font-medium">{member.achievements}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    impact: {
      title: 'Tác động & Thành tựu',
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Những thành tựu đáng tự hào</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Được ghi nhận bởi cộng đồng và các tổ chức uy tín
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 text-center hover:shadow-lg transition-all">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <IconComponent size={28} />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{achievement.title}</h4>
                  <p className="text-gray-600 text-sm">{achievement.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
            <h4 className="text-xl font-bold text-blue-900 mb-6 text-center">Lời cảm ơn từ cộng đồng</h4>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-4">{testimonials[currentTestimonial].avatar}</div>
                <div>
                  <h5 className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</h5>
                  <p className="text-blue-600 text-sm">{testimonials[currentTestimonial].role}</p>
                </div>
                <div className="ml-auto flex space-x-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonials[currentTestimonial].content}"</p>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className={`relative max-w-7xl mx-auto px-6 py-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center">
            <h1 className="text-6xl py-4 md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-gray-100 text-transparent">
              Về chúng tôi
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto mb-8 leading-relaxed">
              Nền tảng kết nối tình nguyện viên hàng đầu Việt Nam - Nơi những trái tim nhân ái 
              gặp gỡ những cơ hội tạo ra sự thay đổi tích cực và bền vững cho cộng đồng
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Khám phá hành trình
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center">
                <Play className="mr-2" size={20} />
                Xem video giới thiệu
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Những con số ấn tượng</h2>
            <p className="text-xl text-gray-600">Minh chứng cho sự tin tưởng và tác động của chúng tôi</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`bg-gradient-to-br ${stat.color} text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <IconComponent size={32} />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Giá trị cốt lõi</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những nguyên tắc định hướng mọi hành động của chúng tôi trong hành trình xây dựng cộng đồng tình nguyện
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                  <div className={`bg-gradient-to-br ${value.gradient} text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <IconComponent size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Info Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-gradient-to-b from-blue-50 to-white rounded-2xl p-8 sticky top-8 border border-blue-100">
                <h3 className="text-2xl font-bold text-blue-900 mb-6">Khám phá thêm</h3>
                <nav className="space-y-3">
                  {Object.entries(tabContent).map(([key, tab]) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                        activeTab === key
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-white hover:shadow-md border border-transparent hover:border-blue-100'
                      }`}
                    >
                      <span className="font-medium">{tab.title}</span>
                      <ArrowRight size={18} className={`transition-transform ${activeTab === key ? 'text-white' : 'text-blue-500 group-hover:translate-x-1'}`} />
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:w-2/3">
              <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-4"></span>
                  {tabContent[activeTab].title}
                </h2>
                <div className="transition-all duration-500">
                  {tabContent[activeTab].content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Tham gia hành trình ý nghĩa</h2>
          <p className="text-xl md:text-2xl opacity-90 mb-10 max-w-3xl mx-auto">
            Hãy trở thành một phần của cộng đồng tình nguyện viên năng động và cùng chúng tôi 
            tạo ra những thay đổi tích cực, ý nghĩa cho xã hội
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center">
              <Heart className="mr-3" size={20} />
              Đăng ký tình nguyện viên
            </button>
            <button className="border-2 border-white text-white px-10 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center">
              <Users className="mr-3" size={20} />
              Tìm hiểu thêm về chúng tôi
            </button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                <Calendar className="mx-auto mb-4 text-white" size={32} />
                <h4 className="font-semibold mb-2">Sự kiện sắp tới</h4>
                <p className="text-sm opacity-90">Tham gia các workshop và hoạt động cộng đồng</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                <MapPin className="mx-auto mb-4 text-white" size={32} />
                <h4 className="font-semibold mb-2">Văn phòng chính</h4>
                <p className="text-sm opacity-90">Tầng 12, Tòa nhà ABC, Hà Nội, Việt Nam</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                <Globe className="mx-auto mb-4 text-white" size={32} />
                <h4 className="font-semibold mb-2">Mạng lưới toàn cầu</h4>
                <p className="text-sm opacity-90">Kết nối với tình nguyện viên khắp thế giới</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AboutPage;