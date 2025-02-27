
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ProgressIndicator from "./shared/ProgressIndicator";
import CompensationDisplay from "./shared/CompensationDisplay";
import QuestionHeader from "./shared/QuestionHeader";
import { ChevronLeft } from "lucide-react";

interface EmailCollectionFormProps {
  onSubmit: (email: string) => void;
  compensationRange: { min: number; max: number };
  onPrevious?: () => void;
}

const EmailCollectionForm = ({ onSubmit, compensationRange, onPrevious }: EmailCollectionFormProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
          <ProgressIndicator value={77} />
        </div>
        
        <QuestionHeader 
          title="What is the best email to send your compensation estimate to?"
          description="Our system will review your case, and email you the results directly to your inbox same-day."
        />
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          type="email"
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
            onClick={() => onSubmit(email)}
            className="py-3 md:py-6 text-base md:text-lg bg-blue-600 hover:bg-blue-700 text-white flex-1"
            disabled={!isValidEmail(email)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailCollectionForm;
