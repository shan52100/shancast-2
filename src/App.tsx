import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from './components/Navbar';
import WeatherDashboard from './components/WeatherDashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen w-full">
          <Navbar />
          <WeatherDashboard />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;