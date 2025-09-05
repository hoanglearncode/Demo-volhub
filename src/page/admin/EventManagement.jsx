import React, { useState, useEffect } from 'react';
import { 
  Calendar,
  MapPin,
  Users,
  Clock,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Plus,
  Download,
  RefreshCw,
  Flag,
  Star,
  Building2,
  QrCode,
  TrendingUp,
  MessageSquare,
  ChevronDown,
  MoreHorizontal
} from 'lucide-react';

const EventManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Mock data cho sự kiện
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Làm sạch bãi biển Vũng Tàu',
      partner: 'Green Earth Foundation',
      partnerVerified: true,
      status: 'active',
      location: 'Vũng Tàu, BR-VT',
      date: '2025-09-15',
      endDate: '2025-09-15',
      category: 'Môi trường',
      volunteersNeeded: 50,
      volunteersRegistered: 34,
      volunteersCompleted: 0,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop',
      aiFlag: null,
      completionRate: 0,
      checkInRate: 0,
      createdAt: '2025-09-01',
      lastModified: '2025-09-03'
    },
    {
      id: 2,
      title: 'Hỗ trợ người cao tuổi tại viện d양양',
      partner: 'UNICEF Vietnam',
      partnerVerified: true,
      status: 'pending',
      location: 'Hà Nội',
      date: '2025-09-20',
      endDate: '2025-09-22',
      category: 'Xã hội',
      volunteersNeeded: 30,
      volunteersRegistered: 0,
      volunteersCompleted: 0,
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=200&fit=crop',
      aiFlag: 'content_review',
      completionRate: 0,
      checkInRate: 0,
      createdAt: '2025-09-05',
      lastModified: '2025-09-05'
    },
    {
      id: 3,
      title: 'Chương trình giáo dục trẻ em vùng cao',
      partner: 'Samsung Electronics',
      partnerVerified: true,
      status: 'active',
      location: 'Sapa, Lào Cai',
      date: '2025-10-01',
      endDate: '2025-10-05',
      category: 'Giáo dục',
      volunteersNeeded: 20,
      volunteersRegistered: 18,
      volunteersCompleted: 0,
      image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=200&fit=crop',
      aiFlag: null,
      completionRate: 0,
      checkInRate: 0,
      createdAt: '2025-08-28',
      lastModified: '2025-09-04'
    },
    {
      id: 4,
      title: 'Xây dựng nhà cho hộ nghèo',
      partner: 'Habitat Vietnam',
      partnerVerified: false,
      status: 'suspended',
      location: 'Đồng Tháp',
      date: '2025-09-25',
      endDate: '2025-09-30',
      category: 'Xây dựng',
      volunteersNeeded: 40,
      volunteersRegistered: 12,
      volunteersCompleted: 0,
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=200&fit=crop',
      aiFlag: 'safety_concern',
      completionRate: 0,
      checkInRate: 0,
      createdAt: '2025-08-30',
      lastModified: '2025-09-02'
    },
    {
      id: 5,
      title: 'Tết thiều nhi tại bệnh viện',
      partner: 'Unilever Vietnam',
      partnerVerified: true,
      status: 'completed',
      location: 'TP.HCM',
      date: '2025-06-01',
      endDate: '2025-06-01',
      category: 'Thiện nguyện',
      volunteersNeeded: 25,
      volunteersRegistered: 28,
      volunteersCompleted: 25,
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=200&fit=crop',
      aiFlag: null,
      completionRate: 89.3,
      checkInRate: 96.4,
      createdAt: '2025-05-15',
      lastModified: '2025-06-05'
    }
  ]);

  // Hàng đợi duyệt
  const [pendingQueue, setPendingQueue] = useState([
    {
      id: 6,
      title: 'Marathon vì trẻ em khuyết tật',
      partner: 'Saigon Sports Club',
      partnerVerified: false,
      submittedDate: '2025-09-04',
      aiFlags: ['location_unclear', 'insurance_missing'],
      priority: 'medium',
      description: 'Tổ chức marathon quy tụ 1000 người tham gia để gây quỹ hỗ trợ trẻ em khuyết tật...',
      riskLevel: 'medium'
    },
    {
      id: 7,
      title: 'Phát quà Trung thu cho trẻ em',
      partner: 'Local Community Group',
      partnerVerified: false,
      submittedDate: '2025-09-05',
      aiFlags: ['partner_unverified'],
      priority: 'low',
      description: 'Chương trình phát quà Trung thu tại các khu vực có hoàn cảnh khó khăn...',
      riskLevel: 'low'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    // Nếu selectAll flag thay đổi -> sync danh sách chọn
    if (selectAll) {
      setSelectedEvents(filteredEvents.map(e => e.id));
    } else {
      setSelectedEvents([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAll]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'draft': return 'Nháp';
      case 'active': return 'Đang mở';
      case 'pending': return 'Chờ duyệt';
      case 'suspended': return 'Tạm dừng';
      case 'completed': return 'Đã đóng';
      default: return status;
    }
  };

  const getAIFlagColor = (flag) => {
    switch (flag) {
      case 'safety_concern': return 'bg-red-100 text-red-800';
      case 'content_review': return 'bg-orange-100 text-orange-800';
      case 'location_unclear': return 'bg-yellow-100 text-yellow-800';
      case 'partner_unverified': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // pagination slice
  const paginatedEvents = filteredEvents.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / pageSize));

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for events:`, selectedEvents);
    // Implement bulk actions logic here (update events state or call API)
    // Example: if action === 'suspend' -> set status = 'suspended' for selected
    if (action === 'suspend') {
      setEvents(prev => prev.map(e => selectedEvents.includes(e.id) ? { ...e, status: 'suspended' } : e));
    } else if (action === 'approve') {
      setEvents(prev => prev.map(e => selectedEvents.includes(e.id) ? { ...e, status: 'active' } : e));
    } else if (action === 'delete') {
      setEvents(prev => prev.filter(e => !selectedEvents.includes(e.id)));
      setSelectedEvents([]);
    }
  };

  const handleEventAction = (eventId, action) => {
    console.log(`Action: ${action} for event:`, eventId);
    // Implement individual event actions
    if (action === 'view') {
      // navigate to event detail
      alert(`Xem chi tiết sự kiện ID=${eventId}`);
    } else if (action === 'edit') {
      alert(`Chỉnh sửa sự kiện ID=${eventId}`);
    } else if (action === 'qr') {
      alert(`Tạo QR cho sự kiện ID=${eventId}`);
    } else if (action === 'delete') {
      setEvents(prev => prev.filter(e => e.id !== eventId));
    }
  };

  const handleApproveEvent = (eventId, action) => {
    console.log(`${action} event:`, eventId);
    // Move from pending queue to main events list or update pendingQueue
    if (action === 'approve') {
      const item = pendingQueue.find(p => p.id === eventId);
      if (item) {
        // create a new event (minimal) and remove from queue
        const newEvent = {
          id: Math.max(...events.map(e => e.id)) + 1,
          title: item.title,
          partner: item.partner || 'Unknown',
          partnerVerified: item.partnerVerified || false,
          status: 'active',
          location: 'Chưa rõ',
          date: new Date().toISOString().slice(0,10),
          endDate: new Date().toISOString().slice(0,10),
          category: 'Khác',
          volunteersNeeded: 0,
          volunteersRegistered: 0,
          volunteersCompleted: 0,
          image: '',
          aiFlag: item.aiFlags && item.aiFlags.length ? item.aiFlags[0] : null,
          completionRate: 0,
          checkInRate: 0,
          createdAt: new Date().toISOString().slice(0,10),
          lastModified: new Date().toISOString().slice(0,10)
        };
        setEvents(prev => [newEvent, ...prev]);
        setPendingQueue(prev => prev.filter(p => p.id !== eventId));
      }
    } else if (action === 'reject') {
      setPendingQueue(prev => prev.filter(p => p.id !== eventId));
    } else if (action === 'edit') {
      alert(`Mở form chỉnh sửa hàng đợi ID=${eventId}`);
    }
  };

  const toggleSelectEvent = (id) => {
    setSelectedEvents(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      return [...prev, id];
    });
  };

  // Keep selectAll in sync with selectedEvents
  useEffect(() => {
    if (selectedEvents.length === 0) setSelectAll(false);
    if (selectedEvents.length > 0 && selectedEvents.length === filteredEvents.length) setSelectAll(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEvents]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý sự kiện</h1>
              <p className="text-gray-600">Tổng quan và quản lý tất cả sự kiện trong hệ thống</p>
            </div>
            <div className="flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Xuất báo cáo
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Tạo sự kiện mới
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng sự kiện</p>
                <p className="text-2xl font-bold text-gray-900">{events.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Đang hoạt động</p>
                <p className="text-2xl font-bold text-gray-900">
                  {events.filter(e => e.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Chờ duyệt</p>
                <p className="text-2xl font-bold text-gray-900">
                  {events.filter(e => e.status === 'pending').length + pendingQueue.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Cảnh báo AI</p>
                <p className="text-2xl font-bold text-gray-900">
                  {events.filter(e => e.aiFlag).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('all')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'all' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Tất cả sự kiện ({events.length})
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'pending' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Hàng đợi duyệt ({pendingQueue.length})
              </button>
              <button
                onClick={() => setActiveTab('quality')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'quality' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Chất lượng & An toàn
              </button>
            </nav>
          </div>

          {/* All Events Tab */}
          {activeTab === 'all' && (
            <div className="p-6">
              {/* Filters */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm sự kiện, đối tác..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="draft">Nháp</option>
                    <option value="active">Đang mở</option>
                    <option value="pending">Chờ duyệt</option>
                    <option value="suspended">Tạm dừng</option>
                    <option value="completed">Đã đóng</option>
                  </select>
                </div>

                {selectedEvents.length > 0 ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{selectedEvents.length} được chọn</span>
                    <button onClick={() => handleBulkAction('approve')} className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-lg hover:bg-green-200">Duyệt</button>
                    <button onClick={() => handleBulkAction('suspend')} className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-lg hover:bg-red-200">Tạm dừng</button>
                    <button onClick={() => handleBulkAction('delete')} className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200">Xóa</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center text-sm text-gray-600">
                      <input type="checkbox" checked={selectAll} onChange={(e) => setSelectAll(e.target.checked)} className="form-checkbox mr-2" />
                      Chọn tất cả
                    </label>
                    <button onClick={() => { setSearchTerm(''); setFilterStatus('all'); setCurrentPage(1); }} className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Reset</button>
                  </div>
                )}
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedEvents.map((event) => (
                  <div key={event.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    {/* selectable header */}
                    <div className="flex items-center justify-between px-3 py-2 border-b">
                      <label className="inline-flex items-center">
                        <input type="checkbox" checked={selectedEvents.includes(event.id)} onChange={() => toggleSelectEvent(event.id)} className="form-checkbox mr-2" />
                        <span className="text-sm font-medium text-gray-700">#{event.id}</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEventAction(event.id, 'delete')} className="p-1 text-red-500 hover:bg-red-50 rounded">
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Event Image */}
                    <div className="relative">
                      <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                      {event.aiFlag && (
                        <div className="absolute top-2 right-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAIFlagColor(event.aiFlag)}`}>
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            AI Flag
                          </span>
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                          {getStatusText(event.status)}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      {/* Event Title */}
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
                      
                      {/* Partner */}
                      <div className="flex items-center mb-2">
                        <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{event.partner}</span>
                        {event.partnerVerified && <CheckCircle className="h-4 w-4 text-blue-500 ml-1" />}
                      </div>

                      {/* Location & Date */}
                      <div className="flex items-center mb-2">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{event.location}</span>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">
                          {new Date(event.date).toLocaleDateString('vi-VN')}
                        </span>
                      </div>

                      {/* Volunteers */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600">
                            {event.volunteersRegistered}/{event.volunteersNeeded} TNV
                          </span>
                        </div>
                        {event.status === 'completed' && (
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-sm text-green-600">{event.completionRate}%</span>
                          </div>
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${(event.volunteersRegistered / Math.max(1, event.volunteersNeeded)) * 100}%`
                          }}
                        ></div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button onClick={() => handleEventAction(event.id, 'view')} className="p-1 text-gray-400 hover:text-blue-600"><Eye className="h-4 w-4" /></button>
                          <button onClick={() => handleEventAction(event.id, 'edit')} className="p-1 text-gray-400 hover:text-yellow-600"><Edit className="h-4 w-4" /></button>
                          {event.status === 'completed' && (
                            <button onClick={() => handleEventAction(event.id, 'qr')} className="p-1 text-gray-400 hover:text-green-600"><QrCode className="h-4 w-4" /></button>
                          )}
                        </div>
                        
                        <div className="relative">
                          <button className="p-1 text-gray-400 hover:text-gray-600"><MoreHorizontal className="h-4 w-4" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-600">Hiển thị {(currentPage-1)*pageSize + 1} - {Math.min(currentPage*pageSize, filteredEvents.length)} trên {filteredEvents.length}</div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} className="px-3 py-1 border rounded bg-white hover:bg-gray-50">Prev</button>
                  <span className="px-3 py-1 text-sm">{currentPage}/{totalPages}</span>
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} className="px-3 py-1 border rounded bg-white hover:bg-gray-50">Next</button>
                </div>
              </div>
            </div>
          )}

          {/* Pending Queue Tab */}
          {activeTab === 'pending' && (
            <div className="p-6">
              <div className="space-y-6">
                {pendingQueue.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                          <span className={`ml-3 text-sm font-medium ${getRiskColor(event.riskLevel)}`}>
                            ({event.riskLevel} risk)
                          </span>
                        </div>
                        
                        <div className="flex items-center mb-3">
                          <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600">{event.partner}</span>
                          {!event.partnerVerified && (
                            <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Chưa xác minh</span>
                          )}
                        </div>

                        <p className="text-sm text-gray-600 mb-3">{event.description}</p>

                        {/* AI Flags */}
                        {event.aiFlags.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-700 mb-2">Cảnh báo AI:</p>
                            <div className="flex flex-wrap gap-2">
                              {event.aiFlags.map((flag, index) => (
                                <span key={index} className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAIFlagColor(flag)}`}>
                                  <Flag className="h-3 w-3 mr-1" />
                                  {flag.replace(/_/g, ' ')}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="text-xs text-gray-500">Gửi lúc: {new Date(event.submittedDate).toLocaleDateString('vi-VN')}</div>
                      </div>

                      <div className="ml-6 flex space-x-2">
                        <button onClick={() => handleApproveEvent(event.id, 'approve')} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">Duyệt</button>
                        <button onClick={() => handleApproveEvent(event.id, 'edit')} className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm hover:bg-yellow-700">Sửa</button>
                        <button onClick={() => handleApproveEvent(event.id, 'reject')} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">Từ chối</button>
                      </div>
                    </div>
                  </div>
                ))}
                {pendingQueue.length === 0 && <div className="text-gray-500">Không có mục nào trong hàng đợi.</div>}
              </div>
            </div>
          )}

          {/* Quality & Safety Tab */}
          {activeTab === 'quality' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quality Metrics */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Chỉ số chất lượng</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Tỉ lệ hoàn thành trung bình</span>
                      <span className="text-sm font-semibold text-gray-900">87.5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Tỉ lệ check-in QR</span>
                      <span className="text-sm font-semibold text-gray-900">93.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Điểm đánh giá trung bình</span>
                      <span className="text-sm font-semibold text-gray-900">4.3/5.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Báo cáo sự cố</span>
                      <span className="text-sm font-semibold text-red-600">3 vụ</span>
                    </div>
                  </div>
                </div>

                {/* Safety Alerts */}
                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cảnh báo an toàn</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Sự kiện xây dựng - thiếu bảo hiểm</p>
                        <p className="text-xs text-gray-500">ID: #4 - Habitat Vietnam</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Địa điểm không rõ ràng</p>
                        <p className="text-xs text-gray-500">ID: #6 - Saigon Sports Club</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Partner chưa xác minh</p>
                        <p className="text-xs text-gray-500">ID: #7 - Local Community Group</p>
                      </div>
                    </div>

                    <div className="pt-3">
                      <button className="inline-flex items-center px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                        <RefreshCw className="h-4 w-4 mr-2" /> Làm mới dữ liệu
                      </button>
                      <button className="ml-2 inline-flex items-center px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
                        <Flag className="h-4 w-4 mr-2" /> Xử lý cảnh báo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default EventManagement;
