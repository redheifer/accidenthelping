
import { Frown, Smile } from "lucide-react";
import { useState, useEffect } from "react";
import AccidentTypeCard from "./AccidentTypeCard";
import ProgressIndicator from "./shared/ProgressIndicator";
import CompensationDisplay from "./shared/CompensationDisplay";
import QuestionHeader from "./shared/QuestionHeader";

interface FaultQuestionProps {
  onSelect: (atFault: boolean) => void;
  compensationRange: { min: number; max: number };
}

const FaultQuestion = ({ onSelect, compensationRange }: FaultQuestionProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<boolean | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = async (atFault: boolean) => {
    setSelectedOption(atFault);
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
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
        <div className="flex flex-col gap-3 max-w-4xl mx-auto mb-8">
          <div className="mx-auto w-full max-w-md">
            <CompensationDisplay 
              min={getCompensationRange().min}
              max={getCompensationRange().max}
              isLoading={isLoading}
            />
          </div>
          <ProgressIndicator value={33} />
        </div>

        <QuestionHeader 
          title="Were you at fault?"
          description="You can be honest here. Determining fault is the best way to calculate settlement amounts. We need to know your perspective of the incident."
        />
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-6 max-w-3xl mx-auto">
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
