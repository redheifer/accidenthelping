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
        "w-full h-full p-6 card-gradient rounded-2xl cursor-pointer group",
        "flex flex-col items-center justify-center gap-4 min-h-[200px]",
        "border border-gray-200 hover:border-primary/50",
        "shadow-lg hover:shadow-xl transition-all duration-300",
        "hover:-translate-y-1",
        selected && "border-primary border-2 shadow-xl shadow-primary/10",
        className
      )}
    >
      <div className="text-primary text-4xl group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-primary text-center">{title}</h3>
    </button>
  );
};

export default AccidentTypeCard;