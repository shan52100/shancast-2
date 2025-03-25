import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Heart } from 'lucide-react';

const Navbar = ({ onFavoritesClick }: { onFavoritesClick: () => void }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 bg-black/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.h1 
            className={`text-2xl font-bold ${
              theme === 'blue' ? 'text-theme-blue-light' : 'text-theme-gold-light'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ShanCast
          </motion.h1>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onFavoritesClick}
              className={`p-2 rounded-full transition-all ${
                theme === 'blue' ? 'bg-blue-500/20' : 'bg-yellow-500/20'
              }`}
            >
              <Heart className={`h-6 w-6 ${
                theme === 'blue' ? 'text-theme-blue-light' : 'text-theme-gold-light'
              }`} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all ${
                theme === 'blue' ? 'bg-blue-500/20' : 'bg-yellow-500/20'
              }`}
            >
              {theme === 'blue' ? (
                <Sun className="h-6 w-6 text-theme-blue-light" />
              ) : (
                <Moon className="h-6 w-6 text-theme-gold-light" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;