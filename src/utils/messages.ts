const escapeMessages = [
  "Ready for an escape plan?",
  "Need a change of scenery?",
  "Dreaming of different weather?",
  "Time for an adventure?",
  "Want to chase the perfect temperature?",
  "Feeling spontaneous?",
  "Looking for your ideal climate?",
  "Ready to explore somewhere new?",
  "Temperature not quite right?",
  "Fancy a weather upgrade?"
];

const temptationMessages = [
  "Oh, please don't tempt me!",
  "Stop, you're making me want to pack!",
  "My passport is tingling...",
  "I shouldn't look, but I can't resist!",
  "My wanderlust is showing...",
  "Just one more destination...",
  "My travel bug is acting up again!",
  "You know I can't resist a good trip!",
  "Now you've got me dreaming...",
  "Why do you do this to me?"
];

export const getRandomEscapeMessage = (): string => {
  return escapeMessages[Math.floor(Math.random() * escapeMessages.length)];
};

export const getRandomTemptationMessage = (): string => {
  return temptationMessages[Math.floor(Math.random() * temptationMessages.length)];
};