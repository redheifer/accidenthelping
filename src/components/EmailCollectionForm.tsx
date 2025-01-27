import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ProgressIndicator from "./shared/ProgressIndicator";
import CompensationDisplay from "./shared/CompensationDisplay";
import QuestionHeader from "./shared/QuestionHeader";

interface EmailCollectionFormProps {
  onSubmit: (email: string) => void;
  compensationRange: { min: number; max: number };
}

const EmailCollectionForm = ({ onSubmit, compensationRange }: EmailCollectionFormProps) => {
  const [email, setEmail] = useState("");

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <ProgressIndicator value={77} />
        <CompensationDisplay min={compensationRange.min} max={compensationRange.max} />
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
        <Button
          onClick={() => onSubmit(email)}
          className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white"
          disabled={!email.trim() || !email.includes("@")}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default EmailCollectionForm;