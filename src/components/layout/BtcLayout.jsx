import { Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";

import TopNav from "../../hook/system/TopNav.jsx";
import Home from "../../page/user/Home.jsx";
import AboutPage from "../../page/user/About.jsx";
import EventsPage from "../../page/user/EventsPage.jsx";
import Footer from "../../components/common/Footer.jsx";
import Volunteers from "../../page/user/Volunteers.jsx";
import Contact from "../../page/user/Contact.jsx";
import ContestPage from "../../page/user/Contests.jsx";

import NotFoundPage from "../../page/common/NotFoundPage.jsx";
import LoginPage from "../../page/common/LoginPage.jsx";
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
export default BtcLayout