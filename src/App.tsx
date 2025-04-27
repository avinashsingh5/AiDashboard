import React, { useState } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/layout/Dashboard';
import IncidentDetail from './components/incidents/IncidentDetail';
import AIGuardian from './components/chatbot/AIGuardian';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed background with particle effect */}
      <div className="fixed inset-0 bg-background-dark" />
      <div className="fixed inset-0 bg-cyber-grid bg-cover bg-center opacity-5" />
      
      {/* Glow effects */}
      <div className="fixed top-1/4 left-1/3 w-96 h-96 bg-primary-600 opacity-10 blur-[100px] rounded-full" />
      <div className="fixed bottom-1/3 right-1/3 w-64 h-64 bg-accent-500 opacity-10 blur-[100px] rounded-full" />
      
      {/* App layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className="flex flex-1">
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          
          <main className="flex-1 md:ml-64">
            <Dashboard />
          </main>
        </div>
      </div>
      
      {/* Modals and floating elements */}
      <IncidentDetail />
      <AIGuardian />
    </div>
  );
}

export default App;