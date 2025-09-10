import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";

/**
 * VolunteerRecommendationPage
 * - Optimized for recommending volunteers from demo data.
 * - Includes filters, scoring algorithm, details modal, bulk actions and CSV export.
 */

// ---------- Demo data (you provided) ----------
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
    rating: 4.8
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
    rating: 4.6
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
    rating: 4.2
  },
  {
    id: 4,
    name: "Phạm Thị Dung",
    email: "pham.thi.dung@email.com",
    phone: "0934567890",
    role: "admin_support",
    status: "active",
    experience: "expert",
    availability: "weekdays",
    location: "Hanoi",
    skills: ["administration", "data_entry", "organization"],
    joinDate: "2023-11-10",
    created_at: "2023-11-10T16:45:00Z",
    lastActive: "2024-09-09",
    completedTasks: 28,
    rating: 4.9
  },
  {
    id: 5,
    name: "Hoàng Văn Em",
    email: "hoang.van.em@email.com",
    phone: "0945678901",
    role: "technical_support",
    status: "inactive",
    experience: "experienced",
    availability: "limited",
    location: "Hanoi",
    skills: ["programming", "troubleshooting", "training"],
    joinDate: "2024-03-05",
    created_at: "2024-03-05T11:30:00Z",
    lastActive: "2024-08-15",
    completedTasks: 8,
    rating: 4.4
  },
  {
    id: 6,
    name: "Vũ Thị Giang",
    email: "vu.thi.giang@email.com",
    phone: "0956789012",
    role: "event_coordinator",
    status: "active",
    experience: "intermediate",
    availability: "weekends",
    location: "Ho Chi Minh",
    skills: ["event_planning", "coordination", "teamwork"],
    joinDate: "2024-04-12",
    created_at: "2024-04-12T13:20:00Z",
    lastActive: "2024-09-08",
    completedTasks: 11,
    rating: 4.7
  },
  {
    id: 7,
    name: "Đỗ Văn Hải",
    email: "do.van.hai@email.com",
    phone: "0967890123",
    role: "community_outreach",
    status: "pending",
    experience: "beginner",
    availability: "flexible",
    location: "Da Nang",
    skills: ["communication", "research"],
    joinDate: "2024-09-01",
    created_at: "2024-09-01T08:15:00Z",
    lastActive: "2024-09-07",
    completedTasks: 1,
    rating: 4.0
  },
  {
    id: 8,
    name: "Bùi Thị Hoa",
    email: "bui.thi.hoa@email.com",
    phone: "0978901234",
    role: "fundraising",
    status: "active",
    experience: "experienced",
    availability: "weekdays",
    location: "Hanoi",
    skills: ["fundraising", "donor_relations", "event_planning"],
    joinDate: "2023-12-18",
    created_at: "2023-12-18T15:30:00Z",
    lastActive: "2024-09-09",
    completedTasks: 22,
    rating: 4.8
  },
  {
    id: 9,
    name: "Ngô Văn Ích",
    email: "ngo.van.ich@email.com",
    phone: "0989012345",
    role: "admin_support",
    status: "active",
    experience: "intermediate",
    availability: "weekdays",
    location: "Ho Chi Minh",
    skills: ["data_analysis", "reporting", "coordination"],
    joinDate: "2024-05-20",
    created_at: "2024-05-20T10:45:00Z",
    lastActive: "2024-09-08",
    completedTasks: 9,
    rating: 4.5
  },
  {
    id: 10,
    name: "Lý Thị Kim",
    email: "ly.thi.kim@email.com",
    phone: "0990123456",
    role: "technical_support",
    status: "inactive",
    experience: "expert",
    availability: "limited",
    location: "Da Nang",
    skills: ["web_development", "database", "training"],
    joinDate: "2024-01-30",
    created_at: "2024-01-30T12:00:00Z",
    lastActive: "2024-07-20",
    completedTasks: 18,
    rating: 4.6
  }
];

const demoNotification = {
  type: "info",
  message: "Welcome to Volunteer Recommendation — you have sample volunteers ready.",
  timestamp: new Date().toISOString()
};

// ---------- Utilities ----------
const toTitle = (s) =>
  String(s || "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

const daysSince = (isoDate) => {
  if (!isoDate) return 9999;
  return Math.floor((Date.now() - new Date(isoDate).getTime()) / (1000 * 60 * 60 * 24));
};

const exportCSV = (rows, filename = "volunteers.csv") => {
  if (!rows || rows.length === 0) return;
  const keys = Object.keys(rows[0]);
  const csv = [
    keys.join(","),
    ...rows.map((r) =>
      keys
        .map((k) => {
          const cell = r[k] == null ? "" : String(r[k]).replace(/"/g, '""');
          return `"${cell}"`;
        })
        .join(",")
    )
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// ---------- Component ----------
export default function VolunteerRecommendationPage() {
  // core
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [notification, setNotification] = useState(demoNotification);

  // data & selection
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);

  // recommendation criteria
  const [desiredRole, setDesiredRole] = useState("event_coordinator");
  const [requiredSkills, setRequiredSkills] = useState(["communication"]);
  const [locationPref, setLocationPref] = useState("Hanoi"); // 'any' or specific
  const [availabilityPref, setAvailabilityPref] = useState("weekends"); // 'any' or specific
  const [minRating, setMinRating] = useState(4.0);

  // scoring weights (can be exposed in UI)
  const [weights, setWeights] = useState({
    skill: 0.5,
    rating: 0.2,
    availability: 0.15,
    location: 0.1,
    recency: 0.05
  });

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // UI modal
  const [showDetails, setShowDetails] = useState(false);
  const [detailVolunteer, setDetailVolunteer] = useState(null);

  // search (simple)
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);

  // Load demo data (simulate API)
  useEffect(() => {
    setLoading(true);
    setIsError(false);
    const t = setTimeout(() => {
      setVolunteers(demoVolunteers);
      setLoading(false);
    }, 600);

    return () => clearTimeout(t);
  }, []);

  // compute recommendation scores
  const scoredVolunteers = useMemo(() => {
    if (!volunteers || volunteers.length === 0) return [];

    const { skill: wSkill, rating: wRating, availability: wAvail, location: wLoc, recency: wRec } = weights;

    return volunteers.map((v) => {
      // skill overlap (normalized)
      const required = requiredSkills || [];
      const overlap = required.length > 0 ? v.skills.filter((s) => required.includes(s)).length : 0;
      const skillScore = required.length > 0 ? overlap / required.length : 0;

      // rating normalization (assume 0-5)
      const ratingScore = Math.max(0, Math.min(1, (v.rating || 0) / 5));

      // availability match (binary or partial)
      const availabilityScore =
        availabilityPref === "any" ? 1 : v.availability === availabilityPref ? 1 : v.availability === "flexible" ? 0.75 : 0;

      // location match
      const locationScore = locationPref === "any" ? 1 : v.location === locationPref ? 1 : 0;

      // recency: lastActive within 7 days best, older worse
      const days = daysSince(v.lastActive);
      const recencyScore = days <= 7 ? 1 : days <= 30 ? 0.6 : days <= 90 ? 0.3 : 0;

      // role match bonus
      const roleBonus = desiredRole ? (v.role === desiredRole ? 1 : v.role?.includes(desiredRole?.split("_")[0]) ? 0.6 : 0) : 1;

      // final score combined
      const rawScore =
        skillScore * wSkill +
        ratingScore * wRating +
        availabilityScore * wAvail +
        locationScore * wLoc +
        recencyScore * wRec;

      const finalScore = rawScore * roleBonus;

      return {
        ...v,
        score: Math.round(finalScore * 1000) / 1000,
        skillScore,
        ratingScore,
        availabilityScore,
        locationScore,
        recencyScore,
        roleBonus
      };
    });
  }, [volunteers, requiredSkills, availabilityPref, locationPref, minRating, desiredRole, weights]);

  // filtered & sorted recommendations
  const recommended = useMemo(() => {
    return scoredVolunteers
      .filter((v) => v.rating >= (minRating || 0))
      .filter((v) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          v.name.toLowerCase().includes(q) ||
          v.email.toLowerCase().includes(q) ||
          (v.skills || []).some((s) => s.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => b.score - a.score);
  }, [scoredVolunteers, minRating, searchQuery]);

  // pagination slice
  const totalPages = Math.max(1, Math.ceil(recommended.length / itemsPerPage));
  const paginated = useMemo(() => {
    const s = (currentPage - 1) * itemsPerPage;
    return recommended.slice(s, s + itemsPerPage);
  }, [recommended, currentPage, itemsPerPage]);

  // selection handlers
  const toggleSelect = (id) =>
    setSelectedVolunteers((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const selectAllOnPage = () => {
    const ids = paginated.map((v) => v.id);
    const allSelected = ids.every((id) => selectedVolunteers.includes(id));
    setSelectedVolunteers((prev) => (allSelected ? prev.filter((x) => !ids.includes(x)) : Array.from(new Set([...prev, ...ids]))));
  };

  // bulk action (mock)
  const [actionLoading, setActionLoading] = useState(false);
  const performBulk = async (action) => {
    if (selectedVolunteers.length === 0) {
      setNotification({ type: "warning", message: "No volunteers selected.", timestamp: new Date().toISOString() });
      return;
    }
    setActionLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    if (action === "activate") {
      setVolunteers((prev) => prev.map((v) => (selectedVolunteers.includes(v.id) ? { ...v, status: "active" } : v)));
    } else if (action === "delete") {
      setVolunteers((prev) => prev.filter((v) => !selectedVolunteers.includes(v.id)));
    }
    setSelectedVolunteers([]);
    setActionLoading(false);
    setNotification({ type: "success", message: `Bulk ${action} performed.`, timestamp: new Date().toISOString() });
  };

  // quick add/remove skill in criteria
  const addRequiredSkill = (skill) => {
    if (!skill) return;
    setRequiredSkills((prev) => (prev.includes(skill) ? prev : [...prev, skill]));
  };
  const removeRequiredSkill = (skill) => setRequiredSkills((prev) => prev.filter((s) => s !== skill));

  // details modal
  const openDetails = (vol) => {
    setDetailVolunteer(vol);
    setShowDetails(true);
  };

  // small debounce for search input (local)
  useEffect(() => {
    if (!searchRef.current) return;
    const id = setTimeout(() => {
      // nothing additional: searchQuery already set by onChange
    }, 250);
    return () => clearTimeout(id);
  }, [searchQuery]);

  // UI small helpers
  const stats = useMemo(() => {
    const total = volunteers.length;
    return {
      total,
      active: volunteers.filter((v) => v.status === "active").length,
      pending: volunteers.filter((v) => v.status === "pending").length,
      avgRating: total > 0 ? (volunteers.reduce((s, v) => s + (v.rating || 0), 0) / total).toFixed(2) : "0"
    };
  }, [volunteers]);

  // Export selected to CSV
  const exportSelected = () => {
    const rows = volunteers.filter((v) => selectedVolunteers.includes(v.id)).map((v) => ({
      id: v.id,
      name: v.name,
      email: v.email,
      phone: v.phone,
      role: v.role,
      location: v.location,
      skills: (v.skills || []).join("; "),
      rating: v.rating,
      status: v.status
    }));
    exportCSV(rows, "selected_volunteers.csv");
  };

  // Reset demo
  const resetDemo = () => {
    setVolunteers(demoVolunteers);
    setNotification({ type: "info", message: "Demo reset.", timestamp: new Date().toISOString() });
  };

  // ---------- Render ----------
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Volunteer Recommendations</h1>
            <p className="text-sm text-gray-600 mt-1">Quickly find the best volunteers for a role using skill & activity matching.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm text-gray-500">Total volunteers</div>
              <div className="font-semibold text-lg">{stats.total}</div>
            </div>
            <button
              onClick={resetDemo}
              className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            >
              Reset Demo
            </button>
          </div>
        </header>

        {/* Notification */}
        {notification && (
          <div
            className={`p-3 rounded-md border ${
              notification.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : notification.type === "error"
                ? "bg-red-50 border-red-200 text-red-800"
                : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm">{notification.message}</div>
              <button onClick={() => setNotification(null)} className="text-sm font-medium text-gray-600">×</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: Criteria */}
          <aside className="lg:col-span-1 bg-white p-4 rounded-lg shadow border">
            <h3 className="text-lg font-medium mb-3">Recommendation Criteria</h3>

            <div className="space-y-3">
              {/* Desired role */}
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select value={desiredRole} onChange={(e) => setDesiredRole(e.target.value)} className="w-full border px-3 py-2 rounded">
                <option value="event_coordinator">Event Coordinator</option>
                <option value="community_outreach">Community Outreach</option>
                <option value="fundraising">Fundraising</option>
                <option value="admin_support">Admin Support</option>
                <option value="technical_support">Technical Support</option>
                <option value="any">Any</option>
              </select>

              {/* Required skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills</label>
                <div className="flex gap-2">
                  <input
                    id="skillInput"
                    className="flex-1 border px-3 py-2 rounded"
                    placeholder="Type a skill and press Add (e.g., communication)"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const val = e.target.value.trim();
                        if (val) {
                          addRequiredSkill(val.replace(/\s+/g, "_").toLowerCase());
                          e.target.value = "";
                        }
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const el = document.getElementById("skillInput");
                      const val = el?.value?.trim();
                      if (val) {
                        addRequiredSkill(val.replace(/\s+/g, "_").toLowerCase());
                        el.value = "";
                      }
                    }}
                    className="px-3 py-2 bg-blue-600 text-white rounded"
                  >
                    Add
                  </button>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {requiredSkills.map((s) => (
                    <span key={s} className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs flex items-center gap-2">
                      {toTitle(s)}
                      <button onClick={() => removeRequiredSkill(s)} className="ml-1 text-blue-600 hover:opacity-80">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Location & availability */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <select value={locationPref} onChange={(e) => setLocationPref(e.target.value)} className="w-full border px-3 py-2 rounded">
                  <option value="any">Any</option>
                  <option value="Hanoi">Hanoi</option>
                  <option value="Ho Chi Minh">Ho Chi Minh</option>
                  <option value="Da Nang">Da Nang</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Availability</label>
                <select value={availabilityPref} onChange={(e) => setAvailabilityPref(e.target.value)} className="w-full border px-3 py-2 rounded">
                  <option value="any">Any</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="weekends">Weekends</option>
                  <option value="flexible">Flexible</option>
                  <option value="limited">Limited</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Min rating</label>
                <input type="range" min="0" max="5" step="0.1" value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} />
                <div className="text-xs text-gray-500">{minRating} / 5</div>
              </div>

              {/* weight sliders */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Weights (skill / rating / avail / loc / recency)</label>
                <div className="flex flex-col gap-2">
                  <input type="range" min="0" max="1" step="0.05" value={weights.skill} onChange={(e) => setWeights((w) => ({ ...w, skill: Number(e.target.value) }))} />
                  <input type="range" min="0" max="1" step="0.05" value={weights.rating} onChange={(e) => setWeights((w) => ({ ...w, rating: Number(e.target.value) }))} />
                  <input type="range" min="0" max="1" step="0.05" value={weights.availability} onChange={(e) => setWeights((w) => ({ ...w, availability: Number(e.target.value) }))} />
                  <input type="range" min="0" max="1" step="0.05" value={weights.location} onChange={(e) => setWeights((w) => ({ ...w, location: Number(e.target.value) }))} />
                  <input type="range" min="0" max="1" step="0.05" value={weights.recency} onChange={(e) => setWeights((w) => ({ ...w, recency: Number(e.target.value) }))} />
                </div>
                <div className="text-xs text-gray-500 mt-1">Tip: weights should sum to ~1 but it's ok if not; the relative values matter.</div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => { setCurrentPage(1); setSelectedVolunteers([]); setNotification({ type: "info", message: "Recommendations refreshed", timestamp: new Date().toISOString() }); }} className="flex-1 px-3 py-2 bg-blue-600 text-white rounded">Recommend</button>
                <button onClick={() => exportCSV(recommended.slice(0, 100).map(v => ({ id: v.id, name: v.name, email: v.email, score: v.score })), "recommendations.csv")} className="px-3 py-2 bg-gray-200 rounded">Export</button>
              </div>
            </div>
          </aside>

          {/* Right: Results */}
          <main className="lg:col-span-3 space-y-4">
            {/* Controls */}
            <div className="bg-white p-4 rounded shadow border flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3">
                <button onClick={selectAllOnPage} className="px-3 py-2 bg-gray-100 rounded">Toggle select page</button>
                <button onClick={() => performBulk("activate")} disabled={actionLoading} className="px-3 py-2 bg-green-600 text-white rounded">Activate</button>
                <button onClick={() => performBulk("delete")} disabled={actionLoading} className="px-3 py-2 bg-red-600 text-white rounded">Delete</button>
                <button onClick={exportSelected} className="px-3 py-2 bg-indigo-600 text-white rounded">Export Selected</button>
              </div>

              <div className="flex items-center gap-3">
                <input
                  ref={searchRef}
                  placeholder="Search by name, email or skill..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border rounded px-3 py-2"
                />
                <div className="text-sm text-gray-600">Showing {recommended.length} matches</div>
              </div>
            </div>

            {/* Recommendation list */}
            <div className="bg-white p-4 rounded shadow border">
              {loading ? (
                <div className="text-center py-10">Loading...</div>
              ) : isError ? (
                <div className="text-center text-red-600 py-10">Error loading volunteers</div>
              ) : (
                <div>
                  <div className="grid gap-3">
                    {paginated.map((v) => (
                      <div key={v.id} className="flex items-center justify-between p-3 border rounded hover:shadow-sm transition">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                            {v.name?.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{v.name}</div>
                            <div className="text-sm text-gray-500">{v.email} · {v.phone}</div>
                            <div className="text-xs text-gray-400 mt-1">{toTitle(v.role)} • {v.location} • {toTitle(v.availability)}</div>
                            <div className="mt-1 flex gap-1 flex-wrap">
                              {(v.skills || []).slice(0, 6).map((s) => (
                                <span key={s} className="text-xs bg-gray-100 px-2 py-0.5 rounded">{toTitle(s)}</span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm font-semibold">{v.score}</div>
                            <div className="text-xs text-gray-500">score</div>
                          </div>

                          <div className="text-center">
                            <div className="text-sm font-medium">{v.rating}/5</div>
                            <div className="text-xs text-gray-400">rating</div>
                          </div>

                          <div>
                            <input type="checkbox" checked={selectedVolunteers.includes(v.id)} onChange={() => toggleSelect(v.id)} />
                          </div>

                          <div className="flex flex-col items-end gap-1">
                            <button onClick={() => openDetails(v)} className="text-blue-600 text-sm">View</button>
                            <button onClick={() => { setVolunteers((prev) => prev.map(p => p.id === v.id ? { ...p, status: "active" } : p)); setNotification({ type: "success", message: "Activated", timestamp: new Date().toISOString() }); }} className="text-green-600 text-sm">Activate</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Empty */}
                  {recommended.length === 0 && <div className="text-center py-8 text-gray-500">No matches — adjust criteria.</div>}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-600">Page {currentPage} of {totalPages}</div>
                  <div className="flex items-center gap-2">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} className="px-3 py-1 border rounded">Prev</button>
                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                        let pageNum;
                        if (totalPages <= 5) pageNum = i + 1;
                        else if (currentPage <= 3) pageNum = i + 1;
                        else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                        else pageNum = currentPage - 2 + i;
                        if (pageNum < 1 || pageNum > totalPages) return null;
                        return (
                          <button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={`px-3 py-1 rounded ${pageNum === currentPage ? "bg-blue-600 text-white" : "border"}`}>{pageNum}</button>
                        );
                      })}
                    </div>
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-1 border rounded">Next</button>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Details Modal */}
        {showDetails && detailVolunteer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowDetails(false)} />
            <div className="relative bg-white max-w-3xl w-full rounded shadow-lg p-6 z-10">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold">{detailVolunteer.name}</h3>
                <button onClick={() => setShowDetails(false)} className="text-gray-500">×</button>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600"><span className="font-medium">Email:</span> {detailVolunteer.email}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Phone:</span> {detailVolunteer.phone}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Role:</span> {toTitle(detailVolunteer.role)}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Location:</span> {detailVolunteer.location}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Status:</span> {detailVolunteer.status}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600"><span className="font-medium">Skills:</span></p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {detailVolunteer.skills?.map((s) => <span key={s} className="text-xs bg-gray-100 px-2 py-1 rounded">{toTitle(s)}</span>)}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <p><span className="font-medium">Completed tasks:</span> {detailVolunteer.completedTasks}</p>
                    <p><span className="font-medium">Rating:</span> {detailVolunteer.rating}/5</p>
                    <p><span className="font-medium">Last active:</span> {new Date(detailVolunteer.lastActive).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => { setShowDetails(false); setVolunteers((prev) => prev.map(p => p.id === detailVolunteer.id ? { ...p, status: "active" } : p)); }} className="px-4 py-2 bg-green-600 text-white rounded">Activate</button>
                <button onClick={() => { setShowDetails(false); setVolunteers((prev) => prev.filter(p => p.id !== detailVolunteer.id)); }} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
                <button onClick={() => setShowDetails(false)} className="px-4 py-2 bg-gray-200 rounded">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
