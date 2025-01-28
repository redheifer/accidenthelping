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
    "Within 1 Week",
    "Within 1-3 months",
    "Within 4-6 months",
    "Within 1 Year",
    "Within 2 Years",
    "Longer than 2 Years"
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