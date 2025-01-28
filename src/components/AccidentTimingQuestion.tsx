import { Button } from "./ui/button";
import ProgressIndicator from "./shared/ProgressIndicator";
import CompensationDisplay from "./shared/CompensationDisplay";
import QuestionHeader from "./shared/QuestionHeader";

interface AccidentTimingQuestionProps {
  onSelect: (timing: string) => void;
  compensationRange: { min: number; max: number };
}

const AccidentTimingQuestion = ({ onSelect, compensationRange }: AccidentTimingQuestionProps) => {
  const timingOptions = [
    "Within the last 10 days",
    "Within the last 30 days",
    "1-6 months",
    "6-12 months",
    "Within the last 1 year",
    "1-2 years",
    "Within the last 2 years",
    "More than 2 years ago"
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 max-w-4xl mx-auto mb-8">
          <CompensationDisplay min={75000} max={125000} />
          <ProgressIndicator value={44} />
        </div>
        <QuestionHeader 
          title="When did this accident happen?"
          description="The more recent your accident, the more likely you can achieve a higher settlement. If you've been in an accident, don't delay in getting help."
        />
      </div>

      <div className="space-y-3 max-w-2xl mx-auto">
        {timingOptions.map((timing) => (
          <Button
            key={timing}
            onClick={() => onSelect(timing)}
            className="w-full py-6 text-lg bg-[#1a1c2e] hover:bg-primary hover:text-black text-white transition-colors"
          >
            {timing}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AccidentTimingQuestion;