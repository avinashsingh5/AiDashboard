import React, { useRef, useEffect } from 'react';
import { X, Shield, Send, Loader2 } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import { motion, AnimatePresence } from 'framer-motion';

const AIGuardian: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    messages,
    isOpen,
    isTyping,
    toggleChat,
    addMessage,
    generateResponse,
    clearMessages
  } = useChatStore();
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Generate welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      generateResponse();
    }
  }, [isOpen, messages.length, generateResponse]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = inputRef.current;
    if (input && input.value.trim()) {
      const message = input.value.trim();
      addMessage(message, 'user');
      input.value = '';
      
      // Generate AI response
      generateResponse();
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-4 right-4 w-80 md:w-96 z-40 glass rounded-lg border border-white/10 shadow-lg"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <div className="p-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-primary-400 mr-2" />
              <h3 className="font-display font-bold">AI Guardian</h3>
            </div>
            <button 
              onClick={toggleChat}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Messages */}
          <div className="p-3 h-80 overflow-y-auto flex flex-col space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary-500/20 ml-auto'
                    : 'bg-white/5 mr-auto'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className="text-right mt-1">
                  <span className="text-xs text-gray-400">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="bg-white/5 max-w-[80%] p-3 rounded-lg mr-auto">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <p className="text-sm text-gray-400">AI Guardian is typing...</p>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-white/10">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask AI Guardian..."
                className="flex-1 bg-white/5 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="p-2 bg-primary-500 rounded-full text-white hover:bg-primary-600 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIGuardian;