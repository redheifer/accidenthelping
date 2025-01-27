import { Stethoscope, XCircle } from "lucide-react";
import AccidentTypeCard from "./AccidentTypeCard";
import { Progress } from "./ui/progress";

interface MedicalVisitQuestionProps {
  onSelect: (hadMedicalVisit: boolean) => void;
}

const MedicalVisitQuestion = ({ onSelect }: MedicalVisitQuestionProps) => {
  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="max-w-xl mx-auto w-full space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Progress</span>
          <span>11%</span>
        </div>
        <Progress 
          value={11} 
          className="h-3 rounded-full bg-secondary" 
        />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Did you have to go to the doctor?
          </h2>
          <p className="text-lg text-gray-600">
            Medical visits can significantly impact your settlement value. Let us know if you sought treatment from your accident.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <AccidentTypeCard
            icon={<Stethoscope className="w-12 h-12" />}
            title="Yes"
            onClick={() => onSelect(true)}
          />
          <AccidentTypeCard
            icon={<XCircle className="w-12 h-12" />}
            title="No"
            onClick={() => onSelect(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default MedicalVisitQuestion;