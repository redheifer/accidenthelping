import {
  Car,
  Bike,
  Truck,
  HardHat,
  Stethoscope,
  PersonStanding,
  AlertCircle,
} from "lucide-react";
import AccidentTypeCard from "./AccidentTypeCard";

interface AccidentTypeSelectionProps {
  onSelect: (id: string) => void;
  selectedType: string | null;
}

const AccidentTypeSelection = ({ onSelect, selectedType }: AccidentTypeSelectionProps) => {
  const accidentTypes = [
    { id: "auto", title: "Automobile\nAccident", icon: <Car className="w-8 h-8 text-blue-500" /> },
    { id: "pedestrian", title: "Pedestrian\nor Bicycle\nAccident", icon: <Bike className="w-8 h-8 text-blue-500" /> },
    { id: "truck", title: "Truck\nAccident", icon: <Truck className="w-8 h-8 text-blue-500" /> },
    { id: "motorcycle", title: "Motorcycle\nAccident", icon: <Bike className="w-8 h-8 text-blue-500" /> },
    { id: "work", title: "Accident\nor Injury at\nWork", icon: <HardHat className="w-8 h-8 text-blue-500" /> },
    { id: "medical", title: "Medical\nNegligence", icon: <Stethoscope className="w-8 h-8 text-blue-500" /> },
    { id: "fall", title: "Fall or Slip", icon: <PersonStanding className="w-8 h-8 text-blue-500" /> },
    { id: "other", title: "Other\nInjury or\nAccident", icon: <AlertCircle className="w-8 h-8 text-blue-500" /> },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 rounded-lg p-4 max-w-md mx-auto">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400">Compensation amounts:</span>
          <div className="h-2 w-24 bg-green-500 rounded-full">
            <div className="text-xs text-white text-right pr-2">11% Complete</div>
          </div>
        </div>
        <div className="bg-green-500 text-white text-xl font-bold py-2 px-4 rounded text-center">
          $25,000 - $50,000
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
    </div>
  );
};

export default AccidentTypeSelection;