import { Car } from "lucide-react";
import AccidentTypeCard from "./AccidentTypeCard";

interface AccidentTypeSelectionProps {
  onSelect: (id: string) => void;
  selectedType: string | null;
}

const AccidentTypeSelection = ({ onSelect, selectedType }: AccidentTypeSelectionProps) => {
  const accidentTypes = [
    { id: "auto", title: "Automobile Accident", icon: <Car className="w-12 h-12" /> },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4">
          <img 
            src="/lovable-uploads/a5188531-fe57-4015-a550-2914ae2b0547.png" 
            alt="LegalUplift Logo" 
            className="w-12 h-12"
          />
          <h1 className="text-4xl md:text-5xl font-bold">
            Florida Car Accident Calculator
          </h1>
        </div>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Get an instant estimate of your car accident compensation value. 
          Tap below to start your free evaluation.
        </p>
      </div>

      <div className="max-w-md mx-auto mt-8">
        {accidentTypes.map((type) => (
          <AccidentTypeCard
            key={type.id}
            icon={type.icon}
            title={type.title}
            onClick={() => onSelect(type.id)}
            selected={selectedType === type.id}
          />
        ))}
      </div>
    </>
  );
};

export default AccidentTypeSelection;