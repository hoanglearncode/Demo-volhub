import React, { useState, useEffect, version } from "react";
import axios from 'axios';
import env from 'dotenv'
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
  Package,
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
  Search,
  Users,
  Shield,
  AlertCircle,
  FileText,
  UserCheck,
  Clock,
  Star,
  TrendingUp,
  Activity,
  Zap,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Filter,
  RefreshCw,
  Plus,
  MoreHorizontal,
  Flag,
  MessageCircle,
  Globe,
  Lock,
  Unlock,
  UserX,
  Building,
  CreditCard,
  BarChart3,
  PieChart,
  TrendingDown,
  AlertTriangle,
  CheckSquare,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Tag,
  Badge,
  Award,
  Camera,
  Video,
  Image,
  Link2,
  Share2,
  ThumbsUp,
  ThumbsDown,
  MessageSquareMore,
  Factory
} from "lucide-react";

// Auth 
import RequireAuth from "../../hook/system/RequireAuth.jsx";

// Import existing pages
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
import ServicesPage from "../../page/admin/ServicesPage.jsx";

// Import new pages that need to be created
import EventDetailPage from "../../page/admin/EventDetailPage.jsx"; // Chi tiết sự kiện
import EventCreatePage from '../../page/admin/EventCreatePage.jsx'
import EventApprovalQueue from "../../page/admin/EventApprovalQueue.jsx"; // Hàng đợi duyệt sự kiện
import EventQualityControl from "../../page/admin/EventQualityControl.jsx"; // Kiểm soát chất lượng sự kiện
import EventAnalytics from "../../page/admin/EventAnalytics.jsx"; // Phân tích sự kiện

import VolunteerVerification from "../../page/admin/VolunteerVerification.jsx"; // Xác minh TNV
import VolunteerViolationManagement from "../../page/admin/VolunteerViolationManagement.jsx"; // Quản lý vi phạm TNV
import VolunteerDetailPage from "../../page/admin/VolunteerDetailPage.jsx"; // Chi tiết hồ sơ TNV
import VolunteerCertificationSystem from "../../page/admin/VolunteerCertificationSystem.jsx"; // Hệ thống chứng nhận

import PartnerVerification from "../../page/admin/PartnerVerification.jsx"; // Xác minh đối tác
import PartnerTierManagement from "../../page/admin/PartnerTierManagement.jsx"; // Quản lý tier đối tác
import PartnerAnalytics from "../../page/admin/PartnerAnalytics.jsx"; // Phân tích đối tác

import ConnectionApprovalQueue from "../../page/admin/ConnectionApprovalQueue.jsx"; // Hàng đợi duyệt kết nối
import ProxyChatSystem from "../../page/admin/ProxyChatSystem.jsx"; // Hệ thống chat proxy
import AbuseReportManagement from "../../page/admin/AbuseReportManagement.jsx"; // Quản lý báo cáo lạm dụng

import ContentQueue from "../../page/admin/ContentQueue.jsx"; // Hàng đợi kiểm duyệt nội dung
import ContentSpotlight from "../../page/admin/ContentSpotlight.jsx"; // Spotlight nội dung
import CommunityFeedManagement from "../../page/admin/CommunityFeedManagement.jsx"; // Quản lý feed cộng đồng

import PlatformAnalytics from "../../page/admin/PlatformAnalytics.jsx"; // Phân tích nền tảng
import ComparisonReports from "../../page/admin/ComparisonReports.jsx"; // Báo cáo so sánh
import ConnectionFunnelAnalytics from "../../page/admin/ConnectionFunnelAnalytics.jsx"; // Phân tích phễu kết nối

import SystemAlerts from "../../page/admin/SystemAlerts.jsx"; // Cảnh báo hệ thống
import AuditLog from "../../page/admin/AuditLog.jsx"; // Nhật ký hoạt động
import RoleManagement from "../../page/admin/RoleManagement.jsx"; // Phân quyền
import IntegrationManagement from "../../page/admin/IntegrationManagement.jsx"; // Tích hợp hệ thống

import DataExport from "../../page/admin/DataExport.jsx"; // Xuất dữ liệu

import TicketManagement from "../../page/admin/TicketManagement.jsx"; // Quản lý ticket
import ComplaintResolution from "../../page/admin/ComplaintResolution.jsx"; // Xử lý khiếu nại

import AdminSettings from "../../page/admin/AdminSettings.jsx"; // Cài đặt admin
import NotificationManagement from "../../page/admin/NotificationManagement.jsx"; // Quản lý thông báo

import QueuePage from "../../page/admin/QueuePage.jsx"; // quản lý các hàng đợi thông tin

import { useAuth } from "../../context/AuthContext.jsx";

function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [notification, setNotification] = useState([]);
  const [pendingQueue, setPendingQueue] = useState({});
  const [statusSystem, setStatusSystem] = useState(true);
  const [version, setVersion] = useState('1.1.0')
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [navData, setNavData] = useState([]);

  // Initialize navData with complete structure
  useEffect(() => {
    setNavData([
      { 
        to: "/admin", 
        title: "Dashboard Tổng quan", 
        Icon: ChartColumn, 
        badge: getNumber(pendingQueue.admin) || null,
        submenu: [
          { to: "/admin/analytics/platform", title: "Phân tích nền tảng", Icon: TrendingUp },
          { to: "/admin/alerts", title: "Cảnh báo hệ thống", Icon: AlertTriangle }
        ]
      },
      { 
        to: "/admin/events", 
        title: "Quản lý sự kiện", 
        Icon: Calendar, 
        badge: getNumber(pendingQueue.events) || null,
        submenu: [
          { to: "/admin/events", title: "Danh sách sự kiện", Icon: Calendar },
          { to: "/admin/events/approval-queue", title: "Hàng đợi duyệt", Icon: Clock },
          { to: "/admin/events/quality-control", title: "Kiểm soát chất lượng", Icon: Shield },
          { to: "/admin/events/analytics", title: "Phân tích sự kiện", Icon: BarChart3 }
        ]
      },
      { 
        to: "/admin/volunteers", 
        title: "Quản lý TNV", 
        Icon: Users, 
        badge: getNumber(pendingQueue.user) || null,
        submenu: [
          { to: "/admin/volunteers", title: "Danh sách TNV", Icon: Users },
          { to: "/admin/volunteers/verification", title: "Xác minh hồ sơ", Icon: UserCheck },
          { to: "/admin/volunteers/violations", title: "Quản lý vi phạm", Icon: AlertCircle },
          { to: "/admin/volunteers/certifications", title: "Chứng nhận", Icon: Award }
        ]
      },
      { 
        to: "/admin/partners", 
        title: "Quản lý đối tác", 
        Icon: Building, 
        badge: getNumber(pendingQueue.partners) || null,
        submenu: [
          { to: "/admin/partners", title: "Danh sách đối tác", Icon: Building },
          { to: "/admin/partners/verification", title: "Xác minh đối tác", Icon: Shield },
          { to: "/admin/partners/tiers", title: "Quản lý tier", Icon: Star },
          { to: "/admin/partners/analytics", title: "Phân tích đối tác", Icon: PieChart }
        ]
      },
      { 
        to: "/admin/connections", 
        title: "Kết nối & Tin nhắn", 
        Icon: MessageSquare, 
        badge: getNumber(pendingQueue.connections) || null,
        submenu: [
          { to: "/admin/connections", title: "Hàng đợi kết nối", Icon: MessageSquare },
          { to: "/admin/connections/approval-queue", title: "Duyệt kết nối", Icon: CheckCircle },
          { to: "/admin/connections/proxy-chat", title: "Chat Proxy", Icon: MessageCircle },
          { to: "/admin/connections/abuse-reports", title: "Báo cáo lạm dụng", Icon: Flag }
        ]
      },
      { 
        to: "/admin/content", 
        title: "Kiểm duyệt nội dung", 
        Icon: BookText, 
        badge: getNumber(pendingQueue.content) || null,
        submenu: [
          { to: "/admin/content", title: "Hàng đợi kiểm duyệt", Icon: BookText },
          { to: "/admin/content/queue", title: "Nội dung chờ duyệt", Icon: Clock },
          { to: "/admin/content/spotlight", title: "Spotlight", Icon: Star },
          { to: "/admin/content/community-feed", title: "Feed cộng đồng", Icon: Globe }
        ]
      },
      { 
        to: "/admin/services", 
        title: "Quản lý dịch vụ", 
        Icon: Chromium, 
        badge: getNumber(pendingQueue.services),
        submenu: [
          { to: "/admin/services", title: "Danh sách dịch vụ", Icon: Chromium },
          { to: "/admin/services/pricing", title: "Quản lý giá", Icon: CreditCard },
          { to: "/admin/services/subscriptions", title: "Gói đăng ký", Icon: Package }
        ]
      },
      { 
        to: "/admin/report", 
        title: "Báo cáo & Phân tích", 
        Icon: ChartLine, 
        badge: getNumber(pendingQueue.reports) || null,
        submenu: [
          { to: "/admin/report", title: "Báo cáo tổng quan", Icon: ChartLine },
          { to: "/admin/report/comparison", title: "So sánh kỳ", Icon: TrendingUp },
          { to: "/admin/report/connection-funnel", title: "Phễu kết nối", Icon: Activity },
          { to: "/admin/analytics/platform", title: "Analytics nền tảng", Icon: BarChart3 }
        ]
      },
      { 
        to: "/admin/system", 
        title: "Hệ thống & Giám sát", 
        Icon: Monitor, 
        badge: getNumber(pendingQueue.systemAlerts) || null,
        submenu: [
          { to: "/admin/system", title: "Giám sát hệ thống", Icon: Monitor },
          { to: "/admin/system/alerts", title: "Cảnh báo", Icon: AlertTriangle },
          { to: "/admin/system/audit-log", title: "Nhật ký hoạt động", Icon: FileText },
          { to: "/admin/system/roles", title: "Phân quyền", Icon: Lock },
          { to: "/admin/system/integrations", title: "Tích hợp", Icon: Link2 }
        ]
      },
      { 
        to: "/admin/backup", 
        title: "Backup & Export", 
        Icon: Database, 
        badge: getNumber(pendingQueue.backup) || null,
        submenu: [
          { to: "/admin/backup", title: "Quản lý Backup", Icon: Database },
          { to: "/admin/backup/export", title: "Xuất dữ liệu", Icon: Download },
          { to: "/admin/backup/import", title: "Nhập dữ liệu", Icon: Upload }
        ]
      },
      { 
        to: "/admin/support", 
        title: "Hỗ trợ & Khiếu nại", 
        Icon: CircleQuestionMark, 
        badge: getNumber(pendingQueue.support) || null,
        submenu: [
          { to: "/admin/support", title: "Trung tâm hỗ trợ", Icon: CircleQuestionMark },
          { to: "/admin/support/tickets", title: "Quản lý Ticket", Icon: Tag },
          { to: "/admin/support/complaints", title: "Xử lý khiếu nại", Icon: AlertCircle }
        ]
      },
      { 
        to: "/admin/settings", 
        title: "Cài đặt & Hồ sơ", 
        Icon: Settings, 
        badge: getNumber(pendingQueue.setting) || null,
        submenu: [
          { to: "/admin/profile", title: "Hồ sơ Admin", Icon: User2 },
          { to: "/admin/settings", title: "Cài đặt hệ thống", Icon: Settings },
          { to: "/admin/notifications/manage", title: "Quản lý thông báo", Icon: Bell }
        ]
      },
    ]);
  }, [pendingQueue]);

  useEffect (() => {
    const loaded  =  async () => {
      try {
        const data = await axios.get(`http://localhost:8080/admin/layout`);
        if(data.data.success) {
          setPendingQueue(data.data.pendingQueue);
          setNotification(data.data.notification);
          setVersion(data.data.version);
          setStatusSystem(data.data.systemStatus);
        }
      } catch (error) { 
        alert("Có lỗi xảy ra trong quá trình lấy dữ liệu!");
      }
    }
    loaded ();
  }, []);

  const getNumber = (number) => {
    if(number > 100) return 99;
    return number;
  }
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
    if (location.pathname.includes('/volunteers/detail/')) return "Chi tiết TNV";
    if (location.pathname.includes('/partners/detail/')) return "Chi tiết đối tác";
    
    return "Dashboard Admin";
  };

  const getPageDescription = () => {
    const path = location.pathname;
    
    if (path === '/admin' || path === '/admin/') return "Tổng quan hoạt động và quản lý toàn bộ hệ thống";
    if (path.includes('/events')) return "Quản lý và kiểm duyệt các sự kiện tình nguyện";
    if (path.includes('/volunteers')) return "Quản lý hồ sơ và hoạt động tình nguyện viên";
    if (path.includes('/partners')) return "Quản lý đối tác và tổ chức sự kiện";
    if (path.includes('/connections')) return "Kiểm duyệt kết nối và tin nhắn an toàn";
    if (path.includes('/content')) return "Kiểm duyệt nội dung cộng đồng và UGC";
    if (path.includes('/report')) return "Báo cáo và phân tích dữ liệu hệ thống";
    if (path.includes('/system')) return "Giám sát hệ thống và cảnh báo bảo mật";
    
    return "Quản lý và vận hành hệ thống VolunteerHub";
  };

  const getQuickActions = () => {
    const path = location.pathname;
    const actions = [];

    if (path === '/admin' || path === '/admin/') {
      actions.push(
        { label: "Tạo sự kiện", path: "/admin/events/create", variant: "primary" },
        { label: "Xuất báo cáo", path: "/admin/report", variant: "secondary" },
        { label: "Kiểm duyệt", path: "/admin/content/queue", variant: "secondary" }
      );
    } else if (path.includes('/events')) {
      actions.push(
        { label: "Duyệt sự kiện", path: "/admin/events/approval-queue", variant: "primary" },
        { label: "Phân tích", path: "/admin/events/analytics", variant: "secondary" }
      );
    } else if (path.includes('/content')) {
      actions.push(
        { label: "Duyệt nội dung", path: "/admin/content/queue", variant: "primary" },
        { label: "Spotlight", path: "/admin/content/spotlight", variant: "secondary" }
      );
    }

    return actions;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
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
              <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center font-bold text-sm">
                A
              </div>
              <span className="font-bold text-lg hidden sm:block">Admin Hub</span>
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {/* System Status */}
            <div className={`hidden lg:flex items-center gap-2 px-3 py-1.5 ${statusSystem ? "bg-green-600" : "bg-red-600"}  rounded-lg`}>
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium">Hệ thống ổn định</span>
            </div>

            {/* Pending Queue Summary */}
            <div className="hidden lg:flex items-center gap-2 text-xs">
              <span className="text-slate-300">Chờ duyệt:</span>
              <div className="flex gap-1">
                <span className="px-2 py-1 bg-blue-600 rounded text-white">{pendingQueue.events}SK</span>
                <span className="px-2 py-1 bg-green-600 rounded text-white">{pendingQueue.connections}KN</span>
                <span className="px-2 py-1 bg-yellow-600 rounded text-white">{pendingQueue.content}ND</span>
              </div>
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
                    <p className="text-sm">Không có thông báo mới</p>
                  </div>
                ) : (
                  <div className="flex flex-col max-h-96">
                    <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                      <p className="font-semibold text-lg text-gray-800">Thông báo Admin</p>
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
                            item.read ? "bg-white hover:bg-gray-50" : "bg-red-50 hover:bg-red-100"
                          }`}
                          onClick={() => setNotificationMenuOpen(false)}
                        >
                          <span className="font-medium text-gray-900 group-hover:text-red-600">{item.title}</span>
                          <span className="text-sm text-gray-600">{item.body}</span>
                          <span className="text-xs text-gray-400">{item.time}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* System Alerts */}
            <button 
              onClick={() => navigate("/admin/system/alerts")} 
              className="relative p-2 hover:bg-slate-700 rounded-lg transition-colors" 
              title="Cảnh báo hệ thống"
            >
              <TriangleAlert size={18} />
              {pendingQueue?.systemAlerts > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {pendingQueue?.systemAlerts}
                </span>
              )}
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
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user?.username?.charAt(0)?.toUpperCase() || "A"}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs text-slate-300">Admin</div>
                  <div className="text-sm font-medium">{user?.username || "Admin"}</div>
                </div>
                <ChevronDown size={16} className="hidden sm:block" />
              </button>

              {/* User Dropdown */}
              <div className={`absolute right-0 top-12 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 transition-all origin-top-right ${
                userMenuOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
              }`}>
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="font-semibold text-gray-800">{user?.username || "Admin User"}</p>
                  <p className="text-sm text-gray-500">Super Administrator</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Shield size={12} className="text-red-600" />
                    <p className="text-xs text-red-600">Full Access</p>
                  </div>
                </div>

                <Link to="/admin/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50" onClick={() => setUserMenuOpen(false)}>
                  <User2 size={16} /> Hồ sơ Admin
                </Link>

                <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50" onClick={() => setUserMenuOpen(false)}>
                  <Settings size={16} /> Cài đặt hệ thống
                </Link>

                <Link to="/admin/system/audit-log" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50" onClick={() => setUserMenuOpen(false)}>
                  <History size={16} /> Nhật ký hoạt động
                </Link>

                <Link to="/admin/system/alerts" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50" onClick={() => setUserMenuOpen(false)}>
                  <AlertTriangle size={16} /> Cảnh báo hệ thống
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
                  Đăng xuất Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-14">
        {/* Sidebar */}
        <aside className={`fixed left-0 top-14 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
          isCollapsed ? "w-16" : "w-64"
        } overflow-hidden`}>
          <div className="flex flex-col h-full w-full">
            {/* Admin Info Section */}
            <div className={`p-4 border-b border-gray-200 bg-red-50 ${isCollapsed ? 'px-2' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="text-white" size={18} />
                </div>
                <div className={`${isCollapsed ? 'hidden' : 'flex flex-col'} min-w-0 flex-1`}>
                  <span className="font-semibold text-sm text-red-800">Super Admin</span>
                  <span className="text-xs text-red-600">Full System Access</span>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-green-600">Online</span>
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
                    (item.to !== '/admin' && location.pathname.startsWith(item.to));

                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative ${
                        isActive 
                          ? "bg-red-50 text-red-700 border-r-2 border-red-500" 
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {Icon && (
                          <Icon 
                            size={18} 
                            className={isActive ? "text-red-600" : "text-gray-500 group-hover:text-gray-700"} 
                          />
                        )}
                      </div>

                      <span className={`${isCollapsed ? "hidden" : "block"} text-sm font-medium truncate`}>
                        {item.title}
                      </span>

                      {/* Badge */}
                      {item.badge && item.badge > 0 && (
                        <span className={`${isCollapsed ? "hidden" : "inline-flex"} items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full ml-auto`}>
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

            {/* Bottom Info */}
            <div className="border-t border-gray-200 p-4 space-y-2">
              {!isCollapsed && (
                <div className="text-center space-y-2">
                  <div className="text-xs text-gray-500">
                    <div className="flex justify-between">
                      <span>Version:</span>
                      <span className="font-mono">{version}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    <p>© {new Date().getFullYear()} VolunteerHub Admin</p>
                    <p>All rights reserved</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${isCollapsed ? "ml-16" : "ml-64"}`}>
          {/* Page Header */}
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
                {getQuickActions().map((action, index) => (
                  <Link
                    key={index}
                    to={action.path}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      action.variant === 'primary' 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {action.label}
                  </Link>
                ))}
                
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Page Content */}
            <div className="p-6">
              <Routes>
                {/* Dashboard */}
                <Route path="/admin" element={<RequireAuth><Dashboard /></RequireAuth>} />
                <Route path="/admin/analytics/platform" element={<RequireAuth><PlatformAnalytics /></RequireAuth>} />
                <Route path="/admin/alerts" element={<RequireAuth><SystemAlerts /></RequireAuth>} />

                {/* Event Management Routes */}
                <Route path="/admin/events" element={<RequireAuth><EventManagement /></RequireAuth>} />
                <Route path="/admin/events/create" element={<RequireAuth><EventCreatePage /></RequireAuth>} />
                <Route path="/admin/events/detail/:id" element={<RequireAuth><EventDetailPage /></RequireAuth>} />
                <Route path="/admin/events/approval-queue" element={<RequireAuth><EventApprovalQueue /></RequireAuth>} />
                <Route path="/admin/events/quality-control" element={<RequireAuth><EventQualityControl /></RequireAuth>} />
                <Route path="/admin/events/analytics" element={<RequireAuth><EventAnalytics /></RequireAuth>} />

                {/* Volunteer Management Routes */}
                <Route path="/admin/volunteers" element={<RequireAuth><VolunteerManagement /></RequireAuth>} />
                <Route path="/admin/volunteers/detail/:id" element={<RequireAuth><VolunteerDetailPage /></RequireAuth>} />
                <Route path="/admin/volunteers/verification" element={<RequireAuth><VolunteerVerification /></RequireAuth>} />
                <Route path="/admin/volunteers/violations" element={<RequireAuth><VolunteerViolationManagement /></RequireAuth>} />
                <Route path="/admin/volunteers/certifications" element={<RequireAuth><VolunteerCertificationSystem /></RequireAuth>} />

                {/* Partner Management Routes */}
                <Route path="/admin/partners" element={<RequireAuth><PartnerManagement /></RequireAuth>} />
                <Route path="/admin/partners/verification" element={<RequireAuth><PartnerVerification /></RequireAuth>} />
                <Route path="/admin/partners/tiers" element={<RequireAuth><PartnerTierManagement /></RequireAuth>} />
                <Route path="/admin/partners/analytics" element={<RequireAuth><PartnerAnalytics /></RequireAuth>} />

                {/* Connection Management Routes */}
                <Route path="/admin/connections" element={<RequireAuth><ConnectionQueue /></RequireAuth>} />
                <Route path="/admin/connections/approval-queue" element={<RequireAuth><ConnectionApprovalQueue /></RequireAuth>} />
                <Route path="/admin/connections/proxy-chat" element={<RequireAuth><ProxyChatSystem /></RequireAuth>} />
                <Route path="/admin/connections/abuse-reports" element={<RequireAuth><AbuseReportManagement /></RequireAuth>} />

                {/* Content Management Routes */}
                <Route path="/admin/content" element={<RequireAuth><ContentModeration /></RequireAuth>} />
                <Route path="/admin/content/queue" element={<RequireAuth><ContentQueue /></RequireAuth>} />
                <Route path="/admin/content/spotlight" element={<RequireAuth><ContentSpotlight /></RequireAuth>} />
                <Route path="/admin/content/community-feed" element={<RequireAuth><CommunityFeedManagement /></RequireAuth>} />

                {/* Services Management Routes */}
                <Route path="/admin/services" element={<RequireAuth><ServicesPage /></RequireAuth>} />

                {/* Reports & Analytics Routes */}
                <Route path="/admin/report" element={<RequireAuth><Reports /></RequireAuth>} />
                <Route path="/admin/report/comparison" element={<RequireAuth><ComparisonReports /></RequireAuth>} />
                <Route path="/admin/report/connection-funnel" element={<RequireAuth><ConnectionFunnelAnalytics /></RequireAuth>} />

                {/* System Management Routes */}
                <Route path="/admin/system" element={<RequireAuth><SystemMonitoring /></RequireAuth>} />
                <Route path="/admin/system/alerts" element={<RequireAuth><SystemAlerts /></RequireAuth>} />
                <Route path="/admin/system/audit-log" element={<RequireAuth><AuditLog /></RequireAuth>} />
                <Route path="/admin/system/roles" element={<RequireAuth><RoleManagement /></RequireAuth>} />
                <Route path="/admin/system/integrations" element={<RequireAuth><IntegrationManagement /></RequireAuth>} />

                {/* Backup & Export Routes */}
                <Route path="/admin/backup" element={<RequireAuth><DataBackup /></RequireAuth>} />
                <Route path="/admin/backup/export" element={<RequireAuth><DataExport /></RequireAuth>} />

                {/* Support Routes */}
                <Route path="/admin/support" element={<RequireAuth><Support /></RequireAuth>} />
                <Route path="/admin/support/tickets" element={<RequireAuth><TicketManagement /></RequireAuth>} />
                <Route path="/admin/support/complaints" element={<RequireAuth><ComplaintResolution /></RequireAuth>} />

                {/* Settings Routes */}
                <Route path="/admin/profile" element={<RequireAuth><AdminProfile /></RequireAuth>} />
                <Route path="/admin/settings" element={<RequireAuth><AdminSettings /></RequireAuth>} />
                <Route path="/admin/notifications/manage" element={<RequireAuth><NotificationManagement /></RequireAuth>} />

                {/* Legacy Routes */}
                <Route path="/admin/account" element={<RequireAuth><AdminProfile /></RequireAuth>} />
                <Route path="/admin/post-box" element={<RequireAuth><ConnectionQueue /></RequireAuth>} />
                <Route path="/admin/history" element={<RequireAuth><AuditLog /></RequireAuth>} />

                <Route path="/admin/queue" element={<RequireAuth><QueuePage /></RequireAuth>} />

                {/* Fallback */}
                <Route path="/admin/*" element={<NotFoundPage />} />
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

export default AdminLayout;