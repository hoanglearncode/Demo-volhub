// src/layouts/Layout.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import  accountServices  from "../../services/user/account.services.js";

import ProtectRouter from "../../context/ProtectRouter.jsx";




/* === Main Layout selector === */
export default function Layout() {  
  const url = useLocation();
  
  const active = url.pathname.split('/')[1];

  return <ProtectRouter tab={active}/>
}
