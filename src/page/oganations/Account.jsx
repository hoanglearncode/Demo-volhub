import { Lock, Settings, User, Building2, Users, FileText, Bell, Shield, MapPin, Phone, Mail, Calendar, Award, Activity } from "lucide-react";
import { useState } from "react";

export default function Account() {
    const [activeTab, setActiveTab] = useState('info');
    const [organizationData, setOrganizationData] = useState({
        name: 'Tổ chức Tình nguyện Xanh',
        code: 'ORG001',
        type: 'Tổ chức phi lợi nhuận',
        email: 'contact@tochucxanh.org',
        phone: '0123456789',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        foundedDate: '2020-01-15',
        description: 'Tổ chức hoạt động trong lĩnh vực bảo vệ môi trường và hoạt động xã hội.',
        website: 'https://tochucxanh.org',
        license: 'GP123456789',
        status: 'Đang hoạt động'
    });

    const [ctvStats, setCtvStats] = useState({
        totalCTV: 45,
        activeCTV: 38,
        newThisMonth: 8,
        totalTNV: 120,
        activeTNV: 95,
        newTNVThisMonth: 15
    });

    const menuItems = [
        { id: 'info', icon: Building2, label: 'Thông tin tổ chức', active: true },
        { id: 'ctv', icon: Users, label: 'Quản lý CTV', active: false },
        { id: 'tnv', icon: User, label: 'Quản lý TNV', active: false },
        { id: 'documents', icon: FileText, label: 'Tài liệu & Chứng nhận', active: false },
        { id: 'password', icon: Lock, label: 'Đổi mật khẩu', active: false },
        { id: 'settings', icon: Settings, label: 'Cài đặt', active: false },
        { id: 'notifications', icon: Bell, label: 'Thông báo', active: false },
        { id: 'security', icon: Shield, label: 'Bảo mật', active: false }
    ];

    const renderContent = () => {
        switch(activeTab) {
            case 'info':
                return (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Thông tin cơ bản</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tên tổ chức</label>
                                    <input 
                                        type="text" 
                                        value={organizationData.name}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        onChange={(e) => setOrganizationData({...organizationData, name: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Mã tổ chức</label>
                                    <input 
                                        type="text" 
                                        value={organizationData.code}
                                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Loại hình</label>
                                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                        <option>Tổ chức phi lợi nhuận</option>
                                        <option>Doanh nghiệp xã hội</option>
                                        <option>Tổ chức cộng đồng</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                        <Activity className="w-4 h-4 mr-1" />
                                        {organizationData.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Thông tin liên hệ</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Email
                                    </label>
                                    <input 
                                        type="email" 
                                        value={organizationData.email}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <Phone className="w-4 h-4 mr-2" />
                                        Số điện thoại
                                    </label>
                                    <input 
                                        type="tel" 
                                        value={organizationData.phone}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        Địa chỉ
                                    </label>
                                    <textarea 
                                        value={organizationData.address}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'ctv':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-600 text-sm font-medium">Tổng CTV</p>
                                        <p className="text-2xl font-bold text-blue-900">{ctvStats.totalCTV}</p>
                                    </div>
                                    <Users className="w-8 h-8 text-blue-600" />
                                </div>
                            </div>
                            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-green-600 text-sm font-medium">CTV Đang hoạt động</p>
                                        <p className="text-2xl font-bold text-green-900">{ctvStats.activeCTV}</p>
                                    </div>
                                    <Activity className="w-8 h-8 text-green-600" />
                                </div>
                            </div>
                            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-purple-600 text-sm font-medium">CTV mới tháng này</p>
                                        <p className="text-2xl font-bold text-purple-900">{ctvStats.newThisMonth}</p>
                                    </div>
                                    <Award className="w-8 h-8 text-purple-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Danh sách Cộng tác viên</h3>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    Thêm CTV mới
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-medium text-gray-700">Họ tên</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-700">Email</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-700">Chuyên môn</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-700">Trạng thái</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-700">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-4 py-3">Nguyễn Văn A</td>
                                            <td className="px-4 py-3">nguyen.a@email.com</td>
                                            <td className="px-4 py-3">Marketing</td>
                                            <td className="px-4 py-3">
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                                    Đang hoạt động
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <button className="text-blue-600 hover:text-blue-800 mr-3">Xem</button>
                                                <button className="text-red-600 hover:text-red-800">Xóa</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            case 'tnv':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-orange-600 text-sm font-medium">Tổng TNV</p>
                                        <p className="text-2xl font-bold text-orange-900">{ctvStats.totalTNV}</p>
                                    </div>
                                    <User className="w-8 h-8 text-orange-600" />
                                </div>
                            </div>
                            <div className="bg-teal-50 rounded-lg p-6 border border-teal-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-teal-600 text-sm font-medium">TNV Đang hoạt động</p>
                                        <p className="text-2xl font-bold text-teal-900">{ctvStats.activeTNV}</p>
                                    </div>
                                    <Activity className="w-8 h-8 text-teal-600" />
                                </div>
                            </div>
                            <div className="bg-pink-50 rounded-lg p-6 border border-pink-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-pink-600 text-sm font-medium">TNV mới tháng này</p>
                                        <p className="text-2xl font-bold text-pink-900">{ctvStats.newTNVThisMonth}</p>
                                    </div>
                                    <Award className="w-8 h-8 text-pink-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Danh sách Tình nguyện viên</h3>
                                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                    Thêm TNV mới
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-medium text-gray-700">Họ tên</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-700">Email</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-700">Kỹ năng</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-700">Trạng thái</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-700">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-4 py-3">Trần Thị B</td>
                                            <td className="px-4 py-3">tran.b@email.com</td>
                                            <td className="px-4 py-3">Giảng dạy</td>
                                            <td className="px-4 py-3">
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                                    Đang hoạt động
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <button className="text-blue-600 hover:text-blue-800 mr-3">Xem</button>
                                                <button className="text-red-600 hover:text-red-800">Xóa</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            case 'password':
                return (
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Đổi mật khẩu</h3>
                        <div className="max-w-md space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu hiện tại</label>
                                <input 
                                    type="password" 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu mới</label>
                                <input 
                                    type="password" 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu mới</label>
                                <input 
                                    type="password" 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Cập nhật mật khẩu
                            </button>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-800">Chức năng đang phát triển</h3>
                        <p className="text-gray-600 mt-2">Chức năng này sẽ sớm được cập nhật.</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý hồ sơ tổ chức</h1>
                    <p className="text-gray-600 mt-2">Quản lý thông tin tổ chức và nhân sự CTV/TNV</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-sm border p-4">
                            <nav className="space-y-2">
                                {menuItems.map((item) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                                                activeTab === item.id 
                                                    ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                                                    : 'hover:bg-gray-100 text-gray-700'
                                            }`}
                                        >
                                            <IconComponent className="w-5 h-5 mr-3" />
                                            {item.label}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {renderContent()}
                        
                        {/* Save Button */}
                        {activeTab === 'info' && (
                            <div className="mt-6 flex justify-end space-x-4">
                                <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                    Hủy bỏ
                                </button>
                                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    Lưu thay đổi
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}