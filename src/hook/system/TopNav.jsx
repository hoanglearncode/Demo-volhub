import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // đảm bảo hook này tồn tại
import { Bell, ChevronDown, User } from "lucide-react";

export default function TopNav() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;

  const [activeIndex, setActiveIndex] = useState(-1);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const userMenuRef = useRef(null);
  const mobilePanelRef = useRef(null);
  const firstMobileLinkRef = useRef(null);

  // nav items per role
  const navData = {
    guest: [
      { to: "/", label: "Trang chủ" },
      { to: "/about", label: "Giới thiệu" },
      { to: "/events", label: "Sự kiện" },
      { to: "/volunteers", label: "Tình nguyện" },
      { to: "/contests", label: "Cuộc thi" },
      { to: "/contact", label: "Liên hệ" },
    ],
    user: [
      { to: "/", label: "Trang chủ" },
      { to: "/dashboard", label: "Bảng điều khiển" },
      { to: "/profile", label: "Hồ sơ" },
      { to: "/logout", label: "Đăng xuất", action: logout },
    ],
    btc: [
      { to: "/", label: "Trang chủ" },
      { to: "/btc-dashboard", label: "Bảng điều khiển BTC" },
      { to: "/manage-events", label: "Quản lý sự kiện" },
      { to: "/logout", label: "Đăng xuất", action: logout },
    ],
    admin: [
      { to: "/", label: "Trang chủ" },
      { to: "/admin-dashboard", label: "Bảng điều khiển Admin" },
      { to: "/user-management", label: "Quản lý người dùng" },
      { to: "/site-settings", label: "Cài đặt trang web" },
      { to: "/logout", label: "Đăng xuất", action: logout },
    ],
  };

  const role = user?.role ?? "guest";
  const navItems = navData[role] ?? navData["guest"];

  // detect active link by pathname
  useEffect(() => {
    const idx = navItems.findIndex((it) => {
      if (it.to === "/") return pathname === "/";
      return pathname.startsWith(it.to);
    });
    setActiveIndex(idx);
    // close menus on route change
    setUserMenuOpen(false);
    setMobileOpen(false);
  }, [pathname, role]); // re-evaluate when role changes (login)

  // scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // click outside for user menu
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [userMenuOpen]);

  // click outside for mobile panel
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
      // focus first link for accessibility
      setTimeout(() => firstMobileLinkRef.current?.focus(), 80);
      return () => {
        document.body.style.overflow = prev;
      };
    }
    return;
  }, [mobileOpen]);

  // helper: active class
  const itemClass = (idx) =>
    `relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
      idx === activeIndex ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:text-blue-600 hover:bg-blue-50/60"
    }`;

  return (
    <header
      className={`fixed px-6 py-2 md:px-20 top-0 left-0 right-0 z-40 transition-shadow bg-white/80 backdrop-blur-sm ${
        scrolled ? "shadow-md border-b border-gray-200" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Desktop nav */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="Volunteer"
                className="h-10 w-10 rounded-xl object-cover shadow-sm"
              />
              <div className="block">
                <div className="text-lg font-semibold text-slate-900">Volunteer</div>
                <div className="text-xs text-slate-500">Kết nối BTC & Tình nguyện viên</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item, idx) =>
                item.action ? (
                  // action item (logout)
                  <button
                    key={idx}
                    onClick={item.action}
                    className={itemClass(idx)}
                    type="button"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={idx}
                    to={item.to}
                    onClick={() => setActiveIndex(idx)}
                    className={itemClass(idx)}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-blue-600 transition-all duration-150 ${
                        idx === activeIndex ? "w-6" : "w-0"
                      }`}
                    ></span>
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-3">
            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/notifications"
                    aria-label="Thông báo"
                    className="relative p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition"
                  >
                    <Bell size={18} />
                    <span className="absolute -top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full" />
                  </Link>

                  {/* User dropdown */}
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen((s) => !s)}
                      aria-haspopup="true"
                      aria-expanded={userMenuOpen}
                      className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                        {user?.name?.charAt(0) ?? "U"}
                      </div>
                      <span className="text-sm font-medium text-slate-700">{user?.name ?? "Tài khoản"}</span>
                      <ChevronDown
                        size={16}
                        className={`text-slate-500 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <div
                      role="menu"
                      aria-hidden={!userMenuOpen}
                      className={`absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 transition-all origin-top-right ${
                        userMenuOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                      }`}
                    >
                      <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-blue-50">
                        <User size={16} /> Trang cá nhân
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={() => logout?.()}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 bg-white border border-gray-200 rounded-lg"
                  >
                    Đăng ký
                  </Link>
                  <Link
                    to="/login"
                    className="px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg"
                  >
                    Đăng nhập
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileOpen((s) => !s)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
                className="p-2 rounded-md text-slate-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
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
        className={`md:hidden fixed inset-x-0 top-16 z-50 transition-all duration-200 ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* overlay */}
        <div className={`fixed inset-0 bg-black/30 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setMobileOpen(false)} />

        <div
          ref={mobilePanelRef}
          className={`relative bg-white shadow-lg border-t border-gray-200 w-full transform transition-transform ${
            mobileOpen ? "translate-y-0" : "-translate-y-2"
          }`}
          style={{ marginTop: 0 }}
        >
          <div className="py-4 px-4 space-y-1">
            {navItems.map((item, idx) =>
              item.action ? (
                <button
                  key={idx}
                  onClick={() => {
                    item.action();
                    setMobileOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm text-slate-700 hover:bg-blue-50"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={idx}
                  to={item.to}
                  ref={idx === 0 ? firstMobileLinkRef : undefined}
                  onClick={() => {
                    setActiveIndex(idx);
                    setMobileOpen(false);
                  }}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                    idx === activeIndex ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:bg-blue-50"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}

            <div className="pt-3 border-t border-gray-100">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                      {user?.name?.charAt(0) ?? "U"}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{user?.name ?? "Tài khoản"}</div>
                      <div className="text-xs text-slate-500">Xem hồ sơ</div>
                    </div>
                  </Link>
                  <Link to="/notifications" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50">
                    <Bell size={18} /> Thông báo
                  </Link>
                  <button
                    onClick={() => {
                      logout?.();
                      setMobileOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg text-sm text-red-600 hover:bg-red-50"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <div className="space-y-4">
                  <Link to="/register" className="block w-full text-center px-4 py-3 rounded-lg border border-gray-200">
                    Đăng ký
                  </Link>
                  <Link to="/login" className="block w-full text-center px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
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
