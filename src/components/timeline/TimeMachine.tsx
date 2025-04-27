import React, { useState } from 'react';
import { useIncidentStore } from '../../store/incidentStore';
import { motion } from 'framer-motion';

const TimeMachine: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [selectedMonth, setSelectedMonth] = useState<number>(3);
  
  const { incidents, timeFilter, setTimeFilter } = useIncidentStore();
  
  // Get unique years and months from incidents
  const years = Array.from(
    new Set(incidents.map(incident => incident.timeline[0]))
  ).sort().reverse();
  
  const months = [
    { value: 1, label: 'Jan' },
    { value: 2, label: 'Feb' },
    { value: 3, label: 'Mar' },
    { value: 4, label: 'Apr' },
    { value: 5, label: 'May' },
    { value: 6, label: 'Jun' },
    { value: 7, label: 'Jul' },
    { value: 8, label: 'Aug' },
    { value: 9, label: 'Sep' },
    { value: 10, label: 'Oct' },
    { value: 11, label: 'Nov' },
    { value: 12, label: 'Dec' }
  ];
  
  // Count incidents by month for the selected year
  const incidentsByMonth = months.map(month => {
    return {
      ...month,
      count: incidents.filter(
        incident => 
          incident.timeline[0] === selectedYear && 
          incident.timeline[1] === month.value
      ).length
    };
  });
  
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    
    // Update time filter
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    setTimeFilter({ startDate, endDate });
  };
  
  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    
    // Update time filter
    const startDate = new Date(selectedYear, month - 1, 1);
    const lastDay = new Date(selectedYear, month, 0).getDate();
    const endDate = new Date(selectedYear, month - 1, lastDay);
    setTimeFilter({ startDate, endDate });
  };
  
  const getIncidentCountForYear = (year: number) => {
    return incidents.filter(incident => incident.timeline[0] === year).length;
  };
  
  return (
    <div className="glass p-4 rounded-lg">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Year selector */}
        <div className="flex-1">
          <h3 className="text-sm text-gray-400 mb-2">Select Year</h3>
          <div className="space-y-2">
            {years.map(year => (
              <motion.button
                key={year}
                className={`w-full text-left px-3 py-2 rounded-lg flex justify-between items-center ${
                  selectedYear === year 
                    ? 'bg-primary-500/30 text-white' 
                    : 'hover:bg-primary-500/10 text-gray-300'
                } transition-colors`}
                onClick={() => handleYearChange(year)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-medium">{year}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-primary-500/20 text-primary-300 px-2 py-0.5 rounded-full">
                    {getIncidentCountForYear(year)}
                  </span>
                  {selectedYear === year && (
                    <div className="w-2 h-2 rounded-full bg-primary-400"></div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Month selector */}
        <div className="flex-1">
          <h3 className="text-sm text-gray-400 mb-2">Select Month</h3>
          <div className="grid grid-cols-3 gap-2">
            {incidentsByMonth.map(month => (
              <motion.button
                key={month.value}
                className={`px-3 py-2 rounded-lg text-center relative ${
                  selectedMonth === month.value 
                    ? 'bg-primary-500/30 text-white' 
                    : month.count > 0 
                      ? 'hover:bg-primary-500/10 text-gray-300' 
                      : 'text-gray-500 cursor-default'
                } transition-colors`}
                onClick={() => month.count > 0 && handleMonthChange(month.value)}
                whileHover={month.count > 0 ? { y: -5 } : {}}
                whileTap={month.count > 0 ? { scale: 0.95 } : {}}
              >
                <span className="font-medium">{month.label}</span>
                {month.count > 0 && (
                  <motion.div 
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-full px-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="h-1 rounded-full bg-primary-400" 
                      style={{ width: `${Math.min(100, month.count * 25)}%`, margin: '0 auto' }}
                    ></div>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Timeline visualization */}
      <div className="mt-6">
        <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
          {incidents
            .filter(incident => incident.timeline[0] === selectedYear)
            .map(incident => {
              // Calculate position based on month and day
              const month = incident.timeline[1] - 1;
              const day = incident.timeline[2];
              const position = ((month * 30 + day) / 365) * 100;
              
              return (
                <div 
                  key={incident.id}
                  className="absolute top-0 h-full w-1"
                  style={{ left: `${position}%` }}
                >
                  <div 
                    className={`h-full w-1 ${
                      incident.severity === 'Critical' 
                        ? 'bg-severity-critical' 
                        : incident.severity === 'High' 
                          ? 'bg-severity-high' 
                          : incident.severity === 'Medium' 
                            ? 'bg-severity-medium' 
                            : 'bg-severity-low'
                    }`}
                  ></div>
                </div>
              );
            })}
          
          {/* Current selection indicator */}
          <div
            className="absolute top-0 h-full w-2 bg-white"
            style={{ 
              left: `${((selectedMonth - 1) * 30 + 15) / 365 * 100}%`,
              transform: 'translateX(-50%)'
            }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <div>Jan</div>
          <div>Apr</div>
          <div>Jul</div>
          <div>Oct</div>
          <div>Dec</div>
        </div>
      </div>
    </div>
  );
};

export default TimeMachine;