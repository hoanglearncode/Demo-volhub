import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Users,
  Shield,
  FileText,
  AlertTriangle,
  Link as LinkIcon,
  Monitor,
  Database,
  Briefcase,
  HelpCircle,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Home,
  UserCheck,
  UserPlus,
  Lock,
  Eye,
  MessageSquare,
  Flag,
  Calendar,
  Handshake,
  Activity,
  Archive,
  Headphones,
  User,
  Brain,
  User2
} from "lucide-react";

export default function AdminNav({ pendingQueue = {}, isCollapsed, setIsCollapsed }) {
  const [open, setOpen] = useState(null);
  const location = useLocation();
  
  const toggle = (key) => setOpen(open === key ? null : key);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');
  const isMenuActive = (menuKey) => {
    const menuPaths = {
      events: '/admin/events',
      volunteers: '/admin/volunteers',
      partners: '/admin/partners',
      connections: '/admin/connections',
      content: '/admin/content',
      system: '/admin/system',
      data: '/admin/backup',
      support: '/admin/support'
    };
    return location.pathname.startsWith(menuPaths[menuKey] || '');
  };

  const Badge = ({ count, color = "bg-red-500" }) => {
    if (!count) return null;
    return (
      <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white ${color} rounded-full`}>
        {count > 99 ? '99+' : count}
      </span>
    );
  };

  const MenuButton = ({ icon: Icon, title, menuKey, badge, children }) => {
    const isMenuOpen = open === menuKey;
    const isMenuHighlighted = isMenuActive(menuKey);

    return (
      <div className="mb-1">
        <button
          onClick={() => toggle(menuKey)}
          className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-left transition-all duration-200 group ${
            isMenuHighlighted 
              ? 'bg-blue-50 text-blue-700 shadow-sm' 
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
          }`}
          aria-expanded={isMenuOpen}
        >
          <div className="flex items-center gap-3 min-w-0">
            <Icon 
              size={18} 
              className={`flex-shrink-0 transition-colors ${
                isMenuHighlighted ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
              }`} 
            />
            {!isCollapsed && (
              <span className="font-medium truncate">{title}</span>
            )}
          </div>
          
          {!isCollapsed && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {badge}
              <ChevronRight 
                size={16} 
                className={`transition-transform duration-200 ${
                  isMenuOpen ? 'rotate-90' : ''
                } ${isMenuHighlighted ? 'text-blue-600' : 'text-gray-400'}`}
              />
            </div>
          )}
        </button>

        {!isCollapsed && isMenuOpen && (
          <div className="mt-2 ml-6 border-l-2 border-gray-100 pl-4 space-y-1">
            {children}
          </div>
        )}
      </div>
    );
  };

  const NavLink = ({ to, icon: Icon, children, badge }) => {
    const active = isActive(to);
    
    return (
      <Link
        to={to}
        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200 group ${
          active 
            ? 'bg-blue-100 text-blue-700 font-medium shadow-sm' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        {Icon && (
          <Icon 
            size={16} 
            className={`flex-shrink-0 ${
              active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
            }`} 
          />
        )}
        {!isCollapsed && (
          <>
            <span className="truncate">{children}</span>
            {badge && <div className="ml-auto">{badge}</div>}
          </>
        )}
      </Link>
    );
  };

  const DirectNavLink = ({ to, icon: Icon, children, badge }) => {
    const active = isActive(to);
    
    return (
      <Link
        to={to}
        className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group mb-1 ${
          active 
            ? 'bg-blue-50 text-blue-700 shadow-sm' 
            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <Icon 
          size={18} 
          className={`flex-shrink-0 ${
            active ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
          }`} 
        />
        {!isCollapsed && (
          <>
            <span className="truncate">{children}</span>
            {badge && <div className="ml-auto">{badge}</div>}
          </>
        )}
      </Link>
    );
  };

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 h-screen overflow-y-scroll overflow-x-scroll fixed top-0 overflow-hidden transition-all duration-300 z-40`}>
      <div className="h-full flex flex-col  mt-16">
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {/* Dashboard */}
          <DirectNavLink to="/admin" icon={BarChart3}>
            Dashboard
          </DirectNavLink>

          {/* Event Management */}
          <DirectNavLink 
            to="/admin/events" 
            icon={Calendar}
            badge={<Badge count={pendingQueue.events} color="bg-orange-500" />}
          >
            Quản lý sự kiện
          </DirectNavLink>

          {/* Volunteer Management */}
          <DirectNavLink to="/admin/volunteers" icon={User2}>
            Quản lý tình nguyện viên
          </DirectNavLink>

          {/* Partner Management */}
          <DirectNavLink to="/admin/partners" icon={Handshake}>
            Quản lý đối tác/BTC
          </DirectNavLink>

          {/* Connection & Messages Queue */}
          <MenuButton
            icon={MessageSquare}
            title="Kết nối & Tin nhắn"
            menuKey="connections"
            badge={<Badge count={pendingQueue.connections} color="bg-blue-500" />}
          >
            <NavLink 
              to="/admin/connections" 
              icon={LinkIcon}
              badge={<Badge count={pendingQueue.connections} color="bg-blue-500" />}
            >
              Hàng đợi kết nối
            </NavLink>
            <NavLink to="/admin/messages" icon={MessageSquare}>
              Proxy Chat
            </NavLink>
          </MenuButton>

          {/* Content Moderation */}
          <MenuButton
            icon={FileText}
            title="Kiểm duyệt nội dung"
            menuKey="content"
            badge={<Badge count={pendingQueue.content} color="bg-yellow-500" />}
          >
            <NavLink 
              to="/admin/content" 
              icon={AlertTriangle}
              badge={<Badge count={pendingQueue.content} color="bg-yellow-500" />}
            >
              Nội dung chờ duyệt
            </NavLink>
            <NavLink to="/admin/moderation" icon={Shield}>
              Lịch sử moderation
            </NavLink>
          </MenuButton>

          {/* Reports & Analytics */}
          <MenuButton
            icon={BarChart3}
            title="Báo cáo & Analytics"
            menuKey="reports"
            badge={<Badge count={pendingQueue.reports} color="bg-red-500" />}
          >
            <NavLink to="/admin/reports" icon={BarChart3}>
              Dashboard báo cáo
            </NavLink>
            <NavLink to="/admin/analytics" icon={Activity}>
              Phân tích chi tiết
            </NavLink>
            <NavLink 
              to="/admin/reports/violations" 
              icon={Flag}
              badge={<Badge count={pendingQueue.reports} color="bg-red-500" />}
            >
              Báo cáo vi phạm
            </NavLink>
          </MenuButton>

          {/* System Monitoring */}
          <MenuButton
            icon={Monitor}
            title="Hệ thống & Giám sát"
            menuKey="system"
          >
            <NavLink to="/admin/system-monitoring" icon={Activity}>
              Giám sát hệ thống
            </NavLink>
            <NavLink to="/admin/monitoring" icon={Monitor}>
              Health checks
            </NavLink>
          </MenuButton>

          {/* Data Backup & Export */}
          <MenuButton
            icon={Database}
            title="Backup & Export"
            menuKey="data"
          >
            <NavLink to="/admin/backup" icon={Archive}>
              Sao lưu dữ liệu
            </NavLink>
            <NavLink to="/admin/export" icon={Database}>
              Export dữ liệu
            </NavLink>
          </MenuButton>

          {/* Support */}
          <MenuButton
            icon={HelpCircle}
            title="Support & Khiếu nại"
            menuKey="support"
          >
            <NavLink to="/admin/support" icon={Headphones}>
              Hỗ trợ người dùng
            </NavLink>
            <NavLink to="/admin/tickets" icon={AlertTriangle}>
              Tickets & Escalations
            </NavLink>
          </MenuButton>

          {/* Profile & Settings */}
          <DirectNavLink to="/admin/profile" icon={User}>
            Hồ sơ & Settings
          </DirectNavLink>
        </nav>
      </div>
    </aside>
  );
}