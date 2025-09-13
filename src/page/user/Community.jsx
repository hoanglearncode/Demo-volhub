import React, { useState } from "react";
import { 
  Users, 
  Search,
  Plus,
  Heart,
  MessageCircle,
  Share,
  Calendar,
  MapPin,
  Star,
  Award,
  Filter,
  TrendingUp,
  Clock,
  Eye,
  MoreHorizontal,
  User,
  Camera,
  Send,
  Bookmark,
  Flag,
  UserPlus,
  Hash,
  Globe,
  Lock,
  ChevronDown,
  Image,
  Video,
  Smile,
  ThumbsUp,
  MessageSquare
} from "lucide-react";

export default function Community() {
  const [activeTab, setActiveTab] = useState("feed");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for community groups
  const communityGroups = [
    {
      id: 1,
      name: "Tình nguyện viên Hà Nội",
      description: "Kết nối các tình nguyện viên tại Hà Nội",
      members: 1250,
      posts: 89,
      category: "location",
      avatar: "/api/placeholder/60/60",
      cover: "/api/placeholder/300/150",
      isJoined: true,
      privacy: "public",
      trending: true
    },
    {
      id: 2,
      name: "Giáo dục cho trẻ em",
      description: "Hỗ trợ giáo dục và phát triển trí tuệ cho trẻ em",
      members: 890,
      posts: 156,
      category: "education",
      avatar: "/api/placeholder/60/60",
      cover: "/api/placeholder/300/150",
      isJoined: true,
      privacy: "public",
      trending: false
    },
    {
      id: 3,
      name: "Bảo vệ môi trường",
      description: "Cùng nhau bảo vệ môi trường xanh sạch đẹp",
      members: 2100,
      posts: 234,
      category: "environment",
      avatar: "/api/placeholder/60/60",
      cover: "/api/placeholder/300/150",
      isJoined: false,
      privacy: "public",
      trending: true
    },
    {
      id: 4,
      name: "Chăm sóc người cao tuổi",
      description: "Mang yêu thương đến với người cao tuổi",
      members: 567,
      posts: 78,
      category: "healthcare",
      avatar: "/api/placeholder/60/60",
      cover: "/api/placeholder/300/150",
      isJoined: true,
      privacy: "public",
      trending: false
    }
  ];

  // Mock data for posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: "Nguyễn Thị Mai",
        avatar: "/api/placeholder/40/40",
        level: "Gold",
        verified: true
      },
      group: {
        name: "Tình nguyện viên Hà Nội",
        id: 1
      },
      content: "Hôm nay tham gia hoạt động làm sạch Hồ Gươm cùng với 50 bạn tình nguyện viên khác. Cảm giác thật tuyệt khi được đóng góp cho cộng đồng! 🌱✨",
      images: ["/api/placeholder/500/300", "/api/placeholder/500/300"],
      timestamp: "2 giờ trước",
      likes: 45,
      comments: 12,
      shares: 5,
      isLiked: true,
      isBookmarked: false,
      tags: ["môi_trường", "tình_nguyện", "hà_nội"]
    },
    {
      id: 2,
      author: {
        name: "Trần Văn Đức",
        avatar: "/api/placeholder/40/40",
        level: "Silver",
        verified: false
      },
      group: {
        name: "Giáo dục cho trẻ em",
        id: 2
      },
      content: "Cần tìm 10 tình nguyện viên để hỗ trợ dạy học cho các em nhỏ ở vùng cao Sapa trong tháng 10. Ai có kinh nghiệm và đam mê giáo dục thì liên hệ mình nhé!",
      images: [],
      timestamp: "4 giờ trước",
      likes: 32,
      comments: 18,
      shares: 8,
      isLiked: false,
      isBookmarked: true,
      tags: ["giáo_dục", "tuyển_TNV", "sapa"],
      eventInfo: {
        title: "Dạy học ở Sapa",
        date: "15-20 tháng 10",
        location: "Sapa, Lào Cai"
      }
    },
    {
      id: 3,
      author: {
        name: "Lê Thị Hương",
        avatar: "/api/placeholder/40/40",
        level: "Platinum",
        verified: true
      },
      group: {
        name: "Bảo vệ môi trường",
        id: 3
      },
      content: "Chia sẻ một số tips nhỏ để giảm thiểu rác thải plastic trong cuộc sống hàng ngày. Hãy cùng bắt đầu từ những việc nhỏ nhất! 💚",
      images: ["/api/placeholder/500/400"],
      timestamp: "6 giờ trước",
      likes: 78,
      comments: 25,
      shares: 15,
      isLiked: true,
      isBookmarked: false,
      tags: ["môi_trường", "tips", "giảm_rác"]
    }
  ]);

  // Categories for filtering
  const categories = [
    { id: "all", name: "Tất cả", icon: Globe },
    { id: "location", name: "Theo khu vực", icon: MapPin },
    { id: "education", name: "Giáo dục", icon: User },
    { id: "environment", name: "Môi trường", icon: Users },
    { id: "healthcare", name: "Y tế", icon: Heart }
  ];

  // Trending topics
  const trendingTopics = [
    { tag: "tình_nguyện_mùa_thu", posts: 234 },
    { tag: "làm_sạch_môi_trường", posts: 189 },
    { tag: "giáo_dục_miễn_phí", posts: 156 },
    { tag: "hỗ_trợ_người_già", posts: 98 },
    { tag: "sự_kiện_cuối_tuần", posts: 87 }
  ];

  // Handle post interactions
  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleBookmark = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (postContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        author: {
          name: "Bạn",
          avatar: "/api/placeholder/40/40",
          level: "Gold",
          verified: true
        },
        group: {
          name: "Tình nguyện viên Hà Nội",
          id: 1
        },
        content: postContent,
        images: [],
        timestamp: "Vừa xong",
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        isBookmarked: false,
        tags: []
      };
      
      setPosts(prev => [newPost, ...prev]);
      setPostContent("");
      setShowCreatePost(false);
    }
  };

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

  const filteredGroups = communityGroups.filter(group => 
    selectedCategory === "all" || group.category === selectedCategory
  );

  const filteredPosts = posts.filter(post =>
    selectedCategory === "all" || 
    communityGroups.find(g => g.id === post.group.id)?.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white">
              <Users size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Cộng đồng</h1>
              <p className="text-slate-600 mt-1">Kết nối và chia sẻ với cộng đồng tình nguyện viên</p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Tìm kiếm nhóm, bài viết..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {categories.map(category => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                        selectedCategory === category.id
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-slate-600 hover:text-blue-600"
                      }`}
                    >
                      <Icon size={16} />
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Community Groups */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* My Groups */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-800">Nhóm của tôi</h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Xem tất cả
                  </button>
                </div>
                <div className="space-y-3">
                  {filteredGroups.filter(g => g.isJoined).slice(0, 3).map(group => (
                    <div key={group.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <img src={group.avatar} alt={group.name} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-slate-800 text-sm truncate">{group.name}</div>
                        <div className="text-xs text-slate-500">{group.members} thành viên</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Topics */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="text-orange-500" size={20} />
                  <h3 className="font-semibold text-slate-800">Xu hướng</h3>
                </div>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Hash size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-700 hover:text-blue-600 cursor-pointer">
                          {topic.tag}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">{topic.posts}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Create Post */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    B
                  </div>
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="flex-1 text-left px-4 py-3 bg-gray-50 rounded-lg text-slate-500 hover:bg-gray-100 transition-colors"
                  >
                    Bạn đang nghĩ gì?
                  </button>
                </div>
                
                {showCreatePost && (
                  <div className="space-y-4">
                    <textarea
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="Chia sẻ suy nghĩ của bạn với cộng đồng..."
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={4}
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:bg-gray-50 rounded-lg transition-colors">
                          <Image size={16} />
                          <span className="text-sm">Ảnh</span>
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:bg-gray-50 rounded-lg transition-colors">
                          <Video size={16} />
                          <span className="text-sm">Video</span>
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:bg-gray-50 rounded-lg transition-colors">
                          <Smile size={16} />
                          <span className="text-sm">Cảm xúc</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowCreatePost(false)}
                          className="px-4 py-2 text-slate-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          Hủy
                        </button>
                        <button
                          onClick={handleCreatePost}
                          disabled={!postContent.trim()}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Đăng
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Posts Feed */}
              <div className="space-y-6">
                {filteredPosts.map(post => (
                  <div key={post.id} className="bg-white rounded-xl border border-gray-200">
                    {/* Post Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getUserLevelColor(post.author.level)} flex items-center justify-center text-white relative`}>
                            {post.author.avatar ? (
                              <img src={post.author.avatar} alt={post.author.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              <span className="font-bold text-sm">{post.author.name.charAt(0)}</span>
                            )}
                            {post.author.verified && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-slate-800">{post.author.name}</h4>
                              <span className={`px-2 py-0.5 text-xs rounded-full bg-gradient-to-r ${getUserLevelColor(post.author.level)} text-white`}>
                                {post.author.level}
                              </span>
                            </div>
                            <div className="text-sm text-slate-500">
                              trong <span className="text-blue-600 hover:underline cursor-pointer">{post.group.name}</span> • {post.timestamp}
                            </div>
                          </div>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-gray-50 transition-colors">
                          <MoreHorizontal size={20} />
                        </button>
                      </div>

                      {/* Post Content */}
                      <div className="mb-4">
                        <p className="text-slate-800 mb-3">{post.content}</p>
                        
                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map(tag => (
                              <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs hover:bg-blue-200 cursor-pointer">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Event Info */}
                        {post.eventInfo && (
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 mb-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="text-blue-600" size={16} />
                              <span className="font-medium text-slate-800">{post.eventInfo.title}</span>
                            </div>
                            <div className="text-sm text-slate-600 space-y-1">
                              <div className="flex items-center gap-2">
                                <Clock size={14} />
                                <span>{post.eventInfo.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin size={14} />
                                <span>{post.eventInfo.location}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Post Images */}
                        {post.images && post.images.length > 0 && (
                          <div className={`grid gap-2 mb-3 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                            {post.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Post image ${index + 1}`}
                                className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Post Stats */}
                      <div className="flex items-center justify-between py-3 border-t border-gray-100">
                        <div className="flex items-center gap-6">
                          <span className="text-sm text-slate-500">{post.likes} lượt thích</span>
                          <span className="text-sm text-slate-500">{post.comments} bình luận</span>
                          <span className="text-sm text-slate-500">{post.shares} chia sẻ</span>
                        </div>
                        <span className="text-sm text-slate-500">{post.timestamp}</span>
                      </div>

                      {/* Post Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                              post.isLiked
                                ? "text-red-600 bg-red-50 hover:bg-red-100"
                                : "text-slate-600 hover:bg-gray-50"
                            }`}
                          >
                            <Heart size={18} className={post.isLiked ? "fill-current" : ""} />
                            <span className="text-sm font-medium">Thích</span>
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-gray-50 rounded-lg transition-colors">
                            <MessageSquare size={18} />
                            <span className="text-sm font-medium">Bình luận</span>
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-gray-50 rounded-lg transition-colors">
                            <Share size={18} />
                            <span className="text-sm font-medium">Chia sẻ</span>
                          </button>
                        </div>
                        <button
                          onClick={() => handleBookmark(post.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            post.isBookmarked
                              ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                              : "text-slate-400 hover:text-slate-600 hover:bg-gray-50"
                          }`}
                        >
                          <Bookmark size={18} className={post.isBookmarked ? "fill-current" : ""} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Suggested Groups & Online Users */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Suggested Groups */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="text-green-500" size={20} />
                  <h3 className="font-semibold text-slate-800">Nhóm gợi ý</h3>
                </div>
                <div className="space-y-4">
                  {filteredGroups.filter(g => !g.isJoined).slice(0, 3).map(group => (
                    <div key={group.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <img src={group.avatar} alt={group.name} className="w-12 h-12 rounded-full object-cover" />
                        <div className="flex-1">
                          <div className="font-medium text-slate-800 text-sm">{group.name}</div>
                          <div className="text-xs text-slate-500">{group.members} thành viên</div>
                        </div>
                        {group.trending && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full font-medium">
                            Xu hướng
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{group.description}</p>
                      <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Tham gia
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Online Users */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <h3 className="font-semibold text-slate-800">Đang hoạt động</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Nguyễn Thị Mai", avatar: "/api/placeholder/32/32" },
                    { name: "Trần Văn Đức", avatar: "/api/placeholder/32/32" },
                    { name: "Lê Thị Hương", avatar: "/api/placeholder/32/32" },
                    { name: "Phạm Minh Tú", avatar: "/api/placeholder/32/32" }
                  ].map((user, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="relative">
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <span className="text-sm text-slate-700">{user.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}