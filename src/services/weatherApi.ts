import axios from 'axios';
import { WeatherData } from '../types';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';

// Rate limiting
const CALLS_PER_MINUTE = 60;
const calls: number[] = [];

const checkRateLimit = () => {
  const now = Date.now();
  const oneMinuteAgo = now - 60000;
  
  // Remove calls older than 1 minute
  while (calls.length > 0 && calls[0] < oneMinuteAgo) {
    calls.shift();
  }
  
  // Check if we're within rate limit
  if (calls.length >= CALLS_PER_MINUTE) {
    throw new Error('Rate limit exceeded. Please try again in a minute.');
  }
  
  // Add current call
  calls.push(now);
};

const processWeatherData = (data: any): WeatherData => {
  if (!data || !data.current || !data.current.weather?.[0]) {
    throw new Error('Invalid weather data received from API');
  }

  return {
    temperature: Math.round(data.current.temp),
    condition: mapWeatherCondition(data.current.weather[0].main.toLowerCase()),
    humidity: data.current.humidity,
    windSpeed: Math.round(data.current.wind_speed),
    location: data.timezone.split('/').pop().replace('_', ' ') // Format location from timezone
  };
};

// We'll need coordinates for One Call API, so we'll need to geocode the city first
const geocodeCity = async (city: string): Promise<[number, number]> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
    );
    
    if (!response.data?.[0]?.lat || !response.data?.[0]?.lon) {
      throw new Error(`City "${city}" not found`);
    }
    
    return [response.data[0].lat, response.data[0].lon];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Geocoding error: ${error.response?.data?.message || error.message}`);
    }
    throw error;
  }
};

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  try {
    checkRateLimit();
    
    // First get coordinates for the city
    const [lat, lon] = await geocodeCity(city);
    
    // Then fetch weather data
    return fetchWeatherByCoords(lat, lon);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch weather data');
  }
};

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    checkRateLimit();
    
    const response = await axios.get(BASE_URL, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
        exclude: 'minutely,hourly,daily,alerts' // Only get current weather
      }
    });

    return processWeatherData(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeather API key.');
      }
      throw new Error(`Weather API error: ${error.response?.data?.message || error.message}`);
    }
    throw error;
  }
};

const mapWeatherCondition = (condition: string): string => {
  const conditionMap: { [key: string]: string } = {
    'clear': 'clear',
    'clouds': 'cloudy',
    'rain': 'rain',
    'drizzle': 'rain',
    'thunderstorm': 'storm',
    'snow': 'snow',
    'mist': 'fog',
    'fog': 'fog',
    'haze': 'haze',
    'dust': 'haze',
    'smoke': 'haze',
    'tornado': 'tornado'
  };

  return conditionMap[condition] || 'clear';
};