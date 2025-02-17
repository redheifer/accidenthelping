
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 p-6 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="bg-gray-800 rounded-lg p-8 text-white space-y-6">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us when using the Legal Uplift Compensation Calculator, including personal information such as your name, email address, phone number, and details about your accident case.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide and improve our services, communicate with you about your case, and connect you with appropriate legal resources.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">3. Information Sharing</h2>
            <p>We do not sell your personal information. We may share your information with legal professionals who can assist with your case, but only with your explicit consent.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">4. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. Contact us if you wish to exercise any of these rights.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">6. Changes to Privacy Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
