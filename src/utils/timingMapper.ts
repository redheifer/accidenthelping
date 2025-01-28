export const mapTimingToWebhook = (timing: string): string => {
  const timingMap: { [key: string]: string } = {
    "Within 1 Week": "Within the last 10 days",
    "Within 1-3 months": "Within the last 30 days",
    "Within 4-6 months": "1-6 months",
    "Within 1 Year": "6-12 months",
    "Within 2 Years": "1-2 years",
    "Longer than 2 Years": "More than 2 years ago"
  };

  return timingMap[timing] || timing;
};