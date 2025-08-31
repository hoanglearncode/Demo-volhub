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
  Facebook,
  Mail,
  Smartphone,
  Activity,
  Key,
  HardDrive,
  Download,
  Archive,
  UserCog,
  FileQuestion,
  Ticket,
  Brain
} from "lucide-react";

export default function AdminNav({ counts = {}, isCollapsed, setIsCollapsed }) {
  const [open, setOpen] = useState(null);
  const location = useLocation();
  
  const toggle = (key) => setOpen(open === key ? null : key);

  const isActive = (path) => location.pathname.startsWith(path);
  const isMenuActive = (menuKey) => {
    const menuPaths = {
      users: '/admin/users',
      content: '/admin/content',
      integrations: '/admin/integrations',
      system: '/admin/monitoring',
      data: '/admin/backup',
      recruitment: '/admin/recruitment',
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
    <aside className={`${isCollapsed ? 'w-20' : 'w-md'} bg-white border-r border-gray-200 h-screen sticky top-0 overflow-hidden transition-all duration-300 z-40`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          {!isCollapsed ? (
            <Link to="/admin" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Home size={16} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-lg">Admin Panel</div>
                <div className="text-xs text-gray-500">Volunteer Management</div>
              </div>
            </Link>
          ) : (
            <Link to="/admin" className="flex justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Home size={16} className="text-white" />
              </div>
            </Link>
          )}

          {!isCollapsed && (
            <button className="rounded-full w-10 h-10 flex justify-center items-center bg-gray-200" onClick={()=> setIsCollapsed(!isCollapsed)}>
              <ChevronRight className={`transform transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`} size={18} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {/* Dashboard */}
          <DirectNavLink to="/admin" icon={BarChart3}>
            Dashboard
          </DirectNavLink>

          {/* User Management */}
          <MenuButton
            icon={Users}
            title="Quản lý người dùng & phân quyền"
            menuKey="users"
          >
            <NavLink to="/admin/users" icon={UserCheck}>
              Danh sách người dùng
            </NavLink>
            <NavLink to="/admin/users/create" icon={UserPlus}>
              Tạo / Invite tài khoản
            </NavLink>
            <NavLink to="/admin/roles" icon={Shield}>
              Roles & Permissions
            </NavLink>
            <NavLink to="/admin/users/impersonate" icon={Eye}>
              Impersonate (debug)
            </NavLink>
            <NavLink to="/admin/users/blocked" icon={Lock}>
              Tài khoản bị khóa
            </NavLink>
          </MenuButton>

          {/* Content Moderation */}
          <MenuButton
            icon={FileText}
            title="Kiểm duyệt nội dung"
            menuKey="content"
            badge={<Badge count={counts.pendingModeration} />}
          >
            <NavLink 
              to="/admin/content/moderation" 
              icon={AlertTriangle}
              badge={<Badge count={counts.pendingModeration} color="bg-orange-500" />}
            >
              Hòm duyệt (pending)
            </NavLink>
            <NavLink to="/admin/content/posts" icon={FileText}>
              Quản lý bài đăng
            </NavLink>
            <NavLink to="/admin/content/comments" icon={MessageSquare}>
              Quản lý bình luận
            </NavLink>
            <NavLink to="/admin/content/reports" icon={Flag}>
              Báo cáo & Flags
            </NavLink>
            <NavLink to="/admin/content/external" icon={Facebook}>
              Nội dung import (Facebook)
            </NavLink>
            <NavLink to="/admin/content/history" icon={Archive}>
              Lịch sử moderation
            </NavLink>
          </MenuButton>

          {/* Integrations */}
          <MenuButton
            icon={LinkIcon}
            title="Tích hợp & Kết nối"
            menuKey="integrations"
          >
            <NavLink to="/admin/integrations/facebook" icon={Facebook}>
              Facebook App & Page
            </NavLink>
            <NavLink to="/admin/integrations/fb-mapping" icon={LinkIcon}>
              Mapping nội dung (FB → App)
            </NavLink>
            <NavLink to="/admin/integrations/email" icon={Mail}>
              Email provider (keys)
            </NavLink>
            <NavLink to="/admin/integrations/sms" icon={Smartphone}>
              SMS gateway
            </NavLink>
            <NavLink to="/admin/integrations/tests" icon={Activity}>
              Test token / Connection
            </NavLink>
          </MenuButton>

          {/* System Monitoring */}
          <MenuButton
            icon={Monitor}
            title="Hệ thống & Giám sát"
            menuKey="system"
            badge={<Badge count={counts.alerts} color="bg-red-500" />}
          >
            <NavLink to="/admin/monitoring/health" icon={Activity}>
              Health checks
            </NavLink>
            <NavLink 
              to="/admin/alerts" 
              icon={AlertTriangle}
              badge={<Badge count={counts.alerts} color="bg-red-500" />}
            >
              Alerts & Thresholds
            </NavLink>
            <NavLink to="/admin/keys" icon={Key}>
              API keys & Key rotation
            </NavLink>
            <NavLink to="/admin/settings/security" icon={Shield}>
              Security settings (MFA, IP allowlist)
            </NavLink>
            <NavLink to="/admin/monitoring/logs" icon={FileText}>
              Audit logs
            </NavLink>
          </MenuButton>

          {/* Data Management */}
          <MenuButton
            icon={Database}
            title="Backup / Export / Data"
            menuKey="data"
          >
            <NavLink to="/admin/backup" icon={Archive}>
              Backup & Restore
            </NavLink>
            <NavLink to="/admin/exports" icon={Download}>
              Export data (CSV/JSON/XLSX)
            </NavLink>
            <NavLink to="/admin/storage/files" icon={HardDrive}>
              Quản lý Storage (files)
            </NavLink>
            <NavLink to="/admin/data/retention" icon={Archive}>
              Retention policies
            </NavLink>
          </MenuButton>

          {/* Recruitment */}
          <MenuButton
            icon={Briefcase}
            title="Tuyển dụng"
            menuKey="recruitment"
            badge={<Badge count={counts.pendingApplications} color="bg-green-500" />}
          >
            <NavLink to="/admin/recruitment/jobs" icon={Briefcase}>
              Quản lý job
            </NavLink>
            <NavLink to="/admin/recruitment/forms" icon={FileQuestion}>
              Form builder (mẫu apply)
            </NavLink>
            <NavLink 
              to="/admin/recruitment/applications" 
              icon={UserCog}
              badge={<Badge count={counts.pendingApplications} color="bg-green-500" />}
            >
              Applications
            </NavLink>
            <NavLink to="/admin/recruitment/workflow" icon={Activity}>
              Luồng phê duyệt
            </NavLink>
            <NavLink to="/admin/recruitment/templates" icon={Mail}>
              Email templates
            </NavLink>
          </MenuButton>

          {/* Support */}
          <MenuButton
            icon={HelpCircle}
            title="Support & Khiếu nại"
            menuKey="support"
          >
            <NavLink to="/admin/support/tickets" icon={Ticket}>
              Tickets & Escalations
            </NavLink>
            <NavLink to="/admin/support/escalation-rules" icon={AlertTriangle}>
              Quy trình Escalate
            </NavLink>
            <NavLink to="/admin/support/knowledge" icon={Brain}>
              Knowledge base
            </NavLink>
          </MenuButton>

          {/* Direct Links */}
          <DirectNavLink to="/admin/reports" icon={BarChart3}>
            Báo cáo & Analytics
          </DirectNavLink>

          <DirectNavLink to="/admin/profile" icon={Settings}>
            Hồ sơ & Settings
          </DirectNavLink>
        </nav>

        {/* Footer */}
        {/* {!isCollapsed && (
          <div className="p-4 border-t border-gray-100">
            <div className="text-xs text-gray-500 text-center">
              <div>Admin Panel v2.1</div>
              <div>© 2024 Volunteer Platform</div>
            </div>
          </div>
        )} */}
      </div>
    </aside>
  );
}