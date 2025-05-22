import  { useState } from 'react';
import { X, Mail, MapPin, Globe, Clock, Calendar, Calendar as SessionIcon, Tag, AlertCircle, ChevronDown, ChevronUp, Trash, Edit, PlusCircle, Check, AlertOctagon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useUi } from '../contexts/UiContext';
import { useConversations } from '../contexts/ConversationContext';
import { motion, AnimatePresence } from 'framer-motion';

const UserProfile = () => {
  const { isMobileView, toggleUserProfile, addNotification } = useUi();
  const { 
    activeConversation, 
    agents, 
    assignAgent, 
    closeConversation, 
    reopenConversation, 
    addTag, 
    removeTag,
    addNote
  } = useConversations();
  
  const [expandedSection, setExpandedSection] = useState('userInfo');
  const [newTag, setNewTag] = useState('');
  const [newNote, setNewNote] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [showConfirmClose, setShowConfirmClose] = useState(false);

  if (!activeConversation) return null;

  const handleAssignAgent = (e) => {
    assignAgent(e.target.value);
    addNotification({
      type: 'success',
      title: 'Agent Assigned',
      message: `Conversation assigned to ${e.target.options[e.target.selectedIndex].text}`,
      time: new Date()
    });
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim()) {
      addTag(newTag.trim());
      setNewTag('');
      addNotification({
        type: 'success',
        title: 'Tag Added',
        message: `Tag "${newTag.trim()}" added to conversation`,
        time: new Date()
      });
    }
  };

  const handleRemoveTag = (tag) => {
    removeTag(tag);
    addNotification({
      type: 'info',
      title: 'Tag Removed',
      message: `Tag "${tag}" removed from conversation`,
      time: new Date()
    });
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (newNote.trim()) {
      addNote(newNote.trim());
      setNewNote('');
      addNotification({
        type: 'success',
        title: 'Note Added',
        message: 'Internal note added to conversation',
        time: new Date()
      });
    }
  };

  const handleCloseConversation = () => {
    closeConversation();
    setShowConfirmClose(false);
    addNotification({
      type: 'info',
      title: 'Conversation Closed',
      message: `Conversation with ${activeConversation.user.name} has been closed`,
      time: new Date()
    });
  };

  const handleReopenConversation = () => {
    reopenConversation();
    addNotification({
      type: 'success',
      title: 'Conversation Reopened',
      message: `Conversation with ${activeConversation.user.name} has been reopened`,
      time: new Date()
    });
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    addNotification({
      type: 'info',
      title: isMuted ? 'Notifications Unmuted' : 'Notifications Muted',
      message: isMuted 
        ? `You will now receive notifications for ${activeConversation.user.name}`
        : `Notifications for ${activeConversation.user.name} have been muted`,
      time: new Date()
    });
  };

  const recentActivity = [
    {
      id: 'a1',
      type: 'page_view',
      label: 'Viewed pricing page',
      time: new Date().setHours(new Date().getHours() - 1),
      color: 'blue'
    },
    {
      id: 'a2',
      type: 'cart',
      label: 'Added item to cart',
      time: new Date().setHours(new Date().getHours() - 2),
      color: 'green'
    },
    {
      id: 'a3',
      type: 'checkout',
      label: 'Abandoned checkout',
      time: new Date().setHours(new Date().getHours() - 24),
      color: 'red'
    },
    {
      id: 'a4',
      type: 'login',
      label: 'Logged in',
      time: new Date().setHours(new Date().getHours() - 48),
      color: 'purple'
    }
  ];

  const customerNotes = activeConversation.notes || [
    {
      id: 'n1',
      content: 'User has reported issues with checkout process. Last follow-up was not resolved.',
      timestamp: new Date().setDate(new Date().getDate() - 7),
      author: 'Support Team'
    }
  ];

  return (
    <div className={`w-80 h-full border-l border-[var(--border-color)] bg-[var(--bg-sidebar)] overflow-y-auto ${isMobileView ? 'absolute inset-0 z-50' : ''}`}>
      {isMobileView && (
        <div className="sticky top-0 flex items-center justify-between p-3 border-b border-[var(--border-color)] bg-[var(--bg-sidebar)]">
          <h2 className="font-semibold">User Profile</h2>
          <button 
            className="p-2 text-[var(--text-secondary)]"
            onClick={toggleUserProfile}
          >
            <X size={20} />
          </button>
        </div>
      )}
      
      <div className="p-4 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={activeConversation.user.avatar} 
            alt={activeConversation.user.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-lg">{activeConversation.user.name}</h2>
            <p className="text-[var(--text-secondary)] text-sm flex items-center">
              <Mail size={14} className="mr-1" />
              {activeConversation.user.email}
            </p>
            <p className="text-xs text-[var(--text-light)] mt-1">
              {activeConversation.status === 'closed' 
                ? 'Conversation closed' 
                : activeConversation.user.online 
                  ? 'Currently online' 
                  : `Last seen ${formatDistanceToNow(new Date(activeConversation.user.lastSeen), { addSuffix: true })}`
              }
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center text-sm text-[var(--text-secondary)]">
            <MapPin size={16} className="mr-2" />
            {activeConversation.user.location || 'Unknown location'}
          </div>
          
          <div className="flex items-center text-sm text-[var(--text-secondary)]">
            <Globe size={16} className="mr-2" />
            {activeConversation.user.browser || 'Chrome'} on {activeConversation.user.os || 'Windows'}
          </div>
          
          <div className="flex items-center text-sm text-[var(--text-secondary)]">
            <Clock size={16} className="mr-2" />
            Last seen {formatDistanceToNow(new Date(activeConversation.user.lastSeen), { addSuffix: true })}
          </div>
          
          <div className="flex items-center text-sm text-[var(--text-secondary)]">
            <Calendar size={16} className="mr-2" />
            Customer since {new Date(activeConversation.user.customerSince).toLocaleDateString()}
          </div>
          
          <div className="flex items-center text-sm text-[var(--text-secondary)]">
            <SessionIcon size={16} className="mr-2" />
            Session duration: {activeConversation.user.sessionDuration || '24m 13s'}
          </div>
        </div>
      </div>
      
      <div className="border-b border-[var(--border-color)]">
        <button
          className="flex items-center justify-between w-full p-4 font-medium text-left"
          onClick={() => toggleSection('actions')}
        >
          <span>Actions</span>
          {expandedSection === 'actions' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        <AnimatePresence>
          {expandedSection === 'actions' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 grid grid-cols-1 gap-2">
                {activeConversation.status === 'open' ? (
                  <div className="relative">
                    <button 
                      className="w-full py-2 px-3 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors flex items-center justify-center gap-2"
                      onClick={() => setShowConfirmClose(true)}
                    >
                      <AlertOctagon size={16} />
                      Close Conversation
                    </button>
                    
                    <AnimatePresence>
                      {showConfirmClose && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute top-0 left-0 right-0 p-3 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-red-200 dark:border-red-900 z-10"
                        >
                          <p className="text-sm mb-3">Are you sure you want to close this conversation?</p>
                          <div className="flex gap-2">
                            <button 
                              className="flex-1 py-1.5 px-3 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors"
                              onClick={handleCloseConversation}
                            >
                              Close
                            </button>
                            <button 
                              className="flex-1 py-1.5 px-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm rounded transition-colors"
                              onClick={() => setShowConfirmClose(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button 
                    className="py-2 px-3 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors flex items-center justify-center gap-2"
                    onClick={handleReopenConversation}
                  >
                    <Check size={16} />
                    Reopen Conversation
                  </button>
                )}
                
                <button 
                  className="py-2 px-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors flex items-center justify-center gap-2"
                  onClick={handleToggleMute}
                >
                  {isMuted ? 'Unmute Notifications' : 'Mute Notifications'}
                </button>
                
                <div className="mt-2">
                  <label className="block text-sm font-medium mb-1">Assign to Agent</label>
                  <select 
                    className="w-full p-2 border border-[var(--border-color)] rounded-md bg-white dark:bg-gray-800 transition-colors"
                    value={activeConversation.assignedAgent?.id || ''}
                    onChange={handleAssignAgent}
                  >
                    <option value="">Unassigned</option>
                    {agents.map(agent => (
                      <option key={agent.id} value={agent.id}>
                        {agent.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="border-b border-[var(--border-color)]">
        <button
          className="flex items-center justify-between w-full p-4 font-medium text-left"
          onClick={() => toggleSection('tags')}
        >
          <span>Tags</span>
          {expandedSection === 'tags' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        <AnimatePresence>
          {expandedSection === 'tags' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {activeConversation.tags.length === 0 ? (
                    <p className="text-sm text-[var(--text-light)] italic">No tags added yet</p>
                  ) : (
                    activeConversation.tags.map(tag => (
                      <div 
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full text-[var(--text-secondary)] flex items-center group"
                      >
                        <Tag size={14} className="mr-1" />
                        {tag}
                        <button 
                          className="ml-1.5 p-0.5 text-[var(--text-light)] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
                
                <form onSubmit={handleAddTag} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a tag..."
                    className="flex-1 p-2 border border-[var(--border-color)] rounded-md bg-white dark:bg-gray-800 transition-colors"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="py-2 px-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-md transition-colors disabled:opacity-50"
                    disabled={!newTag.trim()}
                  >
                    Add
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="border-b border-[var(--border-color)]">
        <button
          className="flex items-center justify-between w-full p-4 font-medium text-left"
          onClick={() => toggleSection('notes')}
        >
          <span>Internal Notes</span>
          {expandedSection === 'notes' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        <AnimatePresence>
          {expandedSection === 'notes' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4">
                {customerNotes.length > 0 ? (
                  <div className="space-y-3 mb-3">
                    {customerNotes.map(note => (
                      <div key={note.id} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/30 rounded-md group">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center text-sm font-medium text-yellow-800 dark:text-yellow-400">
                            <AlertCircle size={16} className="mr-1" />
                            From {note.author}
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                              <Edit size={14} />
                            </button>
                            <button className="text-gray-500 hover:text-red-500">
                              <Trash size={14} />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm">{note.content}</p>
                        <p className="text-xs text-[var(--text-light)] mt-1">
                          {formatDistanceToNow(new Date(note.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[var(--text-light)] italic mb-3">No internal notes yet</p>
                )}
                
                <form onSubmit={handleAddNote} className="flex flex-col gap-2">
                  <textarea
                    placeholder="Add internal note..."
                    className="w-full p-2 border border-[var(--border-color)] rounded-md bg-white dark:bg-gray-800 min-h-[100px] transition-colors"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="py-2 px-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    disabled={!newNote.trim()}
                  >
                    <PlusCircle size={16} />
                    Add Note
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div>
        <button
          className="flex items-center justify-between w-full p-4 font-medium text-left"
          onClick={() => toggleSection('activity')}
        >
          <span>Recent Activity</span>
          {expandedSection === 'activity' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        <AnimatePresence>
          {expandedSection === 'activity' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4">
                <div className="space-y-3">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className={`p-2 border-l-2 border-${activity.color}-400`}>
                      <p className="text-xs text-[var(--text-light)]">
                        {formatDistanceToNow(new Date(activity.time), { addSuffix: true })}
                      </p>
                      <p className="text-sm">{activity.label}</p>
                    </div>
                  ))}
                </div>
                
                <button className="mt-3 text-sm text-blue-500 dark:text-blue-400 hover:underline">
                  Show full activity history
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserProfile;
 