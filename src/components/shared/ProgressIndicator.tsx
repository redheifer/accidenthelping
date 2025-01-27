import { Progress } from "../ui/progress";

interface ProgressIndicatorProps {
  value: number;
}

const ProgressIndicator = ({ value }: ProgressIndicatorProps) => {
  return (
    <div className="max-w-xl mx-auto w-full space-y-2 mb-8">
      <div className="relative h-6">
        <Progress 
          value={value} 
          className="h-6 bg-gray-100" 
          indicatorClassName="bg-primary transition-all"
        />
        <span className="absolute inset-0 text-gray-900 text-sm flex items-center justify-center font-medium">
          {value}% Complete
        </span>
      </div>
    </div>
  );
};

export default ProgressIndicator;