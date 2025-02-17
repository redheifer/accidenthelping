
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
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
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
            <p>By accessing and using the Legal Uplift Compensation Calculator, you agree to be bound by these Terms of Service.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">2. Service Description</h2>
            <p>The Legal Uplift Compensation Calculator provides estimated compensation ranges for various types of accidents. These estimates are not guarantees and should not be considered legal advice.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">3. User Responsibilities</h2>
            <p>Users must provide accurate information when using the calculator. We are not responsible for results based on incorrect information.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">4. Disclaimer</h2>
            <p>The information provided through our service is for informational purposes only and does not constitute legal advice. Users should consult with qualified legal professionals for specific advice.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">5. Privacy</h2>
            <p>User data collected through the calculator is handled in accordance with our Privacy Policy. We implement reasonable security measures to protect user information.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">6. Modifications</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
