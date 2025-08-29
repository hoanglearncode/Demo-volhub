// components/Dashboard/ExploreFeatures.jsx
import { ShoppingCart, Calendar, Users, ArrowRight } from "lucide-react";

const ExploreFeatures = () => {
  const features = [
    {
      title: "Mua dịch vụ",
      description: "Nâng cấp gói dịch vụ để tiếp cận nhiều ứng viên hơn",
      icon: ShoppingCart,
      color: "blue",
      action: "Xem gói dịch vụ"
    },
    {
      title: "Đăng tin sự kiện",
      description: "Chia sẻ các sự kiện tuyển dụng và hội thảo nghề nghiệp",
      icon: Calendar,
      color: "green", 
      action: "Đăng tin ngay"
    },
    {
      title: "Tìm kiếm ứng viên",
      description: "Khám phá cơ sở dữ liệu ứng viên tiềm năng",
      icon: Users,
      color: "purple",
      action: "Tìm kiếm"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: "bg-blue-50 hover:bg-blue-100",
        icon: "text-blue-600",
        button: "bg-blue-600 hover:bg-blue-700"
      },
      green: {
        bg: "bg-green-50 hover:bg-green-100", 
        icon: "text-green-600",
        button: "bg-green-600 hover:bg-green-700"
      },
      purple: {
        bg: "bg-purple-50 hover:bg-purple-100",
        icon: "text-purple-600", 
        button: "bg-purple-600 hover:bg-purple-700"
      }
    };
    return colors[color];
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Khám phá tính năng</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature, index) => {
          const colorClasses = getColorClasses(feature.color);
          const Icon = feature.icon;
          
          return (
            <div 
              key={index}
              className={`${colorClasses.bg} rounded-xl p-6 transition-all duration-200 cursor-pointer group border border-gray-100`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Icon size={24} className={colorClasses.icon} />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow">{feature.description}</p>
                <button className={`${colorClasses.button} text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center justify-center group-hover:shadow-md`}>
                  {feature.action}
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ExploreFeatures;