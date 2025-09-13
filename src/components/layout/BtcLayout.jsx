import { 
  Bell, 
  BellOff, 
  X, 
  Menu, 
  User, 
  Boxes, 
  Building, 
  History, 
  WandSparkles, 
  ShoppingCart, 
  ChartNoAxesCombined, 
  Megaphone, 
  BriefcaseBusiness, 
  ThumbsUp, 
  Headphones,
  ChevronDown,
  Search,
  Plus,
  Home,
  Settings,
  Mail,
  Users,
  Calendar,
  BarChart3,
  UserCheck,
  ClipboardList,
  Star,
  MessageCircle,
  Camera,
  FileText,
  HelpCircle,
  Shield,
  Badge
} from "lucide-react";
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

// Import existing pages
import Dashboard from "../../page/oganations/Dashboard.jsx";
import RecruitmentPage from '../../page/oganations/RecruitmentPage.jsx';
import { useAuth } from "../../context/AuthContext.jsx";
import Notification from "../../hook/oganations/Notification.jsx";
import Account from "../../page/oganations/Account.jsx";
import VerifyPage from "../../page/oganations/Verify.jsx";
import PostBoxPage from "../../page/oganations/PostPage.jsx";
import RecruitmentPostPage from "../../page/oganations/RecruitmentPagePost.jsx";
import CVManages from "../../page/oganations/CVManages.jsx";
import HistoryPage from "../../page/oganations/HistoryPage.jsx";
import ServicePurchasePage from "../../page/oganations/PayServicesPage.jsx";
import RecruitmentDashboard from "../../page/oganations/RecruitmentDashboard.jsx"
import SystemNotificationPage from "../../page/oganations/NotificationSystem.jsx";
import Profile from "../../page/common/ProfilePage.jsx";
import RecruiterSupportPage from "../../page/oganations/RecruiterSupportPage.jsx";
import MediaToolsDashboard from "../../page/oganations/MediaToolsDashboard.jsx";
import MyCartsPage from "../../page/oganations/MyCartPage.jsx";
import OrgProfileManagement from "../../page/oganations/Profile.jsx";
import RecruitmentReport from "../../page/oganations/RecruitmentReport.jsx";

// Import new pages that need to be created
import EventDetailPage from "../../page/oganations/EventDetailPage.jsx"; // Chi tiết sự kiện
import VolunteerManagementPage from "../../page/oganations/VolunteerManagementPage.jsx"; // Quản lý TNV tổng hợp
import VolunteerDetailPage from "../../page/oganations/VolunteerDetailPage.jsx"; // Chi tiết hồ sơ TNV
import VolunteerAssignmentPage from "../../page/oganations/VolunteerAssignmentPage.jsx"; // Phân công TNV
import EventAnalyticsPage from "../../page/oganations/EventAnalyticsPage.jsx"; // Phân tích theo sự kiện
import OrgAnalyticsPage from "../../page/oganations/OrgAnalyticsPage.jsx"; // Phân tích tổ chức
import PromotionToolsPage from "../../page/oganations/PromotionToolsPage.jsx"; // Công cụ quảng bá
import EventRecapPage from "../../page/oganations/EventRecapPage.jsx"; // Album recap sự kiện
import BlogManagementPage from "../../page/oganations/BlogManagementPage.jsx"; // Quản lý blog
import FeedbackManagementPage from "../../page/oganations/FeedbackManagementPage.jsx"; // Quản lý feedback
import ChatSystemPage from "../../page/oganations/ChatSystemPage.jsx"; // Hệ thống chat
import EventCalendarPage from "../../page/oganations/EventCalendarPage.jsx"; // Lịch sự kiện
import SettingsPage from "../../page/oganations/SettingsPage.jsx"; // Cài đặt tổ chức
import VolunteerRecommendationPage from "../../page/oganations/VolunteerRecommendationPage.jsx"; // Gợi ý TNV

function BtcLayout() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [notification, setNotification] = useState([]);
  const [navData, setNavData] = useState([]);

  useEffect(() => {
    const data = Notification.getNotification();
    setNavData([
      { 
        to: "/btc", 
        title: "Bảng tin tổng quan", 
        Icon: Home, 
        badge: null 
      },
      { 
        to: "/btc/events", 
        title: "Sự kiện của tôi", 
        Icon: Calendar, 
        badge: null,
        submenu: [
          { to: "/btc/events", title: "Danh sách sự kiện", Icon: ClipboardList },
          { to: "/btc/events/calendar", title: "Lịch sự kiện", Icon: Calendar },
          { to: "/btc/recruitment-post", title: "Tạo sự kiện mới", Icon: Plus }
        ]
      },
      { 
        to: "/btc/volunteers", 
        title: "Ứng viên của tôi", 
        Icon: Users, 
        badge: null,
        submenu: [
          { to: "/btc/volunteers", title: "Tất cả ứng viên", Icon: Users },
          { to: "/btc/volunteers/recommendations", title: "Gợi ý ứng viên", Icon: UserCheck },
          { to: "/btc/cv-manage", title: "Quản lý hồ sơ", Icon: User }
        ]
      },
      { 
        to: "/btc/analytics", 
        title: "Báo cáo & Thống kê", 
        Icon: BarChart3, 
        badge: null,
        submenu: [
          { to: "/btc/analytics", title: "Tổng quan", Icon: ChartNoAxesCombined },
          { to: "/btc/recruitment-report", title: "Báo cáo tuyển dụng", Icon: FileText },
          { to: "/btc/analytics/events", title: "Phân tích sự kiện", Icon: BarChart3 }
        ]
      },
      { 
        to: "/btc/profile", 
        title: "Hồ sơ tổ chức", 
        Icon: Building, 
        badge: null,
        submenu: [
          { to: "/btc/profile", title: "Thông tin cơ bản", Icon: Building },
          { to: "/btc/profile/verification", title: "Xác minh tổ chức", Icon: Shield },
          { to: "/btc/feedback", title: "Feedback & Đánh giá", Icon: Star }
        ]
      },
      { 
        to: "/btc/promotion", 
        title: "Công cụ truyền thông", 
        Icon: Megaphone, 
        badge: 2,
        submenu: [
          { to: "/btc/promotion", title: "Quảng bá sự kiện", Icon: Megaphone },
          { to: "/btc/promotion/recap", title: "Album Recap", Icon: Camera },
          { to: "/btc/blog", title: "Quản lý Blog", Icon: FileText }
        ]
      },
      { 
        to: "/btc/support", 
        title: "Hỗ trợ", 
        Icon: Headphones, 
        badge: 5,
        submenu: [
          { to: "/btc/support", title: "Trung tâm hỗ trợ", Icon: HelpCircle },
          { to: "/btc/chat", title: "Chat với TNV", Icon: MessageCircle }
        ]
      },
    ]);
    
    if (data.length > 0) {
      setNotification(data);
    }
  }, []);

  const getCurrentPageTitle = () => {
    // Check for exact matches first
    const exactMatch = navData.find(nav => nav.to === location.pathname);
    if (exactMatch) return exactMatch.title;

    // Check submenu items
    for (const nav of navData) {
      if (nav.submenu) {
        const submenuMatch = nav.submenu.find(sub => sub.to === location.pathname);
        if (submenuMatch) return submenuMatch.title;
      }
    }

    // Check for dynamic routes
    if (location.pathname.includes('/events/detail/')) return "Chi tiết sự kiện";
    if (location.pathname.includes('/events/edit/')) return "Chỉnh sửa sự kiện";
    if (location.pathname.includes('/events/clone/')) return "Nhân bản sự kiện";
    if (location.pathname.includes('/volunteers/detail/')) return "Chi tiết ứng viên";
    if (location.pathname.includes('/volunteers/assignment/')) return "Phân công ứng viên";
    if (location.pathname.includes('/analytics/event/')) return "Phân tích sự kiện";
    if (location.pathname.includes('/cv-manage/view-profile/')) return "Hồ sơ ứng viên";
    if (location.pathname.includes('/recruitment/report/')) return "Báo cáo tuyển dụng";
    
    return "Bảng tin tổng quan";
  };

  const getPageDescription = () => {
    const path = location.pathname;
    
    if (path === '/btc' || path === '/btc/') return "Theo dõi hoạt động và hiệu suất tổ chức của bạn";
    if (path.includes('/events')) return "Quản lý các sự kiện tình nguyện và hoạt động";
    if (path.includes('/volunteers')) return "Quản lý ứng viên và tình nguyện viên";
    if (path.includes('/analytics')) return "Phân tích dữ liệu và báo cáo hiệu suất";
    if (path.includes('/profile')) return "Quản lý thông tin và uy tín tổ chức";
    if (path.includes('/promotion')) return "Công cụ quảng bá và truyền thông";
    if (path.includes('/support')) return "Hỗ trợ và liên hệ với hệ thống";
    
    return "Quản lý và theo dõi hoạt động tình nguyện";
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 bg-slate-800 text-white z-50 shadow-lg">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
            
            <Link to="/btc" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center font-bold text-sm">
                V
              </div>
              <span className="font-bold text-lg hidden sm:block">VolunteerHub</span>
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {/* Search - Hidden on mobile */}
            <div className="hidden md:flex items-center bg-slate-700 rounded-lg px-3 py-2 min-w-[200px]">
              <Search size={16} className="text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="Tìm kiếm sự kiện, TNV..."
                className="bg-transparent text-white placeholder-slate-400 text-sm outline-none flex-1"
              />
            </div>

            {/* Notification */}
            <div className="relative">
              <button 
                onClick={() => {
                  setNotificationMenuOpen(!notificationMenuOpen);
                  if (userMenuOpen) setUserMenuOpen(false);
                }}
                className="relative p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Bell size={18} />
                {notification.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notification.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              <div className={`absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-gray-200 transition-all origin-top-right ${
                notificationMenuOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
              }`}>
                {notification.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                    <BellOff size={40} className="mb-3 text-gray-400" />
                    <p className="text-sm">Bạn không có thông báo nào mới</p>
                  </div>
                ) : (
                  <div className="flex flex-col max-h-96">
                    <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                      <p className="font-semibold text-lg text-gray-800">Thông báo</p>
                      <button 
                        onClick={() => setNotificationMenuOpen(false)} 
                        className="w-8 h-8 bg-gray-100 hover:bg-red-500 hover:text-white transition rounded-full flex items-center justify-center"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="overflow-y-auto max-h-80">
                      {notification.map((item, idx) => (
                        <Link
                          to={item.link}
                          key={idx}
                          className={`group flex flex-col gap-1 px-4 py-3 transition border-b last:border-0 ${
                            item.read ? "bg-white hover:bg-gray-50" : "bg-blue-50 hover:bg-blue-100"
                          }`}
                        >
                          <span className="font-medium text-gray-900 group-hover:text-blue-600">
                            {item.title}
                          </span>
                          <span className="text-sm text-gray-600">{item.body}</span>
                          <span className="text-xs text-gray-400">{item.time}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="pt-2 py-2 text-gray-700 text-center hover:text-blue-600">
                      <Link to={'/btc/notification-system'}>Xem tất cả</Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Cart */}
            <button onClick={() => navigate('/btc/my-cart')} className="relative p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <ShoppingCart size={18} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  if (notificationMenuOpen) setNotificationMenuOpen(false);
                }}
                className="flex items-center gap-2 hover:bg-slate-700 rounded-lg p-1 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <ChevronDown size={16} className="hidden sm:block" />
              </button>

              {/* User Dropdown */}
              <div className={`absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 transition-all origin-top-right ${
                userMenuOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
              }`}>
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="font-semibold text-gray-800">{user?.username}</p>
                  <p className="text-sm text-gray-500">{user?.role}</p>
                  <div className="flex items-center gap-1">
                    {user?.verified && <Badge size={12} className="text-green-600" />}
                    <p className="text-xs text-green-600">{user?.status}</p>
                  </div>
                </div>
                <Link 
                  to="/btc/account" 
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <User size={16} /> Cài đặt tài khoản
                </Link>
                <Link 
                  to="/btc/settings" 
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <Settings size={16} /> Cài đặt tổ chức
                </Link>
                <Link 
                  to="/btc/post-box" 
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <Mail size={16} /> Hộp thư
                </Link>
                <Link 
                  to="/btc/history" 
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <History size={16} /> Lịch sử hoạt động
                </Link>
                <hr className="my-2" />
                <button
                  onClick={() => {
                    logout?.();
                    setUserMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-14">
        {/* Sidebar */}
        <aside className={`fixed left-0 top-14 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
          isCollapsed ? 'w-16' : 'w-64'
        } overflow-hidden`}>
          <div className="flex flex-col h-full w-full">
            {/* User Profile Section */}
            <div className={`p-4 border-b border-gray-200 ${isCollapsed ? 'px-2' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold">
                    {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className={`${isCollapsed ? 'hidden' : 'flex flex-col'} min-w-0 flex-1`}>
                  <span className="font-semibold text-sm text-gray-800 truncate">{user?.username}</span>
                  <span className="text-xs text-gray-500 truncate">{user?.role}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-green-600">{user?.status}</span>
                    {user?.verified && <Badge size={12} className="text-green-600" />}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4">
              <div className="space-y-1 px-2">
                {navData.map((item) => {
                  const Icon = item.Icon;
                  const isActive = location.pathname === item.to || 
                    (item.submenu && item.submenu.some(sub => location.pathname === sub.to)) ||
                    (item.to !== '/btc' && location.pathname.startsWith(item.to));
                  
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative ${
                        isActive 
                          ? 'bg-green-50 text-green-700 border-r-2 border-green-500' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {Icon && (
                          <Icon 
                            size={18} 
                            className={isActive ? 'text-green-600' : 'text-gray-500 group-hover:text-gray-700'} 
                          />
                        )}
                      </div>
                      <span className={`${isCollapsed ? 'hidden' : 'block'} text-sm font-medium truncate`}>
                        {item.title}
                      </span>
                      
                      {/* Badge */}
                      {item.badge && item.badge > 0 && (
                        <span className={`${isCollapsed ? 'hidden' : 'inline-flex'} items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full ml-auto`}>
                          {item.badge}
                        </span>
                      )}
                      
                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                          {item.title}
                          {item.badge && item.badge > 0 && (
                            <span className="ml-2 px-1.5 py-0.5 text-xs bg-red-500 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Bottom Actions */}
            <div className="border-t border-gray-200 p-2 space-y-2">
              <Link 
                to={'/btc/recruitment-post'} 
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg transition-colors"
              >
                <Plus size={18} />
                <span className={`${isCollapsed ? 'hidden' : 'block'} font-medium`}>Tạo sự kiện mới</span>
              </Link>
              
              {!isCollapsed && (
                <div className="text-center">
                  <p className="text-xs text-gray-500">Phiên bản: v2.1.0</p>
                  <p className="text-xs text-gray-400">© 2024 VolunteerHub</p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
          {/* Page Header - Fixed */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-30">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{getCurrentPageTitle()}</h1>
                <p className="text-sm text-gray-600 mt-1">
                  {getPageDescription()}
                </p>
              </div>
              
              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                {location.pathname === '/btc' && (
                  <>
                    <button className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                      Xuất báo cáo
                    </button>
                    <Link to="/btc/recruitment-post" className="px-3 py-1.5 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                      Tạo sự kiện
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Page Content - Scrollable */}
          <div className="p-6">
            <Routes>
              {/* Dashboard */}
              <Route path="/btc" element={<Dashboard isCollapsed={isCollapsed} />} />

              {/* Event Management Routes */}
              <Route path="/btc/events" element={<RecruitmentPage />} />
              <Route path="/btc/events/calendar" element={<EventCalendarPage />} />
              <Route path="/btc/events/detail/:id" element={<EventDetailPage />} />
              <Route path="/btc/events/edit/:id" element={<RecruitmentPostPage />} />
              <Route path="/btc/events/clone/:id" element={<RecruitmentPostPage />} />
              <Route path="/btc/events/recruitment-post" element={<RecruitmentPostPage />} />

              {/* Volunteer Management Routes */}
              <Route path="/btc/volunteers" element={<VolunteerManagementPage />} />
              <Route path="/btc/volunteers/recommendations" element={<VolunteerRecommendationPage />} />
              <Route path="/btc/volunteers/detail/:id" element={<VolunteerDetailPage />} />
              <Route path="/btc/volunteers/assignment/:eventId" element={<VolunteerAssignmentPage />} />
              <Route path="/btc/cv-manage" element={<CVManages />} />
              <Route path="/btc/cv-manage/view-profile/:id" element={<Profile />} />
              <Route path="/btc/cv-manage/contact/:id" element={<Profile />} />

              {/* Analytics & Reports Routes */}
              <Route path="/btc/analytics" element={<OrgAnalyticsPage />} />
              <Route path="/btc/analytics/events" element={<EventAnalyticsPage />} />
              <Route path="/btc/recruitment-report" element={<RecruitmentDashboard />} />
              <Route path="/btc/recruitment/report/:id" element={<RecruitmentReport />} />

              {/* Organization Profile Routes */}
              <Route path="/btc/profile" element={<OrgProfileManagement />} />
              <Route path="/btc/profile/verification" element={<VerifyPage />} />
              <Route path="/btc/feedback" element={<FeedbackManagementPage />} />

              {/* Promotion & Media Routes */}
              <Route path="/btc/promotion" element={<PromotionToolsPage />} />
              <Route path="/btc/promotion/recap" element={<EventRecapPage />} />
              <Route path="/btc/blog" element={<BlogManagementPage />} />
              <Route path="/btc/media" element={<MediaToolsDashboard />} />

              {/* Support & Communication Routes */}
              <Route path="/btc/support" element={<RecruiterSupportPage />} />
              <Route path="/btc/chat" element={<ChatSystemPage />} />

              {/* System Routes */}
              <Route path="/btc/notification-system" element={<SystemNotificationPage />} />
              <Route path="/btc/notification-system/detail/:id" element={<SystemNotificationPage />} />
              
              {/* Account & Settings Routes */}
              <Route path="/btc/account" element={<Account />} />
              <Route path="/btc/settings" element={<SettingsPage />} />
              <Route path="/btc/verify" element={<VerifyPage />} />
              
              {/* Additional Routes */}
              <Route path="/btc/history" element={<HistoryPage />} />
              <Route path="/btc/services" element={<ServicePurchasePage />} />
              <Route path="/btc/my-cart" element={<MyCartsPage />} />
              <Route path="/btc/post-box" element={<PostBoxPage />} />
            </Routes>
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </div>
  );
}

export default BtcLayout;