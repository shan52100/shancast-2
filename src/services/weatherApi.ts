import axios from 'axios';
import { WeatherData } from '../types/weather';

const API_KEY = 'b7b19907ecdc425e919152527252503';
const BASE_URL = 'https://api.weatherapi.com/v1';

export const getWeatherData = async (location: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: location,
        days: 7,
        aqi: 'yes'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};