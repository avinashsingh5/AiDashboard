import React from 'react';
import { AlertCircle, ChevronRight, Clock, MapPin } from 'lucide-react';
import { Incident } from '../../types';
import { useIncidentStore } from '../../store/incidentStore';
import { useChatStore } from '../../store/chatStore';
import { motion } from 'framer-motion';

interface IncidentCardProps {
  incident: Incident;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident }) => {
  const { setSelectedIncident, toggleDetailModal } = useIncidentStore();
  const { addMessage, generateResponse } = useChatStore();
  
  // Format date
  const formattedDate = new Date(incident.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  
  // Define severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-severity-critical text-white shadow-neon-red animate-glow-pulse-critical';
      case 'High':
        return 'bg-severity-high text-white shadow-neon-orange animate-glow-pulse-high';
      case 'Medium':
        return 'bg-severity-medium text-black';
      case 'Low':
      default:
        return 'bg-severity-low text-white';
    }
  };
  
  const handleClick = () => {
    setSelectedIncident(incident);
    toggleDetailModal();
    
    // Add incident query to chat and generate response
    addMessage(`Tell me about the "${incident.title}" incident`, 'user');
    generateResponse(incident.severity);
  };
  
  return (
    <motion.div 
      className="glass rounded-lg overflow-hidden mb-3 border border-white/10 tilt-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      onClick={handleClick}
    >
      {incident.imageUrl && (
        <div className="h-32 overflow-hidden">
          <img 
            src={incident.imageUrl} 
            alt={incident.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
            {incident.severity}
          </span>
          <span className="text-xs text-gray-400 flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {formattedDate}
          </span>
        </div>
        
        <h3 className="font-medium text-md mb-2">{incident.title}</h3>
        
        <div className="flex items-center text-xs text-gray-400 mb-3">
          <MapPin className="w-3 h-3 mr-1" />
          <span>{incident.location.name}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {incident.vectors.map((vector, index) => (
            <span 
              key={index}
              className="px-2 py-0.5 rounded-full text-xs bg-primary-500/20 text-primary-300"
            >
              {vector}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <span className={`flex items-center text-xs ${
            incident.status === 'Active' 
              ? 'text-severity-high' 
              : incident.status === 'Contained' 
                ? 'text-severity-medium' 
                : 'text-success-500'
          }`}>
            <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
              incident.status === 'Active' 
                ? 'bg-severity-high' 
                : incident.status === 'Contained' 
                  ? 'bg-severity-medium' 
                  : 'bg-success-500'
            }`}></span>
            {incident.status}
          </span>
          
          <button className="text-xs text-primary-400 hover:text-primary-300 transition-colors flex items-center">
            Details <ChevronRight className="w-3 h-3 ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default IncidentCard;