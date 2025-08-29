// services/api.js
const BASE_URL = 'http://localhost:8080/api';

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
};

// Dashboard API
export const dashboardService = {
  getDashboardData: () => apiCall('/btc'),
  
};

// Recommendation CV API
export const recommendationCvService = {
  getRecommendedCandidates: () => apiCall('/btc/recommendation-cv'),
};

// Recruitment API
export const recruitmentService = {
  getRecruitments: () => apiCall('/btc/recruitment'),
  
  createRecruitment: (recruitmentData) => apiCall('/btc/recruitment', {
    method: 'POST',
    body: JSON.stringify(recruitmentData),
  }),
  
  updateRecruitment: (id, recruitmentData) => apiCall(`/btc/recruitment/${id}`, {
    method: 'PUT', 
    body: JSON.stringify(recruitmentData),
  }),
  
  deleteRecruitment: (id) => apiCall(`/btc/recruitment/${id}`, {
    method: 'DELETE',
  }),
};

// Recruitment Post API
export const recruitmentPostService = {
  getRecruitmentPosts: () => apiCall('/btc/recruitment-post'),
  
  createRecruitmentPost: (postData) => apiCall('/btc/recruitment-post', {
    method: 'POST',
    body: JSON.stringify(postData),
  }),
  
  updateRecruitmentPost: (id, postData) => apiCall(`/btc/recruitment-post/${id}`, {
    method: 'PUT',
    body: JSON.stringify(postData),
  }),
  
  deleteRecruitmentPost: (id) => apiCall(`/btc/recruitment-post/${id}`, {
    method: 'DELETE',
  }),
};

// CV Management API
export const cvManageService = {
  getCandidates: () => apiCall('/btc/cv-manage'),
  
  updateCandidateStatus: (id, statusData) => apiCall(`/btc/cv-manage/${id}`, {
    method: 'PUT',
    body: JSON.stringify(statusData),
  }),
  
  deleteCandidateApplication: (id) => apiCall(`/btc/cv-manage/${id}`, {
    method: 'DELETE',
  }),
};

// Recruitment Report API
export const recruitmentReportService = {
  getRecruitmentReport: () => apiCall('/btc/recruitment-report'),
  
  getRecruitmentStatsByPeriod: (startDate, endDate) => 
    apiCall(`/btc/recruitment-report?start=${startDate}&end=${endDate}`),
};

// Services API
export const servicesService = {
  getAvailableServices: () => apiCall('/btc/services'),
  
  purchaseService: (serviceId, purchaseData) => apiCall('/btc/services/purchase', {
    method: 'POST',
    body: JSON.stringify({ serviceId, ...purchaseData }),
  }),
};

// My Services API
export const myServicesService = {
  getMyServices: () => apiCall('/btc/my-services'),
  
  renewService: (serviceId) => apiCall(`/btc/my-services/${serviceId}/renew`, {
    method: 'POST',
  }),
  
  cancelService: (serviceId) => apiCall(`/btc/my-services/${serviceId}`, {
    method: 'DELETE',
  }),
};

// History API
export const historyService = {
  getActivityHistory: (page = 1, limit = 10) => 
    apiCall(`/btc/history?page=${page}&limit=${limit}`),
  
  getActivityByType: (type) => apiCall(`/btc/history?type=${type}`),
};

// Notification System API
export const notificationService = {
  getNotifications: () => apiCall('/btc/notification-system'),
  
  markAsRead: (notificationId) => apiCall(`/btc/notification-system/${notificationId}/read`, {
    method: 'PUT',
  }),
  
  markAllAsRead: () => apiCall('/btc/notification-system/read-all', {
    method: 'PUT',
  }),
  
  deleteNotification: (notificationId) => apiCall(`/btc/notification-system/${notificationId}`, {
    method: 'DELETE',
  }),
};

// Post Box API
export const postBoxService = {
  getMessages: () => apiCall('/btc/post-box'),
  
  markMessageAsRead: (messageId) => apiCall(`/btc/post-box/${messageId}/read`, {
    method: 'PUT',
  }),
  
  deleteMessage: (messageId) => apiCall(`/btc/post-box/${messageId}`, {
    method: 'DELETE',
  }),
  
  sendReply: (messageId, replyData) => apiCall(`/btc/post-box/${messageId}/reply`, {
    method: 'POST',
    body: JSON.stringify(replyData),
  }),
};

// Utility functions for common operations
export const apiUtils = {
  // Handle API errors consistently
  handleError: (error, defaultMessage = 'Đã có lỗi xảy ra') => {
    console.error('API Error:', error);
    return error.response?.data?.message || error.message || defaultMessage;
  },
  
  // Format API responses
  formatResponse: (response) => {
    return {
      success: response.success || false,
      data: response.data || null,
      message: response.message || null,
    };
  },
  
  // Create query string from object
  createQueryString: (params) => {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        queryParams.append(key, params[key]);
      }
    });
    return queryParams.toString();
  },
};

// Example usage with React hooks
export const useApiService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (serviceFunction, ...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await serviceFunction(...args);
      return result;
    } catch (err) {
      const errorMessage = apiUtils.handleError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, error };
};

// Export all services as default
export default {
  dashboard: dashboardService,
  recommendationCv: recommendationCvService,
  recruitment: recruitmentService,
  recruitmentPost: recruitmentPostService,
  cvManage: cvManageService,
  recruitmentReport: recruitmentReportService,
  services: servicesService,
  myServices: myServicesService,
  history: historyService,
  notification: notificationService,
  postBox: postBoxService,
  utils: apiUtils,
};