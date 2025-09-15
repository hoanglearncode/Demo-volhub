
// components/Dashboard/ImportantNotification.jsx
import { Info, X } from "lucide-react";
import { useState } from "react";
import parse from "html-react-parser";


const ImportantNotification = ({ notification }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!notification || !isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 shadow-md rounded-lg overflow-hidden mb-6">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="p-2 bg-blue-100 rounded-full">
                <Info size={20} className="text-blue-600" />
              </div>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">
                Thông báo quan trọng!
              </h3>
              <div className="text-sm text-gray-700 leading-relaxed">
                {parse(notification)}
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportantNotification;