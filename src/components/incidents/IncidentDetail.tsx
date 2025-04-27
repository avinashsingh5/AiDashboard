import React from 'react';
import { X, Shield, AlertTriangle, MapPin, Calendar, Tag, FileText, Check } from 'lucide-react';
import { useIncidentStore } from '../../store/incidentStore';
import { motion, AnimatePresence } from 'framer-motion';

const IncidentDetail: React.FC = () => {
  const { selectedIncident, isDetailModalOpen, toggleDetailModal } = useIncidentStore();
  
  if (!selectedIncident) return null;
  
  // Format date
  const formattedDate = new Date(selectedIncident.date).toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  // Define severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-severity-critical text-white shadow-neon-red';
      case 'High':
        return 'bg-severity-high text-white shadow-neon-orange';
      case 'Medium':
        return 'bg-severity-medium text-black';
      case 'Low':
      default:
        return 'bg-severity-low text-white';
    }
  };
  
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Critical':
      case 'High':
        return <Shield className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };
  
  return (
    <AnimatePresence>
      {isDetailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
          <motion.div 
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-lg border border-white/10 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <button 
              onClick={toggleDetailModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Header with image */}
            {selectedIncident.imageUrl && (
              <div className="h-48 md:h-64 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent z-0"></div>
                <img 
                  src={selectedIncident.imageUrl} 
                  alt={selectedIncident.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute left-6 bottom-6 right-6 z-10">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 ${getSeverityColor(selectedIncident.severity)}`}>
                      {getSeverityIcon(selectedIncident.severity)}
                      <span>{selectedIncident.severity}</span>
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedIncident.status === 'Active' 
                        ? 'bg-severity-high/20 text-severity-high' 
                        : selectedIncident.status === 'Contained' 
                          ? 'bg-severity-medium/20 text-severity-medium' 
                          : 'bg-success-500/20 text-success-500'
                    }`}>
                      {selectedIncident.status}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold neon-text">
                    {selectedIncident.title}
                  </h2>
                </div>
              </div>
            )}
            
            {/* Content */}
            <div className="p-6">
              {!selectedIncident.imageUrl && (
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 ${getSeverityColor(selectedIncident.severity)}`}>
                      {getSeverityIcon(selectedIncident.severity)}
                      <span>{selectedIncident.severity}</span>
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedIncident.status === 'Active' 
                        ? 'bg-severity-high/20 text-severity-high' 
                        : selectedIncident.status === 'Contained' 
                          ? 'bg-severity-medium/20 text-severity-medium' 
                          : 'bg-success-500/20 text-success-500'
                    }`}>
                      {selectedIncident.status}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold">
                    {selectedIncident.title}
                  </h2>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="glass p-4 rounded-lg mb-6">
                    <div className="flex items-start space-x-2 mb-3">
                      <FileText className="w-5 h-5 text-primary-400 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">Description</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {selectedIncident.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {selectedIncident.mitigationSteps && (
                    <div className="glass p-4 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Shield className="w-5 h-5 text-primary-400 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-2">Mitigation Steps</h3>
                          <ul className="text-sm text-gray-300 space-y-2">
                            {selectedIncident.mitigationSteps.map((step, index) => (
                              <li key={index} className="flex items-start">
                                <Check className="w-4 h-4 text-success-500 mr-2 mt-0.5 shrink-0" />
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="md:col-span-1 space-y-4">
                  <div className="glass p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Incident Details</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 text-primary-400 mr-2" />
                        <span>{selectedIncident.location.name}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 text-primary-400 mr-2" />
                        <span>{formattedDate}</span>
                      </div>
                      
                      <div className="flex items-start text-sm">
                        <Tag className="w-4 h-4 text-primary-400 mr-2 mt-1" />
                        <div className="flex flex-wrap gap-1">
                          {selectedIncident.vectors.map((vector, index) => (
                            <span 
                              key={index}
                              className="px-2 py-0.5 rounded-full text-xs bg-primary-500/20 text-primary-300"
                            >
                              {vector}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {selectedIncident.affectedSystems && (
                    <div className="glass p-4 rounded-lg">
                      <h3 className="font-semibold mb-3">Affected Systems</h3>
                      <ul className="text-sm space-y-1.5">
                        {selectedIncident.affectedSystems.map((system, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-primary-400 mr-2"></span>
                            <span>{system}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="glass p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Risk Assessment</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Impact</span>
                          <span className="font-medium text-severity-high">High</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-severity-high h-2 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Probability</span>
                          <span className="font-medium text-severity-medium">Medium</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-severity-medium h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Mitigation Difficulty</span>
                          <span className="font-medium text-primary-400">Medium</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-primary-400 h-2 rounded-full" style={{ width: '50%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Generate Detailed Report
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default IncidentDetail;