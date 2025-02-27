
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ProgressIndicator from "./shared/ProgressIndicator";
import CompensationDisplay from "./shared/CompensationDisplay";
import QuestionHeader from "./shared/QuestionHeader";
import { ChevronLeft } from "lucide-react";

interface NameCollectionFormProps {
  onSubmit: (firstName: string, lastName: string) => void;
  compensationRange: { min: number; max: number };
  onPrevious?: () => void;
}

const NameCollectionForm = ({ onSubmit, compensationRange, onPrevious }: NameCollectionFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="flex flex-col gap-3 max-w-4xl mx-auto mb-8">
          <div className="mx-auto w-full max-w-md">
            <CompensationDisplay min={75000} max={180000} isLoading={isLoading} />
          </div>
          <ProgressIndicator value={66} />
        </div>
        
        <QuestionHeader 
          title="What is your full name?"
        />
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <Input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Your first name"
          className="bg-white text-gray-900 placeholder:text-gray-500"
        />
        <Input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Your last name"
          className="bg-white text-gray-900 placeholder:text-gray-500"
        />

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
            onClick={() => onSubmit(firstName, lastName)}
            className="py-3 md:py-6 text-base md:text-lg bg-blue-600 hover:bg-blue-700 text-white flex-1"
            disabled={!firstName.trim() || !lastName.trim()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NameCollectionForm;
