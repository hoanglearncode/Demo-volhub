import React, { useEffect, useState } from 'react';
import { Search, Star, Users, Plus, Award, Eye, ChartLine } from 'lucide-react';
import EmptyStateBanner from '../../components/oganations/EmptyStateBanner.jsx';
import cvManageService from '../../services/oganations/cvManageService.js';
import EventCVPanel from '../../components/oganations/EventCVPanel.jsx';
import RecommendedCandidates from '../../components/oganations/RecommendedCandidates.jsx';

const CVManagementPage = () => {
  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(0);
  const [historyView, setHistoryView] = useState(0);
  const [save, setSave] = useState(0);

  // 'active' lưu string của tab; activeTab lưu JSX để render
  const [active, setActive] = useState('event');
  const [activeTab, setActiveTab] = useState(null);

  const [hasEvents, setHasEvents] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // data chứa các nhóm CV: cvForEvent, cvForRecommend, cvForEvaluate
  const [data, setData] = useState({});

  // --- Fetch initial data once
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await cvManageService.getCandidates();
        if (!mounted) return;
        if (res?.success) {
          const d = res.data ?? {};
          setTotal(d.total ?? 0);
          setPending(d.pending ?? 0);
          setHistoryView(d.historyView ?? 0);
          setSave(d.save ?? 0);
          setData(d.cvData ?? {}); // giữ cấu trúc giống trước: cvData
        } else {
          // Nếu cần, set hasEvents = false khi không có event
          setHasEvents(true);
          setData({});
        }
      } catch (err) {
        console.error('Failed to load candidates', err);
        // xử lý lỗi tùy ý: show notification, set fallback...
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  // --- useEffect riêng cho từng action/tab
  // Event tab
  useEffect(() => {
    if (active !== 'event') return;
    const cvList = data?.cvForEvent ?? data?.cvForEventList ?? []; // fallback
    setActiveTab(<EventCVPanel type="event" data={cvList} />);
  }, [active, data]);

  // Recommend tab
  useEffect(() => {
    if (active !== 'recommend') return;
    const cvList = data?.cvForRecommend ?? [];
    setActiveTab(<RecommendedCandidates data={cvList} />);
  }, [active, data]);

  // Evaluate tab
  useEffect(() => {
    if (active !== 'evaluate') return;
    const cvList = data?.cvForEvaluate ?? data?.cvForEvaluation ?? [];
    setActiveTab(<EventCVPanel type="evaluate" data={cvList} />);
  }, [active, data]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {!hasEvents ? (
          <EmptyStateBanner />
        ) : (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Tổng ứng viên</p>
                    <p className="text-3xl font-bold text-gray-800">{total}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Đang chờ duyệt</p>
                    <p className="text-3xl font-bold text-green-600">{pending}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Đã xem</p>
                    <p className="text-3xl font-bold text-blue-600">{historyView}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Đã lưu</p>
                    <p className="text-3xl font-bold text-purple-600">{save}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo tên, vị trí hoặc kỹ năng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* active box (CHỈ SỬA PHẦN NÀY) */}
            <div className="flex flex-col md:flex-row items-center border border-gray-100 justify-between bg-white shadow rounded-lg p-4 md:p-6 gap-3">
              {/* Left: segmented control */}
              <div role="tablist" aria-label="Bộ lọc ứng viên" className="flex items-center gap-2">
                <button
                  type="button"
                  role="tab"
                  aria-pressed={active === 'event'}
                  onClick={() => setActive('event')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-300
                    ${active === 'event' ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  Theo sự kiện
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-pressed={active === 'recommend'}
                  onClick={() => setActive('recommend')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-300
                    ${active === 'recommend' ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  Ứng viên đề xuất
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-pressed={active === 'evaluate'}
                  onClick={() => setActive('evaluate')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-300
                    ${active === 'evaluate' ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  Đánh giá
                </button>
              </div>

              {/* Right: utilities */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <ChartLine size={20} />
                  Xem thống kê
                </button>

                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  <Plus size={20} />
                  Xuất danh sách
                </button>
              </div>
            </div>

            {activeTab}
          </div>
        )}
      </div>
    </div>
  );
};

export default CVManagementPage;
