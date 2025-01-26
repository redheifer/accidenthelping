import { Frown, Smile } from "lucide-react";
import AccidentTypeCard from "./AccidentTypeCard";

interface FaultQuestionProps {
  onSelect: (atFault: boolean) => void;
  compensationRange: { min: number; max: number };
}

const FaultQuestion = ({ onSelect, compensationRange }: FaultQuestionProps) => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="bg-card/50 rounded-lg p-4 mb-6 max-w-xs mx-auto">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Compensation amounts:</div>
            <div className="text-2xl font-bold text-primary">
              ${compensationRange.min.toLocaleString()} - ${compensationRange.max.toLocaleString()}
            </div>
          </div>
          <div className="mt-2 relative h-2 bg-secondary rounded-full overflow-hidden">
            <div className="absolute left-0 top-0 h-full bg-primary" style={{ width: "33%" }} />
          </div>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Were you at fault?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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