import { create } from 'zustand';
import { Incident, SeverityFilter, VectorFilter, TimeFilter } from '../types';
import { mockIncidents } from '../data/mockData';

interface IncidentState {
  // Data
  incidents: Incident[];
  selectedIncident: Incident | null;
  
  // Filters
  severityFilter: SeverityFilter;
  vectorFilter: VectorFilter;
  timeFilter: TimeFilter;
  searchQuery: string;
  
  // UI State
  isDetailModalOpen: boolean;
  isReportModalOpen: boolean;
  
  // Actions
  setSelectedIncident: (incident: Incident | null) => void;
  setSeverityFilter: (severity: SeverityFilter) => void;
  setVectorFilter: (vector: VectorFilter) => void;
  setTimeFilter: (timeFilter: TimeFilter) => void;
  setSearchQuery: (query: string) => void;
  toggleDetailModal: () => void;
  toggleReportModal: () => void;
  getFilteredIncidents: () => Incident[];
  getAllVectors: () => string[];
  resetFilters: () => void;
}

// Helper to get default time filter (last year to now)
const getDefaultTimeFilter = (): TimeFilter => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  return { startDate, endDate };
};

const defaultState = {
  severityFilter: 'All' as SeverityFilter,
  vectorFilter: 'All' as VectorFilter,
  timeFilter: getDefaultTimeFilter(),
  searchQuery: '',
};

export const useIncidentStore = create<IncidentState>((set, get) => ({
  // Initial Data
  incidents: mockIncidents,
  selectedIncident: null,
  
  // Initial Filters
  ...defaultState,
  
  // Initial UI State
  isDetailModalOpen: false,
  isReportModalOpen: false,
  
  // Actions
  setSelectedIncident: (incident) => set({ selectedIncident: incident }),
  
  setSeverityFilter: (severity) => set({ severityFilter: severity }),
  
  setVectorFilter: (vector) => set({ vectorFilter: vector }),
  
  setTimeFilter: (timeFilter) => set({ timeFilter }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  toggleDetailModal: () => set((state) => ({ 
    isDetailModalOpen: !state.isDetailModalOpen 
  })),
  
  toggleReportModal: () => set((state) => ({ 
    isReportModalOpen: !state.isReportModalOpen 
  })),
  
  resetFilters: () => set(defaultState),
  
  getFilteredIncidents: () => {
    const { 
      incidents, 
      severityFilter, 
      vectorFilter, 
      timeFilter, 
      searchQuery 
    } = get();
    
    return incidents.filter(incident => {
      // Apply severity filter
      if (severityFilter !== 'All' && incident.severity !== severityFilter) {
        return false;
      }
      
      // Apply vector filter
      if (vectorFilter !== 'All' && !incident.vectors.includes(vectorFilter)) {
        return false;
      }
      
      // Apply time filter
      const incidentDate = new Date(incident.date);
      const startOfDay = new Date(timeFilter.startDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(timeFilter.endDate);
      endOfDay.setHours(23, 59, 59, 999);
      
      if (incidentDate < startOfDay || incidentDate > endOfDay) {
        return false;
      }
      
      // Apply search query
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          incident.title.toLowerCase().includes(searchLower) ||
          incident.description.toLowerCase().includes(searchLower) ||
          incident.vectors.some(v => v.toLowerCase().includes(searchLower)) ||
          incident.location.name.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    }).sort((a, b) => {
      // Sort by date (newest first) and then by severity
      const dateCompare = new Date(b.date).getTime() - new Date(a.date).getTime();
      if (dateCompare !== 0) return dateCompare;
      
      const severityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    });
  },
  
  getAllVectors: () => {
    const { incidents } = get();
    const vectorsSet = new Set<string>();
    
    incidents.forEach(incident => {
      incident.vectors.forEach(vector => {
        vectorsSet.add(vector);
      });
    });
    
    return Array.from(vectorsSet).sort();
  }
}));