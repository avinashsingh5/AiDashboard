import React from 'react';
import { 
  AlertTriangle, 
  TrendingUp, 
  ShieldAlert, 
  Siren, 
  Globe, 
  Fingerprint
} from 'lucide-react';
import { useIncidentStore } from '../../store/incidentStore';

const Metrics: React.FC = () => {
  const { incidents } = useIncidentStore();
  
  // Calculate statistics
  const criticalCount = incidents.filter(i => i.severity === 'Critical').length;
  const highCount = incidents.filter(i => i.severity === 'High').length;
  const activeCount = incidents.filter(i => i.status === 'Active').length;
  const resolvedCount = incidents.filter(i => i.status === 'Resolved').length;
  
  // Get top vector
  const vectorCounts: Record<string, number> = {};
  incidents.forEach(incident => {
    incident.vectors.forEach(vector => {
      vectorCounts[vector] = (vectorCounts[vector] || 0) + 1;
    });
  });
  
  const topVector = Object.entries(vectorCounts)
    .sort((a, b) => b[1] - a[1])[0][0];
  
  const metrics = [
    {
      title: "Critical Incidents",
      value: criticalCount,
      icon: <Siren className="w-5 h-5" />,
      change: "+2",
      trend: "up",
      color: "text-severity-critical",
      bgColor: "bg-severity-critical/10",
      borderColor: "border-severity-critical/20",
      iconColor: "text-severity-critical"
    },
    {
      title: "High Severity",
      value: highCount,
      icon: <ShieldAlert className="w-5 h-5" />,
      change: "+3",
      trend: "up",
      color: "text-severity-high",
      bgColor: "bg-severity-high/10",
      borderColor: "border-severity-high/20",
      iconColor: "text-severity-high"
    },
    {
      title: "Active Cases",
      value: activeCount,
      icon: <AlertTriangle className="w-5 h-5" />,
      change: "-1",
      trend: "down",
      color: "text-primary-400",
      bgColor: "bg-primary-400/10",
      borderColor: "border-primary-400/20",
      iconColor: "text-primary-400"
    },
    {
      title: "Primary Vector",
      value: topVector,
      icon: <Fingerprint className="w-5 h-5" />,
      special: true,
      color: "text-severity-medium",
      bgColor: "bg-severity-medium/10",
      borderColor: "border-severity-medium/20",
      iconColor: "text-severity-medium"
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div 
          key={index}
          className={`glass rounded-lg p-4 border ${metric.borderColor} ${metric.bgColor} transition-all duration-300 hover:shadow-lg group`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">{metric.title}</p>
              {metric.special ? (
                <h3 className={`text-lg font-semibold ${metric.color}`}>
                  {metric.value}
                </h3>
              ) : (
                <h3 className={`text-2xl font-bold ${metric.color}`}>
                  {metric.value}
                </h3>
              )}
            </div>
            
            <div className={`p-2 rounded-full ${metric.bgColor} ${metric.iconColor}`}>
              {metric.icon}
            </div>
          </div>
          
          {!metric.special && (
            <div className="mt-2 flex items-center">
              <div className={`flex items-center space-x-1 ${
                metric.trend === 'up' ? 'text-severity-critical' : 'text-success-500'
              }`}>
                {metric.trend === 'up' ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingUp className="w-3 h-3 transform rotate-180" />
                )}
                <span className="text-xs font-medium">{metric.change}</span>
              </div>
              <span className="text-xs text-gray-400 ml-2">vs last month</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Metrics;