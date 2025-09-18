// src/layouts/Layout.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import  accountServices  from "../../services/user/account.services.js";

import AdminLayout from "../../components/layout/AdminLayout.jsx"
import BtcLayout from "../../components/layout/BtcLayout.jsx"
import UserLayout from "../../components/layout/UserLayout.jsx"




/* === Main Layout selector === */
export default function Layout() {  
  const url = useLocation();
  
  const active = url.pathname.split('/')[1];

  const role = '';

  switch (active) {
    case 'admin':
      return <AdminLayout />
    case 'btc':
      return <BtcLayout />
    default :
      return <UserLayout />
  }
}
