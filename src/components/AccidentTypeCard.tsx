import { cn } from "@/lib/utils";

interface AccidentTypeCardProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
  selected?: boolean;
}

const AccidentTypeCard = ({ icon, title, onClick, selected }: AccidentTypeCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full h-full p-6 card-gradient rounded-2xl glow cursor-pointer group",
        "flex flex-col items-center justify-center gap-4 min-h-[200px]",
        "border border-white/10 hover:border-primary/50",
        selected && "border-primary border-2"
      )}
    >
      <div className="text-primary text-4xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-center">{title}</h3>
    </button>
  );
};

export default AccidentTypeCard;