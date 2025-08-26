// data/aboutData.js
import { 
  Heart, 
  Users, 
  Globe, 
  Award, 
  Target, 
  Shield, 
  Handshake,
  Calendar,
  MapPin,
  TrendingUp,
  Star,
  Lightbulb,
  CheckCircle
} from "lucide-react";

export const heroData = {
  title: "Về VolunteerHub",
  subtitle: "Nền tảng kết nối tình nguyện viên hàng đầu Việt Nam",
  description: "Nơi những trái tim nhân ái gặp gỡ những cơ hội tạo ra sự thay đổi tích cực cho cộng đồng. Chúng tôi tin rằng mỗi người đều có thể góp phần xây dựng một xã hội tốt đẹp hơn.",
  backgroundImage: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=600&fit=crop"
};

export const statsData = [
  { 
    number: '50,000+', 
    label: 'Tình nguyện viên đăng ký', 
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    description: 'Cộng đồng tình nguyện viên năng động'
  },
  { 
    number: '2,500+', 
    label: 'Dự án đã hoàn thành', 
    icon: CheckCircle,
    color: 'from-green-500 to-green-600',
    description: 'Những dự án mang lại giá trị thực tiễn'
  },
  { 
    number: '150+', 
    label: 'Tổ chức đối tác', 
    icon: Handshake,
    color: 'from-purple-500 to-purple-600',
    description: 'Mạng lưới đối tác tin cậy'
  },
  { 
    number: '63', 
    label: 'Tỉnh thành tham gia', 
    icon: MapPin,
    color: 'from-orange-500 to-orange-600',
    description: 'Phủ sóng toàn quốc'
  }
];

export const valuesData = [
  {
    icon: Heart,
    title: 'Tình yêu thương',
    description: 'Lan tỏa tình yêu thương và sự quan tâm đến cộng đồng thông qua các hoạt động tình nguyện ý nghĩa, tạo nên những thay đổi tích cực.',
    color: 'text-red-500',
    bgColor: 'bg-red-50'
  },
  {
    icon: Shield,
    title: 'Minh bạch',
    description: 'Đảm bảo tính minh bạch trong mọi hoạt động, từ việc quản lý dự án đến sử dụng nguồn lực và báo cáo kết quả.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Users,
    title: 'Đoàn kết',
    description: 'Xây dựng cộng đồng tình nguyện viên đoàn kết, hỗ trợ lẫn nhau trong mọi hoạt động và chia sẻ kinh nghiệm.',
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  {
    icon: Target,
    title: 'Hiệu quả',
    description: 'Tối ưu hóa tác động tích cực đến cộng đồng thông qua các dự án được thiết kế chu đáo và theo dõi chặt chẽ.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  },
  {
    icon: Lightbulb,
    title: 'Sáng tạo',
    description: 'Luôn tìm kiếm những giải pháp sáng tạo để giải quyết các vấn đề xã hội và tạo ra những hoạt động tình nguyện mới mẻ.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50'
  },
  {
    icon: Star,
    title: 'Chất lượng',
    description: 'Cam kết mang lại chất lượng cao trong mọi dự án và dịch vụ, đảm bảo trải nghiệm tốt nhất cho người tham gia.',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50'
  }
];

export const timelineData = [
  {
    year: '2020',
    title: 'Khởi đầu hành trình',
    description: 'VolunteerHub được thành lập với tầm nhìn kết nối cộng đồng tình nguyện viên trên toàn quốc.',
    achievements: [
      '1,000 tình nguyện viên đầu tiên',
      '50 dự án khởi động',
      'Ra mắt website chính thức'
    ],
    color: 'bg-blue-500'
  },
  {
    year: '2021',
    title: 'Phát triển vững chắc',
    description: 'Mở rộng hoạt động ra 15 tỉnh thành với sự tham gia của nhiều tổ chức uy tín.',
    achievements: [
      '10,000 tình nguyện viên',
      '200 dự án hoàn thành',
      '20 đối tác chiến lược'
    ],
    color: 'bg-green-500'
  },
  {
    year: '2022',
    title: 'Đột phá công nghệ',
    description: 'Ra mắt ứng dụng di động và hệ thống quản lý dự án thông minh AI-powered.',
    achievements: [
      '25,000 lượt tải app',
      '500 dự án công nghệ',
      'Giải thưởng Startup của năm'
    ],
    color: 'bg-purple-500'
  },
  {
    year: '2023',
    title: 'Mở rộng toàn quốc',
    description: 'Phủ sóng 63 tỉnh thành với mạng lưới tình nguyện viên khắp Việt Nam.',
    achievements: [
      '35,000 tình nguyện viên',
      '1,500 dự án hoàn thành',
      '80 tổ chức đối tác'
    ],
    color: 'bg-orange-500'
  },
  {
    year: '2024',
    title: 'Dẫn đầu thị trường',
    description: 'Trở thành nền tảng tình nguyện số 1 Việt Nam với nhiều tính năng tiên tiến.',
    achievements: [
      '50,000+ tình nguyện viên',
      '2,500+ dự án hoàn thành',
      '150+ đối tác tin cậy'
    ],
    color: 'bg-red-500'
  }
];

export const teamData = [
  {
    id: 1,
    name: 'Nguyễn Minh An',
    role: 'Founder & CEO',
    description: 'Với hơn 12 năm kinh nghiệm trong lĩnh vực phát triển cộng đồng và công nghệ xã hội. Đã khởi xướng hơn 200 dự án tình nguyện ý nghĩa.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    achievements: [
      'Forbes 30 Under 30 Vietnam 2023',
      'Giải thưởng Doanh nhân Xã hội 2022',
      'TEDx Speaker'
    ],
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'minh.an@volunteerhub.vn'
    }
  },
  {
    id: 2,
    name: 'Trần Thu Bình',
    role: 'Chief Program Officer',
    description: 'Chuyên gia hàng đầu trong việc thiết kế và quản lý các chương trình tình nguyện quy mô lớn. Thạc sĩ Quản trị Phi lợi nhuận từ Harvard.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    achievements: [
      '10+ năm kinh nghiệm NGO',
      'Chứng chỉ PMP',
      'Tác giả 3 cuốn sách về tình nguyện'
    ],
    social: {
      linkedin: '#',
      email: 'thu.binh@volunteerhub.vn'
    }
  },
  {
    id: 3,
    name: 'Lê Đức Cường',
    role: 'Chief Technology Officer',
    description: 'Kỹ sư phần mềm senior với 15 năm kinh nghiệm. Đảm bảo nền tảng công nghệ vận hành ổn định và liên tục đổi mới trải nghiệm người dùng.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    achievements: [
      'Ex-Google Software Engineer',
      'AWS Solutions Architect',
      '5 bằng sáng chế công nghệ'
    ],
    social: {
      github: '#',
      linkedin: '#',
      email: 'duc.cuong@volunteerhub.vn'
    }
  },
  {
    id: 4,
    name: 'Phạm Thị Dung',
    role: 'Chief Marketing Officer',
    description: 'Chuyên gia marketing và truyền thông với kinh nghiệm 10+ năm tại các tập đoàn lớn. Chuyên về xây dựng thương hiệu và engagement cộng đồng.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    achievements: [
      'Ex-Unilever Marketing Director',
      'Digital Marketing Excellence Award',
      'MBA từ INSEAD'
    ],
    social: {
      linkedin: '#',
      instagram: '#',
      email: 'thi.dung@volunteerhub.vn'
    }
  }
];

export const missionData = {
  title: 'Sứ mệnh của chúng tôi',
  vision: 'Trở thành nền tảng kết nối tình nguyện hàng đầu Đông Nam Á, nơi mọi người có thể dễ dàng tham gia và tạo ra những thay đổi tích cực cho xã hội.',
  mission: 'Kết nối những trái tim nhân ái với những cơ hội tình nguyện ý nghĩa, xây dựng một cộng đồng tình nguyện mạnh mẽ và bền vững thông qua công nghệ và sự đổi mới.',
  goals2025: [
    {
      target: '100,000 tình nguyện viên',
      description: 'Xây dựng cộng đồng tình nguyện viên lớn nhất Việt Nam'
    },
    {
      target: '10,000 dự án',
      description: 'Triển khai các dự án tình nguyện đa dạng và ý nghĩa'
    },
    {
      target: '500 tổ chức',
      description: 'Hợp tác với các tổ chức xã hội uy tín'
    },
    {
      target: '5 triệu giờ tình nguyện',
      description: 'Tạo ra tác động tích cực đo đếm được'
    }
  ],
  impact: {
    communities: '1,200+ cộng đồng được hỗ trợ',
    beneficiaries: '500,000+ người được hưởng lợi',
    funds: '50+ tỷ VNĐ quy ầm gây quỹ',
    awards: '25+ giải thưởng quốc tế'
  }
};

export const ctaData = {
  title: 'Sẵn sàng tham gia cùng chúng tôi?',
  description: 'Hãy trở thành một phần của cộng đồng tình nguyện năng động và tạo ra những thay đổi tích cực cho xã hội ngay hôm nay.',
  primaryButton: {
    text: 'Đăng ký tình nguyện viên',
    action: 'register'
  },
  secondaryButton: {
    text: 'Tạo dự án tình nguyện',
    action: 'create-project'
  },
  features: [
    'Miễn phí 100%',
    'Hỗ trợ 24/7',
    'Cộng đồng hơn 50,000 thành viên',
    'Các dự án đa dạng và ý nghĩa'
  ]
};