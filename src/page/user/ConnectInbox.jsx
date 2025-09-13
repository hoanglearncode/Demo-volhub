import React, { useState, useRef, useEffect } from "react";
import { 
  MessageSquare, 
  Search,
  Plus,
  Phone,
  Video,
  MoreVertical,
  Send,
  Smile,
  Paperclip,
  Image,
  Mic,
  Circle,
  Check,
  CheckCheck,
  User,
  Users,
  Calendar,
  MapPin,
  Star,
  Archive,
  Trash2,
  Flag,
  Settings,
  Filter,
  Clock,
  Eye,
  EyeOff,
  Pin,
  Reply,
  Forward,
  Download,
  X,
  ChevronDown,
  Hash,
  Bell,
  BellOff
} from "lucide-react";

export default function ConnectInbox() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock conversations data
  const [conversations, setConversations] = useState([
    {
      id: 1,
      type: "individual",
      participant: {
        name: "Nguyễn Thị Mai",
        avatar: "/api/placeholder/40/40",
        level: "Gold",
        isOnline: true,
        lastSeen: null,
        verified: true
      },
      lastMessage: {
        content: "Cảm ơn bạn đã tham gia sự kiện hôm nay! Hy vọng sẽ có cơ hội hợp tác thêm 😊",
        timestamp: "2 phút trước",
        sender: "other",
        isRead: false
      },
      unreadCount: 2,
      isPinned: true,
      isMuted: false,
      category: "event_organizer"
    },
    {
      id: 2,
      type: "group",
      participant: {
        name: "Nhóm Tình nguyện Hà Nội",
        avatar: "/api/placeholder/40/40",
        memberCount: 45,
        isOnline: false,
        lastSeen: null
      },
      lastMessage: {
        content: "Trần Văn Đức: Ai có thể hỗ trợ sự kiện cuối tuần không?",
        timestamp: "15 phút trước",
        sender: "other",
        isRead: true
      },
      unreadCount: 0,
      isPinned: false,
      isMuted: true,
      category: "group"
    },
    {
      id: 3,
      type: "individual",
      participant: {
        name: "Lê Thị Hương",
        avatar: "/api/placeholder/40/40",
        level: "Silver",
        isOnline: false,
        lastSeen: "2 giờ trước",
        verified: false
      },
      lastMessage: {
        content: "Mình muốn tham gia dự án giáo dục mà bạn đang làm",
        timestamp: "1 giờ trước",
        sender: "other",
        isRead: false
      },
      unreadCount: 1,
      isPinned: false,
      isMuted: false,
      category: "volunteer"
    },
    {
      id: 4,
      type: "individual",
      participant: {
        name: "BTC Sự kiện Xanh",
        avatar: "/api/placeholder/40/40",
        level: "Platinum",
        isOnline: true,
        lastSeen: null,
        verified: true
      },
      lastMessage: {
        content: "Lịch training cho TNV đã được cập nhật. Bạn check email nhé!",
        timestamp: "3 giờ trước",
        sender: "other",
        isRead: true
      },
      unreadCount: 0,
      isPinned: true,
      isMuted: false,
      category: "event_organizer"
    },
    {
      id: 5,
      type: "individual",
      participant: {
        name: "Phạm Minh Tú",
        avatar: "/api/placeholder/40/40",
        level: "Bronze",
        isOnline: false,
        lastSeen: "1 ngày trước",
        verified: false
      },
      lastMessage: {
        content: "Bạn có thể chia sẻ kinh nghiệm làm tình nguyện không?",
        timestamp: "1 ngày trước",
        sender: "other",
        isRead: true
      },
      unreadCount: 0,
      isPinned: false,
      isMuted: false,
      category: "volunteer"
    }
  ]);

  // Mock messages for selected conversation
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Chào bạn! Mình thấy bạn có kinh nghiệm về tổ chức sự kiện. Có thể hỗ trợ mình một chút không?",
      sender: "other",
      timestamp: "10:30",
      status: "delivered",
      type: "text"
    },
    {
      id: 2,
      content: "Chào bạn! Tất nhiên rồi, mình sẵn sàng hỗ trợ. Bạn cần giúp gì cụ thể?",
      sender: "me",
      timestamp: "10:32",
      status: "read",
      type: "text"
    },
    {
      id: 3,
      content: "Mình đang chuẩn bị tổ chức một sự kiện làm sạch môi trường. Cần tuyển khoảng 50 tình nguyện viên.",
      sender: "other",
      timestamp: "10:35",
      status: "delivered",
      type: "text"
    },
    {
      id: 4,
      content: "Nghe hay đấy! Mình có thể giúp bạn tuyển TNV qua mạng lưới của mình. Sự kiện diễn ra khi nào?",
      sender: "me",
      timestamp: "10:36",
      status: "read",
      type: "text"
    },
    {
      id: 5,
      content: "",
      sender: "other",
      timestamp: "10:40",
      status: "delivered",
      type: "image",
      imageUrl: "/api/placeholder/300/200",
      caption: "Đây là poster sự kiện, bạn xem thế nào?"
    },
    {
      id: 6,
      content: "Poster thiết kế rất đẹp! Sự kiện vào 25/09 à? Mình sẽ share lên group và mời bạn bè tham gia.",
      sender: "me",
      timestamp: "10:42",
      status: "read",
      type: "text"
    },
    {
      id: 7,
      content: "Cảm ơn bạn rất nhiều! Mình sẽ gửi thêm thông tin chi tiết qua email cho bạn nhé.",
      sender: "other",
      timestamp: "10:45",
      status: "delivered",
      type: "text"
    }
  ]);

  // Tabs for filtering conversations
  const conversationTabs = [
    { id: "all", label: "Tất cả", count: conversations.length },
    { id: "unread", label: "Chưa đọc", count: conversations.filter(c => c.unreadCount > 0).length },
    { id: "event_organizer", label: "BTC", count: conversations.filter(c => c.category === "event_organizer").length },
    { id: "volunteer", label: "TNV", count: conversations.filter(c => c.category === "volunteer").length },
    { id: "group", label: "Nhóm", count: conversations.filter(c => c.type === "group").length }
  ];

  // Simple emoji list
  const emojiList = ["😊","👍","🎉","🙏","🔥","💪","🙂","🙌","👏","🤝","🌟","📣"];

  // Get user level color
  const getUserLevelColor = (level) => {
    const colors = {
      Bronze: "from-amber-600 to-orange-600",
      Silver: "from-slate-400 to-slate-600", 
      Gold: "from-yellow-400 to-yellow-600",
      Platinum: "from-purple-400 to-purple-600"
    };
    return colors[level] || "from-blue-500 to-purple-600";
  };

  // Filter conversations
  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    switch (activeTab) {
      case "unread":
        return conv.unreadCount > 0;
      case "event_organizer":
        return conv.category === "event_organizer";
      case "volunteer":
        return conv.category === "volunteer";
      case "group":
        return conv.type === "group";
      default:
        return true;
    }
  }).sort((a, b) => {
    // Pinned conversations first
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    // Then preserve original order (mock)
    return 0;
  });

  // Handle sending message
  const handleSendMessage = () => {
    if (messageInput.trim() && selectedConversation) {
      const newMessage = {
        id: messages.length + 1,
        content: messageInput.trim(),
        sender: "me",
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        status: "sent",
        type: "text"
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessageInput("");
      setShowEmojiPicker(false);
      
      // Update last message in conversation
      setConversations(prev => prev.map(conv => 
        conv.id === selectedConversation.id 
          ? { 
              ...conv, 
              lastMessage: { 
                content: messageInput.trim(), 
                timestamp: "Vừa xong", 
                sender: "me",
                isRead: true 
              }
            }
          : conv
      ));

      // mark conversation in state as having this last message
      setSelectedConversation(prev => prev ? { ...prev, lastMessage: { content: messageInput.trim(), timestamp: "Vừa xong", sender: "me", isRead: true } } : prev);
    }
  };

  // Handle key press in message input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto scroll to bottom when new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mark conversation as read when selected
  useEffect(() => {
    if (selectedConversation && selectedConversation.unreadCount > 0) {
      setConversations(prev => prev.map(conv => 
        conv.id === selectedConversation.id 
          ? { ...conv, unreadCount: 0, lastMessage: { ...conv.lastMessage, isRead: true } }
          : conv
      ));
      setSelectedConversation(prev => prev ? ({ ...prev, unreadCount: 0 }) : prev);
    }
  }, [selectedConversation]);

  const MessageStatus = ({ status }) => {
    switch (status) {
      case "sent":
        return <Check size={16} className="text-slate-400" />;
      case "delivered":
        return <CheckCheck size={16} className="text-slate-400" />;
      case "read":
        return <CheckCheck size={16} className="text-blue-500" />;
      default:
        return <Circle size={16} className="text-slate-300" />;
    }
  };

  // Emoji add
  const addEmoji = (emoji) => {
    setMessageInput(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  // Quick select first conversation when component mounts
  useEffect(() => {
    if (!selectedConversation && conversations.length > 0) {
      setSelectedConversation(conversations[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl text-white">
              <MessageSquare size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Hộp thư kết nối</h1>
              <p className="text-slate-600 mt-1">Giao tiếp và kết nối với cộng đồng tình nguyện viên</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-blue-500" />
                <span className="text-sm font-medium text-slate-600">Tổng tin nhắn</span>
              </div>
              <div className="text-2xl font-bold text-slate-800 mt-1">{conversations.length}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2">
                <Circle size={16} className="text-orange-500" />
                <span className="text-sm font-medium text-slate-600">Chưa đọc</span>
              </div>
              <div className="text-2xl font-bold text-orange-600 mt-1">
                {conversations.filter(c => c.unreadCount > 0).length}
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-green-500" />
                <span className="text-sm font-medium text-slate-600">Nhóm</span>
              </div>
              <div className="text-2xl font-bold text-green-600 mt-1">
                {conversations.filter(c => c.type === "group").length}
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2">
                <Pin size={16} className="text-purple-500" />
                <span className="text-sm font-medium text-slate-600">Đã ghim</span>
              </div>
              <div className="text-2xl font-bold text-purple-600 mt-1">
                {conversations.filter(c => c.isPinned).length}
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Interface */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden" style={{ height: 'calc(100vh - 320px)' }}>
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              {/* Search and Filter */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Tìm kiếm cuộc trò chuyện..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-1">
                  {conversationTabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "text-slate-600 hover:bg-gray-50 border border-transparent"
                      }`}
                    >
                      {tab.label}
                      {tab.count > 0 && (
                        <span className={`px-1.5 py-0.5 text-xs rounded-full font-medium ${
                          activeTab === tab.id 
                            ? "bg-blue-100 text-blue-700" 
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map(conversation => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors relative ${
                      selectedConversation?.id === conversation.id ? "bg-blue-50 border-blue-200" : ""
                    }`}
                  >
                    {conversation.isPinned && (
                      <Pin size={14} className="absolute top-2 right-2 text-blue-500" />
                    )}
                    
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        {conversation.type === "individual" ? (
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getUserLevelColor(conversation.participant.level || 'Bronze')} flex items-center justify-center text-white relative`}>
                            {conversation.participant.avatar ? (
                              <img 
                                src={conversation.participant.avatar} 
                                alt={conversation.participant.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <span className="font-bold text-sm">{conversation.participant.name.charAt(0)}</span>
                            )}
                            {conversation.participant.verified && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                                <Check className="w-2 h-2 text-white" />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white">
                            <Users size={20} />
                          </div>
                        )}
                        
                        {conversation.participant.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                        
                        {conversation.isMuted && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 rounded-full border-2 border-white flex items-center justify-center">
                            <BellOff className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-slate-800 text-sm truncate">
                            {conversation.participant.name}
                            {conversation.type === "group" && (
                              <span className="text-xs text-slate-500 font-normal ml-1">
                                ({conversation.participant.memberCount} thành viên)
                              </span>
                            )}
                          </h4>
                          <span className="text-xs text-slate-500">{conversation.lastMessage.timestamp}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className={`text-sm truncate ${
                            !conversation.lastMessage.isRead && conversation.lastMessage.sender === "other"
                              ? "text-slate-800 font-medium" 
                              : "text-slate-600"
                          }`}>
                            {conversation.lastMessage.content}
                          </p>
                          
                          {conversation.unreadCount > 0 && (
                            <span className="ml-2 min-w-[20px] h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                              {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
                            </span>
                          )}
                        </div>

                        {conversation.participant.lastSeen && !conversation.participant.isOnline && (
                          <p className="text-xs text-slate-400 mt-1">
                            Hoạt động {conversation.participant.lastSeen}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {filteredConversations.length === 0 && (
                  <div className="p-8 text-center">
                    <MessageSquare size={48} className="text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-800 mb-2">Không tìm thấy cuộc trò chuyện</h3>
                    <p className="text-slate-600">Thử thay đổi bộ lọc hoặc tìm kiếm khác</p>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          {selectedConversation.type === "individual" ? (
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getUserLevelColor(selectedConversation.participant.level || 'Bronze')} flex items-center justify-center text-white`}>
                              {selectedConversation.participant.avatar ? (
                                <img 
                                  src={selectedConversation.participant.avatar} 
                                  alt={selectedConversation.participant.name}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <span className="font-bold text-sm">{selectedConversation.participant.name.charAt(0)}</span>
                              )}
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white">
                              <Users size={18} />
                            </div>
                          )}
                          
                          {selectedConversation.participant.isOnline && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-slate-800">{selectedConversation.participant.name}</h3>
                          <p className="text-sm text-slate-500">
                            {selectedConversation.participant.isOnline ? (
                              "Đang hoạt động"
                            ) : selectedConversation.participant.lastSeen ? (
                              `Hoạt động ${selectedConversation.participant.lastSeen}`
                            ) : selectedConversation.type === "group" ? (
                              `${selectedConversation.participant.memberCount} thành viên`
                            ) : (
                              "Ngoại tuyến"
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Call">
                          <Phone size={20} />
                        </button>
                        <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Video">
                          <Video size={20} />
                        </button>
                        <button className="p-2 text-slate-600 hover:text-slate-800 hover:bg-gray-50 rounded-lg transition-colors" title="More">
                          <MoreVertical size={20} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map(message => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-xs lg:max-w-md ${message.sender === "me" ? "order-2" : ""}`}>
                          {message.type === "text" ? (
                            <div className={`px-4 py-2 rounded-2xl ${
                              message.sender === "me" 
                                ? "bg-blue-600 text-white rounded-br-md" 
                                : "bg-white text-slate-800 border border-gray-200 rounded-bl-md"
                            }`}>
                              <p className="text-sm">{message.content}</p>
                            </div>
                          ) : message.type === "image" ? (
                            <div className={`rounded-2xl overflow-hidden ${
                              message.sender === "me" ? "rounded-br-md" : "rounded-bl-md"
                            }`}>
                              <img 
                                src={message.imageUrl} 
                                alt="Shared image" 
                                className="w-full h-auto cursor-pointer hover:opacity-95 transition-opacity"
                              />
                              {message.caption && (
                                <div className={`px-4 py-2 ${
                                  message.sender === "me" 
                                    ? "bg-blue-600 text-white" 
                                    : "bg-white text-slate-800 border-t border-gray-200"
                                }`}>
                                  <p className="text-sm">{message.caption}</p>
                                </div>
                              )}
                            </div>
                          ) : null}
                          
                          <div className={`flex items-center gap-1 mt-1 text-xs text-slate-500 ${
                            message.sender === "me" ? "justify-end" : "justify-start"
                          }`}>
                            <span>{message.timestamp}</span>
                            {message.sender === "me" && <MessageStatus status={message.status} />}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-end gap-3 relative">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Attach">
                          <Paperclip size={20} />
                        </button>
                        <button className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Image">
                          <Image size={20} />
                        </button>
                      </div>
                      
                      <div className="flex-1 relative">
                        <textarea
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Nhập tin nhắn..."
                          rows={1}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                          style={{ minHeight: '44px', maxHeight: '100px' }}
                        />
                        <button
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          className="absolute right-10 top-1/2 transform -translate-y-1/2 p-1 text-slate-600 hover:text-yellow-600 rounded transition-colors"
                          title="Emoji"
                        >
                          <Smile size={18} />
                        </button>

                        {showEmojiPicker && (
                          <div className="absolute right-0 bottom-14 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50">
                            <div className="grid grid-cols-6 gap-2">
                              {emojiList.map((em, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => addEmoji(em)}
                                  className="p-1 text-lg hover:bg-gray-100 rounded"
                                  title={em}
                                >
                                  {em}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim()}
                        className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Send"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center px-6">
                    <MessageSquare size={56} className="text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-800 mb-2">Chọn cuộc trò chuyện để bắt đầu</h3>
                    <p className="text-slate-600 mb-4">Bạn có thể nhắn tin, gửi ảnh hoặc gọi nhanh từ giao diện này.</p>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => setSelectedConversation(conversations[0] || null)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Bắt đầu
                      </button>
                      <button
                        onClick={() => setMessageInput("Xin chào 👋")}
                        className="px-4 py-2 bg-gray-100 text-slate-700 rounded-lg hover:bg-gray-200"
                      >
                        Thử nhắn mẫu
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right sidebar (optional quick details) */}
            <div className="w-1/4 border-l border-gray-200 hidden lg:block">
              <div className="p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Chi tiết</h4>
                {selectedConversation ? (
                  <div className="space-y-3 text-sm text-gray-600">
                    <div><strong>Tên:</strong> {selectedConversation.participant.name}</div>
                    {selectedConversation.type === "group" ? (
                      <div><strong>Thành viên:</strong> {selectedConversation.participant.memberCount}</div>
                    ) : (
                      <>
                        <div><strong>Level:</strong> {selectedConversation.participant.level || "-"}</div>
                        <div><strong>Trạng thái:</strong> {selectedConversation.participant.isOnline ? "Đang hoạt động" : (selectedConversation.participant.lastSeen || "Ngoại tuyến")}</div>
                      </>
                    )}
                    <div><strong>Loại:</strong> {selectedConversation.category || selectedConversation.type}</div>
                    <div><strong>Đã ghim:</strong> {selectedConversation.isPinned ? "Có" : "Không"}</div>
                    <div><strong>Tắt thông báo:</strong> {selectedConversation.isMuted ? "Có" : "Không"}</div>

                    <div className="pt-4">
                      <button className="w-full px-3 py-2 bg-gray-100 rounded-lg text-sm">Xem hồ sơ</button>
                      <button className="w-full mt-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg text-sm">Xóa cuộc trò chuyện</button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">Chọn cuộc trò chuyện để xem chi tiết</p>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
