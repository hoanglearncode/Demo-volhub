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
const featuredEvents = [
        {
          id: 1,
          title: "Tình nguyện dạy học cho trẻ em vùng cao",
          accountId: 1,
          image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          location: "Sapa, Lào Cai",
          participants: 24,
          date: "15/12/2024",
          startAt: "15/12/2024",
          endAt: "15/12/2024",
          salary: 100,
          category: "Giáo dục",
          rating: 4.8,
          description : "<p><strong>[Tuyển Gấp]</strong>: Đại sứ thương hiệu AI Việt Nam - Đội ngũ tình nguyện viên chuyên nghiệp!</p>\
            <p><strong>LỜI KÊU GỌI TRỞ THÀNH ĐẠI SỨ LOCAAI – CẦU NỐI QUỐC TẾ TẠI TRIỂN LÃM A80</strong></p>\
            <p>👉 Đăng ký ngay: <a href=\"https://forms.gle/T2XafzLJzjmNsbYdA\" target=\"_blank\">https://forms.gle/T2XafzLJzjmNsbYdA</a></p>\
            <p>Nhằm phục vụ cho Chương trình Triển lãm 80 năm thành tựu kinh tế - xã hội Việt Nam tại Trung tâm Triển lãm Việt Nam, Công ty Cổ phần Công nghệ LocaAI phối hợp cùng Học viện Công nghệ AI Việt Nam (AIUNI) trân trọng mời các bạn trẻ tham gia đội ngũ Đại sứ Thương hiệu AI Việt - những tình nguyện viên tiên phong mang sứ mệnh đặc biệt.</p>\
            <p>Đây là mong mỏi của Chính phủ Việt Nam: giúp bạn bè quốc tế có thể trực tiếp trò chuyện tại các gian hàng triển lãm bằng bất cứ ngôn ngữ nào, qua nền tảng công nghệ Việt. Thông qua sản phẩm Loa Locatalk, chúng ta sẽ mang đến cho khách Quốc tế những trải nghiệm phong phú, giao tiếp không giới hạn, giúp quan khách quốc tế khám phá hành trình lập quốc và những thành tựu to lớn của Việt Nam trong 80 năm qua, giúp họ hiểu rõ hơn về con người, văn hóa, sản phẩm và kinh tế Việt Nam.</p>\
            <p><strong>Bạn – những Đại sứ LOCAAI đầy nhiệt huyết, sẽ là cầu nối văn hóa, trí tuệ và công nghệ</strong>, góp phần lan tỏa niềm tự hào dân tộc và quảng bá công nghệ AI “Make in Vietnam” ra thế giới, để chia sẻ câu chuyện Việt Nam sáng tạo – hội nhập – vươn tầm.</p>\
            <p>🌍 <strong>Vì sao bạn nên tham gia sự kiện này?</strong></p>\
            <ul>\
            <li>Bạn chính là <strong>ĐẠI SỨ THƯƠNG HIỆU AI VIỆT</strong> trong mắt bạn bè quốc tế.</li>\
            <li>Được khoác áo Đại sứ thương hiệu - Tình nguyện viên Việt Nam tại sự kiện lịch sử 80 năm – một trải nghiệm chỉ có một lần trong đời.</li>\
            </ul>\
            <p>🎁 <strong>Quyền lợi độc quyền dành cho bạn:</strong></p>\
            <ul>\
            <li>Gặp gỡ & được dẫn dắt bởi các chuyên gia AI hàng đầu Việt Nam – đội ngũ từng đào tạo cho nhiều Tập đoàn lớn hàng đầu Việt Nam như VNPT, Mobifone, Bảo Việt, TH Group…</li>\
            <li>Chứng nhận Đại sứ thương hiệu AI Việt – dấu ấn danh giá trong hồ sơ của bạn!</li>\
            </ul>\
            <p>👉 Để biết thêm thông tin, vui lòng liên hệ <strong>Thầy Nguyễn Đức Long - 0912 777 068</strong></p>",
          subTitle: 'LỜI KÊU GỌI TRỞ THÀNH ĐẠI SỨ LOCAAI – CẦU NỐI QUỐC TẾ TẠI TRIỂN LÃM A80',
          slug : "tinh-nguy-day-hoc-cho-tre-em-vung-cao",
          btc: "/profile/1"
        },
        {
          id: 2,
          title: "Làm sạch bãi biển cùng cộng đồng",
          image: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          location: "Vũng Tàu",
          participants: 156,
          date: "22/12/2024",
          category: "Môi trường - Giáo dục",
          rating: 4.9,
          description: "Hoạt động bảo vệ môi trường biển và tuyên truyền ý thức cộng đồng",
          subTitle: 'LỜI KÊU GỌI TRỞ THÀNH ĐẠI SỨ LOCAAI – CẦU NỐI QUỐC TẾ TẠI TRIỂN LÃM A80',
          slug : "lam-sach-bai-bien-cung-cong-dong",
          btc: "/profile/1"
        },
        {
          id: 3,
          accountId: 1,
          title: "Chăm sóc người già tại viện dưỡng lão",
          image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          location: "TP.HCM",
          participants: 32,
          date: "28/12/2024",
          category: "Y tế",
          rating: 4.7,
          description: "Mang niềm vui và sự quan tâm đến những người cao tuổi",
          subTitle: 'LỜI KÊU GỌI TRỞ THÀNH ĐẠI SỨ LOCAAI – CẦU NỐI QUỐC TẾ TẠI TRIỂN LÃM A80',
          slug : "cham-soc-nguoi-gia-tai-vien-duong-lao",
          btc: "/profile/1"
        },
        {
          id: 4,
          accountId: 1,
          title: "Xây dựng nhà cho hộ nghèo",
          image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          location: "An Giang",
          participants: 45,
          date: "05/01/2025",
          category: "Xã hội",
          rating: 4.8,
          description: "Cùng nhau xây dựng mái ấm cho những gia đình khó khăn",
          subTitle: 'LỜI KÊU GỌI TRỞ THÀNH ĐẠI SỨ LOCAAI – CẦU NỐI QUỐC TẾ TẠI TRIỂN LÃM A80',
          slug : "xay-dung-nha-cho-ho-ngheo",
          btc: "/profile/1"
        }
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
    return featuredEvents;
  },
  
  findActive : (slug) => {
    const data = featuredEvents.find(e => e.slug === slug);
    return data;
  },

  sortByCategory : (category) => {
    const data = featuredEvents.filter(e => e.category.concat(category));
    return data;
  }
};
