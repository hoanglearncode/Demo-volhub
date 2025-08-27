// src/layouts/Layout.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import  accountServices  from "../../services/user/account.services.js";


import NotFoundPage from "../../page/common/NotFoundPage.jsx";
import LoginPage from "../../page/common/LoginPage.jsx";

import UserLayout from "../../components/layout/UserLayout.jsx";
import AdminLayout from "../../components/layout/AdminLayout.jsx";
import BtcLayout from "../../components/layout/BtcLayout.jsx";
import GuestLayout from "../../components/layout/GuestLayout.jsx";




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


  switch (active) {
    case "btc":
      return <BtcLayout />;
    case "admin":
      return <AdminLayout />;
    default:
      if (role === 'user') {
        return <UserLayout />; 
      }else {
        return <GuestLayout />;
      }
  }
}
