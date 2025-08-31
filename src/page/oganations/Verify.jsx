import { ArrowLeft, ArrowRight, User, Building, FileText, Check, Mail, Shield, Award } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const ImfomationComponents = ({ onBack, onNext }) => {
    return (
        <div className="bg-white h-full border border-gray-200 rounded-lg">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={onBack}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>
                    <div className="flex items-center gap-2">
                        <User className="text-blue-500" size={24} />
                        <h2 className="text-xl font-semibold">Xác thực thông tin liên hệ</h2>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <Check size={16} />
                    <span>Hoàn thành</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="max-w-2xl">
                    <div className="mb-6">
                        <p className="text-gray-600 mb-4">
                            Xác thực thông tin liên hệ giúp tăng độ tin cậy và bảo mật cho tài khoản của bạn.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Mail className="text-green-500" size={20} />
                                <div>
                                    <h3 className="font-medium">Email đã xác thực</h3>
                                    <p className="text-sm text-gray-600">nguyenvana@email.com</p>
                                </div>
                            </div>
                            <Check className="text-green-500" size={20} />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Shield className="text-gray-400" size={20} />
                                <div>
                                    <h3 className="font-medium">Số điện thoại</h3>
                                    <p className="text-sm text-gray-600">Chưa xác thực</p>
                                </div>
                            </div>
                            <button className="text-blue-500 hover:text-blue-600 font-medium">
                                Xác thực
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button 
                            onClick={onNext}
                            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <span>Tiếp tục</span>
                            <ArrowRight size={16} />
                        </button>
                        <button 
                            onClick={onBack}
                            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Quay lại
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OganationComponents = ({ onBack, onNext }) => {
    return (
        <div className="bg-white h-full border border-gray-200 rounded-lg">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={onBack}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>
                    <div className="flex items-center gap-2">
                        <Building className="text-orange-500" size={24} />
                        <h2 className="text-xl font-semibold">Xác thực thông tin tổ chức</h2>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                    <span>Chưa hoàn thành</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="max-w-2xl">
                    <div className="mb-6">
                        <p className="text-gray-600 mb-4">
                            Cung cấp thông tin tổ chức để gia tăng độ tin cậy và thu hút ứng viên tốt hơn.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                            <h3 className="font-medium mb-2">Tên công ty</h3>
                            <input 
                                type="text" 
                                placeholder="Nhập tên công ty"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                            <h3 className="font-medium mb-2">Mã số thuế</h3>
                            <input 
                                type="text" 
                                placeholder="Nhập mã số thuế"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                            <h3 className="font-medium mb-2">Địa chỉ công ty</h3>
                            <textarea 
                                placeholder="Nhập địa chỉ công ty"
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button 
                            onClick={onNext}
                            className="flex items-center gap-2 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                        >
                            <span>Lưu và tiếp tục</span>
                            <ArrowRight size={16} />
                        </button>
                        <button 
                            onClick={onBack}
                            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Quay lại
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DefaultComponent = ({ onNavigate }) => {
    const user = useAuth();
    const navigate = useNavigate();

    const steps = [
        {
            id: 'info',
            title: 'Xác thực thông tin liên hệ',
            completed: user?.email_verified,
            icon: User,
            color: 'blue',
            description: 'Xác thực email và số điện thoại'
        },
        {
            id: 'origin',
            title: 'Xác thực thông tin tổ chức',
            completed: false,
            icon: Building,
            color: 'orange',
            description: 'Cung cấp thông tin công ty'
        },
        {
            id: 'post',
            title: 'Tạo tin đầu tiên',
            completed: false,
            icon: FileText,
            color: 'purple',
            description: 'Đăng tin tuyển dụng đầu tiên'
        }
    ];

    return (
        <div className="bg-white h-full border border-gray-200 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                {/* Banner */}
                <div className="hidden lg:flex bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center p-8">
                    <div className="text-center text-white">
                        <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Shield size={48} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Bảo mật tài khoản</h3>
                        <p className="text-blue-100 leading-relaxed">
                            Hoàn thành các bước xác thực để tăng độ tin cậy và bảo mật cho tài khoản của bạn
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-2">
                            Xin chào <span className="text-green-500">{user?.username}</span>
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Hãy thực hiện các bước sau để gia tăng tính bảo mật và hoàn thiện hồ sơ tuyển dụng của bạn.
                        </p>
                    </div>

                    <div className="space-y-4 mb-8">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isCompleted = step.completed;
                            
                            return (
                                <div
                                    key={step.id}
                                    className="group relative overflow-hidden"
                                >
                                    <div className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                                        ${isCompleted 
                                            ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                                        }`}
                                        onClick={() => {
                                            if(step.id === "post") {
                                                navigate('/btc/recruitment-post');
                                            }else {
                                                onNavigate(step.id)
                                            }
                                        }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-lg ${
                                                isCompleted 
                                                    ? 'bg-green-500 text-white'
                                                    : step.color === 'blue' 
                                                        ? 'bg-blue-100 text-blue-600'
                                                        : step.color === 'orange'
                                                            ? 'bg-orange-100 text-orange-600'
                                                            : 'bg-purple-100 text-purple-600'
                                            }`}>
                                                {isCompleted ? <Check size={20} /> : <Icon size={20} />}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                                                <p className="text-sm text-gray-600">{step.description}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            {isCompleted && (
                                                <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                                                    Hoàn thành
                                                </span>
                                            )}
                                            <div className="p-2 bg-white rounded-full border border-gray-200 group-hover:border-gray-300 transition-colors">
                                                <ArrowRight size={16} className="text-gray-600" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center">
                        <button className="text-gray-500 hover:text-gray-600 underline transition-colors">
                            Thực hiện sau
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function VerifyPage() {
    const [active, setActive] = useState('default');

    const handleNavigate = (component) => {
        setActive(component);
    };

    const handleBack = () => {
        setActive('default');
    };

    const handleNext = (nextComponent) => {
        if (nextComponent) {
            setActive(nextComponent);
        } else {
            // Logic để chuyển đến component tiếp theo
            const steps = ['info', 'origin', 'post'];
            const currentIndex = steps.indexOf(active);
            if (currentIndex < steps.length - 1) {
                setActive(steps[currentIndex + 1]);
            }
        }
    };

    switch (active) {
        case 'info':
            return <ImfomationComponents onBack={handleBack} onNext={() => handleNext('origin')} />;
        case 'origin': 
            return <OganationComponents onBack={handleBack} onNext={() => handleNext('post')} />;
        default:
            return <DefaultComponent onNavigate={handleNavigate} />;
    }
}