import React from 'react';
import { Search, Bell, Shield, Menu } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { toggleChat } = useChatStore();
  
  return (
    <header className="glass sticky top-0 z-30 flex items-center justify-between px-4 py-2 md:px-6">
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-primary-500/20 transition-colors md:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="flex items-center">
          <Shield className="w-8 h-8 text-primary-400" />
          <h1 className="ml-2 text-xl font-display font-bold text-gradient">
            AI SENTINEL
          </h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-4">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search incidents..."
            className="glass py-1.5 pl-9 pr-4 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 w-48 lg:w-64"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        
        <button className="p-2 rounded-full hover:bg-primary-500/20 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent-500 rounded-full"></span>
        </button>
        
        <button 
          onClick={toggleChat}
          className="glass py-1.5 px-3 rounded-full flex items-center space-x-2 hover:bg-primary-500/20 transition-colors hidden md:flex"
        >
          <Shield className="w-4 h-4 text-primary-400" />
          <span className="text-sm font-medium">AI Guardian</span>
        </button>
        
        <div className="relative">
          <img 
            src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg" 
            alt="Profile" 
            className="w-8 h-8 rounded-full object-cover border-2 border-primary-400"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success-500 rounded-full border-2 border-background-dark"></span>
        </div>
      </div>
    </header>
  );
};

export default Header;