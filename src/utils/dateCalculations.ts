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
      today.setFullYear(today.getFullYear() - 1);
      break;
    case "Within 2 Years":
      today.setFullYear(today.getFullYear() - 2);
      break;
    case "Longer than 2 Years":
      today.setFullYear(today.getFullYear() - 3);
      break;
    default:
      break;
  }
  
  return today.toISOString().split('T')[0];
};