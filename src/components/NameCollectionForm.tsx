import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ProgressIndicator from "./shared/ProgressIndicator";
import CompensationDisplay from "./shared/CompensationDisplay";
import QuestionHeader from "./shared/QuestionHeader";

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
        <ProgressIndicator value={66} />
        <CompensationDisplay min={compensationRange.min} max={compensationRange.max} />
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
        <Button
          onClick={() => onSubmit(firstName, lastName)}
          className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white"
          disabled={!firstName.trim() || !lastName.trim()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default NameCollectionForm;