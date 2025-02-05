import { 
  Car, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  ArrowLeftRight,
  FlipHorizontal,
  Car as SingleCar,
  Cars,
  Truck,
  ArrowDownWideNarrow,
  UserX2,
  Users
} from "lucide-react";
import AccidentTypeCard from "./AccidentTypeCard";

interface AccidentTypeSelectionProps {
  onSelect: (id: string) => void;
  selectedType: string | null;
}

const AccidentTypeSelection = ({ onSelect, selectedType }: AccidentTypeSelectionProps) => {
  const accidentTypes = [
    { id: "rear-end", title: "Rear-End Collisions", icon: <ArrowDownToLine className="w-12 h-12" /> },
    { id: "front", title: "Front Collisions", icon: <ArrowUpFromLine className="w-12 h-12" /> },
    { id: "side", title: "Side Collisions", icon: <ArrowLeftRight className="w-12 h-12" /> },
    { id: "rollover", title: "Rollover Accidents", icon: <FlipHorizontal className="w-12 h-12" /> },
    { id: "single", title: "Single-Vehicle Accidents", icon: <SingleCar className="w-12 h-12" /> },
    { id: "multi", title: "Multi-Vehicle Accidents", icon: <Cars className="w-12 h-12" /> },
    { id: "commercial", title: "Commercial Vehicle Collisions", icon: <Truck className="w-12 h-12" /> },
    { id: "minor", title: "Low-Speed/Minor Accidents", icon: <ArrowDownWideNarrow className="w-12 h-12" /> },
    { id: "hit-run", title: "Hit-and-Run Incidents", icon: <UserX2 className="w-12 h-12" /> },
    { id: "vulnerable", title: "Vulnerable Road User Accidents", icon: <Users className="w-12 h-12" /> },
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
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Florida Car Accident Calculator
          </h1>
        </div>
        <p className="text-lg text-primary/80 max-w-2xl mx-auto">
          Get an instant estimate of your car accident compensation value. 
          Tap below to start your free evaluation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
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