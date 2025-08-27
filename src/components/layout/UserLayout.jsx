import { Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";

import TopNav from "../../hook/system/TopNav.jsx";
import UserHome from '../../page/volunteer/UserHome.jsx'
import MyCV from "../../page/volunteer/MyCV.jsx";
import EventsPage from "../../page/volunteer/EventPage.jsx";
import MyReport from "../../page/volunteer/MyReport.jsx";
import NotFoundPage from "../../page/common/NotFoundPage.jsx";

import Footer from "../common/Footer.jsx";

function UserLayout() {
  return <div className="flex flex-col">
      <TopNav />
      <main className="pt-20 min-h-screen">
        <Routes>
          <Route path="/" element={<UserHome />} />
          <Route path="/my-cv" element={<MyCV />} />
          <Route path="/event" element={<EventsPage />} />
          <Route path="/result" element={<MyReport />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>;
}

export default UserLayout