export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
}

export interface ColorTheme {
  background: string;
  text: string;
  subtext: string;
}

export type WeatherCondition = 
  | 'clear'
  | 'cloudy'
  | 'rain'
  | 'storm'
  | 'snow'
  | 'sleet'
  | 'fog'
  | 'wind'
  | 'tornado'
  | 'fire'
  | 'haze';