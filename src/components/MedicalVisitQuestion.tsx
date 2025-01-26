import { Stethoscope, XCircle } from "lucide-react";
import AccidentTypeCard from "./AccidentTypeCard";

interface MedicalVisitQuestionProps {
  onSelect: (hadMedicalVisit: boolean) => void;
}

const MedicalVisitQuestion = ({ onSelect }: MedicalVisitQuestionProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          Did you have to go to the doctor?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
  );
};

export default MedicalVisitQuestion;