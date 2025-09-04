import React, { useState, useRef, useEffect } from 'react';
import recruitmentService  from '../../services/oganations/recruitmentService.js';
import { 
  Calendar, Users, MapPin, Clock, DollarSign, Briefcase, Star, Copy, Download, Edit,
  Heart, Globe, Award, Coffee, Zap, Target, BookOpen, Camera, Music, Utensils,
  Save, X, CheckCircle, Loader2, Filter, Search, Eye
} from 'lucide-react';

import { useSearchParams } from "react-router-dom";

export default function VolunteerRecruitmentPlatform() {
    const [searchParams] = useSearchParams();
  const eventId = searchParams.get('eventId');
  const type = searchParams.get('type');
  const [activeTab, setActiveTab] = useState('create');
  const [isGenerating, setIsGenerating] = useState(true);
  const [formData, setFormData] = useState({
    // Thông tin cơ bản
    organizationName: '', // tên tổ chức
    activityTitle: '', // tiêu đề hoạt động
    activityType: 'volunteer', // volunteer, collaborator
    profitType: 'nonprofit', // nonprofit, profit
    category: 'community', // lĩnh vực hoạt động
    
    // Thông tin chi tiết
    skillRequired: [], // các skill yêu cầu
    description: '', // thông tin mô tả
    volunteerRequired: '', // yêu cầu ứng viên
    interest: '', // mô tả về quyền lợi
    local: '', // vị trí diễn ra sự kiện
    timeStart: '', // thời gian bắt đầu - kết thúc
    timeEnd: '', 
    deadline: '', // hạn ứng tuyển - dùng cho tạo bài đăng fb
    
    // Thông tin bổ sung
    benefits: [],
    benefitsDescription: '',
    requirements: [],
    requirements_description: '',
    contactInfo: '',
    isRemote: false,
    compensation: '',
    commitment: 'flexible' // flexible, part-time, full-time
  });

  const [quillLoaded, setQuillLoaded] = useState(false);
  const [newRequirement ,setNewRequirement] = useState('');
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  // Categories for activities
  const categories = [
    { value: 'community', label: '🏘️ Cộng đồng', icon: Users },
    { value: 'environment', label: '🌱 Môi trường', icon: Globe },
    { value: 'education', label: '📚 Giáo dục', icon: BookOpen },
    { value: 'healthcare', label: '🏥 Y tế', icon: Heart },
    { value: 'culture', label: '🎭 Văn hóa', icon: Music },
    { value: 'sports', label: '⚽ Thể thao', icon: Award },
    { value: 'technology', label: '💻 Công nghệ', icon: Zap },
    { value: 'media', label: '📸 Truyền thông', icon: Camera },
    { value: 'food', label: '🍽️ Ẩm thực', icon: Utensils },
    { value: 'other', label: '📋 Khác', icon: Target }
  ];


  useEffect(()=> {
    const loaded = async ()=> {
        try {
            const res = await recruitmentService.getRecruitmentsById(eventId);
            if(res.success) {
                setFormData(res.data);
                quillRef.current.clipboard.dangerouslyPasteHTML(`<div>${formData.description}</div>`)
            }else {
                alert("lỗi")
            }
        }catch(err){
            console.log(err.message);
        }
    }
    if(type === 'edit') {
        loaded();
    }
  }, []);

  // Load Quill.js
  useEffect(() => {
    const loadQuill = async () => {
      if (window.Quill) {
        initializeEditor();
        return;
      }

      const quillCss = document.createElement('link');
      quillCss.rel = 'stylesheet';
      quillCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.snow.min.css';
      document.head.appendChild(quillCss);

      const quillScript = document.createElement('script');
      quillScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js';
      quillScript.onload = () => {
        setQuillLoaded(true);
        initializeEditor();
      };
      document.body.appendChild(quillScript);
    };

    loadQuill();
  }, []);


  const initializeEditor = () => {
    if (editorRef.current && window.Quill && !quillRef.current) {
      const toolbarOptions = [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'header': [1, 2, 3, false] }],
        ['link'],
        ['clean']
      ];

      quillRef.current = new window.Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: toolbarOptions
        },
        placeholder: 'Mô tả chi tiết về hoạt động, nhiệm vụ và mục tiêu...'
      });

      quillRef.current.on('text-change', () => {
        const html = quillRef.current.root.innerHTML;
        const text = quillRef.current.getText();
        setFormData(prev => ({
          ...prev,
          description: text.trim() === '' ? '' : html
        }));
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setIsGenerating(true);
  };

    const addRequirement = () => {
        const req = newRequirement.split(',');
        setFormData(prev => ({
            ...prev, 
            requirements: req
        }));
        setNewRequirement('')
    };

    const removeRequirement = (index) => {
        setFormData(prev => ({
        ...prev,
        requirements: prev.requirements.filter((_, i) => i !== index)
        }));
    };

    const saveDraft = ()=> {
       
    }
    const publish = () => {
        recruitmentService.createRecruitment(formData);
    }
    const resetForm = ()=> {
        setFormData({
            // Thông tin cơ bản
            organizationName: '', // tên tổ chức
            activityTitle: '', // tiêu đề hoạt động
            activityType: 'volunteer', // volunteer, collaborator
            profitType: 'nonprofit', // nonprofit, profit
            category: 'community', // lĩnh vực hoạt động
            
            // Thông tin chi tiết
            skillRequired: [], // các skill yêu cầu
            description: '', // thông tin mô tả
            volunteerRequired: '', // yêu cầu ứng viên
            interest: '', // mô tả về quyền lợi
            local: '', // vị trí diễn ra sự kiện
            timeStart: '', // thời gian bắt đầu - kết thúc
            timeEnd: '', 
            deadline: '', // hạn ứng tuyển - dùng cho tạo bài đăng fb
            
            // Thông tin bổ sung
            benefits: [],
            benefitsDescription: '',
            requirements: [],
            requirements_description: '',
            contactInfo: '',
            isRemote: false,
            compensation: '',
            commitment: 'flexible' // flexible, part-time, full-time
        });
        setIsGenerating(false);
    }
    const generatePreviewHtml = ()=> {}
  return (
    <div className="min-h-screen bg-green-50 rounded-lg p-5 flex flex-col gap-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:border border-gray-200 transition-all duration-200 delay-200">
            <Heart size={48} className="mx-auto text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Tình Nguyện</h3>
            <p className="text-gray-600">Kết nối với các hoạt động phi lợi nhuận ý nghĩa</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:border border-gray-200 transition-all duration-200 delay-200">
            <Briefcase size={48} className="mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Cộng Tác</h3>
            <p className="text-gray-600">Tìm cơ hội cộng tác với thù lao hấp dẫn</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:border border-gray-200 transition-all duration-200 delay-200">
            <Users size={48} className="mx-auto text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Cộng Đồng</h3>
            <p className="text-gray-600">Xây dựng mạng lưới và kết nối có ý nghĩa</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:border border-gray-200 transition-all duration-200 delay-200">
            <Award size={48} className="mx-auto text-purple-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Phát Triển</h3>
            <p className="text-gray-600">Nâng cao kỹ năng và tích lũy kinh nghiệm</p>
          </div>
        </div>
        <div className='bg-white rounded-lg p-4 w-full'>
            <h1 className='flex items-center gap-3 text-xl font-semibold mb-5'><Edit size={30} className='text-blue-600' /> Chi tiết thông tin</h1>
            <div className='w-full space-y-4 border-b-2 pb-4 border-gray-500'>
                <div className='flex gap-5 w-full'>
                    <div className='w-1/2 space-y-2'>
                        <label className="block text-sm font-semibold text-gray-700">Loại Hoạt Động</label>
                        <select name="activityType" value={formData.activityType} onChange={handleInputChange} className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors">
                            <option value="collaborator">Cộng tác viên</option>
                            <option value="volunteer">Tình nguyện viên</option>
                        </select>
                    </div>
                    <div className='w-1/2 space-y-2'>
                        <label className="block text-sm font-semibold text-gray-700">Tính Chất</label>
                        <select
                            name="profitType"
                            value={formData.profitType}
                            onChange={handleInputChange}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        >
                            <option value="nonprofit">🤝 Phi lợi nhuận</option>
                            <option value="profit">💰 Lợi nhuận</option>
                        </select>
                    </div>
                </div>
                <div className='space-y-2'>
                    <label htmlFor="organizationName" className='block text-sm font-semibold text-gray-700'>Tên tổ chức</label>
                    <input type="text" value={formData.organizationName} name="organizationName" onChange={handleInputChange} id="organizationName" placeholder='Nhập tên tổ chức' className='w-full border-2 px-3 py-2 border-gray-200 rounded-lg  focus:border-blue-500 focus:outline-none'/>
                </div>
                <div className='space-y-2'>
                    <label htmlFor="activityTitle" className='block text-sm font-semibold text-gray-700'>Tên hoạt động</label>
                    <input type="text" value={formData.activityTitle} name="activityTitle" onChange={handleInputChange} id="activityTitle" placeholder='Nhập tên hoạt động' className='w-full border-2 px-3 py-2 border-gray-200 rounded-lg  focus:border-blue-500 focus:outline-none'/>
                </div>
                <div className='flex gap-5'>
                    <div className='w-1/2 space-y-2'>
                        <label className="block text-sm font-semibold text-gray-700">Lĩnh vực</label>
                        <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors">
                            {categories.map((item, idx)=> (
                                <option key={idx} className='' value={item.value}>{item.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className='w-1/2 space-y-2'>
                        <label htmlFor='local' className="block text-sm font-semibold text-gray-700">Địa điểm</label>
                        <input type="text" name="local" onChange={handleInputChange} value={formData.local} id="local" placeholder='Nhập địa chỉ diễn ra hoạt động' className='w-full border-2 px-3 py-2 border-gray-200 rounded-lg  focus:border-blue-500 focus:outline-none'/>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <input
                    type="checkbox"
                    name="isRemote"
                    checked={formData.isRemote}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label className="text-sm font-semibold text-gray-700">
                    💻 Có thể thực hiện từ xa
                    </label>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Ngày Bắt Đầu</label>
                    <input
                        type="date"
                        name="timeStart"
                        value={formData.timeStart}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                    </div>
                    <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Ngày Kết Thúc</label>
                    <input
                        type="date"
                        name="timeEnd"
                        value={formData.timeEnd}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                    </div>
                    <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Hạn Đăng Ký</label>
                    <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                    </div>
                </div>

                {/* Volunteer Required & Commitment */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Số Lượng Cần Tuyển</label>
                    <input
                        type="text"
                        name="volunteerRequired"
                        value={formData.volunteerRequired}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="VD: 10-15 người"
                    />
                    </div>
                    <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Mức Độ Cam Kết</label>
                    <select
                        name="commitment"
                        value={formData.commitment}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    >
                        <option value="flexible">⏰ Linh hoạt</option>
                        <option value="part-time">📅 Bán thời gian</option>
                        <option value="full-time">🕒 Toàn thời gian</option>
                    </select>
                    </div>
                </div>

                {/* Compensation (for collaborators) */}
                {(formData.profitType !== 'nonprofit' || formData.activityType ) === 'collaborator' && (
                    <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-1">
                        <DollarSign size={16} className="text-green-500" />
                        Hỗ Trợ / Thù Lao
                    </label>
                    <input
                        type="text"
                        name="compensation"
                        value={formData.compensation}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="VD: 500k-1M VNĐ, Hỗ trợ ăn uống, Certificate..."
                    />
                    </div>
                )}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <Edit size={16} className="text-purple-500" />
                    Mô Tả Chi Tiết Hoạt Động
                    </label>
                    <div className="border-2 border-gray-200 rounded-lg overflow-hidden focus-within:border-blue-500 transition-colors">
                        <div ref={editorRef} className="min-h-[200px]"></div>
                    </div>
                </div>   
                <div>
                    <div className="space-y-4">
                        <label className="block text-sm font-semibold text-gray-700">Kỹ năng cần thiết</label>

                        <div className="flex gap-3 items-start">
                        <input
                            type="text"
                            value={newRequirement}
                            onChange={(e) => setNewRequirement(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
                            className="flex-1 min-w-0 p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            placeholder="Nhập các kĩ năng cần thiết (cách nhau bằng dấu ',')"
                            aria-label="Kỹ năng cần thiết"
                        />
                        <button
                            type="button"
                            onClick={addRequirement}
                            className="px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                            aria-label="Thêm kỹ năng"
                        >
                            Thêm
                        </button>
                        </div>

                        <div className="mt-2">
                        <div className="text-xs text-gray-500 mb-2">Các kỹ năng đã thêm</div>
                        <div
                            className="max-h-32 overflow-y-auto flex flex-wrap gap-2 py-2"
                            role="list"
                            aria-label="Danh sách kỹ năng"
                        >
                            {formData.requirements.map((req, index) => (
                            <div
                                key={index}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-sm max-w-full"
                                role="listitem"
                            >
                                <span className="truncate">{req}</span>
                                <button
                                onClick={() => removeRequirement(index)}
                                className="flex items-center justify-center p-1 rounded hover:bg-red-50"
                                aria-label={`Xóa ${req}`}
                                title={`Xóa ${req}`}
                                >
                                <X size={16} />
                                </button>
                            </div>
                            ))}
                            {formData.requirements.length === 0 && (
                            <div className="text-sm text-gray-400">Chưa có kỹ năng nào — hãy thêm vào.</div>
                            )}
                        </div>
                        </div>

                        <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <Edit size={16} className="text-purple-500" />
                            Mô tả yêu cầu ứng viên
                        </label>
                        <textarea
                            name="requirements_description"
                            value={formData.requirements_description}
                            onChange={handleInputChange}
                            placeholder="Mô tả chi tiết các yêu cầu (ví dụ: kinh nghiệm, bằng cấp, kỹ năng mềm…) "
                            className="w-full min-h-[120px] p-3 border-2 border-gray-200 rounded-lg resize-vertical focus:border-blue-500 focus:outline-none transition-colors"
                            aria-label="Mô tả yêu cầu ứng viên"
                        />
                        </div>
                    </div>

                    <div className="mt-6 space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <Edit size={16} className="text-purple-500" />
                            Mô tả quyền lợi & lợi ích ứng viên sẽ nhận được
                        </label>
                        <textarea
                            name="benefitsDescription"
                            value={formData.benefitsDescription}
                            onChange={handleInputChange}
                            placeholder="Liệt kê quyền lợi: lương, thưởng, bảo hiểm, môi trường làm việc, cơ hội thăng tiến..."
                            className="w-full min-h-[100px] p-3 border-2 border-gray-200 rounded-lg resize-vertical focus:border-blue-500 focus:outline-none transition-colors"
                            aria-label="Mô tả quyền lợi"
                        />
                    </div>

                    <div className="mt-6 space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <Edit size={16} className="text-purple-500" />
                            Thông tin liên hệ
                        </label>
                        <div className="flex gap-3">
                            <textarea
                                name="contactInfo"
                                value={formData.contactInfo}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                placeholder="Email: contact@org.com&#10;Phone: 0123456789&#10;Facebook: fb.com/orgname"
                            />
                        </div>
                    </div>
                </div>         
            </div>
            <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-gray-200">
                <button 
                    onClick={saveDraft} 
                    className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition flex items-center gap-2"
                >
                <Save size={16} />
                💾 Lưu nháp
                </button>
                
                <button 
                onClick={generatePreviewHtml} 
                disabled={isGenerating}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition flex items-center gap-2 disabled:opacity-50"
                >
                {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Eye size={16} />}
                🔍 Xem trước
                </button>
                
                <button 
                onClick={publish} 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 ml-auto"
                >
                <CheckCircle size={16} />
                    {type === 'edit' ? "Cập nhật" : "🚀 Đăng tuyển"}
                </button>
                
                <button 
                onClick={resetForm} 
                className="px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition flex items-center gap-2"
                >
                <X size={16} />
                🧹 Reset
                </button>
            </div>
        </div>
    </div>
  );
}