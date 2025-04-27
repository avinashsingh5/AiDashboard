export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';

export interface Incident {
  id: number;
  title: string;
  description: string;
  severity: Severity;
  date: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  vectors: string[];
  timeline: [number, number, number]; // [year, month, day]
  status: 'Active' | 'Contained' | 'Resolved';
  affectedSystems?: string[];
  mitigationSteps?: string[];
  imageUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export interface TimeFilter {
  startDate: Date;
  endDate: Date;
}

export type SeverityFilter = Severity | 'All';
export type VectorFilter = string | 'All';