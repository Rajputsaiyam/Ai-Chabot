import  { useState } from 'react';
import { Search, Settings, X, ChevronDown, ChevronUp, Filter, ArrowLeft, PlusCircle, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useUi } from '../contexts/UiContext';
import { useConversations } from '../contexts/ConversationContext';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const { isMobileView, setShowSidebar } = useUi();
  const { 
    activeConversation, 
    setActiveConversation, 
    agents, 
    filters, 
    setFilters,
    filterConversations,
    isFiltersOpen,
    setIsFiltersOpen
  } = useConversations();
  
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = filterConversations().filter(conv => {
    if (!searchTerm) return true;
    const searchContent = `${conv.user.name} ${conv.lastMessage}`.toLowerCase();
    return searchContent.includes(searchTerm.toLowerCase());
  });

  const availableTags = Array.from(
    new Set(
      filterConversations().flatMap(conv => conv.tags)
    )
  );

  const toggleFilter = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const handleStatusChange = (status) => {
    setFilters({
      ...filters,
      status
    });
  };

  const handleAgentChange = (agentId) => {
    setFilters({
      ...filters,
      assignedTo: agentId
    });
  };

  const handleTagToggle = (tag) => {
    if (filters.tags.includes(tag)) {
      setFilters({
        ...filters,
        tags: filters.tags.filter(t => t !== tag)
      });
    } else {
      setFilters({
        ...filters,
        tags: [...filters.tags, tag]
      });
    }
  };

  const resetFilters = () => {
    setFilters({
      status: 'all',
      assignedTo: 'all',
      tags: []
    });
  };

  return (
    <div className="w-80 h-full flex flex-col border-r border-[var(--border-color)] bg-[var(--bg-sidebar)]">
      {isMobileView && (
        <div className="flex items-center justify-between p-3 border-b border-[var(--border-color)]">
          <button 
            className="p-2 text-[var(--text-secondary)]"
            onClick={() => setShowSidebar(false)}
          >
            <ArrowLeft size={20} />
          </button>
          <span className="font-semibold">Conversations</span>
          <button
            className="p-2 text-[var(--text-secondary)]"
          >
            <Settings size={20} />
          </button>
        </div>
      )}
      
      <div className="p-3 border-b border-[var(--border-color)]">
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full py-2 pl-10 pr-4 rounded-md bg-white dark:bg-gray-800 border border-[var(--border-color)] transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          {searchTerm && (
            <button
              className="absolute right-3 top-2.5 text-gray-400"
              onClick={() => setSearchTerm('')}
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
      
      <div className="p-3 flex items-center justify-between border-b border-[var(--border-color)]">
        <button
          className="flex items-center text-sm font-medium text-[var(--text-secondary)]"
          onClick={toggleFilter}
        >
          <Filter size={16} className="mr-1" />
          Filter
          {isFiltersOpen ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
        </button>
        <span className="text-sm text-[var(--text-secondary)]">
          {filteredConversations.length} conversations
        </span>
      </div>
      
      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-[var(--border-color)]"
          >
            <div className="p-3 space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Status</h3>
                <div className="flex flex-wrap gap-2">
                  <button 
                    className={`px-3 py-1 text-xs rounded-full border ${
                      filters.status === 'all' 
                        ? 'bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400' 
                        : 'border-[var(--border-color)]'
                    }`}
                    onClick={() => handleStatusChange('all')}
                  >
                    All
                  </button>
                  <button 
                    className={`px-3 py-1 text-xs rounded-full border ${
                      filters.status === 'open' 
                        ? 'bg-green-100 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-400' 
                        : 'border-[var(--border-color)]'
                    }`}
                    onClick={() => handleStatusChange('open')}
                  >
                    Open
                  </button>
                  <button 
                    className={`px-3 py-1 text-xs rounded-full border ${
                      filters.status === 'closed' 
                        ? 'bg-gray-100 border-gray-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300' 
                        : 'border-[var(--border-color)]'
                    }`}
                    onClick={() => handleStatusChange('closed')}
                  >
                    Closed
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Assigned To</h3>
                <div className="flex flex-wrap gap-2">
                  <button 
                    className={`px-3 py-1 text-xs rounded-full border ${
                      filters.assignedTo === 'all' 
                        ? 'bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400' 
                        : 'border-[var(--border-color)]'
                    }`}
                    onClick={() => handleAgentChange('all')}
                  >
                    All
                  </button>
                  <button 
                    className={`px-3 py-1 text-xs rounded-full border ${
                      filters.assignedTo === 'unassigned' 
                        ? 'bg-yellow-100 border-yellow-300 text-yellow-700 dark:bg-yellow-900/30 dark:border-yellow-700 dark:text-yellow-400' 
                        : 'border-[var(--border-color)]'
                    }`}
                    onClick={() => handleAgentChange('unassigned')}
                  >
                    Unassigned
                  </button>
                  {agents.map(agent => (
                    <button 
                      key={agent.id}
                      className={`px-3 py-1 text-xs rounded-full border ${
                        filters.assignedTo === agent.id 
                          ? 'bg-purple-100 border-purple-300 text-purple-700 dark:bg-purple-900/30 dark:border-purple-700 dark:text-purple-400' 
                          : 'border-[var(--border-color)]'
                      }`}
                      onClick={() => handleAgentChange(agent.id)}
                    >
                      {agent.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {availableTags.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map(tag => (
                      <button 
                        key={tag}
                        className={`px-3 py-1 text-xs rounded-full border flex items-center ${
                          filters.tags.includes(tag) 
                            ? 'bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400' 
                            : 'border-[var(--border-color)]'
                        }`}
                        onClick={() => handleTagToggle(tag)}
                      >
                        {filters.tags.includes(tag) && <Check size={12} className="mr-1" />}
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <button 
                className="w-full py-1.5 px-3 text-sm text-[var(--text-secondary)] hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                onClick={resetFilters}
              >
                Reset filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-[var(--text-secondary)]">No conversations match your filters</p>
            <button 
              className="mt-2 py-2 px-3 text-sm text-blue-600 dark:text-blue-400"
              onClick={resetFilters}
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredConversations.map(conversation => (
            <motion.div 
              key={conversation.id}
              whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
              className={`p-3 border-b border-[var(--border-color)] cursor-pointer transition-colors ${
                activeConversation?.id === conversation.id ? 'bg-blue-50 dark:bg-gray-700/50' : ''
              }`}
              onClick={() => setActiveConversation(conversation)}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img 
                    src={conversation.user.avatar} 
                    alt={conversation.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {conversation.user.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium truncate">{conversation.user.name}</h3>
                    <span className="text-xs text-[var(--text-light)] whitespace-nowrap ml-1">
                      {formatDistanceToNow(new Date(conversation.lastMessageTime), { addSuffix: true })}
                    </span>
                  </div>
                  
                  <p className="text-sm text-[var(--text-secondary)] truncate mt-1">
                    {conversation.status === 'closed' && (
                      <span className="inline-block px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded mr-1">
                        Closed
                      </span>
                    )}
                    {conversation.lastMessage}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    {conversation.tags.slice(0, 2).map(tag => (
                      <span 
                        key={tag}
                        className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-xs rounded-full text-[var(--text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                    {conversation.tags.length > 2 && (
                      <span className="text-xs text-[var(--text-light)]">
                        +{conversation.tags.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
      
      <div className="p-3 border-t border-[var(--border-color)]">
        <button className="w-full py-2 flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-md transition-colors">
          <PlusCircle size={16} />
          New Conversation
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
 