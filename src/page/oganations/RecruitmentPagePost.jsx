import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  Calendar, Clock, MapPin, Users, Award, DollarSign,
  Camera, FileText, Settings, Eye, Save, Send, X, Plus,
  AlertCircle, Info, CheckCircle, Upload, Tag, Shield,
  Heart, Star, Building, Phone, Mail, Globe, Image
} from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

/**
 * RecruitmentPostPage (refactored)
 * - Form split into logical sections
 * - Fixed state update bugs
 * - Image preview management with URL.revokeObjectURL
 * - Validation helper kept, submit left as TODO
 */
export default function RecruitmentPostPage() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    // Basic Info
    title: '',
    description: '',
    category: '',
    eventType: 'volunteer', // volunteer, charity, community
    organizerType: 'partner',

    // Schedule & Location
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    timezone: 'Asia/Ho_Chi_Minh',
    location: '',
    address: '',
    coordinates: null,
    isOnline: false,
    onlineLink: '',

    // Volunteer Requirements
    minAge: 16,
    maxAge: 65,
    genderRequirement: 'any',
    skillsRequired: [],
    experienceLevel: 'beginner',
    volunteersNeeded: 10,
    registrationDeadline: '',

    // Benefits & Support
    benefits: {
      meals: false,
      transportation: false,
      accommodation: false,
      insurance: false,
      certificate: true,
      allowance: false,
      allowanceAmount: 0,
      descriptionBenfits: '',
      uniform: false,
      training: false,
      another: false,
    },

    // Media & Documents
    coverImage: null, // File
    additionalImages: [], // File[]
    documents: [],

    contactInfo: {
      coordinatorName: '',
      phone: '',
      email: '',
      alternateContact: ''
    },

    // Advanced Settings
    autoApprove: false,
    requireBackground: false,
    isPublic: true,
    tags: [],
    customFields: [],

    // Approval Settings
    needsApproval: true,
    priority: 'normal',
    targetAudience: 'general'
  });

  // previews state for images to manage createObjectURL and revoke
  const [coverPreview, setCoverPreview] = useState(null);
  const [additionalPreviews, setAdditionalPreviews] = useState([]); // array of {id, url}

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // lookup data loaded from server
  const [categories, setCategories] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);
  const [interest, setInterest] = useState([]);
  const [task, setTask] = useState([]);

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // Fetch lookup data once
  useEffect(() => {
    let cancel = false;
    const load = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_URL}/btc/events/post-events`);
        if (cancel) return;
        if (res?.data?.success && mountedRef.current) {
          // defensive: accept arrays or empty
          setCategories(res.data.data?.categories ?? []);
          setSkillOptions(res.data.data?.skillOptions ?? []);
          setInterest(res.data.data?.interest ?? []);
          setTask(res.data.data?.tasks ?? []);
        }
      } catch (err) {
        console.error('Load lookup data error:', err?.message ?? err);
      }
    };
    load();
    return () => { cancel = true; };
  }, []);

  /* -------------------------
     Helpers to update state
     ------------------------- */

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // clear flat error keys (title, description, category, etc.)
    setErrors(prev => {
      if (!prev) return prev;
      if (prev[field]) {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      }
      return prev;
    });
  }, []);

  const handleNestedInputChange = useCallback((section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    // Clear error named like the nested key (coordinatorName, phone, email)
    setErrors(prev => {
      if (!prev) return prev;
      if (prev[field]) {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      }
      return prev;
    });
  }, []);

  const handleArrayAdd = useCallback((field, value) => {
    if (!value) return;
    setFormData(prev => {
      const arr = Array.isArray(prev[field]) ? prev[field] : [];
      if (arr.includes(value)) return prev;
      return { ...prev, [field]: [...arr, value] };
    });
  }, []);

  const handleArrayRemove = useCallback((field, value) => {
    setFormData(prev => {
      const arr = Array.isArray(prev[field]) ? prev[field] : [];
      return { ...prev, [field]: arr.filter(item => item !== value) };
    });
  }, []);

  /* -------------------------
     Image preview management
     ------------------------- */

  // cover image change
  useEffect(() => {
    // revoke when component unmounts or coverPreview changes
    return () => {
      if (coverPreview) {
        try { URL.revokeObjectURL(coverPreview); } catch (e) { /* ignore */ }
      }
    };
  }, [coverPreview]);

  const onCoverSelected = (file) => {
    if (!file) {
      setFormData(prev => ({ ...prev, coverImage: null }));
      if (coverPreview) {
        try { URL.revokeObjectURL(coverPreview); } catch (e) { }
        setCoverPreview(null);
      }
      return;
    }
    const url = URL.createObjectURL(file);
    // revoke previous
    if (coverPreview) {
      try { URL.revokeObjectURL(coverPreview); } catch (e) { }
    }
    setFormData(prev => ({ ...prev, coverImage: file }));
    setCoverPreview(url);
  };

  // additional images: maintain previews array with indices
  useEffect(() => {
    // cleanup on unmount
    return () => {
      additionalPreviews.forEach(p => {
        try { URL.revokeObjectURL(p.url); } catch (e) { }
      });
    };
  }, [additionalPreviews]);

  const onAdditionalSelected = (files) => {
    if (!files || files.length === 0) return;
    setFormData(prev => {
      const prevFiles = Array.isArray(prev.additionalImages) ? prev.additionalImages : [];
      let combined = [...prevFiles, ...Array.from(files)];
      if (combined.length > 8) combined = combined.slice(0, 8);
      return { ...prev, additionalImages: combined };
    });

    // create previews for the newly added
    setAdditionalPreviews(prev => {
      const newOnes = Array.from(files).slice(0, Math.max(0, 8 - prev.length)).map((f, i) => ({
        id: Math.random().toString(36).slice(2, 9),
        url: URL.createObjectURL(f)
      }));
      return [...prev, ...newOnes].slice(0, 8);
    });
  };

  const removeAdditionalImage = (index) => {
    setFormData(prev => {
      const arr = Array.isArray(prev.additionalImages) ? [...prev.additionalImages] : [];
      if (index < 0 || index >= arr.length) return prev;
      arr.splice(index, 1);
      return { ...prev, additionalImages: arr };
    });
    setAdditionalPreviews(prev => {
      const copy = [...prev];
      const removed = copy.splice(index, 1);
      removed.forEach(p => { try { URL.revokeObjectURL(p.url); } catch (e) { } });
      return copy;
    });
  };

  /* -------------------------
     Validation
     ------------------------- */

  const validateStep = (step) => {
    const newErrors = {};
    // simple global validations (you can expand per step)
    if (!formData.title || !formData.title.trim()) newErrors.title = 'Tên sự kiện là bắt buộc';
    if (!formData.description || !formData.description.trim()) newErrors.description = 'Mô tả sự kiện là bắt buộc';
    if (!formData.category) newErrors.category = 'Danh mục là bắt buộc';

    if (!formData.startDate) newErrors.startDate = 'Ngày bắt đầu là bắt buộc';
    if (!formData.startTime) newErrors.startTime = 'Giờ bắt đầu là bắt buộc';
    if (!formData.isOnline && !formData.location) newErrors.location = 'Địa điểm là bắt buộc';

    if (!formData.contactInfo?.coordinatorName) newErrors.coordinatorName = 'Tên điều phối viên là bắt buộc';
    if (!formData.contactInfo?.phone) newErrors.phone = 'Số điện thoại là bắt buộc';
    if (!formData.contactInfo?.email) newErrors.email = 'Email là bắt buộc';

    if (!Number.isInteger(formData.volunteersNeeded) || formData.volunteersNeeded < 1) newErrors.volunteersNeeded = 'Cần ít nhất 1 tình nguyện viên';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* -------------------------
     Submit (left for you)
     ------------------------- */

  const handleSubmit = async (asDraft = false) => {
    // NOTE: submit logic intentionally left for you to implement.
    // You can use formData, token and axios. Below is a safe skeleton for you to fill in.
    // Validate before submit if desired:
    // if (!validateStep()) return;

    setIsSubmitting(true);
    try {
      // TODO: Implement actual submit
      // Example:
      // const payload = new FormData();
      // payload.append('title', formData.title);
      // ... append other fields, files, nested JSON as needed ...
      // await axios.post('YOUR_URL', payload, { headers: { Authorization: `Bearer ${token}` } })

      // For now just show success toast (remove or replace in final implementation)
      toast.info('Submit chưa được implement — chỗ này bạn tự hoàn thiện (TODO).');
    } catch (err) {
      console.error('submit error', err);
      toast.error('Thất bại khi gửi (skeleton).');
    } finally {
      if (mountedRef.current) setIsSubmitting(false);
    }
  };

  /* -------------------------
     Render
     ------------------------- */

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto md:mt-1 mt-10">
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* BASIC INFO */}
          <section className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">Thông tin cơ bản</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên sự kiện <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="VD: Làm sạch bờ biển Vũng Tàu"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả sự kiện <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Mô tả chi tiết về sự kiện..."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục <span className="text-red-500">*</span></label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((cat, idx) => {
                    // try to support both {label, value} and string arrays
                    if (typeof cat === 'string') return <option key={idx} value={cat}>{cat}</option>;
                    return <option key={idx} value={cat.value ?? cat.id ?? cat.label}>{cat.label ?? cat.name ?? cat.value}</option>;
                  })}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loại sự kiện</label>
                <select
                  value={formData.eventType}
                  onChange={(e) => handleInputChange('eventType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="volunteer">Tình nguyện</option>
                  <option value="charity">Từ thiện</option>
                  <option value="community">Cộng đồng</option>
                  <option value="profit">Lợi nhuận</option>
                  <option value="nonprofit">Phi lợi nhuận</option>
                </select>
              </div>
            </div>
          </section>

          {/* SCHEDULE & LOCATION */}
          <section className="space-y-4 mb-6">
            <h3 className="text-lg font-medium">Thời gian & Địa điểm</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ngày bắt đầu <span className="text-red-500">*</span></label>
                <input type="date" value={formData.startDate} onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Giờ bắt đầu <span className="text-red-500">*</span></label>
                <input type="time" value={formData.startTime} onChange={(e) => handleInputChange('startTime', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.startTime ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.startTime && <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ngày kết thúc</label>
                <input type="date" value={formData.endDate} onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Giờ kết thúc</label>
                <input type="time" value={formData.endTime} onChange={(e) => handleInputChange('endTime', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input type="checkbox" id="isOnline" checked={formData.isOnline} onChange={(e) => handleInputChange('isOnline', e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="isOnline" className="text-sm font-medium text-gray-700">Sự kiện trực tuyến</label>
            </div>

            {!formData.isOnline ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Địa điểm <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.location} onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="VD: Bãi biển Bãi Trước, Vũng Tàu" className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.location ? 'border-red-500' : 'border-gray-300'}`} />
                  {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ chi tiết</label>
                  <textarea rows={3} value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} placeholder="Địa chỉ cụ thể..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Link tham gia online</label>
                <input type="url" value={formData.onlineLink} onChange={(e) => handleInputChange('onlineLink', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://meet.google.com/..." />
              </div>
            )}
          </section>

          {/* REQUIREMENTS */}
          <section className="space-y-4 mb-6">
            <h3 className="text-lg font-medium">Yêu cầu tình nguyện viên</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng TNV cần tuyển <span className="text-red-500">*</span></label>
                <input type="number" min="1" value={formData.volunteersNeeded} onChange={(e) => handleInputChange('volunteersNeeded', parseInt(e.target.value) || 0)} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.volunteersNeeded ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.volunteersNeeded && <p className="mt-1 text-sm text-red-600">{errors.volunteersNeeded}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hạn đăng ký</label>
                <input type="date" value={formData.registrationDeadline} onChange={(e) => handleInputChange('registrationDeadline', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tuổi tối thiểu</label>
                <input type="number" min="16" max="99" value={formData.minAge} onChange={(e) => handleInputChange('minAge', parseInt(e.target.value) || 16)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tuổi tối đa</label>
                <input type="number" min="16" max="99" value={formData.maxAge} onChange={(e) => handleInputChange('maxAge', parseInt(e.target.value) || 65)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Yêu cầu giới tính</label>
                <select value={formData.genderRequirement} onChange={(e) => handleInputChange('genderRequirement', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="any">Không yêu cầu</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mức độ kinh nghiệm</label>
              <select value={formData.experienceLevel} onChange={(e) => handleInputChange('experienceLevel', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="beginner">Người mới bắt đầu</option>
                <option value="intermediate">Có kinh nghiệm</option>
                <option value="advanced">Chuyên nghiệp</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kỹ năng yêu cầu</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.skillsRequired.map(skill => (
                  <span key={skill} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {skill}
                    <button type="button" onClick={() => handleArrayRemove('skillsRequired', skill)} className="ml-2 text-blue-600 hover:text-blue-800">
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
              <select onChange={(e) => { if (e.target.value) { handleArrayAdd('skillsRequired', e.target.value); e.target.value = ''; } }} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Chọn kỹ năng</option>
                {(skillOptions || []).filter(s => !formData.skillsRequired.includes(s)).map((skill, idx) => <option key={idx} value={skill}>{skill}</option>)}
              </select>
            </div>
          </section>

          {/* BENEFITS */}
          <section className="space-y-4 mb-6">
            <h3 className="text-lg font-medium">Quyền lợi cho tình nguyện viên</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(interest || []).map(b => (
                <label key={b.key} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" checked={!!formData.benefits[b.key]} onChange={(e) => handleNestedInputChange('benefits', b.key, e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span className="text-sm font-medium text-gray-700">{b.label}</span>
                </label>
              ))}
            </div>

            {formData.benefits.allowance && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mức phụ cấp (VNĐ)</label>
                <input type="number" min="0" value={formData.benefits.allowanceAmount} onChange={(e) => handleNestedInputChange('benefits', 'allowanceAmount', parseInt(e.target.value) || 0)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="VD: 200000" />
              </div>
            )}

            {formData.benefits.another && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả về quyền lợi</label>
                <input type="text" value={formData.benefits.descriptionBenfits} onChange={(e) => handleNestedInputChange('benefits', 'descriptionBenfits', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Mô tả quyền lợi" />
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900">Lưu ý về quyền lợi</h4>
                  <p className="text-sm text-blue-700 mt-1">Quyền lợi tốt giúp thu hút TNV chất lượng hơn.</p>
                </div>
              </div>
            </div>
          </section>

          {/* MEDIA */}
          <section className="space-y-4 mb-6">
            <h3 className="text-lg font-medium">Ảnh & Tài liệu</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh bìa sự kiện</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                {formData.coverImage && coverPreview ? (
                  <div className="relative inline-block">
                    <img src={coverPreview} alt="Cover" className="mx-auto h-48 w-auto rounded-lg" />
                    <button type="button" onClick={() => onCoverSelected(null)} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click để tải lên ảnh bìa</p>
                    <input id="coverImageInput" type="file" accept="image/*" onChange={(e) => { const f = e.target.files && e.target.files[0]; if (f) onCoverSelected(f); }} className="hidden" />
                    <label htmlFor="coverImageInput" className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">Chọn ảnh</label>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh bổ sung</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {additionalPreviews.map((p, idx) => (
                  <div key={p.id} className="relative">
                    <img src={p.url} alt={`Additional ${idx + 1}`} className="w-full h-24 object-cover rounded-lg" />
                    <button type="button" onClick={() => removeAdditionalImage(idx)} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {additionalPreviews.length < 8 && (
                  <label className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 cursor-pointer">
                    <Plus className="w-6 h-6 text-gray-400" />
                    <input type="file" accept="image/*" multiple onChange={(e) => onAdditionalSelected(e.target.files)} className="hidden" />
                  </label>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">Tối đa 8 ảnh bổ sung</p>
            </div>
          </section>

          {/* CONTACT */}
          <section className="space-y-4 mb-6">
            <h3 className="text-lg font-medium">Thông tin liên hệ</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tên điều phối viên <span className="text-red-500">*</span></label>
                <input type="text" value={formData.contactInfo.coordinatorName} onChange={(e) => handleNestedInputChange('contactInfo', 'coordinatorName', e.target.value)} placeholder="Tên người phụ trách" className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.coordinatorName ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.coordinatorName && <p className="mt-1 text-sm text-red-600">{errors.coordinatorName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại <span className="text-red-500">*</span></label>
                <input type="tel" value={formData.contactInfo.phone} onChange={(e) => handleNestedInputChange('contactInfo', 'phone', e.target.value)} placeholder="0901234567" className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                <input type="email" value={formData.contactInfo.email} onChange={(e) => handleNestedInputChange('contactInfo', 'email', e.target.value)} placeholder="contact@example.com" className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Liên hệ dự phòng</label>
                <input type="text" value={formData.contactInfo.alternateContact} onChange={(e) => handleNestedInputChange('contactInfo', 'alternateContact', e.target.value)} placeholder="Số điện thoại hoặc email dự phòng" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
          </section>

          {/* APPROVAL & TAGS */}
          <section className="space-y-4 mb-6">
            <h3 className="text-lg font-medium">Cài đặt phê duyệt & Tags</h3>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input type="checkbox" id="autoApprove" checked={formData.autoApprove} onChange={(e) => handleInputChange('autoApprove', e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label htmlFor="autoApprove" className="text-sm font-medium text-gray-700">Tự động phê duyệt đăng ký</label>
              </div>

              <div className="flex items-center space-x-3">
                <input type="checkbox" id="requireBackground" checked={formData.requireBackground} onChange={(e) => handleInputChange('requireBackground', e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label htmlFor="requireBackground" className="text-sm font-medium text-gray-700">Yêu cầu kiểm tra lý lịch</label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mức độ ưu tiên</label>
              <select value={formData.priority} onChange={(e) => handleInputChange('priority', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="low">Thấp</option>
                <option value="normal">Bình thường</option>
                <option value="high">Cao</option>
                <option value="urgent">Khẩn cấp</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                    <button type="button" onClick={() => handleArrayRemove('tags', tag)} className="ml-2 text-green-600 hover:text-green-800"><X className="w-4 h-4" /></button>
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {(task || []).map(item => (
                  <button key={item?.id ?? item?.label} type="button" onClick={() => handleArrayAdd('tags', item.label ?? item)} className="flex items-center justify-center px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <Tag className="w-4 h-4 mr-2 text-blue-600" />{item?.label ?? item}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-900">Lưu ý về phê duyệt</h4>
                  <p className="text-sm text-yellow-700 mt-1">Sự kiện sẽ được gửi đến Admin để phê duyệt trước khi công bố. Thời gian phê duyệt thông thường là 24-48 giờ.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ACTIONS */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <div className="flex space-x-3">
              <button onClick={() => handleSubmit(true)} disabled={isSubmitting} className="flex items-center px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50">
                <Save className="w-4 h-4 mr-2" />{isSubmitting ? 'Đang lưu...' : 'Lưu nháp'}
              </button>
              <button onClick={() => handleSubmit(false)} disabled={isSubmitting} className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                <Send className="w-4 h-4 mr-2" />{isSubmitting ? 'Đang gửi...' : 'Gửi phê duyệt'}
              </button>
            </div>
          </div>

        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
}
