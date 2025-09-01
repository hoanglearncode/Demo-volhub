import { Activity } from "lucide-react";
import HeatmapCell from "./HeatmapCell";
const PostingHeatmap = () => {
  const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const hours = Array.from({length: 24}, (_, i) => i);
  
  // Sample data - trong thực tế sẽ lấy từ API
  const heatmapData = days.map(day => 
    hours.map(hour => ({
      day,
      hour,
      intensity: Math.random() // 0-1, hiệu quả đăng bài
    }))
  ).flat();

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Activity className="mr-2 text-purple-600" size={24} />
        Heatmap hiệu quả đăng bài
      </h3>
      <div className="overflow-x-auto w-full">
        <div className="flex w-full" >
          <div className="flex flex-col mr-2">
            <div className="h-6 mb-1"></div>
            {days.map(day => (
              <div key={day} className="h-6 flex items-center justify-center text-xs font-medium text-gray-600 mb-1 w-8">
                {day}
              </div>
            ))}
          </div>
          <div className="flex-1">
            <div className="flex mb-1">
              {hours.map(hour => (
                <div key={hour} className="w-6 h-6 flex items-center justify-center text-xs text-gray-600 mr-1">
                  {hour % 6 === 0 ? hour : ''}
                </div>
              ))}
            </div>
            {days.map(day => (
              <div key={day} className="flex mb-1">
                {hours.map(hour => {
                  const data = heatmapData.find(d => d.day === day && d.hour === hour);
                  return (
                    <HeatmapCell 
                      key={`${day}-${hour}`} 
                      hour={hour} 
                      day={day} 
                      intensity={data?.intensity || 0} 
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
          <span>Ít hiệu quả</span>
          <div className="flex space-x-1">
            {[0, 0.2, 0.4, 0.6, 0.8, 1].map(intensity => (
              <div key={intensity} className={`w-3 h-3 rounded ${intensity === 0 ? 'bg-gray-100' : `bg-blue-${Math.ceil(intensity * 5)}00`} border`}></div>
            ))}
          </div>
          <span>Rất hiệu quả</span>
        </div>
      </div>
    </div>
  );
};

export default PostingHeatmap;