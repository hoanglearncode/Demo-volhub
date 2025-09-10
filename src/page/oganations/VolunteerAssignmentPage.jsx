import React, { useEffect, useMemo, useState, useRef } from "react";

/**
 * VolunteerAssignmentPage
 * - Role: BTC assigns volunteers to events
 * - Features: event selection, volunteer search/filter, matching score & reasons,
 *   single/bulk assign/unassign, export assignments, view assignments modal.
 */

// ---------------- Demo Data ----------------
const demoVolunteers = [
  { id: 1, name: "Nguyễn Văn An", email: "nguyen.van.an@email.com", phone: "0901234567",
    role: "event_coordinator", status: "active", experience: "experienced", availability: "weekends",
    location: "Hanoi", skills: ["event_management","communication","leadership"], joinDate: "2024-01-15",
    lastActive: "2024-09-08", completedTasks: 15, rating: 4.8
  },
  { id: 2, name: "Trần Thị Bình", email: "tran.thi.binh@email.com", phone: "0912345678",
    role: "community_outreach", status: "active", experience: "intermediate", availability: "flexible",
    location: "Ho Chi Minh", skills: ["communication","social_media","outreach"], joinDate: "2024-02-20",
    lastActive: "2024-09-09", completedTasks: 12, rating: 4.6
  },
  { id: 3, name: "Lê Văn Cường", email: "le.van.cuong@email.com", phone: "0923456789",
    role: "fundraising", status: "pending", experience: "beginner", availability: "weekdays",
    location: "Da Nang", skills: ["sales","networking"], joinDate: "2024-08-30", lastActive: "2024-09-05",
    completedTasks: 2, rating: 4.2
  },
  { id: 4, name: "Phạm Thị Dung", email: "pham.thi.dung@email.com", phone: "0934567890",
    role: "admin_support", status: "active", experience: "expert", availability: "weekdays",
    location: "Hanoi", skills: ["administration","data_entry","organization"], joinDate: "2023-11-10",
    lastActive: "2024-09-09", completedTasks: 28, rating: 4.9
  },
  { id: 5, name: "Hoàng Văn Em", email: "hoang.van.em@email.com", phone: "0945678901",
    role: "technical_support", status: "inactive", experience: "experienced", availability: "limited",
    location: "Hanoi", skills: ["programming","troubleshooting","training"], joinDate: "2024-03-05",
    lastActive: "2024-08-15", completedTasks: 8, rating: 4.4
  }
];

const demoEvents = [
  { id: "E100", title: "Giáo dục môi trường Mù Cang Chải", date: "2025-02-15", location: "Yên Bái",
    requiredSkills: ["communication","leadership"], requiredRole: "event_coordinator", slots: 15
  },
  { id: "E101", title: "Trồng rừng Đà Lạt", date: "2025-03-01", location: "Đà Lạt",
    requiredSkills: ["teamwork","physical_endurance"], requiredRole: "community_outreach", slots: 25
  },
  { id: "E102", title: "Hội chợ gây quỹ", date: "2025-04-20", location: "Hanoi",
    requiredSkills: ["fundraising","communication"], requiredRole: "fundraising", slots: 10
  }
];

// ---------------- Utilities ----------------
const daysSince = (iso) => {
  if (!iso) return 9999;
  return Math.floor((Date.now() - new Date(iso).getTime()) / (1000*60*60*24));
};

const toTitle = (s) =>
  String(s || "").replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

const exportCSV = (rows, filename = "assignments.csv") => {
  if (!rows || rows.length === 0) return;
  const keys = Object.keys(rows[0]);
  const csv = [
    keys.join(","),
    ...rows.map((r) =>
      keys.map((k) => `"${String(r[k] ?? "").replace(/"/g,'""')}"`).join(",")
    )
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
};

// ---------------- Component ----------------
export default function VolunteerAssignmentPage() {
  // loading & data
  const [loading, setLoading] = useState(true);
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [assignments, setAssignments] = useState({}); // { eventId: [volunteerIds] }

  // UI controls
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);
  const [showAssignmentsModal, setShowAssignmentsModal] = useState(false);
  const [notification, setNotification] = useState(null);

  // scoring weights (tweakable)
  const weights = useMemo(() => ({ skills: 0.5, availability: 0.15, location: 0.15, rating: 0.15, recency: 0.05 }), []);

  // mock load
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setVolunteers(demoVolunteers);
      setEvents(demoEvents);
      // Mock previous assignments (empty)
      setAssignments({});
      setSelectedEventId(demoEvents[0]?.id || null);
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  // notify helper
  useEffect(() => {
    if (!notification) return;
    const t = setTimeout(() => setNotification(null), 3000);
    return () => clearTimeout(t);
  }, [notification]);

  // ---------- Matching & Filtering ----------
  const scored = useMemo(() => {
    const ev = events.find((e) => e.id === selectedEventId);
    return volunteers.map((v) => {
      let skillScore = 0;
      if (ev?.requiredSkills?.length) {
        const overlap = v.skills?.filter((s) => ev.requiredSkills.includes(s)).length || 0;
        skillScore = overlap / ev.requiredSkills.length;
      } else {
        skillScore = 0.2; // neutral
      }

      const availabilityScore = !ev ? 0.5 : (v.availability === "flexible" ? 1 : (v.availability === "weekends" && new Date(ev.date).getDay() % 6 === 0 ? 1 : (v.availability === "weekdays" && new Date(ev.date).getDay() % 6 !== 0 ? 1 : 0)));

      const locationScore = !ev ? 0.5 : (v.location === ev.location ? 1 : (v.location === "Hanoi" && ev.location === "Hanoi") ? 0.8 : 0);

      const ratingScore = Math.max(0, Math.min(1, (v.rating || 0) / 5));
      const recencyScore = daysSince(v.lastActive) <= 7 ? 1 : daysSince(v.lastActive) <= 30 ? 0.6 : 0.2;

      const raw = skillScore * weights.skills + availabilityScore * weights.availability + locationScore * weights.location + ratingScore * weights.rating + recencyScore * weights.recency;

      const roleBonus = ev?.requiredRole ? (v.role === ev.requiredRole ? 1.0 : v.role?.includes(ev.requiredRole.split("_")[0]) ? 0.6 : 0.4) : 1;

      const finalScore = Math.round(raw * roleBonus * 1000) / 1000;

      // reasons array
      const reasons = [];
      if (skillScore > 0) reasons.push(`${Math.round(skillScore * 100)}% skills matched`);
      if (availabilityScore >= 1) reasons.push("Availability OK");
      if (locationScore >= 1) reasons.push("Local");
      if (ratingScore >= 0.8) reasons.push("High rating");
      if (recencyScore >= 1) reasons.push("Recently active");

      return { ...v, score: finalScore, reasons, skillScore, availabilityScore, locationScore, ratingScore, recencyScore, roleBonus };
    });
  }, [volunteers, events, selectedEventId, weights]);

  // filters & search applied
  const filtered = useMemo(() => {
    return scored.filter((v) => {
      if (filterRole !== "all" && v.role !== filterRole) return false;
      if (filterStatus !== "all" && v.status !== filterStatus) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return v.name.toLowerCase().includes(q) || v.email.toLowerCase().includes(q) || (v.skills||[]).some(s => s.includes(q));
      }
      return true;
    }).sort((a,b) => b.score - a.score);
  }, [scored, filterRole, filterStatus, search]);

  // pagination basics
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  useEffect(() => { if (currentPage > totalPages) setCurrentPage(1); }, [totalPages, currentPage]);

  const paginated = useMemo(() => {
    const s = (currentPage -1) * itemsPerPage;
    return filtered.slice(s, s + itemsPerPage);
  }, [filtered, currentPage]);

  // ---------- Assignment actions ----------
  const toggleSelectVolunteer = (id) => {
    setSelectedVolunteers((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const selectAllPage = () => {
    const ids = paginated.map(v => v.id);
    const allSelected = ids.every(id => selectedVolunteers.includes(id));
    setSelectedVolunteers(prev => allSelected ? prev.filter(x => !ids.includes(x)) : Array.from(new Set([...prev, ...ids])));
  };

  const assignToEvent = async (eventId, volIds) => {
    if (!eventId || !volIds?.length) {
      setNotification({ type: "error", message: "Chọn sự kiện và ít nhất 1 tình nguyện viên." });
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 500)); // mock API
    setAssignments(prev => {
      const copy = { ...prev };
      copy[eventId] = Array.from(new Set([...(copy[eventId] || []), ...volIds]));
      return copy;
    });
    // mark volunteers as assigned in their local state (optional)
    setVolunteers(prev => prev.map(v => volIds.includes(v.id) ? { ...v, status: v.status === "active" ? "active" : "assigned" } : v));
    setSelectedVolunteers([]);
    setLoading(false);
    setNotification({ type: "success", message: `Assigned ${volIds.length} volunteers to event ${eventId}` });
  };

  const unassignFromEvent = async (eventId, volId) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 300));
    setAssignments(prev => {
      const copy = { ...prev };
      copy[eventId] = (copy[eventId] || []).filter(id => id !== volId);
      return copy;
    });
    setLoading(false);
    setNotification({ type: "success", message: "Unassigned volunteer" });
  };

  const bulkAssignSelected = () => assignToEvent(selectedEventId, selectedVolunteers);

  const exportAssignments = () => {
    const rows = [];
    Object.keys(assignments).forEach(ev => {
      (assignments[ev] || []).forEach(volId => {
        const v = volunteers.find(x => x.id === volId);
        const e = events.find(x => x.id === ev);
        rows.push({
          eventId: ev,
          eventTitle: e?.title || "",
          volunteerId: volId,
          volunteerName: v?.name || "",
          volunteerEmail: v?.email || ""
        });
      });
    });
    exportCSV(rows, "assignments_export.csv");
  };

  // View assignments list for selected event
  const assignedForSelectedEvent = useMemo(() => {
    const arr = assignments[selectedEventId] || [];
    return arr.map(id => volunteers.find(v => v.id === id)).filter(Boolean);
  }, [assignments, selectedEventId, volunteers]);

  // ---------- Render ----------
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Volunteer Assignment</h1>
            <p className="text-sm text-gray-600 mt-1">Chọn sự kiện, tìm và gán tình nguyện viên phù hợp — hỗ trợ bulk assign & export.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">
              Events: <strong>{events.length}</strong>
            </div>
            <button onClick={() => setShowAssignmentsModal(true)} className="px-3 py-2 bg-white border rounded shadow-sm">View All Assignments</button>
            <button onClick={exportAssignments} className="px-3 py-2 bg-indigo-600 text-white rounded">Export</button>
          </div>
        </header>

        {/* Notification */}
        {notification && (
          <div className={`rounded p-3 ${notification.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
            {notification.message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Events list */}
          <aside className="lg:col-span-1 bg-white p-4 rounded shadow border space-y-4">
            <h3 className="font-medium">Events</h3>
            <div className="space-y-3">
              {events.map(ev => (
                <div key={ev.id} className={`p-3 rounded border ${selectedEventId === ev.id ? "ring-2 ring-blue-300 bg-blue-50" : "bg-white"}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium">{ev.title}</div>
                      <div className="text-xs text-gray-500">{ev.date} • {ev.location}</div>
                      <div className="text-xs text-gray-500 mt-1">Slots: {ev.slots} • Role: {toTitle(ev.requiredRole)}</div>
                      <div className="text-xs text-gray-500 mt-1">Skills: {(ev.requiredSkills||[]).map(s=>toTitle(s)).join(", ")}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button onClick={() => setSelectedEventId(ev.id)} className="px-2 py-1 bg-white border rounded text-sm">Select</button>
                      <div className="text-xs text-gray-500">{(assignments[ev.id] || []).length} assigned</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t mt-2">
              <button onClick={() => { setSelectedEventId(events[0]?.id || null); setNotification({ type: "info", message: "Selected first event" }); }} className="w-full px-3 py-2 bg-gray-100 rounded">Select first</button>
            </div>
          </aside>

          {/* Volunteers & actions */}
          <main className="lg:col-span-3 space-y-4">
            <div className="bg-white p-4 rounded shadow border">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-center gap-2">
                  <input placeholder="Search name / email / skill" className="border px-3 py-2 rounded w-72" value={search} onChange={(e)=> { setSearch(e.target.value); setCurrentPage(1); }} />
                  <select value={filterRole} onChange={e=>setFilterRole(e.target.value)} className="border px-3 py-2 rounded">
                    <option value="all">All roles</option>
                    <option value="event_coordinator">Event Coordinator</option>
                    <option value="community_outreach">Community Outreach</option>
                    <option value="fundraising">Fundraising</option>
                    <option value="admin_support">Admin Support</option>
                    <option value="technical_support">Technical Support</option>
                  </select>
                  <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} className="border px-3 py-2 rounded">
                    <option value="all">All status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-600">Selected: <strong>{selectedVolunteers.length}</strong></div>
                  <button onClick={selectAllPage} className="px-3 py-2 bg-gray-100 rounded">Toggle page select</button>
                  <button onClick={bulkAssignSelected} disabled={!selectedEventId || !selectedVolunteers.length} className="px-3 py-2 bg-blue-600 text-white rounded">Assign selected</button>
                  <button onClick={() => assignToEvent(selectedEventId, [filtered[0]?.id].filter(Boolean))} className="px-3 py-2 bg-green-100 rounded text-sm">Quick assign top match</button>
                </div>
              </div>
            </div>

            {/* Volunteers list (paginated) */}
            <div className="bg-white p-4 rounded shadow border">
              <div className="space-y-3">
                {paginated.map(v => {
                  const alreadyAssigned = (assignments[selectedEventId] || []).includes(v.id);
                  return (
                    <div key={v.id} className="flex items-center justify-between p-3 border rounded hover:shadow-sm transition">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white flex items-center justify-center font-semibold">{v.name?.charAt(0)}</div>
                        <div>
                          <div className="font-medium">{v.name} <span className="text-xs text-gray-500">({toTitle(v.role)})</span></div>
                          <div className="text-xs text-gray-500">{v.email} • {v.phone}</div>
                          <div className="text-xs text-gray-400">{v.location} • {v.availability}</div>
                          <div className="text-xs text-gray-500 mt-1">Skills: {(v.skills||[]).slice(0,5).map(s=>toTitle(s)).join(", ")}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-semibold">{v.score ?? 0}</div>
                          <div className="text-xs text-gray-500">score</div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <div className="flex gap-2">
                            <input type="checkbox" checked={selectedVolunteers.includes(v.id)} onChange={()=>toggleSelectVolunteer(v.id)} />
                            <button onClick={()=>assignToEvent(selectedEventId, [v.id])} disabled={!selectedEventId || alreadyAssigned} className={`px-3 py-1 rounded text-sm ${alreadyAssigned ? "bg-gray-200 text-gray-600" : "bg-blue-600 text-white"}`}>{alreadyAssigned ? "Assigned" : "Assign"}</button>
                          </div>
                          <div className="text-xs text-gray-400">{v.reasons?.slice(0,2).join(" • ")}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filtered.length === 0 && <div className="text-center py-6 text-gray-500">No volunteers match</div>}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-600">Page {currentPage} / {totalPages}</div>
                  <div className="flex items-center gap-2">
                    <button disabled={currentPage===1} onClick={()=>setCurrentPage(p=>Math.max(1,p-1))} className="px-3 py-1 border rounded">Prev</button>
                    <button disabled={currentPage===totalPages} onClick={()=>setCurrentPage(p=>Math.min(totalPages,p+1))} className="px-3 py-1 border rounded">Next</button>
                  </div>
                </div>
              )}
            </div>

            {/* Assigned list for selected event */}
            <div className="bg-white p-4 rounded shadow border">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Assigned to {selectedEventId || "---"}</h3>
                <div className="flex items-center gap-2">
                  <button onClick={() => exportCSV((assignedForSelectedEvent || []).map(v=>({eventId:selectedEventId,eventTitle:events.find(e=>e.id===selectedEventId)?.title,volunteerId:v.id,volunteerName:v.name,volunteerEmail:v.email})), `assigned_${selectedEventId}.csv`)} className="px-3 py-2 bg-gray-100 rounded">Export event</button>
                  <button onClick={() => setAssignments({})} className="px-3 py-2 bg-red-100 rounded">Clear all assignments</button>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                {(assignedForSelectedEvent || []).map(v => (
                  <div key={v.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium">{v.name}</div>
                      <div className="text-xs text-gray-500">{v.email} • {v.phone}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => unassignFromEvent(selectedEventId, v.id)} className="px-3 py-1 bg-red-600 text-white rounded">Unassign</button>
                    </div>
                  </div>
                ))}
                {((assignedForSelectedEvent||[]).length === 0) && <div className="text-gray-500 text-sm">No volunteers assigned yet.</div>}
              </div>
            </div>
          </main>
        </div>

        {/* Assignments modal */}
        {showAssignmentsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={()=>setShowAssignmentsModal(false)} />
            <div className="relative bg-white w-full max-w-3xl rounded shadow p-4 z-10">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">All Assignments</h3>
                <button onClick={()=>setShowAssignmentsModal(false)} className="text-gray-600">Close</button>
              </div>
              <div className="mt-3 space-y-3">
                {Object.keys(assignments).length === 0 && <div className="text-sm text-gray-500">No assignments yet.</div>}
                {Object.entries(assignments).map(([evId, ids]) => (
                  <div key={evId} className="p-3 border rounded">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{events.find(e=>e.id===evId)?.title || evId}</div>
                        <div className="text-xs text-gray-500">{ids.length} volunteers</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={()=>exportCSV(ids.map(id=>({eventId:evId,eventTitle:events.find(e=>e.id===evId)?.title,volunteerId:id,volunteerName:volunteers.find(v=>v.id===id)?.name,volunteerEmail:volunteers.find(v=>v.id===id)?.email})), `assignments_${evId}.csv`)} className="px-2 py-1 bg-gray-100 rounded text-sm">Export</button>
                      </div>
                    </div>

                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {ids.map(id => {
                        const v = volunteers.find(x=>x.id===id);
                        return v ? (
                          <div key={id} className="p-2 border rounded text-sm flex items-center justify-between">
                            <div>
                              <div className="font-medium">{v.name}</div>
                              <div className="text-xs text-gray-500">{v.email}</div>
                            </div>
                            <div className="text-xs text-gray-400">{v.rating}/5</div>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
