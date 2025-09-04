import React, { use, useEffect, useState } from 'react';
import { Search, Filter, Star, MapPin, Clock, Users, Plus, TrendingUp, Award, Eye } from 'lucide-react';
import CandidateCard from '../../components/oganations/CandidateCard.jsx';
import recommendationCvService from '../../services/oganations/recommendationCvService.js';
import { useNavigate } from 'react-router-dom';
const CandidateRecommendation = () => {
  const [hasEvents, setHasEvents] = useState(false);
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
    


  // Banner component khi chưa có sự kiện
  const EmptyStateBanner = () => (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 text-center border border-blue-100 shadow-lg">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Plus className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          Chưa có sự kiện nào được tạo
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Hãy tạo sự kiện đầu tiên của bạn để bắt đầu nhận được các đề xuất ứng viên phù hợp nhất!
        </p>
        <button 
          onClick={() => navigate('/btc/recruitment-post')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Tạo sự kiện đầu tiên
        </button>
      </div>
    </div>
  );


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
                    <p className="text-3xl font-bold text-gray-800">247</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Phù hợp cao</p>
                    <p className="text-3xl font-bold text-green-600">12</p>
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
                    <p className="text-3xl font-bold text-blue-600">89</p>
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
                    <p className="text-3xl font-bold text-purple-600">23</p>
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
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="all">Tất cả ứng viên</option>
                      <option value="high">Phù hợp cao (≥90%)</option>
                      <option value="medium">Phù hợp trung bình (80-89%)</option>
                      <option value="low">Phù hợp thấp (&lt;80%)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Ứng viên được đề xuất ({filteredCandidates.length})
                </h2>
                <p className="text-gray-600">Được sắp xếp theo độ phù hợp</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  Xuất danh sách
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  Lọc nâng cao
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

            {/* Action Banner */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">
                    Tối ưu hóa quy trình tuyển dụng
                  </h3>
                  <p className="text-indigo-100 mb-4 max-w-2xl">
                    Sử dụng AI để tìm kiếm và đánh giá ứng viên phù hợp nhất cho sự kiện của bạn. 
                    Tiết kiệm thời gian và nâng cao chất lượng tuyển dụng.
                  </p>
                  <div className="flex space-x-4">
                    <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                      Tìm hiểu thêm
                    </button>
                    <button className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
                      Liên hệ hỗ trợ
                    </button>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateRecommendation;