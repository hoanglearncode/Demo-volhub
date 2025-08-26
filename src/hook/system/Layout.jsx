// src/layouts/Layout.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import  accountServices  from "../../services/user/account.services.js";
import TopNav from "./TopNav";

import NotFoundPage from "../../page/common/NotFoundPage.jsx";
import LoginPage from "../../page/common/LoginPage.jsx";
// khách ghé thăm (guest)
import Home from "../../page/user/Home.jsx";
import AboutPage from "../../page/user/About.jsx";
import EventsPage from "../../page/user/EventsPage.jsx";
import Footer from "../../components/common/Footer.jsx";
import Volunteers from "../../page/user/Volunteers.jsx";
import Contact from "../../page/user/Contact.jsx";
import ContestPage from "../../page/user/Contests.jsx";

// người dùng đã đăng ký (user)
// BTC (btc)
// quản trị viên (admin)
import Dashboard from "../../page/admin/Dashboard.jsx";
import AdminNav from "./AdminNav.jsx";
import { Bell, ChevronDownIcon, User } from "lucide-react";

/* === Layout components (rút gọn, bạn thay nội dung UI thật ở đây) === */
function GuestLayout() {
  return (
    <div className="flex flex-col">
      <TopNav />
      <main className="pt-20 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/contests" element= {<ContestPage />} />
          <Route path="/contact" element= {<Contact />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function UserLayout() {
  return <div className="flex flex-col">
      <TopNav />
      <main className="pt-20 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/contests" element= {<ContestPage />} />
          <Route path="/contact" element= {<Contact />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>;
}

function BtcLayout() {
  return (
    <div className="flex flex-col min-w-screen">
      <div className="flex">
        top content
      </div>
      <div className="flex w-full">
        <div>thanh nav</div>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/volunteers" element={<Volunteers />} />
            <Route path="/contests" element= {<ContestPage />} />
            <Route path="/contact" element= {<Contact />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function AdminLayout() {

  const [userDemo, setUser] = useState({
    useName: 'admin demo',
    image: '/logo.svg',
    role: 'admin'
  });

  const [isOpenAccountBox, setIsOpenAccountBox] = useState(false);
  return (
    <div className="flex flex-col min-w-screen">
      <div className="flex w-screen justify-between px-15 py-2  shadow fixed bg-white/90">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.svg"
            alt="Volunteer"
            className="h-10 w-10 rounded-xl object-cover shadow-sm"
          />
            <div className="block">
              <div className="text-lg font-semibold text-slate-900">Volunteer</div>
              <div className="text-xs text-slate-500">Kết nối BTC & Tình nguyện viên</div>
            </div>
        </Link>
        
        <div className="relative">
          <div className="flex justify-center items-center gap-5">
            <button className="p-2 border border-gray-300 rounded-full">
              <Bell size={20}/>
            </button>
            <div className="flex gap-2 items-center" onClick={()=>setIsOpenAccountBox(!isOpenAccountBox)}>
              <div className="border rounded-full p-0.5">
                <img src={`${userDemo.image}`} alt="avatar admin" className="w-10 h-10 rounded-full" srcset="" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-semibold">{userDemo.useName}</p>
                <p className="text-xs">{userDemo.role}</p>
              </div>
              <ChevronDownIcon size={24} className={`ml-2 transform transition-transform duration-300 ${isOpenAccountBox ? "rotate-180" : ""}`}/>
            </div>
          </div>
          <div
            role="menu"
            aria-hidden={!isOpenAccountBox}
            className={`absolute right-0 mt-4 w-60 bg-white rounded-xl shadow-lg border border-gray-200 py-2 transition-all origin-top-right ${
              isOpenAccountBox ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
            }`}>
              <Link to="#" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-blue-50">
                <User size={16} /> Trang cá nhân
              </Link>
              <hr className="my-2" />
              <button
                onClick={() => logout?.()}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  Đăng xuất
              </button>
            </div>
        </div>
      </div>
      <div className="flex gap-5 mt-17">
        <AdminNav />
        <div>
          <Routes>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/volunteers" element={<Volunteers />} />
            <Route path="/contests" element= {<ContestPage />} />
            <Route path="/contact" element= {<Contact />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

/* === Main Layout selector === */
export default function Layout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      setLoading(true);
      setError(null);

      try {
        let result;

        // Hỗ trợ 3 dạng accountServices:
        // 1) object sẵn: accountServices = { role: 'user', ... }
        // 2) function sync: accountServices() => { role: ... }
        // 3) function async: accountServices() => Promise<{ role: ... }>
        if (typeof accountServices.getAccount() === "object" && accountServices.getAccount() !== null) {
          result = accountServices.getAccount();
        } else if (typeof accountServices === "function") {
          result = await accountServices.getAccount();
        } else {
          result = null;
        }

        if (mounted) {
          setUser(result ?? { role: "guest" });
        }
      } catch (err) {
        if (mounted) {
          setError(err);
          setUser({ role: "guest" }); // fallback
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadUser();

    return () => {
      mounted = false;
    };
  }, []);

  // Loading / Error UI đơn giản (bạn thay bằng spinner component)
  if (loading) return <div>Đang tải dữ liệu người dùng...</div>;
  if (error) return <div>Có lỗi khi tải người dùng — kiểm tra console</div>;

  const role = (user && user.role) || "guest";
  
  const url = useLocation();
  
  const active = url.pathname.split('/')[1];

  console.log(active)

  switch (active) {
    case "user":
      return <UserLayout />;
    case "btc":
      return <BtcLayout />;
    case "admin":
      return <AdminLayout />;
    default:
      return <GuestLayout />;
  }
}
