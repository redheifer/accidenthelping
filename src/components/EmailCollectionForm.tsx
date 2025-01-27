import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";

interface EmailCollectionFormProps {
  onSubmit: (email: string) => void;
  compensationRange: { min: number; max: number };
}

const EmailCollectionForm = ({ onSubmit, compensationRange }: EmailCollectionFormProps) => {
  const [email, setEmail] = useState("");

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="max-w-xl mx-auto w-full space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>77%</span>
          </div>
          <Progress 
            value={77} 
            className="h-3 rounded-full bg-secondary" 
          />
        </div>
        <div className="bg-card/50 rounded-lg p-4 mb-6 max-w-xs mx-auto">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Compensation amounts:</div>
            <div className="text-2xl font-bold text-primary">
              ${compensationRange.min.toLocaleString()} - ${compensationRange.max.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            What is the best email to send your compensation estimate to?
          </h2>
          <p className="text-muted-foreground text-lg">
            Our system will review your case, and email you the results directly to your inbox same-day.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          type="email"
          className="bg-card/50"
        />
        <Button
          onClick={() => onSubmit(email)}
          className="w-full py-6 text-lg"
          disabled={!email.trim() || !email.includes("@")}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default EmailCollectionForm;
