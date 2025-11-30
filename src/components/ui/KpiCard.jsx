 const KpiCard = ({ value, sublabel }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-center">
      <div className="text-3xl font-bold text-gray-800">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{sublabel}</div>
    </div>
  );
};

export default KpiCard;
