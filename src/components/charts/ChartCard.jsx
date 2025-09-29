const ChartCard = ({ title, icon, children, className = "" }) => {
  return (
    <div className={`bg-panel rounded-lg p-4 border border-gray-700 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default ChartCard;