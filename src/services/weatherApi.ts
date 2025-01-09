import axios from 'axios';
import { WeatherData } from '../types';
import { formatCurrentDate } from '../utils/dateFormatter';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';

// Rate limiting
const CALLS_PER_MINUTE = 60;
const calls: number[] = [];

const checkRateLimit = () => {
  const now = Date.now();
  const oneMinuteAgo = now - 60000;
  
  while (calls.length > 0 && calls[0] < oneMinuteAgo) {
    calls.shift();
  }
  
  if (calls.length >= CALLS_PER_MINUTE) {
    throw new Error('Rate limit exceeded. Please try again in a minute.');
  }
  
  calls.push(now);
};

const processWeatherData = (data: any, locationName: string): WeatherData => {
  if (!data || !data.current || !data.current.weather?.[0] || !data.daily?.[1]) {
    throw new Error('Invalid weather data received from API');
  }

  const tomorrow = data.daily[1];
  
  return {
    temperature: Math.round(data.current.temp),
    condition: mapWeatherCondition(data.current.weather[0].main.toLowerCase()),
    humidity: data.current.humidity,
    windSpeed: Math.round(data.current.wind_speed),
    location: locationName,
    currentDate: formatCurrentDate(),
    tomorrow: {
      temperature: Math.round(tomorrow.temp.day),
      condition: mapWeatherCondition(tomorrow.weather[0].main.toLowerCase()),
      date: new Date(tomorrow.dt * 1000).toLocaleDateString('en-US', { 
        weekday: 'long'
      })
    }
  };
};

// Format location name with city, state (if available), and country
const formatLocationName = (location: any): string => {
  const parts = [];
  
  if (location.name) {
    parts.push(location.name);
  }
  
  if (location.state) {
    parts.push(location.state);
  }
  
  if (location.country && location.country !== 'US') {
    parts.push(location.country);
  }
  
  return parts.join(', ');
};

const geocodeCity = async (city: string): Promise<[number, number, string]> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
    );
    
    if (!response.data?.[0]?.lat || !response.data?.[0]?.lon) {
      throw new Error(`City "${city}" not found`);
    }
    
    const locationName = formatLocationName(response.data[0]);
    return [response.data[0].lat, response.data[0].lon, locationName];
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
    
    const [lat, lon, locationName] = await geocodeCity(city);
    
    return fetchWeatherByCoords(lat, lon, locationName);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch weather data');
  }
};

export const fetchWeatherByCoords = async (
  lat: number, 
  lon: number, 
  locationName?: string
): Promise<WeatherData> => {
  try {
    checkRateLimit();
    
    let finalLocationName = locationName;
    if (!finalLocationName) {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
      );
      if (response.data?.[0]) {
        finalLocationName = formatLocationName(response.data[0]);
      }
    }
    
    const response = await axios.get(BASE_URL, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
        exclude: 'minutely,hourly,alerts'
      }
    });

    return processWeatherData(response.data, finalLocationName || 'Unknown Location');
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