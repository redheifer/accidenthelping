import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import type { FormStep } from "@/types/form";

export const useAccidentForm = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [step, setStep] = useState<FormStep>(1);
  const [isComplete, setIsComplete] = useState(false);
  const [hasAttorney, setHasAttorney] = useState(false);
  const [isAtFault, setIsAtFault] = useState(false);
  const { toast } = useToast();

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
    setHasAttorney(hasAttorney);
    setIsComplete(hasAttorney);
    if (hasAttorney) {
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
    if (atFault) {
      setIsAtFault(true);
      setIsComplete(true);
      toast({
        title: "We're Sorry",
        description: "Based on your response, we cannot proceed with your case at this time.",
      });
    } else {
      setStep(5);
      toast({
        title: "Fault information recorded",
        description: "Please tell us when the accident occurred.",
      });
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
      toast({
        title: "Timing information recorded",
        description: "Please describe your incident to help us evaluate your case.",
      });
    } else {
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
      toast({
        title: "Description recorded",
        description: "Please provide your name to continue.",
      });
    }
  };

  const handleNameSubmit = (firstName: string, lastName: string) => {
    setStep(8);
    toast({
      title: "Name recorded",
      description: "Please provide your email address to receive your compensation estimate.",
    });
  };

  const handleEmailSubmit = (email: string) => {
    setStep(9);
    toast({
      title: "Email recorded",
      description: "Please provide your phone number to complete your submission.",
    });
  };

  const handlePhoneSubmit = (phoneNumber: string) => {
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
    toast({
      title: "Form Reset",
      description: "You can start over with your claim evaluation.",
    });
  };

  return {
    selectedType,
    step,
    isComplete,
    hasAttorney,
    isAtFault,
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