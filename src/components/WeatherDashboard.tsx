import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from 'react-query';
import { getWeatherData } from '../services/weatherApi';
import { useTheme } from '../context/ThemeContext';
import WeatherCharts from './WeatherCharts';
import Navbar from './Navbar';
import { Search, MapPin, Wind, Droplets, Sun, Cloud, CloudRain, Heart, X } from 'lucide-react';
import cities from 'cities.json';

const WeatherDashboard = () => {
  const { theme } = useTheme();
  const [city, setCity] = useState('London');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteCities');
    return saved ? JSON.parse(saved) : ['London', 'Tokyo', 'New York'];
  });
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: weatherData, isLoading } = useQuery(
    ['weather', city],
    () => getWeatherData(city),
    { refetchInterval: 300000 }
  );

  useEffect(() => {
    localStorage.setItem('favoriteCities', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCities = searchTerm
    ? (cities as any[])
        .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 10)
        .map(c => c.name)
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      setCity(searchTerm);
      setShowDropdown(false);
    }
  };

  const toggleFavorite = (cityName: string) => {
    setFavorites(prev => 
      prev.includes(cityName)
        ? prev.filter(c => c !== cityName)
        : [...prev, cityName]
    );
  };

  const getWeatherBackground = (condition: string) => {
    const baseClass = theme === 'blue' 
      ? 'from-black to-blue-600'
      : 'from-black to-yellow-600';

    switch (condition?.toLowerCase()) {
      case 'rain':
      case 'drizzle':
        return `bg-gradient-to-r ${baseClass} opacity-80`;
      case 'snow':
        return `bg-gradient-to-r ${baseClass} opacity-90`;
      case 'clear':
        return `bg-gradient-to-r ${baseClass} opacity-70`;
      case 'clouds':
        return `bg-gradient-to-r ${baseClass} opacity-85`;
      default:
        return `bg-gradient-to-r ${baseClass}`;
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition?.toLowerCase()) {
      case 'cloudy':
        return <Cloud className="w-8 h-8" />;
      case 'rainy':
        return <CloudRain className="w-8 h-8" />;
      default:
        return <Sun className="w-8 h-8" />;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      getWeatherBackground(weatherData?.current?.condition?.text)
    }`}>
      <Navbar onFavoritesClick={() => setShowFavorites(!showFavorites)} />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSearch}
            className="flex justify-center"
            ref={searchRef}
          >
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                }}
                placeholder="Search for any city..."
                className={`w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-lg border ${
                  theme === 'blue' 
                    ? 'border-blue-300/50 text-blue-100' 
                    : 'border-yellow-300/50 text-yellow-100'
                } placeholder-gray-300 focus:outline-none focus:ring-2 ${
                  theme === 'blue' ? 'focus:ring-blue-500' : 'focus:ring-yellow-500'
                }`}
              />
              <button
                type="submit"
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md ${
                  theme === 'blue' ? 'text-blue-300' : 'text-yellow-300'
                }`}
              >
                <Search className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {showDropdown && filteredCities.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute z-50 w-full mt-2 rounded-lg backdrop-blur-lg ${
                      theme === 'blue' 
                        ? 'bg-blue-900/30 border-blue-300/50' 
                        : 'bg-yellow-900/30 border-yellow-300/50'
                    } border max-h-60 overflow-y-auto`}
                  >
                    {filteredCities.map((city, index) => (
                      <motion.button
                        key={city}
                        whileHover={{ scale: 1.02, x: 10 }}
                        onClick={() => {
                          setSearchTerm(city);
                          setCity(city);
                          setShowDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 ${
                          theme === 'blue' 
                            ? 'text-blue-100 hover:bg-blue-500/20' 
                            : 'text-yellow-100 hover:bg-yellow-500/20'
                        } ${index !== 0 ? 'border-t border-gray-600/30' : ''}`}
                      >
                        {city}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>

          <AnimatePresence>
            {showFavorites && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
                  theme === 'blue' ? 'bg-blue-900/50' : 'bg-yellow-900/50'
                } backdrop-blur-sm`}
              >
                <motion.div
                  className={`w-full max-w-md rounded-xl ${
                    theme === 'blue' ? 'bg-blue-900/80' : 'bg-yellow-900/80'
                  } p-6 backdrop-blur-lg`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className={`text-xl font-bold ${
                      theme === 'blue' ? 'text-blue-100' : 'text-yellow-100'
                    }`}>
                      Favorite Cities
                    </h2>
                    <button
                      onClick={() => setShowFavorites(false)}
                      className={theme === 'blue' ? 'text-blue-100' : 'text-yellow-100'}
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {favorites.map((favCity) => (
                      <motion.button
                        key={favCity}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setCity(favCity);
                          setShowFavorites(false);
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-lg ${
                          theme === 'blue' 
                            ? 'bg-blue-800/50 hover:bg-blue-700/50' 
                            : 'bg-yellow-800/50 hover:bg-yellow-700/50'
                        }`}
                      >
                        <span className={
                          theme === 'blue' ? 'text-blue-100' : 'text-yellow-100'
                        }>{favCity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(favCity);
                          }}
                        >
                          <Heart className={`w-5 h-5 ${
                            theme === 'blue' ? 'text-blue-300' : 'text-yellow-300'
                          } fill-current`} />
                        </button>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {isLoading ? (
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
                theme === 'blue' ? 'border-blue-300' : 'border-yellow-300'
              }`}></div>
            </motion.div>
          ) : weatherData ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-8 rounded-xl backdrop-blur-lg ${
                  theme === 'blue' 
                    ? 'bg-blue-900/30 text-blue-100' 
                    : 'bg-yellow-900/30 text-yellow-100'
                }`}
              >
                <motion.div 
                  className="flex flex-col md:flex-row justify-between items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center mb-4 md:mb-0">
                    <MapPin className="w-8 h-8 mr-3" />
                    <h1 className="text-4xl font-bold">{weatherData.location.name}</h1>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleFavorite(weatherData.location.name)}
                      className="ml-4"
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          favorites.includes(weatherData.location.name) ? 'fill-current' : ''
                        } ${
                          theme === 'blue' ? 'text-blue-300' : 'text-yellow-300'
                        }`}
                      />
                    </motion.button>
                  </div>
                  <div className="flex items-center space-x-8">
                    <motion.div 
                      className="flex items-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Wind className="w-6 h-6 mr-2" />
                      <span>{weatherData.current.wind_kph} km/h</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Droplets className="w-6 h-6 mr-2" />
                      <span>{weatherData.current.humidity}%</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Sun className="w-6 h-6 mr-2" />
                      <span>UV: {weatherData.current.uv}</span>
                    </motion.div>
                  </div>
                </motion.div>
                <motion.div 
                  className="mt-8 text-center"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center justify-center space-x-4">
                    {getWeatherIcon(weatherData.current.condition.text)}
                    <div className="text-7xl font-bold">
                      {Math.round(weatherData.current.temp_c)}°C
                    </div>
                  </div>
                  <div className="text-2xl mt-2">{weatherData.current.condition.text}</div>
                </motion.div>
              </motion.div>

              <WeatherCharts weatherData={weatherData} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;