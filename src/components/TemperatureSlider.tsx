import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, Thermometer } from 'lucide-react';
import { ColorTheme } from '../types';
import { getDestinationsForTemperature } from '../utils/recommendations';

interface Props {
  currentTemp: number;
  colorTheme: ColorTheme;
}

export const TemperatureSlider: React.FC<Props> = ({ currentTemp, colorTheme }) => {
  const [preferredTemp, setPreferredTemp] = useState(currentTemp);
  const [showDestinations, setShowDestinations] = useState(false);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPreferredTemp(currentTemp);
  }, [currentTemp]);

  const loadDestinations = async (temp: number) => {
    setLoading(true);
    setError(null);
    try {
      const results = await getDestinationsForTemperature(temp);
      setDestinations(results);
      setShowDestinations(true);
    } catch (err) {
      setError('Unable to fetch destinations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 
          className="text-2xl sm:text-3xl md:text-4xl font-light"
          style={{ color: colorTheme.text }}
        >
          What climate are you longing for?
        </h2>
        <p 
          className="text-lg sm:text-xl opacity-70"
          style={{ color: colorTheme.subtext }}
        >
          Slide to discover destinations with your ideal temperature
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between text-sm opacity-70" style={{ color: colorTheme.subtext }}>
          <span>Cold (-10°C)</span>
          <span>Hot (40°C)</span>
        </div>
        
        <div className="relative">
          <input
            type="range"
            min={-10}
            max={40}
            value={preferredTemp}
            onChange={(e) => setPreferredTemp(Number(e.target.value))}
            onMouseUp={() => loadDestinations(preferredTemp)}
            onTouchEnd={() => loadDestinations(preferredTemp)}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, 
                #1E3557, /* Cold */
                #2B4C7C,
                #6B8E9B,
                #B5B396,
                #C19D61,
                #8B3D48 /* Hot */
              )`,
              WebkitAppearance: 'none',
            }}
          />
          <div 
            className="absolute -top-8 transition-all pointer-events-none"
            style={{ 
              left: `calc(${((preferredTemp + 10) / 50) * 100}% - 20px)`,
              color: colorTheme.text
            }}
          >
            <Thermometer className="w-5 h-5" />
            <span className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm">
              {preferredTemp}°C
            </span>
          </div>
        </div>
      </div>

      {loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
          style={{ color: colorTheme.subtext }}
        >
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-t-transparent" style={{ borderColor: `${colorTheme.subtext} transparent ${colorTheme.subtext} ${colorTheme.subtext}` }} />
          <p className="mt-4">Finding destinations with similar weather...</p>
        </motion.div>
      )}

      {error && (
        <div 
          className="text-center py-12 text-red-500"
        >
          {error}
        </div>
      )}

      {showDestinations && destinations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {destinations.map((dest, index) => (
            <motion.a
              key={dest.city}
              href={dest.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg aspect-[4/3]"
            >
              <img 
                src={dest.imageUrl} 
                alt={dest.city}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{dest.city}</h3>
                      <p className="text-sm opacity-90">{dest.temperature}°C average</p>
                    </div>
                    <Plane className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm mt-1 opacity-80">{dest.description}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      )}

      {showDestinations && destinations.length === 0 && (
        <div 
          className="text-center py-12"
          style={{ color: colorTheme.subtext }}
        >
          No destinations found with similar weather right now. Try a different temperature range!
        </div>
      )}
    </div>
  );
};