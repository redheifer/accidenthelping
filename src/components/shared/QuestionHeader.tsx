interface QuestionHeaderProps {
  title: string;
  description?: string;
}

const QuestionHeader = ({ title, description }: QuestionHeaderProps) => {
  return (
    <div className="space-y-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-gray-300">
          {description}
        </p>
      )}
    </div>
  );
};

export default QuestionHeader;