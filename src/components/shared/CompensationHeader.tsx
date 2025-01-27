interface CompensationHeaderProps {
  amount: string;
}

const CompensationHeader = ({ amount }: CompensationHeaderProps) => {
  return (
    <div className="space-y-4 bg-gradient-to-r from-blue-900 to-blue-700 p-4 md:p-8 rounded-lg">
      <h2 className="text-2xl md:text-4xl font-bold text-white text-center">
        Congratulations, your accident may be eligible for compensation!
      </h2>
      <div className="space-y-2">
        <p className="text-white/80 text-center text-sm md:text-base">
          Your estimated compensation is within:
        </p>
        <p className="text-3xl md:text-5xl font-bold text-white text-center">
          {amount}
        </p>
      </div>
    </div>
  );
};

export default CompensationHeader;