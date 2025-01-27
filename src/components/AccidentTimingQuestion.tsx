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
        <div className="max-w-xl mx-auto w-full space-y-2 mb-8">
          <div className="relative h-6">
            <Progress 
              value={44} 
              className="h-6 bg-gray-100" 
              indicatorClassName="bg-primary transition-all"
            />
            <span className="absolute inset-0 text-gray-900 text-sm flex items-center justify-center font-medium">
              44% Complete
            </span>
          </div>
        </div>

        <div className="bg-[#F2FCE2] rounded-lg p-6 mb-8 max-w-xs mx-auto">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Compensation amounts:</div>
            <div className="text-2xl font-bold text-white bg-green-500 rounded-md py-2">
              ${compensationRange.min.toLocaleString()} - ${compensationRange.max.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            When did this accident happen?
          </h2>
          <p className="text-lg text-gray-600">
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