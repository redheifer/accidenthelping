import { Button } from "@/components/ui/button";
import { Link2, MessageSquare, Send, Twitter } from "lucide-react";

interface FormCompleteProps {
  onRestart: () => void;
  compensationRange: { min: number; max: number };
}

const FormComplete = ({ onRestart, compensationRange }: FormCompleteProps) => {
  const handleShare = (platform: string) => {
    // Share functionality can be implemented here
    console.log(`Sharing via ${platform}`);
  };

  return (
    <div className="space-y-12">
      {/* Header with gradient background */}
      <div className="space-y-4 bg-gradient-to-r from-blue-900 to-blue-700 p-8 rounded-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Congratulations, your accident may be eligible for compensation!
        </h2>
        <div className="space-y-2">
          <p className="text-white/80">Your estimated compensation is within:</p>
          <p className="text-4xl md:text-5xl font-bold text-white">
            ${compensationRange.min.toLocaleString()} - ${compensationRange.max.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Pending notification */}
      <div className="bg-card/50 p-8 rounded-lg space-y-4">
        <h3 className="text-2xl font-bold text-white">Your Compensation is Pending:</h3>
        <p className="text-lg text-white/80">
          We will be calling you shortly. Please leave your phone on loud and answer immediately.
        </p>
      </div>

      {/* Sharing section */}
      <div className="space-y-6">
        <p className="text-white/80">
          Earn referral credits by sharing this AI app with your friends and family. Click below to share now!
        </p>
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-blue-900/50 hover:bg-blue-800"
            onClick={() => handleShare('link')}
          >
            <Link2 className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-blue-900/50 hover:bg-blue-800"
            onClick={() => handleShare('whatsapp')}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-blue-900/50 hover:bg-blue-800"
            onClick={() => handleShare('telegram')}
          >
            <Send className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-blue-900/50 hover:bg-blue-800"
            onClick={() => handleShare('twitter')}
          >
            <Twitter className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Restart button */}
      <Button
        onClick={onRestart}
        className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white"
        size="lg"
      >
        Start survey again
      </Button>
    </div>
  );
};

export default FormComplete;