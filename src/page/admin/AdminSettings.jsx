import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Bell,
  Mail,
  Database,
  Globe,
  Lock,
  Users,
  Calendar,
  MessageSquare,
  AlertTriangle,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  Key,
  Server,
  Smartphone,
  Clock,
  FileText,
  Image,
  Video,
  Upload,
  Download,
  Zap,
  CheckCircle,
  XCircle,
  Info,
  RefreshCw,
  ExternalLink,
  Copy,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  MoreVertical,
  BarChart3,
  Activity
} from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'VolunteerHub',
      siteDescription: 'Nền tảng kết nối tình nguyện viên và tổ chức',
      adminEmail: 'admin@volunteerhub.vn',
      contactEmail: 'support@volunteerhub.vn',
      timezone: 'Asia/Ho_Chi_Minh',
      language: 'vi',
      maintenanceMode: false,
      registrationEnabled: true,
      eventCreationRequiresApproval: true
    },
    security: {
      twoFactorEnabled: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordMinLength: 8,
      requireStrongPassword: true,
      allowRememberMe: true,
      ipWhitelist: '',
      sslRequired: true,
      apiRateLimit: 1000
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      newUserRegistration: true,
      eventSubmission: true,
      reportSubmission: true,
      systemAlerts: true,
      maintenanceNotices: true,
      weeklyReports: true
    },
    moderation: {
      autoApproveVerifiedPartners: true,
      contentModerationLevel: 'medium', // low, medium, high
      aiContentScanningEnabled: true,
      profanityFilterEnabled: true,
      imageModeration: true,
      videoModeration: false,
      maxEventDuration: 30,
      maxVolunteersPerEvent: 500,
      requireEventDescription: true
    },
    integration: {
      emailProvider: 'smtp',
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUsername: '',
      smtpPassword: '',
      smsProvider: 'twilio',
      twilioAccountSid: '',
      twilioAuthToken: '',
      googleAnalyticsId: '',
      facebookPixelId: '',
      zaloOAId: ''
    },
    storage: {
      maxFileSize: 10, // MB
      allowedFileTypes: 'jpg,jpeg,png,pdf,doc,docx',
      storageProvider: 'local', // local, s3, cloudinary
      s3Bucket: '',
      s3AccessKey: '',
      s3SecretKey: '',
      cloudinaryCloudName: '',
      cloudinaryApiKey: '',
      backupFrequency: 'daily',
      retentionDays: 30
    }
  });

  const [showPassword, setShowPassword] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const tabs = [
    { id: 'general', label: 'Cài đặt chung', icon: Settings },
    { id: 'security', label: 'Bảo mật', icon: Shield },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'moderation', label: 'Kiểm duyệt', icon: Eye },
    { id: 'integration', label: 'Tích hợp', icon: Zap },
    { id: 'storage', label: 'Lưu trữ', icon: Database }
  ];

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      setLastSaved(new Date());
      // TODO: replace with real API call (axios/fetch)
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục cài đặt mặc định?')) {
      // In real app, request default settings or reset on server
      window.location.reload();
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tên website
          </label>
          <input
            type="text"
            value={settings.general.siteName}
            onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email quản trị
          </label>
          <input
            type="email"
            value={settings.general.adminEmail}
            onChange={(e) => handleSettingChange('general', 'adminEmail', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mô tả website
          </label>
          <textarea
            value={settings.general.siteDescription}
            onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Múi giờ
          </label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (GMT+7)</option>
            <option value="Asia/Bangkok">Asia/Bangkok (GMT+7)</option>
            <option value="UTC">UTC (GMT+0)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ngôn ngữ mặc định
          </label>
          <select
            value={settings.general.language}
            onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Chế độ bảo trì</h4>
            <p className="text-sm text-gray-500">Tạm thời tắt website cho người dùng</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.general.maintenanceMode}
              onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Bắt buộc mô tả sự kiện</h4>
            <p className="text-sm text-gray-500">Sự kiện phải có mô tả chi tiết</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.moderation.requireEventDescription}
              onChange={(e) => handleSettingChange('moderation', 'requireEventDescription', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Cho phép đăng ký</h4>
            <p className="text-sm text-gray-500">Người dùng có thể tự đăng ký tài khoản</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.general.registrationEnabled}
              onChange={(e) => handleSettingChange('general', 'registrationEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Duyệt sự kiện</h4>
            <p className="text-sm text-gray-500">Sự kiện cần được duyệt trước khi công khai</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.general.eventCreationRequiresApproval}
              onChange={(e) => handleSettingChange('general', 'eventCreationRequiresApproval', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thời gian hết phiên (phút)
          </label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            min="5"
            max="480"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số lần đăng nhập tối đa
          </label>
          <input
            type="number"
            value={settings.security.maxLoginAttempts}
            onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            min="3"
            max="10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Độ dài mật khẩu tối thiểu
          </label>
          <input
            type="number"
            value={settings.security.passwordMinLength}
            onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            min="6"
            max="20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Giới hạn API (request/giờ)
          </label>
          <input
            type="number"
            value={settings.security.apiRateLimit}
            onChange={(e) => handleSettingChange('security', 'apiRateLimit', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            min="100"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            IP Whitelist (một IP trên mỗi dòng)
          </label>
          <textarea
            value={settings.security.ipWhitelist}
            onChange={(e) => handleSettingChange('security', 'ipWhitelist', e.target.value)}
            placeholder="192.168.1.1&#10;10.0.0.1"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Xác thực 2 lớp</h4>
            <p className="text-sm text-gray-500">Bắt buộc admin sử dụng 2FA</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.twoFactorEnabled}
              onChange={(e) => handleSettingChange('security', 'twoFactorEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Mật khẩu mạnh</h4>
            <p className="text-sm text-gray-500">Yêu cầu chữ hoa, số và ký tự đặc biệt</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.requireStrongPassword}
              onChange={(e) => handleSettingChange('security', 'requireStrongPassword', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Bắt buộc SSL</h4>
            <p className="text-sm text-gray-500">Chuyển hướng HTTP sang HTTPS</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.sslRequired}
              onChange={(e) => handleSettingChange('security', 'sslRequired', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(settings.notifications).map(([key, value]) => {
          const labels = {
            emailNotifications: 'Thông báo email',
            smsNotifications: 'Thông báo SMS',
            pushNotifications: 'Push notifications',
            newUserRegistration: 'Đăng ký người dùng mới',
            eventSubmission: 'Gửi sự kiện mới',
            reportSubmission: 'Báo cáo vi phạm',
            systemAlerts: 'Cảnh báo hệ thống',
            maintenanceNotices: 'Thông báo bảo trì',
            weeklyReports: 'Báo cáo tuần'
          };

          const descriptions = {
            emailNotifications: 'Gửi thông báo qua email',
            smsNotifications: 'Gửi thông báo qua SMS',
            pushNotifications: 'Thông báo đẩy trên trình duyệt',
            newUserRegistration: 'Thông báo khi có user mới đăng ký',
            eventSubmission: 'Thông báo khi có sự kiện mới chờ duyệt',
            reportSubmission: 'Thông báo khi có báo cáo vi phạm',
            systemAlerts: 'Cảnh báo lỗi hệ thống',
            maintenanceNotices: 'Thông báo khi bảo trì hệ thống',
            weeklyReports: 'Báo cáo tổng kết hàng tuần'
          };

          return (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{labels[key]}</h4>
                <p className="text-sm text-gray-500">{descriptions[key]}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderModerationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mức độ kiểm duyệt nội dung
          </label>
          <select
            value={settings.moderation.contentModerationLevel}
            onChange={(e) => handleSettingChange('moderation', 'contentModerationLevel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="low">Thấp - Chỉ kiểm duyệt khi có báo cáo</option>
            <option value="medium">Vừa - Kiểm duyệt tự động + thủ công</option>
            <option value="high">Cao - Tất cả nội dung phải được duyệt</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thời gian sự kiện tối đa (ngày)
          </label>
          <input
            type="number"
            value={settings.moderation.maxEventDuration}
            onChange={(e) => handleSettingChange('moderation', 'maxEventDuration', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            min="1"
            max="365"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số TNV tối đa mỗi sự kiện
          </label>
          <input
            type="number"
            value={settings.moderation.maxVolunteersPerEvent}
            onChange={(e) => handleSettingChange('moderation', 'maxVolunteersPerEvent', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            min="1"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Tự động duyệt đối tác đã xác minh</h4>
            <p className="text-sm text-gray-500">Sự kiện từ đối tác verified được duyệt tự động</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.moderation.autoApproveVerifiedPartners}
              onChange={(e) => handleSettingChange('moderation', 'autoApproveVerifiedPartners', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Quét nội dung bằng AI</h4>
            <p className="text-sm text-gray-500">Sử dụng AI để phát hiện nội dung không phù hợp</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.moderation.aiContentScanningEnabled}
              onChange={(e) => handleSettingChange('moderation', 'aiContentScanningEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Bộ lọc từ ngữ không phù hợp</h4>
            <p className="text-sm text-gray-500">Tự động ẩn nội dung chứa từ ngữ không phù hợp</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.moderation.profanityFilterEnabled}
              onChange={(e) => handleSettingChange('moderation', 'profanityFilterEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Kiểm duyệt hình ảnh</h4>
            <p className="text-sm text-gray-500">Quét hình ảnh để phát hiện nội dung không phù hợp</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.moderation.imageModeration}
              onChange={(e) => handleSettingChange('moderation', 'imageModeration', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Kiểm duyệt video</h4>
            <p className="text-sm text-gray-500">Quét video để phát hiện nội dung không phù hợp</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.moderation.videoModeration}
              onChange={(e) => handleSettingChange('moderation', 'videoModeration', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>
      </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      {/* Email Settings */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Mail size={20} />
          Cài đặt Email
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Provider
            </label>
            <select
              value={settings.integration.emailProvider}
              onChange={(e) => handleSettingChange('integration', 'emailProvider', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="smtp">SMTP Custom</option>
              <option value="gmail">Gmail</option>
              <option value="sendgrid">SendGrid</option>
              <option value="mailgun">Mailgun</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Host
            </label>
            <input
              type="text"
              value={settings.integration.smtpHost}
              onChange={(e) => handleSettingChange('integration', 'smtpHost', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="smtp.gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Port
            </label>
            <input
              type="number"
              value={settings.integration.smtpPort}
              onChange={(e) => handleSettingChange('integration', 'smtpPort', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Username
            </label>
            <input
              type="text"
              value={settings.integration.smtpUsername}
              onChange={(e) => handleSettingChange('integration', 'smtpUsername', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Password
            </label>
            <div className="relative">
              <input
                type={showPassword.smtpPassword ? 'text' : 'password'}
                value={settings.integration.smtpPassword}
                onChange={(e) => handleSettingChange('integration', 'smtpPassword', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('smtpPassword')}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword.smtpPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Mail size={16} />
            Test Email Connection
          </button>
        </div>
      </div>

      {/* SMS Settings */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Smartphone size={20} />
          Cài đặt SMS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMS Provider
            </label>
            <select
              value={settings.integration.smsProvider}
              onChange={(e) => handleSettingChange('integration', 'smsProvider', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="twilio">Twilio</option>
              <option value="nexmo">Nexmo</option>
              <option value="sms77">SMS77</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Twilio Account SID
            </label>
            <input
              type="text"
              value={settings.integration.twilioAccountSid}
              onChange={(e) => handleSettingChange('integration', 'twilioAccountSid', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Twilio Auth Token
            </label>
            <div className="relative">
              <input
                type={showPassword.twilioAuthToken ? 'text' : 'password'}
                value={settings.integration.twilioAuthToken}
                onChange={(e) => handleSettingChange('integration', 'twilioAuthToken', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('twilioAuthToken')}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword.twilioAuthToken ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics & Tracking */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 size={20} />
          Analytics & Tracking
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Analytics ID
            </label>
            <input
              type="text"
              value={settings.integration.googleAnalyticsId}
              onChange={(e) => handleSettingChange('integration', 'googleAnalyticsId', e.target.value)}
              placeholder="GA-XXXXXXXXX-X"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facebook Pixel ID
            </label>
            <input
              type="text"
              value={settings.integration.facebookPixelId}
              onChange={(e) => handleSettingChange('integration', 'facebookPixelId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zalo OA ID
            </label>
            <input
              type="text"
              value={settings.integration.zaloOAId}
              onChange={(e) => handleSettingChange('integration', 'zaloOAId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStorageSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kích thước file tối đa (MB)
          </label>
          <input
            type="number"
            value={settings.storage.maxFileSize}
            onChange={(e) => handleSettingChange('storage', 'maxFileSize', parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            min="1"
            max="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Storage Provider
          </label>
          <select
            value={settings.storage.storageProvider}
            onChange={(e) => handleSettingChange('storage', 'storageProvider', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="local">Local Storage</option>
            <option value="s3">Amazon S3</option>
            <option value="cloudinary">Cloudinary</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Định dạng file cho phép
          </label>
          <input
            type="text"
            value={settings.storage.allowedFileTypes}
            onChange={(e) => handleSettingChange('storage', 'allowedFileTypes', e.target.value)}
            placeholder="jpg,jpeg,png,pdf,doc,docx"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <p className="text-sm text-gray-500 mt-1">Phân tách bằng dấu phẩy</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tần suất backup
          </label>
          <select
            value={settings.storage.backupFrequency}
            onChange={(e) => handleSettingChange('storage', 'backupFrequency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="daily">Hàng ngày</option>
            <option value="weekly">Hàng tuần</option>
            <option value="monthly">Hàng tháng</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thời gian lưu trữ (ngày)
          </label>
          <input
            type="number"
            value={settings.storage.retentionDays}
            onChange={(e) => handleSettingChange('storage', 'retentionDays', parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            min="1"
          />
        </div>
      </div>

      {/* S3 Settings */}
      {settings.storage.storageProvider === 's3' && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <h4 className="font-medium text-gray-900">Cài đặt Amazon S3</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                S3 Bucket Name
              </label>
              <input
                type="text"
                value={settings.storage.s3Bucket}
                onChange={(e) => handleSettingChange('storage', 's3Bucket', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Key
              </label>
              <input
                type="text"
                value={settings.storage.s3AccessKey}
                onChange={(e) => handleSettingChange('storage', 's3AccessKey', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secret Key
              </label>
              <div className="relative">
                <input
                  type={showPassword.s3SecretKey ? 'text' : 'password'}
                  value={settings.storage.s3SecretKey}
                  onChange={(e) => handleSettingChange('storage', 's3SecretKey', e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('s3SecretKey')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword.s3SecretKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cloudinary Settings */}
      {settings.storage.storageProvider === 'cloudinary' && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <h4 className="font-medium text-gray-900">Cài đặt Cloudinary</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cloud Name
              </label>
              <input
                type="text"
                value={settings.storage.cloudinaryCloudName}
                onChange={(e) => handleSettingChange('storage', 'cloudinaryCloudName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <input
                type="text"
                value={settings.storage.cloudinaryApiKey}
                onChange={(e) => handleSettingChange('storage', 'cloudinaryApiKey', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'moderation':
        return renderModerationSettings();
      case 'integration':
        return renderIntegrationSettings();
      case 'storage':
        return renderStorageSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Settings size={28} />
              Cài đặt Admin
            </h1>
            <p className="text-gray-600 mt-1">
              Quản lý cấu hình hệ thống và các tùy chọn nâng cao
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RotateCcw size={16} />
              Khôi phục mặc định
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? (
                <RefreshCw size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {isSaving ? 'Đang lưu...' : 'Lưu cài đặt'}
            </button>
          </div>
        </div>

        {lastSaved && (
          <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
            <CheckCircle size={16} />
            Đã lưu lần cuối: {lastSaved.toLocaleString('vi-VN')}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? 'border-red-500 text-red-600 bg-red-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Server size={20} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">System Status</h3>
              <p className="text-sm text-gray-500">Trạng thái hệ thống</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Database</span>
              <span className="text-sm text-green-600 font-medium">Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Redis</span>
              <span className="text-sm text-green-600 font-medium">Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Storage</span>
              <span className="text-sm text-green-600 font-medium">Online</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Performance</h3>
              <p className="text-sm text-gray-500">Hiệu suất hệ thống</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">CPU Usage</span>
              <span className="text-sm text-blue-600 font-medium">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Memory</span>
              <span className="text-sm text-blue-600 font-medium">62%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Disk</span>
              <span className="text-sm text-blue-600 font-medium">38%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle size={20} className="text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Alerts</h3>
              <p className="text-sm text-gray-500">Cảnh báo hệ thống</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Critical</span>
              <span className="text-sm text-red-600 font-medium">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Warning</span>
              <span className="text-sm text-yellow-600 font-medium">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Info</span>
              <span className="text-sm text-blue-600 font-medium">5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
