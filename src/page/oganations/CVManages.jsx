import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Calendar, Users, MapPin, Clock, DollarSign, Briefcase, Star, Copy, Edit,
  Heart, Globe, Award, Zap, Target, BookOpen, Camera, Music, Utensils,
  X, CheckCircle, Loader2, Save, Eye
} from 'lucide-react';

export default function VolunteerRecruitmentPlatform() {
  const [formData, setFormData] = useState({
    // Thông tin cơ bản
    organizationName: '',
    activityTitle: '',
    activityType: 'volunteer',
    profitType: 'nonprofit',
    category: 'community',

    // Chi tiết
    skillRequired: [],
    description: '',
    volunteerRequired: '',
    interest: '',
    local: '',
    timeStart: '',
    timeEnd: '',
    deadline: '',

    // Thông tin bổ sung
    benefits: [],
    requirements: [],
    requirementsDescription: '',
    benefitsDescription: '',
    contactInfo: '',
    isRemote: false,
    compensation: '',
    commitment: 'flexible'
  });

  // Local inputs for adding items
  const [newRequirement, setNewRequirement] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  const [newSkill, setNewSkill] = useState('');

  // Quill states
  const [quillLoaded, setQuillLoaded] = useState(false);
  const [quillLoading, setQuillLoading] = useState(false);
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const textChangeTimeout = useRef(null);

  // UI states
  const [generatedJobHtml, setGeneratedJobHtml] = useState('');
  const [jobPosts, setJobPosts] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

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

  const commonSkills = [
    'Giao tiếp', 'Tổ chức sự kiện', 'Marketing', 'Thiết kế', 'Nhiếp ảnh',
    'Video editing', 'Quản lý social media', 'Dịch thuật', 'MC', 'Hướng dẫn viên',
    'Kế toán', 'Pháp lý', 'Công nghệ thông tin', 'Nấu ăn', 'Âm nhạc'
  ];

  // Show feedback message
  const showFeedback = useCallback((type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback({ type: '', message: '' }), 3000);
  }, []);

  // Load Quill editor
  useEffect(() => {
    let cancelled = false;

    const loadQuill = async () => {
      if (window.Quill) {
        setQuillLoaded(true);
        initQuill();
        return;
      }

      if (quillLoading) return;
      setQuillLoading(true);

      try {
        // Load CSS
        if (!document.querySelector('link[href*="quill"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.snow.min.css';
          document.head.appendChild(link);
        }

        // Load JS
        if (!document.querySelector('script[src*="quill"]')) {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js';
          
          const loadPromise = new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
          });
          
          document.body.appendChild(script);
          await loadPromise;
        }

        if (!cancelled) {
          setQuillLoaded(true);
          setQuillLoading(false);
          // Small delay to ensure DOM is ready
          setTimeout(() => initQuill(), 100);
        }
      } catch (error) {
        console.error('Failed to load Quill:', error);
        setQuillLoading(false);
        showFeedback('error', 'Không thể tải editor. Vui lòng refresh trang.');
      }
    };

    const initQuill = () => {
      if (!editorRef.current || !window.Quill || quillRef.current) return;

      try {
        const toolbarOptions = [
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ header: [1, 2, 3, false] }],
          ['link'],
          ['clean']
        ];

        quillRef.current = new window.Quill(editorRef.current, {
          theme: 'snow',
          modules: { toolbar: toolbarOptions },
          placeholder: 'Mô tả chi tiết về hoạt động, nhiệm vụ và mục tiêu...'
        });

        // Set initial content if exists
        if (formData.description) {
          try {
            quillRef.current.clipboard.dangerouslyPasteHTML(formData.description);
          } catch (e) {
            quillRef.current.setText(formData.description);
          }
        }

        // Debounced text change handler
        const handleTextChange = () => {
          if (!quillRef.current) return;
          
          if (textChangeTimeout.current) {
            clearTimeout(textChangeTimeout.current);
          }
          
          textChangeTimeout.current = setTimeout(() => {
            const html = quillRef.current.root.innerHTML;
            const text = quillRef.current.getText().trim();
            
            setFormData(prev => ({
              ...prev,
              description: text === '' ? '' : html
            }));
          }, 300);
        };

        quillRef.current.on('text-change', handleTextChange);
        
      } catch (error) {
        console.error('Failed to initialize Quill:', error);
        showFeedback('error', 'Lỗi khởi tạo editor');
      }
    };

    loadQuill();

    return () => {
      cancelled = true;
      if (textChangeTimeout.current) {
        clearTimeout(textChangeTimeout.current);
      }
      if (quillRef.current) {
        try {
          quillRef.current.off('text-change');
        } catch (e) {
          // Ignore cleanup errors
        }
        quillRef.current = null;
      }
    };
  }, [formData.description, quillLoading, showFeedback]);

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Requirements management
  const addRequirement = (manual) => {
    const raw = (manual ?? newRequirement ?? '').trim();
    if (!raw) return;
    
    const items = raw.includes(',') 
      ? raw.split(',').map(s => s.trim()).filter(Boolean)
      : [raw];
    
    setFormData(prev => ({ 
      ...prev, 
      requirements: [...prev.requirements, ...items] 
    }));
    setNewRequirement('');
    showFeedback('success', `Đã thêm ${items.length} yêu cầu`);
  };

  const removeRequirement = (index) => {
    setFormData(prev => {
      const arr = [...prev.requirements];
      arr.splice(index, 1);
      return { ...prev, requirements: arr };
    });
  };

  // Benefits management
  const addBenefit = () => {
    const b = newBenefit.trim();
    if (!b) return;
    
    setFormData(prev => ({ 
      ...prev, 
      benefits: [...prev.benefits, b] 
    }));
    setNewBenefit('');
    showFeedback('success', 'Đã thêm quyền lợi');
  };

  const removeBenefit = (idx) => {
    setFormData(prev => {
      const arr = [...prev.benefits];
      arr.splice(idx, 1);
      return { ...prev, benefits: arr };
    });
  };

  // Skills management
  const addSkill = (skill) => {
    const s = (skill ?? newSkill ?? '').trim();
    if (!s) return;
    
    // Check if skill already exists
    if (formData.skillRequired.includes(s)) {
      showFeedback('warning', 'Kỹ năng đã tồn tại');
      return;
    }
    
    setFormData(prev => ({ 
      ...prev, 
      skillRequired: [...prev.skillRequired, s] 
    }));
    setNewSkill('');
    showFeedback('success', 'Đã thêm kỹ năng');
  };

  const removeSkill = (idx) => {
    setFormData(prev => {
      const arr = [...prev.skillRequired];
      arr.splice(idx, 1);
      return { ...prev, skillRequired: arr };
    });
  };

  // Generate preview
  const generatePreviewHtml = () => {
    setIsGenerating(true);
    
    // Simulate some processing time for better UX
    setTimeout(() => {
      const html = `
        <div class="job-preview">
          <h2 style="color: #1f2937; margin-bottom: 16px;">${formData.activityTitle || 'Không có tiêu đề'}</h2>
          <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <p><strong>🏢 Tổ chức:</strong> ${formData.organizationName || 'Chưa cung cấp'}</p>
            <p><strong>📍 Địa điểm:</strong> ${formData.local || 'Chưa cung cấp'} ${formData.isRemote ? '(Có thể làm từ xa)' : ''}</p>
            <p><strong>⏰ Hạn đăng ký:</strong> ${formData.deadline || 'Chưa cung cấp'}</p>
            <p><strong>💼 Loại:</strong> ${formData.activityType === 'volunteer' ? 'Tình nguyện' : 'Cộng tác'}</p>
            <p><strong>🎯 Lĩnh vực:</strong> ${categories.find(c => c.value === formData.category)?.label || formData.category}</p>
          </div>
          
          <h3 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">📝 Mô tả hoạt động</h3>
          <div style="margin: 16px 0; line-height: 1.6;">
            ${formData.description || '<em style="color: #6b7280;">Chưa có mô tả chi tiết</em>'}
          </div>
          
          ${formData.skillRequired.length ? `
          <h3 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">🛠️ Kỹ năng yêu cầu</h3>
          <div style="margin: 16px 0;">
            ${formData.skillRequired.map(skill => `<span style="background: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; margin-right: 8px; font-size: 14px;">${skill}</span>`).join('')}
          </div>
          ` : ''}
          
          <h3 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">✅ Yêu cầu</h3>
          <ul style="margin: 16px 0; padding-left: 20px;">
            ${formData.requirements.length ? formData.requirements.map(r => `<li style="margin: 8px 0;">${r}</li>`).join('') : '<li style="color: #6b7280;"><em>Không có yêu cầu cụ thể</em></li>'}
          </ul>
          
          <h3 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">🎁 Quyền lợi</h3>
          <ul style="margin: 16px 0; padding-left: 20px;">
            ${formData.benefits.length ? formData.benefits.map(b => `<li style="margin: 8px 0;">${b}</li>`).join('') : '<li style="color: #6b7280;"><em>Đang cập nhật</em></li>'}
          </ul>
          
          <div style="background: #f0f9ff; border: 1px solid #0ea5e9; padding: 16px; border-radius: 8px; margin-top: 24px;">
            <h3 style="color: #0c4a6e; margin-top: 0;">📞 Thông tin liên hệ</h3>
            <pre style="white-space: pre-wrap; font-family: inherit; margin: 0;">${formData.contactInfo || 'Chưa có thông tin liên hệ'}</pre>
          </div>
        </div>
      `;
      setGeneratedJobHtml(html);
      setIsGenerating(false);
      showFeedback('success', 'Đã tạo preview thành công');
    }, 500);
  };

  // Copy preview
  const copyPreview = async () => {
    try {
      const textContent = generatedJobHtml.replace(/<[^>]*>/g, '') || 
                         formData.description || 
                         JSON.stringify(formData, null, 2);
                         
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textContent);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = textContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showFeedback('success', 'Đã sao chép nội dung');
    } catch (error) {
      console.error('Copy failed:', error);
      showFeedback('error', 'Sao chép thất bại');
    }
  };

  // Save draft
  const saveDraft = () => {
    try {
      const payload = {
        id: `draft_${Date.now()}`,
        status: 'draft',
        createdAt: new Date().toISOString(),
        data: { ...formData }
      };
      
      setJobPosts(prev => [payload, ...prev]);
      showFeedback('success', 'Đã lưu nháp thành công');
    } catch (error) {
      console.error('Save draft failed:', error);
      showFeedback('error', 'Lưu nháp thất bại');
    }
  };

  // Publish with validation
  const publish = () => {
    const missing = [];
    if (!formData.organizationName.trim()) missing.push('Tên tổ chức');
    if (!formData.activityTitle.trim()) missing.push('Tiêu đề hoạt động');
    if (!formData.contactInfo.trim()) missing.push('Thông tin liên hệ');

    if (missing.length) {
      showFeedback('error', `Vui lòng hoàn thiện: ${missing.join(', ')}`);
      return;
    }

    try {
      const payload = {
        id: `published_${Date.now()}`,
        status: 'published',
        publishedAt: new Date().toISOString(),
        data: { ...formData }
      };
      
      setJobPosts(prev => [payload, ...prev]);
      showFeedback('success', '🎉 Đã đăng tuyển thành công!');
    } catch (error) {
      console.error('Publish failed:', error);
      showFeedback('error', 'Đăng tuyển thất bại');
    }
  };

  // Reset form
  const resetForm = () => {
    const defaultData = {
      organizationName: '',
      activityTitle: '',
      activityType: 'volunteer',
      profitType: 'nonprofit',
      category: 'community',
      skillRequired: [],
      description: '',
      volunteerRequired: '',
      interest: '',
      local: '',
      timeStart: '',
      timeEnd: '',
      deadline: '',
      benefits: [],
      requirements: [],
      requirementsDescription: '',
      benefitsDescription: '',
      contactInfo: '',
      isRemote: false,
      compensation: '',
      commitment: 'flexible'
    };
    
    setFormData(defaultData);
    setGeneratedJobHtml('');
    setNewRequirement('');
    setNewBenefit('');
    setNewSkill('');
    
    if (quillRef.current) {
      try {
        quillRef.current.setText('');
      } catch (e) {
        // Ignore cleanup errors
      }
    }
    
    showFeedback('success', 'Đã reset form');
  };

  // Load post into form for editing
  const loadPost = (post) => {
    setFormData({ ...post.data });
    if (quillRef.current && post.data.description) {
      try {
        quillRef.current.clipboard.dangerouslyPasteHTML(post.data.description);
      } catch (e) {
        quillRef.current.setText(post.data.description);
      }
    }
    showFeedback('success', 'Đã load bài vào form để chỉnh sửa');
  };

  return (
    <div className="min-h-screen bg-green-50 rounded-lg p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Feedback Message */}
        {feedback.message && (
          <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg ${
            feedback.type === 'success' ? 'bg-green-500 text-white' :
            feedback.type === 'warning' ? 'bg-yellow-500 text-white' :
            feedback.type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
          }`}>
            {feedback.message}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Users className="text-green-600" />
            Tạo bài tuyển dụng - Volunteer / Collaborator
          </h1>
          <div className="flex gap-2">
            <button
              onClick={saveDraft}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition flex items-center gap-2"
              title="Lưu nháp"
            >
              <Save size={16} />
              Lưu nháp
            </button>
            <button
              onClick={publish}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              title="Đăng tuyển"
            >
              <CheckCircle size={16} />
              Đăng tuyển
            </button>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl p-6 shadow">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên tổ chức <span className="text-red-500">*</span>
              </label>
              <input 
                name="organizationName" 
                value={formData.organizationName} 
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="VD: Quỹ ABC" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tiêu đề hoạt động <span className="text-red-500">*</span>
              </label>
              <input 
                name="activityTitle" 
                value={formData.activityTitle} 
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="VD: Chiến dịch dọn rác biển" 
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loại hoạt động</label>
              <select 
                name="activityType" 
                value={formData.activityType} 
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="volunteer">Tình nguyện</option>
                <option value="collaborator">Cộng tác</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tính chất</label>
              <select 
                name="profitType" 
                value={formData.profitType} 
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="nonprofit">Phi lợi nhuận</option>
                <option value="profit">Lợi nhuận</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lĩnh vực</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Location & Timing */}
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Địa điểm</label>
              <input 
                name="local" 
                value={formData.local} 
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Hà Nội / Online..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày bắt đầu</label>
              <input 
                type="date" 
                name="timeStart" 
                value={formData.timeStart} 
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hạn đăng ký</label>
              <input 
                type="date" 
                name="deadline" 
                value={formData.deadline} 
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
          </div>

          {/* Commitment & Other Options */}
          <div className="grid md:grid-cols-3 gap-4 mt-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mức độ cam kết</label>
              <select 
                name="commitment" 
                value={formData.commitment} 
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="flexible">Linh hoạt</option>
                <option value="part-time">Bán thời gian</option>
                <option value="full-time">Toàn thời gian</option>
              </select>
            </div>
            
            <div className="flex items-center gap-3 pb-3">
              <input 
                type="checkbox" 
                id="isRemote"
                name="isRemote" 
                checked={formData.isRemote} 
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isRemote" className="text-sm font-medium text-gray-700">
                Có thể làm việc từ xa
              </label>
            </div>
            
            {formData.activityType === 'collaborator' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hỗ trợ / Thù lao</label>
                <input 
                  name="compensation" 
                  value={formData.compensation} 
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="VD: 500k/ca hoặc hỗ trợ ăn uống..." 
                />
              </div>
            )}
          </div>

          {/* Rich Text Editor */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mô tả chi tiết hoạt động
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              {quillLoading ? (
                <div className="flex items-center justify-center h-48 bg-gray-50">
                  <Loader2 className="animate-spin mr-2" />
                  Đang tải editor...
                </div>
              ) : (
                <div ref={editorRef} className="min-h-[200px] bg-white"></div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 Mô tả sẽ được lưu dưới dạng HTML. Hãy sử dụng các công cụ format để tạo nội dung đẹp mắt.
            </p>
          </div>

          {/* Requirements & Benefits */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {/* Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yêu cầu (có thể tách bằng dấu phẩy)
              </label>
              <div className="flex gap-2">
                <input 
                  value={newRequirement} 
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addRequirement()}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="VD: Có kinh nghiệm, Nhiệt tình, Kỹ năng giao tiếp..." 
                />
                <button 
                  onClick={() => addRequirement()} 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Thêm
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.requirements.map((r, i) => (
                  <div key={i} className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    <span className="text-sm text-blue-800">{r}</span>
                    <button 
                      onClick={() => removeRequirement(i)} 
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả yêu cầu (tùy chọn)
                </label>
                <textarea 
                  name="requirementsDescription" 
                  value={formData.requirementsDescription} 
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  rows={3} 
                  placeholder="Mô tả chi tiết các yêu cầu..." 
                />
              </div>
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quyền lợi / Lợi ích
              </label>
              <div className="flex gap-2">
                <input 
                  value={newBenefit} 
                  onChange={(e) => setNewBenefit(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addBenefit()}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="VD: Certificate, Hỗ trợ ăn uống..." 
                />
                <button 
                  onClick={addBenefit} 
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Thêm
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                    <span className="text-sm text-green-800">{b}</span>
                    <button 
                      onClick={() => removeBenefit(i)} 
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả quyền lợi (tùy chọn)
                </label>
                <textarea 
                  name="benefitsDescription" 
                  value={formData.benefitsDescription} 
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  rows={3} 
                  placeholder="Mô tả chi tiết quyền lợi..." 
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thông tin liên hệ <span className="text-red-500">*</span>
            </label>
            <textarea 
              name="contactInfo" 
              value={formData.contactInfo} 
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              rows={3} 
              placeholder="Email / SĐT / Facebook / Link đăng ký..."
            />
          </div>

          {/* Skills Management */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kỹ năng yêu cầu
            </label>
            
            <div className="flex gap-2 mb-3">
              <input 
                value={newSkill} 
                onChange={(e) => setNewSkill(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Nhập kỹ năng mới" 
              />
              <button 
                onClick={() => addSkill()} 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Thêm
              </button>
            </div>
            
            {/* Common Skills Quick Add */}
            <div className="mb-3">
              <p className="text-xs text-gray-600 mb-2">Kỹ năng phổ biến (click để thêm):</p>
              <div className="flex flex-wrap gap-2">
                {commonSkills.map(skill => (
                  <button 
                    key={skill} 
                    onClick={() => addSkill(skill)} 
                    disabled={formData.skillRequired.includes(skill)}
                    className={`px-3 py-1 text-sm rounded-full border transition ${
                      formData.skillRequired.includes(skill)
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Selected Skills */}
            <div className="flex flex-wrap gap-2">
              {formData.skillRequired.map((s, i) => (
                <div key={i} className="flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                  <span className="text-sm text-indigo-800">{s}</span>
                  <button 
                    onClick={() => removeSkill(i)} 
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
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
              🚀 Đăng tuyển
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

        {/* Preview & Saved Posts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Preview Panel */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Eye className="text-blue-600" />
                Preview
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={copyPreview} 
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition flex items-center gap-1"
                >
                  <Copy size={14} />
                  Sao chép
                </button>
                <button 
                  onClick={generatePreviewHtml} 
                  disabled={isGenerating}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition flex items-center gap-1 disabled:opacity-50"
                >
                  {isGenerating ? <Loader2 size={14} className="animate-spin" /> : '🔄'}
                  Làm mới
                </button>
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4">
              {generatedJobHtml ? (
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: generatedJobHtml }} 
                />
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Eye className="mx-auto mb-2 opacity-50" size={32} />
                  <p>Chưa có nội dung preview</p>
                  <p className="text-xs">Click "Xem trước" để tạo preview</p>
                </div>
              )}
            </div>
          </div>

          {/* Saved Posts Panel */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Briefcase className="text-green-600" />
                Bài đã lưu ({jobPosts.length})
              </h2>
              {jobPosts.length > 0 && (
                <button 
                  onClick={() => setJobPosts([])}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm"
                >
                  Xóa tất cả
                </button>
              )}
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {jobPosts.map(post => (
                <div key={post.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 line-clamp-1">
                        {post.data.activityTitle || 'Untitled'}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {post.data.organizationName}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          post.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status === 'published' ? '✅ Đã đăng' : '📝 Nháp'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(post.createdAt || post.publishedAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-3">
                      <button 
                        onClick={() => loadPost(post)} 
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition flex items-center gap-1"
                      >
                        <Edit size={12} />
                        Sửa
                      </button>
                      <button 
                        onClick={() => {
                          setJobPosts(prev => prev.filter(p => p.id !== post.id));
                          showFeedback('success', 'Đã xóa bài');
                        }} 
                        className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition flex items-center gap-1"
                      >
                        <X size={12} />
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {jobPosts.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <Briefcase className="mx-auto mb-2 opacity-50" size={32} />
                  <p>Chưa có bài nào được lưu</p>
                  <p className="text-xs">Hãy tạo và lưu bài đầu tiên của bạn!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
              <Star className="text-yellow-500" />
              <span className="font-medium">Volunteer Recruitment Platform</span>
            </div>
            <p className="text-sm text-gray-500">
              Tạo và quản lý các bài tuyển dụng tình nguyện viên / cộng tác viên một cách chuyên nghiệp
            </p>
            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-400">
              <span>✨ Rich Text Editor</span>
              <span>💾 Auto Save</span>
              <span>📋 Preview & Copy</span>
              <span>🎯 Smart Validation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}