import { Bell, ChevronDownIcon, Menu, User } from "lucide-react";
import {Link, Route, Routes} from 'react-router-dom'
import { useState } from "react";
import Dashboard from "../../page/admin/Dashboard.jsx";
import AdminNav from "../../hook/system/AdminNav.jsx";

function AdminLayout() {

  const [userDemo, setUser] = useState({
    useName: 'admin demo',
    image: '/logo.svg',
    role: 'admin'
  });

  const [isOpenAccountBox, setIsOpenAccountBox] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false)
  return (
    <div className="flex flex-col min-w-screen">
      <div className="flex gap-5">
        <AdminNav />
        <div>
          <Routes>
            {/* <Route path="/admin" element={<Dashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/volunteers" element={<Volunteers />} />
            <Route path="/contests" element= {<ContestPage />} />
            <Route path="/contact" element= {<Contact />} />
            <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;