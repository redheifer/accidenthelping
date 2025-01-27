import { Stethoscope, XCircle } from "lucide-react";
import AccidentTypeCard from "./AccidentTypeCard";
import { Progress } from "./ui/progress";

interface MedicalVisitQuestionProps {
  onSelect: (hadMedicalVisit: boolean) => void;
}

const MedicalVisitQuestion = ({ onSelect }: MedicalVisitQuestionProps) => {
  const handleSelect = (hadMedicalVisit: boolean) => {
    // Set initial compensation range based on medical visit
    const baseRange = hadMedicalVisit ? 
      { min: 27503, max: 61478 } : 
      { min: 15000, max: 35000 };
    
    onSelect(hadMedicalVisit);
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

        <div className="bg-[#1a1c2e] rounded-lg p-6 mb-8 max-w-xs mx-auto">
          <div className="text-center">
            <div className="text-sm text-white/80 mb-2">Initial compensation range:</div>
            <div className="text-2xl font-bold text-white bg-green-600 rounded-md py-2">
              $15,000 - $35,000
            </div>
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