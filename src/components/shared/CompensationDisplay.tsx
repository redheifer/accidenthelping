import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

interface CompensationDisplayProps {
  min: number;
  max: number;
  isLoading?: boolean;
}

const CompensationDisplay = ({ min, max, isLoading = false }: CompensationDisplayProps) => {
  const [progress, setProgress] = useState(0);
  const [showAmount, setShowAmount] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowAmount(false);
      setProgress(0);
      
      const startTime = Date.now();
      const duration = 900;

      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        
        setProgress(newProgress);
        
        if (newProgress < 100) {
          requestAnimationFrame(updateProgress);
        } else {
          setShowAmount(true);
        }
      };

      requestAnimationFrame(updateProgress);
    } else {
      setProgress(100);
      setShowAmount(true);
    }
  }, [isLoading, min, max]);

  return (
    <div className="bg-[#1a1c2e] rounded-lg p-4 min-w-[280px]">
      <div className="text-center">
        <div className="text-sm text-white/80 mb-2">
          {isLoading ? "Calculating compensation..." : "Compensation amounts:"}
        </div>
        {!showAmount ? (
          <div className="h-8 flex items-center justify-center">
            <Progress 
              value={progress} 
              className="w-3/4 mx-auto h-2 bg-gray-700" 
              indicatorClassName="bg-green-500 transition-all duration-100"
            />
          </div>
        ) : (
          <div className="text-xl font-bold text-white bg-green-600 rounded-md py-1.5 animate-fade-in">
            ${min.toLocaleString()} - ${max.toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompensationDisplay;