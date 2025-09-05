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
  TriangleAlert
} from "lucide-react";
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";

// Import components theo kiến trúc IA của Admin VHub
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
import AdminNav from "../../hook/system/AdminNav.jsx";
import NotFoundPage from "../../page/common/NotFoundPage.jsx";

import { useAuth } from "../../context/AuthContext.jsx";


function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [notification, setNotification] = useState([]);
  const [pendingQueue, setPendingQueue] = useState({})

  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
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
            <button onClick={()=> navigate('/admin/error')} className="relative p-2 hover:bg-slate-700 rounded-lg transition-colors">
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
      {/* Main Content Area */}
      <div className="flex flex-1">
        <AdminNav setIsCollapsed={setIsCollapsed} isCollapsed={isCollapsed} pendingQueue={pendingQueue} />
      </div>
    </div>
  );
}

export default AdminLayout;