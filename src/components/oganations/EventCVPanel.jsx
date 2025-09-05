import { useEffect, useState } from "react";
import cvManageService from '../../services/oganations/cvManageService.js';
import { CheckCircle, X } from "lucide-react";

export default function EventCVPanel({ data }) {
    const [cvData, setCvData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Xử lý dữ liệu khi component mount hoặc data thay đổi
    useEffect(() => {
        if (data) {
            setCvData(data);
        }
    }, [data]);

    // Hàm xử lý thao tác xem chi tiết
    const handleViewDetails = (eventId) => {
        console.log('Xem chi tiết chiến dịch:', eventId);
        // Thêm logic xem chi tiết
    };

    // Hàm xử lý thao tác phê duyệt
    const handleApprove = async (eventId) => {
        setLoading(true);
        try {
            // Gọi API phê duyệt
            await cvManageService.approveCV(eventId);
            console.log('Đã phê duyệt:', eventId);
            // Cập nhật lại dữ liệu
        } catch (error) {
            console.error('Lỗi phê duyệt:', error);
        } finally {
            setLoading(false);
        }
    };

    // Hàm xử lý thao tác từ chối
    const handleReject = async (eventId) => {
        setLoading(true);
        try {
            // Gọi API từ chối
            await cvManageService.rejectCV(eventId);
            console.log('Đã từ chối:', eventId);
            // Cập nhật lại dữ liệu
        } catch (error) {
            console.error('Lỗi từ chối:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
            {/* Table Header */}
            <div className="grid grid-cols-6 bg-gray-50 border-b border-gray-200 p-4 font-semibold text-gray-700">
                <span className="text-center">Chiến dịch tuyển dụng</span>
                <span className="text-center">Số ứng viên đã ứng tuyển</span>
                <span className="text-center">Số ứng viên đã được duyệt</span>
                <span className="text-center">Số ứng viên đang chờ duyệt</span>
                <span className="text-center">Trạng thái</span>
                <span className="text-center">Thao tác</span>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
                {cvData && cvData.length > 0 ? (
                    cvData.map((item, index) => (
                        <div key={item.id || index} className="grid grid-cols-6 p-4 hover:bg-gray-50 transition-colors duration-200">
                            {/* Tên chiến dịch */}
                            <div className="flex items-center justify-center">
                                <div className="text-center">
                                    <h3 className="font-medium text-gray-900 mb-1">
                                        {item.campaignName || item.name || 'Không có tên'}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {item.department || 'Chưa xác định'}
                                    </p>
                                </div>
                            </div>

                            {/* Số ứng viên đã ứng tuyển */}
                            <div className="flex items-center justify-center">
                                <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full font-semibold">
                                    {item.totalApplicants || 0}
                                </div>
                            </div>

                            {/* Số ứng viên đã được duyệt */}
                            <div className="flex items-center justify-center">
                                <div className="bg-green-100 text-green-800 px-3 py-2 rounded-full font-semibold">
                                    {item.approvedApplicants || 0}
                                </div>
                            </div>

                            {/* Số ứng viên đang chờ duyệt */}
                            <div className="flex items-center justify-center">
                                <div className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-full font-semibold">
                                    {item.pendingApplicants || 0}
                                </div>
                            </div>

                            {/* Trạng thái */}
                            <div className="flex items-center justify-center">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    item.status === 'active' 
                                        ? 'bg-green-100 text-green-800' 
                                        : item.status === 'closed'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {item.status === 'active' ? 'Đang mở' : 
                                     item.status === 'closed' ? 'Đã đóng' : 'Không xác định'}
                                </span>
                            </div>

                            {/* Thao tác */}
                            <div className="flex items-center justify-center space-x-2">
                                <button
                                    onClick={() => handleViewDetails(item.id)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                    disabled={loading}
                                >
                                    Chi tiết
                                </button>
                                
                                {item.pendingApplicants > 0 && (
                                    <>
                                        <button
                                            onClick={() => handleApprove(item.id)}
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                            disabled={loading}
                                        >
                                            <CheckCircle size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleReject(item.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                            disabled={loading}
                                        >
                                            <X size={20} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center">
                        <div className="text-gray-400 mb-4">
                            <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có dữ liệu</h3>
                        <p className="text-gray-500">Hiện tại chưa có chiến dịch tuyển dụng nào.</p>
                    </div>
                )}
            </div>

            {/* Footer với thống kê tổng */}
            {cvData && cvData.length > 0 && (
                <div className="bg-gray-50 p-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                            Tổng: {cvData.length} chiến dịch tuyển dụng
                        </span>
                        <div className="flex space-x-6 text-sm">
                            <span className="text-blue-600 font-medium">
                                Tổng ứng viên: {cvData.reduce((total, item) => total + (item.totalApplicants || 0), 0)}
                            </span>
                            <span className="text-green-600 font-medium">
                                Đã duyệt: {cvData.reduce((total, item) => total + (item.approvedApplicants || 0), 0)}
                            </span>
                            <span className="text-yellow-600 font-medium">
                                Chờ duyệt: {cvData.reduce((total, item) => total + (item.pendingApplicants || 0), 0)}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading overlay */}
            {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                    <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <span className="text-gray-600">Đang xử lý...</span>
                    </div>
                </div>
            )}
        </div>
    );
}