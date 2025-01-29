import { Button } from "@/components/ui/button";
import CompensationHeader from "./shared/CompensationHeader";
import PendingNotification from "./shared/PendingNotification";

interface FormCompleteProps {
  onRestart: () => void;
  compensationRange: { min: number; max: number };
}

const FormComplete = ({ onRestart, compensationRange }: FormCompleteProps) => {
  const compensationAmount = "$75,000 - $190,000";

  return (
    <div className="space-y-8 md:space-y-12 px-4 md:px-0">
      <CompensationHeader amount={compensationAmount} />
      <PendingNotification />
      <Button
        onClick={onRestart}
        className="w-full py-3 md:py-6 text-base md:text-lg bg-blue-600 hover:bg-blue-700 text-white"
        size="lg"
      >
        Start New Evaluation
      </Button>
    </div>
  );
};

export default FormComplete;