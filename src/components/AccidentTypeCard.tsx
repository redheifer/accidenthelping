
import { cn } from "@/lib/utils";

interface AccidentTypeCardProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
  selected?: boolean;
  className?: string;
}

const AccidentTypeCard = ({ icon, title, onClick, selected, className }: AccidentTypeCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full h-full p-4 card-gradient rounded-2xl glow cursor-pointer group",
        "flex flex-col items-center justify-center gap-3 min-h-[160px]",
        "border border-white/10 hover:border-primary/50",
        selected && "border-primary border-2",
        className
      )}
    >
      <div className="text-white text-4xl group-hover:scale-110 transition-all duration-300 logo-bounce">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-white text-center">{title}</h3>
    </button>
  );
};

export default AccidentTypeCard;
