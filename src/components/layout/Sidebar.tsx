import React from 'react';
import { 
  LayoutDashboard, 
  Globe, 
  List, 
  Clock, 
  AlertTriangle, 
  Settings, 
  HelpCircle,
  Shield 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const links = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
    { icon: <Globe size={20} />, label: 'Threat Map', active: false },
    { icon: <List size={20} />, label: 'All Incidents', active: false },
    { icon: <Clock size={20} />, label: 'Timeline', active: false },
    { icon: <AlertTriangle size={20} />, label: 'My Reports', active: false },
  ];

  const secondaryLinks = [
    { icon: <Settings size={20} />, label: 'Settings' },
    { icon: <HelpCircle size={20} />, label: 'Help & Support' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-64 glass border-r border-white/10 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo & Title */}
          <div className="p-4 border-b border-white/10 flex items-center">
            <Shield className="w-8 h-8 text-primary-400" />
            <div className="ml-2">
              <h1 className="font-display font-bold text-gradient">AI SENTINEL</h1>
              <p className="text-xs text-gray-400">Monitoring & Response</p>
            </div>
          </div>
          
          {/* Nav links */}
          <nav className="flex-1 py-4 px-3 space-y-1">
            {links.map((link, i) => (
              <a
                key={i}
                href="#"
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  link.active 
                    ? 'bg-primary-500/20 text-primary-400' 
                    : 'hover:bg-primary-500/10 text-white/80 hover:text-white'
                }`}
              >
                <span className="mr-3">{link.icon}</span>
                <span>{link.label}</span>
                {link.active && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-primary-400"></span>
                )}
              </a>
            ))}
          </nav>
          
          {/* Stats */}
          <div className="p-4 m-3 glass rounded-lg">
            <h4 className="text-xs font-medium text-gray-400 mb-2">INCIDENT STATS</h4>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 glass rounded-md">
                <div className="text-xl font-bold text-white">12</div>
                <div className="text-xs text-gray-400">Active</div>
              </div>
              <div className="p-2 glass rounded-md">
                <div className="text-xl font-bold text-white">43</div>
                <div className="text-xs text-gray-400">Total</div>
              </div>
              <div className="p-2 glass rounded-md">
                <div className="text-xl font-bold text-orange-400">4</div>
                <div className="text-xs text-gray-400">Critical</div>
              </div>
              <div className="p-2 glass rounded-md">
                <div className="text-xl font-bold text-green-400">8</div>
                <div className="text-xs text-gray-400">Resolved</div>
              </div>
            </div>
          </div>
          
          {/* Secondary links */}
          <div className="mt-auto p-3 space-y-1 border-t border-white/10">
            {secondaryLinks.map((link, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-primary-500/10 transition-colors"
              >
                <span className="mr-3">{link.icon}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;