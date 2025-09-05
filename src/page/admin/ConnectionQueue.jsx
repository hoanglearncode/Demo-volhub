import React, { useEffect, useState, useMemo } from "react";
import {
  MessageSquare,
  Users,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Eye,
  Trash2,
  Flag,
  History,
  Mail,
  ChevronDown,
  MoreHorizontal,
  Clock,
} from "lucide-react";
import { Link, Routes, Route, useNavigate, useParams } from "react-router-dom";

/**
 * ConnectionsManagement
 * - /admin/connections (overview)
 * - nested routes handled inside: /queue, /chat, /logs...
 *
 * NOTE: This is a self-contained UI with mock data and stub handlers.
 * Integrate API calls & RBAC logic (RequireAuth/roles) per your backend.
 */

const now = () => new Date().toISOString();

const sampleQueue = [
  {
    id: 101,
    fromOrg: "Samsung Electronics",
    toVolunteer: { id: 201, name: "Nguyễn Văn A", maskedPhone: "+84•••", maskedEmail: "n.van.a••@mail.com" },
    event: { id: 11, title: "Tẩy rửa bờ biển", verified: true },
    submittedAt: "2025-09-01T09:15:00Z",
    reason: "Request to invite volunteer for event",
    aiFlags: [],
    status: "pending", // pending | auto-approved | flagged | approved | rejected
    adminNote: null,
  },
  {
    id: 102,
    fromOrg: "Local Community Group",
    toVolunteer: { id: 202, name: "Trần Thị B", maskedPhone: "+84•••", maskedEmail: "t.thi.b••@mail.com" },
    event: { id: 12, title: "Phát quà Trung thu", verified: false },
    submittedAt: "2025-09-03T08:05:00Z",
    reason: "Mass invite, partner unverified",
    aiFlags: ["partner_unverified"],
    status: "flagged",
    adminNote: null,
  },
  {
    id: 103,
    fromOrg: "UNICEF Vietnam",
    toVolunteer: { id: 203, name: "Lê Văn C", maskedPhone: "+84•••", maskedEmail: "l.van.c••@mail.com" },
    event: { id: 13, title: "Hỗ trợ người cao tuổi", verified: true },
    submittedAt: "2025-09-04T11:22:00Z",
    reason: "Verified partner - auto rule expected",
    aiFlags: [],
    status: "auto-approved",
    adminNote: null,
  },
];

const sampleConversations = [
  {
    id: "conv-1",
    participants: [
      { id: "org-1", name: "Samsung Electronics", type: "org" },
      { id: 201, name: "Nguyễn Văn A", type: "volunteer", maskedPhone: "+84•••", maskedEmail: "n.van.a••@mail.com" },
    ],
    lastMessageAt: "2025-09-04T10:12:00Z",
    unread: 2,
    messages: [
      { id: 1, from: "org-1", text: "Chúng tôi mời bạn tham gia sự kiện...", at: "2025-09-04T09:00:00Z" },
      { id: 2, from: 201, text: "Cảm ơn, tôi quan tâm. Thông tin chi tiết?", at: "2025-09-04T09:10:00Z" },
      { id: 3, from: "org-1", text: "Sẽ gửi chi tiết sau khi Admin duyệt connect.", at: "2025-09-04T09:15:00Z" },
    ],
    logs: [
      { at: "2025-09-04T09:00:00Z", action: "invite_sent", by: "Samsung Electronics" },
      { at: "2025-09-04T09:15:00Z", action: "pending_admin", by: "system" },
    ],
  },
  // more ...
];

function humanDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("vi-VN");
}

/* ---------- Queue View Component ---------- */
function QueueView({ queue, onApprove, onReject, onFlag, onEdit, bulkActionHandler }) {
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected([]); // reset when queue changes
  }, [queue]);

  const filtered = queue.filter(item => {
    const matchesText =
      !q ||
      item.fromOrg.toLowerCase().includes(q.toLowerCase()) ||
      item.toVolunteer.name.toLowerCase().includes(q.toLowerCase()) ||
      item.event.title.toLowerCase().includes(q.toLowerCase());
    const matchesFilter = filter === "all" ? true : item.status === filter;
    return matchesText && matchesFilter;
  });

  const toggleSelect = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Filters & bulk */}
      <div className="lg:col-span-3 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm theo org / TNV / sự kiện" className="pl-10 pr-3 py-2 border rounded-md w-96" />
            </div>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2 border rounded-md">
              <option value="all">Tất cả</option>
              <option value="pending">Chờ duyệt</option>
              <option value="auto-approved">Auto-approve</option>
              <option value="flagged">Bị gắn cờ</option>
              <option value="approved">Đã duyệt</option>
              <option value="rejected">Từ chối</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => { bulkActionHandler('approve', selected); setSelected([]); }} disabled={!selected.length} className="px-3 py-2 bg-green-600 text-white rounded-md disabled:opacity-50">Duyệt (bulk)</button>
            <button onClick={() => { bulkActionHandler('reject', selected); setSelected([]); }} disabled={!selected.length} className="px-3 py-2 bg-red-600 text-white rounded-md disabled:opacity-50">Từ chối (bulk)</button>
          </div>
        </div>

        {/* Queue list */}
        <div className="bg-white border rounded-md shadow-sm overflow-hidden">
          <div className="divide-y">
            {filtered.length === 0 && <div className="p-6 text-gray-500">Không có connect yêu cầu phù hợp.</div>}
            {filtered.map(item => (
              <div key={item.id} className="p-4 flex items-start justify-between hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggleSelect(item.id)} className="mt-2" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{item.fromOrg}</h4>
                      <span className="text-xs text-gray-500">→</span>
                      <div className="text-sm text-gray-700 font-medium">{item.toVolunteer.name}</div>
                      <span className="text-xs px-2 py-0.5 rounded-full text-gray-600 border ml-2">{item.event.title}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{humanDate(item.submittedAt)} • {item.reason}</div>

                    {/* AI Flags */}
                    {item.aiFlags && item.aiFlags.length > 0 && (
                      <div className="mt-2 flex gap-2">
                        {item.aiFlags.map((f, i) => (
                          <span key={i} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">
                            <AlertTriangle className="w-3 h-3" /> {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="text-xs text-gray-500">{item.status}</span>
                  <button title="Xem chi tiết" onClick={() => onEdit(item)} className="p-1 hover:bg-gray-100 rounded"><Eye className="w-4 h-4" /></button>
                  <button title="Duyệt" onClick={() => onApprove(item.id)} className="p-1 hover:bg-green-50 rounded text-green-600"><CheckCircle className="w-4 h-4" /></button>
                  <button title="Từ chối" onClick={() => onReject(item.id)} className="p-1 hover:bg-red-50 rounded text-red-600"><XCircle className="w-4 h-4" /></button>
                  <button title="Gắn cờ" onClick={() => onFlag(item.id)} className="p-1 hover:bg-yellow-50 rounded text-yellow-800"><Flag className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Chat / Proxy panel ---------- */
function ChatOverview({ conversations, onOpen }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Left: list */}
      <div className="lg:col-span-1 bg-white border rounded-md overflow-auto">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Conversations</h4>
            <button title="Filter" className="p-1"><Filter className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="divide-y">
          {conversations.map(c => {
            const last = c.messages[c.messages.length - 1];
            return (
              <div key={c.id} className="p-3 hover:bg-gray-50 cursor-pointer" onClick={() => onOpen(c.id)}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{c.participants.find(p => p.type === "org")?.name || "Org"}</div>
                    <div className="text-xs text-gray-500">{c.participants.find(p => p.type === "volunteer")?.name}</div>
                  </div>
                  <div className="text-xs text-gray-400">{c.unread ? <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs">{c.unread}</span> : null}</div>
                </div>
                <div className="text-xs text-gray-500 mt-1 truncate">{last?.text}</div>
                <div className="text-xs text-gray-400 mt-1">{humanDate(c.lastMessageAt)}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Center: placeholder or conversation */}
      <div className="lg:col-span-3 bg-white border rounded-md p-4">
        <div className="text-gray-500">Chọn conversation từ bên trái để mở chat (Proxy Chat). Phần này hỗ trợ masking contact và reveal có thời hạn.</div>
      </div>
    </div>
  );
}

/* ---------- Chat Conversation Page (route: /admin/connections/chat/:id) ---------- */
function ConversationPage({ conversations, onReport, onReveal }) {
  const { id } = useParams();
  const conv = conversations.find(c => c.id === id);
  const [revealTimeout, setRevealTimeout] = useState(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    return () => {
      if (revealTimeout) clearTimeout(revealTimeout);
    };
  }, [revealTimeout]);

  if (!conv) return <div className="p-6 text-gray-500">Conversation không tìm thấy.</div>;

  const volunteer = conv.participants.find(p => p.type === "volunteer");

  const handleReveal = () => {
    setRevealed(true);
    if (revealTimeout) clearTimeout(revealTimeout);
    const t = setTimeout(() => setRevealed(false), 60 * 1000); // reveal for 60s (policy/sample)
    setRevealTimeout(t);
    onReveal(conv.id, volunteer.id);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 bg-white border rounded-md p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-semibold">{conv.participants.find(p => p.type === "org")?.name} → {volunteer?.name}</div>
            <div className="text-xs text-gray-500">{humanDate(conv.lastMessageAt)}</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onReport(conv.id)} className="px-3 py-1 text-sm bg-red-100 rounded">Report</button>
            <button onClick={handleReveal} className="px-3 py-1 text-sm bg-blue-600 text-white rounded">Reveal Contact (60s)</button>
          </div>
        </div>

        <div className="border rounded-md p-4 h-[50vh] overflow-auto bg-gray-50">
          {conv.messages.map(m => (
            <div key={m.id} className={`mb-3 ${typeof m.from === "number" ? "text-left" : "text-right"}`}>
              <div className={`inline-block p-3 rounded ${typeof m.from === "number" ? "bg-white border" : "bg-blue-600 text-white"}`}>
                {m.text}
              </div>
              <div className="text-xs text-gray-400 mt-1">{humanDate(m.at)}</div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex gap-2">
          <input className="flex-1 px-3 py-2 border rounded" placeholder="Gửi tin nhắn (proxy)..." />
          <button className="px-3 py-2 bg-blue-600 text-white rounded">Gửi</button>
        </div>
      </div>

      {/* Right: profile (masked) */}
      <aside className="bg-white border rounded-md p-4">
        <div className="text-sm text-gray-600">Thông tin Volunteer (masked)</div>
        <div className="mt-3">
          <div className="font-semibold">{volunteer?.name}</div>
          <div className="text-xs text-gray-500 mt-1">Số điện thoại: {revealed ? "+84 912 345 678" : volunteer?.maskedPhone}</div>
          <div className="text-xs text-gray-500 mt-1">Email: {revealed ? "real.email@example.com" : volunteer?.maskedEmail}</div>
          <div className="text-xs text-gray-400 mt-2">Nếu reveal, contact được hiển thị tạm thời và có thể log lại cho audit.</div>
          <div className="mt-4 space-y-2">
            <button className="w-full px-3 py-2 bg-red-100 text-red-700 rounded">Request consent (TNV)</button>
            <button className="w-full px-3 py-2 border rounded">View volunteer profile (masked)</button>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* ---------- Main ConnectionsManagement component (routes inside) ---------- */
export default function ConnectionsManagement() {
  const [queue, setQueue] = useState(sampleQueue);
  const [conversations, setConversations] = useState(sampleConversations);
  const navigate = useNavigate();

  // handlers
  const approve = (id) => {
    setQueue(prev => prev.map(i => i.id === id ? { ...i, status: "approved", adminNote: `approved@${now()}` } : i));
    // optionally create conversation / open proxy chat
  };
  const reject = (id) => setQueue(prev => prev.map(i => i.id === id ? { ...i, status: "rejected", adminNote: `rejected@${now()}` } : i));
  const flag = (id) => setQueue(prev => prev.map(i => i.id === id ? { ...i, status: "flagged", adminNote: `flagged@${now()}` } : i));

  const bulkActionHandler = (action, selectedIds) => {
    if (!selectedIds?.length) return;
    if (action === "approve") selectedIds.forEach(approve);
    if (action === "reject") selectedIds.forEach(reject);
    if (action === "flag") selectedIds.forEach(flag);
  };

  const openQueueEdit = (item) => {
    // open side panel or modal — for demo use alert
    alert(`Open detail for Connect ${item.id}\nFrom: ${item.fromOrg}\nTo: ${item.toVolunteer.name}`);
  };

  const handleReport = (convId) => {
    // stub reporting
    alert(`Report conversation ${convId} — logged for moderation`);
  };

  const handleRevealContact = (convId, volunteerId) => {
    // audit log stub
    console.log("Revealed contact", { convId, volunteerId, at: now() });
  };

  // computed counts for tabs
  const counts = useMemo(() => {
    const all = queue.length;
    const pending = queue.filter(i => i.status === "pending").length;
    const auto = queue.filter(i => i.status === "auto-approved").length;
    const flagged = queue.filter(i => i.status === "flagged").length;
    return { all, pending, auto, flagged };
  }, [queue]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kết nối & Tin nhắn</h1>
          <p className="text-sm text-gray-500">Connect Queue + Proxy Chat – Luồng: BTC → Admin → TNV</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/admin/connections/queue" className="px-3 py-2 border rounded">Queue</Link>
          <Link to="/admin/connections/chat" className="px-3 py-2 border rounded">Proxy Chat</Link>
          <Link to="/admin/connections/logs" className="px-3 py-2 border rounded">Logs</Link>
        </div>
      </header>

      {/* Router inside page — these are subpages */}
      <Routes>
        <Route
          path="/"
          element={<div className="bg-white border p-6 rounded text-gray-600">Chọn tab Queue hoặc Chat để bắt đầu — hoặc dùng links phía trên.</div>}
        />
        <Route
          path="queue"
          element={
            <QueueView
              queue={queue}
              onApprove={(id) => { approve(id); }}
              onReject={(id) => { if (confirm("Từ chối yêu cầu?")) reject(id); }}
              onFlag={(id) => flag(id)}
              onEdit={(item) => openQueueEdit(item)}
              bulkActionHandler={bulkActionHandler}
            />
          }
        />
        <Route
          path="chat"
          element={<ChatOverview conversations={conversations} onOpen={(convId) => navigate(`/admin/connections/chat/${convId}`)} />}
        />
        <Route
          path="chat/:id"
          element={<ConversationPage conversations={conversations} onReport={handleReport} onReveal={handleRevealContact} />}
        />
        <Route
          path="logs"
          element={
            <div className="bg-white border rounded-md p-4">
              <h3 className="font-semibold">Audit & Activity Logs</h3>
              <div className="mt-3 text-sm text-gray-600">
                {/* stubbed list */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div>Admin A approved connect #101</div>
                    <div className="text-xs text-gray-400">{humanDate(now())}</div>
                  </div>
                  <div className="flex justify-between">
                    <div>System auto-approved connect #103 by rule (partner verified)</div>
                    <div className="text-xs text-gray-400">{humanDate(now())}</div>
                  </div>
                </div>
              </div>
            </div>
          }
        />

        {/* fallback */}
        <Route path="*" element={<div className="text-gray-500 p-6">Không tìm thấy.</div>} />
      </Routes>
    </div>
  );
}
