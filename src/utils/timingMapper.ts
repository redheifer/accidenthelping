export const mapTimingToWebhook = (timing: string): string => {
  const timingMap: { [key: string]: string } = {
    "Within 1 Week": "Within the last 10 days",
    "Within 1-3 months": "Within the last 6 months",
    "Within 4-6 months": "Within the last 6 months",
    "Within 1 Year": "Within the last 1 year",
    "Within 2 Years": "Within the last 2 years",
    "Longer than 2 Years": "Longer than 2 years ago"
  };

  return timingMap[timing] || timing;
};