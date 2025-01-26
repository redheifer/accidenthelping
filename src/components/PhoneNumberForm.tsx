import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface PhoneNumberFormProps {
  onSubmit: (phoneNumber: string) => void;
  compensationRange: { min: number; max: number };
}

const PhoneNumberForm = ({ onSubmit, compensationRange }: PhoneNumberFormProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");

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

  const isValidPhoneNumber = phoneNumber.replace(/\D/g, "").length === 10;

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
            <div className="absolute left-0 top-0 h-full bg-primary" style={{ width: "89%" }} />
          </div>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            What is your phone number?
          </h2>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <Input
          value={phoneNumber}
          onChange={handleChange}
          placeholder="000-000-0000"
          type="tel"
          className="bg-card/50"
        />
        <Button
          onClick={() => onSubmit(phoneNumber)}
          className="w-full py-6 text-lg"
          disabled={!isValidPhoneNumber}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PhoneNumberForm;