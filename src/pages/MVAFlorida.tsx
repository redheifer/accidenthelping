import { useState } from "react";
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

const MVAFlorida = () => {
  const [compensationRange, setCompensationRange] = useState({ min: 25000, max: 50000 });
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

  const renderStep = () => {
    if (isComplete) {
      if (hasAttorney) {
        return <AttorneyFormComplete onRestart={handleRestart} />;
      }
      if (isAtFault) {
        return <FaultFormComplete onRestart={handleRestart} />;
      }
      if (isTooOld) {
        return <TimingFormComplete onRestart={handleRestart} />;
      }
      return <FormComplete onRestart={handleRestart} compensationRange={compensationRange} />;
    }

    switch (step) {
      case 1:
        return <AccidentTypeSelection onSelect={handleTypeSelect} selectedType={selectedType} />;
      case 2:
        return <MedicalVisitQuestion onSelect={handleMedicalVisit} />;
      case 3:
        return <AttorneyQuestion onSelect={handleAttorneyResponse} compensationRange={compensationRange} />;
      case 4:
        return <FaultQuestion onSelect={handleFaultResponse} compensationRange={compensationRange} />;
      case 5:
        return <AccidentTimingQuestion onSelect={handleTimingResponse} compensationRange={compensationRange} />;
      case 6:
        return <IncidentDescriptionForm onSubmit={handleDescriptionSubmit} compensationRange={compensationRange} />;
      case 7:
        return <NameCollectionForm onSubmit={handleNameSubmit} compensationRange={compensationRange} />;
      case 8:
        return <EmailCollectionForm onSubmit={handleEmailSubmit} compensationRange={compensationRange} />;
      case 9:
        return <PhoneNumberForm onSubmit={handlePhoneSubmit} compensationRange={compensationRange} />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-[#090909] py-8 md:py-12">
      <div className="container max-w-6xl mx-auto px-4 space-y-8 md:space-y-12">
        {renderStep()}
      </div>
    </main>
  );
};

export default MVAFlorida;