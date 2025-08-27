import { use, useEffect, useState } from "react";
import btcServices from "../../hook/oganations/Nav.jsx";
import { Link } from "react-router-dom";
import {
  BellDot,
  Boxes,
  History,
  ChartNoAxesCombined,
  Mail,
  ShoppingCart,
  WandSparkles,
  BriefcaseBusiness,
  Newspaper,
  User,
  ThumbsUp,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function BtcNav({isCollapsed = false}) {
  const [data, setData] = useState([]);
  const {user, isAuthenticated} = useAuth();

  useEffect(() => {
    async function load() {
      // nếu getNav trả về promise
      const remote = await btcServices.getNav?.(); // optional call
      if (remote && Array.isArray(remote) && remote.length > 0) {
        setData(remote);
        return;
      }

      setData([
        { to: "/btc", title: "Bảng tin", Icon: Boxes },
        { to: "/btc/recommendation-cv", title: "CV đề xuất", Icon: ThumbsUp },
        { to: "/btc/recruitment", title: "Tuyển dụng", Icon: BriefcaseBusiness },
        { to: "/btc/recruitment-post", title: "Tin tuyển dụng", Icon: Newspaper },
        { to: "/btc/cv-manage", title: "Quản lý CV", Icon: User },
        { to: "/btc/recruitment-report", title: "Báo cáo tuyển dụng", Icon: ChartNoAxesCombined },
        { to: "/btc/services", title: "Mua dịch vụ mới", Icon: ShoppingCart },
        { to: "/btc/my-services", title: "Dịch vụ của tôi", Icon: WandSparkles },
        { to: "/btc/history", title: "Lịch sử hoạt động", Icon: History },
        { to: "/btc/notification-system", title: "Thông báo hệ thống", Icon: BellDot },
        { to: "/btc/post-box", title: "Hộp thư", Icon: Mail },
      ]);
    }

    load();
  }, []);

  return (
    <div className={`flex flex-col gap-3 px-5  py-3 overflow-y-auto items-center ${isCollapsed ? "w-15" : "min-w-60 w-auto max-w-72"} overflow-x-hidden bg-gray-100 min-h-screen`}>
      <div className="flex w-full min-w-15 items-center px-2 gap-2">
        <img src="/logo.svg" alt="avatar" className="w-12 h-12 rounded-full"/>
        <div className={`${isCollapsed ? "hidden" : ""} transform transition-transform duration-300 flex flex-col`}>
          <span className="font-semibold text-sm">{user.name}</span>
          <span className="font-semibold text-xs">{user?.role}</span>
          <span className="font-semibold text-xs">{user?.status}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 font-semibold">
        {data.map((item) => {
          const Icon = item.Icon; 
          return (
            <Link
              to={item.to}
              key={item.to}
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100"
            >
              {Icon ? <Icon size={16} className="text-gray-600" /> : null}
              <span className={`${isCollapsed ? "hidden" : ""} text-sm text-gray-700`}>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
