import { Progress } from "../ui/progress";

interface ProgressIndicatorProps {
  value: number;
  className?: string;
}

const ProgressIndicator = ({ value, className }: ProgressIndicatorProps) => {
  return (
    <div className="max-w-xl mx-auto w-full space-y-2 mb-8">
      <div className="relative h-6">
        <Progress 
          value={value} 
          className="h-6 bg-gray-800" 
          indicatorClassName={`transition-all ${className || 'bg-green-500'}`}
        />
        <span className="absolute inset-0 text-white text-sm flex items-center justify-center font-medium">
          {value}% Complete
        </span>
      </div>
    </div>
  );
};

export default ProgressIndicator;