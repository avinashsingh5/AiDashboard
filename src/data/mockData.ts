import { Incident } from '../types';

export const mockIncidents: Incident[] = [
  {
    id: 1,
    title: "Deepfake Election Manipulation",
    description: "AI-generated deepfake videos of political candidates making controversial statements were circulated on social media platforms, potentially influencing election outcomes in multiple states.",
    severity: "Critical",
    date: "2025-03-15T10:30:00Z",
    location: {
      lat: 38.9072,
      lng: -77.0369,
      name: "Washington D.C., USA"
    },
    vectors: ["Disinformation", "Political", "Social Media"],
    timeline: [2025, 3, 15],
    status: "Active",
    affectedSystems: ["Social Media Platforms", "News Networks", "Electoral Processes"],
    mitigationSteps: [
      "Implement content authentication protocols",
      "Media literacy campaigns",
      "Platform-specific deepfake detection"
    ],
    imageUrl: "https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg"
  },
  {
    id: 2,
    title: "Financial Market Algorithm Collapse",
    description: "AI trading systems exhibited unexpected cascading failures after encountering edge case market conditions, leading to a 12% market drop within 45 minutes before emergency circuit breakers activated.",
    severity: "Critical",
    date: "2025-02-28T15:45:00Z",
    location: {
      lat: 40.7128,
      lng: -74.0060,
      name: "New York, USA"
    },
    vectors: ["Financial", "Algorithm", "Market"],
    timeline: [2025, 2, 28],
    status: "Contained",
    affectedSystems: ["Stock Exchanges", "Trading Platforms", "Pension Funds"],
    mitigationSteps: [
      "Algorithm auditing protocols",
      "Stress testing requirements",
      "Improved circuit breakers"
    ],
    imageUrl: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg"
  },
  {
    id: 3,
    title: "Healthcare Diagnostic System Failure",
    description: "An AI diagnostic system consistently misclassified a specific type of lung abnormality, potentially affecting treatment plans for thousands of patients before the error was discovered.",
    severity: "High",
    date: "2025-01-17T08:15:00Z",
    location: {
      lat: 51.5074,
      lng: -0.1278,
      name: "London, UK"
    },
    vectors: ["Healthcare", "Diagnosis", "Data Bias"],
    timeline: [2025, 1, 17],
    status: "Contained",
    affectedSystems: ["Hospital Networks", "Patient Records", "Treatment Protocols"],
    mitigationSteps: [
      "Mandatory human-in-the-loop verification",
      "Expanded testing dataset",
      "Patient notification program"
    ],
    imageUrl: "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg"
  },
  {
    id: 4,
    title: "Autonomous Vehicle Navigation Exploit",
    description: "Researchers demonstrated how specially crafted physical objects could cause autonomous vehicles to misinterpret traffic signals and road signs, creating potential safety hazards.",
    severity: "High",
    date: "2025-04-05T14:20:00Z",
    location: {
      lat: 37.7749,
      lng: -122.4194,
      name: "San Francisco, USA"
    },
    vectors: ["Transportation", "Physical World", "Computer Vision"],
    timeline: [2025, 4, 5],
    status: "Active",
    affectedSystems: ["Self-driving Cars", "Traffic Management", "Safety Systems"],
    mitigationSteps: [
      "Vision system updates",
      "Multi-modal sensing",
      "Adversarial training techniques"
    ],
    imageUrl: "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg"
  },
  {
    id: 5,
    title: "Large Language Model Jailbreak",
    description: "A novel 'jailbreaking' technique allowed users to bypass content filters in large language models, enabling generation of harmful content including detailed instructions for illegal activities.",
    severity: "High",
    date: "2024-12-10T19:30:00Z",
    location: {
      lat: 47.6062,
      lng: -122.3321,
      name: "Seattle, USA"
    },
    vectors: ["Language Models", "Content Filters", "Social Engineering"],
    timeline: [2024, 12, 10],
    status: "Contained",
    affectedSystems: ["AI Assistants", "Content Platforms", "Creative Tools"],
    mitigationSteps: [
      "Filter reinforcement",
      "Usage pattern monitoring",
      "Improved red-teaming protocols"
    ],
    imageUrl: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg"
  },
  {
    id: 6,
    title: "Facial Recognition False Arrests",
    description: "Multiple individuals were wrongfully detained by law enforcement based on incorrect facial recognition matches, highlighting systemic biases and accuracy issues in the technology.",
    severity: "High",
    date: "2024-11-23T11:15:00Z",
    location: {
      lat: -33.8688,
      lng: 151.2093,
      name: "Sydney, Australia"
    },
    vectors: ["Law Enforcement", "Privacy", "Bias"],
    timeline: [2024, 11, 23],
    status: "Active",
    affectedSystems: ["Police Databases", "Security Systems", "Legal Processes"],
    mitigationSteps: [
      "Human verification requirements",
      "Diverse training data initiatives",
      "Policy reforms"
    ],
    imageUrl: "https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg"
  },
  {
    id: 7,
    title: "Supply Chain Optimization Cascade",
    description: "An AI-powered supply chain optimization system created unexpected hoarding patterns and regional shortages of essential goods after optimizing for efficiency without considering broader economic impacts.",
    severity: "Medium",
    date: "2024-10-05T09:45:00Z",
    location: {
      lat: 49.2827,
      lng: -123.1207,
      name: "Vancouver, Canada"
    },
    vectors: ["Supply Chain", "Resource Allocation", "Economic"],
    timeline: [2024, 10, 5],
    status: "Resolved",
    affectedSystems: ["Retail Networks", "Distribution Centers", "Inventory Management"],
    mitigationSteps: [
      "Multi-objective optimization frameworks",
      "Regional impact assessments",
      "Manual review thresholds"
    ],
    imageUrl: "https://images.pexels.com/photos/163726/belgium-antwerp-shipping-container-163726.jpeg"
  },
  {
    id: 8,
    title: "Recommendation Algorithm Echo Chamber",
    description: "Investigation revealed that a popular platform's recommendation algorithm was creating dangerous radicalization pathways, systematically guiding users toward increasingly extreme content.",
    severity: "Medium",
    date: "2024-09-18T16:30:00Z",
    location: {
      lat: 1.3521,
      lng: 103.8198,
      name: "Singapore"
    },
    vectors: ["Social Media", "Recommendation", "Polarization"],
    timeline: [2024, 9, 18],
    status: "Active",
    affectedSystems: ["Content Platforms", "News Distribution", "User Feed Algorithms"],
    mitigationSteps: [
      "Diversity metrics",
      "Content pathway analysis",
      "User control options"
    ],
    imageUrl: "https://images.pexels.com/photos/7242744/pexels-photo-7242744.jpeg"
  },
  {
    id: 9,
    title: "AI-Generated Phishing Campaign",
    description: "Sophisticated phishing emails generated by AI with perfect grammar and personalized content led to a 500% increase in successful attacks targeting government employees.",
    severity: "Medium",
    date: "2024-08-07T13:10:00Z",
    location: {
      lat: 52.5200,
      lng: 13.4050,
      name: "Berlin, Germany"
    },
    vectors: ["Cybersecurity", "Social Engineering", "Government"],
    timeline: [2024, 8, 7],
    status: "Contained",
    affectedSystems: ["Email Services", "Government Networks", "Security Training"],
    mitigationSteps: [
      "Enhanced email scanning",
      "AI-detection tools",
      "Security awareness updates"
    ],
    imageUrl: "https://images.pexels.com/photos/5380649/pexels-photo-5380649.jpeg"
  },
  {
    id: 10,
    title: "Synthetic Media Copyright Infringement",
    description: "AI-generated music that closely mimicked specific artists' styles led to major copyright disputes and questions about the boundaries of artistic style appropriation.",
    severity: "Low",
    date: "2024-06-15T17:45:00Z",
    location: {
      lat: 34.0522,
      lng: -118.2437,
      name: "Los Angeles, USA"
    },
    vectors: ["Creative", "Copyright", "Generative AI"],
    timeline: [2024, 6, 15],
    status: "Active",
    affectedSystems: ["Music Platforms", "Content Creation Tools", "Licensing Frameworks"],
    mitigationSteps: [
      "Style detection tools",
      "Expanded copyright frameworks",
      "Creator attribution systems"
    ],
    imageUrl: "https://images.pexels.com/photos/2292953/pexels-photo-2292953.jpeg"
  }
];

// AI Guardian chatbot mock responses
export const guardianResponses: Record<string, string[]> = {
  "default": [
    "I'm analyzing the incident patterns. How can I assist you?",
    "Based on current data, we've seen a 27% increase in AI incidents in the past quarter.",
    "Would you like me to explain more about a specific incident type?",
    "I can provide mitigation strategies for any of the incidents in our database."
  ],
  "Critical": [
    "This is a CRITICAL severity incident requiring immediate attention and coordinated response.",
    "Critical incidents like this typically impact thousands of people and can have lasting societal effects.",
    "Recommended action: Activate emergency response protocols and alert relevant authorities.",
    "Similar critical incidents have historically taken 45-60 days to fully contain."
  ],
  "High": [
    "This HIGH severity incident needs urgent attention but is typically containable with proper resources.",
    "High severity incidents often affect specific sectors or regions rather than having global impact.",
    "Recommended action: Deploy technical fixes and notify affected stakeholders within 24-48 hours.",
    "Based on our database, similar incidents have been fully addressed within 2-3 weeks."
  ],
  "Medium": [
    "This MEDIUM severity incident requires scheduled attention and structured response.",
    "Medium incidents typically don't pose immediate widespread harm but can escalate if left unaddressed.",
    "Recommended action: Document the issue thoroughly and implement mitigation strategies within 1-2 weeks.",
    "Our historical data suggests medium incidents are typically resolved within 1 month."
  ],
  "Low": [
    "This LOW severity incident should be monitored but doesn't require immediate response.",
    "Low severity incidents usually involve emerging concerns or isolated events with minimal immediate impact.",
    "Recommended action: Add to monitoring systems and consider preventative measures in regular update cycles.",
    "Similar low-severity incidents have historically been addressed within standard maintenance periods."
  ]
};