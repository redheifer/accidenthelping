export const mapTimingToWebhook = (timing: string): string => {
  const timingMap: { [key: string]: string } = {
    "Within 1 Week": "Within the last 10 days",
    "Within 1-3 months": "Within the last 6 months",
    "Within 4-6 months": "1-6 months",
    "Within 1 Year": "6-12 months",
    "Within 2 Years": "1-2 years",
    "Longer than 2 Years": "More than 2 years ago"
  };

  return timingMap[timing] || timing;
};

export const calculateIncidentDate = (timing: string): string => {
  const today = new Date();
  
  switch (timing) {
    case "Within 1 Week":
      today.setDate(today.getDate() - 7);
      break;
    case "Within 1-3 months":
      today.setMonth(today.getMonth() - 2);
      break;
    case "Within 4-6 months":
      today.setMonth(today.getMonth() - 5);
      break;
    case "Within 1 Year":
      today.setMonth(today.getMonth() - 11);
      break;
    case "Within 2 Years":
      today.setFullYear(today.getFullYear() - 1);
      break;
    case "Longer than 2 Years":
      today.setFullYear(today.getFullYear() - 2);
      break;
    default:
      break;
  }
  
  return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};