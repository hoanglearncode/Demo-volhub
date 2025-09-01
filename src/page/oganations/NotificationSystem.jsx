import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  User, 
  Settings, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  AlertTriangle,
  X,
  Eye,
  EyeOff,
  Trash2,
  Archive,
  Filter,
  Search,
  Clock,
  Calendar,
  UserPlus,
  FileText,
  Mail,
  MessageCircle,
  Star,
  MoreVertical,
  ChevronDown,
  Briefcase,
  Shield,
  Zap,
  Gift,
  TrendingUp,
  Users,
  Download,
  Share2
} from 'lucide-react';

const SystemNotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - thay thế bằng API call thực tế
  const mockNotifications = [
    {
      id: 1,
      type: 'system',
      priority: 'high',
      title: 'Cập nhật hệ thống quan trọng',
      message: 'Hệ thống sẽ được bảo trì vào 2:00 AM ngày mai. Vui lòng lưu công việc của bạn.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isRead: false,
      isStarred: true,
      sender: 'System Admin',
      category: 'maintenance',
      actionRequired: true,
      actions: [
        { type: 'acknowledge', label: 'Đã hiểu' },
        { type: 'details', label: 'Chi tiết' }
      ]
    },
    {
      id: 2,
      type: 'user',
      priority: 'medium',
      title: 'Ứng viên mới ứng tuyển',
      message: 'Nguyễn Văn An đã ứng tuyển vị trí Frontend Developer. Hồ sơ đang chờ xem xét.',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      isRead: false,
      isStarred: false,
      sender: 'HR System',
      category: 'recruitment',
      actionRequired: true,
      relatedUser: {
        name: 'Nguyễn Văn An',
        avatar: null,
        position: 'Frontend Developer'
      },
      actions: [
        { type: 'review', label: 'Xem hồ sơ' },
        { type: 'schedule', label: 'Lên lịch PV' }
      ]
    },
    {
      id: 3,
      type: 'success',
      priority: 'low',
      title: 'Phỏng vấn hoàn thành',
      message: 'Buổi phỏng vấn với Trần Thị B đã hoàn thành thành công. Kết quả đã được ghi nhận.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
      isStarred: false,
      sender: 'Interview System',
      category: 'interview',
      actionRequired: false,
      actions: [
        { type: 'feedback', label: 'Xem feedback' },
        { type: 'decision', label: 'Quyết định' }
      ]
    },
    {
      id: 4,
      type: 'warning',
      priority: 'medium',
      title: 'Deadline sắp tới',
      message: 'Báo cáo tuyển dụng tháng cần nộp trước 5:00 PM hôm nay.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: false,
      isStarred: true,
      sender: 'Report System',
      category: 'deadline',
      actionRequired: true,
      actions: [
        { type: 'submit', label: 'Nộp báo cáo' },
        { type: 'extend', label: 'Xin gia hạn' }
      ]
    },
    {
      id: 5,
      type: 'info',
      priority: 'low',
      title: 'Tính năng mới',
      message: 'Chúng tôi đã thêm tính năng lọc ứng viên nâng cao. Hãy thử ngay!',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: true,
      isStarred: false,
      sender: 'Product Team',
      category: 'feature',
      actionRequired: false,
      actions: [
        { type: 'try', label: 'Thử ngay' },
        { type: 'learn', label: 'Tìm hiểu' }
      ]
    },
    {
      id: 6,
      type: 'user',
      priority: 'high',
      title: 'Phản hồi từ ứng viên',
      message: 'Lê Minh C đã phản hồi về lịch phỏng vấn và yêu cầu thay đổi thời gian.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      isRead: false,
      isStarred: false,
      sender: 'Communication System',
      category: 'communication',
      actionRequired: true,
      relatedUser: {
        name: 'Lê Minh C',
        avatar: null,
        position: 'Backend Developer'
      },
      actions: [
        { type: 'reschedule', label: 'Đổi lịch' },
        { type: 'contact', label: 'Liên hệ' }
      ]
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'system': return <Settings className="w-5 h-5 text-blue-500" />;
      case 'user': return <User className="w-5 h-5 text-green-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'recruitment': return <Users className="w-4 h-4" />;
      case 'interview': return <MessageCircle className="w-4 h-4" />;
      case 'maintenance': return <Settings className="w-4 h-4" />;
      case 'deadline': return <Clock className="w-4 h-4" />;
      case 'feature': return <Zap className="w-4 h-4" />;
      case 'communication': return <Mail className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    
    if (diff < 60000) return 'Vừa xong';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} phút trước`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} giờ trước`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)} ngày trước`;
    return timestamp.toLocaleDateString('vi-VN');
  };

  const filterOptions = [
    { key: 'all', label: 'Tất cả', count: 0 },
    { key: 'unread', label: 'Chưa đọc', count: 0 },
    { key: 'starred', label: 'Quan trọng', count: 0 },
    { key: 'action_required', label: 'Cần hành động', count: 0 },
    { key: 'system', label: 'Hệ thống', count: 0 },
    { key: 'recruitment', label: 'Tuyển dụng', count: 0 },
    { key: 'interview', label: 'Phỏng vấn', count: 0 }
  ];

  const calculateFilterCounts = () => {
    return filterOptions.map(filter => ({
      ...filter,
      count: notifications.filter(notification => {
        switch (filter.key) {
          case 'all': return true;
          case 'unread': return !notification.isRead;
          case 'starred': return notification.isStarred;
          case 'action_required': return notification.actionRequired;
          case 'system': return notification.type === 'system';
          case 'recruitment': return notification.category === 'recruitment';
          case 'interview': return notification.category === 'interview';
          default: return false;
        }
      }).length
    }));
  };

  const applyFilters = () => {
    let filtered = notifications;

    // Apply category filter
    switch (selectedFilter) {
      case 'unread':
        filtered = filtered.filter(n => !n.isRead);
        break;
      case 'starred':
        filtered = filtered.filter(n => n.isStarred);
        break;
      case 'action_required':
        filtered = filtered.filter(n => n.actionRequired);
        break;
      case 'system':
        filtered = filtered.filter(n => n.type === 'system');
        break;
      case 'recruitment':
        filtered = filtered.filter(n => n.category === 'recruitment');
        break;
      case 'interview':
        filtered = filtered.filter(n => n.category === 'interview');
        break;
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(n =>
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.sender.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNotifications(filtered);
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    );
  };

  const handleToggleStar = (notificationId) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, isStarred: !n.isStarred } : n
      )
    );
  };

  const handleDelete = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    setSelectedNotifications(prev => prev.filter(id => id !== notificationId));
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case 'mark_read':
        setNotifications(prev =>
          prev.map(n =>
            selectedNotifications.includes(n.id) ? { ...n, isRead: true } : n
          )
        );
        break;
      case 'delete':
        setNotifications(prev =>
          prev.filter(n => !selectedNotifications.includes(n.id))
        );
        break;
      case 'star':
        setNotifications(prev =>
          prev.map(n =>
            selectedNotifications.includes(n.id) ? { ...n, isStarred: true } : n
          )
        );
        break;
    }
    setSelectedNotifications([]);
    setShowBulkActions(false);
  };

  const handleSelectNotification = (notificationId) => {
    setSelectedNotifications(prev =>
      prev.includes(notificationId)
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    }
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setNotifications(mockNotifications);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [notifications, selectedFilter, searchTerm]);

  useEffect(() => {
    setShowBulkActions(selectedNotifications.length > 0);
  }, [selectedNotifications]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Bell className="w-8 h-8 text-blue-600" />
                Thông báo hệ thống
              </h1>
              <p className="text-gray-600 mt-2">
                Quản lý và theo dõi tất cả thông báo quan trọng
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Cài đặt
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Xuất báo cáo
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Bell className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Tổng thông báo</p>
                  <p className="text-2xl font-semibold text-gray-900">{notifications.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <EyeOff className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Chưa đọc</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {notifications.filter(n => !n.isRead).length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Cần hành động</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {notifications.filter(n => n.actionRequired).length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Hôm nay</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {notifications.filter(n => {
                      const today = new Date();
                      const notifDate = new Date(n.timestamp);
                      return notifDate.toDateString() === today.toDateString();
                    }).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm thông báo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Bộ lọc
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Ngày tháng
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {calculateFilterCounts().map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    selectedFilter === filter.key
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    selectedFilter === filter.key
                      ? 'bg-blue-200 text-blue-800'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bulk Actions */}
          {showBulkActions && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-blue-700">
                    Đã chọn {selectedNotifications.length} thông báo
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleBulkAction('mark_read')}
                    className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    Đánh dấu đã đọc
                  </button>
                  <button
                    onClick={() => handleBulkAction('star')}
                    className="px-3 py-1.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm flex items-center gap-1"
                  >
                    <Star className="w-4 h-4" />
                    Đánh dấu quan trọng
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Xóa
                  </button>
                  <button
                    onClick={() => setSelectedNotifications([])}
                    className="px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-lg shadow-sm border">
          {/* List Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">
                  Hiển thị {filteredNotifications.length} thông báo
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="divide-y divide-gray-200">
            {filteredNotifications.length === 0 ? (
              <div className="p-12 text-center">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không có thông báo nào
                </h3>
                <p className="text-gray-600">
                  {searchTerm ? 'Không tìm thấy thông báo phù hợp với từ khóa tìm kiếm' : 'Tất cả thông báo đã được xử lý'}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-gray-50 transition-colors border-l-4 ${getPriorityColor(notification.priority)} ${
                    !notification.isRead ? 'bg-blue-25' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedNotifications.includes(notification.id)}
                      onChange={() => handleSelectNotification(notification.id)}
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    
                    <div className="flex-shrink-0">
                      {notification.relatedUser ? (
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className={`text-lg font-medium text-gray-900 ${
                            !notification.isRead ? 'font-bold' : ''
                          }`}>
                            {notification.title}
                          </h3>
                          {notification.actionRequired && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                              Cần hành động
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => handleToggleStar(notification.id)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Star className={`w-4 h-4 ${
                              notification.isStarred ? 'text-yellow-500 fill-current' : 'text-gray-400'
                            }`} />
                          </button>
                          <span className="text-sm text-gray-500">
                            {formatTime(notification.timestamp)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          {getCategoryIcon(notification.category)}
                          <span>{notification.sender}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                          notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {notification.priority === 'high' ? 'Cao' :
                           notification.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-4">
                        {notification.message}
                      </p>

                      {notification.relatedUser && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{notification.relatedUser.name}</p>
                              <p className="text-sm text-gray-600">{notification.relatedUser.position}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {notification.actions.map((action, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                if (!notification.isRead) handleMarkAsRead(notification.id);
                                // Handle specific action
                                console.log(`Action: ${action.type} for notification ${notification.id}`);
                              }}
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                action.type === 'acknowledge' || action.type === 'review' || action.type === 'try'
                                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                  : action.type === 'schedule' || action.type === 'reschedule'
                                  ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                  : action.type === 'submit' || action.type === 'decision'
                                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                  : action.type === 'extend' || action.type === 'contact'
                                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          {!notification.isRead && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="p-2 hover:bg-gray-200 rounded-lg text-gray-500"
                              title="Đánh dấu đã đọc"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(notification.id)}
                            className="p-2 hover:bg-red-100 rounded-lg text-gray-500 hover:text-red-600"
                            title="Xóa thông báo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-500">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {filteredNotifications.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    Hiển thị 1-{filteredNotifications.length} của {filteredNotifications.length} thông báo
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                    Trước
                  </button>
                  <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm">
                    1
                  </button>
                  <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                    Sau
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions Panel */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hành động nhanh</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium text-gray-900">Đánh dấu tất cả đã đọc</span>
              </div>
              <p className="text-sm text-gray-600">
                Đánh dấu tất cả thông báo hiện tại là đã đọc
              </p>
            </button>

            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <span className="font-medium text-gray-900">Xem cần hành động</span>
              </div>
              <p className="text-sm text-gray-600">
                Hiển thị các thông báo cần xử lý ngay
              </p>
            </button>

            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Archive className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-medium text-gray-900">Lưu trữ cũ</span>
              </div>
              <p className="text-sm text-gray-600">
                Lưu trữ các thông báo cũ hơn 30 ngày
              </p>
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cài đặt thông báo</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Thông báo email</h4>
                <p className="text-sm text-gray-600">Nhận thông báo qua email cho các sự kiện quan trọng</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Thông báo desktop</h4>
                <p className="text-sm text-gray-600">Hiển thị thông báo desktop khi có tin mới</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Thông báo âm thanh</h4>
                <p className="text-sm text-gray-600">Phát âm thanh khi có thông báo mới</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Tự động lưu trữ</h4>
                <p className="text-sm text-gray-600">Tự động lưu trữ thông báo sau 30 ngày</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Tần suất thông báo email</h4>
                <p className="text-sm text-gray-600">Chọn tần suất nhận email tổng hợp</p>
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="realtime">Ngay lập tức</option>
                <option value="daily">Hàng ngày</option>
                <option value="weekly">Hàng tuần</option>
                <option value="never">Không bao giờ</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemNotificationPage;