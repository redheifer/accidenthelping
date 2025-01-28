import { Progress } from "../ui/progress";

interface ProgressIndicatorProps {
  value: number;
  className?: string;
}

const ProgressIndicator = ({ value }: ProgressIndicatorProps) => {
  return (
    <div className="flex-1 relative h-6">
      <Progress 
        value={value} 
        className="h-6 bg-gray-800" 
        indicatorClassName="bg-green-500 transition-all"
      />
      <span className="absolute inset-0 text-white text-sm flex items-center justify-center font-medium">
        {value}% Complete
      </span>
    </div>
  );
};

export default ProgressIndicator;