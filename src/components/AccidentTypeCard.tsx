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
        "w-full aspect-square p-4 rounded-xl transition-all duration-300",
        "flex flex-col items-center justify-center gap-3",
        "bg-white hover:bg-gray-50",
        "border-2 border-transparent hover:border-blue-500",
        selected && "border-blue-500 bg-blue-50"
      )}
    >
      <div className="text-blue-500">{icon}</div>
      <h3 className="text-blue-500 font-semibold text-center whitespace-pre-line text-sm">
        {title}
      </h3>
    </button>
  );
};

export default AccidentTypeCard;