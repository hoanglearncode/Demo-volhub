import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminNav({ counts = {} }) {
  const [open, setOpen] = useState(null);
  const toggle = (key) => setOpen(open === key ? null : key);

  return (
    <aside className="w-72 bg-white border-r h-screen p-4 sticky top-0 overflow-auto">
      <div className="mb-4">
        <Link to="/admin" className="text-xl font-semibold block py-2">
          Admin Dashboard
        </Link>
      </div>

      <nav className="flex flex-col gap-2 text-sm">
        <div>
          <button
            onClick={() => toggle("users")}
            className="w-full flex items-center justify-between px-2 py-2 rounded hover:bg-gray-100"
            aria-expanded={open === "users"}
            aria-controls="users-menu"
          >
            <span>Quản lý người dùng & phân quyền</span>
            <span className="text-xs text-gray-500">{open === "users" ? "▾" : "▸"}</span>
          </button>

          {open === "users" && (
            <div id="users-menu" className="pl-4 mt-2 flex flex-col gap-1">
              <Link to="/admin/users" className="py-1 hover:underline">Danh sách người dùng</Link>
              <Link to="/admin/users/create" className="py-1 hover:underline">Tạo / Invite tài khoản</Link>
              <Link to="/admin/roles" className="py-1 hover:underline">Roles & Permissions</Link>
              <Link to="/admin/users/impersonate" className="py-1 hover:underline">Impersonate (debug)</Link>
              <Link to="/admin/users/blocked" className="py-1 hover:underline">Tài khoản bị khóa</Link>
            </div>
          )}
        </div>

        {/* Kiểm duyệt nội dung */}
        <div>
          <button
            onClick={() => toggle("content")}
            className="w-full flex items-center justify-between px-2 py-2 rounded hover:bg-gray-100"
            aria-expanded={open === "content"}
          >
            <span>Kiểm duyệt nội dung</span>
            <span className="text-xs text-gray-500">{open === "content" ? "▾" : "▸"}</span>
          </button>

          {open === "content" && (
            <div className="pl-4 mt-2 flex flex-col gap-1">
              <Link to="/admin/content/moderation" className="py-1 hover:underline">
                Hòm duyệt (pending){counts.pendingModeration ? ` (${counts.pendingModeration})` : ""}
              </Link>
              <Link to="/admin/content/posts" className="py-1 hover:underline">Quản lý bài đăng</Link>
              <Link to="/admin/content/comments" className="py-1 hover:underline">Quản lý bình luận</Link>
              <Link to="/admin/content/reports" className="py-1 hover:underline">Báo cáo & Flags</Link>
              <Link to="/admin/content/external" className="py-1 hover:underline">Nội dung import (Facebook)</Link>
              <Link to="/admin/content/history" className="py-1 hover:underline">Lịch sử moderation</Link>
            </div>
          )}
        </div>

        {/* Tích hợp (Facebook, Email, SMS) */}
        <div>
          <button
            onClick={() => toggle("integrations")}
            className="w-full flex items-center justify-between px-2 py-2 rounded hover:bg-gray-100"
            aria-expanded={open === "integrations"}
          >
            <span>Tích hợp & Kết nối</span>
            <span className="text-xs text-gray-500">{open === "integrations" ? "▾" : "▸"}</span>
          </button>

          {open === "integrations" && (
            <div className="pl-4 mt-2 flex flex-col gap-1">
              <Link to="/admin/integrations/facebook" className="py-1 hover:underline">Facebook App & Page</Link>
              <Link to="/admin/integrations/fb-mapping" className="py-1 hover:underline">Mapping nội dung (FB → App)</Link>
              <Link to="/admin/integrations/email" className="py-1 hover:underline">Email provider (keys)</Link>
              <Link to="/admin/integrations/sms" className="py-1 hover:underline">SMS gateway</Link>
              <Link to="/admin/integrations/tests" className="py-1 hover:underline">Test token / Connection</Link>
            </div>
          )}
        </div>

        {/* Giám sát hệ thống & Audit */}
        <div>
          <button
            onClick={() => toggle("system")}
            className="w-full flex items-center justify-between px-2 py-2 rounded hover:bg-gray-100"
            aria-expanded={open === "system"}
          >
            <span>Hệ thống & Giám sát</span>
            <span className="text-xs text-gray-500">{open === "system" ? "▾" : "▸"}</span>
          </button>

          {open === "system" && (
            <div className="pl-4 mt-2 flex flex-col gap-1">
              <Link to="/admin/monitoring/health" className="py-1 hover:underline">Health checks</Link>
              <Link to="/admin/alerts" className="py-1 hover:underline">Alerts & Thresholds{counts.alerts ? ` (${counts.alerts})` : ""}</Link>
              <Link to="/admin/keys" className="py-1 hover:underline">API keys & Key rotation</Link>
              <Link to="/admin/settings/security" className="py-1 hover:underline">Security settings (MFA, IP allowlist)</Link>
              <Link to="/admin/monitoring/logs" className="py-1 hover:underline">Audit logs</Link>
            </div>
          )}
        </div>

        {/* Backup / Export / Data */}
        <div>
          <button
            onClick={() => toggle("data")}
            className="w-full flex items-center justify-between px-2 py-2 rounded hover:bg-gray-100"
            aria-expanded={open === "data"}
          >
            <span>Backup / Export / Data</span>
            <span className="text-xs text-gray-500">{open === "data" ? "▾" : "▸"}</span>
          </button>

          {open === "data" && (
            <div className="pl-4 mt-2 flex flex-col gap-1">
              <Link to="/admin/backup" className="py-1 hover:underline">Backup & Restore</Link>
              <Link to="/admin/exports" className="py-1 hover:underline">Export data (CSV/JSON/XLSX)</Link>
              <Link to="/admin/storage/files" className="py-1 hover:underline">Quản lý Storage (files)</Link>
              <Link to="/admin/data/retention" className="py-1 hover:underline">Retention policies</Link>
            </div>
          )}
        </div>

        {/* Tuyển dụng */}
        <div>
          <button
            onClick={() => toggle("recruitment")}
            className="w-full flex items-center justify-between px-2 py-2 rounded hover:bg-gray-100"
          >
            <span>Tuyển dụng</span>
            <span className="text-xs text-gray-500">{open === "recruitment" ? "▾" : "▸"}</span>
          </button>

          {open === "recruitment" && (
            <div className="pl-4 mt-2 flex flex-col gap-1">
              <Link to="/admin/recruitment/jobs" className="py-1 hover:underline">Quản lý job</Link>
              <Link to="/admin/recruitment/forms" className="py-1 hover:underline">Form builder (mẫu apply)</Link>
              <Link to="/admin/recruitment/applications" className="py-1 hover:underline">Applications{counts.pendingApplications ? ` (${counts.pendingApplications})` : ""}</Link>
              <Link to="/admin/recruitment/workflow" className="py-1 hover:underline">Luồng phê duyệt</Link>
              <Link to="/admin/recruitment/templates" className="py-1 hover:underline">Email templates</Link>
            </div>
          )}
        </div>

        {/* Support & Khiếu nại */}
        <div>
          <button
            onClick={() => toggle("support")}
            className="w-full flex items-center justify-between px-2 py-2 rounded hover:bg-gray-100"
          >
            <span>Support & Khiếu nại</span>
            <span className="text-xs text-gray-500">{open === "support" ? "▾" : "▸"}</span>
          </button>

          {open === "support" && (
            <div className="pl-4 mt-2 flex flex-col gap-1">
              <Link to="/admin/support/tickets" className="py-1 hover:underline">Tickets & Escalations</Link>
              <Link to="/admin/support/escalation-rules" className="py-1 hover:underline">Quy trình Escalate</Link>
              <Link to="/admin/support/knowledge" className="py-1 hover:underline">Knowledge base</Link>
            </div>
          )}
        </div>

        {/* Báo cáo & Reports */}
        <div>
          <Link to="/admin/reports" className="px-2 py-2 rounded hover:bg-gray-100 block">Báo cáo & Analytics</Link>
        </div>

        {/* Hồ sơ Admin */}
        <div>
          <Link to="/admin/profile" className="px-2 py-2 rounded hover:bg-gray-100 block">Hồ sơ & Settings</Link>
        </div>
      </nav>
    </aside>
  );
}
