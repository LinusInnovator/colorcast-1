import { ColorTheme } from '../types';

export const getColorTheme = (temperature: number): ColorTheme => {
  // Base colors for different temperature ranges
  let baseColor: string;
  let textColor: string;
  
  // Extreme hot (120°F+)
  if (temperature >= 48.9) {
    baseColor = '#4A0000'; // Dark maroon
    textColor = '#FFFFFF';
  }
  // Very hot (95-120°F)
  else if (temperature >= 35) {
    baseColor = '#8B3D48'; // Dark red
    textColor = '#FFFFFF';
  }
  // Warm (80-95°F)
  else if (temperature >= 26.7) {
    baseColor = '#C19D61'; // Warm tan
    textColor = '#FFFFFF';
  }
  // Mild warm (70-80°F)
  else if (temperature >= 21.1) {
    baseColor = '#B5B396'; // Sage green
    textColor = '#000000';
  }
  // Cool (55-70°F)
  else if (temperature >= 12.8) {
    baseColor = '#6B8E9B'; // Cool blue-gray
    textColor = '#FFFFFF';
  }
  // Cold (40-55°F)
  else if (temperature >= 4.4) {
    baseColor = '#2B4C7C'; // Medium blue
    textColor = '#FFFFFF';
  }
  // Very cold (25-40°F)
  else if (temperature >= -3.9) {
    baseColor = '#1E3557'; // Dark blue
    textColor = '#FFFFFF';
  }
  // Extreme cold (below 25°F)
  else {
    baseColor = '#C9D7E5'; // Light blue-gray
    textColor = '#000000';
  }

  // Create gradient by lightening/darkening the base color
  const lighterColor = adjustColor(baseColor, 15); // 15% lighter
  const darkerColor = adjustColor(baseColor, -15); // 15% darker

  return {
    background: `linear-gradient(135deg, ${lighterColor} 0%, ${baseColor} 50%, ${darkerColor} 100%)`,
    text: textColor,
    subtext: textColor === '#FFFFFF' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
  };
};

// Helper function to adjust color brightness
function adjustColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(Math.min((num >> 16) + amt, 255), 0);
  const G = Math.max(Math.min(((num >> 8) & 0x00FF) + amt, 255), 0);
  const B = Math.max(Math.min((num & 0x0000FF) + amt, 255), 0);
  return '#' + (0x1000000 + (R << 16) + (G << 8) + B).toString(16).slice(1);
}

export const getWeatherMessage = (temperature: number, condition: string): string => {
  // Base messages for different conditions
  const conditionMessages: Record<string, string[]> = {
    clear: [
      'Crystal clear skies above.',
      'Perfect visibility all around.',
      'Not a cloud in sight.'
    ],
    cloudy: [
      'Clouds painting patterns overhead.',
      'A blanket of clouds above.',
      'Overcast but calm conditions.'
    ],
    rain: [
      'Raindrops bringing life to the earth.',
      'A perfect day for indoor coziness.',
      'The sound of rain sets the mood.'
    ],
    storm: [
      'Nature´s light show in progress.',
      'Thunder and lightning dance above.',
      'Dramatic weather in full force.'
    ],
    snow: [
      'Snowflakes dancing in the air.',
      'A winter wonderland emerges.',
      'Perfect weather for snow angels.'
    ],
    sleet: [
      'Mix of rain and snow falling.',
      'Sleet creating a wintry scene.',
      'Bundle up for mixed precipitation.'
    ],
    fog: [
      'Mysterious fog blankets the area.',
      'Limited visibility in the mist.',
      'A dreamy haze surrounds you.'
    ],
    wind: [
      'Breezy conditions today.',
      'Wind adding character to the day.',
      'Feel the refreshing breeze.'
    ],
    tornado: [
      'Severe weather alert - seek shelter!',
      'Dangerous conditions - stay informed!',
      'Emergency weather situation.'
    ],
    haze: [
      'Hazy skies limiting visibility.',
      'A light haze filters the sun.',
      'Atmospheric conditions are hazy.'
    ]
  };

  // Temperature-specific additions
  let tempMessage = '';
  if (temperature >= 48.9) { // 120°F+
    tempMessage = 'Extreme heat warning - stay hydrated and indoors!';
  } else if (temperature >= 35) { // 95°F+
    tempMessage = 'Very hot conditions - stay cool and hydrated.';
  } else if (temperature >= 26.7) { // 80°F+
    tempMessage = 'Warm and pleasant temperatures.';
  } else if (temperature >= 21.1) { // 70°F+
    tempMessage = 'Perfect temperature for outdoor activities.';
  } else if (temperature >= 12.8) { // 55°F+
    tempMessage = 'Cool and comfortable conditions.';
  } else if (temperature >= 4.4) { // 40°F+
    tempMessage = 'Chilly - grab a light jacket.';
  } else if (temperature >= -3.9) { // 25°F+
    tempMessage = 'Cold weather - bundle up well.';
  } else {
    tempMessage = 'Extremely cold - limit outdoor exposure.';
  }

  // Get random condition message
  const conditionMessage = conditionMessages[condition] || conditionMessages.clear;
  const randomConditionMessage = conditionMessage[Math.floor(Math.random() * conditionMessage.length)];

  // Combine messages
  return `${randomConditionMessage} ${tempMessage}`;
};