import { useAccidentForm } from "@/hooks/useAccidentForm";
import AccidentTypeSelection from "@/components/AccidentTypeSelection";
import MedicalVisitQuestion from "@/components/MedicalVisitQuestion";
import AttorneyQuestion from "@/components/AttorneyQuestion";
import FaultQuestion from "@/components/FaultQuestion";
import AccidentTimingQuestion from "@/components/AccidentTimingQuestion";
import IncidentDescriptionForm from "@/components/IncidentDescriptionForm";
import NameCollectionForm from "@/components/NameCollectionForm";
import EmailCollectionForm from "@/components/EmailCollectionForm";
import PhoneNumberForm from "@/components/PhoneNumberForm";
import FormComplete from "@/components/FormComplete";
import AttorneyFormComplete from "@/components/AttorneyFormComplete";
import FaultFormComplete from "@/components/FaultFormComplete";
import TimingFormComplete from "@/components/TimingFormComplete";
import { Button } from "@/components/ui/button";
import { FileText, Shield } from "lucide-react";

const Index = () => {
  const {
    selectedType,
    step,
    isComplete,
    hasAttorney,
    isAtFault,
    isTooOld,
    handleTypeSelect,
    handleMedicalVisit,
    handleAttorneyResponse,
    handleFaultResponse,
    handleTimingResponse,
    handleDescriptionSubmit,
    handleNameSubmit,
    handleEmailSubmit,
    handlePhoneSubmit,
    handleRestart,
  } = useAccidentForm();

  const compensationRange = { min: 75000, max: 125000 };

  if (isComplete) {
    if (hasAttorney) {
      return (
        <div className="min-h-screen p-6 md:p-8 lg:p-12 bg-background">
          <AttorneyFormComplete onRestart={handleRestart} />
          <Footer />
        </div>
      );
    }
    if (isAtFault) {
      return (
        <div className="min-h-screen p-6 md:p-8 lg:p-12 bg-background">
          <FaultFormComplete onRestart={handleRestart} />
          <Footer />
        </div>
      );
    }
    if (isTooOld) {
      return (
        <div className="min-h-screen p-6 md:p-8 lg:p-12 bg-background">
          <TimingFormComplete onRestart={handleRestart} />
          <Footer />
        </div>
      );
    }
    return (
      <div className="min-h-screen p-6 md:p-8 lg:p-12 bg-background">
        <FormComplete 
          onRestart={handleRestart} 
          compensationRange={compensationRange}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-12 bg-background">
      <div className="max-w-7xl mx-auto space-y-8">
        {step === 1 && (
          <AccidentTypeSelection onSelect={handleTypeSelect} selectedType={selectedType} />
        )}

        {step === 2 && (
          <MedicalVisitQuestion onSelect={handleMedicalVisit} />
        )}

        {step === 3 && (
          <AttorneyQuestion 
            onSelect={handleAttorneyResponse}
            compensationRange={compensationRange}
          />
        )}

        {step === 4 && (
          <FaultQuestion 
            onSelect={handleFaultResponse}
            compensationRange={compensationRange}
          />
        )}

        {step === 5 && (
          <AccidentTimingQuestion
            onSelect={handleTimingResponse}
            compensationRange={compensationRange}
          />
        )}

        {step === 6 && (
          <IncidentDescriptionForm
            onSubmit={handleDescriptionSubmit}
            compensationRange={compensationRange}
          />
        )}

        {step === 7 && (
          <NameCollectionForm
            onSubmit={handleNameSubmit}
            compensationRange={compensationRange}
          />
        )}

        {step === 8 && (
          <EmailCollectionForm
            onSubmit={handleEmailSubmit}
            compensationRange={compensationRange}
          />
        )}

        {step === 9 && (
          <PhoneNumberForm
            onSubmit={handlePhoneSubmit}
            compensationRange={compensationRange}
          />
        )}

        <Footer />
      </div>
    </div>
  );
};

const Footer = () => (
  <div className="mt-16 pb-8 text-center space-y-4">
    <img 
      src="/lovable-uploads/a5188531-fe57-4015-a550-2914ae2b0547.png" 
      alt="LegalUplift Logo" 
      className="w-12 h-12 mx-auto"
    />
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-white">
        LegalUplift Compensation for Accident Calculator
      </h3>
      <p className="text-sm text-gray-400 max-w-3xl mx-auto">
        This site is not a part of the YouTube, Google or Facebook website; Google Inc or Facebook Inc. 
        Additionally, This site is NOT endorsed by YouTube, Google or Facebook in any way. 
        FACEBOOK is a trademark of FACEBOOK, Inc. YOUTUBE is a trademark of GOOGLE Inc.
      </p>
      <div className="flex justify-center gap-4 mt-4">
        <Button variant="outline" size="sm">
          <FileText className="mr-2" />
          Terms of Service
        </Button>
        <Button variant="outline" size="sm">
          <Shield className="mr-2" />
          Privacy Policy
        </Button>
      </div>
    </div>
  </div>
);

export default Index;
