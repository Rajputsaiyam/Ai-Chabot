import  { createContext, useState, useContext, useEffect } from 'react';
import { mockConversations, mockAgents } from '../data/mockData';

const ConversationContext = createContext();

export const useConversations = () => useContext(ConversationContext);

export const ConversationProvider = ({ children }) => {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeConversation, setActiveConversation] = useState(null);
  const [agents, setAgents] = useState(mockAgents);
  const [filters, setFilters] = useState({
    status: 'all',
    assignedTo: 'all',
    tags: []
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    if (conversations.length && !activeConversation) {
      setActiveConversation(conversations[0]);
    }
  }, [conversations, activeConversation]);

  const sendMessage = (content, isAi = false) => {
    if (!activeConversation) return;
    
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation.id) {
        const newMessage = {
          id: Date.now().toString(),
          content,
          timestamp: new Date(),
          sender: isAi ? 'ai' : 'agent',
          status: 'sent'
        };
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: content,
          lastMessageTime: new Date()
        };
      }
      return conv;
    });
    setConversations(updatedConversations);
    setActiveConversation(updatedConversations.find(c => c.id === activeConversation.id));
  };

  const assignAgent = (agentId) => {
    if (!activeConversation) return;
    
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return;
    
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation.id) {
        return { ...conv, assignedAgent: agent };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setActiveConversation({ ...activeConversation, assignedAgent: agent });
  };

  const closeConversation = (conversationId) => {
    const targetId = conversationId || activeConversation?.id;
    if (!targetId) return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === targetId) {
        return { ...conv, status: 'closed' };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    
    if (activeConversation?.id === targetId) {
      setActiveConversation({ ...activeConversation, status: 'closed' });
    }
  };

  const reopenConversation = (conversationId) => {
    const targetId = conversationId || activeConversation?.id;
    if (!targetId) return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === targetId) {
        return { ...conv, status: 'open' };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    
    if (activeConversation?.id === targetId) {
      setActiveConversation({ ...activeConversation, status: 'open' });
    }
  };

  const addTag = (tag, conversationId) => {
    const targetId = conversationId || activeConversation?.id;
    if (!targetId || !tag.trim()) return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === targetId && !conv.tags.includes(tag)) {
        return { 
          ...conv, 
          tags: [...conv.tags, tag] 
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    
    if (activeConversation?.id === targetId) {
      const updatedConv = updatedConversations.find(c => c.id === targetId);
      setActiveConversation(updatedConv);
    }
  };

  const removeTag = (tag, conversationId) => {
    const targetId = conversationId || activeConversation?.id;
    if (!targetId) return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === targetId) {
        return { 
          ...conv, 
          tags: conv.tags.filter(t => t !== tag) 
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    
    if (activeConversation?.id === targetId) {
      const updatedConv = updatedConversations.find(c => c.id === targetId);
      setActiveConversation(updatedConv);
    }
  };

  const filterConversations = () => {
    return conversations.filter(conv => {
      // Filter by status
      if (filters.status !== 'all' && conv.status !== filters.status) {
        return false;
      }
      
      // Filter by assigned agent
      if (filters.assignedTo !== 'all') {
        if (filters.assignedTo === 'unassigned' && conv.assignedAgent) {
          return false;
        } else if (filters.assignedTo !== 'unassigned' && 
                  (!conv.assignedAgent || conv.assignedAgent.id !== filters.assignedTo)) {
          return false;
        }
      }
      
      // Filter by tags
      if (filters.tags.length > 0) {
        const hasTag = filters.tags.some(tag => conv.tags.includes(tag));
        if (!hasTag) return false;
      }
      
      return true;
    });
  };

  const addNote = (note, conversationId) => {
    const targetId = conversationId || activeConversation?.id;
    if (!targetId || !note.trim()) return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === targetId) {
        const newNote = {
          id: Date.now().toString(),
          content: note,
          timestamp: new Date(),
          author: 'Agent'
        };
        
        return { 
          ...conv, 
          notes: conv.notes ? [...conv.notes, newNote] : [newNote]
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    
    if (activeConversation?.id === targetId) {
      const updatedConv = updatedConversations.find(c => c.id === targetId);
      setActiveConversation(updatedConv);
    }
  };

  return (
    <ConversationContext.Provider value={{
      conversations,
      activeConversation,
      agents,
      filters,
      isFiltersOpen,
      setActiveConversation,
      sendMessage,
      assignAgent,
      closeConversation,
      reopenConversation,
      addTag,
      removeTag,
      setFilters,
      filterConversations,
      setIsFiltersOpen,
      addNote
    }}>
      {children}
    </ConversationContext.Provider>
  );
};
 