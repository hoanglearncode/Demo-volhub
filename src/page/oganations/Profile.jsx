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
import ProfileTab from '../../components/oganations/profile/ProfileTab';

const OrgProfileManagement = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Organization data state
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

  // Services data
  const [purchasedServices, setPurchasedServices] = useState([
    {
      id: 'SV001',
      name: 'Premium Account',
      category: 'account',
      status: 'active',
      purchaseDate: '2025-01-15',
      expiryDate: '2026-01-15',
      price: '2,500,000 VND',
      description: 'Tài khoản cao cấp với nhiều tính năng nâng cao',
      features: ['Ưu tiên hiển thị sự kiện', 'Thống kê chi tiết', 'Hỗ trợ 24/7', 'Không giới hạn số sự kiện'],
      usage: {
        current: 8,
        limit: 'Unlimited'
      }
    },
    {
      id: 'SV002',
      name: 'Featured Events Package',
      category: 'promotion',
      status: 'active',
      purchaseDate: '2025-02-01',
      expiryDate: '2025-05-01',
      price: '1,200,000 VND',
      description: 'Gói đẩy sự kiện lên trang chủ trong 3 tháng',
      features: ['Hiển thị trên banner', 'Email marketing', 'Social media boost'],
      usage: {
        current: 12,
        limit: 20
      }
    },
    {
      id: 'SV003',
      name: 'Advanced Analytics',
      category: 'analytics',
      status: 'expired',
      purchaseDate: '2024-06-01',
      expiryDate: '2024-12-01',
      price: '800,000 VND',
      description: 'Báo cáo và phân tích chuyên sâu',
      features: ['Dashboard chi tiết', 'Export reports', 'Trend analysis'],
      usage: {
        current: 0,
        limit: 0
      }
    }
  ]);

  const [availableServices, setAvailableServices] = useState([
    {
      id: 'NEW001',
      name: 'AI Assistant Pro',
      category: 'ai',
      price: '1,500,000 VND',
      period: '6 tháng',
      description: 'Trợ lý AI giúp tối ưu hóa tuyển dụng tình nguyện viên',
      features: ['Gợi ý tình nguyện viên phù hợp', 'Tự động soạn thảo email', 'Phân tích hiệu quả sự kiện'],
      icon: Sparkles,
      color: 'purple',
      popular: true,
      discount: '20%'
    },
    {
      id: 'NEW002',
      name: 'Multi-Channel Marketing',
      category: 'marketing',
      price: '2,000,000 VND',
      period: '12 tháng',
      description: 'Quảng bá sự kiện trên nhiều kênh đồng thời',
      features: ['Facebook Ads tự động', 'Google Ads', 'Influencer network', 'Email campaigns'],
      icon: Megaphone,
      color: 'blue',
      popular: false,
      discount: null
    },
    {
      id: 'NEW003',
      name: 'Enterprise Security',
      category: 'security',
      price: '3,000,000 VND',
      period: '12 tháng',
      description: 'Bảo mật cấp doanh nghiệp cho dữ liệu tổ chức',
      features: ['SSL certificate', 'Data encryption', 'Backup tự động', '2FA bắt buộc'],
      icon: Shield,
      color: 'green',
      popular: false,
      discount: '15%'
    },
    {
      id: 'NEW004',
      name: 'Event Live Streaming',
      category: 'streaming',
      price: '500,000 VND',
      period: 'Per event',
      description: 'Live stream sự kiện chuyên nghiệp',
      features: ['HD streaming', 'Multi-platform', 'Recording', 'Chat moderation'],
      icon: Target,
      color: 'red',
      popular: false,
      discount: null
    }
  ]);

  const tabs = [
    { id: 'profile', label: 'Thông tin cơ bản', icon: Building },
    { id: 'services', label: 'Dịch vụ đã mua', icon: Package },
    { id: 'marketplace', label: 'Mua thêm dịch vụ', icon: ShoppingCart },
    { id: 'billing', label: 'Thanh toán', icon: CreditCard },
    { id: 'settings', label: 'Cài đặt', icon: Settings }
  ];

  const serviceCategories = {
    account: { label: 'Tài khoản', color: 'blue', icon: Crown },
    promotion: { label: 'Quảng bá', color: 'purple', icon: TrendingUp },
    analytics: { label: 'Phân tích', color: 'green', icon: BarChart3 },
    ai: { label: 'AI/Automation', color: 'purple', icon: Sparkles },
    marketing: { label: 'Marketing', color: 'blue', icon: Megaphone },
    security: { label: 'Bảo mật', color: 'green', icon: Shield },
    streaming: { label: 'Live Stream', color: 'red', icon: Target }
  };



  // Helper for safe class names for colors (Tailwind needs static classes in production;
  // for demo/sample we keep these simple).
  const colorMap = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    red: 'bg-red-100 text-red-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    gray: 'bg-gray-100 text-gray-600'
  };

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

  const handlePurchaseService = (service) => {
    const newService = {
      id: `SV${Date.now()}`,
      name: service.name,
      category: service.category,
      status: 'active',
      purchaseDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      price: service.price,
      description: service.description,
      features: service.features,
      usage: { current: 0, limit: 100 }
    };
    
    setPurchasedServices(prev => [...prev, newService]);
    setShowServiceModal(false);
    setSelectedService(null);
    
    // TODO: API call to purchase service
    alert('Dịch vụ đã được mua thành công!');
  };

  const handleDeleteService = (serviceId) => {
    if (window.confirm('Bạn có chắc muốn hủy dịch vụ này?')) {
      setPurchasedServices(prev => prev.filter(s => s.id !== serviceId));
      // TODO: API call to cancel service
    }
  };


  const renderServicesTab = () => (
    <div className="space-y-6">
      {/* Services Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-semibold text-blue-900">
              {purchasedServices.filter(s => s.status === 'active').length}
            </span>
          </div>
          <p className="text-blue-700 font-medium">Dịch vụ đang hoạt động</p>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <span className="text-lg font-semibold text-green-900">Premium</span>
          </div>
          <p className="text-green-700 font-medium">Gói hiện tại</p>
        </div>
        
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-yellow-600" />
            <span className="text-lg font-semibold text-yellow-900">
              {purchasedServices.filter(s => 
                new Date(s.expiryDate) - new Date() < 30 * 24 * 60 * 60 * 1000
              ).length}
            </span>
          </div>
          <p className="text-yellow-700 font-medium">Sắp hết hạn</p>
        </div>
      </div>

      {/* Active Services */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Dịch vụ đã mua</h3>
        <div className="space-y-4">
          {purchasedServices.map((service) => {
            const category = serviceCategories[service.category] || { label: 'Khác', color: 'gray', icon: Package };
            const CategoryIcon = category.icon;
            const catColor = colorMap[category.color] || colorMap.gray;
            const isExpiring = new Date(service.expiryDate) - new Date() < 30 * 24 * 60 * 60 * 1000;
            
            return (
              <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-4">
                    <div className={`${catColor.split(' ')[0]} p-3 rounded-lg`}>
                      <CategoryIcon className={`${catColor.split(' ')[1]} w-6 h-6`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-gray-900">{service.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          service.status === 'active' ? 'bg-green-100 text-green-800' :
                          service.status === 'expired' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {service.status === 'active' ? 'Đang hoạt động' :
                           service.status === 'expired' ? 'Đã hết hạn' : 'Tạm dừng'}
                        </span>
                        {isExpiring && service.status === 'active' && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 flex items-center gap-1">
                            <AlertTriangle size={10} />
                            Sắp hết hạn
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Mua: {service.purchaseDate}</span>
                        <span>Hết hạn: {service.expiryDate}</span>
                        <span className="font-medium text-gray-900">{service.price}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50">
                      <Settings className="w-4 h-4" />
                    </button>
                    {service.status !== 'active' && (
                      <button 
                        onClick={() => handleDeleteService(service.id)}
                        className="p-2 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Usage Stats */}
                {service.usage && service.status === 'active' && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Sử dụng trong tháng</span>
                      <span className="text-sm font-medium">
                        {service.usage.current}/{service.usage.limit === 'Unlimited' ? '∞' : service.usage.limit}
                      </span>
                    </div>
                    {service.usage.limit !== 'Unlimited' && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(service.usage.current / (service.usage.limit || 1)) * 100}%` }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Features */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderMarketplaceTab = () => (
    <div className="space-y-6">
      {/* Service Categories Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-8 gap-3">
          <button className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg font-medium">
            Tất cả dịch vụ
          </button>
          {Object.entries(serviceCategories).map(([key, category]) => {
            const Icon = category.icon;
            return (
              <button key={key} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Recommended Services */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-purple-900">Gợi ý cho bạn</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableServices.filter(s => s.popular).map((service) => {
            const Icon = service.icon;
            const serviceColor = colorMap[service.color] || colorMap.gray;
            return (
              <div key={service.id} className="bg-white rounded-lg border border-purple-200 p-4 relative">
                {service.discount && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    -{service.discount}
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className={`${serviceColor.split(' ')[0]} p-3 rounded-lg`}>
                    <Icon className={`${serviceColor.split(' ')[1]} w-6 h-6`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">{service.period}</div>
                        <div className="font-semibold text-gray-900">{service.price}</div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      {service.features.slice(0, 3).map((f, i) => (
                        <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{f}</span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => { setSelectedService(service); setShowServiceModal(true); }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Mua ngay
                      </button>
                      <button
                        onClick={() => { setSelectedService(service); setShowServiceModal(true); }}
                        className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2"
                      >
                        <ArrowRight className="w-4 h-4" />
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Show other available services */}
          {availableServices.filter(s => !s.popular).map((service) => {
            const Icon = service.icon;
            const serviceColor = colorMap[service.color] || colorMap.gray;
            return (
              <div key={service.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start gap-4">
                  <div className={`${serviceColor.split(' ')[0]} p-3 rounded-lg`}>
                    <Icon className={`${serviceColor.split(' ')[1]} w-6 h-6`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">{service.period}</div>
                        <div className="font-semibold text-gray-900">{service.price}</div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => { setSelectedService(service); setShowServiceModal(true); }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Mua ngay
                      </button>
                      <button
                        onClick={() => { setSelectedService(service); setShowServiceModal(true); }}
                        className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2"
                      >
                        <ArrowRight className="w-4 h-4" />
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Thanh toán</h3>
        <p className="text-sm text-gray-600 mb-4">Quản lý phương thức thanh toán và lịch sử hóa đơn.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-100 rounded-lg">
            <h4 className="font-semibold mb-2">Phương thức thanh toán</h4>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-700">Visa **** 4242</div>
                <div className="text-xs text-gray-500">Hết hạn 08/2026</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 border rounded-lg text-sm">Chỉnh sửa</button>
                <button className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm">Xóa</button>
              </div>
            </div>
          </div>

          <div className="p-4 border border-gray-100 rounded-lg">
            <h4 className="font-semibold mb-2">Lịch sử hóa đơn</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center justify-between">
                <span>Featured Events Package</span>
                <span className="font-medium">1,200,000 VND</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Premium Account</span>
                <span className="font-medium">2,500,000 VND</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Cài đặt tổ chức</h3>
        <div className="space-y-4">
          Chức năng đang được phát triển
        </div>
      </div>
    </div>
  );

  // main render
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Sidebar Tabs */}
      <aside className="w-64 flex w-full ">
        <div className="bg-white flex w-full justify-between rounded-lg border border-gray-200 p-4">
          <nav className="flex gap-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left flex items-center text-nowrap gap-3 px-3 py-2 rounded-lg w-full ${
                    activeTab === tab.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
          
          <div className="mt-4">
            <button className="w-full px-3 py-2 bg-green-600 text-white rounded-lg flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Tạo sự kiện mới
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="space-y-6">
          {/* Mobile tabs */}
          <div className="lg:hidden">
            <div className="flex gap-2 overflow-auto">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                      activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content based on tab */}
          <div>
            {activeTab === 'profile' && (<ProfileTab />)}
            {activeTab === 'services' && renderServicesTab()}
            {activeTab === 'marketplace' && renderMarketplaceTab()}
            {activeTab === 'billing' && renderBillingTab()}
            {activeTab === 'settings' && renderSettingsTab()}
          </div>
        </div>
      </main>

      {/* Service Modal */}
      {showServiceModal && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => { setShowServiceModal(false); setSelectedService(null); }} />
          <div className="relative bg-white rounded-lg w-full max-w-2xl p-6 z-10 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`${(colorMap[selectedService.color] || colorMap.gray).split(' ')[0]} p-3 rounded-lg`}>
                  <selectedService.icon className={`${(colorMap[selectedService.color] || colorMap.gray).split(' ')[1]} w-6 h-6`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedService.name}</h3>
                  <div className="text-sm text-gray-500">{selectedService.period} • {selectedService.price}</div>
                </div>
              </div>

              <button onClick={() => { setShowServiceModal(false); setSelectedService(null); }} className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-700 mb-4">{selectedService.description}</p>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Tính năng</h4>
              <div className="flex flex-wrap gap-2">
                {selectedService.features.map((f, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{f}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button onClick={() => { setShowServiceModal(false); setSelectedService(null); }} className="px-4 py-2 border rounded-lg">Đóng</button>
              <button
                onClick={() => handlePurchaseService(selectedService)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Mua {selectedService.price}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgProfileManagement;
