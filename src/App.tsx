import React, { useState, useEffect, useCallback } from 'react';
import { WeatherDisplay } from './components/WeatherDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { getColorTheme, getWeatherMessage } from './utils/colors';
import { WeatherData } from './types';
import { fetchWeather, fetchWeatherByCoords } from './services/weatherApi';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState('London');

  const loadWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if ('geolocation' in navigator) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 5000,
              maximumAge: 0
            });
          });
          
          const data = await fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
          setWeather(data);
          setCity(data.location.split(',')[0]);
          return;
        } catch (geoError) {
          console.log('Geolocation failed, falling back to default city');
        }
      }

      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weather data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <ErrorDisplay error={error || 'Unknown error'} onRetry={loadWeather} />
      </div>
    );
  }

  const colorTheme = getColorTheme(weather.temperature);
  const message = getWeatherMessage(weather.temperature, weather.condition);

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 transition-colors duration-500"
      style={{ backgroundColor: colorTheme.background }}
    >
      <div className="w-full max-w-4xl">
        <WeatherDisplay
          weather={weather}
          colorTheme={colorTheme}
          message={message}
        />
      </div>
    </div>
  );
}

export default App;