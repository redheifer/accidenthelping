import { Button } from "@/components/ui/button";

interface FaultFormCompleteProps {
  onRestart: () => void;
}

const FaultFormComplete = ({ onRestart }: FaultFormCompleteProps) => {
  return (
    <div className="space-y-8">
      <div className="space-y-4 bg-card/50 p-8 rounded-lg text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          We Cannot Proceed with Your Case
        </h2>
      </div>

      <Button
        onClick={onRestart}
        className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white"
        size="lg"
      >
        Start New Evaluation
      </Button>
    </div>
  );
};

export default FaultFormComplete;