import { Frown, Smile } from "lucide-react";
import AccidentTypeCard from "./AccidentTypeCard";
import { Progress } from "./ui/progress";

interface FaultQuestionProps {
  onSelect: (atFault: boolean) => void;
  compensationRange: { min: number; max: number };
}

const FaultQuestion = ({ onSelect, compensationRange }: FaultQuestionProps) => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="max-w-xl mx-auto w-full space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>33%</span>
          </div>
          <Progress 
            value={33} 
            className="h-3 rounded-full bg-secondary" 
          />
        </div>

        <div className="bg-card/50 rounded-lg p-4 mb-6 max-w-xs mx-auto">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Compensation amounts:</div>
            <div className="text-2xl font-bold text-primary">
              ${compensationRange.min.toLocaleString()} - ${compensationRange.max.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Were you at fault?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            You can be honest here. Determining fault is the best way to calculate settlement amounts. We need to know your perspective of the incident.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <AccidentTypeCard
          icon={<Frown className="w-12 h-12" />}
          title="Yes"
          onClick={() => onSelect(true)}
        />
        <AccidentTypeCard
          icon={<Smile className="w-12 h-12" />}
          title="No"
          onClick={() => onSelect(false)}
        />
      </div>
    </div>
  );
};

export default FaultQuestion;