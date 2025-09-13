import { useState, useMemo } from "react";
import { 
  Users, Calendar, MapPin, Star, Download, 
  Filter, Search, Eye, UserCheck, Target,
  BarChart3, PieChart, ArrowUp, ArrowDown, Minus,
  CheckCircle, XCircle, AlertCircle, RefreshCw,
  ExternalLink
} from "lucide-react";

/**
 * EventReportSingle - quản lý & thống kê cho một sự kiện
 * - Chọn 1 event ở top
 * - Metrics / Charts / Candidate list / Event details dựa trên event được chọn
 */

export default function RecruitmentReport() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [dateRange, setDateRange] = useState("3months");
  const [showFilters, setShowFilters] = useState(false);

  // Mock events
  const events = [
    {
      id: 1,
      name: "Tech Career Fair Hà Nội 2024",
      date: "2024-09-10",
      location: "Trung tâm Hội nghị Quốc gia",
      type: "Career Fair",
      status: "completed",
      applications: 856,
      interviews: 124,
      hired: 42,
      conversionRate: "4.9%",
      topPositions: ["Software Engineer", "Product Manager", "UI/UX Designer"],
      budget: "45,000,000 VNĐ",
      roi: "320%"
    },
    {
      id: 2,
      name: "Startup Jobs Expo 2024",
      date: "2024-08-15",
      location: "Trung tâm Thương mại Vincom",
      type: "Job Expo",
      status: "completed", 
      applications: 642,
      interviews: 89,
      hired: 28,
      conversionRate: "4.4%",
      topPositions: ["Marketing Executive", "Sales Manager", "Developer"],
      budget: "32,000,000 VNĐ",
      roi: "275%"
    },
    {
      id: 3,
      name: "IT Talent Hunt 2024",
      date: "2024-07-20",
      location: "Đại học Bách Khoa Hà Nội",
      type: "University Event",
      status: "completed",
      applications: 1194,
      interviews: 156,
      hired: 73,
      conversionRate: "6.1%",
      topPositions: ["Junior Developer", "Data Analyst", "QA Engineer"],
      budget: "28,000,000 VNĐ",
      roi: "410%"
    },
    {
      id: 4,
      name: "Digital Marketing Summit",
      date: "2024-09-25",
      location: "Lotte Center Hanoi",
      type: "Professional Event",
      status: "upcoming",
      applications: 0,
      interviews: 0,
      hired: 0,
      conversionRate: "0%",
      topPositions: ["Digital Marketer", "Content Creator", "SEO Specialist"],
      budget: "38,000,000 VNĐ",
      roi: "0%"
    }
  ];

  // Mock candidates (belonging to events by event name)
  const candidateData = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      email: "an.nguyen@email.com",
      phone: "0987654321",
      position: "Software Engineer",
      event: "Tech Career Fair Hà Nội 2024",
      experience: "3 năm",
      education: "Đại học Bách Khoa",
      status: "hired",
      interviewScore: 8.5,
      salary: "25,000,000 VNĐ",
      appliedDate: "2024-09-10",
      hiredDate: "2024-09-20"
    },
    {
      id: 2,
      name: "Trần Thị Bình", 
      email: "binh.tran@email.com",
      phone: "0976543210",
      position: "Product Manager",
      event: "Tech Career Fair Hà Nội 2024",
      experience: "5 năm",
      education: "Đại học Kinh tế Quốc dân",
      status: "interviewed",
      interviewScore: 7.2,
      salary: "35,000,000 VNĐ",
      appliedDate: "2024-09-10",
      hiredDate: null
    },
    {
      id: 3,
      name: "Lê Minh Cường",
      email: "cuong.le@email.com", 
      phone: "0965432109",
      position: "UI/UX Designer",
      event: "Startup Jobs Expo 2024",
      experience: "2 năm",
      education: "Đại học Mỹ thuật",
      status: "hired",
      interviewScore: 9.1,
      salary: "22,000,000 VNĐ",
      appliedDate: "2024-08-15",
      hiredDate: "2024-08-25"
    },
    // ... add more candidate mocks if needed
  ];

  // init selectedEventId to first event
  useState(() => {
    if (events.length && selectedEventId == null) {
      setSelectedEventId(events[0].id);
    }
  });

  // derived data: event object and filtered candidates
  const selectedEvent = useMemo(() => events.find(e => e.id === Number(selectedEventId)) || null, [events, selectedEventId]);
  const candidatesForEvent = useMemo(() => {
    if (!selectedEvent) return [];
    return candidateData.filter(c => c.event === selectedEvent.name);
  }, [candidateData, selectedEvent]);

  // derived stats per selected event
  const eventStats = useMemo(() => {
    if (!selectedEvent) return {
      totalCandidates: 0,
      hiredCandidates: 0,
      interviewsScheduled: 0,
      conversionRate: "0%"
    };
    return {
      totalCandidates: selectedEvent.applications || 0,
      hiredCandidates: selectedEvent.hired || 0,
      interviewsScheduled: selectedEvent.interviews || 0,
      conversionRate: selectedEvent.conversionRate || "0%"
    };
  }, [selectedEvent]);

  const TabButton = ({ id, label, icon: Icon, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
        activeTab === id
          ? "bg-blue-600 text-white shadow-lg"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      <Icon size={18} />
      {label}
      {count !== undefined && (
        <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
          activeTab === id ? "bg-blue-500" : "bg-gray-200 text-gray-600"
        }`}>
          {count}
        </span>
      )}
    </button>
  );

  const StatCard = ({ icon: Icon, label, value, color, change, changeType }) => (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 ${
            changeType === 'up' ? 'text-green-500' : 
            changeType === 'down' ? 'text-red-500' : 'text-gray-500'
          }`}>
            {changeType === 'up' && <ArrowUp size={16} />}
            {changeType === 'down' && <ArrowDown size={16} />}
            {changeType === 'neutral' && <Minus size={16} />}
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );

  const EventCard = ({ event }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'completed': return 'bg-green-100 text-green-800';
        case 'upcoming': return 'bg-blue-100 text-blue-800';
        case 'cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case 'completed': return <CheckCircle size={16} />;
        case 'upcoming': return <Calendar size={16} />;
        case 'cancelled': return <XCircle size={16} />;
        default: return <AlertCircle size={16} />;
      }
    };

    return (
      <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.name}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <span className="flex items-center gap-1"><Calendar size={14} />{event.date}</span>
              <span className="flex items-center gap-1"><MapPin size={14} />{event.location}</span>
            </div>
            <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">{event.type}</span>
          </div>
          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
            {getStatusIcon(event.status)}
            {event.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{event.applications.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Ứng viên</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{event.hired}</div>
            <div className="text-xs text-gray-600">Được tuyển</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{event.interviews}</div>
            <div className="text-xs text-gray-600">Phỏng vấn</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{event.conversionRate}</div>
            <div className="text-xs text-gray-600">Tỷ lệ chuyển đổi</div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Vị trí hot nhất:</h4>
          <div className="flex flex-wrap gap-1">
            {event.topPositions.map((position, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{position}</span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-sm">
            <span className="text-gray-600">ROI: </span>
            <span className="font-semibold text-green-600">{event.roi}</span>
          </div>
          <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
            <Eye size={14} />
            Chi tiết
          </button>
        </div>
      </div>
    );
  };

  const CandidateRow = ({ candidate }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'hired': return 'bg-green-100 text-green-800';
        case 'interviewed': return 'bg-yellow-100 text-yellow-800';
        case 'applied': return 'bg-blue-100 text-blue-800';
        case 'rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="font-medium text-gray-900">{candidate.name}</div>
              <div className="text-sm text-gray-500">{candidate.email}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-gray-900">{candidate.position}</td>
        <td className="px-6 py-4 text-gray-600 text-sm">{candidate.experience}</td>
        <td className="px-6 py-4">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
            {candidate.status === 'hired' ? 'Đã tuyển' : 
             candidate.status === 'interviewed' ? 'Đã PV' :
             candidate.status === 'applied' ? 'Đã ứng tuyển' : 'Từ chối'}
          </span>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-1">
            <Star className="text-yellow-400 fill-current" size={14} />
            <span className="text-gray-900">{candidate.interviewScore ?? 'N/A'}</span>
          </div>
        </td>
        <td className="px-6 py-4 text-gray-900">{candidate.appliedDate}</td>
        <td className="px-6 py-4">
          <button className="text-blue-600 hover:text-blue-700" title="Open profile">
            <ExternalLink size={16} />
          </button>
        </td>
      </tr>
    );
  };

  // simple helpers for UI actions (export/refresh)
  const handleExport = () => {
    // placeholder: you could build CSV export here
    const name = selectedEvent ? selectedEvent.name.replace(/\s+/g, "_") : "event_report";
    alert(`Exporting report for ${name} (mock)`); 
  };

  const handleRefresh = () => {
    // placeholder: re-fetch data from API
    alert("Refreshing data (mock)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Báo cáo Sự kiện</h1>
              <p className="text-gray-600">Quản lý & phân tích chi tiết cho từng sự kiện tuyển dụng</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div>
                <select 
                  value={selectedEventId ?? ""}
                  onChange={(e) => setSelectedEventId(Number(e.target.value))}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn sự kiện...</option>
                  {events.map(ev => <option key={ev.id} value={ev.id}>{ev.name}</option>)}
                </select>
              </div>

              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-300"
              >
                <Filter size={18} /> Bộ lọc
              </button>

              <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-300">
                <Download size={18} /> Xuất báo cáo
              </button>

              <button onClick={handleRefresh} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                <RefreshCw size={18} /> Cập nhật
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Khoảng thời gian</label>
                  <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="1month">1 tháng qua</option>
                    <option value="3months">3 tháng qua</option>
                    <option value="6months">6 tháng qua</option>
                    <option value="1year">1 năm qua</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="all">Tất cả trạng thái</option>
                    <option value="completed">Đã hoàn thành</option>
                    <option value="upcoming">Sắp diễn ra</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vị trí</label>
                  <input type="text" placeholder="Lọc theo vị trí..." className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={Users} label="Tổng ứng viên" value={eventStats.totalCandidates.toLocaleString()} color="bg-blue-500" changeType="neutral" />
          <StatCard icon={UserCheck} label="Đã tuyển" value={eventStats.hiredCandidates} color="bg-green-500" changeType="neutral" />
          <StatCard icon={Calendar} label="Phỏng vấn" value={eventStats.interviewsScheduled} color="bg-purple-500" changeType="neutral" />
          <StatCard icon={Target} label="Tỷ lệ chuyển đổi" value={eventStats.conversionRate} color="bg-orange-500" changeType="neutral" />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          <TabButton id="overview" label="Tổng quan" icon={BarChart3} />
          <TabButton id="details" label="Chi tiết sự kiện" icon={Calendar} />
          <TabButton id="candidates" label="Ứng viên" icon={Users} count={candidatesForEvent.length} />
          <TabButton id="analytics" label="Phân tích" icon={BarChart3} />
        </div>

        {/* Render per tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Funnel</h3>
                <div className="space-y-4">
                  {selectedEvent ? (
                    [
                      { stage: "Ứng viên", count: selectedEvent.applications, percentage: 100, color: "bg-blue-500" },
                      { stage: "Phỏng vấn", count: selectedEvent.interviews, percentage: Math.round((selectedEvent.interviews/Math.max(1, selectedEvent.applications))*100), color: "bg-yellow-500" },
                      { stage: "Được tuyển", count: selectedEvent.hired, percentage: Math.round((selectedEvent.hired/Math.max(1, selectedEvent.applications))*100), color: "bg-purple-500" }
                    ].map((stage, idx) => (
                      <div key={idx} className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{stage.stage}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-900">{stage.count.toLocaleString()}</span>
                            <span className="text-sm text-gray-500">({stage.percentage}%)</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className={`${stage.color} h-3 rounded-full`} style={{ width: `${stage.percentage}%` }}></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">Chọn 1 sự kiện để xem chi tiết funnel.</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Positions</h3>
                <div className="space-y-2">
                  {selectedEvent ? selectedEvent.topPositions.map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-800">{p}</div>
                      <div className="text-sm font-semibold text-gray-900">—</div>
                    </div>
                  )) : <p className="text-sm text-gray-500">Chọn 1 sự kiện để xem vị trí hot.</p>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">ROI</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{selectedEvent ? selectedEvent.roi : "-"}</div>
                  <div className="text-sm text-gray-500">Return on Investment</div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget</h3>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent ? selectedEvent.budget : "-"}</div>
                  <div className="text-sm text-gray-500">Tổng chi phí event</div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Status</h3>
                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-700 mb-1">{selectedEvent ? selectedEvent.status : "-"}</div>
                  <div className="text-sm text-gray-500">Trạng thái hiện tại</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "details" && selectedEvent && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EventCard event={selectedEvent} />
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin bổ sung</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div><strong>Địa điểm:</strong> {selectedEvent.location}</div>
                <div><strong>Ngày tổ chức:</strong> {selectedEvent.date}</div>
                <div><strong>Loại sự kiện:</strong> {selectedEvent.type}</div>
                <div><strong>Ứng viên:</strong> {selectedEvent.applications.toLocaleString()}</div>
                <div><strong>Phỏng vấn:</strong> {selectedEvent.interviews}</div>
                <div><strong>Đã tuyển:</strong> {selectedEvent.hired}</div>
              </div>
              <div className="mt-6">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg">Xuất chi tiết (PDF)</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "candidates" && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Ứng viên ({candidatesForEvent.length})</h2>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input type="text" placeholder="Tìm kiếm ứng viên..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ứng viên</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vị trí</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kinh nghiệm</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Điểm PV</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày ứng tuyển</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {candidatesForEvent.length ? candidatesForEvent.map(c => <CandidateRow key={c.id} candidate={c} />) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-500">Không có ứng viên cho sự kiện này.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thời gian tuyển dụng trung bình</h3>
              <div className="space-y-3">
                {[
                  { position: "Software Engineer", days: 18, trend: "down" },
                  { position: "Product Manager", days: 25, trend: "up" },
                  { position: "UI/UX Designer", days: 15, trend: "down" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{item.position}</div>
                      <div className="text-sm text-gray-500">Thời gian tuyển dụng</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-900">{item.days}</span>
                      <span className="text-sm text-gray-500">ngày</span>
                      {item.trend === 'up' && <ArrowUp className="text-red-500" size={16} />}
                      {item.trend === 'down' && <ArrowDown className="text-green-500" size={16} />}
                      {item.trend === 'neutral' && <Minus className="text-gray-500" size={16} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Điểm phỏng vấn trung bình</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Star className="mx-auto text-gray-400 mb-2" size={48} />
                  <p className="text-gray-500">Biểu đồ điểm phỏng vấn</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
