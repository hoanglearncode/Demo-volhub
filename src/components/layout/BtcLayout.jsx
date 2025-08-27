import { Bell, BellOff, X, CircleChevronDown, Menu, User } from "lucide-react";
import {Link, Route, Routes} from 'react-router-dom'
import { useEffect, useState } from "react";
import Dashboard from "../../page/oganations/Dashboard.jsx";
import RecruitmentPage from '../../page/oganations/RecruitmentPage.jsx'

import { useAuth } from "../../context/AuthContext.jsx";
import BtcNav from "../../hook/system/BtcNav.jsx";
import Notification from "../../hook/oganations/Notification.jsx";
import Account from "../../page/oganations/Account.jsx";

function BtcLayout() {
  const {user, isAuthenticated} = useAuth();

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [notification, setNotification] = useState([]);

  useEffect(()=> {
    const data = Notification.getNotification();

    if(data.length > 0){
      setNotification(data);
    }
  }, [])

  return (
    <div className="flex flex-col max-w-screen">
      <div className="md:px-5 px-2 min-h-12 flex items-center justify-between shadow fixed w-full bg-white">
        <div className="flex gap-5 items-center">
            <button onClick={()=> setIsCollapsed(!isCollapsed)}>
              <Menu size={20} className=""/>
            </button>
            <div>
              <span className="font-bold text-xl text-gray-700 mb-0.5">VolunteerHub</span>
            </div>
        </div>
        <div className="relative">
          <div className="flex gap-3">
            <button onClick={()=> {
              setNotificationMenuOpen(!notificationMenuOpen)
              if (userMenuOpen) {
                setUserMenuOpen()
              }
            }}
             className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-300">
              <Bell size={18} className=""/>
            </button>
            <div onClick={()=> 
              {
                setUserMenuOpen(!userMenuOpen)
                if(notificationMenuOpen) {
                  setNotificationMenuOpen(!notificationMenuOpen)
                }
              }}>
              <div className="flex items-center justify-center gap-2 bg-gray-500 p-1 rounded-full">
                <img src="/logo.svg" alt="avatar" className="w-8 h-8 rounded-full"/>
                <CircleChevronDown size={16} className="text-white"/>
              </div>
            </div>
            <div
                role="menu"
                className={`absolute right-0 mt-13 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 transition-all origin-top-right ${
                  userMenuOpen && !notificationMenuOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                }`}>
                    <Link to="/btc/account" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-blue-50">
                      <User size={16} /> Cài đặt tài khoản
                    </Link>
                    <hr className="my-2" />
              <button
                onClick={() => logout?.()}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  Đăng xuất
              </button>
            </div>
            <div
              role="menu"
              className={`absolute right-0 mt-13 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 transition-all origin-top-right ${
                notificationMenuOpen && !userMenuOpen
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible"
              }`}
            >
              {notification.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                  <BellOff size={40} className="mb-3 text-gray-400" />
                  <p className="text-sm">Bạn không có thông báo nào mới</p>
                </div>
              ) : (
                <div className="flex flex-col max-h-96">
                  {/* Header */}
                  <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                    <p className="font-semibold text-lg">Thông báo</p>
                    <button onClick={()=> setNotificationMenuOpen(!notificationMenuOpen)} className="w-8 h-8 bg-gray-100 hover:bg-blue-500 hover:text-white transition rounded-full flex items-center justify-center">
                      <X size={18} />
                    </button>
                  </div>

                  {/* Danh sách thông báo */}
                  <div className="overflow-y-auto max-h-80">
                    {notification.map((item, idx) => (
                      <Link
                        to={item.link}
                        key={idx}
                        className={`group flex flex-col gap-1 px-4 py-3 transition border-b last:border-0 
                          ${
                            item.read
                              ? "bg-white hover:bg-gray-50"
                              : "bg-blue-50 hover:bg-blue-100"
                          }`}
                      >
                        <span className="font-medium text-gray-900 group-hover:text-blue-600">
                          {item.title}
                        </span>
                        <span className="text-sm text-gray-600">{item.body}</span>
                        <span className="text-xs text-gray-400">{item.time}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-12 max-w-screen">
        <BtcNav isCollapsed={isCollapsed}/>
        <div className="w-full">
          <Routes>
            <Route path="/btc" element={<Dashboard />} />
            <Route path="/btc/recruitment" element={<RecruitmentPage />} />
            {/*<Route path="/events" element={<EventsPage />} />
            <Route path="/volunteers" element={<Volunteers />} />
            <Route path="/contests" element= {<ContestPage />} />
            <Route path="/contact" element= {<Contact />} />*/}
            <Route path="/btc/account" element= {<Account />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default BtcLayout;