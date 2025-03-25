import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const WeatherCharts: React.FC<{ weatherData: any }> = ({ weatherData }) => {
  const { theme } = useTheme();

  const prepareHourlyData = () => {
    if (!weatherData?.forecast?.forecastday?.[0]?.hour) return [];

    return [
      {
        id: 'temperature',
        data: weatherData.forecast.forecastday[0].hour.map((hour: any) => ({
          x: hour.time.split(' ')[1],
          y: hour.temp_c
        }))
      }
    ];
  };

  const prepareWeeklyData = () => {
    if (!weatherData?.forecast?.forecastday) return [];

    return [
      {
        id: 'max_temp',
        data: weatherData.forecast.forecastday.map((day: any) => ({
          x: day.date,
          y: day.day.maxtemp_c
        }))
      },
      {
        id: 'min_temp',
        data: weatherData.forecast.forecastday.map((day: any) => ({
          x: day.date,
          y: day.day.mintemp_c
        }))
      }
    ];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <motion.div 
        className={`p-6 rounded-xl backdrop-blur-lg h-[400px] ${
          theme === 'blue' 
            ? 'bg-blue-900/30 text-blue-100' 
            : 'bg-yellow-900/30 text-yellow-100'
        }`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-xl font-bold mb-4">24-Hour Forecast</h3>
        <ResponsiveLine
          data={prepareHourlyData()}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          curve="natural"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: 'Time',
            legendOffset: 40,
            legendPosition: 'middle'
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Temperature (°C)',
            legendOffset: -40,
            legendPosition: 'middle'
          }}
          enablePoints={true}
          pointSize={8}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          enableArea={true}
          areaOpacity={0.15}
          colors={theme === 'blue' ? ['#60a5fa'] : ['#fbbf24']}
          theme={{
            axis: {
              ticks: {
                text: {
                  fill: theme === 'blue' ? '#bfdbfe' : '#fef3c7'
                }
              },
              legend: {
                text: {
                  fill: theme === 'blue' ? '#bfdbfe' : '#fef3c7'
                }
              }
            },
            grid: {
              line: {
                stroke: theme === 'blue' ? '#1e40af33' : '#92400e33'
              }
            }
          }}
        />
      </motion.div>

      <motion.div 
        className={`p-6 rounded-xl backdrop-blur-lg h-[400px] ${
          theme === 'blue' 
            ? 'bg-blue-900/30 text-blue-100' 
            : 'bg-yellow-900/30 text-yellow-100'
        }`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-xl font-bold mb-4">7-Day Forecast</h3>
        <ResponsiveLine
          data={prepareWeeklyData()}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          curve="natural"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: 'Date',
            legendOffset: 40,
            legendPosition: 'middle'
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Temperature (°C)',
            legendOffset: -40,
            legendPosition: 'middle'
          }}
          enablePoints={true}
          pointSize={8}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          colors={theme === 'blue' ? ['#60a5fa', '#1d4ed8'] : ['#fbbf24', '#92400e']}
          theme={{
            axis: {
              ticks: {
                text: {
                  fill: theme === 'blue' ? '#bfdbfe' : '#fef3c7'
                }
              },
              legend: {
                text: {
                  fill: theme === 'blue' ? '#bfdbfe' : '#fef3c7'
                }
              }
            },
            grid: {
              line: {
                stroke: theme === 'blue' ? '#1e40af33' : '#92400e33'
              }
            },
            legends: {
              text: {
                fill: theme === 'blue' ? '#bfdbfe' : '#fef3c7'
              }
            }
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default WeatherCharts;