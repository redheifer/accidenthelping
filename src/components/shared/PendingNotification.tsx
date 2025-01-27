const PendingNotification = () => {
  return (
    <div className="bg-card/50 p-4 md:p-8 rounded-lg space-y-3 md:space-y-4">
      <h3 className="text-xl md:text-2xl font-bold text-white text-center">
        Your Compensation is Pending:
      </h3>
      <p className="text-base md:text-lg text-white text-center">
        We will be calling you shortly. Please leave your phone on loud and answer immediately.
      </p>
    </div>
  );
};

export default PendingNotification;