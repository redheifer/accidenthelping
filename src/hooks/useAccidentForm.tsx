import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import type { FormStep } from "@/types/form";
import { sendPingPostWebhook } from "@/utils/webhookService";

export const useAccidentForm = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [step, setStep] = useState<FormStep>(1);
  const [isComplete, setIsComplete] = useState(false);
  const [hasAttorney, setHasAttorney] = useState(false);
  const [isAtFault, setIsAtFault] = useState(false);
  const [isTooOld, setIsTooOld] = useState(false);
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

  const handleTimingResponse = (timing: string) => {
    const recentTimings = [
      "Within 1 Week",
      "Within 1-3 months",
      "Within 4-6 months",
      "Within 1 Year"
    ];

    if (recentTimings.includes(timing)) {
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
      state: "California", // Default state
      zipcode: "90210", // You might want to collect this earlier in the form
      hasAttorney,
      atFault: isAtFault,
      otherPartyInsured: true, // You might want to collect this earlier in the form
      injuryType: selectedType,
      accidentDate: new Date().toISOString(), // You might want to collect this earlier in the form
      firstName: "John", // You might want to collect this earlier in the form
      lastName: "Doe", // You might want to collect this earlier in the form
      phone: phoneNumber,
      email: "test@example.com" // You might want to collect this earlier in the form
    };

    const tcpaLanguage = "I agree to receive marketing messages."; // Customize this
    const trustedFormCertUrl = "https://cert.trustedform.com/example"; // You might want to generate this

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
