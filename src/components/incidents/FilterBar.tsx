import React from 'react';
import { Filter, Search } from 'lucide-react';
import { useIncidentStore } from '../../store/incidentStore';
import { motion } from 'framer-motion';
import { SeverityFilter, VectorFilter } from '../../types';

const FilterBar: React.FC = () => {
  const { 
    severityFilter, 
    vectorFilter,
    searchQuery,
    setSeverityFilter,
    setVectorFilter,
    setSearchQuery,
    getAllVectors
  } = useIncidentStore();
  
  const severityOptions: SeverityFilter[] = ['All', 'Critical', 'High', 'Medium', 'Low'];
  const vectorOptions: VectorFilter[] = ['All', ...getAllVectors()];
  
  return (
    <motion.div 
      className="glass p-4 rounded-lg"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search incidents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass py-2 pl-9 pr-4 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 w-full"
          />
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <label className="block text-xs text-gray-400 mb-1 ml-1">Severity</label>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as SeverityFilter)}
              className="glass py-2 px-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 appearance-none pr-8 min-w-[120px]"
            >
              {severityOptions.map(severity => (
                <option key={severity} value={severity}>{severity}</option>
              ))}
            </select>
            <Filter className="absolute right-3 bottom-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          
          <div className="relative">
            <label className="block text-xs text-gray-400 mb-1 ml-1">Vector</label>
            <select
              value={vectorFilter}
              onChange={(e) => setVectorFilter(e.target.value as VectorFilter)}
              className="glass py-2 px-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 appearance-none pr-8 min-w-[160px]"
            >
              {vectorOptions.map(vector => (
                <option key={vector} value={vector}>{vector}</option>
              ))}
            </select>
            <Filter className="absolute right-3 bottom-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;