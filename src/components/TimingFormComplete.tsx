import { Button } from "@/components/ui/button";

interface TimingFormCompleteProps {
  onRestart: () => void;
}

const TimingFormComplete = ({ onRestart }: TimingFormCompleteProps) => {
  return (
    <div className="space-y-8">
      <div className="space-y-4 bg-card/50 p-8 rounded-lg text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          We Cannot Proceed with Your Case
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Since your accident occurred more than 2 years ago, we are unable to assist with your case at this time. 
          The statute of limitations may have expired.
        </p>
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

export default TimingFormComplete;