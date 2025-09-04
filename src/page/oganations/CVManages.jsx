import React, { use, useEffect, useState } from 'react';
import { Search, Filter, Star, MapPin, Clock, Users, Plus, TrendingUp, Award, Eye, ChartLine } from 'lucide-react';
import CandidateCard from '../../components/oganations/CandidateCard.jsx';
import EmptyStateBanner from '../../components/oganations/EmptyStateBanner.jsx';
import recommendationCvService from '../../services/oganations/recommendationCvService.js';
import { useNavigate } from 'react-router-dom';
const CVManagementPage = () => {
    const [total, SetTotal] = useState(0);
    const [pending, setPending] = useState(0);
    const [historyView, setHistoryView] = useState(0);
    const [save, setSave]= useState(0);

    const [active, setActive] = useState('event');
    const [activeTab, setActiveTab] = useState(null);

    const [hasEvents, setHasEvents] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [candidatesData, setCandidateData] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState([]);

    const navigate = useNavigate();
    
    useEffect(()=> {
        if(candidatesData.length > 0) {
            setFilteredCandidates(
                candidatesData.filter(candidate => {
                    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
                    
                    const matchesFilter = selectedFilter === 'all' || 
                                        (selectedFilter === 'high' && candidate.matchScore >= 90) ||
                                        (selectedFilter === 'medium' && candidate.matchScore >= 80 && candidate.matchScore < 90) ||
                                        (selectedFilter === 'low' && candidate.matchScore < 80);
                    
                    return matchesSearch && matchesFilter;
                })
            )
        }else {
            setFilteredCandidates([]);
        }
    }, [candidatesData]);

    useEffect(()=> {
        const load = async () => {
            const data = await recommendationCvService.getRecommendedCandidates();
            if(data.success) {
                setCandidateData(data.data);
            }else {
                setCandidateData([]);
            }
        }
        load();
    }, []);
        





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
                {/* inline SVG icon */}
                    <ChartLine size={20} className=''/>
                    Xem thống kê
                </button>

                <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                    <Plus size={20}/>
                    Xuất danh sách
                </button>
            </div>
            </div>

            {/* Candidates Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCandidates.map(candidate => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
            </div>

            {/* Empty search results */}
            {filteredCandidates.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Không tìm thấy ứng viên phù hợp
                </h3>
                <p className="text-gray-500">
                  Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để tìm thêm ứng viên
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CVManagementPage;