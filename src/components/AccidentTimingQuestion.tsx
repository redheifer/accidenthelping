import { Button } from "./ui/button";

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
    "Within 2 Year",
    "Longer than 2 Years"
  ];

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
            <div className="absolute left-0 top-0 h-full bg-primary" style={{ width: "44%" }} />
          </div>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            When did this accident happen?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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