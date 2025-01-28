import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import type { FormStep } from "@/types/form";
import { sendPingPostWebhook } from "@/utils/webhookService";
import { mapTimingToWebhook } from "@/utils/timingMapper";

export const useAccidentForm = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [step, setStep] = useState<FormStep>(1);
  const [isComplete, setIsComplete] = useState(false);
  const [hasAttorney, setHasAttorney] = useState(false);
  const [isAtFault, setIsAtFault] = useState(false);
  const [isTooOld, setIsTooOld] = useState(false);
  const [timing, setTiming] = useState<string>("");
  const { toast } = useToast();

  const handleTypeSelect = (id: string) => {
    setSelectedType(id);
    setStep(2);
  };

  const handleMedicalVisit = (hadMedicalVisit: boolean) => {
    setStep(3);
  };

  const handleAttorneyResponse = (hasAttorney: boolean) => {
    setHasAttorney(hasAttorney);
    setIsComplete(hasAttorney);
    if (hasAttorney) {
      toast({
        title: "Form Complete",
        description: "Since you already have an attorney, we cannot proceed with your case.",
      });
    } else {
      setStep(4);
    }
  };

  const handleFaultResponse = (atFault: boolean) => {
    if (atFault) {
      setIsAtFault(true);
      setIsComplete(true);
      toast({
        title: "We're Sorry",
        description: "Based on your response, we cannot proceed with your case at this time.",
      });
    } else {
      setStep(5);
    }
  };

  const handleTimingResponse = (selectedTiming: string) => {
    setTiming(selectedTiming);
    console.log('Setting timing in form:', selectedTiming);
    
    const recentTimings = [
      "Within the last 10 days",
      "Within the last 30 days",
      "Within the last 6 months",
      "Within the last 1 year",
      "Within the last 2 years" // Added this timing to allow cases within 2 years
    ];

    if (recentTimings.includes(selectedTiming)) {
      setStep(6);
    } else {
      setIsTooOld(true);
      setIsComplete(true);
      toast({
        title: "We're Sorry",
        description: "Based on the timing of your accident, we cannot proceed with your case at this time.",
      });
    }
  };

  const handleDescriptionSubmit = (description: string) => {
    if (description.length >= 20) {
      setStep(7);
    }
  };

  const handleNameSubmit = (firstName: string, lastName: string) => {
    setStep(8);
  };

  const handleEmailSubmit = (email: string) => {
    setStep(9);
  };

  const handlePhoneSubmit = async (phoneNumber: string) => {
    setStep(10);
    
    const formData = {
      state: "California",
      zipcode: "90210",
      hasAttorney,
      atFault: isAtFault,
      otherPartyInsured: true,
      injuryType: selectedType,
      timing: timing,
      firstName: "John",
      lastName: "Doe",
      phone: phoneNumber,
      email: "test@example.com"
    };

    console.log('Submitting form with timing:', timing);

    const tcpaLanguage = "I agree to receive marketing messages.";
    const trustedFormCertUrl = "https://cert.trustedform.com/example";

    const result = await sendPingPostWebhook(
      formData,
      trustedFormCertUrl,
      tcpaLanguage
    );

    setIsComplete(true);
    toast({
      title: result.success ? "Submission Complete" : "Submission Error",
      description: result.message || "Thank you! We'll be in touch shortly with your compensation estimate.",
    });
  };

  const handleRestart = () => {
    setSelectedType(null);
    setStep(1);
    setIsComplete(false);
    setHasAttorney(false);
    setIsAtFault(false);
    setIsTooOld(false);
    setTiming("");
  };

  return {
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
  };
};