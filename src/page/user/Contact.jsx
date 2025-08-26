import React, { useState } from 'react';

// Data layer - Tách biệt dữ liệu
const contactData = {
  hotline: "1900 1234",
  email: "contact@company.com",
  address: "123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh",
  workingHours: "8:00 - 17:30, Thứ 2 - Thứ 6",
  emergencyHotline: "1900 911",
  services: [
    { value: "guets", name: "Ẩn danh" },
    { value: "user", name: "Người dùng" },
    { value: "btc", name: "Đơn vị tổ chức" }
  ],
  businessHours: [
    { day: "Thứ Hai - Thứ Sáu", hours: "8:00 - 17:30" },
    { day: "Thứ Bảy", hours: "8:00 - 12:00" },
    { day: "Chủ Nhật", hours: "Nghỉ" }
  ],
  showMap: true
};

// Custom Hook - Tách biệt logic
const useContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    company: '',
    message: ''
  });

  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showMessage = (message, type = 'success') => {
    const id = Date.now();
    const newMessage = { id, message, type };
    setMessages(prev => [...prev, newMessage]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== id));
    }, 5000);
  };

  const removeMessage = (id) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock success response
      showMessage('Tin nhắn của bạn đã được gửi thành công!', 'success');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        company: '',
        message: ''
      });
    } catch (error) {
      showMessage('Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại sau.', 'error');
    }
  };

  return {
    formData,
    messages,
    handleInputChange,
    handleSubmit,
    removeMessage
  };
};

// UI Components - Tách biệt giao diện

// Message Component
const MessageNotification = ({ message, onRemove }) => (
  <div className={`p-4 rounded-md shadow-lg transition-all duration-300 ${
    message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }`}>
    <div className="flex items-center justify-between">
      <span>{message.message}</span>
      <button 
        onClick={() => onRemove(message.id)}
        className="ml-4 text-gray-500 hover:text-gray-700"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
);

// Contact Form Component
const ContactForm = ({ formData, onInputChange, onSubmit, services }) => (
  <div className="bg-white rounded-lg shadow-lg p-8">
    <h3 className="text-2xl font-bold text-gray-800 mb-6">
      <i className="fas fa-envelope text-blue-600 mr-2"></i>
      Gửi Tin Nhắn
    </h3>
    
    <div onSubmit={onSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            Họ *
          </label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName" 
            required
            value={formData.firstName}
            onChange={onInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Nhập họ của bạn"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Tên *
          </label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName" 
            required
            value={formData.lastName}
            onChange={onInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Nhập tên của bạn"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required
          value={formData.email}
          onChange={onInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="example@email.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Số điện thoại *
        </label>
        <input 
          type="tel" 
          id="phone" 
          name="phone" 
          required
          value={formData.phone}
          onChange={onInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="0123 456 789"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
          Vai trò nhắn gửi:
        </label>
        <select 
          id="service" 
          name="service"
          value={formData.service}
          onChange={onInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        >
          <option value="">Vai trò</option>
          {services.map((service) => (
            <option key={service.value} value={service.value}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
          Công ty/Tổ chức
        </label>
        <input 
          type="text" 
          id="company" 
          name="company"
          value={formData.company}
          onChange={onInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="Tên công ty (không bắt buộc)"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Tin nhắn *
        </label>
        <textarea 
          id="message" 
          name="message" 
          rows="5" 
          required
          value={formData.message}
          onChange={onInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          placeholder="Mô tả chi tiết nhu cầu của bạn..."
        />
      </div>

      <button 
        onClick={onSubmit} 
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 font-medium"
      >
        <i className="fas fa-paper-plane mr-2"></i>
        Gửi Tin Nhắn
      </button>
    </div>
  </div>
);

// Contact Info Component
const ContactInfo = ({ data }) => (
  <div className="space-y-8">
    {/* Contact Cards */}
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        <i className="fas fa-info-circle text-blue-600 mr-2"></i>
        Thông Tin Liên Hệ
      </h3>
      
      <div className="space-y-6">
        {/* Phone */}
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <i className="fas fa-phone text-blue-600 text-xl"></i>
          </div>
          <div title="Liên hệ với chúng tôi!">
            <h4 className="font-semibold text-gray-800">Hotline</h4>
            <p className="text-gray-600">{data.hotline}</p>
            <p className="text-sm text-gray-500">24/7 - Hỗ trợ khẩn cấp</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start space-x-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <i className="fas fa-envelope text-green-600 text-xl"></i>
          </div>
          <div title="Liên hệ với chúng tôi ngay!">
            <h4 className="font-semibold text-gray-800">Email</h4>
            <p className="text-gray-600">{data.email}</p>
            <p className="text-sm text-gray-500">Phản hồi trong 24h</p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start space-x-4">
          <div className="bg-purple-100 p-3 rounded-lg">
            <i className="fas fa-map-marker-alt text-purple-600 text-xl"></i>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Địa chỉ</h4>
            <p className="text-gray-600">{data.address}</p>
            <p className="text-sm text-gray-500">{data.workingHours}</p>
          </div>
        </div>
      </div>
    </div>

    {/* Service Hours */}
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100">
      <h4 className="text-lg font-bold text-gray-800 mb-4">
        <i className="fas fa-clock text-blue-600 mr-2"></i>
        Giờ Làm Việc
      </h4>
      <div className="space-y-2 text-sm">
        {data.businessHours.map((schedule, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-600">{schedule.day}</span>
            <span className="font-medium text-gray-800">{schedule.hours}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Emergency Contact */}
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <h4 className="text-lg font-bold text-red-800 mb-2">
        <i className="fas fa-exclamation-triangle text-red-600 mr-2"></i>
        Liên Hệ Khẩn Cấp
      </h4>
      <p className="text-red-700 mb-3">Sự cố hệ thống viễn thông nghiêm trọng</p>
      <div className="flex items-center space-x-2">
        <i className="fas fa-phone text-red-600"></i>
        <span className="font-bold text-red-800">{data.emergencyHotline}</span>
      </div>
    </div>
  </div>
);

// Map Component
const MapSection = () => (
  <div className="mt-12">
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        <i className="fas fa-map text-blue-600 mr-2"></i>
        Vị Trí Của Chúng Tôi
      </h3>
      <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
        <iframe 
          className="h-full w-full rounded-lg" 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21802.600095030924!2d105.79699377701378!3d10.00697899892561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a063005e8d0845%3A0x33c293ed4cc6875f!2zxJDGsOG7nW5nIDIxLCBz4buRIG5ow6AgQzQvNzkga2RjIDU4NiwgUGjGsOG7nW5nIFBow7ogVGjhu6ksIFF14bqtbiBDw6FpIFLEg25nLCBUaMOgbmggUGjhu5EgQ-G6p24gVGjGoS4!5e0!3m2!1svi!2s!4v1753697464391!5m2!1svi!2s" 
          width="600" 
          height="450" 
          style={{border:0}} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </div>
);

// Main Contact Page Component
const ContactPage = () => {
  const {
    formData,
    messages,
    handleInputChange,
    handleSubmit,
    removeMessage
  } = useContactForm();

  return (
    <>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Liên Hệ Với Chúng Tôi</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Chúng tôi luôn sẵn sàng hỗ trợ các nhu cầu của bạn trong hành trình thiện nguyện
          </p>
          <div className="flex justify-center items-center space-x-4">
            <i className="fas fa-phone-alt text-2xl"></i>
            <span className="text-lg">Hotline 24/7: {contactData.hotline}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Message Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {messages.map((message) => (
            <MessageNotification 
              key={message.id} 
              message={message} 
              onRemove={removeMessage} 
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ContactForm 
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            services={contactData.services}
          />

          {/* Contact Information */}
          <ContactInfo data={contactData} />
        </div>

        {/* Map Section */}
        {contactData.showMap && <MapSection />}
      </main>

      {/* FontAwesome CDN for icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
    </>
  );
};

export default ContactPage;