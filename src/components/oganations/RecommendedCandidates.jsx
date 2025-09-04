// components/Dashboard/RecommendedCandidates.jsx
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Users, Clock } from "lucide-react";
import {Link, useNavigate} from 'react-router-dom'

const RecommendedCandidates = ({ candidates = [] }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(candidates.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentCandidates = () => {
    const start = currentIndex * itemsPerPage;
    return candidates.slice(start, start + itemsPerPage);
  };

  if (candidates.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Ứng viên đề xuất</h2>
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <Users size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">Chưa có ứng viên đề xuất nào</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Ứng viên đề xuất</h2>
        <div className="flex items-center space-x-2">
          <button 
            onClick={prevSlide}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow disabled:opacity-50"
            disabled={totalPages <= 1}
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <button 
            onClick={nextSlide}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow disabled:opacity-50"
            disabled={totalPages <= 1}
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getCurrentCandidates().map((candidate) => (
          <div 
            key={candidate.id} 
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <img 
                src={candidate.avatar} 
                alt={candidate.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
              />
              <div className="ml-3 flex-1">
                <h3 className="font-semibold text-gray-800">{candidate.name}</h3>
                <p className="text-sm text-gray-600">{candidate.position}</p>
              </div>
              <div className="flex items-center bg-green-50 px-2 py-1 rounded-full">
                <Star size={14} className="text-green-600 mr-1" />
                <span className="text-sm font-semibold text-green-700">{candidate.matchScore}%</span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Clock size={14} className="mr-1" />
                <span>Kinh nghiệm: {candidate.experience}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {candidate.skills.slice(0, 3).map((skill, index) => (
                  <span 
                    key={index}
                    className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {candidate.skills.length > 3 && (
                  <span className="inline-block text-xs text-gray-500 px-2 py-1">
                    +{candidate.skills.length - 3} khác
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              <button onClick={()=> {navigate(`/btc/cv-manage/view-profile/${candidate?.id}`)}} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-colors">
                Xem hồ sơ
              </button>
              <button onClick={()=> {navigate(`/btc/cv-manage/contact/${candidate?.id}`)}} className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors">
                Liên hệ
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-1">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedCandidates;