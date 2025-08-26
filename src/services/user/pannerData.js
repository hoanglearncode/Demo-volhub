const trustedPartners = [
  {
    id: "social",
    name: "Xã hội & Cộng đồng",
    partners: [
      {
        name: "Hội Chữ Thập Đỏ Việt Nam",
        logoSources: {
          official: "https://redcross.org.vn/",
          vector: "https://haitrieu.com/blogs/vector-logo-hoi-chu-thap-do-viet-nam-viet-nam-red-cross-society/",
          description: "Logo chữ thập đỏ trên nền trắng với viền trang trí và dòng chữ 'Việt Nam'"
        }
      },
      {
        name: "UNICEF",
        logoSources: {
          official: "https://www.unicef.org/vietnam/vi",
          brand: "https://www.unicef.org/press-centre/unicef-brand-toolkit",
          description: "Logo UNICEF màu xanh dương với biểu tượng mẹ và bé"
        }
      },
      {
        name: "Plan International",
        logoSources: {
          official: "https://plan-international.org/",
          description: "Logo Plan International với font chữ hiện đại"
        }
      },
      {
        name: "Quỹ Vì Tầm Vóc Việt",
        logoSources: {
          official: "https://quyvitamvocviet.org.vn/",
          description: "Logo với biểu tượng trẻ em và slogan về tầm vóc"
        }
      },
    ],
  },
  {
    id: "education",
    name: "Giáo dục & Đào tạo",
    partners: [
      {
        name: "Tổ chức Giáo dục FPT",
        logoSources: {
          official: "https://fpt.edu.vn/",
          description: "Logo FPT Education màu cam đặc trưng"
        }
      },
      {
        name: "Teach For Vietnam",
        logoSources: {
          official: "https://teachforvietnam.org/",
          description: "Logo với biểu tượng giáo dục và màu sắc năng động"
        }
      },
      {
        name: "British Council",
        logoSources: {
          official: "https://www.britishcouncil.vn/",
          brand: "https://www.britishcouncil.org/about-us/brand",
          description: "Logo British Council với cờ Anh stylized"
        }
      },
      {
        name: "Viettel Study",
        logoSources: {
          official: "https://viettelstudy.vn/",
          description: "Logo Viettel Study kết hợp thương hiệu Viettel"
        }
      },
    ],
  },
  {
    id: "healthcare",
    name: "Y tế & Chăm sóc sức khỏe",
    partners: [
      {
        name: "Bệnh viện Nhi Trung Ương",
        logoSources: {
          official: "https://bvntw.vn/",
          description: "Logo bệnh viện với biểu tượng y tế và trẻ em"
        }
      },
      {
        name: "WHO Việt Nam",
        logoSources: {
          official: "https://www.who.int/vietnam",
          brand: "https://www.who.int/about/policies/publishing/logo",
          description: "Logo WHO với biểu tượng y tế quốc tế"
        }
      },
      {
        name: "Bệnh viện Chợ Rẫy",
        logoSources: {
          official: "https://choray.vn/",
          description: "Logo bệnh viện Chợ Rẫy truyền thống"
        }
      },
      {
        name: "Viện Huyết học - Truyền máu TW",
        logoSources: {
          official: "https://nihbt.org.vn/",
          description: "Logo với biểu tượng y tế và huyết học"
        }
      },
    ],
  },
  {
    id: "environment",
    name: "Môi trường & Phát triển bền vững",
    partners: [
      {
        name: "GreenViet",
        logoSources: {
          official: "https://greenviet.org/",
          description: "Logo màu xanh với biểu tượng môi trường"
        }
      },
      {
        name: "WWF Việt Nam",
        logoSources: {
          official: "https://www.wwf.org.vn/",
          brand: "https://www.worldwildlife.org/pages/brand-guidelines",
          description: "Logo WWF với biểu tượng gấu trúc nổi tiếng"
        }
      },
      {
        name: "Live&Learn",
        logoSources: {
          official: "https://livelearn.org/",
          description: "Logo Live&Learn với biểu tượng giáo dục môi trường"
        }
      },
      {
        name: "Tổ chức CHANGE",
        logoSources: {
          official: "https://www.change.org.vn/",
          description: "Logo CHANGE với typography hiện đại"
        }
      },
    ],
  },
  {
    id: "culture",
    name: "Văn hóa – Nghệ thuật – Sự kiện",
    partners: [
      {
        name: "Viettel Media",
        logoSources: {
          official: "https://viettelmedia.vn/",
          description: "Logo kết hợp thương hiệu Viettel với media"
        }
      },
      {
        name: "VTV",
        logoSources: {
          official: "https://vtv.vn/",
          description: "Logo VTV truyền hình Việt Nam đặc trưng"
        }
      },
      {
        name: "Nhà hát Tuổi Trẻ",
        logoSources: {
          official: "https://nhahattuoitre.vn/",
          description: "Logo nhà hát với biểu tượng nghệ thuật"
        }
      },
      {
        name: "Cục Nghệ thuật Biểu diễn",
        logoSources: {
          official: "https://bvhttdl.gov.vn/",
          description: "Logo cơ quan nhà nước về nghệ thuật"
        }
      },
    ],
  },
  {
    id: "technology",
    name: "Công nghệ & Truyền thông",
    partners: [
      {
        name: "Google Việt Nam",
        logoSources: {
          official: "https://about.google/intl/vi/",
          brand: "https://about.google/brand-resource-center/",
          description: "Logo Google đa màu sắc nổi tiếng"
        }
      },
      {
        name: "VNPT",
        logoSources: {
          official: "https://vnpt.com.vn/",
          description: "Logo VNPT với màu xanh dương đặc trưng"
        }
      },
      {
        name: "Viettel Group",
        logoSources: {
          official: "https://viettel.com.vn/",
          vector: "https://worldvectorlogo.com/logo/viettel",
          svg: "https://commons.wikimedia.org/wiki/File:Viettel_Group_en_logo.svg",
          description: "Logo Viettel mới từ 2021 với slogan 'Your way'"
        }
      },
      {
        name: "Zalo",
        logoSources: {
          official: "https://zalo.me/",
          description: "Logo Zalo với biểu tượng chat bubble màu xanh"
        }
      },
    ],
  },
  {
    id: "startup",
    name: "Khởi nghiệp & Doanh nghiệp xã hội",
    partners: [
      {
        name: "Topica Founder Institute",
        logoSources: {
          official: "https://fi.co/",
          description: "Logo Founder Institute với typography hiện đại"
        }
      },
      {
        name: "Shark Tank Vietnam",
        logoSources: {
          official: "https://sharktankvietnam.vn/",
          description: "Logo Shark Tank với biểu tượng cá mập"
        }
      },
      {
        name: "VCCI",
        logoSources: {
          official: "https://vcci.com.vn/",
          description: "Logo VCCI - Phòng Thương mại và Công nghiệp Việt Nam"
        }
      },
      {
        name: "500 Startups Vietnam",
        logoSources: {
          official: "https://500.co/",
          description: "Logo 500 Startups với màu xanh dương đặc trưng"
        }
      },
    ],
  },
];

// Utility function to get logo info
const getPartnerLogo = (categoryId, partnerName) => {
  const category = trustedPartners.find(cat => cat.id === categoryId);
  if (!category) return null;
  
  const partner = category.partners.find(p => p.name === partnerName);
  return partner ? partner.logoSources : null;
};

// Export both the data and utility function
export { trustedPartners as default, getPartnerLogo };