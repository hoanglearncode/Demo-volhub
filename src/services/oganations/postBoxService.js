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

export default {
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