import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Heart, MapPin, Users, Star, Award, Globe } from 'lucide-react';

export default function ActivityCard ({ activity }) {
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={activity.image} 
          alt={activity.title}
          className="w-full h-48 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
            {activity.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors">
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
          </button>
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {activity.title}
        </h3>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="text-sm truncate">{activity.location}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-3">
          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="text-sm">{new Date(activity.date).toLocaleDateString('vi-VN')}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">{activity.volunteers} người</span>
          </div>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors duration-200">
            Tham gia
          </button>
        </div>
      </div>
    </div>
  );
}