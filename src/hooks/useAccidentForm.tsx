
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
  const [userDescription, setUserDescription] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const { toast } = useToast();

  const handlePrevious = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1 as FormStep);
    }
  };

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
      "Within the last 2 years"
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

  const handleDescriptionSubmit = (description: string, zip: string) => {
    if (description.length >= 20) {
      setUserDescription(description);
      setZipCode(zip);
      setStep(7);
    }
  };

  const handleNameSubmit = (first: string, last: string) => {
    setFirstName(first);
    setLastName(last);
    setStep(8);
  };

  const handleEmailSubmit = (userEmail: string) => {
    setEmail(userEmail);
    setStep(9);
  };

  const handlePhoneSubmit = async (phoneNumber: string) => {
    setStep(10);
    
    const formData = {
      state: "California", // This could be made dynamic if needed
      zipcode: zipCode,
      hasAttorney,
      atFault: isAtFault,
      otherPartyInsured: true, // This could be made into a form question if needed
      injuryType: selectedType || "",
      timing: timing,
      firstName: firstName,
      lastName: lastName,
      phone: phoneNumber,
      email: email,
      IP_Address: "127.0.0.1" // This should ideally be obtained from a service
    };

    console.log('Submitting form with data:', formData);

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
    setUserDescription("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setZipCode("");
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
    handlePrevious,
  };
};
