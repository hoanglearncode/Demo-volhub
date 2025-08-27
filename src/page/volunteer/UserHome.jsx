import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Heart, MapPin, Users } from "lucide-react";
import SearchBanner from "../../components/common/SearchBanner";
import hooks from "../../hook/user/Home.jsx";
import { useEffect, useState } from "react";
import ActivityCart from "../../components/common/ActivityCart.jsx";
import { Link } from "react-router-dom";
import trustedPartners from "../../services/user/pannerData.js";
import VolunteerFeedbackSection from "../../components/user/VolunteerFeedbackSection.js";




const panner = trustedPartners;

function UserHome() {
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
      
      
    </>
  );
}

export default UserHome;