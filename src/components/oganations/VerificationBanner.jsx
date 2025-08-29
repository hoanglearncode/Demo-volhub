// components/Dashboard/VerificationBanner.jsx
import { CheckCircle, AlertTriangle } from "lucide-react";

const VerificationBanner = ({ isVerified = false }) => {
  if (isVerified) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-orange-800">
            <span className="font-semibold">Hoàn thành xác thực tài khoản</span> để sử dụng đầy đủ tính năng của hệ thống.
          </p>
        </div>
        <div className="ml-4">
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition-colors">
            Xác thực ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationBanner