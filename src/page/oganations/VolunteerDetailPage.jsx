import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * VolunteerDetailPage
 * - Role: BTC (ban tổ chức) xem & quản lý hồ sơ tình nguyện viên
 * - Sections: Personal info, Contact, Bio, Experience & Skills, Event history, Admin notes & actions
 * - Data: demoVolunteers embedded (replace with API fetch easily)
 *
 * Usage:
 *  - /volunteer-detail?id=3  (will load volunteer with id=3)
 */

// -------- Demo data (subset) --------
const demoVolunteers = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    email: "nguyen.van.an@email.com",
    phone: "0901234567",
    role: "event_coordinator",
    status: "active",
    experience: "experienced",
    availability: "weekends",
    location: "Hanoi",
    skills: ["event_management", "communication", "leadership"],
    joinDate: "2024-01-15",
    created_at: "2024-01-15T10:30:00Z",
    lastActive: "2024-09-08",
    completedTasks: 15,
    rating: 4.8,
    avatarColor: "from-green-400 to-blue-500",
    bio: "Mình có 3 năm kinh nghiệm điều phối sự kiện cộng đồng, ưu tiên làm việc theo nhóm, có khả năng dẫn dắt và đào tạo tình nguyện viên mới.",
    events: [
      { id: "E001", title: "Giáo dục môi trường Mù Cang Chải", role: "Facilitator", date: "2025-02-15", impact: "200 học sinh" },
      { id: "E010", title: "Trồng rừng Đà Lạt", role: "Team Lead", date: "2025-03-01", impact: "1.000 cây" }
    ]
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    email: "tran.thi.binh@email.com",
    phone: "0912345678",
    role: "community_outreach",
    status: "active",
    experience: "intermediate",
    availability: "flexible",
    location: "Ho Chi Minh",
    skills: ["communication", "social_media", "outreach"],
    joinDate: "2024-02-20",
    created_at: "2024-02-20T14:15:00Z",
    lastActive: "2024-09-09",
    completedTasks: 12,
    rating: 4.6,
    avatarColor: "from-purple-400 to-pink-500",
    bio: "Đam mê hoạt động cộng đồng, có kinh nghiệm chạy chiến dịch gây quỹ nhỏ, am hiểu social media.",
    events: [
      { id: "E005", title: "Dạy tiếng Anh cho trẻ em", role: "Volunteer", date: "2025-02-20", impact: "50 học sinh" }
    ]
  },
  {
    id: 3,
    name: "Lê Văn Cường",
    email: "le.van.cuong@email.com",
    phone: "0923456789",
    role: "fundraising",
    status: "pending",
    experience: "beginner",
    availability: "weekdays",
    location: "Da Nang",
    skills: ["sales", "networking"],
    joinDate: "2024-08-30",
    created_at: "2024-08-30T09:20:00Z",
    lastActive: "2024-09-05",
    completedTasks: 2,
    rating: 4.2,
    avatarColor: "from-yellow-400 to-orange-500",
    bio: "Mới gia nhập nhưng có kinh nghiệm bán hàng và networking cho các dự án nhỏ. Muốn học hỏi về gây quỹ.",
    events: []
  }
];

// -------- Helpers --------
const toTitle = (s) =>
  String(s || "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

const formatDate = (iso) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString("vi-VN", { year: "numeric", month: "short", day: "numeric" });
};

// -------- Component --------
export default function VolunteerDetailPage() {
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get("id");
  const volunteerId = idParam ? Number(idParam) : null;

  // UI & data states
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [volunteer, setVolunteer] = useState(null);
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("volunteer_notes") || "{}");
    } catch {
      return {};
    }
  });
  const [adminNote, setAdminNote] = useState("");
  const [status, setStatus] = useState(""); // active/pending/inactive/shortlisted
  const [actionLoading, setActionLoading] = useState(false);
  const [showContactPanel, setShowContactPanel] = useState(false);

  // simulate load
  useEffect(() => {
    setLoading(true);
    setIsError(false);
    const t = setTimeout(() => {
      const found = volunteerId ? demoVolunteers.find((v) => v.id === volunteerId) : demoVolunteers[0];
      if (!found) {
        setIsError(true);
        setLoading(false);
        return;
      }
      setVolunteer(found);
      setAdminNote(notes[found.id] || "");
      setStatus(found.status || "pending");
      setLoading(false);
    }, 400);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volunteerId]);

  // Save admin note to localStorage
  const saveNote = (id, text) => {
    const copy = { ...(notes || {}) };
    copy[id] = text;
    setNotes(copy);
    localStorage.setItem("volunteer_notes", JSON.stringify(copy));
    setAdminNote(text);
  };

  // Actions
  const performAction = async (action) => {
    if (!volunteer) return;
    setActionLoading(true);
    await new Promise((r) => setTimeout(r, 500)); // mock API call
    if (action === "shortlist") {
      setStatus("shortlisted");
      setVolunteer((v) => ({ ...v, status: "shortlisted" }));
    } else if (action === "activate") {
      setStatus("active");
      setVolunteer((v) => ({ ...v, status: "active" }));
    } else if (action === "reject") {
      setStatus("inactive");
      setVolunteer((v) => ({ ...v, status: "inactive" }));
    }
    setActionLoading(false);
    const msg = `${toTitle(action)} performed`;
    setNotification({ type: "success", message: msg });
  };

  // Small notification state
  const [notification, setNotification] = useState(null);
  useEffect(() => {
    if (!notification) return;
    const t = setTimeout(() => setNotification(null), 3000);
    return () => clearTimeout(t);
  }, [notification]);

  // Export full profile as JSON or minimal CSV
  const exportProfileJSON = () => {
    if (!volunteer) return;
    const blob = new Blob([JSON.stringify(volunteer, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `volunteer_${volunteer.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportProfileCSV = () => {
    if (!volunteer) return;
    const keys = ["id", "name", "email", "phone", "role", "location", "experience", "availability", "skills", "rating"];
    const row = keys.map((k) => {
      const val = volunteer[k];
      return typeof val === "object" ? `"${(val || []).join(";")}"` : `"${String(val ?? "").replace(/"/g, '""')}"`;
    }).join(",");
    const csv = `${keys.join(",")}\n${row}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `volunteer_${volunteer.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Print profile
  const printRef = useRef();
  const handlePrint = () => {
    if (!printRef.current) return;
    const printContents = printRef.current.innerHTML;
    const w = window.open("", "_blank");
    w.document.write(`<html><head><title>Volunteer Profile</title><meta charset="utf-8"><style>body{font-family: Arial, sans-serif;padding:20px}</style></head><body>${printContents}</body></html>`);
    w.document.close();
    w.focus();
    w.print();
    w.close();
  };

  // Early states
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full mx-auto mb-4" />
          <div className="text-gray-600">Đang tải hồ sơ tình nguyện viên...</div>
        </div>
      </div>
    );
  }

  if (isError || !volunteer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 text-2xl mb-2">Không tìm thấy hồ sơ</div>
          <div className="text-gray-600 mb-4">Yêu cầu sai ID hoặc hồ sơ đã bị xóa.</div>
        </div>
      </div>
    );
  }

  // derived
  const eventCount = volunteer.events?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top actions & header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`h-20 w-20 rounded-full bg-gradient-to-br ${volunteer.avatarColor} flex items-center justify-center text-white text-2xl font-bold`}>
              {volunteer.name?.charAt(0) || "U"}
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{volunteer.name}</h1>
              <div className="text-sm text-gray-500">
                {toTitle(volunteer.role)} • {volunteer.location} • joined {formatDate(volunteer.joinDate)}
              </div>
              <div className="mt-2 flex items-center gap-3">
                <div className="text-sm text-gray-700">Status:</div>
                <div className={`px-2 py-1 rounded text-sm font-medium ${
                  status === "active" ? "bg-green-100 text-green-800" :
                  status === "pending" ? "bg-yellow-100 text-yellow-800" :
                  status === "shortlisted" ? "bg-indigo-100 text-indigo-800" :
                  "bg-red-100 text-red-800"
                }`}>{status?.toUpperCase()}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setShowContactPanel((s) => !s)} className="px-3 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-50">Contact</button>
            <button onClick={() => performAction("shortlist")} disabled={actionLoading} className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">{actionLoading ? "..." : "Shortlist"}</button>
            <button onClick={() => performAction("activate")} disabled={actionLoading} className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Activate</button>
            <button onClick={() => performAction("reject")} disabled={actionLoading} className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Reject</button>
            <div className="border-l h-8" />
            <button onClick={exportProfileJSON} className="px-3 py-2 bg-gray-100 rounded-md">Export JSON</button>
            <button onClick={exportProfileCSV} className="px-3 py-2 bg-gray-100 rounded-md">Export CSV</button>
            <button onClick={handlePrint} className="px-3 py-2 bg-gray-100 rounded-md">Print</button>
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className="p-3 rounded border bg-blue-50 border-blue-200 text-blue-800">
            {notification.message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: summary & contact & admin notes */}
          <div className="lg:col-span-1 space-y-4">
            {/* Quick summary */}
            <div className="bg-white rounded-lg p-4 border shadow-sm">
              <h3 className="text-sm font-medium text-gray-700">Quick Summary</h3>
              <div className="mt-3 space-y-2 text-sm text-gray-700">
                <div><span className="font-medium">Rating:</span> {volunteer.rating} / 5</div>
                <div><span className="font-medium">Completed tasks:</span> {volunteer.completedTasks}</div>
                <div><span className="font-medium">Last active:</span> {formatDate(volunteer.lastActive)}</div>
                <div><span className="font-medium">Events participated:</span> {eventCount}</div>
              </div>
            </div>

            {/* Contact panel */}
            <div className="bg-white rounded-lg p-4 border shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">Contact Information</h3>
                <button onClick={() => setShowContactPanel((s) => !s)} className="text-sm text-gray-500">{showContactPanel ? "Hide" : "Show"}</button>
              </div>

              {showContactPanel ? (
                <div className="mt-3 text-sm text-gray-700 space-y-2">
                  <div><span className="font-medium">Email:</span> <a href={`mailto:${volunteer.email}`} className="text-blue-600">{volunteer.email}</a></div>
                  <div><span className="font-medium">Phone:</span> <a href={`tel:${volunteer.phone}`} className="text-blue-600">{volunteer.phone}</a></div>
                  <div><span className="font-medium">Location:</span> {volunteer.location}</div>
                  <div className="mt-3 flex gap-2">
                    <a href={`mailto:${volunteer.email}?subject=Invitation to volunteer`} className="px-3 py-2 bg-blue-600 text-white rounded">Email</a>
                    <a href={`tel:${volunteer.phone}`} className="px-3 py-2 bg-gray-100 rounded">Call</a>
                    <button onClick={() => { navigator.clipboard?.writeText(volunteer.email + " / " + volunteer.phone); setNotification({ type: "info", message: "Copied contact to clipboard" }); }} className="px-3 py-2 bg-gray-100 rounded">Copy</button>
                  </div>
                </div>
              ) : (
                <div className="mt-3 text-sm text-gray-500">Contact hidden — click <strong>Show</strong> to view details.</div>
              )}
            </div>

            {/* Admin notes */}
            <div className="bg-white rounded-lg p-4 border shadow-sm">
              <h3 className="text-sm font-medium text-gray-700">Admin Notes</h3>
              <textarea
                placeholder="Ghi chú nội bộ (ví dụ: ưu tiên, feedback phỏng vấn...)"
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                className="w-full mt-3 p-3 border rounded min-h-[120px] focus:ring-2 focus:ring-blue-500"
              />
              <div className="mt-3 flex items-center gap-2">
                <button onClick={() => saveNote(volunteer.id, adminNote)} className="px-3 py-2 bg-blue-600 text-white rounded">Save Note</button>
                <button onClick={() => { setAdminNote(""); saveNote(volunteer.id, ""); }} className="px-3 py-2 bg-gray-200 rounded">Clear</button>
                <div className="text-sm text-gray-500 ml-auto">Saved locally</div>
              </div>
            </div>
          </div>

          {/* Right column: full profile */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg p-6 border shadow-sm" ref={printRef}>
              {/* Basic info & bio */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900">Thông tin cá nhân</h2>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <div className="mb-2"><span className="font-medium">Họ và tên:</span> {volunteer.name}</div>
                    <div className="mb-2"><span className="font-medium">Vai trò mong muốn:</span> {toTitle(volunteer.role)}</div>
                    <div className="mb-2"><span className="font-medium">Kinh nghiệm:</span> {toTitle(volunteer.experience)}</div>
                  </div>
                  <div>
                    <div className="mb-2"><span className="font-medium">Sẵn sàng:</span> {toTitle(volunteer.availability)}</div>
                    <div className="mb-2"><span className="font-medium">Địa điểm:</span> {volunteer.location}</div>
                    <div className="mb-2"><span className="font-medium">Rating:</span> {volunteer.rating} / 5</div>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-medium text-gray-700">Mô tả bản thân</h3>
                  <p className="mt-2 text-sm text-gray-700">{volunteer.bio || "Chưa có mô tả"}</p>
                </div>
              </section>

              {/* Skills & experience */}
              <section className="mt-6">
                <h3 className="text-md font-semibold text-gray-900">Kỹ năng & Kinh nghiệm</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {volunteer.skills?.map((s) => (
                    <span key={s} className="px-3 py-1 bg-indigo-50 text-indigo-800 rounded-full text-xs">{toTitle(s)}</span>
                  ))}
                </div>

                <div className="mt-4 text-sm text-gray-700">
                  <div><span className="font-medium">Số nhiệm vụ hoàn thành:</span> {volunteer.completedTasks}</div>
                  <div className="mt-2"><span className="font-medium">Hoạt động gần nhất:</span> {formatDate(volunteer.lastActive)}</div>
                </div>
              </section>

              {/* Events participated (timeline) */}
              <section className="mt-6">
                <h3 className="text-md font-semibold text-gray-900">Các sự kiện đã tham gia ({eventCount})</h3>
                {eventCount === 0 ? (
                  <div className="mt-3 text-sm text-gray-500">Chưa có sự kiện nào</div>
                ) : (
                  <ul className="mt-3 space-y-3">
                    {volunteer.events.map((ev) => (
                      <li key={ev.id} className="border rounded p-3 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{ev.title}</div>
                            <div className="text-sm text-gray-500">{toTitle(ev.role)} • {formatDate(ev.date)}</div>
                          </div>
                          <div className="text-sm text-gray-600">{ev.impact}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>

            {/* Activity Log / quick actions */}
            <div className="bg-white rounded-lg p-4 border shadow-sm">
              <h3 className="text-md font-semibold text-gray-900">Activity & Quick Actions</h3>
              <div className="mt-3 flex flex-col md:flex-row md:items-center gap-3">
                <button onClick={() => { setNotification({ type: "info", message: "Message sent (mock)." }); }} className="px-3 py-2 bg-blue-600 text-white rounded">Message</button>
                <button onClick={() => { setNotification({ type: "info", message: "Interview scheduled (mock)." }); }} className="px-3 py-2 bg-yellow-500 text-white rounded">Schedule Interview</button>
                <button onClick={() => { navigator.clipboard?.writeText(JSON.stringify(volunteer)); setNotification({ type: "info", message: "Profile copied to clipboard" }); }} className="px-3 py-2 bg-gray-200 rounded">Copy JSON</button>

                <div className="ml-auto text-sm text-gray-500">Last updated: {formatDate(volunteer.created_at)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer small */}
        <div className="text-right text-xs text-gray-400">Hồ sơ này chỉ là demo — thay bằng API thật khi tích hợp.</div>
      </div>
    </div>
  );
}
