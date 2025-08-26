// src/hooks/homeHook.js
// Demo "hook" cung cấp 1 function searchBoxResults() trả về Promise<Array>
// Thực tế: bạn sẽ thay bằng API call (fetch/axios) trả về dữ liệu thật.

const EVENTS = [
  { id: "e1", title: "Trồng cây vì môi trường", subtitle: "Làm sạch công viên", date: "2025-09-10", location: "Hà Nội", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60" },
  { id: "e2", title: "Khám bệnh miễn phí", subtitle: "Chăm sóc sức khỏe cộng đồng", date: "2025-08-24", location: "Hồ Chí Minh", image: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f9?auto=format&fit=crop&w=800&q=60" },
  { id: "e3", title: "Hỗ trợ trẻ em", subtitle: "Hoạt động giáo dục", date: "2025-08-30", location: "Đà Nẵng", image: "https://images.unsplash.com/photo-1526481280698-9f5a30b08a77?auto=format&fit=crop&w=800&q=60" },
];

const VOLUNTEERS = [
  { id: "v1", name: "Nguyễn An", subtitle: "Sinh viên - Y tế", location: "Hà Nội", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=60" },
  { id: "v2", name: "Trần Bình", subtitle: "Kỹ sư - Môi trường", location: "TPHCM", image: "https://images.unsplash.com/photo-1531123414780-fb78b4178b39?auto=format&fit=crop&w=800&q=60" },
  { id: "v3", name: "Lê Cẩm", subtitle: "Giáo viên - Giáo dục", location: "Đà Nẵng", image: "https://images.unsplash.com/photo-1545996124-1f0c8cfdc7f6?auto=format&fit=crop&w=800&q=60" },
];

function matchesQuery(text = "", q = "") {
  return (text || "").toLowerCase().includes((q || "").toLowerCase());
}

export default {
  // params: { role: 'event'|'volunteer', query, date, location }
  searchBoxResults: async ({ role = "event", query = "", date = "", location = "" } = {}) => {
    // simulate async API delay
    await new Promise((r) => setTimeout(r, 250));

    const q = (query || "").trim().toLowerCase();
    if (role === "volunteer") {
      let list = VOLUNTEERS.slice();
      if (q) {
        list = list.filter(
          (v) =>
            matchesQuery(v.name, q) ||
            matchesQuery(v.subtitle, q) ||
            matchesQuery(v.location, q)
        );
      }
      if (location && location !== "all") {
        list = list.filter((v) => v.location === location);
      }
      return list;
    } else {
      // event
      let list = EVENTS.slice();
      if (q) {
        list = list.filter(
          (e) =>
            matchesQuery(e.title, q) ||
            matchesQuery(e.subtitle, q) ||
            matchesQuery(e.location, q)
        );
      }
      if (date) {
        list = list.filter((e) => e.date === date);
      }
      if (location && location !== "all") {
        list = list.filter((e) => e.location === location);
      }
      return list;
    }
  },
  
  exploreHooks : () => { 
      const featuredEvents = [
        {
        id: 1,
        title: "Tình nguyện dạy học cho trẻ em vùng cao",
        image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        location: "Sapa, Lào Cai",
        participants: 24,
        date: "15/12/2024",
        category: "Giáo dục",
        rating: 4.8,
        description: "Chương trình giáo dục miễn phí cho trẻ em dân tộc thiểu số",
        url: "/events/2"
        },
        {
        id: 2,
        title: "Làm sạch bãi biển cùng cộng đồng",
        image: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        location: "Vũng Tàu",
        participants: 156,
        date: "22/12/2024",
        category: "Môi trường",
        rating: 4.9,
        description: "Hoạt động bảo vệ môi trường biển và tuyên truyền ý thức cộng đồng",
        url: "/events/2"
        },
        {
        id: 3,
        title: "Chăm sóc người già tại viện dưỡng lão",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        location: "TP.HCM",
        participants: 32,
        date: "28/12/2024",
        category: "Y tế",
        rating: 4.7,
        description: "Mang niềm vui và sự quan tâm đến những người cao tuổi",
        url: "/events/3"
        },
        {
        id: 4,
        title: "Xây dựng nhà cho hộ nghèo",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        location: "An Giang",
        participants: 45,
        date: "05/01/2025",
        category: "Xã hội",
        rating: 4.8,
        description: "Cùng nhau xây dựng mái ấm cho những gia đình khó khăn",
        url: "/events/4"
        }
    ];    
    return featuredEvents;
  },
};
