import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ChartNoAxesCombined,
  XCircle
} from 'lucide-react';
import recruitmentService  from '../../services/oganations/recruitmentService.js';
import { useEvent } from '../../context/EventsContext';
// map status API -> tiếng Việt
function mapStatus(status) {
  switch (status) {
    case 'active':
    case 'Đang tuyển':
      return 'Đang tuyển';
    case 'paused':
    case 'Tạm dừng':
      return 'Tạm dừng';
    case 'completed':
    case 'Hoàn thành':
      return 'Hoàn thành';
    case 'closed':
    case 'Đã đóng':
      return 'Đã đóng';
    case 'draft':
    case 'Bản nháp':
      return 'Bản nháp';
    default:
      return 'Không xác định';
  }
}

// màu theo status (đã map sang tiếng Việt trước khi truyền vào)
function getStatusColor(statusVN) {
  switch (statusVN) {
    case 'Đang tuyển':
      return 'bg-green-100 text-green-700';
    case 'Tạm dừng':
      return 'bg-yellow-100 text-yellow-700';
    case 'Hoàn thành':
      return 'bg-blue-100 text-blue-700';
    case 'Đã đóng':
      return 'bg-gray-100 text-gray-700';
    default:
      return 'bg-gray-50 text-gray-400';
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(); // bạn có thể đổi format nếu muốn
}


const CampaignManagement = () => {
  const {event} = useEvent();
  const navigate = useNavigate();
  // read query params
  const [searchParams] = useSearchParams();

  // state
  const [reload, setReload] = useState(false);
  const [campaignsData, setCampaignsData] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // mặc định là hiển thị tất cả
  const [selectedFilter, setSelectedFilter] = useState('Tất cả chiến dịch');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // đọc type từ query param (ví dụ ?type=active) và chuyển sang tiếng việt để set filter
  useEffect(() => {
    const paramType = searchParams.get('type'); // values like 'active', 'paused' v.v.
    if (paramType) {
      const mapped = mapStatus(paramType);
      setSelectedFilter(mapped);
    } else {
      setSelectedFilter('Tất cả chiến dịch');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // khi query param thay đổi



  // load dữ liệu từ API và chuẩn hóa
  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await recruitmentService.getRecruitments();
        if (!isMounted) return;

        const items = res.data || [];

        setCampaignsData(items);
      } catch (err) {
        setError('Không thể tải danh sách chiến dịch');
        setCampaignsData([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [reload]);

  // lọc & tìm kiếm
  useEffect(() => {
    if (!campaignsData || campaignsData.length === 0) {
      setFilteredCampaigns([]);
      return;
    }

    const q = searchTerm.trim().toLowerCase();

    const filtered = campaignsData.filter((campaign) => {
      // matches search: id or name or organization or location
      const matchesSearch =
        !q ||
        (campaign.name || '').toLowerCase().includes(q) ||
        (campaign.organizationName || '').toLowerCase().includes(q) ||
        (campaign.location || '').toLowerCase().includes(q) ||
        String(campaign.id).toLowerCase().includes(q);

      // matches filter: nếu "Tất cả chiến dịch" (hoặc empty) -> luôn true
      const matchesFilter =
        !selectedFilter ||
        selectedFilter === 'Tất cả chiến dịch' ||
        selectedFilter === 'all' ||
        campaign.status === selectedFilter;

      return matchesSearch && matchesFilter;
    });

    setFilteredCampaigns(filtered);
  }, [campaignsData, searchTerm, selectedFilter]);

  // helper icon status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Đang tuyển':
        return <CheckCircle className="w-4 h-4" />;
      case 'Tạm dừng':
        return <AlertCircle className="w-4 h-4" />;
      case 'Hoàn thành':
        return <CheckCircle className="w-4 h-4" />;
      case 'Đã đóng':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };



  const getOptimizationColor = (percentage) => {
    // parseInt sẽ lấy số ở đầu chuỗi như "80%" -> 80
    const num = parseInt(String(percentage).replace('%', ''), 10) || 0;
    if (num >= 80) return 'text-green-600 bg-green-50';
    if (num >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  // totals (memoized)
  const totals = useMemo(() => {
    const totalCampaigns = campaignsData.length;
    const activeCount = campaignsData.filter((c) => c.status === 'Đang tuyển').length;
    const totalApplicants = campaignsData.reduce((s, c) => s + (Number(c.applicants) || 0), 0);
    const totalViews = campaignsData.reduce((s, c) => s + (Number(c.views) || 0), 0);
    return { totalCampaigns, activeCount, totalApplicants, totalViews };
  }, [campaignsData]);

  // handlers
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedFilter('Tất cả chiến dịch');
  };

  const handleDelete = async (id) => {
    const check = confirm("Bạn có chắc muốn xóa sự kiện này!");
    if(check) {
      const res = await recruitmentService.deleteRecruitment(id);
      if(res.success){
        alert("Xóa thành công!");
        setReload(!reload);
      }else {
        alert("Xóa thất bại");
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Quản lý chiến dịch tuyển dụng</h1>
              <p className="text-gray-600 mt-1">Theo dõi và quản lý tất cả chiến dịch tuyển dụng của bạn</p>
            </div>
            <div className='flex gap-5'>
              <Link
                to="/btc/events/recruitment-post"
                className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Plus className="w-5 h-5" />
                <span>Thêm chiến dịch mới</span>
              </Link>
              <Link
                to="/btc/events/calendar"
                className="text-gray-700 border border-green-500 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Calendar className="w-5 h-5" />
                <span>Lịch sự kiện</span>
              </Link>
            </div>

          </div>
        </div>
      </div>

      <div className="mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Tổng chiến dịch</p>
                <p className="text-3xl font-bold text-gray-800">{totals.totalCampaigns}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Đang hoạt động</p>
                <p className="text-3xl font-bold text-green-600">{totals.activeCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Tổng ứng viên</p>
                <p className="text-3xl font-bold text-purple-600">{totals.totalApplicants}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Lượt xem</p>
                <p className="text-3xl font-bold text-orange-600">{totals.totalViews}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm chiến dịch (Nhấn enter để tìm kiếm)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-48"
              >
                <option value="Tất cả chiến dịch">Tất cả chiến dịch</option>
                <option value="Đang tuyển">Đang tuyển</option>
                <option value="Tạm dừng">Tạm dừng</option>
                <option value="Hoàn thành">Hoàn thành</option>
                <option value="Đã đóng">Đã đóng</option>
                <option value="Bản nháp">Bản nháp</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Tìm thấy {filteredCampaigns.length} chiến dịch tuyển dụng</h2>
          </div>
        </div>

        {/* Campaign Table */}
        <div className="overflow-y-auto relative bg-white rounded-t-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b sticky top-0 left-0 border-gray-200 z-10">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-semibold text-gray-700">
              <div className="col-span-3">Chiến dịch tuyển dụng</div>
              <div className="col-span-2">Tin tuyển dụng</div>
              <div className="col-span-2">Thông số ứng viên</div>
              <div className="col-span-2">Dịch vụ đang chạy</div>
              <div className="col-span-2">Hạn tuyển</div>
              <div className="col-span-1 text-center">Thao tác</div>              
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id ?? Math.random()} className="grid grid-cols-12 gap-4 px-6 py-6 hover:bg-gray-50 transition-colors group">
                {/* Campaign Info */}
                <div className="col-span-3">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 mt-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm text-gray-500 font-mono">{campaign.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${campaign.statusColor}`}>
                          {getStatusIcon(campaign.status)}
                          <span>{campaign.status}</span>
                        </span>
                      </div>

                      <a target='blank' href={`/events/${campaign.id}`} className="font-semibold text-gray-800 group-hover:text-blue-600 hover:underline transition-colors truncate">{campaign.name}</a>

                      <div className="flex flex-col justity-center space-y-1 mt-2 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{campaign.createdDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{campaign.applicants} ứng viên</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{campaign.views} lượt xem</span>
                        </div>
                        {campaign.organizationName && (
                          <div className="flex items-center space-x-1 text-xs text-gray-400 mt-1">
                            <span className="italic">{campaign.organizationName}</span>
                            {campaign.location && <span>• {campaign.location}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Optimization */}
                <div className="col-span-1 flex items-center justify-center">
                  <div className={`px-3 py-2 rounded-lg text-sm font-bold ${getOptimizationColor(campaign.optimization)}`}>
                    {campaign.optimization}
                  </div>
                </div>

                {/* Job Postings */}
                <div className="col-span-2 flex items-center">
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">{campaign.jobPostings}</div>
                    {campaign.status === 'Đang tuyển' && <div className="text-green-600 text-xs mt-1">✓ Đang hiển thị công khai</div>}
                    {campaign.compensation && <div className="text-xs text-gray-500 mt-1">Mức lương: {campaign.compensation}</div>}
                  </div>
                </div>

                {/* CV Recommendations */}
                <div className="col-span-1 flex items-center">
                  <button onClick={()=> navigate(`/btc/recommendation-cv?eventId=${campaign.id}`)} className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center space-x-1 hover:underline">
                    <span>UV đề xuất</span>
                  </button>
                </div>

                {/* CV Filter */}
                <div className="col-span-1 flex items-center">
                  <button onClick={()=> navigate(`/btc/cv-manage?eventId=${campaign.id}&&type=filter`)} className="text-purple-600 hover:text-purple-800 font-medium text-sm hover:underline">Lọc CV</button>
                </div>

                {/* Service Status */}
                <div className="col-span-2 flex items-center justify-between px-2">
                  <div className="text-sm text-gray-600">{campaign.serviceStatus}</div>
                </div>

                <div className="col-span-1 flex items-center justify-between px-2">
                  <div className="text-xs text-gray-400">{campaign.deadline ? `${formatDate(campaign.deadline)}` : ''}</div>
                </div>

                <div className="flex items-center space-x-0.5 col-span-1 justify-end">
                  <button onClick={()=> navigate(`/btc/recruitment-post?eventId=${campaign.id}&&type=edit`)} className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={()=> navigate(`/btc/recruitment-report?eventId=${campaign.id}`)} className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <ChartNoAxesCombined className="w-4 h-4" />
                  </button>
                  <button onClick={()=> {handleDelete(campaign.id)}} className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredCampaigns.length === 0 && (
          <div className="bg-white rounded-b-2xl p-12 text-center shadow-lg border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy chiến dịch nào</h3>
            <p className="text-gray-500 mb-6">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để tìm thêm chiến dịch</p>
            <button onClick={handleClearFilters} className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors">
              Xóa bộ lọc
            </button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/btc/recruitment-post" className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
              <Plus className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Tạo chiến dịch mới</h3>
            <p className="text-gray-600 text-sm">Bắt đầu chiến dịch tuyển dụng mới với AI hỗ trợ</p>
          </Link>

          <Link to="/btc/recruitment-report" className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Phân tích hiệu quả</h3>
            <p className="text-gray-600 text-sm">Xem báo cáo chi tiết về hiệu quả các chiến dịch</p>
          </Link>

          <Link to="/btc/cv-manage" className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Quản lý ứng viên</h3>
            <p className="text-gray-600 text-sm">Xem và quản lý tất cả ứng viên đã ứng tuyển</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampaignManagement;
