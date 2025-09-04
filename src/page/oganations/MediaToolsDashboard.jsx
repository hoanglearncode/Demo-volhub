import React, { useState } from 'react';
import { 
  BarChart3, Calendar, Camera, Video, Mic, Image, 
  FileText, Share2, Users, Eye, Heart, MessageCircle,
  TrendingUp, Clock, Settings, Plus, Filter, Search,
  Facebook, Instagram, Twitter, Youtube, Linkedin,
  Play, Pause, Upload, Download, Edit, Trash2
} from 'lucide-react';

const MediaToolsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600', followers: '125K' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-r from-purple-500 to-pink-500', followers: '87K' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'bg-sky-500', followers: '42K' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'bg-red-600', followers: '156K' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700', followers: '28K' },
  ];

  const contentTypes = [
    { id: 'image', name: 'Hình ảnh', icon: Image, count: 234 },
    { id: 'video', name: 'Video', icon: Video, count: 67 },
    { id: 'audio', name: 'Audio', icon: Mic, count: 45 },
    { id: 'text', name: 'Bài viết', icon: FileText, count: 189 },
  ];

  const recentPosts = [
    {
      id: 1,
      title: 'Chiến lược Marketing Q4 2024',
      platform: 'facebook',
      type: 'image',
      status: 'published',
      engagement: { views: 15420, likes: 892, comments: 234, shares: 156 },
      publishedAt: '2024-09-01T10:30:00',
    },
    {
      id: 2,
      title: 'Behind the scenes - Video Production',
      platform: 'instagram',
      type: 'video',
      status: 'scheduled',
      engagement: { views: 8930, likes: 567, comments: 89, shares: 23 },
      publishedAt: '2024-09-03T15:00:00',
    },
    {
      id: 3,
      title: 'Industry Insights Podcast Ep.12',
      platform: 'youtube',
      type: 'audio',
      status: 'draft',
      engagement: { views: 3450, likes: 234, comments: 45, shares: 12 },
      publishedAt: null,
    },
    {
      id: 4,
      title: 'Product Launch Announcement',
      platform: 'linkedin',
      type: 'text',
      status: 'published',
      engagement: { views: 5670, likes: 123, comments: 67, shares: 45 },
      publishedAt: '2024-08-30T09:15:00',
    },
  ];

  const analytics = {
    totalReach: 456789,
    totalEngagement: 23456,
    totalFollowers: 438000,
    growthRate: 12.5,
    topPerforming: 'Instagram Stories',
    avgEngagementRate: 4.2,
  };

  const tools = [
    {
      category: 'Chỉnh sửa hình ảnh',
      items: [
        { name: 'Canva Pro', status: 'active', lastUsed: '2 giờ trước', usage: 85 },
        { name: 'Adobe Photoshop', status: 'active', lastUsed: '1 ngày trước', usage: 67 },
        { name: 'Figma', status: 'active', lastUsed: '30 phút trước', usage: 92 },
      ]
    },
    {
      category: 'Chỉnh sửa video',
      items: [
        { name: 'Adobe Premiere Pro', status: 'active', lastUsed: '4 giờ trước', usage: 78 },
        { name: 'Final Cut Pro', status: 'inactive', lastUsed: '1 tuần trước', usage: 23 },
        { name: 'DaVinci Resolve', status: 'active', lastUsed: '1 ngày trước', usage: 45 },
      ]
    },
    {
      category: 'Quản lý mạng xã hội',
      items: [
        { name: 'Hootsuite', status: 'active', lastUsed: '15 phút trước', usage: 95 },
        { name: 'Buffer', status: 'active', lastUsed: '2 giờ trước', usage: 73 },
        { name: 'Sprout Social', status: 'trial', lastUsed: '3 ngày trước', usage: 56 },
      ]
    },
    {
      category: 'Phân tích & Báo cáo',
      items: [
        { name: 'Google Analytics', status: 'active', lastUsed: '1 giờ trước', usage: 88 },
        { name: 'Facebook Insights', status: 'active', lastUsed: '30 phút trước', usage: 91 },
        { name: 'YouTube Analytics', status: 'active', lastUsed: '2 giờ trước', usage: 76 },
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getToolStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'trial': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa đặt lịch';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 font-medium text-sm rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-600 text-white p-2 rounded-lg">
                <Share2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Media Hub</h1>
                <p className="text-sm text-gray-600">Quản lý công cụ truyền thông</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Tạo nội dung</span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8 bg-white p-2 rounded-lg shadow-sm">
          <TabButton
            id="overview"
            label="Tổng quan"
            isActive={activeTab === 'overview'}
            onClick={setActiveTab}
          />
          <TabButton
            id="content"
            label="Quản lý nội dung"
            isActive={activeTab === 'content'}
            onClick={setActiveTab}
          />
          <TabButton
            id="tools"
            label="Công cụ"
            isActive={activeTab === 'tools'}
            onClick={setActiveTab}
          />
          <TabButton
            id="analytics"
            label="Phân tích"
            isActive={activeTab === 'analytics'}
            onClick={setActiveTab}
          />
          <TabButton
            id="calendar"
            label="Lịch đăng"
            isActive={activeTab === 'calendar'}
            onClick={setActiveTab}
          />
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tổng lượt tiếp cận</p>
                    <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.totalReach)}</p>
                  </div>
                  <Eye className="w-8 h-8 text-blue-500" />
                </div>
                <div className="mt-2 flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{analytics.growthRate}% so với tháng trước</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tương tác</p>
                    <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.totalEngagement)}</p>
                  </div>
                  <Heart className="w-8 h-8 text-green-500" />
                </div>
                <div className="mt-2">
                  <span className="text-sm text-gray-600">Tỷ lệ tương tác: {analytics.avgEngagementRate}%</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Người theo dõi</p>
                    <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.totalFollowers)}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
                <div className="mt-2">
                  <span className="text-sm text-gray-600">Tất cả nền tảng</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-orange-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Top performing</p>
                    <p className="text-lg font-bold text-gray-900">{analytics.topPerforming}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-orange-500" />
                </div>
                <div className="mt-2">
                  <span className="text-sm text-gray-600">Tuần này</span>
                </div>
              </div>
            </div>

            {/* Platform Overview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Tổng quan nền tảng</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {platforms.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <div key={platform.id} className="text-center">
                      <div className={`${platform.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-medium text-gray-900">{platform.name}</h4>
                      <p className="text-sm text-gray-600">{platform.followers} followers</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Hoạt động gần đây</h3>
              <div className="space-y-4">
                {recentPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {post.type === 'image' && <Image className="w-5 h-5 text-blue-600" />}
                        {post.type === 'video' && <Video className="w-5 h-5 text-blue-600" />}
                        {post.type === 'audio' && <Mic className="w-5 h-5 text-blue-600" />}
                        {post.type === 'text' && <FileText className="w-5 h-5 text-blue-600" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{post.title}</h4>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-sm text-gray-600 capitalize">{post.platform}</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                            {post.status === 'published' ? 'Đã đăng' : post.status === 'scheduled' ? 'Đã lên lịch' : 'Bản nháp'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center"><Eye className="w-4 h-4 mr-1" />{formatNumber(post.engagement.views)}</span>
                        <span className="flex items-center"><Heart className="w-4 h-4 mr-1" />{formatNumber(post.engagement.likes)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content Management Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  >
                    <option value="all">Tất cả nền tảng</option>
                    {platforms.map((platform) => (
                      <option key={platform.id} value={platform.id}>{platform.name}</option>
                    ))}
                  </select>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>Lọc</span>
                  </button>
                </div>
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm nội dung..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Content Types Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {contentTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div key={type.id} className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <Icon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <h4 className="font-medium text-gray-900">{type.name}</h4>
                    <p className="text-2xl font-bold text-purple-600">{type.count}</p>
                  </div>
                );
              })}
            </div>

            {/* Content List */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Danh sách nội dung</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {recentPosts.map((post) => (
                  <div key={post.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          {post.type === 'image' && <Image className="w-6 h-6 text-purple-600" />}
                          {post.type === 'video' && <Video className="w-6 h-6 text-purple-600" />}
                          {post.type === 'audio' && <Mic className="w-6 h-6 text-purple-600" />}
                          {post.type === 'text' && <FileText className="w-6 h-6 text-purple-600" />}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{post.title}</h4>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-600 capitalize">{post.platform}</span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                              {post.status === 'published' ? 'Đã đăng' : post.status === 'scheduled' ? 'Đã lên lịch' : 'Bản nháp'}
                            </span>
                            <span className="text-sm text-gray-500">{formatDate(post.publishedAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center"><Eye className="w-4 h-4 mr-1" />{formatNumber(post.engagement.views)}</span>
                          <span className="flex items-center"><Heart className="w-4 h-4 mr-1" />{formatNumber(post.engagement.likes)}</span>
                          <span className="flex items-center"><MessageCircle className="w-4 h-4 mr-1" />{formatNumber(post.engagement.comments)}</span>
                          <span className="flex items-center"><Share2 className="w-4 h-4 mr-1" />{formatNumber(post.engagement.shares)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tools Tab */}
        {activeTab === 'tools' && (
          <div className="space-y-6">
            {tools.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">{category.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((tool, toolIndex) => (
                    <div key={toolIndex} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{tool.name}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getToolStatusColor(tool.status)}`}>
                          {tool.status === 'active' ? 'Đang sử dụng' : tool.status === 'trial' ? 'Dùng thử' : 'Không hoạt động'}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Sử dụng gần nhất:</span>
                          <span className="text-gray-900">{tool.lastUsed}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Mức sử dụng:</span>
                          <span className="text-gray-900">{tool.usage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${tool.usage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Báo cáo hiệu suất</h3>
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Báo cáo phân tích chi tiết sẽ được hiển thị tại đây</p>
                <p className="text-sm text-gray-400 mt-2">Tích hợp với Google Analytics, Facebook Insights và các công cụ phân tích khác</p>
              </div>
            </div>
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Lịch đăng nội dung</h3>
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Lịch đăng nội dung sẽ được hiển thị tại đây</p>
                <p className="text-sm text-gray-400 mt-2">Quản lý lịch đăng trên tất cả nền tảng mạng xã hội</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaToolsDashboard;