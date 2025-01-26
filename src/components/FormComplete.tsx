import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface FormCompleteProps {
  onRestart: () => void;
}

const FormComplete = ({ onRestart }: FormCompleteProps) => {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-6">
      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
        Thank you for your interest
      </h2>
      <p className="text-lg text-muted-foreground">
        Based on your responses, we cannot proceed with your case at this time.
      </p>
      <Button onClick={onRestart} className="mt-4" variant="outline">
        <RotateCcw className="mr-2 h-4 w-4" />
        Start Over
      </Button>
    </div>
  );
};

export default FormComplete;