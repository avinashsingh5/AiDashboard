import React from 'react';
import IncidentCard from './IncidentCard';
import { useIncidentStore } from '../../store/incidentStore';
import { motion, AnimatePresence } from 'framer-motion';

const IncidentFeed: React.FC = () => {
  const { getFilteredIncidents, resetFilters } = useIncidentStore();
  
  const incidents = getFilteredIncidents();
  
  return (
    <div className="overflow-y-auto pr-2" style={{ maxHeight: '70vh' }}>
      <AnimatePresence mode="wait">
        {incidents.length > 0 ? (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {incidents.map((incident, index) => (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <IncidentCard incident={incident} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-10 glass rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-gray-400">No incidents found with the current filters.</p>
            <button 
              onClick={resetFilters}
              className="mt-2 text-primary-400 hover:text-primary-300 transition-colors"
            >
              Reset filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IncidentFeed;