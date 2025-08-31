import { Search, Filter, Star, MapPin, Clock, Users, Plus, TrendingUp, Award, Eye } from 'lucide-react';
import Color from '../../hook/oganations/Color';
const CandidateCard = ({ candidate }) =>  {
    return (
    <div className="bg-white rounded-2xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img 
            src={candidate.avatar} 
            alt={candidate.name}
            className="w-16 h-16 rounded-full border-4 border-blue-100 group-hover:border-blue-200 transition-colors"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
              {candidate.name}
            </h3>
            <p className="text-gray-600 font-medium">{candidate.position}</p>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Clock className="w-4 h-4 mr-1" />
              {candidate.experience}
            </div>
          </div>
        </div>
        <div className={`px-1 py-0.5 rounded-full text-xs text-nowrap font-semibold ${Color.getMatchScoreColor(candidate.matchScore)}`}>
          {candidate.matchScore}% - {Color.getMatchScoreLabel(candidate.matchScore)}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">Kỹ năng:</p>
        <div className="flex flex-wrap gap-2">
          {candidate.skills.map((skill, index) => (
            <span 
              key={index}
              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium border border-blue-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex space-x-3">
        <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
          <Eye className="w-4 h-4" />
          <span>Xem chi tiết</span>
        </button>
        <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
          <Star className="w-4 h-4" />
          <span>Lưu ứng viên</span>
        </button>
      </div>
    </div>
  );
}
export default CandidateCard;