import { Scale, ThumbsUp } from "lucide-react";
import AccidentTypeCard from "./AccidentTypeCard";
import ProgressIndicator from "./shared/ProgressIndicator";
import CompensationDisplay from "./shared/CompensationDisplay";

interface AttorneyQuestionProps {
  onSelect: (hasAttorney: boolean) => void;
  compensationRange: { min: number; max: number };
}

const AttorneyQuestion = ({ onSelect, compensationRange }: AttorneyQuestionProps) => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 max-w-4xl mx-auto mb-8">
          <CompensationDisplay min={compensationRange.min} max={compensationRange.max} />
          <ProgressIndicator value={22} />
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Are you currently represented by an attorney?
          </h2>
          <p className="text-lg text-white/80">
            Having legal representation can change your options. Tell us if you already have a lawyer on your side.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <AccidentTypeCard
          icon={<Scale className="w-12 h-12" />}
          title="Yes"
          onClick={() => onSelect(true)}
        />
        <AccidentTypeCard
          icon={<ThumbsUp className="w-12 h-12" />}
          title="No"
          onClick={() => onSelect(false)}
          className="shadow-[0_0_30px_rgba(134,239,172,0.1)]"
        />
      </div>
    </div>
  );
};

export default AttorneyQuestion;