import React from 'react';
import Calendar from 'react-calendar';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { format } from 'date-fns';
import { Cloud, Sun, CloudRain } from 'lucide-react';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const WeatherCalendar: React.FC<{ weatherData: any }> = ({ weatherData }) => {
  const { theme } = useTheme();
  const [value, onChange] = React.useState<Value>(new Date());

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'cloudy':
        return <Cloud className="w-4 h-4" />;
      case 'rainy':
        return <CloudRain className="w-4 h-4" />;
      default:
        return <Sun className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl backdrop-blur-lg ${
        theme === 'blue' 
          ? 'bg-blue-900/30 text-blue-100' 
          : 'bg-yellow-900/30 text-yellow-100'
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Weather Calendar</h2>
      <Calendar
        onChange={onChange}
        value={value}
        className={`rounded-lg ${
          theme === 'blue' ? 'calendar-blue' : 'calendar-gold'
        }`}
        tileContent={({ date }) => {
          const formattedDate = format(date, 'yyyy-MM-dd');
          const dayWeather = weatherData?.forecast?.forecastday?.find(
            (day: any) => day.date === formattedDate
          );
          
          return dayWeather ? (
            <div className="flex items-center justify-center mt-1">
              {getWeatherIcon(dayWeather.day.condition.text)}
              <span className="text-xs ml-1">
                {Math.round(dayWeather.day.avgtemp_c)}°C
              </span>
            </div>
          ) : null;
        }}
      />
    </motion.div>
  );
};

export default WeatherCalendar;