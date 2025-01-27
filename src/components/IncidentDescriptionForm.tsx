import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";

interface IncidentDescriptionFormProps {
  onSubmit: (description: string) => void;
  compensationRange: { min: number; max: number };
}

const IncidentDescriptionForm = ({ onSubmit, compensationRange }: IncidentDescriptionFormProps) => {
  const [description, setDescription] = useState("");

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="max-w-xl mx-auto w-full space-y-2 mb-8">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>55%</span>
          </div>
          <Progress 
            value={55} 
            className="h-3 rounded-full bg-secondary" 
          />
        </div>

        <div className="bg-[#F2FCE2] rounded-lg p-4 mb-6 max-w-xs mx-auto">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Compensation amounts:</div>
            <div className="text-2xl font-bold text-white bg-green-500 rounded-md py-1">
              ${compensationRange.min.toLocaleString()} - ${compensationRange.max.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Describe your incident
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our system can understand large language models. A brief description of your accident will help us evaluate your case more accurately.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your incident..."
          className="min-h-[200px] bg-card/50"
          maxLength={2000}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
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