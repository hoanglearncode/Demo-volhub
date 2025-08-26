// src/components/SearchBanner.jsx
import React, { useEffect, useRef, useState } from "react";
import { Calendar, Search, Users } from "lucide-react";
import hooks from "../../hook/user/Home.jsx"; // đường dẫn đúng với project của bạn

const LOCATIONS = [
  "all",
  "Hà Nội",
  "Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
  "Nghệ An",
  "Quảng Ninh",
  "Thừa Thiên Huế",
  "Bình Dương",
  "Đồng Nai",
];

export default function SearchBanner() {
  const [imageUrl] = useState(
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=2073&q=80"
  );

  const [activeTab, setActiveTab] = useState("events"); // 'events' | 'volunteers'
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("all");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openResults, setOpenResults] = useState(false);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  // Click outside closed result box
  useEffect(() => {
    const onDoc = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenResults(false);
      }
    };
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, []);

  // Escape closes results
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpenResults(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Debounced search
  useEffect(() => {
    // open results when user types
    if (query.trim() !== "" || date || location !== "all") {
      setOpenResults(true);
    } else {
      // show featured by default
      setOpenResults(true);
    }

    setLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      (async () => {
        try {
          const list = await hooks.searchBoxResults({
            role: activeTab === "events" ? "event" : "volunteer",
            query,
            date,
            location,
          });
          setResults(Array.isArray(list) ? list : []);
        } catch (err) {
          console.error("search error", err);
          setResults([]);
        } finally {
          setLoading(false);
        }
      })();
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, date, location, activeTab]);

  // initial load: show featured
  useEffect(() => {
    (async () => {
      setLoading(true);
      const list = await hooks.searchBoxResults({ role: activeTab === "events" ? "event" : "volunteer" });
      setResults(Array.isArray(list) ? list : []);
      setLoading(false);
    })();
  }, [activeTab]);

  // keyboard: Enter triggers open and keep focus
  const onKeyDownInput = (e) => {
    if (e.key === "Enter") {
      setOpenResults(true);
    }
  };

  return (
    <section className="w-full shadow-lg bg-gray-800 relative overflow-visible">
      {/* Background */}
      <div className="absolute inset-0 z-0 rounded-2xl overflow-hidden">
        <img src={imageUrl} alt="banner" className="w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-indigo-900/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-10 sm:py-14 lg:py-16">
        <div className="max-w-6xl mx-auto flex flex-col gap-6 lg:gap-8">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
              Kết nối với chúng tôi
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mt-2">Hành trình tình nguyện mới bắt đầu!</p>
          </div>

          {/* Search block */}
          <div className="w-full bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20" ref={containerRef}>
            {/* Tabs */}
            <div className="flex w-full max-w-md mx-auto bg-white/20 rounded-full p-1 border border-white/30 mb-4">
              <button
                onClick={() => setActiveTab("events")}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition ${
                  activeTab === "events" ? "bg-white text-blue-600 shadow-md" : "text-white hover:bg-white/10"
                }`}
                aria-pressed={activeTab === "events"}
              >
                <Calendar className="w-4 h-4 text-gray-700" />
                <span className="hidden xs:inline">Tìm sự kiện</span>
                <span className="xs:hidden">Sự kiện</span>
              </button>

              <button
                onClick={() => setActiveTab("volunteers")}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition ${
                  activeTab === "volunteers" ? "bg-white text-blue-600 shadow-md" : "text-white hover:bg-white/10"
                }`}
                aria-pressed={activeTab === "volunteers"}
              >
                <Users className="w-4 h-4" />
                <span className="hidden xs:inline">Tìm tình nguyện viên</span>
                <span className="xs:hidden">TNV</span>
              </button>
            </div>

            {/* Inputs row */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch">
              {/* search input */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDownInput}
                  placeholder={activeTab === "events" ? "Tìm kiếm sự kiện..." : "Tìm kiếm tình nguyện viên..."}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  aria-label="Tìm kiếm"
                />

                {/* results dropdown (desktop & mobile) */}
                <div
                  className={`absolute left-0 right-0 mt-2 bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden transition-all ${
                    openResults ? "opacity-100 visible max-h-[60vh] overflow-auto" : "opacity-0 invisible max-h-0"
                  }`}
                  style={{ zIndex: 60 }}
                >
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-slate-700">
                        {loading ? "Đang tìm..." : `${results.length} kết quả`}
                      </div>
                      <div className="text-xs text-slate-400">{activeTab === "events" ? "Sự kiện" : "Tình nguyện viên"}</div>
                    </div>

                    {loading ? (
                      <div className="py-6 text-center text-sm text-slate-500">Đang tìm kết quả...</div>
                    ) : results.length === 0 ? (
                      <div className="py-6 text-center text-sm text-slate-500">Không có kết quả phù hợp.</div>
                    ) : (
                      <ul className="space-y-2">
                        {results.map((r) => (
                          <li key={r.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50">
                            <div className="w-14 h-10 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                              <img src={r.image} alt={r.title || r.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-4">
                                <div className="text-sm font-semibold text-slate-800 truncate">
                                  {r.title || r.name}
                                </div>
                                <div className="text-xs text-slate-400 whitespace-nowrap">
                                  {r.date ? new Date(r.date).toLocaleDateString() : r.location}
                                </div>
                              </div>
                              {r.subtitle && <div className="text-xs text-slate-500 truncate mt-1">{r.subtitle}</div>}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* date */}
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>

              {/* location select */}
              <div>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                  {LOCATIONS.map((l) => (
                    <option key={l} value={l}>
                      {l === "all" ? "Tất cả" : l}
                    </option>
                  ))}
                </select>
              </div>

              {/* search button */}
              <div>
                <button
                  onClick={() => {
                    // open results explicitly on search click
                    setOpenResults(true);
                    // perform immediate search (no debounce)
                    (async () => {
                      setLoading(true);
                      const list = await hooks.searchBoxResults({
                        role: activeTab === "events" ? "event" : "volunteer",
                        query,
                        date,
                        location,
                      });
                      setResults(Array.isArray(list) ? list : []);
                      setLoading(false);
                    })();
                  }}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow"
                >
                  Tìm kiếm
                </button>
              </div>
            </div>

            {/* popular tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              <div className="text-xs text-blue-100 mr-2 mt-0.5">Phổ biến:</div>
              {(activeTab === "events"
                ? ["Giáo dục", "Môi trường", "Y tế", "Trẻ em"]
                : ["Sinh viên", "Chuyên nghiệp", "Kinh nghiệm", "Kỹ năng"]
              ).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1 rounded-full bg-white/20 text-white text-xs"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
