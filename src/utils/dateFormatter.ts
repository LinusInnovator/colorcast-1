export const formatCurrentDate = (): string => {
  const now = new Date();
  
  // Format the date to show weekday, month and day
  return now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
};