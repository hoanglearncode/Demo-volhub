// components/Dashboard/ErrorState.jsx
import { Unplug, RefreshCw } from "lucide-react";

const ErrorState = ({ status = 404, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 rounded-xl">
      <div className="text-center max-w-md">
        <div className="p-8 bg-gray-100 rounded-full border border-gray-200 inline-block mb-6">
          <Unplug size={64} className="text-gray-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-700 mb-2">{status} - Oops!</h1>
        <p className="text-gray-600 mb-6">Có lỗi xảy ra trong quá trình tải dữ liệu. Vui lòng thử lại sau.</p>
        <button 
          onClick={onRetry}
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <RefreshCw size={18} className="mr-2" />
          Thử lại
        </button>
      </div>
    </div>
  );
};
export default ErrorState