import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

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
        <div className="max-w-xl mx-auto w-full space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>44%</span>
          </div>
          <Progress 
            value={44} 
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
            When did this accident happen?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The more recent your accident, the more likely you can achieve a higher settlement. If you've been in an accident, don't delay in getting help.
          </p>
        </div>
      </div>

      <div className="space-y-3 max-w-2xl mx-auto">
        {timingOptions.map((timing) => (
          <Button
            key={timing}
            onClick={() => onSelect(timing)}
            variant="secondary"
            className="w-full py-6 text-lg hover:bg-primary hover:text-white transition-colors glow"
          >
            {timing}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AccidentTimingQuestion;