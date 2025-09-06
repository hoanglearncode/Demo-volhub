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
  Mail
} from "lucide-react";
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
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
import RecruitmentDashboard  from "../../page/oganations/RecruitmentDashboard.jsx"
import SystemNotificationPage from "../../page/oganations/NotificationSystem.jsx";
import Profile from "../../page/common/ProfilePage.jsx";
import RecruiterSupportPage from "../../page/oganations/RecruiterSupportPage.jsx";
import MediaToolsDashboard from "../../page/oganations/MediaToolsDashboard.jsx";
import MyCartsPage from "../../page/oganations/MyCartPage.jsx";
import OrgProfileManagement from "../../page/oganations/Profile.jsx";
import RecruitmentReport from "../../page/oganations/RecruitmentReport.jsx";

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
      { to: "/btc", title: "Bảng tin", Icon: Boxes, badge: null },
      { to: "/btc/recruitment", title: "Sự kiện của tôi", Icon: BriefcaseBusiness, badge: null },
      { to: "/btc/cv-manage", title: "Ứng viên của tôi", Icon: User, badge: null },
      { to: "/btc/recruitment-report", title: "Báo cáo tuyển dụng", Icon: ChartNoAxesCombined, badge: null },
      { to: "/btc/profile", title: "Hồ sơ tổ chức", Icon: Building, badge: null },
      { to: "/btc/media", title: "Công cụ truyền thông", Icon: Megaphone, badge: 3 },
      { to: "/btc/support", title: "Hỗ trợ", Icon: Headphones, badge: 5 },
    ]);
    
    if (data.length > 0) {
      setNotification(data);
    }
  }, []);

  const getCurrentPageTitle = () => {
    const currentNav = navData.find(nav => nav.to === location.pathname);
    return currentNav ? currentNav.title : "Bảng tin";
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
                placeholder="Tìm kiếm..."
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
            <button onClick={()=> navigate('/btc/my-cart')} className="relative p-2 hover:bg-slate-700 rounded-lg transition-colors">
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
                  <p className="text-xs text-green-600">{user?.status}</p>
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
                  <Settings size={16} /> Cài đặt
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
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4">
              <div className="space-y-1 px-2">
                {navData.map((item) => {
                  const Icon = item.Icon;
                  const isActive = location.pathname === item.to;
                  
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
                      
                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                          {item.title}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>

            </nav>

            {/* Bottom Actions */}
            <div className="border-t border-gray-200 p-2">
              <Link to={'/btc/recruitment-post'} className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg transition-colors">
                <Plus size={18} />
                <span className={`${isCollapsed ? 'hidden' : 'block'} font-medium`}>Đăng tin mới</span>
              </Link>
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
                  Quản lý và theo dõi hoạt động tuyển dụng của bạn
                </p>
              </div>
            </div>
          </div>

          {/* Page Content - Scrollable */}
          <div className="p-6">
            <Routes>
              <Route path="/btc" element={<Dashboard isCollapsed={isCollapsed} />} />

              <Route path="/btc/recruitment" element={<RecruitmentPage />} /> 
              <Route path="/btc/recruitment-post" element={<RecruitmentPostPage />} /> {/* bao gồm sửa - cập nhật */}
              <Route path="/btc/recruitment/report/:id" element ={<RecruitmentReport />} /> {/*lấy id từ pram */}

              <Route path="/btc/cv-manage" element = {<CVManages />} />
              <Route path="/btc/cv-manage/view-profile/:id" element = {<Profile />}/>
              <Route path="/btc/cv-manage/contact/:id" element = {<Profile />}/>

              <Route path="/btc/history" element = {<HistoryPage />} />
              <Route path="/btc/services" element = {<ServicePurchasePage />} />
              <Route path="/btc/recruitment-report" element = {<RecruitmentDashboard  />} />

              <Route path="/btc/notification-system" element = {<SystemNotificationPage />} />
              <Route path="/btc/notification-system/detail/:id" element = {<SystemNotificationPage />} />

              <Route path="/btc/support" element={<RecruiterSupportPage />} />

              <Route path="/btc/media" element={<MediaToolsDashboard />} />
              
              <Route path="/btc/profile" element ={<OrgProfileManagement />} />
              <Route path="/btc/services" element ={<ServicePurchasePage />} />
              <Route path="/btc/account" element={<Account />} />
              <Route path="/btc/verify" element={<VerifyPage />} />
              <Route path="/btc/my-cart" element = {<MyCartsPage />} />
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