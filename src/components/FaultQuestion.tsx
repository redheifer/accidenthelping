import { Frown, Smile } from "lucide-react";
import { useState } from "react";
import AccidentTypeCard from "./AccidentTypeCard";
import { Progress } from "./ui/progress";
import CompensationDisplay from "./shared/CompensationDisplay";

interface FaultQuestionProps {
  onSelect: (atFault: boolean) => void;
  compensationRange: { min: number; max: number };
}

const FaultQuestion = ({ onSelect, compensationRange }: FaultQuestionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<boolean | null>(null);

  const handleSelect = async (atFault: boolean) => {
    setSelectedOption(atFault);
    setIsLoading(true);
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    onSelect(atFault);
  };

  const getCompensationRange = () => {
    if (selectedOption === false) {
      return { min: 55000, max: 95000 };
    }
    return compensationRange;
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="max-w-xl mx-auto w-full space-y-2 mb-8">
          <div className="relative h-6">
            <Progress 
              value={33} 
              className="h-6 bg-gray-800" 
              indicatorClassName="bg-green-500 transition-all"
            />
            <span className="absolute inset-0 text-white text-sm flex items-center justify-center font-medium">
              33% Complete
            </span>
          </div>
        </div>

        <CompensationDisplay 
          min={getCompensationRange().min}
          max={getCompensationRange().max}
          isLoading={isLoading}
        />

        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Were you at fault?
          </h2>
          <p className="text-lg text-white/80">
            You can be honest here. Determining fault is the best way to calculate settlement amounts. We need to know your perspective of the incident.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <AccidentTypeCard
          icon={<Frown className="w-12 h-12" />}
          title="Yes"
          onClick={() => handleSelect(true)}
        />
        <AccidentTypeCard
          icon={<Smile className="w-12 h-12" />}
          title="No"
          onClick={() => handleSelect(false)}
        />
      </div>
    </div>
  );
};

export default FaultQuestion;