import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import ProgressIndicator from "./shared/ProgressIndicator";
import CompensationDisplay from "./shared/CompensationDisplay";
import QuestionHeader from "./shared/QuestionHeader";

interface IncidentDescriptionFormProps {
  onSubmit: (description: string) => void;
  compensationRange: { min: number; max: number };
}

const IncidentDescriptionForm = ({ onSubmit, compensationRange }: IncidentDescriptionFormProps) => {
  const [description, setDescription] = useState("");

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <ProgressIndicator value={55} />
        <CompensationDisplay min={compensationRange.min} max={compensationRange.max} />
        <QuestionHeader 
          title="Describe your incident"
          description="Our system can understand large language models. A brief description of your accident will help us evaluate your case more accurately."
        />
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your incident..."
          className="min-h-[200px] bg-white/50"
          maxLength={2000}
        />
        <div className="flex justify-between text-sm text-gray-600">
          <div>
            {description.length < 20 && "Please enter at least 20 characters"}
          </div>
          <div>
            {description.length}/2000
          </div>
        </div>
        <Button
          onClick={() => onSubmit(description)}
          className="w-full py-6 text-lg"
          disabled={description.length < 20}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default IncidentDescriptionForm;