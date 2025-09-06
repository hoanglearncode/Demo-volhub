import React, { useState, useEffect } from "react";
import {
  Link,
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import {
  Bell,
  BellOff,
  X,
  Menu,
  User,
  ChartColumn,
  Calendar,
  HeartHandshakeIcon,
  MessageSquare,
  BookText,
  ChartLine,
  Monitor,
  Database,
  CircleQuestionMark,
  User2,
  TriangleAlert,
  ChevronDown,
  History,
  Settings,
  Chromium,
} from "lucide-react";

import Dashboard from "../../page/admin/Dashboard.jsx";
import EventManagement from "../../page/admin/EventManagement.jsx";
import VolunteerManagement from "../../page/admin/VolunteerManagement.jsx";
import PartnerManagement from "../../page/admin/PartnerManagement.jsx";
import ConnectionQueue from "../../page/admin/ConnectionQueue.jsx";
import ContentModeration from "../../page/admin/ContentModeration.jsx";
import Reports from "../../page/admin/Reports.jsx";
import SystemMonitoring from "../../page/admin/SystemMonitoring.jsx";
import DataBackup from "../../page/admin/DataBackup.jsx";
import Support from "../../page/admin/Support.jsx";
import AdminProfile from "../../page/admin/AdminProfile.jsx";
import NotFoundPage from "../../page/common/NotFoundPage.jsx";

import { useAuth } from "../../context/AuthContext.jsx";
import ServicesPage from "../../page/admin/ServicesPage.jsx";

function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [notification, setNotification] = useState([]);
  const [pendingQueue, setPendingQueue] = useState({});

  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [navData, setNavData] = useState([]);

  // init navData once
  useEffect(() => {
    setNavData([
      { to: "/admin", title: "Dashboard", Icon: ChartColumn, badge: null },
      { to: "/admin/events", title: "Quản lý sự kiện", Icon: Calendar, badge: null },
      { to: "/admin/volunteers", title: "Quản lý tình nguyện viên", Icon: User, badge: null },
      { to: "/admin/partners", title: "Quản lý đối tác/BTC", Icon: HeartHandshakeIcon, badge: null },
      { to: "/admin/connections", title: "Kết nối & Tin nhắn", Icon: MessageSquare, badge: null },
      { to: "/admin/content", title: "Kiểm duyệt nội dung", Icon: BookText, badge: null },
      { to: "/admin/services", title: "Quản lý dịch vụ", Icon: Chromium, badge: null },
      { to: "/admin/report", title: "Báo cáo - Phân tích", Icon: ChartLine, badge: null },
      { to: "/admin/system", title: "Hệ thống - Giám sát", Icon: Monitor, badge: null },
      { to: "/admin/backup", title: "Backup & Export", Icon: Database, badge: null },
      { to: "/admin/support", title: "Hỗ trợ & Khiếu nại", Icon: CircleQuestionMark, badge: null },
      { to: "/admin/profile", title: "Hồ sơ & Setting", Icon: User2, badge: null },
    ]);
  }, []);

  // Simple auth guard; chuyển hướng nếu chưa login
  const RequireAuth = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 bg-slate-800 text-white z-50 shadow-lg">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>

            <Link to="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center font-bold text-sm">
                V
              </div>
              <span className="font-bold text-lg hidden sm:block">VolunteerHub</span>
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {/* Notification */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationMenuOpen(!notificationMenuOpen);
                  if (userMenuOpen) setUserMenuOpen(false);
                }}
                className="relative p-2 hover:bg-slate-700 rounded-lg transition-colors"
                aria-haspopup="true"
                aria-expanded={notificationMenuOpen}
              >
                <Bell size={18} />
                {notification.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notification.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              <div
                className={`absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-gray-200 transition-all origin-top-right ${
                  notificationMenuOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                }`}
              >
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
                          to={item.link || "#"}
                          key={idx}
                          className={`group flex flex-col gap-1 px-4 py-3 transition border-b last:border-0 ${
                            item.read ? "bg-white hover:bg-gray-50" : "bg-blue-50 hover:bg-blue-100"
                          }`}
                          onClick={() => {
                            // optionally mark read or navigate
                            setNotificationMenuOpen(false);
                          }}
                        >
                          <span className="font-medium text-gray-900 group-hover:text-blue-600">{item.title}</span>
                          <span className="text-sm text-gray-600">{item.body}</span>
                          <span className="text-xs text-gray-400">{item.time}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="pt-2 py-2 text-gray-700 text-center hover:text-blue-600">
                      <Link to={"/btc/notification-system"}>Xem tất cả</Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Alert / Error shortcut */}
            <button onClick={() => navigate("/admin/system?type=err")} className="relative p-2 hover:bg-slate-700 rounded-lg transition-colors" aria-label="Alerts">
              <TriangleAlert size={18} />
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
                aria-haspopup="true"
                aria-expanded={userMenuOpen}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user?.username?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
                <ChevronDown size={16} className="hidden sm:block" />
              </button>

              {/* User Dropdown */}
              <div
                className={`absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 transition-all origin-top-right ${
                  userMenuOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                }`}
              >
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="font-semibold text-gray-800">{user?.username || "User"}</p>
                  <p className="text-sm text-gray-500">{user?.role || "role"}</p>
                  <p className="text-xs text-green-600">{user?.status || "active"}</p>
                </div>

                <Link to="/admin/account" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50" onClick={() => setUserMenuOpen(false)}>
                  <User size={16} /> Cài đặt tài khoản
                </Link>

                <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50" onClick={() => setUserMenuOpen(false)}>
                  <Settings size={16} /> Cài đặt
                </Link>

                <Link to="/admin/post-box" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50" onClick={() => setUserMenuOpen(false)}>
                  <History size={16} /> Hộp thư
                </Link>

                <Link to="/admin/history" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50" onClick={() => setUserMenuOpen(false)}>
                  <History size={16} /> Lịch sử hoạt động
                </Link>

                <hr className="my-2" />

                <button
                  onClick={() => {
                    logout?.();
                    setUserMenuOpen(false);
                    navigate("/login");
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
        <aside className={`fixed left-0 top-14 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 z-40 ${isCollapsed ? "w-16" : "w-64"} overflow-hidden`}>
          <div className="flex flex-col h-full w-full">
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
                        isActive ? "bg-green-50 text-green-700 border-r-2 border-green-500" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {Icon && <Icon size={18} className={isActive ? "text-green-600" : "text-gray-500 group-hover:text-gray-700"} />}
                      </div>

                      <span className={`${isCollapsed ? "hidden" : "block"} text-sm font-medium truncate`}>{item.title}</span>

                      {item.badge ? (
                        <span className={`ml-auto ${isCollapsed ? "hidden" : "inline-flex"} items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700`}>
                          {item.badge}
                        </span>
                      ) : null}

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

            <div className="w-full hidden md:block text-center py-4 bg-gray-100 flex flex-col items-center space-y-1 font-semibold text-gray-600 text-xs">
              <span>Admin by Volunteer Hub</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${isCollapsed ? "ml-16" : "ml-64"}`}>
          <div className="p-6">
            {/* Router tree */}
            <Routes>
              {/* Wrap admin routes with RequireAuth */}
              <Route
                path="/admin"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route path="/admin/events" element={<RequireAuth><EventManagement /></RequireAuth>} />
              <Route path="/admin/volunteers" element={<RequireAuth><VolunteerManagement /></RequireAuth>} />
              <Route path="/admin/partners" element={<RequireAuth><PartnerManagement /></RequireAuth>} />
              <Route path="/admin/connections" element={<RequireAuth><ConnectionQueue /></RequireAuth>} />
              <Route path="/admin/content" element={<RequireAuth><ContentModeration /></RequireAuth>} />
              <Route path="/admin/report" element={<RequireAuth><Reports /></RequireAuth>} />
              <Route path="/admin/system" element={<RequireAuth><SystemMonitoring /></RequireAuth>} />
              <Route path="/admin/services" element={<RequireAuth><ServicesPage /></RequireAuth>} />
              <Route path="/admin/backup" element={<RequireAuth><DataBackup /></RequireAuth>} />
              <Route path="/admin/support" element={<RequireAuth><Support /></RequireAuth>} />
              <Route path="/admin/profile" element={<RequireAuth><AdminProfile /></RequireAuth>} />

              {/* supporting/account routes referenced in the header/menu */}
              <Route path="/admin/account" element={<RequireAuth><AdminProfile /></RequireAuth>} />
              <Route path="/admin/settings" element={<RequireAuth><AdminProfile /></RequireAuth>} />
              <Route path="/admin/post-box" element={<RequireAuth><ConnectionQueue /></RequireAuth>} />
              <Route path="/admin/history" element={<RequireAuth><Reports /></RequireAuth>} />

              {/* Fallback for anything else under admin */}
              <Route path="/admin/*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
