import { ColorTheme } from '../types';

export const getColorTheme = (temperature: number): ColorTheme => {
  // Extreme hot (120°F+)
  if (temperature >= 48.9) { // 120°F
    return {
      background: '#4A0000', // Dark maroon
      text: '#FFFFFF',
      subtext: 'rgba(255, 255, 255, 0.7)'
    };
  }
  // Very hot (95-120°F)
  else if (temperature >= 35) { // 95°F
    return {
      background: '#8B3D48', // Dark red
      text: '#FFFFFF',
      subtext: 'rgba(255, 255, 255, 0.7)'
    };
  }
  // Warm (80-95°F)
  else if (temperature >= 26.7) { // 80°F
    return {
      background: '#C19D61', // Warm tan
      text: '#FFFFFF',
      subtext: 'rgba(255, 255, 255, 0.7)'
    };
  }
  // Mild warm (70-80°F)
  else if (temperature >= 21.1) { // 70°F
    return {
      background: '#B5B396', // Sage green
      text: '#000000',
      subtext: 'rgba(0, 0, 0, 0.7)'
    };
  }
  // Cool (55-70°F)
  else if (temperature >= 12.8) { // 55°F
    return {
      background: '#6B8E9B', // Cool blue-gray
      text: '#FFFFFF',
      subtext: 'rgba(255, 255, 255, 0.7)'
    };
  }
  // Cold (40-55°F)
  else if (temperature >= 4.4) { // 40°F
    return {
      background: '#2B4C7C', // Medium blue
      text: '#FFFFFF',
      subtext: 'rgba(255, 255, 255, 0.7)'
    };
  }
  // Very cold (25-40°F)
  else if (temperature >= -3.9) { // 25°F
    return {
      background: '#1E3557', // Dark blue
      text: '#FFFFFF',
      subtext: 'rgba(255, 255, 255, 0.7)'
    };
  }
  // Extreme cold (below 25°F)
  else {
    return {
      background: '#C9D7E5', // Light blue-gray
      text: '#000000',
      subtext: 'rgba(0, 0, 0, 0.7)'
    };
  }
};

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