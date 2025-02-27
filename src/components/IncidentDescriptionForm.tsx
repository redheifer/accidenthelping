
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import ProgressIndicator from "./shared/ProgressIndicator";
import CompensationDisplay from "./shared/CompensationDisplay";
import QuestionHeader from "./shared/QuestionHeader";
import { ChevronLeft } from "lucide-react";

interface IncidentDescriptionFormProps {
  onSubmit: (description: string) => void;
  compensationRange: { min: number; max: number };
  onPrevious?: () => void;
}

const IncidentDescriptionForm = ({ onSubmit, compensationRange, onPrevious }: IncidentDescriptionFormProps) => {
  const [description, setDescription] = useState("");
  const [currentRange, setCurrentRange] = useState(compensationRange);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    
    if (newDescription.length >= 100) {
      setCurrentRange({
        min: 65000,
        max: 105000
      });
    } else {
      setCurrentRange(compensationRange);
    }
  };

  const handleNext = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSubmit(description);
    }, 300);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="flex flex-col gap-3 max-w-4xl mx-auto mb-8">
          <div className="mx-auto w-full max-w-md">
            <CompensationDisplay 
              min={currentRange.min} 
              max={currentRange.max}
              isLoading={isLoading} 
            />
          </div>
          <ProgressIndicator value={55} />
        </div>
        
        <QuestionHeader 
          title="Describe your incident"
          description="A brief description of your accident will help us evaluate your case more accurately. Our AI system will analyze your description to provide a more precise compensation estimate."
        />
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <Textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Describe your incident..."
          className="min-h-[200px] bg-white/10 text-white placeholder:text-white/60"
          maxLength={2000}
        />
        <div className="flex justify-between text-sm text-white">
          <div>
            {description.length < 20 && "Please enter at least 20 characters"}
          </div>
          <div>
            {description.length}/2000
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between">
          {onPrevious && (
            <Button 
              variant="outline" 
              onClick={onPrevious}
              className="flex items-center justify-center gap-2 text-white bg-transparent border-white/30 hover:bg-white/10"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
          )}
          <Button
            onClick={handleNext}
            className="py-3 md:py-6 text-base md:text-lg bg-blue-600 hover:bg-blue-700 text-white flex-1"
            disabled={description.length < 20}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IncidentDescriptionForm;
