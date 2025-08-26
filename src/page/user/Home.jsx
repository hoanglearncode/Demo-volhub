import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Heart, MapPin, Users } from "lucide-react";
import SearchBanner from "../../components/common/SearchBanner";
import hooks from "../../hook/user/Home.jsx";
import { useEffect, useState } from "react";
import ActivityCart from "../../components/common/ActivityCart.jsx";
import { Link } from "react-router-dom";
import trustedPartners from "../../services/user/pannerData.js";
import VolunteerFeedbackSection from "../../components/user/VolunteerFeedbackSection.js";

const stats = [
    { label: "Sự kiện đã tổ chức", value: "1,250+", icon: Calendar },
    { label: "Tình nguyện viên", value: "15,000+", icon: Users },
    { label: "Tỉnh thành", value: "63", icon: MapPin },
    { label: "Giờ tình nguyện", value: "50,000+", icon: Heart }
  ];


const panner = trustedPartners;

function Home() {
  const [data, setData] = useState([])
  const [activity, setActivity] = useState ([]);
  const [activeTab, setActiveTab] = useState(1);
  const [error, setError] = useState(false);

  const [pannerActive, setPannerActive] = useState(0);
  const [pannerCompany, setPannerCompany] = useState([]);



  useEffect(()=> {
    if(activeTab < 0) {
      setActiveTab(activity.length - 1);
    }
    if(activeTab === activity.length ){
      setActiveTab(0);
    }

    if(activeTab + 4 < data.length) {
      setActivity(data.slice(activeTab, activeTab + 4));
    }else {
      let value = (activeTab + 4) - data.length 
      setActivity(data.slice(activeTab , activeTab + 4 - value).concat(data.slice(0, value)))
    }
  }, [activeTab])


  useEffect(()=> {
    const activityData = hooks.exploreHooks();
    if (activityData.length > 0) {
      setData(activityData);
    };
  }, [])

  useEffect(()=> {
    setActivity(data.slice(0,4))  
  }, [data])

  useEffect(()=> {
    setPannerCompany(panner[pannerActive].partners)
  }, [pannerActive])


  return (
    <>
      <SearchBanner />
      
      {/* khám phá nền tảng */}
      <section className="mt-10 px-5 md:px-20">
        <div className="flex flex-col gap-5">
          <h1 className="text-xl border-b-2 py-2 border-gray-200 sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-500 bg-clip-text text-transparent">
            Khám phá nền tảng của chúng tôi
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 px-3 md:px-10 py-6 bg-white rounded-2xl">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center gap-2 bg-white rounded-xl border sm:border-none border-gray-300 p-3 md:p-4 text-center transition-transform duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                <stat.icon className="w-6 h-6 text-blue-500 mb-1" />
                <div className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">{stat.value}</div>              
                <div className="text-sm text-gray-600 truncate max-w-[10rem] md:max-w-[12rem]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Các hoạt động nổi bật
            </h2>
            <div className="flex items-center gap-3 justify-center">
              <button onClick={()=> setActiveTab(activeTab - 1)} className="p-2 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group">
                <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              </button>
              <Link to={`/events`} className="hover:text-blue-500 hover:font-semibold transition-all duration-300">
                Xem tất cả
              </Link>
              <button onClick={()=> setActiveTab(activeTab + 1)} className="p-2 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group">
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              </button>
            </div>
          </div>
          {error && <div className="text-red-500">Đã có lỗi xảy ra: {error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {activity.map((item) => (
              <ActivityCart key={item.id} prod={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-18 flex flex-col items-center justify-center gap-9 px-4 md:px-20">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-xl border-b-2 py-2 border-gray-200 sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-500 bg-clip-text text-transparent">
            Đối tác tin cậy
          </h1>
          <span className="font-semibold text-gray-600 text-lg">Cùng với hàng trăm tổ chức uy tín, chúng tôi xây dựng cộng đồng tình nguyện bền vững</span>
          <div className="w-full h-auto py-4 px-2 flex items-center justify-center overflow-x-auto gap-2">
            {panner.slice(0,6).map((item, idx) => (
              <button key={item.id} onClick={()=> setPannerActive(idx)} className={`px-3 text-sm font-semibold border py-3 rounded-xl border-gray-200 ${idx === pannerActive ? "bg-blue-200 text-blue-600" : "text-gray-500" } shadow`}>
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full h-auto py-4 px-2 flex items-center justify-center overflow-x-auto gap-8">
          {pannerCompany.map((item, idx) => (
            <Link to={item.logoSources.official} key={idx} className="flex flex-col justify-center gap-2 items-center">
              <img src={`${item.logoSources?.svg}`} alt="" className="w-10 h-10 rounded-xl"/>
              <span className="font-semibold text-gray-700">{item.name}</span>
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-between w-full rounded-xl py-4 md:px-10 bg-gradient-to-r from-blue-600 to-purple-500 py-10 md:px-20">
          <h3 className="text-xl md:text-2xl font-bold text-white">Trở thành đối tác của chúng tôi ngay!</h3>
          <Link to="/panner/register" className="flex items-center justify-center px-6 py-2 font-semibold border-gray-200 text-blue-600 hover:font-bold transition-all duration-300 bg-white border-1 max-w-lg rounded-2xl">Đăng ký <ArrowRight className="ml-3 mt-1"/></Link>
        </div>
      </section>
      
      <VolunteerFeedbackSection />
    </>
  );
}

export default Home;