import {Calendar, FileText, Play, CheckCircle } from 'lucide-react'
const EventStatusCard = ({ events }) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center mb-4">
            <Calendar className="mr-2 text-blue-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">Sự kiện đã tạo</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
                <div className="bg-orange-100 rounded-lg p-4 mb-2">
                <FileText className="mx-auto text-orange-600" size={24} />
                </div>
                <p className="text-2xl font-bold text-orange-600">{events?.draft}</p>
                <p className="text-sm text-gray-500">Nháp</p>
            </div>
            <div className="text-center">
                <div className="bg-green-100 rounded-lg p-4 mb-2">
                <Play className="mx-auto text-green-600" size={24} />
                </div>
                <p className="text-2xl font-bold text-green-600">{events?.active}</p>
                <p className="text-sm text-gray-500">Đang mở</p>
            </div>
            <div className="text-center">
                <div className="bg-gray-100 rounded-lg p-4 mb-2">
                <CheckCircle className="mx-auto text-gray-600" size={24} />
                </div>
                <p className="text-2xl font-bold text-gray-600">{events?.completed}</p>
                <p className="text-sm text-gray-500">Đã kết thúc</p>
            </div>
            </div>
        </div>
    );
}
export default EventStatusCard;