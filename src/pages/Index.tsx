import { useState } from "react";
import AccidentTypeCard from "@/components/AccidentTypeCard";
import { useToast } from "@/components/ui/use-toast";
import {
  Car,
  Bike,
  Truck,
  Motorcycle,
  HardHat,
  Stethoscope,
  PersonStanding,
  AlertCircle,
} from "lucide-react";

const Index = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const { toast } = useToast();

  const accidentTypes = [
    { id: "auto", title: "Automobile Accident", icon: <Car className="w-12 h-12" /> },
    { id: "pedestrian", title: "Pedestrian or Bicycle Accident", icon: <Bike className="w-12 h-12" /> },
    { id: "truck", title: "Truck Accident", icon: <Truck className="w-12 h-12" /> },
    { id: "motorcycle", title: "Motorcycle Accident", icon: <Motorcycle className="w-12 h-12" /> },
    { id: "work", title: "Accident or Injury at Work", icon: <HardHat className="w-12 h-12" /> },
    { id: "medical", title: "Medical Negligence", icon: <Stethoscope className="w-12 h-12" /> },
    { id: "fall", title: "Fall or Slip", icon: <PersonStanding className="w-12 h-12" /> },
    { id: "other", title: "Other Injury or Accident", icon: <AlertCircle className="w-12 h-12" /> },
  ];

  const handleTypeSelect = (id: string) => {
    setSelectedType(id);
    toast({
      title: "Accident type selected",
      description: "Please proceed to the next step.",
    });
  };

  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Calculate Your Compensation Value
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The type of accident you were in can get you major compensation. 
            Tap below to see what yours is worth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accidentTypes.map((type) => (
            <AccidentTypeCard
              key={type.id}
              icon={type.icon}
              title={type.title}
              onClick={() => handleTypeSelect(type.id)}
              selected={selectedType === type.id}
            />
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground max-w-3xl mx-auto">
          <p>
            Accident Compensation Calculator powered by Case Connect. This site is not a part of the YouTube, 
            Google or Facebook website; Google Inc or Facebook Inc. Additionally, This site is NOT endorsed 
            by YouTube, Google or Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc. YOUTUBE 
            is a trademark of GOOGLE Inc.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;