import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

interface CompensationDisplayProps {
  min: number;
  max: number;
  isLoading?: boolean;
}

const CompensationDisplay = ({ min, max, isLoading = false }: CompensationDisplayProps) => {
  const [showAmount, setShowAmount] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowAmount(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 mb-8 max-w-xs mx-auto">
      <div className="text-center">
        <div className="text-sm text-gray-300 mb-2">Compensation amounts:</div>
        {isLoading || !showAmount ? (
          <div className="h-10 flex items-center justify-center">
            <Progress className="w-3/4 mx-auto" value={100} />
          </div>
        ) : (
          <div className="text-2xl font-bold text-white bg-green-600 rounded-md py-2">
            ${min.toLocaleString()} - ${max.toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompensationDisplay;