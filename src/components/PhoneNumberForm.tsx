import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import ProgressIndicator from "./shared/ProgressIndicator";
import CompensationDisplay from "./shared/CompensationDisplay";
import QuestionHeader from "./shared/QuestionHeader";

interface PhoneNumberFormProps {
  onSubmit: (phoneNumber: string) => void;
  compensationRange: { min: number; max: number };
}

const PhoneNumberForm = ({ onSubmit, compensationRange }: PhoneNumberFormProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    if (formatted.length <= 12) {
      setPhoneNumber(formatted);
    }
  };

  const handleSubmit = () => {
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    if (digitsOnly.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit US phone number",
        variant: "destructive",
      });
      return;
    }
    onSubmit(phoneNumber);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <ProgressIndicator value={88} />
        <CompensationDisplay min={compensationRange.min} max={compensationRange.max} />
        <QuestionHeader 
          title="What is your phone number?"
          description="We'll use this to contact you about your compensation estimate."
        />
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <Input
          value={phoneNumber}
          onChange={handleChange}
          placeholder="000-000-0000"
          type="tel"
          className="bg-white/50"
        />
        <Button
          onClick={handleSubmit}
          className="w-full py-6 text-lg"
          disabled={phoneNumber.replace(/\D/g, "").length !== 10}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PhoneNumberForm;