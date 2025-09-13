import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  Bell, 
  ChevronDown, 
  User, 
  Home as HomeIcon,
  Calendar,
  Users,
  Trophy,
  Phone,
  Info,
  MessageSquare,
  Settings,
  Award,
  Activity,
  Star,
  Eye,
  Shield,
  LogOut
} from "lucide-react";

// Import các page components
import Home from "../../page/user/Home.jsx";
import AboutPage from "../../page/user/About.jsx";
import EventsPage from "../../page/user/EventsPage.jsx";
import Footer from "../../components/common/Footer.jsx";
import Volunteers from "../../page/user/Volunteers.jsx";
import Contact from "../../page/user/Contact.jsx";
import ContestPage from "../../page/user/Contests.jsx";
import NotFoundPage from "../../page/common/NotFoundPage.jsx";
import LoginPage from "../../page/common/LoginPage.jsx";
import EventDetail from "../../page/common/EvenDetail.jsx";
import OTPVerification from "../../page/common/VerifiyPage.jsx";
import RegisterPage from "../../page/common/Register.jsx";
import Dashboard from "../../page/user/Dashboard.jsx";
import Profile from "../../page/user/Profile.jsx";
import MyEvents from "../../page/user/MyEvents.jsx";
import ConnectInbox from "../../page/user/ConnectInbox.jsx";
import Community from "../../page/user/Community.jsx";
import PrivacySettings from "../../page/user/PrivacySettings.jsx";
import Notifications from "../../page/user/Notifications.jsx";

// TopNav Component
function TopNav() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;

  const [activeIndex, setActiveIndex] = useState(-1);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // Mock notification count

  const userMenuRef = useRef(null);
  const mobilePanelRef = useRef(null);
  const firstMobileLinkRef = useRef(null);

  // Navigation items cho khách vãng lai (guest users)
  const guestNavData = [
    { to: "/", label: "Trang chủ", icon: HomeIcon },
    { to: "/about", label: "Giới thiệu", icon: Info },
    { to: "/events", label: "Sự kiện", icon: Calendar },
    { to: "/volunteers", label: "Tình nguyện viên", icon: Users },
    { to: "/contests", label: "Cuộc thi", icon: Trophy },
    { to: "/contact", label: "Liên hệ", icon: Phone },
  ];

  // Navigation items cho user đã đăng nhập
  const authenticatedNavData = [
    { to: "/", label: "Trang chủ", icon: HomeIcon },
    { to: "/my-events", label: "Sự kiện của tôi", icon: Calendar },
    { to: "/community", label: "Cộng đồng", icon: Users },
    { to: "/contests", label: "Cuộc thi", icon: Trophy },
  ];

  const navItems = isAuthenticated ? authenticatedNavData : guestNavData;

  // User menu items cho người đã đăng nhập
  const userMenuItems = [
    { to: "/profile", label: "Hồ sơ cá nhân", icon: User },
    { to: "/dashboard", label: "Bảng điều khiển", icon: Activity },
    { to: "/my-events", label: "Sự kiện của tôi", icon: Calendar },
    { to: "/connect-inbox", label: "Hộp thư kết nối", icon: MessageSquare },
    { to: "/privacy-settings", label: "Cài đặt riêng tư", icon: Shield },
    { to: "/settings", label: "Cài đặt", icon: Settings },
  ];

  // detect active link by pathname
  useEffect(() => {
    const idx = navItems.findIndex((it) => {
      if (it.to === "/") return pathname === "/";
      return pathname.startsWith(it.to);
    });
    setActiveIndex(idx);
    setUserMenuOpen(false);
    setMobileOpen(false);
  }, [pathname, isAuthenticated]);

  // scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // click outside handlers
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [userMenuOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (mobilePanelRef.current && !mobilePanelRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [mobileOpen]);

  // close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setUserMenuOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // lock body scroll when mobile open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      setTimeout(() => firstMobileLinkRef.current?.focus(), 80);
      return () => {
        document.body.style.overflow = prev;
      };
    }
    return;
  }, [mobileOpen]);

  // Helper: active class
  const itemClass = (idx) =>
    `relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
      idx === activeIndex 
        ? "text-blue-600 bg-blue-50 shadow-sm" 
        : "text-slate-700 hover:text-blue-600 hover:bg-blue-50/60"
    }`;

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

  const userLevel = user?.level || "Bronze";
  const userStats = {
    totalHours: user?.totalHours || 0,
    eventsCount: user?.eventsCount || 0,
    reputation: user?.reputation || 0,
    badgeCount: user?.badgeCount || 0
  };

  return (
    <header
      className={`fixed px-6 py-3 md:px-8 lg:px-20 top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b ${
        scrolled ? "shadow-lg border-gray-200" : "border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Desktop nav */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src="/logo.svg"
                  alt="VHub"
                  className="h-12 w-12 rounded-xl object-cover shadow-md transition-transform group-hover:scale-105"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="block">
                <div className="font- text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  VHub
                </div>
                <div className="text-xs text-slate-500">
                  <i>Kết nối BTC & TNV</i>
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={idx}
                    to={item.to}
                    onClick={() => setActiveIndex(idx)}
                    className={itemClass(idx)}
                  >
                    <Icon size={16} />
                    {item.label}
                    {idx === activeIndex && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-200"></span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-4">
            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  {/* Quick Stats cho user đã đăng nhập */}
                  <div className="hidden xl:flex items-center gap-4 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <div className="flex items-center gap-1 text-sm">
                      <Award size={14} className="text-amber-500" />
                      <span className="font-medium text-slate-700">{userStats.totalHours}h</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star size={14} className="text-blue-500" />
                      <span className="font-medium text-slate-700">{userStats.reputation}</span>
                    </div>
                  </div>

                  {/* Notifications */}
                  <Link
                    to="/notifications"
                    className="relative p-3 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                  >
                    <Bell size={20} />
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                        {notificationCount > 9 ? '9+' : notificationCount}
                      </span>
                    )}
                  </Link>

                  {/* User dropdown */}
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen((s) => !s)}
                      aria-haspopup="true"
                      aria-expanded={userMenuOpen}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                    >
                      <div className={`relative w-10 h-10 rounded-full bg-gradient-to-br ${getUserLevelColor(userLevel)} flex items-center justify-center text-white shadow-lg`}>
                        {user?.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <span className="font-bold text-sm">{user?.name?.charAt(0) ?? "U"}</span>
                        )}
                        {user?.verified && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="hidden lg:block text-left">
                        <div className="text-sm font-semibold text-slate-800">{user?.name ?? "Người dùng"}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${getUserLevelColor(userLevel)}`}></span>
                          {userLevel}
                        </div>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-slate-500 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <div
                      role="menu"
                      aria-hidden={!userMenuOpen}
                      className={`absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 py-3 transition-all duration-200 origin-top-right ${
                        userMenuOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                      }`}
                    >
                      {/* User info header */}
                      <div className="px-4 pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getUserLevelColor(userLevel)} flex items-center justify-center text-white`}>
                            {user?.avatar ? (
                              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              <span className="font-bold">{user?.name?.charAt(0) ?? "U"}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-slate-800">{user?.name ?? "Người dùng"}</div>
                            <div className="text-xs text-slate-500">{user?.email}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`px-2 py-0.5 text-xs rounded-full bg-gradient-to-r ${getUserLevelColor(userLevel)} text-white`}>
                                {userLevel}
                              </span>
                              {user?.verified && (
                                <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600">Đã xác minh</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Quick stats in dropdown */}
                        <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-gray-100">
                          <div className="text-center">
                            <div className="text-lg font-bold text-slate-800">{userStats.totalHours}</div>
                            <div className="text-xs text-slate-500">Giờ</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-slate-800">{userStats.eventsCount}</div>
                            <div className="text-xs text-slate-500">Sự kiện</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-slate-800">{userStats.reputation}</div>
                            <div className="text-xs text-slate-500">Uy tín</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-slate-800">{userStats.badgeCount}</div>
                            <div className="text-xs text-slate-500">Huy hiệu</div>
                          </div>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="py-2">
                        {userMenuItems.map((item, idx) => {
                          const Icon = item.icon;
                          return (
                            <Link 
                              key={idx}
                              to={item.to} 
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                              <Icon size={16} />
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
                      
                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={() => logout?.()}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full transition-colors"
                        >
                          <LogOut size={16} />
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Guest user actions */}
                  <div className="flex items-center gap-3">
                    <Link
                      to="/register"
                      className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-600 bg-white hover:bg-blue-50 border border-gray-300 rounded-xl transition-all duration-200"
                    >
                      Đăng ký
                    </Link>
                    <Link
                      to="/login"
                      className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Đăng nhập
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileOpen((s) => !s)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
                className="p-2.5 rounded-xl text-slate-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                    d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        className={`lg:hidden fixed inset-0 top-20 z-50 transition-all duration-300 ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Overlay */}
        <div 
          className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`} 
          onClick={() => setMobileOpen(false)} 
        />

        <div
          ref={mobilePanelRef}
          className={`relative bg-white shadow-2xl border-t border-gray-200 w-full max-h-screen overflow-y-auto transform transition-transform ${
            mobileOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="py-6 px-4">
            {/* User info for authenticated mobile users */}
            {isAuthenticated && (
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getUserLevelColor(userLevel)} flex items-center justify-center text-white`}>
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="font-bold">{user?.name?.charAt(0) ?? "U"}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-800">{user?.name ?? "Người dùng"}</div>
                    <div className="text-sm text-slate-600 flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${getUserLevelColor(userLevel)}`}></span>
                      {userLevel}
                    </div>
                  </div>
                </div>
                
                {/* Mobile quick stats */}
                <div className="grid grid-cols-4 gap-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-slate-800">{userStats.totalHours}</div>
                    <div className="text-xs text-slate-500">Giờ</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-slate-800">{userStats.eventsCount}</div>
                    <div className="text-xs text-slate-500">Sự kiện</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-slate-800">{userStats.reputation}</div>
                    <div className="text-xs text-slate-500">Uy tín</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-slate-800">{userStats.badgeCount}</div>
                    <div className="text-xs text-slate-500">Huy hiệu</div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation items */}
            <div className="space-y-2 mb-6">
              {navItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={idx}
                    to={item.to}
                    ref={idx === 0 ? firstMobileLinkRef : undefined}
                    onClick={() => {
                      setActiveIndex(idx);
                      setMobileOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${
                      idx === activeIndex 
                        ? "text-blue-600 bg-blue-50" 
                        : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    <Icon size={20} />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Additional menu items for authenticated users */}
            {isAuthenticated && (
              <div className="border-t border-gray-200 pt-6 mb-6">
                <div className="space-y-2">
                  {userMenuItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <Link 
                        key={idx}
                        to={item.to} 
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <Icon size={20} />
                        {item.label}
                      </Link>
                    );
                  })}
                  
                  <Link 
                    to="/notifications" 
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors relative"
                  >
                    <Bell size={20} />
                    Thông báo
                    {notificationCount > 0 && (
                      <span className="ml-auto min-w-[20px] h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                        {notificationCount > 9 ? '9+' : notificationCount}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            )}

            {/* Auth actions */}
            <div className="border-t border-gray-200 pt-6">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout?.();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-colors"
                >
                  <LogOut size={20} />
                  Đăng xuất
                </button>
              ) : (
                <div className="space-y-3">
                  <Link 
                    to="/register" 
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center px-4 py-3.5 rounded-xl border border-gray-300 text-slate-600 font-medium hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                  >
                    Đăng ký tài khoản
                  </Link>
                  <Link 
                    to="/login" 
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center px-4 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-lg hover:shadow-xl transition-all"
                  >
                    Đăng nhập
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Main UserLayout Component
function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopNav />
      <main className="pt-24 flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/contests" element={<ContestPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events/:id" element={<EventDetail />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify" element={<OTPVerification />} />
          
          {/* Protected routes - User dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/connect-inbox" element={<ConnectInbox />} />
          <Route path="/community" element={<Community />} />
          <Route path="/privacy-settings" element={<PrivacySettings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<PrivacySettings />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default UserLayout;