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
  const [description, setDescription] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { toast } = useToast();

  const sendStepData = async (stepData: any) => {
    try {
      const formData = {
        state: "California",
        zipcode: "90210",
        hasAttorney: hasAttorney,
        atFault: isAtFault,
        otherPartyInsured: true,
        injuryType: selectedType,
        timing: timing,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        description: description,
        ...stepData
      };

      console.log('Sending form data:', formData);

      const tcpaLanguage = "I agree to receive marketing messages.";
      const trustedFormCertUrl = "https://cert.trustedform.com/example";

      const result = await sendPingPostWebhook(
        formData,
        trustedFormCertUrl,
        tcpaLanguage
      );

      if (!result.success) {
        console.error('API Error:', result.message);
      }
    } catch (error) {
      console.error('Error sending step data:', error);
    }
  };

  const handleTypeSelect = async (id: string) => {
    setSelectedType(id);
    await sendStepData({ injuryType: id });
    setStep(2);
  };

  const handleMedicalVisit = async (hadMedicalVisit: boolean) => {
    await sendStepData({ hadMedicalVisit });
    setStep(3);
  };

  const handleAttorneyResponse = async (hasAttorney: boolean) => {
    setHasAttorney(hasAttorney);
    await sendStepData({ hasAttorney });
    
    if (hasAttorney) {
      setIsComplete(true);
      toast({
        title: "Form Complete",
        description: "Since you already have an attorney, we cannot proceed with your case.",
      });
    } else {
      setStep(4);
    }
  };

  const handleFaultResponse = async (atFault: boolean) => {
    setIsAtFault(atFault);
    await sendStepData({ atFault });
    
    if (atFault) {
      setIsComplete(true);
      toast({
        title: "We're Sorry",
        description: "Based on your response, we cannot proceed with your case at this time.",
      });
    } else {
      setStep(5);
    }
  };

  const handleTimingResponse = async (selectedTiming: string) => {
    setTiming(selectedTiming);
    await sendStepData({ timing: selectedTiming });
    
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

  const handleDescriptionSubmit = async (descriptionText: string) => {
    setDescription(descriptionText);
    await sendStepData({ description: descriptionText });
    if (descriptionText.length >= 20) {
      setStep(7);
    }
  };

  const handleNameSubmit = async (first: string, last: string) => {
    setFirstName(first);
    setLastName(last);
    await sendStepData({ firstName: first, lastName: last });
    setStep(8);
  };

  const handleEmailSubmit = async (emailAddress: string) => {
    setEmail(emailAddress);
    await sendStepData({ email: emailAddress });
    setStep(9);
  };

  const handlePhoneSubmit = async (phoneNumber: string) => {
    setPhone(phoneNumber);
    await sendStepData({ phone: phoneNumber });
    setStep(10);
    setIsComplete(true);
    
    toast({
      title: "Submission Complete",
      description: "Thank you! We'll be in touch shortly with your compensation estimate.",
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
    setDescription("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
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