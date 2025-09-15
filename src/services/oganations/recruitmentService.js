const recruitment = [];

export default {
  getRecruitments:async () => {
    return {data : recruitment};
  },

  // getRecruitmentsById: (id) => apiCall(`/btc/recruitment/${id}`),

  createRecruitment: async (recruitmentData) => {

  },
  
  updateRecruitment: (id, recruitmentData) => apiCall(`/btc/recruitment/${id}`, {
    method: 'PUT', 
    body: JSON.stringify(recruitmentData),
  }),
  
  deleteRecruitment: (id) => apiCall(`/btc/recruitment/${id}`, {
    method: 'DELETE',
  }),
};