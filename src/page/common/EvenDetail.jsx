import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Phone,
  Mail,
  Star,
  Share2,
  Edit,
  Trash2,
  CheckCircle,
  Eye,
  MessageSquare,
  Download,
  Tag,
  Shield,
  TrendingUp,
  UserCheck,
  Clock3,
  BarChart3,
  Flag,
  Ban,
  Bell,
  QrCode,
  X,
  Zap, 
  Search,
  ArrowRightCircle
} from 'lucide-react';

import { Link } from 'react-router-dom';

/**
 * BenefitsCard: hiển thị quyền lợi + extras
 */
function BenefitsCard({ eventData = {} }) {
  const benefitsObj = eventData.benefits || {};

  const benefitLabels = {
    meals: { label: 'Bữa ăn', desc: 'Các buổi ăn chính trong sự kiện' },
    transportation: { label: 'Đi lại', desc: 'Hỗ trợ chi phí đi lại theo quy định' },
    insurance: { label: 'Bảo hiểm', desc: 'Bảo hiểm tai nạn sự kiện' },
    certificate: { label: 'Chứng nhận', desc: 'Cấp chứng nhận tham gia' },
    uniform: { label: 'Trang phục', desc: 'Trang phục/đồng phục nếu có' },
    training: { label: 'Đào tạo', desc: 'Chương trình đào tạo/huấn luyện' },
    allowance: { label: 'Phụ cấp', desc: 'Phụ cấp (nếu có)' },
  };

  const activeBenefits = Object.entries(benefitsObj).filter(([_, v]) => v === true).map(([k]) => k);

  const extras = [
    {
      key: 'supportFee',
      Icon: DollarSign,
      title: 'Phí hỗ trợ',
      text: 'Cộng tác viên: 500.000 ₫/ngày',
      highlight: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(500000),
    },
    {
      key: 'mealsDetail',
      Icon: Tag,
      title: 'Các buổi ăn chính',
      text: 'Cung cấp các buổi ăn chính trong suốt thời gian sự kiện.',
    },
    {
      key: 'accommodation',
      Icon: Shield,
      title: 'Chi phí ăn ở',
      text: 'Toàn bộ chi phí ăn ở được hỗ trợ nếu bạn cần ở lại khu vực tổ chức.',
    },
    {
      key: 'experience',
      Icon: UserCheck,
      title: 'Cập nhật kinh nghiệm',
      text: 'Cơ hội nâng cao và cập nhật kinh nghiệm trong lĩnh vực Tổ chức sự kiện.',
    },
    {
      key: 'networking',
      Icon: Users,
      title: 'Mở rộng mối quan hệ',
      text: 'Kết nối mở rộng các mối quan hệ nghề nghiệp và hợp tác.',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Quyền lợi</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
        {activeBenefits.length === 0 ? (
          <div className="col-span-2 text-sm text-gray-500">Không có quyền lợi cụ thể được liệt kê.</div>
        ) : (
          activeBenefits.map((key) => {
            const info = benefitLabels[key] || { label: key };
            return (
              <div
                key={key}
                className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg"
                title={info.desc || ''}
                role="listitem"
              >
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-800">{info.label}</div>
                  {info.desc && <div className="text-xs text-gray-500">{info.desc}</div>}
                </div>
              </div>
            );
          })
        )}
      </div>

      <hr className="border-t border-gray-100 my-4" />

      <div className="space-y-3">
        {extras.map((ex) => {
          const Icon = ex.Icon;
          return (
            <div key={ex.key} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                <Icon className="w-5 h-5 text-gray-500" />
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline space-x-2">
                  <h4 className="text-sm font-semibold text-gray-800">{ex.title}</h4>
                  {ex.highlight && <span className="text-xs text-green-600 font-medium">{ex.highlight}</span>}
                </div>
                <p className="text-sm text-gray-600">{ex.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ChevronRightIconPlaceholder = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 6l6 6-6 6" /></svg>;


const FAQsWidget = () => {
  const [mockFAQs, setFAQs] = useState([
    {
      question: "Làm thế nào để đăng ký tham gia tình nguyện?",
      answer:
        "Bạn chỉ cần tạo tài khoản trên VHub, hoàn thiện hồ sơ cá nhân và ứng tuyển vào các dự án phù hợp. Chúng tôi sẽ kết nối bạn với tổ chức tương ứng.",
    },
    {
      question: "Có cần kinh nghiệm trước khi tham gia không?",
      answer:
        "Không nhất thiết! Nhiều dự án chào đón tình nguyện viên mới. Chúng tôi có chương trình đào tạo cơ bản cho những người mới bắt đầu.",
    },
    {
      question: "Chi phí tham gia tình nguyện như thế nào?",
      answer: "Hầu hết các hoạt động tình nguyện đều miễn phí. Một số dự án còn hỗ trợ chi phí đi lại, ăn uống và chỗ ở cho tình nguyện viên.",
    },
  ]);
  const [openIndex, setOpenIndex] = useState(null);
  useEffect(() => {},[]);
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-3">Câu hỏi thường gặp</h3>
      <div className="space-y-3">
        {mockFAQs.map((faq, i) => (
          <div key={i} className="border border-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-3 text-left"
            >
              <span className="font-medium text-gray-700">{faq.question}</span>
              <span className="text-gray-500">{openIndex === i ? <X className="w-4 h-4" /> : <ChevronRightIconPlaceholder />}</span>
            </button>
            {openIndex === i && (
              <div className="p-3 border-t border-gray-100 text-sm text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


const BlogPostsWidget = () => {
  const [mockBlogPosts, setMockBlogPosts] = useState([
    {
      id: 1,
      title: "5 kỹ năng cần thiết cho tình nguyện viên mới",
      excerpt: "Khám phá những kỹ năng cơ bản giúp bạn thành công trong công việc tình nguyện đầu tiên",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop",
      author: "Mai Linh",
      date: "2024-09-15",
      readTime: "5 phút",
      category: "Hướng dẫn",
    },
    {
      id: 2,
      title: "Tác động tích cực của hoạt động tình nguyện",
      excerpt: "Nghiên cứu mới cho thấy lợi ích to lớn của việc tham gia hoạt động tình nguyện đối với sức khỏe tinh thần",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&h=200&fit=crop",
      author: "Đức Minh",
      date: "2024-09-12",
      readTime: "7 phút",
      category: "Nghiên cứu",
    },
  ]);
  useEffect(() => {},[]);
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">Bài viết hữu ích</h3>
        <Link to="/community" className="text-sm text-gray-600 hover:text-gray-800">Xem thêm</Link>
      </div>

      <div className="flex flex-col gap-4">
        {mockBlogPosts.map((post) => (
          <article key={post.id} className="flex gap-3 bg-gray-50 rounded-lg overflow-hidden">
            <img src={post.image} alt={post.title} className="w-28 h-full object-cover" />
            <div className="p-3">
              <h4 className="font-semibold text-sm">{post.title}</h4>
              <p className="text-xs text-gray-600 my-2 line-clamp-2">{post.excerpt}</p>
              <div className="text-xs text-gray-500">{post.author} • {post.readTime}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};



const NewsUpdatesWidget = () => {
  const [mockNewsUpdates, setMockNewsUpdates] = useState([
    {
      id: 1,
      title: "VHub ra mắt tính năng AI Match - kết nối tình nguyện viên thông minh",
      excerpt: "Công nghệ AI giúp tìm kiếm cơ hội tình nguyện phù hợp 95% chính xác hơn",
      timestamp: "2 giờ trước",
      type: "Công nghệ",
    },
    {
      id: 2,
      title: "1000 tình nguyện viên tham gia chiến dịch trồng rừng tại Tây Nguyên",
      excerpt: "Dự án trồng 50,000 cây xanh đã thu hút sự tham gia nhiệt tình của cộng đồng",
      timestamp: "5 giờ trước",
      type: "Môi trường",
    },
    {
      id: 3,
      title: "Chương trình học bổng 500 triệu cho tình nguyện viên xuất sắc",
      excerpt: "50 suất học bổng toàn phần dành cho các tình nguyện viên có đóng góp tích cực",
      timestamp: "1 ngày trước",
      type: "Học bổng",
    },
  ]);
  useEffect(() => {}, []);
  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg p-6 border border-purple-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Bell className="w-5 h-5 text-purple-500" />
          Tin tức nổi bật
        </h3>
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      </div>

      <div className="space-y-4">
        {mockNewsUpdates.map((news) => (
          <div key={news.id} className="bg-white rounded-xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 rounded-lg p-2 flex-shrink-0">
                <Zap className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2">{news.title}</h4>
                <p className="text-xs text-gray-600 line-clamp-2 mb-2">{news.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{news.type}</span>
                  <span className="text-xs text-gray-500">{news.timestamp}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UpcomingEventsWidget = () => {
  const [mockUpcomingEvents, setMockUpcomingEvents] = useState([
    {
      id: 1,
      title: "Ngày hội Tình nguyện 2024",
      date: "2024-10-25",
      time: "08:00",
      location: "Công viên Thống Nhất, Hà Nội",
      attendees: 1200,
      type: "Sự kiện lớn",
    },
    {
      id: 2,
      title: "Workshop: Kỹ năng làm việc nhóm",
      date: "2024-10-22",
      time: "19:00",
      location: "Online via Zoom",
      attendees: 250,
      type: "Đào tạo",
    },
    {
      id: 3,
      title: "Chiến dịch dọn rác biển Vũng Tàu",
      date: "2024-10-28",
      time: "06:00",
      location: "Bãi biển Vũng Tàu",
      attendees: 500,
      type: "Môi trường",
    },
  ]);

  useEffect(() => {}, []); 
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          Sự kiện sắp diễn ra
        </h3>
        <Link to="/events" className="text-blue-600 text-sm font-semibold hover:text-blue-700">
          Xem tất cả
        </Link>
      </div>

      <div className="space-y-4">
        {mockUpcomingEvents.map((event) => (
          <div key={event.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="bg-blue-100 rounded-lg p-2 flex-shrink-0">
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">{event.title}</h4>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <span>{new Date(event.date).toLocaleDateString('vi-VN')}</span>
                <span>•</span>
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">{event.type}</span>
                <span className="text-xs text-gray-500">{event.attendees} người tham gia</span>
              </div>
            </div>
            <div className="text-xs text-gray-400">{event.location && <MapPin className="w-4 h-4 inline-block mr-1" />} </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default function EventDetailPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [eventStatus, setEventStatus] = useState('active');

  // MOCK DATA (giữ nguyên từ yêu cầu)
  const eventData = {
    id: 'EVT-2024-001',
    title: 'Lễ hội Festival Áo Dài Bản Sắc Việt Nam 2025',
    description: `Lễ hội Festival Áo dài Bản Sắc Việt Nam 2025 tôn vinh vẻ đẹp truyền thống của áo dài Việt Nam, thúc đẩy phát triển du lịch, quảng bá hình ảnh đất nước Việt Nam, bạn bè trong nước và quốc tế, gắn kết cộng đồng qua các hoạt động. Chương trình biểu diễn và diễu hành được thực hiện với quy mô lớn do Công ty CP Tập đoàn thương mại Toàn Cầu HB, Công Ty Cổ Phần Vinhomes, cùng với Liên hiệp Phụ nữ tỉnh Hưng Yên phối hợp với Sở Du lịch, CLB liên kết trẻ đoàn Thanh niên Việt Nam và Hội phụ nữ Việt Toàn Cầu, Công ty CP thiết kế và xây dựng SABO HOME tổ chức nhằm lan toả tình yêu áo dài đến đông đảo người dân, bạn bè và du khách quốc tế.
Chúng mình hoan nghênh tất cả những bạn trẻ năng động và nhiệt tình với những kinh nghiệm trong công tác tổ chức các sự kiện trước đây, đặc biệt là những bạn mà chúng mình đã từng được làm việc cùng ở những sự kiện trước.
Chúng mình rất hy vọng đem đến những trải nghiệm đáng nhớ cho tất cả các khán giả tham gia sự kiện và Cộng tác viên!`,
    category: ['Văn hóa - Nghệ thuật'],
    eventType: 'volunteer',
    status: 'active',
    priority: 'high',
    startDate: '2024-12-15',
    endDate: '2024-12-15',
    startTime: '06:00',
    endTime: '11:00',
    deadline: '2024-12-13',
    location: 'Vinhomes Oceanpark 3, Hưng Yên',
    address: null,
    coordinates: { lat: 10.3364, lng: 107.0861 },
    organizer: {
      name: 'Green Earth Vietnam',
      type: 'verified_partner',
      logo: 'https://cdn-new.topcv.vn/unsafe/80x/https://static.topcv.vn/company_logos/cong-ty-tnhh-carbon-billiards-9295ac6b19af9e7bbd93ad045907a69b-6597af4fd3fe4.jpg',
      rating: 4.8,
      eventsOrganized: 45,
      trustScore: 95,
    },
    contactInfo: {
      coordinatorName: 'Nguyễn Thị Hương',
      phone: '0901234567',
      email: 'huong@greenearth.vn',
      alternateContact: '0907654321',
    },
    volunteersNeeded: null,
    volunteersRegistered: 32,
    volunteersConfirmed: 28,
    minAge: 16,
    maxAge: 60,
    genderRequirement: 'any',
    experienceLevel: 'beginner',
    skillsRequired: ['Thể lực tốt', 'Tinh thần trách nhiệm'],
    desSkill: [
      'Nhiệt tình, có trách nhiệm với công việc được giao.',
      'Tham gia đầy đủ những buổi họp - tập huấn (cụ thể sẽ được thông báo sau).',
      'Tham gia ít nhất 2 ngày liên tiếp trong thời gian diễn ra sự kiện.',
      'Tuân thủ mọi thông tin, yêu cầu của Ban Tổ Chức, trong mọi trường hợp quyết định của BTC sẽ là quyết định cuối cùng.',
    ],
    registrationDeadline: '2024-12-13',
    benefits: {
      meals: true,
      transportation: true,
      insurance: true,
      certificate: true,
      uniform: true,
      training: false,
      allowance: false,
      allowanceAmount: 0,
    },
    coverImage:
      'https://res.cloudinary.com/dcvrdyzo1/image/upload/v1758554226/p5h9gebipsivdmehftsd.jpg',
    additionalImages: [],
    autoApprove: false,
    requireBackground: false,
    isPublic: true,
    tags: ['môi trường', 'biển', 'tình nguyện', 'vũng tàu', 'làm sạch'],
    stats: {
      views: 1250,
      applications: 32,
      approved: 28,
      pending: 4,
      rejected: 0,
      completionRate: 92,
      avgRating: 4.6,
    },
    createdAt: '2024-11-20T10:30:00Z',
    updatedAt: '2024-12-01T15:45:00Z',
    createdBy: 'Green Earth Admin',
    isFinite: false,
  };

  const applications = [
    {
      id: 1,
      volunteer: {
        id: 1,
        name: 'Trần Văn Minh',
        avatar: '/api/placeholder/40/40',
        age: 24,
        experience: 'intermediate',
        skills: ['Thể lực tốt', 'Kinh nghiệm môi trường'],
        rating: 4.8,
        completedEvents: 15,
        verificationStatus: 'verified',
      },
      applicationDate: '2024-11-25T09:15:00Z',
      status: 'approved',
      message: 'Tôi rất quan tâm đến vấn đề môi trường và đã tham gia nhiều hoạt động tương tự.',
      adminNotes: 'TNV có kinh nghiệm, profile tốt',
    },
    {
      id: 2,
      volunteer: {
        id: 2,
        name: 'Lê Thị Hoa',
        avatar: '/api/placeholder/40/40',
        age: 28,
        experience: 'beginner',
        skills: ['Nhiệt huyết', 'Tinh thần trách nhiệm'],
        rating: 4.5,
        completedEvents: 3,
        verificationStatus: 'verified',
      },
      applicationDate: '2024-11-26T14:20:00Z',
      status: 'pending',
      message: 'Đây là lần đầu tôi tham gia hoạt động môi trường, mong được học hỏi.',
      adminNotes: '',
    },
  ];

  const applicationTrendData = [
    { date: '20/11', applications: 5, approvals: 4 },
    { date: '21/11', applications: 8, approvals: 7 },
    { date: '22/11', applications: 6, approvals: 5 },
    { date: '25/11', applications: 10, approvals: 9 },
    { date: '26/11', applications: 3, approvals: 3 },
  ];

  const skillsDistribution = [
    { skill: 'Thể lực tốt', count: 28 },
    { skill: 'Kinh nghiệm môi trường', count: 15 },
    { skill: 'Tinh thần trách nhiệm', count: 32 },
    { skill: 'Nhiệt huyết', count: 25 },
  ];

  const getStatusConfig = (status) => {
    const configs = {
      draft: { label: 'Nháp' },
      pending: { label: 'Chờ duyệt' },
      active: { label: 'Đang hoạt động' },
      paused: { label: 'Tạm dừng' },
      completed: { label: 'Hoàn thành' },
      cancelled: { label: 'Đã hủy' },
    };
    return configs[status] || configs.draft;
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      low: { label: 'Thấp' },
      normal: { label: 'Bình thường' },
      high: { label: 'Cao' },
      urgent: { label: 'Khẩn cấp' },
    };
    return configs[priority] || configs.normal;
  };

 const formatDateDMY = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return '';

    return d.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }); // ví dụ: "15/12/2024"
  };

  const formatTime = (timeString) => timeString;

  const statusConfig = getStatusConfig(eventData.status);
  const priorityConfig = getPriorityConfig(eventData.priority);


  return (
    <div className="mt-14 md:mt-0 min-h-screen bg-gray-50 p-4 sm:px-20">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-5 md:mb-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl text-wrap font-bold text-gray-900 truncate">{eventData.title}</h1>
              <div className="flex flex-col md:flex-row flex-wrap md:items-center gap-4 text-sm text-gray-600 mt-3">
                <span> Đăng lúc: {formatDateDMY(eventData.createdAt)}</span>
                <span> Bởi: {eventData.createdBy}</span>
                <span className='font-semibold text-red-700'> Hạn đăng ký: {formatDateDMY(eventData.deadline)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center items-end  gap-2">
              <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Share2 className="w-4 h-4 mr-2" />
                Chia sẻ
              </button>
              <button className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <ArrowRightCircle className="w-4 h-4 mr-2" />
                Ứng tuyển
              </button>
            </div>
          </div>
        </div>


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main */}
            <div className="lg:col-span-2 space-y-6">
              <div className='rounded-xl overflow-hidden shadow-sm '>
                <div className="bg-white shadow-sm overflow-hidden">
                  <img src={eventData.coverImage} alt="Event cover" className="w-full h-56 sm:h-72 md:h-80 object-cover" />
                </div>
                <div className="bg-white p-6">
                  <h3 className="text-lg font-semibold mb-4">Mô tả sự kiện</h3>
                  <div className="prose max-w-none">
                    {eventData.description.split('\n').map((paragraph, idx) => (
                      <p key={idx} className="text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                  ))}
                </div>
              </div>
              </div>


              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Yêu cầu tình nguyện viên</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-3 text-sm text-gray-700">
                      <div className="flex justify-between"><span className="text-gray-600">Số lượng cần tuyển:</span><span className="font-medium">{eventData.volunteersNeeded !== null ? `${eventData.volunteersNeeded} Người` : ''}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Độ tuổi:</span><span className="font-medium">{eventData.minAge !== null && eventData.maxAge !== null ? `${eventData.minAge} - ${eventData.maxAge} tuổi` : 'Không yêu cầu'}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Giới tính:</span><span className="font-medium">{eventData.genderRequirement === 'any' ? 'Không yêu cầu' : eventData.genderRequirement}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Kinh nghiệm:</span><span className="font-medium capitalize">{eventData.experienceLevel}</span></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium mb-3">Yêu cầu thêm:</h4>
                  <p className="mb-2 text-sm font-semibold text-gray-500">BTC đang tìm kiếm những bạn có thể đáp ứng những tiêu chí sau:</p>
                  <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700">
                    {eventData.desSkill.map((skill, idx) => (
                      <li key={`${skill}-${idx}`}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <BenefitsCard eventData={eventData} />
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Thông tin sự kiện</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">{formatDateDMY(eventData.startDate)}</p>
                      <p className="text-sm text-gray-600">{formatTime(eventData.startTime)} - {formatTime(eventData.endTime)}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">{eventData.location}</p>
                      <p className="text-sm text-gray-600">{eventData.address || ''}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{eventData.volunteersRegistered || 0} người</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Tag className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <h4 className="font-medium mb-2">Danh mục sự kiện:</h4>
                      <ul className="list-none ml-0 space-y-2">
                        {eventData.category.map((cat, idx) => (
                          <li key={`${cat}-${idx}`}>
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">{cat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Thông tin tổ chức</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <img src={eventData.organizer.logo} alt="Organizer logo" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-medium">{eventData.organizer.name}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm">{eventData.organizer.rating}</span>
                      </div>
                      {eventData.organizer.type === 'verified_partner' && <Shield className="w-4 h-4 text-blue-500" />}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600">Sự kiện đã tổ chức:</span><span className="font-medium">{eventData.organizer.eventsOrganized}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Điểm tin cậy:</span><span className="font-medium">{eventData.organizer.trustScore}%</span></div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {eventData.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#{tag}</span>
                  ))}
                </div>
              </div>
              <UpcomingEventsWidget />
              <NewsUpdatesWidget />
              <BlogPostsWidget />
              <FAQsWidget />
            </aside>
          </div>

      </div>
    </div>
  );
}
