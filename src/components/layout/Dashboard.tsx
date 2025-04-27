import React from 'react';
import { AlertTriangle, ArrowUpRight, Clock, Layers, Map, Shield } from 'lucide-react';
import IncidentFeed from '../incidents/IncidentFeed';
import ThreeDMap from '../map/ThreeDMap';
import TimeMachine from '../timeline/TimeMachine';
import PanicButton from '../reporting/PanicButton';
import FilterBar from '../incidents/FilterBar';
import { useIncidentStore } from '../../store/incidentStore';
import Metrics from '../dashboard/Metrics';

const Dashboard: React.FC = () => {
  const { incidents } = useIncidentStore();
  
  // Calculate statistics
  const criticalCount = incidents.filter(i => i.severity === 'Critical').length;
  const highCount = incidents.filter(i => i.severity === 'High').length;
  const activeCount = incidents.filter(i => i.status === 'Active').length;
  
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold">
            Incident Dashboard
          </h1>
          <p className="text-gray-400">
            Monitor and respond to AI safety incidents
          </p>
        </div>
        
        <PanicButton />
      </div>
      
      {/* Metrics */}
      <Metrics />
      
      {/* Filter bar */}
      <FilterBar />
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Incident feed */}
        <div className="lg:col-span-1 space-y-6">
          <div className="hud-panel">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Layers className="w-5 h-5 text-primary-400 mr-2" />
                <h2 className="font-display text-lg">Incident Feed</h2>
              </div>
              <a href="#" className="text-primary-400 text-sm flex items-center hover:text-primary-300 transition-colors">
                View all <ArrowUpRight className="w-3 h-3 ml-1" />
              </a>
            </div>
            
            <IncidentFeed />
          </div>
        </div>
        
        {/* Right column - Map and timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="hud-panel h-[400px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Map className="w-5 h-5 text-primary-400 mr-2" />
                <h2 className="font-display text-lg">Global Threat Map</h2>
              </div>
              <div className="flex space-x-2">
                <div className="flex items-center text-xs">
                  <div className="w-2 h-2 rounded-full bg-severity-critical mr-1"></div>
                  <span>Critical</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-2 h-2 rounded-full bg-severity-high mr-1"></div>
                  <span>High</span>
                </div>
              </div>
            </div>
            
            <ThreeDMap />
          </div>
          
          <div className="hud-panel">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-primary-400 mr-2" />
                <h2 className="font-display text-lg">Time Machine</h2>
              </div>
            </div>
            
            <TimeMachine />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;