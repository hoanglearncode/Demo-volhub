// components/Dashboard/SystemUpdates.jsx
import { Bell, Clock, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SystemUpdates = ({ updates = [] }) => {
  const navigate = useNavigate();
  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle size={20} className="text-green-600" />;
      case 'warning': return <AlertCircle size={20} className="text-yellow-600" />;
      case 'error': return <AlertCircle size={20} className="text-red-600" />;
      default: return <Info size={20} className="text-blue-600" />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'error': return 'bg-red-50 border-red-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  if (updates.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Cập nhật hệ thống</h2>
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <Bell size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">Không có cập nhật mới nào</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Cập nhật hệ thống</h2>
      <div className="space-y-3">
        {updates.map((update, index) => (
          <div 
            key={index}
            className={`${getBgColor(update.type)} border rounded-xl p-4 transition-all hover:shadow-md`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(update.type)}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-gray-800">{update.title}</h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock size={12} className="mr-1" />
                    <span>{update.time}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{update.message}</p>
                {update.action && (
                  <button onClick={()=> navigate(`/btc/notification-system/detail/${update?.id}`)} className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                    {update.action}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SystemUpdates