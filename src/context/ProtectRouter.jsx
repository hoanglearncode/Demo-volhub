// src/routes/ProtectRouter.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

import GuestLayout from '../components/layout/GuestLayout.jsx';
import SystemLayout from '../components/layout/SystemLayout.jsx';

import LoginPage from "../page/common/LoginPage.jsx"; 
import RegisterPage from '../page/common/Register.jsx';

export default function ProtectRouter({ tab }) {
  // Lấy token từ localStorage (hoặc context / redux)
  const {token, user} = useAuth();

  // public router 
  if(!token) {
    switch (tab) {
      case 'login':
        return <SystemLayout children={<LoginPage />} />
      case 'register':
        return <SystemLayout children={<RegisterPage />} />
      default :
        return <GuestLayout />
    }
  }else {
    switch (user?.role){
      case 'admin':
        return <AdminLayout />
      case 'btc':
        return <BtcLayout />
      case 'use': 
        return <UserLayout />
    }
  }
  // private router 
  //  router admin 
  // `router ctv
  // `profile router
}
