import { Calendar, MapPin, Play, Star, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import eventServices from "../../services/user/event.services";

export default function ActivityCart({ prod }) {
  const {user, token} = useAuth();
  const navigation = useNavigate();
  const handleAction = () => {
    if(!user && !token){
      alert("Bạn phải đăng nhập để có thể đăng ký sự kiện này!");
      return;
    } else {
      const value = eventServices.applyEvent(user.id, prod.id);
      value ? alert("Apply thành công!") : alert("apply thất bại");
    }
  }

  return (
    <div className="group flex flex-col border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-white hover:border-blue-300">
      
      {/* IMAGE */}
      <div className="relative w-full h-52 sm:h-64 overflow-hidden">
        <img
          src={prod.image}
          alt={prod.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Category */}
        <span className="absolute top-3 left-3 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full shadow-sm">
          {prod.category}
        </span>

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-white/90 text-xs px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
          <Star className="w-3 h-3 text-yellow-500 fill-current" />
          <span className="font-semibold text-gray-700">{prod.rating}</span>
        </div>

        {/* Overlay Button */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            to={`/events/${prod.slug}`}
            className="flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-gray-800 font-semibold hover:bg-white transition-colors duration-200"
          >
            <Play className="w-4 h-4" />
            Xem chi tiết
          </Link>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-2 line-clamp-2">
          {prod.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {prod.subTitle}
        </p>

        {/* Info */}
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            {prod.location}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-600" />
            {prod.date}
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-600" />
            {prod.participants} người tham gia
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleAction}
          className="mt-auto text-center w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 px-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg"
        >
          Đăng ký ngay
        </button>
      </div>
    </div>
  );
}
