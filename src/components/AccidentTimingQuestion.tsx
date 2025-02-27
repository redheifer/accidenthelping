
import { Button } from "./ui/button";
import ProgressIndicator from "./shared/ProgressIndicator";
import CompensationDisplay from "./shared/CompensationDisplay";
import QuestionHeader from "./shared/QuestionHeader";
import { mapTimingToWebhook } from "@/utils/timingMapper";
import { ChevronLeft } from "lucide-react";

interface AccidentTimingQuestionProps {
  onSelect: (timing: string) => void;
  compensationRange: { min: number; max: number };
  onPrevious?: () => void;
}

const AccidentTimingQuestion = ({ onSelect, compensationRange, onPrevious }: AccidentTimingQuestionProps) => {
  const timingOptions = [
    "Within 1 Week",
    "Within 1-3 months",
    "Within 4-6 months",
    "Within 1 Year",
    "Within 2 Years",
    "Longer than 2 Years"
  ];

  const handleTimingSelect = (timing: string) => {
    const mappedTiming = mapTimingToWebhook(timing);
    console.log('Selected timing:', timing);
    console.log('Mapped timing for API:', mappedTiming);
    onSelect(mappedTiming);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="flex flex-col gap-3 max-w-4xl mx-auto mb-8">
          <div className="mx-auto w-full max-w-md">
            <CompensationDisplay min={75000} max={125000} />
          </div>
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
            onClick={() => handleTimingSelect(timing)}
            className="w-full py-6 text-lg bg-[#1a1c2e] hover:bg-primary hover:text-black text-white transition-colors"
          >
            {timing}
          </Button>
        ))}
      </div>

      {onPrevious && (
        <div className="mt-6 flex justify-center">
          <Button 
            variant="outline"

            onClick={onPrevious}
            className="flex items-center gap-2 text-white bg-transparent border-white/30 hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccidentTimingQuestion;
