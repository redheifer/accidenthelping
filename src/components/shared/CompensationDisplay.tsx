interface CompensationDisplayProps {
  min: number;
  max: number;
}

const CompensationDisplay = ({ min, max }: CompensationDisplayProps) => {
  return (
    <div className="bg-[#F2FCE2] rounded-lg p-6 mb-8 max-w-xs mx-auto">
      <div className="text-center">
        <div className="text-sm text-gray-600 mb-2">Compensation amounts:</div>
        <div className="text-2xl font-bold text-white bg-green-500 rounded-md py-2">
          ${min.toLocaleString()} - ${max.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default CompensationDisplay;