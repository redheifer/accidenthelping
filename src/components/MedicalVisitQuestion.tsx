import { Stethoscope, XCircle } from "lucide-react";
import { useState } from "react";
import AccidentTypeCard from "./AccidentTypeCard";
import { Progress } from "./ui/progress";
import CompensationDisplay from "./shared/CompensationDisplay";

interface MedicalVisitQuestionProps {
  onSelect: (hadMedicalVisit: boolean) => void;
}

const MedicalVisitQuestion = ({ onSelect }: MedicalVisitQuestionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<boolean | null>(null);

  const handleSelect = async (hadMedicalVisit: boolean) => {
    setSelectedOption(hadMedicalVisit);
    setIsLoading(true);
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    onSelect(hadMedicalVisit);
  };

  const getCompensationRange = () => {
    if (selectedOption === null) {
      return { min: 0, max: 5000 };
    }
    return { min: 27503, max: 61478 };
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <div className="max-w-xl mx-auto w-full space-y-2 mb-8">
          <div className="relative h-6">
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

        <CompensationDisplay 
          min={getCompensationRange().min}
          max={getCompensationRange().max}
          isLoading={isLoading}
        />

        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Did you have to go to the doctor?
          </h2>
          <p className="text-lg text-white/80">
            Medical visits can significantly impact your settlement value. Let us know if you sought treatment from your accident.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
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
    </div>
  );
};

export default MedicalVisitQuestion;