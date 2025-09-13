import React, { useState } from "react";
import { 
  Bell, 
  Calendar, 
  MessageSquare, 
  Trophy,
  Users,
  Heart,
  Star,
  Award,
  Info,
  AlertCircle,
  CheckCircle,
  X,
  Trash2,
  Filter,
  MoreVertical,
  Clock,
  Eye,
  EyeOff,
  Settings
} from "lucide-react";

export default function Notifications() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showReadNotifications, setShowReadNotifications] = useState(true);
  
  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "event_invitation",
      title: "Lời mời tham gia sự kiện",
      message: "Bạn được mời tham gia sự kiện 'Hội thảo về Tình nguyện viên' diễn ra vào ngày 20/09/2025",
      time: "2 giờ trước",
      read: false,
      avatar: "/api/placeholder/40/40",
      sender: "Ban Tổ chức Hội thảo",
      priority: "high",
      actionButtons: true
    },
    {
      id: 2,
      type: "message",
      title: "Tin nhắn mới",
      message: "Nguyễn Văn An đã gửi tin nhắn: 'Chào bạn, mình có thể tham gia sự kiện này không?'",
      time: "3 giờ trước",
      read: false,
      avatar: "/api/placeholder/40/40",
      sender: "Nguyễn Văn An",
      priority: "medium"
    },
    {
      id: 3,
      type: "achievement",
      title: "Đạt thành tựu mới",
      message: "Chúc mừng! Bạn đã hoàn thành 50 giờ tình nguyện và nhận được huy hiệu 'Tình nguyện viên tích cực'",
      time: "1 ngày trước",
      read: true,
      avatar: null,
      sender: "Hệ thống VHub",
      priority: "low"
    },
    {
      id: 4,
      type: "event_update",
      title: "Cập nhật sự kiện",
      message: "Sự kiện 'Làm sạch môi trường' đã thay đổi địa điểm từ Công viên Thống Nhất sang Công viên Cầu Giấy",
      time: "1 ngày trước",
      read: true,
      avatar: "/api/placeholder/40/40",
      sender: "BTC Làm sạch môi trường",
      priority: "high"
    },
    {
      id: 5,
      type: "community",
      title: "Hoạt động cộng đồng",
      message: "Có 15 tình nguyện viên mới tham gia nhóm 'Hỗ trợ giáo dục' mà bạn đang theo dõi",
      time: "2 ngày trước",
      read: true,
      avatar: null,
      sender: "Cộng đồng VHub",
      priority: "low"
    },
    {
      id: 6,
      type: "contest",
      title: "Kết quả cuộc thi",
      message: "Cuộc thi 'Ý tưởng sáng tạo cho cộng đồng' đã công bố kết quả. Bạn đạt giải Ba!",
      time: "3 ngày trước",
      read: false,
      avatar: "/api/placeholder/40/40",
      sender: "BTC Cuộc thi Sáng tạo",
      priority: "high",
      actionButtons: true
    },
    {
      id: 7,
      type: "system",
      title: "Cập nhật hệ thống",
      message: "VHub đã cập nhật tính năng mới: Theo dõi tiến độ tình nguyện của bạn với biểu đồ chi tiết",
      time: "1 tuần trước",
      read: true,
      avatar: null,
      sender: "Hệ thống VHub",
      priority: "low"
    },
    {
      id: 8,
      type: "reminder",
      title: "Nhắc nhở sự kiện",
      message: "Sự kiện 'Workshop về Leadership' sẽ bắt đầu vào lúc 14:00 ngày mai. Bạn đã sẵn sàng chưa?",
      time: "1 tuần trước",
      read: true,
      avatar: "/api/placeholder/40/40",
      sender: "Lịch sự kiện",
      priority: "medium"
    }
  ]);

  // Notification tabs
  const notificationTabs = [
    { id: "all", label: "Tất cả", count: notifications.length },
    { id: "unread", label: "Chưa đọc", count: notifications.filter(n => !n.read).length },
    { id: "event", label: "Sự kiện", count: notifications.filter(n => n.type.includes('event')).length },
    { id: "message", label: "Tin nhắn", count: notifications.filter(n => n.type === 'message').length },
    { id: "system", label: "Hệ thống", count: notifications.filter(n => n.type === 'system' || n.type === 'achievement').length }
  ];

  // Filter notifications based on selected tab
  const filteredNotifications = notifications.filter(notification => {
    if (!showReadNotifications && notification.read) return false;
    
    switch (selectedTab) {
      case "unread":
        return !notification.read;
      case "event":
        return notification.type.includes('event') || notification.type === 'reminder';
      case "message":
        return notification.type === 'message';
      case "system":
        return notification.type === 'system' || notification.type === 'achievement';
      default:
        return true;
    }
  });

  // Get notification icon
  const getNotificationIcon = (type, priority) => {
    const iconProps = { 
      size: 20, 
      className: priority === 'high' ? 'text-red-500' : priority === 'medium' ? 'text-orange-500' : 'text-blue-500' 
    };
    
    switch (type) {
      case "event_invitation":
      case "event_update":
        return <Calendar {...iconProps} />;
      case "message":
        return <MessageSquare {...iconProps} />;
      case "achievement":
        return <Trophy {...iconProps} />;
      case "community":
        return <Users {...iconProps} />;
      case "contest":
        return <Award {...iconProps} />;
      case "reminder":
        return <Clock {...iconProps} />;
      case "system":
        return <Settings {...iconProps} />;
      default:
        return <Bell {...iconProps} />;
    }
  };

  // Get priority badge
  const getPriorityBadge = (priority) => {
    const badges = {
      high: { color: "bg-red-100 text-red-700", label: "Quan trọng" },
      medium: { color: "bg-orange-100 text-orange-700", label: "Bình thường" },
      low: { color: "bg-gray-100 text-gray-700", label: "Thông tin" }
    };
    
    const badge = badges[priority] || badges.low;
    return (
      <span className={`px-2 py-1 text-xs rounded-full font-medium ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Clear all read notifications
  const clearReadNotifications = () => {
    setNotifications(prev => prev.filter(notif => !notif.read));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
              <Bell size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Thông báo</h1>
              <p className="text-slate-600 mt-1">Theo dõi tất cả hoạt động và cập nhật quan trọng</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-blue-500" />
                <span className="text-sm font-medium text-slate-600">Tổng số</span>
              </div>
              <div className="text-2xl font-bold text-slate-800 mt-1">{notifications.length}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-orange-500" />
                <span className="text-sm font-medium text-slate-600">Chưa đọc</span>
              </div>
              <div className="text-2xl font-bold text-orange-600 mt-1">
                {notifications.filter(n => !n.read).length}
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-green-500" />
                <span className="text-sm font-medium text-slate-600">Sự kiện</span>
              </div>
              <div className="text-2xl font-bold text-green-600 mt-1">
                {notifications.filter(n => n.type.includes('event')).length}
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-purple-500" />
                <span className="text-sm font-medium text-slate-600">Tin nhắn</span>
              </div>
              <div className="text-2xl font-bold text-purple-600 mt-1">
                {notifications.filter(n => n.type === 'message').length}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
              {notificationTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedTab === tab.id
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-slate-600 hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                      selectedTab === tab.id 
                        ? "bg-blue-100 text-blue-700" 
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowReadNotifications(!showReadNotifications)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                {showReadNotifications ? <EyeOff size={16} /> : <Eye size={16} />}
                {showReadNotifications ? "Ẩn đã đọc" : "Hiện đã đọc"}
              </button>
              
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-green-600 transition-colors"
              >
                <CheckCircle size={16} />
                Đánh dấu tất cả
              </button>
              
              <button
                onClick={clearReadNotifications}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-red-600 transition-colors"
              >
                <Trash2 size={16} />
                Xóa đã đọc
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <Bell size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-800 mb-2">Không có thông báo</h3>
              <p className="text-slate-600">
                {selectedTab === "unread" 
                  ? "Bạn đã đọc hết tất cả thông báo!" 
                  : "Chưa có thông báo nào trong danh mục này."}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl border transition-all duration-200 hover:shadow-md group ${
                  notification.read 
                    ? "border-gray-200 opacity-75" 
                    : "border-blue-200 bg-blue-50/30"
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Avatar or Icon */}
                    <div className="flex-shrink-0">
                      {notification.avatar ? (
                        <img 
                          src={notification.avatar} 
                          alt={notification.sender}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                          {getNotificationIcon(notification.type, notification.priority)}
                        </div>
                      )}
                      {!notification.read && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full -mt-2 ml-9 border-2 border-white"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800 mb-1">
                            {notification.title}
                          </h3>
                          <p className="text-sm text-slate-600 mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span>{notification.sender}</span>
                            <span>•</span>
                            <span>{notification.time}</span>
                            <span>•</span>
                            {getPriorityBadge(notification.priority)}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-2 text-slate-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                              title="Đánh dấu đã đọc"
                            >
                              <CheckCircle size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            title="Xóa thông báo"
                          >
                            <Trash2 size={16} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-gray-50 transition-colors">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {notification.actionButtons && (
                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                          {notification.type === "event_invitation" && (
                            <>
                              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                                Tham gia
                              </button>
                              <button className="px-4 py-2 border border-gray-300 text-slate-600 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                                Từ chối
                              </button>
                            </>
                          )}
                          {notification.type === "contest" && (
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                              Xem kết quả
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="mt-8 text-center">
            <button className="px-6 py-3 bg-white border border-gray-300 text-slate-600 rounded-xl hover:bg-gray-50 transition-colors font-medium">
              Tải thêm thông báo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}