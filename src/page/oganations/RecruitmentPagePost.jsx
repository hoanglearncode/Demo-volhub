import React, { useState, useRef, useEffect } from 'react';
import recruitmentService from '../../services/oganations/recruitmentService.js';
import { 
  Calendar, Users, MapPin, Clock, DollarSign, Briefcase, Star, Copy, Download, Edit,
  Heart, Globe, Award, Coffee, Zap, Target, BookOpen, Camera, Music, Utensils,
  Save, X, CheckCircle, Loader2, Filter, Search, Eye, AlertCircle, Check
} from 'lucide-react';

import { useSearchParams } from "react-router-dom";

export default function VolunteerRecruitmentPlatform() {
    const [searchParams] = useSearchParams();
    const eventId = searchParams.get('eventId');
    const type = searchParams.get('type');
    
    // Loading states
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);

    // Form data and validation
    const [formData, setFormData] = useState({
        // Thông tin cơ bản
        organizationName: '',
        activityTitle: '',
        activityType: 'volunteer',
        profitType: 'nonprofit',
        category: 'community',
        
        // Thông tin chi tiết
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
        benefitsDescription: '',
        requirements: [],
        requirements_description: '',
        contactInfo: '',
        isRemote: false,
        compensation: '',
        commitment: 'flexible'
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [showErrors, setShowErrors] = useState(false);

    // Other states
    const [quillLoaded, setQuillLoaded] = useState(false);
    const [newRequirement, setNewRequirement] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const quillRef = useRef(null);
    const editorRef = useRef(null);

    // Required fields based on activity type
    const getRequiredFields = () => {
        const baseRequired = [
            'organizationName',
            'activityTitle',
            'category',
            'local',
            'timeStart',
            'timeEnd',
            'deadline',
            'volunteerRequired',
            'description',
            'contactInfo'
        ];

        if (formData.profitType === 'profit' || formData.activityType === 'collaborator') {
            baseRequired.push('compensation');
        }

        return baseRequired;
    };

    // Validation rules
    const validateField = (name, value) => {
        const requiredFields = getRequiredFields();
        let error = '';

        if (requiredFields.includes(name) && (!value || value.toString().trim() === '')) {
            error = 'Trường này là bắt buộc';
        }

        // Specific validations
        switch (name) {
            case 'organizationName':
                if (value && value.length < 2) {
                    error = 'Tên tổ chức phải có ít nhất 2 ký tự';
                }
                break;
            case 'activityTitle':
                if (value && value.length < 5) {
                    error = 'Tên hoạt động phải có ít nhất 5 ký tự';
                }
                break;
            case 'timeStart':
            case 'timeEnd':
            case 'deadline':
                if (value) {
                    const selectedDate = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    
                    if (name === 'deadline' && selectedDate < today) {
                        error = 'Hạn đăng ký không thể là ngày trong quá khứ';
                    }
                    if (name === 'timeStart' && selectedDate < today) {
                        error = 'Ngày bắt đầu không thể là ngày trong quá khứ';
                    }
                    if (name === 'timeEnd' && formData.timeStart && selectedDate < new Date(formData.timeStart)) {
                        error = 'Ngày kết thúc phải sau ngày bắt đầu';
                    }
                }
                break;
            case 'volunteerRequired':
                if (value && !/^\d+(-\d+)?( người)?$/.test(value.trim())) {
                    error = 'Định dạng: "10" hoặc "10-15" hoặc "10 người"';
                }
                break;
            case 'contactInfo':
                if (value) {
                    const hasEmail = /\S+@\S+\.\S+/.test(value);
                    const hasPhone = /[\d\-\+\(\)]{8,}/.test(value);
                    if (!hasEmail && !hasPhone) {
                        error = 'Phải có ít nhất email hoặc số điện thoại';
                    }
                }
                break;
            case 'description':
                if (value && value.replace(/<[^>]*>/g, '').trim().length < 20) {
                    error = 'Mô tả phải có ít nhất 20 ký tự';
                }
                break;
        }

        return error;
    };

    // Validate all fields
    const validateForm = () => {
        const newErrors = {};
        const requiredFields = getRequiredFields();

        requiredFields.forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
            }
        });

        // Cross-field validations
        if (formData.timeStart && formData.deadline) {
            const startDate = new Date(formData.timeStart);
            const deadlineDate = new Date(formData.deadline);
            if (deadlineDate >= startDate) {
                newErrors.deadline = 'Hạn đăng ký phải trước ngày bắt đầu';
            }
        }

        if (formData.requirements.length === 0 && formData.activityType === 'collaborator') {
            newErrors.requirements = 'Cộng tác viên cần có ít nhất một kỹ năng yêu cầu';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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

    // Load existing data for edit mode
    useEffect(() => {
        const loadData = async () => {
            if (type === 'edit' && eventId) {
                setIsLoading(true);
                try {
                    const res = await recruitmentService.getRecruitmentsById(eventId);
                    if (res.success) {
                        setFormData(res.data);
                        // Set description in editor after it's loaded
                        if (quillRef.current && res.data.description) {
                            quillRef.current.clipboard.dangerouslyPasteHTML(`<div>${res.data.description}</div>`);
                        }
                    } else {
                        setErrorMessage('Không thể tải dữ liệu. Vui lòng thử lại.');
                    }
                } catch (err) {
                    setErrorMessage('Lỗi kết nối. Vui lòng kiểm tra mạng và thử lại.');
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        loadData();
    }, [eventId, type, quillLoaded]);

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
                const value = text.trim() === '' ? '' : html;
                
                setFormData(prev => ({
                    ...prev,
                    description: value
                }));
                
                // Validate description field
                if (touched.description) {
                    const error = validateField('description', value);
                    setErrors(prev => ({ ...prev, description: error }));
                }
            });
        }
    };

    // Handle input changes with validation
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        
        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));

        // Mark field as touched
        setTouched(prev => ({ ...prev, [name]: true }));

        // Validate field
        const error = validateField(name, newValue);
        setErrors(prev => ({ ...prev, [name]: error }));

        // Clear success/error messages
        if (successMessage) setSuccessMessage('');
        if (errorMessage) setErrorMessage('');
    };

    // Handle field blur
    const handleBlur = (fieldName) => {
        setTouched(prev => ({ ...prev, [fieldName]: true }));
        const error = validateField(fieldName, formData[fieldName]);
        setErrors(prev => ({ ...prev, [fieldName]: error }));
    };

    // Add requirement with validation
    const addRequirement = () => {
        if (!newRequirement.trim()) {
            setErrors(prev => ({ ...prev, newRequirement: 'Vui lòng nhập kỹ năng' }));
            return;
        }

        const requirements = newRequirement.split(',')
            .map(req => req.trim())
            .filter(req => req.length > 0);

        if (requirements.length === 0) {
            setErrors(prev => ({ ...prev, newRequirement: 'Kỹ năng không hợp lệ' }));
            return;
        }

        setFormData(prev => ({
            ...prev, 
            requirements: [...new Set([...prev.requirements, ...requirements])]
        }));
        setNewRequirement('');
        setErrors(prev => ({ ...prev, newRequirement: '', requirements: '' }));
    };

    const removeRequirement = (index) => {
        setFormData(prev => ({
            ...prev,
            requirements: prev.requirements.filter((_, i) => i !== index)
        }));
    };

    // Save draft
    const saveDraft = async () => {
        setIsSaving(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const draftData = { ...formData, isDraft: true };
            const res = type === 'edit' 
                ? await recruitmentService.updateRecruitment(eventId, draftData)
                : await recruitmentService.createRecruitment(draftData);

            if (res.success) {
                setSuccessMessage('✅ Đã lưu bản nháp thành công!');
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                setErrorMessage(res.message || 'Có lỗi xảy ra khi lưu bản nháp');
            }
        } catch (err) {
            setErrorMessage('Lỗi kết nối. Vui lòng thử lại.');
            console.error('Save draft error:', err);
        } finally {
            setIsSaving(false);
        }
    };

    // Publish
    const publish = async () => {
        setShowErrors(true);
        
        if (!validateForm()) {
            setErrorMessage('❌ Vui lòng điền đầy đủ thông tin bắt buộc và sửa các lỗi.');
            return;
        }

        setIsPublishing(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const publishData = { ...formData, isDraft: false, isPublished: true };
            const res = type === 'edit'
                ? await recruitmentService.updateRecruitment(eventId, publishData)
                : await recruitmentService.createRecruitment(publishData);

            if (res.success) {
                setSuccessMessage(`🎉 ${type === 'edit' ? 'Cập nhật' : 'Đăng tuyển'} thành công!`);
                setTimeout(() => setSuccessMessage(''), 5000);
            } else {
                setErrorMessage(res.message || `Có lỗi xảy ra khi ${type === 'edit' ? 'cập nhật' : 'đăng tuyển'}`);
            }
        } catch (err) {
            setErrorMessage('Lỗi kết nối. Vui lòng thử lại.');
            console.error('Publish error:', err);
        } finally {
            setIsPublishing(false);
        }
    };

    // Reset form
    const resetForm = () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa tất cả dữ liệu đã nhập?')) {
            setFormData({
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
                benefitsDescription: '',
                requirements: [],
                requirements_description: '',
                contactInfo: '',
                isRemote: false,
                compensation: '',
                commitment: 'flexible'
            });
            
            setErrors({});
            setTouched({});
            setShowErrors(false);
            setErrorMessage('');
            setSuccessMessage('');

            if (quillRef.current) {
                quillRef.current.setText('');
            }
        }
    };

    // Generate preview (placeholder)
    const generatePreviewHtml = () => {
        if (!validateForm()) {
            setShowErrors(true);
            setErrorMessage('❌ Vui lòng hoàn thành form trước khi xem trước.');
            return;
        }
        // TODO: Implement preview functionality
        alert('Chức năng xem trước sẽ được triển khai sau.');
    };

    // Helper function to render field error
    const renderFieldError = (fieldName) => {
        const error = errors[fieldName];
        const isVisible = (touched[fieldName] || showErrors) && error;
        
        if (!isVisible) return null;
        
        return (
            <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
                <AlertCircle size={14} />
                <span>{error}</span>
            </div>
        );
    };

    // Helper function to get input className based on error state
    const getInputClassName = (fieldName, baseClassName = '') => {
        const error = errors[fieldName];
        const isError = (touched[fieldName] || showErrors) && error;
        const baseClasses = baseClassName || 'w-full p-3 border-2 rounded-lg focus:outline-none transition-colors';
        
        return `${baseClasses} ${isError 
            ? 'border-red-300 focus:border-red-500 bg-red-50' 
            : 'border-gray-200 focus:border-blue-500'
        }`;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-green-50 rounded-lg p-5 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 size={48} className="animate-spin text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-green-50 rounded-lg p-5 flex flex-col gap-3">
            {/* Success/Error Messages */}
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
                    <CheckCircle size={20} />
                    <span>{successMessage}</span>
                </div>
            )}
            
            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                    <AlertCircle size={20} />
                    <span>{errorMessage}</span>
                </div>
            )}

            {/* Header Cards */}
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

            {/* Main Form */}
            <div className='bg-white rounded-lg p-4 w-full'>
                <h1 className='flex items-center gap-3 text-xl font-semibold mb-5'>
                    <Edit size={30} className='text-blue-600' /> 
                    Chi tiết thông tin
                    <span className="text-sm font-normal text-red-600">* Trường bắt buộc</span>
                </h1>
                
                <div className='w-full space-y-4 border-b-2 pb-4 border-gray-500'>
                    {/* Activity Type & Profit Type */}
                    <div className='flex gap-5 w-full'>
                        <div className='w-1/2 space-y-2'>
                            <label className="block text-sm font-semibold text-gray-700">
                                Loại Hoạt Động <span className="text-red-500">*</span>
                            </label>
                            <select 
                                name="activityType" 
                                value={formData.activityType} 
                                onChange={handleInputChange}
                                onBlur={() => handleBlur('activityType')}
                                className={getInputClassName('activityType')}
                            >
                                <option value="volunteer">Tình nguyện viên</option>
                                <option value="collaborator">Cộng tác viên</option>
                            </select>
                            {renderFieldError('activityType')}
                        </div>
                        <div className='w-1/2 space-y-2'>
                            <label className="block text-sm font-semibold text-gray-700">
                                Tính Chất <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="profitType"
                                value={formData.profitType}
                                onChange={handleInputChange}
                                onBlur={() => handleBlur('profitType')}
                                className={getInputClassName('profitType')}
                            >
                                <option value="nonprofit">🤝 Phi lợi nhuận</option>
                                <option value="profit">💰 Lợi nhuận</option>
                            </select>
                            {renderFieldError('profitType')}
                        </div>
                    </div>

                    {/* Organization Name */}
                    <div className='space-y-2'>
                        <label htmlFor="organizationName" className='block text-sm font-semibold text-gray-700'>
                            Tên tổ chức <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            value={formData.organizationName} 
                            name="organizationName" 
                            onChange={handleInputChange}
                            onBlur={() => handleBlur('organizationName')}
                            id="organizationName" 
                            placeholder='Nhập tên tổ chức' 
                            className={getInputClassName('organizationName', 'w-full border-2 px-3 py-2 rounded-lg focus:outline-none')}
                        />
                        {renderFieldError('organizationName')}
                    </div>

                    {/* Activity Title */}
                    <div className='space-y-2'>
                        <label htmlFor="activityTitle" className='block text-sm font-semibold text-gray-700'>
                            Tên hoạt động <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            value={formData.activityTitle} 
                            name="activityTitle" 
                            onChange={handleInputChange}
                            onBlur={() => handleBlur('activityTitle')}
                            id="activityTitle" 
                            placeholder='Nhập tên hoạt động' 
                            className={getInputClassName('activityTitle', 'w-full border-2 px-3 py-2 rounded-lg focus:outline-none')}
                        />
                        {renderFieldError('activityTitle')}
                    </div>

                    {/* Category & Location */}
                    <div className='flex gap-5'>
                        <div className='w-1/2 space-y-2'>
                            <label className="block text-sm font-semibold text-gray-700">
                                Lĩnh vực <span className="text-red-500">*</span>
                            </label>
                            <select 
                                name="category" 
                                value={formData.category} 
                                onChange={handleInputChange}
                                onBlur={() => handleBlur('category')}
                                className={getInputClassName('category')}
                            >
                                {categories.map((item, idx) => (
                                    <option key={idx} value={item.value}>{item.label}</option>
                                ))}
                            </select>
                            {renderFieldError('category')}
                        </div>
                        <div className='w-1/2 space-y-2'>
                            <label htmlFor='local' className="block text-sm font-semibold text-gray-700">
                                Địa điểm <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                name="local" 
                                onChange={handleInputChange}
                                onBlur={() => handleBlur('local')}
                                value={formData.local} 
                                id="local" 
                                placeholder='Nhập địa chỉ diễn ra hoạt động' 
                                className={getInputClassName('local', 'w-full border-2 px-3 py-2 rounded-lg focus:outline-none')}
                            />
                            {renderFieldError('local')}
                        </div>
                    </div>

                    {/* Remote Option */}
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

                    {/* Dates */}
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Ngày Bắt Đầu <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="timeStart"
                                value={formData.timeStart}
                                onChange={handleInputChange}
                                onBlur={() => handleBlur('timeStart')}
                                className={getInputClassName('timeStart')}
                            />
                            {renderFieldError('timeStart')}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Ngày Kết Thúc <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="timeEnd"
                                value={formData.timeEnd}
                                onChange={handleInputChange}
                                onBlur={() => handleBlur('timeEnd')}
                                className={getInputClassName('timeEnd')}
                            />
                            {renderFieldError('timeEnd')}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Hạn Đăng Ký <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleInputChange}
                                onBlur={() => handleBlur('deadline')}
                                className={getInputClassName('deadline')}
                            />
                            {renderFieldError('deadline')}
                        </div>
                    </div>

                    {/* Volunteer Required & Commitment */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Số Lượng Cần Tuyển <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="volunteerRequired"
                                value={formData.volunteerRequired}
                                onChange={handleInputChange}
                                onBlur={() => handleBlur('volunteerRequired')}
                                className={getInputClassName('volunteerRequired')}
                                placeholder="VD: 10-15 người"
                            />
                            {renderFieldError('volunteerRequired')}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Mức Độ Cam Kết <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="commitment"
                                value={formData.commitment}
                                onChange={handleInputChange}
                                onBlur={() => handleBlur('commitment')}
                                className={getInputClassName('commitment')}
                            >
                                <option value="flexible">⏰ Linh hoạt</option>
                                <option value="part-time">📅 Bán thời gian</option>
                                <option value="full-time">🕒 Toàn thời gian</option>
                            </select>
                            {renderFieldError('commitment')}
                        </div>
                    </div>

                    {/* Compensation (for collaborators) */}
                    {(formData.profitType === 'profit' || formData.activityType === 'collaborator') && (
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-1">
                                <DollarSign size={16} className="text-green-500" />
                                Hỗ Trợ / Thù Lao <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="compensation"
                                value={formData.compensation}
                                onChange={handleInputChange}
                                onBlur={() => handleBlur('compensation')}
                                className={getInputClassName('compensation')}
                                placeholder="VD: 500k-1M VNĐ, Hỗ trợ ăn uống, Certificate..."
                            />
                            {renderFieldError('compensation')}
                        </div>
                    )}

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 flex items-center gap-1">
                            <Edit size={16} className="text-purple-500" />
                            Mô Tả Chi Tiết Hoạt Động <span className="text-red-500">*</span>
                        </label>
                        <div className={`border-2 rounded-lg overflow-hidden transition-colors ${
                            (touched.description || showErrors) && errors.description
                                ? 'border-red-300 bg-red-50'
                                : 'border-gray-200 focus-within:border-blue-500'
                        }`}>
                            <div ref={editorRef} className="min-h-[200px]" onBlur={() => handleBlur('description')}></div>
                        </div>
                        {renderFieldError('description')}
                    </div>

                    {/* Skills Required */}
                    <div>
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-1">
                                Kỹ năng cần thiết
                                {formData.activityType === 'collaborator' && <span className="text-red-500">*</span>}
                            </label>

                            <div className="flex gap-3 items-start">
                                <input
                                    type="text"
                                    value={newRequirement}
                                    onChange={(e) => {
                                        setNewRequirement(e.target.value);
                                        if (errors.newRequirement) {
                                            setErrors(prev => ({ ...prev, newRequirement: '' }));
                                        }
                                    }}
                                    onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
                                    className={`flex-1 min-w-0 p-3 border-2 rounded-lg focus:outline-none transition-colors ${
                                        errors.newRequirement
                                            ? 'border-red-300 focus:border-red-500 bg-red-50'
                                            : 'border-gray-200 focus:border-blue-500'
                                    }`}
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
                            {errors.newRequirement && (
                                <div className="flex items-center gap-1 text-red-600 text-sm">
                                    <AlertCircle size={14} />
                                    <span>{errors.newRequirement}</span>
                                </div>
                            )}

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
                            {renderFieldError('requirements')}

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Edit size={16} className="text-purple-500" />
                                    Mô tả yêu cầu ứng viên
                                </label>
                                <textarea
                                    name="requirements_description"
                                    value={formData.requirements_description}
                                    onChange={handleInputChange}
                                    onBlur={() => handleBlur('requirements_description')}
                                    placeholder="Mô tả chi tiết các yêu cầu (ví dụ: kinh nghiệm, bằng cấp, kỹ năng mềm…)"
                                    className={getInputClassName('requirements_description', 'w-full min-h-[120px] p-3 border-2 rounded-lg resize-vertical focus:outline-none transition-colors')}
                                    aria-label="Mô tả yêu cầu ứng viên"
                                />
                                {renderFieldError('requirements_description')}
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
                                onBlur={() => handleBlur('benefitsDescription')}
                                placeholder="Liệt kê quyền lợi: lương, thưởng, bảo hiểm, môi trường làm việc, cơ hội thăng tiến..."
                                className={getInputClassName('benefitsDescription', 'w-full min-h-[100px] p-3 border-2 rounded-lg resize-vertical focus:outline-none transition-colors')}
                                aria-label="Mô tả quyền lợi"
                            />
                            {renderFieldError('benefitsDescription')}
                        </div>

                        <div className="mt-6 space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Edit size={16} className="text-purple-500" />
                                Thông tin liên hệ <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-3">
                                <textarea
                                    name="contactInfo"
                                    value={formData.contactInfo}
                                    onChange={handleInputChange}
                                    onBlur={() => handleBlur('contactInfo')}
                                    rows={3}
                                    className={getInputClassName('contactInfo', 'w-full p-3 border-2 rounded-lg focus:outline-none transition-colors resize-none')}
                                    placeholder="Email: contact@org.com&#10;Phone: 0123456789&#10;Facebook: fb.com/orgname"
                                />
                            </div>
                            {renderFieldError('contactInfo')}
                            <div className="text-xs text-gray-500">
                                💡 Vui lòng cung cấp ít nhất một email hoặc số điện thoại
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-gray-200">
                    <button 
                        onClick={saveDraft}
                        disabled={isSaving}
                        className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        💾 {isSaving ? 'Đang lưu...' : 'Lưu nháp'}
                    </button>
                    
                    <button 
                        onClick={generatePreviewHtml}
                        className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
                    >
                        <Eye size={16} />
                        🔍 Xem trước
                    </button>
                    
                    <button 
                        onClick={publish}
                        disabled={isPublishing}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPublishing ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                        {isPublishing 
                            ? 'Đang xử lý...' 
                            : type === 'edit' ? "Cập nhật" : "🚀 Đăng tuyển"
                        }
                    </button>
                    
                    <button 
                        onClick={resetForm}
                        className="px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition flex items-center gap-2"
                    >
                        <X size={16} />
                        🧹 Reset
                    </button>
                </div>

                {/* Form Validation Summary */}
                {showErrors && Object.keys(errors).length > 0 && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                            <AlertCircle size={16} />
                            Vui lòng kiểm tra các trường sau:
                        </h4>
                        <ul className="text-sm text-red-600 space-y-1">
                            {Object.entries(errors).map(([field, error]) => (
                                error && (
                                    <li key={field}>
                                        • {field === 'organizationName' ? 'Tên tổ chức' :
                                           field === 'activityTitle' ? 'Tên hoạt động' :
                                           field === 'category' ? 'Lĩnh vực' :
                                           field === 'local' ? 'Địa điểm' :
                                           field === 'timeStart' ? 'Ngày bắt đầu' :
                                           field === 'timeEnd' ? 'Ngày kết thúc' :
                                           field === 'deadline' ? 'Hạn đăng ký' :
                                           field === 'volunteerRequired' ? 'Số lượng cần tuyển' :
                                           field === 'description' ? 'Mô tả hoạt động' :
                                           field === 'contactInfo' ? 'Thông tin liên hệ' :
                                           field === 'compensation' ? 'Hỗ trợ/Thù lao' :
                                           field === 'requirements' ? 'Kỹ năng yêu cầu' :
                                           field}: {error}
                                    </li>
                                )
                            ))}
                        </ul>
                    </div>
                )}

                {/* Progress Indicator */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-800">Tiến độ hoàn thành</span>
                        <span className="text-sm text-blue-600">
                            {Math.round((Object.keys(formData).filter(key => 
                                formData[key] && formData[key] !== '' && 
                                (Array.isArray(formData[key]) ? formData[key].length > 0 : true)
                            ).length / Object.keys(formData).length) * 100)}%
                        </span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                        <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{
                                width: `${Math.round((Object.keys(formData).filter(key => 
                                    formData[key] && formData[key] !== '' && 
                                    (Array.isArray(formData[key]) ? formData[key].length > 0 : true)
                                ).length / Object.keys(formData).length) * 100)}%`
                            }}
                        ></div>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">
                        Hoàn thành đầy đủ thông tin để tăng hiệu quả tuyển dụng
                    </p>
                </div>
            </div>
        </div>
    );
}