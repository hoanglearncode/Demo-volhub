import { useEffect, useState, useCallback, useMemo } from "react";

// Demo data
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
  message: "Welcome to Volunteer Management! You have 2 pending applications to review.",
  timestamp: new Date().toISOString()
};

export default function VolunteerManagementPage() {
  // Core states
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [notification, setNotification] = useState(demoNotification);

  // Volunteer data states
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);

  // Filter and search states
  const [filters, setFilters] = useState({
    status: 'all',
    role: 'all',
    experience: 'all',
    availability: 'all',
    location: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showBulkActionModal, setShowBulkActionModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [bulkAction, setBulkAction] = useState('');

  // Stats calculation
  const stats = useMemo(() => {
    const totalVolunteers = volunteers.length;
    const activeVolunteers = volunteers.filter(v => v.status === 'active').length;
    const pendingVolunteers = volunteers.filter(v => v.status === 'pending').length;
    const inactiveVolunteers = volunteers.filter(v => v.status === 'inactive').length;
    
    return {
      total: totalVolunteers,
      active: activeVolunteers,
      pending: pendingVolunteers,
      inactive: inactiveVolunteers,
      activeRate: totalVolunteers > 0 ? ((activeVolunteers / totalVolunteers) * 100).toFixed(1) : 0
    };
  }, [volunteers]);

  // Filtered volunteers
  const filteredVolunteers = useMemo(() => {
    let result = [...volunteers];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(volunteer => 
        volunteer.name?.toLowerCase().includes(query) ||
        volunteer.email?.toLowerCase().includes(query) ||
        volunteer.phone?.includes(query) ||
        volunteer.role?.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.status !== 'all') {
      result = result.filter(v => v.status === filters.status);
    }
    if (filters.role !== 'all') {
      result = result.filter(v => v.role === filters.role);
    }
    if (filters.experience !== 'all') {
      result = result.filter(v => v.experience === filters.experience);
    }
    if (filters.availability !== 'all') {
      result = result.filter(v => v.availability === filters.availability);
    }
    if (filters.location !== 'all') {
      result = result.filter(v => v.location === filters.location);
    }

    // Apply sorting
    result.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal?.toLowerCase() || '';
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return result;
  }, [volunteers, searchQuery, filters, sortBy, sortOrder]);

  // Paginated volunteers
  const paginatedVolunteers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredVolunteers.slice(startIndex, endIndex);
  }, [filteredVolunteers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredVolunteers.length / itemsPerPage);

  // Debounced search
  const debouncedSearch = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  // Simulate API calls
  const fetchData = async () => {
    setLoading(true);
    setIsError(false);
   
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setVolunteers(demoVolunteers);
    } catch (error) {
      setIsError(true);
      console.error('Error fetching volunteer data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Actions
  const handleVolunteerAction = async (action, volunteerId) => {
    setActionLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (action === 'delete') {
        setVolunteers(prev => prev.filter(v => v.id !== volunteerId));
        setNotification({
          type: 'success',
          message: `Volunteer deleted successfully`,
          timestamp: new Date().toISOString()
        });
      } else if (action === 'activate') {
        setVolunteers(prev => prev.map(v => 
          v.id === volunteerId ? {...v, status: 'active'} : v
        ));
        setNotification({
          type: 'success',
          message: `Volunteer activated successfully`,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error performing volunteer action:', error);
      setNotification({
        type: 'error',
        message: 'Failed to perform action',
        timestamp: new Date().toISOString()
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedVolunteers.length === 0) return;
    
    setActionLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (bulkAction === 'activate') {
        setVolunteers(prev => prev.map(v => 
          selectedVolunteers.includes(v.id) ? {...v, status: 'active'} : v
        ));
      } else if (bulkAction === 'deactivate') {
        setVolunteers(prev => prev.map(v => 
          selectedVolunteers.includes(v.id) ? {...v, status: 'inactive'} : v
        ));
      } else if (bulkAction === 'delete') {
        setVolunteers(prev => prev.filter(v => !selectedVolunteers.includes(v.id)));
      }
      
      setSelectedVolunteers([]);
      setShowBulkActionModal(false);
      setNotification({
        type: 'success',
        message: `Bulk action "${bulkAction}" performed on ${selectedVolunteers.length} volunteers`,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error performing bulk action:', error);
      setNotification({
        type: 'error',
        message: 'Failed to perform bulk action',
        timestamp: new Date().toISOString()
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleSelectVolunteer = (volunteerId) => {
    setSelectedVolunteers(prev => 
      prev.includes(volunteerId) 
        ? prev.filter(id => id !== volunteerId)
        : [...prev, volunteerId]
    );
  };

  const handleSelectAll = () => {
    if (selectedVolunteers.length === paginatedVolunteers.length) {
      setSelectedVolunteers([]);
    } else {
      setSelectedVolunteers(paginatedVolunteers.map(v => v.id));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery]);

  const StatsCard = ({ title, value, subtitle, color, icon }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold ${color} mt-1`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {icon && (
          <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );

  const NotificationBanner = () => {
    if (!notification) return null;
    
    const bgColor = {
      success: 'bg-green-50 border-green-200',
      error: 'bg-red-50 border-red-200',
      warning: 'bg-yellow-50 border-yellow-200',
      info: 'bg-blue-50 border-blue-200'
    }[notification.type];

    const textColor = {
      success: 'text-green-800',
      error: 'text-red-800',
      warning: 'text-yellow-800',
      info: 'text-blue-800'
    }[notification.type];

    return (
      <div className={`rounded-lg border p-4 ${bgColor}`}>
        <div className="flex items-center justify-between">
          <p className={`text-sm font-medium ${textColor}`}>
            {notification.message}
          </p>
          <button 
            onClick={() => setNotification(null)}
            className={`${textColor} hover:opacity-70`}
          >
            ×
          </button>
        </div>
      </div>
    );
  };

  const FilterSection = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      
      <div className="space-y-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({...prev, status: e.target.value}))}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Role Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.role}
            onChange={(e) => setFilters(prev => ({...prev, role: e.target.value}))}
          >
            <option value="all">All Roles</option>
            <option value="event_coordinator">Event Coordinator</option>
            <option value="community_outreach">Community Outreach</option>
            <option value="fundraising">Fundraising</option>
            <option value="admin_support">Admin Support</option>
            <option value="technical_support">Technical Support</option>
          </select>
        </div>

        {/* Experience Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.experience}
            onChange={(e) => setFilters(prev => ({...prev, experience: e.target.value}))}
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="experienced">Experienced</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        {/* Availability Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.availability}
            onChange={(e) => setFilters(prev => ({...prev, availability: e.target.value}))}
          >
            <option value="all">All Availability</option>
            <option value="weekdays">Weekdays</option>
            <option value="weekends">Weekends</option>
            <option value="flexible">Flexible</option>
            <option value="limited">Limited</option>
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.location}
            onChange={(e) => setFilters(prev => ({...prev, location: e.target.value}))}
          >
            <option value="all">All Locations</option>
            <option value="Hanoi">Hanoi</option>
            <option value="Ho Chi Minh">Ho Chi Minh City</option>
            <option value="Da Nang">Da Nang</option>
          </select>
        </div>

        {/* Clear Filters */}
        <button 
          className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          onClick={() => setFilters({
            status: 'all',
            role: 'all',
            experience: 'all',
            availability: 'all',
            location: 'all'
          })}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );

  const VolunteerTable = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Table Header with Actions */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Volunteers ({filteredVolunteers.length})
            </h3>
            {selectedVolunteers.length > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {selectedVolunteers.length} selected
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search volunteers..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => debouncedSearch(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Sort */}
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}
            >
              <option value="created_at-desc">Newest First</option>
              <option value="created_at-asc">Oldest First</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="status-asc">Status A-Z</option>
            </select>

            {/* Add Volunteer */}
            <button 
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              onClick={() => setShowAddModal(true)}
            >
              Add Volunteer
            </button>

            {/* Bulk Actions */}
            {selectedVolunteers.length > 0 && (
              <button 
                className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                onClick={() => setShowBulkActionModal(true)}
              >
                Bulk Actions
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedVolunteers.length === paginatedVolunteers.length && paginatedVolunteers.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Volunteer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role & Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Experience
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Performance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedVolunteers.map((volunteer) => (
              <tr key={volunteer.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedVolunteers.includes(volunteer.id)}
                    onChange={() => handleSelectVolunteer(volunteer.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {volunteer.name?.charAt(0)?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{volunteer.name}</div>
                      <div className="text-sm text-gray-500">{volunteer.email}</div>
                      <div className="text-xs text-gray-400">{volunteer.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-1">
                      {volunteer.role?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">{volunteer.location}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    volunteer.status === 'active' ? 'bg-green-100 text-green-800' :
                    volunteer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {volunteer.status?.toUpperCase()}
                  </span>
                  <div className="text-xs text-gray-500 mt-1">
                    {volunteer.availability?.replace('_', ' ')}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      volunteer.experience === 'expert' ? 'bg-purple-100 text-purple-800' :
                      volunteer.experience === 'experienced' ? 'bg-blue-100 text-blue-800' :
                      volunteer.experience === 'intermediate' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {volunteer.experience?.charAt(0)?.toUpperCase() + volunteer.experience?.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="text-sm font-medium text-gray-900">
                      {volunteer.completedTasks} tasks
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-600 ml-1">{volunteer.rating}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(volunteer.joinDate).toLocaleDateString('vi-VN')}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button 
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                      onClick={() => {
                        setSelectedVolunteer(volunteer);
                        setShowDetailsModal(true);
                      }}
                    >
                      View
                    </button>
                    <button 
                      className="text-indigo-600 hover:text-indigo-900 transition-colors"
                      onClick={() => {
                        setSelectedVolunteer(volunteer);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </button>
                    {volunteer.status === 'pending' && (
                      <button 
                        className="text-green-600 hover:text-green-900 transition-colors"
                        onClick={() => handleVolunteerAction('activate', volunteer.id)}
                        disabled={actionLoading}
                      >
                        Approve
                      </button>
                    )}
                    <button 
                      className="text-red-600 hover:text-red-900 transition-colors"
                      onClick={() => handleVolunteerAction('delete', volunteer.id)}
                      disabled={actionLoading}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {paginatedVolunteers.length === 0 && !loading && (
        <div className="px-6 py-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No volunteers found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery || Object.values(filters).some(f => f !== 'all') 
              ? 'Try adjusting your search or filters.' 
              : 'Get started by adding a new volunteer.'}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Show</span>
              <select 
                className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-700">per page</span>
              <span className="text-sm text-gray-500 ml-4">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredVolunteers.length)} of {filteredVolunteers.length} results
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button 
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Bulk Action Modal
  const BulkActionModal = () => {
    if (!showBulkActionModal) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Bulk Action ({selectedVolunteers.length} volunteers selected)
            </h3>
            
            <div className="space-y-3">
              <label className="block">
                <input
                  type="radio"
                  name="bulkAction"
                  value="activate"
                  checked={bulkAction === 'activate'}
                  onChange={(e) => setBulkAction(e.target.value)}
                  className="mr-2"
                />
                Activate volunteers
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="bulkAction"
                  value="deactivate"
                  checked={bulkAction === 'deactivate'}
                  onChange={(e) => setBulkAction(e.target.value)}
                  className="mr-2"
                />
                Deactivate volunteers
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="bulkAction"
                  value="delete"
                  checked={bulkAction === 'delete'}
                  onChange={(e) => setBulkAction(e.target.value)}
                  className="mr-2"
                />
                Delete volunteers
              </label>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleBulkAction}
                disabled={!bulkAction || actionLoading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {actionLoading ? 'Processing...' : 'Apply Action'}
              </button>
              <button
                onClick={() => {
                  setShowBulkActionModal(false);
                  setBulkAction('');
                }}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Volunteer Details Modal
  const VolunteerDetailsModal = () => {
    if (!showDetailsModal || !selectedVolunteer) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-10 mx-auto p-6 border w-2/3 max-w-4xl shadow-lg rounded-lg bg-white">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Volunteer Details</h3>
            <button
              onClick={() => setShowDetailsModal(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Personal Information</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><span className="font-medium">Name:</span> {selectedVolunteer.name}</p>
                  <p><span className="font-medium">Email:</span> {selectedVolunteer.email}</p>
                  <p><span className="font-medium">Phone:</span> {selectedVolunteer.phone}</p>
                  <p><span className="font-medium">Location:</span> {selectedVolunteer.location}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Role & Status</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><span className="font-medium">Role:</span> {selectedVolunteer.role?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-sm ${
                      selectedVolunteer.status === 'active' ? 'bg-green-100 text-green-800' :
                      selectedVolunteer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedVolunteer.status?.toUpperCase()}
                    </span>
                  </p>
                  <p><span className="font-medium">Experience:</span> {selectedVolunteer.experience?.charAt(0)?.toUpperCase() + selectedVolunteer.experience?.slice(1)}</p>
                  <p><span className="font-medium">Availability:</span> {selectedVolunteer.availability?.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Skills</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex flex-wrap gap-2">
                    {selectedVolunteer.skills?.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                        {skill.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Performance</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><span className="font-medium">Completed Tasks:</span> {selectedVolunteer.completedTasks}</p>
                  <p><span className="font-medium">Rating:</span> 
                    <span className="ml-2 flex items-center">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1">{selectedVolunteer.rating}/5.0</span>
                    </span>
                  </p>
                  <p><span className="font-medium">Join Date:</span> {new Date(selectedVolunteer.joinDate).toLocaleDateString('vi-VN')}</p>
                  <p><span className="font-medium">Last Active:</span> {new Date(selectedVolunteer.lastActive).toLocaleDateString('vi-VN')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowDetailsModal(false);
                setShowEditModal(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Edit Volunteer
            </button>
            <button
              onClick={() => setShowDetailsModal(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 w-full min-h-screen transition-all duration-300">
      <div className="px-6 w-full h-full overflow-y-auto pb-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <div className="text-red-600 text-xl mb-4">⚠️ Error loading data</div>
            <button 
              onClick={fetchData}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mt-6 mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Volunteer Management</h1>
              <p className="mt-2 text-gray-600">Manage and coordinate your volunteer workforce efficiently</p>
            </div>

            <div className="space-y-6">
              <NotificationBanner />
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard 
                  title="Total Volunteers" 
                  value={stats.total} 
                  color="text-gray-900"
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/></svg>}
                />
                <StatsCard 
                  title="Active Volunteers" 
                  value={stats.active} 
                  subtitle={`${stats.activeRate}% of total`}
                  color="text-green-600"
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>}
                />
                <StatsCard 
                  title="Pending Applications" 
                  value={stats.pending} 
                  color="text-yellow-600"
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/></svg>}
                />
                <StatsCard 
                  title="Inactive Volunteers" 
                  value={stats.inactive} 
                  color="text-red-600"
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/></svg>}
                />
              </div>
              
              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <FilterSection />
                </div>
                
                <div className="lg:col-span-3">
                  <VolunteerTable />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Modals */}
      <BulkActionModal />
      <VolunteerDetailsModal />
    </div>
  );
}