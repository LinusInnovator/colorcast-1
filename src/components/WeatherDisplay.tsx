import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Thermometer, ExternalLink } from 'lucide-react';
import { WeatherData, ColorTheme, WeatherCondition } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { getOppositeDestination } from '../utils/recommendations';

interface Props {
  weather: WeatherData;
  colorTheme: ColorTheme;
  message: string;
}

export const WeatherDisplay: React.FC<Props> = ({ weather, colorTheme, message }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const temperature = isCelsius ? weather.temperature : (weather.temperature * 9/5) + 32;
  const oppositeDestination = getOppositeDestination(weather.temperature, weather.location);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full p-6 sm:p-8 md:p-10"
    >
      <div className="flex justify-between items-center mb-8">
        <Globe className="w-6 h-6" style={{ color: colorTheme.text }} />
        <span className="text-sm md:text-base" style={{ color: colorTheme.text }}>
          {weather.location}
        </span>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-4 mb-6 flex-nowrap min-w-0">
          <h1 
            className="text-5xl sm:text-6xl md:text-8xl font-bold leading-tight whitespace-nowrap"
            style={{ color: colorTheme.text }}
          >
            It's {Math.round(temperature)}° today.
          </h1>
          <div className="flex-shrink-0" style={{ color: colorTheme.subtext }}>
            <WeatherIcon 
              condition={weather.condition as WeatherCondition}
              color={colorTheme.subtext}
              size={96}
            />
          </div>
        </div>
        
        <p 
          className="text-2xl sm:text-3xl md:text-4xl font-light opacity-80 leading-tight mb-8"
          style={{ color: colorTheme.subtext }}
        >
          {message}
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-4 opacity-60"
          style={{ 
            color: colorTheme.subtext,
            borderTop: `1px solid ${colorTheme.subtext}`,
            borderTopColor: `rgba(${colorTheme.subtext.includes('255') ? '255, 255, 255' : '0, 0, 0'}, 0.1)`
          }}
        >
          <a
            href={oppositeDestination.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between text-sm hover:opacity-100 transition-opacity"
          >
            <span className="opacity-70">
              Rather be in {oppositeDestination.city}? It's {oppositeDestination.temperature}°C there.
              <br />
              <span className="text-xs opacity-60">{oppositeDestination.description}</span>
            </span>
            <ExternalLink size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>
      </motion.div>

      <div className="flex justify-between items-center mt-auto pt-8">
        <button
          onClick={() => setIsCelsius(!isCelsius)}
          className="flex items-center gap-2 text-sm transition-opacity hover:opacity-100"
          style={{ color: colorTheme.subtext }}
        >
          <Thermometer size={16} />
          <span>{isCelsius ? '°C' : '°F'}</span>
        </button>
        <span 
          className="text-sm"
          style={{ color: colorTheme.subtext }}
        >
          Tomorrow
        </span>
      </div>
    </motion.div>
  );
};