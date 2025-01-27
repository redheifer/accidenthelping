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
        <ProgressIndicator value={44} />
        <CompensationDisplay min={compensationRange.min} max={compensationRange.max} />
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
            variant="secondary"
            className="w-full py-6 text-lg hover:bg-primary hover:text-white transition-colors"
          >
            {timing}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AccidentTimingQuestion;