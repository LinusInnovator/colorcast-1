import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Thermometer, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { WeatherData, ColorTheme, WeatherCondition } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { getOppositeDestination } from '../utils/recommendations';
import { TemperatureSlider } from './TemperatureSlider';
import { getRandomEscapeMessage, getRandomTemptationMessage } from '../utils/messages';

interface Props {
  weather: WeatherData;
  colorTheme: ColorTheme;
  message: string;
}

export const WeatherDisplay: React.FC<Props> = ({ weather, colorTheme, message }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const [showEscapePlan, setShowEscapePlan] = useState(false);
  const [escapeMessage] = useState(getRandomEscapeMessage());
  const [temptationMessage] = useState(getRandomTemptationMessage());
  
  const temperature = isCelsius ? weather.temperature : (weather.temperature * 9/5) + 32;
  const tomorrowTemp = isCelsius ? weather.tomorrow.temperature : (weather.tomorrow.temperature * 9/5) + 32;

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
        className="space-y-5"
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

        <div className="flex flex-col">
          <div className="flex justify-between items-center">
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

          <div className="flex flex-col items-center mt-5">
            <motion.button
              onClick={() => setShowEscapePlan(!showEscapePlan)}
              className="group flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity"
              style={{ color: colorTheme.text }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{showEscapePlan ? temptationMessage : escapeMessage}</span>
            </motion.button>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {showEscapePlan ? (
                <ChevronUp 
                  size={16} 
                  className="opacity-40"
                  style={{ color: colorTheme.text }} 
                />
              ) : (
                <ChevronDown 
                  size={16} 
                  className="opacity-40"
                  style={{ color: colorTheme.text }} 
                />
              )}
            </motion.div>
          </div>

          {showEscapePlan && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-5"
              >
                <div 
                  className="pt-5"
                  style={{ 
                    borderTop: `1px solid ${colorTheme.subtext}`,
                    borderTopColor: `rgba(${colorTheme.subtext.includes('255') ? '255, 255, 255' : '0, 0, 0'}, 0.1)`
                  }}
                >
                  <TemperatureSlider currentTemp={weather.temperature} colorTheme={colorTheme} />
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};