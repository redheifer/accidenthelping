import { Progress } from "./ui/progress";

interface CompensationBoxProps {
  min: number;
  max: number;
  progress: number;
}

const CompensationBox = ({ min, max, progress }: CompensationBoxProps) => {
  return (
    <div className="bg-white/50 rounded-lg p-4 mb-6 max-w-xs mx-auto shadow-lg border border-gray-100">
      <div className="text-center">
        <div className="text-sm text-gray-600 mb-1">Compensation estimate:</div>
        <div className="text-2xl font-bold text-primary">
          ${min.toLocaleString()} - ${max.toLocaleString()}
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="text-right text-sm text-gray-500">{progress}% Complete</div>
      </div>
    </div>
  );
};

export default CompensationBox;