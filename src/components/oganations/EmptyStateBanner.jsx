import { Plus } from "lucide-react";
  // Banner component khi chưa có sự kiện
  const EmptyStateBanner = () => (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 text-center border border-blue-100 shadow-lg">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Plus className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          Chưa có sự kiện nào được tạo
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Hãy tạo sự kiện đầu tiên của bạn để bắt đầu nhận được các đề xuất ứng viên phù hợp nhất!
        </p>
        <button 
          onClick={() => navigate('/btc/recruitment-post')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Tạo sự kiện đầu tiên
        </button>
      </div>
    </div>
  );

export default EmptyStateBanner;