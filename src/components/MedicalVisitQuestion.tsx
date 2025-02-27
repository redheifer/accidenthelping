
import { Stethoscope, XCircle, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import AccidentTypeCard from "./AccidentTypeCard";
import { Progress } from "./ui/progress";
import CompensationDisplay from "./shared/CompensationDisplay";
import { Button } from "./ui/button";

interface MedicalVisitQuestionProps {
  onSelect: (hadMedicalVisit: boolean) => void;
  onPrevious?: () => void;
}

const MedicalVisitQuestion = ({ onSelect, onPrevious }: MedicalVisitQuestionProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<boolean | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = async (hadMedicalVisit: boolean) => {
    setSelectedOption(hadMedicalVisit);
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsLoading(false);
    onSelect(hadMedicalVisit);
  };

  const getCompensationRange = () => {
    if (selectedOption === null) {
      return { min: 25000, max: 50000 };
    }
    return selectedOption ? { min: 45000, max: 85000 } : { min: 35000, max: 65000 };
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <div className="flex flex-col gap-3 max-w-4xl mx-auto mb-8">
          <div className="mx-auto w-full max-w-md">
            <CompensationDisplay 
              min={getCompensationRange().min}
              max={getCompensationRange().max}
              isLoading={isLoading}
            />
          </div>
          <div className="relative h-6 w-full">
            <Progress 
              value={11} 
              className="h-6 bg-gray-800" 
              indicatorClassName="bg-green-500 transition-all"
            />
            <span className="absolute inset-0 text-white text-sm flex items-center justify-center font-medium">
              11% Complete
            </span>
          </div>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Did you have to go to the doctor?
          </h2>
          <p className="text-lg text-white/80">
            Medical visits can significantly impact your settlement value. Let us know if you sought treatment from your accident.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-6 max-w-3xl mx-auto">
        <AccidentTypeCard
          icon={<Stethoscope className="w-12 h-12" />}
          title="Yes"
          onClick={() => handleSelect(true)}
        />
        <AccidentTypeCard
          icon={<XCircle className="w-12 h-12" />}
          title="No"
          onClick={() => handleSelect(false)}
        />
      </div>

      {onPrevious && (
        <div className="mt-6 flex justify-center">
          <Button 
            variant="outline" 
            onClick={onPrevious}
            className="flex items-center gap-2 text-white bg-transparent border-white/30 hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
        </div>
      )}
    </div>
  );
};

export default MedicalVisitQuestion;
