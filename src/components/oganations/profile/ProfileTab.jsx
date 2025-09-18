import React, { useState, useEffect } from 'react';
import {
  Building,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  Crown,
  Star,
  Phone,
  Mail,
  Globe,
  Camera,
  Package,
  ShoppingCart,
  CreditCard,
  Settings,
  TrendingUp,
  Award,
  Zap,
  Shield,
  Megaphone,
  BarChart3,
  Clock,
  AlertTriangle,
  Check,
  ArrowRight,
  Sparkles,
  Target,
  Heart
} from 'lucide-react';
export default function ProfileTab () {
    const [isEditing, setIsEditing] = useState(false);
    const [orgData, setOrgData] = useState({
        id: 'ORG001',
        name: 'Green Future Foundation',
        logo: '/logo.svg',
        description: 'Tổ chức phi lợi nhuận hàng đầu về bảo vệ môi trường và phát triển bền vững tại Việt Nam.',
        industry: 'Môi trường',
        email: 'contact@greenfuture.vn',
        phone: '(+84) 28 3822 5678',
        website: 'https://greenfuture.vn',
        address: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM',
        foundedYear: 2018,
        employeeCount: '50-100',
        verified: true,
        premium: true,
        tier: 'gold',
        followers: 2847,
        averageRating: 4.7,
        totalReviews: 284,
        eventsCreated: 45,
        activeEvents: 8
      });
    
    const [formData, setFormData] = useState({...orgData});


    
  const handleEdit = () => {
    setIsEditing(true);
    setFormData({...orgData});
  };

  const handleSave = () => {
    setOrgData({...formData});
    setIsEditing(false);
    // TODO: API call to save data
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

    const tierConfig = {
        basic: { label: 'Cơ bản', color: 'gray', bgColor: 'bg-gray-100', iconColor: 'text-gray-600' },
        silver: { label: 'Bạc', color: 'gray', bgColor: 'bg-gray-200', iconColor: 'text-gray-600' },
        gold: { label: 'Vàng', color: 'yellow', bgColor: 'bg-yellow-100', iconColor: 'text-yellow-600' },
        platinum: { label: 'Bạch kim', color: 'purple', bgColor: 'bg-purple-100', iconColor: 'text-purple-600' }
    };
    return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-green-500 to-blue-600 relative">
          <div className="absolute bottom-4 left-6 flex items-end gap-4">
            <div className="relative">
              <img
                src={isEditing ? formData.logo : orgData.logo}
                alt="Logo"
                className="w-20 h-20 rounded-lg border-4 border-white shadow-lg object-cover bg-white"
              />
              {isEditing && (
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg cursor-pointer hover:bg-opacity-70">
                  <Camera className="w-5 h-5 text-white" />
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              )}
            </div>
            <div className="text-white pb-2">
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="text-xl font-bold bg-transparent border-b border-white text-white placeholder-white focus:outline-none"
                />
              ) : (
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold">{orgData.name}</h1>
                  <div className="flex gap-2">
                    {orgData.verified && (
                      <div className="bg-blue-500 p-1 rounded-full">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {orgData.premium && (
                      <div className="bg-yellow-500 p-1 rounded-full">
                        <Crown className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              )}
              <p className="text-green-100 text-sm">{orgData.industry}</p>
            </div>
          </div>
          
          <div className="absolute bottom-4 right-6">
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Lưu
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Hủy
                </button>
              </div>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-gray-700 font-semibold px-4 py-2 rounded-lg flex items-center gap-2 backdrop-blur-sm"
              >
                <Edit className="w-4 h-4" />
                Chỉnh sửa
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="p-6 bg-gray-50 grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{orgData.followers}</div>
            <div className="text-sm text-gray-500">Người theo dõi</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="text-2xl font-bold text-gray-900">{orgData.averageRating}</span>
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
            <div className="text-sm text-gray-500">Đánh giá TB</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{orgData.eventsCreated}</div>
            <div className="text-sm text-gray-500">Sự kiện đã tạo</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{orgData.activeEvents}</div>
            <div className="text-sm text-gray-500">Đang hoạt động</div>
          </div>
        </div>
      </div>

      {/* Organization Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Thông tin cơ bản</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả tổ chức</label>
              {isEditing ? (
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={4}
                />
              ) : (
                <p className="text-gray-700">{orgData.description}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lĩnh vực</label>
                {isEditing ? (
                  <select
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Môi trường</option>
                    <option>Giáo dục</option>
                    <option>Y tế</option>
                    <option>Công nghệ</option>
                    <option>Xã hội</option>
                  </select>
                ) : (
                  <p className="text-gray-900 font-medium">{orgData.industry}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Năm thành lập</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={formData.foundedYear}
                    onChange={(e) => handleInputChange('foundedYear', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{orgData.foundedYear}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Thông tin liên hệ</h3>
          <div className="space-y-4">
            {[
              { field: 'email', label: 'Email', icon: Mail, type: 'email' },
              { field: 'phone', label: 'Điện thoại', icon: Phone, type: 'tel' },
              { field: 'website', label: 'Website', icon: Globe, type: 'url' },
              { field: 'address', label: 'Địa chỉ', icon: MapPin, type: 'text' }
            ].map(({ field, label, icon: Icon, type }) => (
              <div key={field} className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-gray-400" />
                {isEditing ? (
                  <input
                    type={type}
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    placeholder={label}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <span className="text-gray-700">{orgData[field]}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}