import { useState, useEffect } from 'react';
import { 
  Star, 
  Upload, 
  Edit, 
  Save, 
  X, 
  Calendar, 
  MapPin, 
  Users, 
  Award, 
  CheckCircle, 
  Crown,
  Heart,
  MessageSquare,
  Camera,
  Building,
  Mail,
  Phone,
  Globe
} from 'lucide-react';

export default function OrgProfileManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [orgData, setOrgData] = useState({
    id: 1,
    name: "Tech Innovation Hub",
    logo: "https://via.placeholder.com/150",
    description: "Tổ chức hàng đầu về đào tạo và phát triển công nghệ, chuyên tổ chức các sự kiện tình nguyện và hackathon.",
    industry: "Công nghệ thông tin",
    email: "contact@techhub.vn",
    phone: "0123456789",
    website: "https://techhub.vn",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    foundedYear: 2020,
    employeeCount: "50-100",
    verified: true,
    premium: true,
    followers: 1250,
    averageRating: 4.5,
    totalReviews: 156,
    socialLinks: {
      facebook: "https://facebook.com/techhub",
      linkedin: "https://linkedin.com/company/techhub"
    }
  });

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Hackathon for Green Future 2024",
      date: "2024-03-15",
      location: "TP.HCM",
      participants: 200,
      image: "https://via.placeholder.com/300x200",
      status: "completed"
    },
    {
      id: 2,
      title: "Workshop AI & Machine Learning",
      date: "2024-02-20",
      location: "Hà Nội",
      participants: 150,
      image: "https://via.placeholder.com/300x200",
      status: "completed"
    },
    {
      id: 3,
      title: "Tech Volunteer Day",
      date: "2024-04-10",
      location: "Đà Nẵng",
      participants: 100,
      image: "https://via.placeholder.com/300x200",
      status: "upcoming"
    }
  ]);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "Nguyễn Văn A",
      avatar: "https://via.placeholder.com/40",
      rating: 5,
      comment: "Sự kiện được tổ chức rất chuyên nghiệp, học được nhiều kiến thức bổ ích!",
      date: "2024-03-20",
      event: "Hackathon for Green Future 2024"
    },
    {
      id: 2,
      user: "Trần Thị B",
      avatar: "https://via.placeholder.com/40",
      rating: 4,
      comment: "Môi trường làm việc tuyệt vời, mọi người rất hỗ trợ và nhiệt tình.",
      date: "2024-03-18",
      event: "Workshop AI & Machine Learning"
    },
    {
      id: 3,
      user: "Lê Văn C",
      avatar: "https://via.placeholder.com/40",
      rating: 5,
      comment: "Ý nghĩa và bổ ích. Sẽ tiếp tục tham gia các sự kiện của tổ chức.",
      date: "2024-03-15",
      event: "Hackathon for Green Future 2024"
    }
  ]);

  const [formData, setFormData] = useState({...orgData});

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({...orgData});
  };

  const handleSave = () => {
    setOrgData({...formData});
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({...orgData});
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('logo', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-lg">
            <div className="absolute bottom-6 left-6 flex items-end space-x-6">
              <div className="relative">
                {isEditing ? (
                  <div className="relative">
                    <img
                      src={formData.logo}
                      alt="Logo"
                      className="w-24 h-24 rounded-lg border-4 border-white shadow-lg object-cover"
                    />
                    <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg cursor-pointer hover:bg-opacity-70 transition-colors">
                      <Camera className="w-6 h-6 text-white" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleLogoUpload}
                      />
                    </label>
                  </div>
                ) : (
                  <img
                    src={orgData.logo}
                    alt="Logo"
                    className="w-24 h-24 rounded-lg border-4 border-white shadow-lg object-cover"
                  />
                )}
              </div>
              
              <div className="text-white pb-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-2xl font-bold bg-transparent border-b border-white text-white placeholder-white focus:outline-none"
                  />
                ) : (
                  <div className="flex items-center space-x-3">
                    <h1 className="text-2xl font-bold">{orgData.name}</h1>
                    <div className="flex space-x-2">
                      {orgData.verified && (
                        <div className="bg-blue-500 p-1 rounded-full" title="Tài khoản đã xác thực">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      )}
                      {orgData.premium && (
                        <div className="bg-yellow-500 p-1 rounded-full" title="Tài khoản Premium">
                          <Crown className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <p className="text-blue-100 mt-1">{orgData.industry}</p>
              </div>
            </div>

            <div className="absolute bottom-6 right-6">
              {isEditing ? (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Hủy</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEdit}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors backdrop-blur-sm"
                >
                  <Edit className="w-4 h-4" />
                  <span>Chỉnh sửa</span>
                </button>
              )}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="px-6 py-4 bg-gray-50 grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{orgData.followers}</div>
              <div className="text-sm text-gray-500">Người theo dõi</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <span className="text-2xl font-bold text-gray-900">{orgData.averageRating}</span>
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="text-sm text-gray-500">Đánh giá trung bình</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{orgData.totalReviews}</div>
              <div className="text-sm text-gray-500">Lượt đánh giá</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{events.length}</div>
              <div className="text-sm text-gray-500">Sự kiện đã tổ chức</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'overview', label: 'Tổng quan', icon: Building },
              { id: 'events', label: 'Sự kiện', icon: Calendar },
              { id: 'reviews', label: 'Đánh giá', icon: MessageSquare },
              { id: 'followers', label: 'Người theo dõi', icon: Heart }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* About Section */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Giới thiệu</h2>
                  {isEditing ? (
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      rows="4"
                      placeholder="Mô tả về tổ chức..."
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{orgData.description}</p>
                  )}
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Thông tin liên hệ</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      {isEditing ? (
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Email"
                        />
                      ) : (
                        <span className="text-gray-700">{orgData.email}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Số điện thoại"
                        />
                      ) : (
                        <span className="text-gray-700">{orgData.phone}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-gray-400" />
                      {isEditing ? (
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Website"
                        />
                      ) : (
                        <a href={orgData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {orgData.website}
                        </a>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Địa chỉ"
                        />
                      ) : (
                        <span className="text-gray-700">{orgData.address}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Organization Info */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Thông tin tổ chức</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">Lĩnh vực hoạt động</label>
                      {isEditing ? (
                        <select
                          value={formData.industry}
                          onChange={(e) => handleInputChange('industry', e.target.value)}
                          className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option>Công nghệ thông tin</option>
                          <option>Giáo dục</option>
                          <option>Y tế</option>
                          <option>Môi trường</option>
                          <option>Xã hội</option>
                        </select>
                      ) : (
                        <div className="font-medium text-gray-900">{orgData.industry}</div>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-500">Năm thành lập</label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={formData.foundedYear}
                          onChange={(e) => handleInputChange('foundedYear', parseInt(e.target.value))}
                          className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="font-medium text-gray-900">{orgData.foundedYear}</div>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-500">Quy mô nhân sự</label>
                      {isEditing ? (
                        <select
                          value={formData.employeeCount}
                          onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                          className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option>1-10</option>
                          <option>11-50</option>
                          <option>50-100</option>
                          <option>100-500</option>
                          <option>500+</option>
                        </select>
                      ) : (
                        <div className="font-medium text-gray-900">{orgData.employeeCount}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Huy hiệu</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-6 h-6 text-blue-500" />
                        <div>
                          <div className="font-medium text-blue-900">Đã xác thực</div>
                          <div className="text-sm text-blue-700">Tài khoản đã được Admin xác thực</div>
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${orgData.verified ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Crown className="w-6 h-6 text-yellow-500" />
                        <div>
                          <div className="font-medium text-yellow-900">Premium</div>
                          <div className="text-sm text-yellow-700">Gói dịch vụ cao cấp</div>
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${orgData.premium ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Sự kiện tiêu biểu</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span>Tạo sự kiện mới</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                  <div key={event.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {event.status === 'completed' ? 'Đã hoàn thành' : 'Sắp diễn ra'}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                      <div className="space-y-1 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(event.date).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{event.participants} người tham gia</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Đánh giá từ tình nguyện viên</h2>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-gray-900">{orgData.averageRating}</span>
                    <div className="flex space-x-1">
                      {renderStars(Math.floor(orgData.averageRating))}
                    </div>
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">{orgData.totalReviews}</span> đánh giá
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {reviews.map(review => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{review.user}</h4>
                            <p className="text-sm text-gray-500">{review.event}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Followers Tab */}
          {activeTab === 'followers' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Người theo dõi ({orgData.followers})</h2>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-gray-600">Tổng: {orgData.followers} người</span>
                </div>
              </div>
              
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Danh sách người theo dõi</h3>
                <p className="text-gray-500">Chức năng này đang được phát triển...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}