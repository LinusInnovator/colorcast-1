import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Thermometer, ExternalLink, Calendar } from 'lucide-react';
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
  const tomorrowTemp = isCelsius ? weather.tomorrow.temperature : (weather.tomorrow.temperature * 9/5) + 32;
  const oppositeDestination = getOppositeDestination(weather.temperature, weather.location);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-12">
        <div className="flex items-center gap-3">
          <Globe 
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" 
            style={{ color: colorTheme.text }} 
          />
          <span 
            className="text-xs sm:text-sm md:text-base font-medium truncate" 
            style={{ color: colorTheme.text }}
          >
            {weather.location}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar 
            className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 opacity-60" 
            style={{ color: colorTheme.text }} 
          />
          <span 
            className="text-xs sm:text-sm font-normal opacity-60" 
            style={{ color: colorTheme.text }}
          >
            {weather.currentDate}
          </span>
        </div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-2"
      >
        <div className="flex items-start gap-4">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight"
            style={{ color: colorTheme.text }}
          >
            <span className="whitespace-nowrap">It's {Math.round(temperature)}°</span>
            <span className="whitespace-nowrap"> today.</span>
          </h1>
          <div 
            className="flex-shrink-0 mt-1 sm:mt-2"
            style={{ color: colorTheme.subtext }}
          >
            <WeatherIcon 
              condition={weather.condition as WeatherCondition}
              color={colorTheme.subtext}
              size={48}
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24"
            />
          </div>
        </div>
        
        <p 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight"
          style={{ color: colorTheme.subtext }}
        >
          {message}
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-8 mt-8 opacity-60"
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

      <div className="flex justify-between items-center mt-12">
        <button
          onClick={() => setIsCelsius(!isCelsius)}
          className="flex items-center gap-2 text-sm transition-opacity hover:opacity-100"
          style={{ color: colorTheme.subtext }}
        >
          <Thermometer size={16} />
          <span>{isCelsius ? '°C' : '°F'}</span>
        </button>
        <div 
          className="flex items-center gap-2"
          style={{ color: colorTheme.subtext }}
        >
          <WeatherIcon 
            condition={weather.tomorrow.condition as WeatherCondition}
            color={colorTheme.subtext}
            size={16}
          />
          <span className="text-sm">
            {weather.tomorrow.date}: {Math.round(tomorrowTemp)}°
          </span>
        </div>
      </div>
    </motion.div>
  );
}