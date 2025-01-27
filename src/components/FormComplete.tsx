import { Button } from "@/components/ui/button";

interface FormCompleteProps {
  onRestart: () => void;
  compensationRange: { min: number; max: number };
}

const FormComplete = ({ onRestart, compensationRange }: FormCompleteProps) => {
  return (
    <div className="space-y-12">
      {/* Header with gradient background */}
      <div className="space-y-4 bg-gradient-to-r from-blue-900 to-blue-700 p-8 rounded-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Congratulations, your accident may be eligible for compensation!
        </h2>
        <div className="space-y-2">
          <p className="text-white/80">Your estimated compensation is within:</p>
          <p className="text-4xl md:text-5xl font-bold text-white">
            $75,000 - $190,000
          </p>
        </div>
      </div>

      {/* Pending notification */}
      <div className="bg-card/50 p-8 rounded-lg space-y-4">
        <h3 className="text-2xl font-bold text-white">Your Compensation is Pending:</h3>
        <p className="text-lg text-white">
          We will be calling you shortly. Please leave your phone on loud and answer immediately.
        </p>
      </div>

      {/* Restart button */}
      <Button
        onClick={onRestart}
        className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white"
        size="lg"
      >
        Start survey again
      </Button>
    </div>
  );
};

export default FormComplete;