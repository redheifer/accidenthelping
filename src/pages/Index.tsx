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

const Index = () => {
  const {
    selectedType,
    step,
    isComplete,
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

  const compensationRange = { min: 27503, max: 61478 };

  if (isComplete) {
    return (
      <div className="min-h-screen p-6 md:p-8 lg:p-12 bg-gradient-to-b from-blue-50 to-white">
        <FormComplete 
          onRestart={handleRestart} 
          compensationRange={compensationRange}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-12 bg-gradient-to-b from-blue-50 to-white">
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

        <div className="text-center text-sm text-gray-500 max-w-3xl mx-auto">
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