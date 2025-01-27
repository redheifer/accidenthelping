import { Button } from "@/components/ui/button";

interface FormCompleteProps {
  onRestart: () => void;
  compensationRange: { min: number; max: number };
}

const FormComplete = ({ onRestart, compensationRange }: FormCompleteProps) => {
  return (
    <div className="space-y-8 md:space-y-12 px-4 md:px-0">
      {/* Header with gradient background */}
      <div className="space-y-4 bg-gradient-to-r from-blue-900 to-blue-700 p-4 md:p-8 rounded-lg">
        <h2 className="text-2xl md:text-4xl font-bold text-white text-center">
          Congratulations, your accident may be eligible for compensation!
        </h2>
        <div className="space-y-2">
          <p className="text-white/80 text-center text-sm md:text-base">Your estimated compensation is within:</p>
          <p className="text-3xl md:text-5xl font-bold text-white text-center">
            $75,000 - $190,000
          </p>
        </div>
      </div>

      {/* Pending notification */}
      <div className="bg-card/50 p-4 md:p-8 rounded-lg space-y-3 md:space-y-4">
        <h3 className="text-xl md:text-2xl font-bold text-white text-center">
          Your Compensation is Pending:
        </h3>
        <p className="text-base md:text-lg text-white text-center">
          We will be calling you shortly. Please leave your phone on loud and answer immediately.
        </p>
      </div>

      {/* Restart button */}
      <Button
        onClick={onRestart}
        className="w-full py-4 md:py-6 text-base md:text-lg bg-blue-600 hover:bg-blue-700 text-white"
        size="lg"
      >
        Start New Evaluation
      </Button>
    </div>
  );
};

export default FormComplete;