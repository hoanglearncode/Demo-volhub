import React, { useMemo, useState } from 'react';
import { CreditCard, Check, X, Plus, Minus, Tag, Truck, ShieldCheck, Download, Mail, Phone, User, Building, MapPin } from 'lucide-react';

export default function ServicePurchasePage() {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [quantity, setQuantity] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('credit-card');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    zipCode: ''
  });

  // Service plans data
  const plans = {
    basic: {
      id: 'basic',
      name: 'Gói Cơ Bản',
      price: 299000,
      originalPrice: 399000,
      duration: 'tháng',
      description: 'Phù hợp cho tổ chức nhỏ',
      features: [
        'Quản lý tối đa 50 CTV/TNV',
        'Báo cáo cơ bản',
        'Hỗ trợ email',
        'Lưu trữ 5GB',
        'Tính năng cơ bản'
      ],
      color: 'blue',
      recommended: false
    },
    pro: {
      id: 'pro',
      name: 'Gói Chuyên Nghiệp',
      price: 599000,
      originalPrice: 799000,
      duration: 'tháng',
      description: 'Tối ưu cho tổ chức vừa và lớn',
      features: [
        'Quản lý không giới hạn CTV/TNV',
        'Báo cáo nâng cao & Analytics',
        'Hỗ trợ 24/7',
        'Lưu trữ 50GB',
        'Tích hợp API',
        'Quản lý dự án',
        'Notification system'
      ],
      color: 'green',
      recommended: true
    },
    enterprise: {
      id: 'enterprise',
      name: 'Gói Doanh Nghiệp',
      price: 1299000,
      originalPrice: 1599000,
      duration: 'tháng',
      description: 'Giải pháp toàn diện cho doanh nghiệp',
      features: [
        'Tất cả tính năng Pro',
        'White-label solution',
        'Dedicated support manager',
        'Lưu trữ không giới hạn',
        'Custom integrations',
        'Advanced security',
        'Training & onboarding',
        'SLA 99.9% uptime'
      ],
      color: 'purple',
      recommended: false
    }
  };

  // Available coupons (mock data)
  const availableCoupons = {
    'WELCOME20': { discount: 0.2, type: 'percentage', description: 'Giảm 20% cho khách hàng mới' },
    'SAVE50K': { discount: 50000, type: 'fixed', description: 'Giảm 50,000đ' },
    'ENTERPRISE10': { discount: 0.1, type: 'percentage', description: 'Giảm 10% gói Enterprise' }
  };

  const paymentMethods = [
    { id: 'credit-card', name: 'Thẻ tín dụng/ghi nợ', icon: CreditCard, description: 'Visa, Mastercard, JCB' },
    { id: 'bank-transfer', name: 'Chuyển khoản ngân hàng', icon: Building, description: 'Chuyển khoản trực tiếp' },
    { id: 'e-wallet', name: 'Ví điện tử', icon: Phone, description: 'MoMo, ZaloPay, VNPay' }
  ];

  // Calculate total price
  const pricing = useMemo(() => {
    const basePrice = plans[selectedPlan].price * quantity;
    let discount = 0;
    
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percentage') {
        discount = basePrice * appliedCoupon.discount;
      } else {
        discount = appliedCoupon.discount * quantity;
      }
    }
    
    const subtotal = basePrice;
    const discountAmount = discount;
    const tax = (subtotal - discountAmount) * 0.1; // 10% VAT
    const total = subtotal - discountAmount + tax;
    
    return {
      subtotal,
      discountAmount,
      tax,
      total
    };
  }, [selectedPlan, quantity, appliedCoupon]);

  const handleCouponApply = () => {
    const coupon = availableCoupons[couponCode.toUpperCase()];
    if (coupon) {
      setAppliedCoupon({ ...coupon, code: couponCode.toUpperCase() });
    } else {
      alert('Mã giảm giá không hợp lệ!');
    }
  };

  const handleCouponRemove = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleInputChange = (field, value) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePurchase = async () => {
    // Basic validation
    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      alert('Vui lòng điền đầy đủ thông tin liên hệ');
      return;
    }

    setIsProcessing(true);
    
    // Mock payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowConfirmation(true);
    }, 3000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const PlanCard = ({ plan }) => (
    <div
      className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all ${
        selectedPlan === plan.id
          ? `border-${plan.color}-500 bg-${plan.color}-50`
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => setSelectedPlan(plan.id)}
    >
      {plan.recommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Được đề xuất
          </span>
        </div>
      )}
      
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
        <p className="text-gray-600 mt-1">{plan.description}</p>
      </div>
      
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-3xl font-bold text-gray-900">
            {formatCurrency(plan.price)}
          </span>
          <span className="text-lg text-gray-500 line-through">
            {formatCurrency(plan.originalPrice)}
          </span>
        </div>
        <p className="text-gray-600">/{plan.duration}</p>
      </div>
      
      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="text-center">
        {selectedPlan === plan.id ? (
          <div className={`w-6 h-6 rounded-full bg-${plan.color}-500 mx-auto flex items-center justify-center`}>
            <Check className="w-4 h-4 text-white" />
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full border-2 border-gray-300 mx-auto"></div>
        )}
      </div>
    </div>
  );

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán thành công!</h2>
          <p className="text-gray-600 mb-6">
            Cảm ơn bạn đã mua dịch vụ. Hóa đơn và hướng dẫn sử dụng đã được gửi đến email của bạn.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Thông tin đơn hàng</h3>
            <div className="text-left space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Gói dịch vụ:</span>
                <span>{plans[selectedPlan].name}</span>
              </div>
              <div className="flex justify-between">
                <span>Số lượng:</span>
                <span>{quantity}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Tổng tiền:</span>
                <span>{formatCurrency(pricing.total)}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Download className="w-4 h-4 mr-2" />
              Tải hóa đơn
            </button>
            <button 
              onClick={() => setShowConfirmation(false)}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Dịch vụ Quản lý CTV/TNV
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hệ thống quản lý cộng tác viên và tình nguyện viên chuyên nghiệp, 
            giúp tổ chức của bạn hoạt động hiệu quả hơn
          </p>
        </div>

        {/* Service Overview */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Tại sao chọn dịch vụ của chúng tôi?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <ShieldCheck className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Bảo mật cao</h3>
                    <p className="text-gray-600">Dữ liệu được mã hóa và bảo vệ theo tiêu chuẩn quốc tế</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Truck className="w-6 h-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Triển khai nhanh</h3>
                    <p className="text-gray-600">Cài đặt và sử dụng ngay trong vòng 24h</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Hỗ trợ 24/7</h3>
                    <p className="text-gray-600">Đội ngũ kỹ thuật luôn sẵn sàng hỗ trợ</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6">
              <img 
                src="/api/placeholder/400/300" 
                alt="Service Dashboard"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Plans & Options */}
          <div className="lg:col-span-2 space-y-8">
            {/* Plan Selection */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Chọn gói dịch vụ</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.values(plans).map(plan => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </div>
            </div>

            {/* Quantity & Coupon */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quantity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Số lượng</h3>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-xl font-semibold min-w-[3rem] text-center">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Coupon */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Mã giảm giá</h3>
                  {appliedCoupon ? (
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center">
                          <Tag className="w-4 h-4 text-green-600 mr-2" />
                          <span className="font-medium text-green-800">{appliedCoupon.code}</span>
                        </div>
                        <p className="text-sm text-green-600">{appliedCoupon.description}</p>
                      </div>
                      <button
                        onClick={handleCouponRemove}
                        className="w-10 h-10 text-red-600 hover:bg-red-50 rounded-lg flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Nhập mã giảm giá"
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleCouponApply}
                        className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                      >
                        Áp dụng
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin liên hệ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    value={contactInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email *
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="w-4 h-4 inline mr-1" />
                    Tổ chức/Công ty
                  </label>
                  <input
                    type="text"
                    value={contactInfo.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    value={contactInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Phương thức thanh toán</h3>
              <div className="space-y-3">
                {paymentMethods.map(method => (
                  <label
                    key={method.id}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPayment === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={selectedPayment === method.id}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="sr-only"
                    />
                    <method.icon className="w-6 h-6 text-gray-600 mr-3" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{method.name}</p>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                    {selectedPayment === method.id && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tóm tắt đơn hàng</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Gói dịch vụ:</span>
                  <span className="font-medium">{plans[selectedPlan].name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Số lượng:</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thành tiền:</span>
                  <span className="font-medium">{formatCurrency(pricing.subtotal)}</span>
                </div>
                
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá ({appliedCoupon.code}):</span>
                    <span>-{formatCurrency(pricing.discountAmount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">VAT (10%):</span>
                  <span className="font-medium">{formatCurrency(pricing.tax)}</span>
                </div>
              </div>
              
              <div className="border-t pt-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">Tổng cộng:</span>
                  <span className="text-lg font-bold text-blue-600">
                    {formatCurrency(pricing.total)}
                  </span>
                </div>
              </div>
              
              <button
                onClick={handlePurchase}
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Thanh toán ngay
                  </>
                )}
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                Bằng cách thanh toán, bạn đồng ý với điều khoản dịch vụ của chúng tôi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}