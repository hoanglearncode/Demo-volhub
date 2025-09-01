const HeatmapCell = ({ hour, day, intensity }) => {
  const getColor = (intensity) => {
    if (intensity === 0) return 'bg-gray-100';
    if (intensity <= 0.2) return 'bg-blue-100';
    if (intensity <= 0.4) return 'bg-blue-200';
    if (intensity <= 0.6) return 'bg-blue-300';
    if (intensity <= 0.8) return 'bg-blue-400';
    return 'bg-blue-500';
  };

  return (
    <div 
      className={`w-6 h-6 rounded ${getColor(intensity)} border border-gray-200 hover:ring-2 hover:ring-blue-300 transition-all cursor-pointer`}
      title={`${day} ${hour}:00 - Hiệu quả: ${(intensity * 100).toFixed(0)}%`}
    />
  );
};

export default HeatmapCell;