import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";

interface NameCollectionFormProps {
  onSubmit: (firstName: string, lastName: string) => void;
  compensationRange: { min: number; max: number };
}

const NameCollectionForm = ({ onSubmit, compensationRange }: NameCollectionFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="max-w-xl mx-auto w-full space-y-2 mb-8">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>66%</span>
          </div>
          <Progress 
            value={66} 
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
            What is your full name?
          </h2>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <Input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Your first name"
          className="bg-card/50"
        />
        <Input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Your last name"
          className="bg-card/50"
        />
        <Button
          onClick={() => onSubmit(firstName, lastName)}
          className="w-full py-6 text-lg"
          disabled={!firstName.trim() || !lastName.trim()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default NameCollectionForm;