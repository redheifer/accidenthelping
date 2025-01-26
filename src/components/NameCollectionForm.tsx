import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
        <div className="bg-card/50 rounded-lg p-4 mb-6 max-w-xs mx-auto">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Compensation amounts:</div>
            <div className="text-2xl font-bold text-primary">
              ${compensationRange.min.toLocaleString()} - ${compensationRange.max.toLocaleString()}
            </div>
          </div>
          <div className="mt-2 relative h-2 bg-secondary rounded-full overflow-hidden">
            <div className="absolute left-0 top-0 h-full bg-primary" style={{ width: "67%" }} />
          </div>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
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