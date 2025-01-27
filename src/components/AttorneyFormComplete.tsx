import { Button } from "@/components/ui/button";

interface AttorneyFormCompleteProps {
  onRestart: () => void;
}

const AttorneyFormComplete = ({ onRestart }: AttorneyFormCompleteProps) => {
  return (
    <div className="space-y-8">
      <div className="space-y-4 bg-card/50 p-8 rounded-lg text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          We Cannot Proceed with Your Case
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Since you are already represented by an attorney, we cannot assist with your case at this time. 
          Please consult with your current legal representation for guidance.
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

export default AttorneyFormComplete;