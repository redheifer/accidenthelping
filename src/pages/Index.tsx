import { useState } from "react";
import {
  Car,
  Bike,
  Truck,
  HardHat,
  Stethoscope,
  PersonStanding,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import AccidentTypeCard from "@/components/AccidentTypeCard";
import MedicalVisitQuestion from "@/components/MedicalVisitQuestion";
import AttorneyQuestion from "@/components/AttorneyQuestion";
import FaultQuestion from "@/components/FaultQuestion";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const accidentTypes = [
    { id: "auto", title: "Automobile Accident", icon: <Car className="w-12 h-12" /> },
    { id: "pedestrian", title: "Pedestrian or Bicycle Accident", icon: <Bike className="w-12 h-12" /> },
    { id: "truck", title: "Truck Accident", icon: <Truck className="w-12 h-12" /> },
    { id: "motorcycle", title: "Motorcycle Accident", icon: <Bike className="w-12 h-12" /> },
    { id: "work", title: "Accident or Injury at Work", icon: <HardHat className="w-12 h-12" /> },
    { id: "medical", title: "Medical Negligence", icon: <Stethoscope className="w-12 h-12" /> },
    { id: "fall", title: "Fall or Slip", icon: <PersonStanding className="w-12 h-12" /> },
    { id: "other", title: "Other Injury or Accident", icon: <AlertCircle className="w-12 h-12" /> },
  ];

  const handleTypeSelect = (id: string) => {
    setSelectedType(id);
    setStep(2);
    toast({
      title: "Accident type selected",
      description: "Please answer the following question about medical visits.",
    });
  };

  const handleMedicalVisit = (hadMedicalVisit: boolean) => {
    setStep(3);
    toast({
      title: "Medical visit information recorded",
      description: "Please let us know about your legal representation.",
    });
  };

  const handleAttorneyResponse = (hasAttorney: boolean) => {
    if (hasAttorney) {
      setIsComplete(true);
      toast({
        title: "Form Complete",
        description: "Since you already have an attorney, we cannot proceed with your case.",
      });
    } else {
      setStep(4);
      toast({
        title: "Attorney information recorded",
        description: "Please answer the following question about fault.",
      });
    }
  };

  const handleFaultResponse = (atFault: boolean) => {
    toast({
      title: "Fault information recorded",
      description: "Thank you for providing this information.",
    });
    // Handle the next step or form submission here
  };

  const handleRestart = () => {
    setSelectedType(null);
    setStep(1);
    setIsComplete(false);
    toast({
      title: "Form Reset",
      description: "You can start over with your claim evaluation.",
    });
  };

  if (isComplete) {
    return (
      <div className="min-h-screen p-6 md:p-8 lg:p-12">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Thank you for your interest
          </h2>
          <p className="text-lg text-muted-foreground">
            Since you already have legal representation, we cannot proceed with your case. 
            Please consult with your current attorney for guidance.
          </p>
          <Button 
            onClick={handleRestart}
            className="mt-4"
            variant="outline"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {step === 1 && (
          <>
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
          </>
        )}

        {step === 2 && (
          <MedicalVisitQuestion onSelect={handleMedicalVisit} />
        )}

        {step === 3 && (
          <AttorneyQuestion 
            onSelect={handleAttorneyResponse}
            compensationRange={{ min: 12750, max: 29750 }}
          />
        )}

        {step === 4 && (
          <FaultQuestion 
            onSelect={handleFaultResponse}
            compensationRange={{ min: 18900, max: 44100 }}
          />
        )}

        <div className="text-center text-sm text-muted-foreground max-w-3xl mx-auto">
          <p>
            Compensation for Accident Calculator powered by LegalUplift. This site is not a part of the YouTube, 
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