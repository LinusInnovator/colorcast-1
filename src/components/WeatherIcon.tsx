import React from 'react';
import { 
  Sun, 
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
  CloudDrizzle,
  CloudFog,
  Wind,
  Tornado,
  Flame
} from 'lucide-react';
import { WeatherCondition } from '../types';

interface Props {
  condition: WeatherCondition;
  color: string;
  size?: number;
}

export const WeatherIcon: React.FC<Props> = ({ condition, color, size = 48 }) => {
  const iconProps = {
    size,
    color,
    strokeWidth: 1.5
  };

  const icons: Record<WeatherCondition, React.ReactNode> = {
    clear: <Sun {...iconProps} />,
    cloudy: <Cloud {...iconProps} />,
    rain: <CloudRain {...iconProps} />,
    storm: <CloudLightning {...iconProps} />,
    snow: <Snowflake {...iconProps} />,
    sleet: <CloudDrizzle {...iconProps} />,
    fog: <CloudFog {...iconProps} />,
    wind: <Wind {...iconProps} />,
    tornado: <Tornado {...iconProps} />,
    fire: <Flame {...iconProps} />,
    haze: <CloudFog {...iconProps} /> // Using CloudFog for haze conditions
  };

  return <>{icons[condition]}</>;
};