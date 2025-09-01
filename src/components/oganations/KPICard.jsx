const KPICard = ({ title, value, subtitle, icon: Icon, bgColor, iconColor, textColor = "text-gray-800" }) => (
  <div className={`${bgColor} rounded-xl p-6 shadow-lg border border-gray-100`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className={`text-3xl font-bold ${textColor} mb-1`}>{value}</p>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      <div className={`${iconColor} p-3 rounded-lg`}>
        <Icon size={28} className="text-white" />
      </div>
    </div>
  </div>
);

export default KPICard;