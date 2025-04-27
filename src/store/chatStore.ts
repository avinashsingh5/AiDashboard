import { create } from 'zustand';
import { ChatMessage } from '../types';
import { guardianResponses } from '../data/mockData';

interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
  toggleChat: () => void;
  addMessage: (text: string, sender: 'user' | 'ai') => void;
  generateResponse: (context?: string) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isOpen: false,
  isTyping: false,
  
  toggleChat: () => set((state) => {
    // If opening chat and no messages, generate welcome message
    if (!state.isOpen && state.messages.length === 0) {
      setTimeout(() => get().generateResponse(), 500);
    }
    return { isOpen: !state.isOpen };
  }),
  
  addMessage: (text, sender) => set((state) => ({
    messages: [
      ...state.messages,
      {
        id: Date.now().toString(),
        text,
        sender,
        timestamp: new Date()
      }
    ]
  })),
  
  generateResponse: (context = 'default') => {
    set({ isTyping: true });
    
    // Get potential responses based on context
    const possibleResponses = guardianResponses[context] || guardianResponses.default;
    
    // Select a random response, but avoid repeating the last one
    const lastMessage = get().messages[get().messages.length - 1];
    let randomResponse;
    do {
      randomResponse = possibleResponses[
        Math.floor(Math.random() * possibleResponses.length)
      ];
    } while (
      lastMessage?.sender === 'ai' && 
      lastMessage?.text === randomResponse &&
      possibleResponses.length > 1
    );
    
    // Add typing delay based on message length
    const typingDelay = Math.min(1000 + randomResponse.length * 10, 3000);
    
    setTimeout(() => {
      get().addMessage(randomResponse, 'ai');
      set({ isTyping: false });
    }, typingDelay);
  },
  
  clearMessages: () => set({ messages: [] })
}));