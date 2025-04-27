import React, { useState } from 'react';
import { Siren, AlertTriangle, X, Camera, Mic, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PanicButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [captureMethod, setCaptureMethod] = useState<'screen' | 'text' | null>(null);
  const [incidentText, setIncidentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
        setCaptureMethod(null);
        setIncidentText('');
      }, 3000);
    }, 2000);
  };
  
  return (
    <>
      {/* Panic Button */}
      <motion.button
        className="px-4 py-2 bg-severity-critical rounded-lg font-semibold flex items-center space-x-2 shadow-neon-red hover:bg-severity-critical/80 transition-colors"
        onClick={() => setIsOpen(true)}
        whileTap={{ scale: 0.95 }}
      >
        <Siren className="w-5 h-5" />
        <span>Report Emergency</span>
      </motion.button>
      
      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-xl glass rounded-lg border border-severity-critical/50 overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              {/* Header */}
              <div className="bg-severity-critical p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Siren className="w-6 h-6" />
                  <h2 className="font-display font-bold text-xl">Emergency Report</h2>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6">
                {!captureMethod && !isSubmitted ? (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 text-severity-critical">
                      <AlertTriangle className="w-6 h-6" />
                      <p className="font-medium">Submit an emergency report for critical AI safety incidents</p>
                    </div>
                    
                    <p className="text-gray-300">
                      Use this option ONLY for high-severity incidents requiring immediate attention. 
                      This will alert the AI safety response team immediately.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <motion.button
                        className="glass p-4 rounded-lg border border-white/10 hover:border-severity-critical/50 transition-colors text-center flex flex-col items-center justify-center space-y-2"
                        onClick={() => setCaptureMethod('screen')}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Camera className="w-8 h-8 text-severity-critical" />
                        <span className="font-medium">Capture Screenshot</span>
                        <p className="text-xs text-gray-400">Record visual evidence of the incident</p>
                      </motion.button>
                      
                      <motion.button
                        className="glass p-4 rounded-lg border border-white/10 hover:border-severity-critical/50 transition-colors text-center flex flex-col items-center justify-center space-y-2"
                        onClick={() => setCaptureMethod('text')}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <AlertTriangle className="w-8 h-8 text-severity-critical" />
                        <span className="font-medium">Text Description</span>
                        <p className="text-xs text-gray-400">Describe the incident in detail</p>
                      </motion.button>
                    </div>
                  </div>
                ) : captureMethod === 'screen' && !isSubmitted ? (
                  <div className="space-y-6">
                    <div className="glass border border-dashed border-white/30 rounded-lg p-6 flex flex-col items-center justify-center">
                      <Camera className="w-12 h-12 text-gray-400 mb-4" />
                      <p className="text-center text-gray-300 mb-2">
                        Click to capture your screen
                      </p>
                      <p className="text-center text-xs text-gray-400">
                        Your screen will be recorded for review by the AI safety team
                      </p>
                      <button 
                        className="mt-4 px-4 py-2 bg-severity-critical rounded-lg text-sm hover:bg-severity-critical/80 transition-colors"
                        onClick={() => handleSubmit()}
                      >
                        Capture Screen
                      </button>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="px-3 py-1 bg-transparent border border-white/20 rounded-lg text-sm hover:bg-white/5 transition-colors"
                        onClick={() => setCaptureMethod(null)}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                ) : captureMethod === 'text' && !isSubmitted ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium">
                        Describe the incident
                      </label>
                      <textarea
                        rows={5}
                        className="w-full glass rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-severity-critical"
                        placeholder="Provide as much detail as possible about what you're experiencing..."
                        value={incidentText}
                        onChange={(e) => setIncidentText(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block mb-2 text-sm font-medium">
                          Severity level
                        </label>
                        <select className="glass w-full p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-severity-critical">
                          <option value="critical">Critical - Immediate danger</option>
                          <option value="high">High - Severe risk</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block mb-2 text-sm font-medium">
                          Location/System affected
                        </label>
                        <input
                          type="text"
                          className="w-full glass rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-severity-critical"
                          placeholder="e.g., Main AI cluster, Content moderation system"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="px-3 py-1 bg-transparent border border-white/20 rounded-lg text-sm hover:bg-white/5 transition-colors"
                        onClick={() => setCaptureMethod(null)}
                      >
                        Back
                      </button>
                      
                      <button 
                        className="px-4 py-2 bg-severity-critical rounded-lg text-sm hover:bg-severity-critical/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!incidentText.trim()}
                        onClick={handleSubmit}
                      >
                        Submit Report
                      </button>
                    </div>
                  </div>
                ) : isSubmitting ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="w-16 h-16 border-4 border-severity-critical border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="font-medium">Submitting emergency report...</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Alerting AI safety response team
                    </p>
                  </div>
                ) : isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="w-16 h-16 bg-success-500/20 rounded-full flex items-center justify-center mb-4">
                      <Check className="w-8 h-8 text-success-500" />
                    </div>
                    <p className="font-medium">Emergency report submitted</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Response team has been notified
                    </p>
                    <p className="mt-6 text-center text-xs text-gray-400">
                      You'll be contacted shortly with further instructions
                    </p>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PanicButton;