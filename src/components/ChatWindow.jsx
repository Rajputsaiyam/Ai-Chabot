import  { useState, useRef, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Paperclip, Send, User, Smile, Phone, Video, HelpCircle, Image, Trash, Bookmark } from 'lucide-react';
import { useUi } from '../contexts/UiContext';
import { useConversations } from '../contexts/ConversationContext';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWindow = () => {
  const { isMobileView, toggleUserProfile, addNotification } = useUi();
  const { activeConversation, sendMessage } = useConversations();
  
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    sendMessage(message);
    setMessage('');
    
    // Simulate AI typing response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      sendMessage("Thanks for your message! Our AI is analyzing your query and will provide assistance shortly. Is there anything else you'd like to add about your issue?", true);
    }, 1500);
  };

  const handleAiSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
    
    // Simulate user response
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        sendMessage("I see. Based on your response, I can guide you to our documentation page that addresses this exact issue. Would you like me to send you the link?", true);
      }, 2000);
    }, 1000);
  };

  const handleQuickReplyClick = (reply) => {
    setMessage(reply);
    // Focus the input field
    document.querySelector('input[type="text"]').focus();
  };

  const handlePhoneCall = () => {
    addNotification({
      type: 'outgoing-call',
      title: 'Outgoing Call',
      message: `Calling ${activeConversation.user.name}...`,
      time: new Date()
    });
  };

  const handleVideoCall = () => {
    addNotification({
      type: 'info',
      title: 'Video Call',
      message: `Starting video call with ${activeConversation.user.name}...`,
      time: new Date()
    });
  };

  const handleAttachmentClick = (type) => {
    addNotification({
      type: 'info',
      title: 'Attachment',
      message: `${type} attachment feature activated`,
      time: new Date()
    });
    setShowAttachmentOptions(false);
  };

  const simulateAiSuggestions = [
    "Based on customer history, they might be asking about premium plan features.",
    "This seems like a billing question. Consider sharing our pricing documentation.",
    "User has contacted support 3 times this week, consider escalating to a human agent."
  ];

  const quickReplies = [
    "Thanks for reaching out! I'll look into this right away.",
    "Could you provide more details about your issue?",
    "I've escalated this to our technical team.",
    "Let me check your account history to understand the context better."
  ];

  const commonEmojis = ["👍", "👋", "🙏", "😊", "👏", "🎉", "❤️", "✅"];

  if (!activeConversation) return null;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[var(--bg-main)]">
      <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
        <div className="flex items-center">
          <div className="relative mr-3">
            <img 
              src={activeConversation.user.avatar} 
              alt={activeConversation.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {activeConversation.user.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            )}
          </div>
          <div>
            <h2 className="font-semibold">{activeConversation.user.name}</h2>
            <div className="flex items-center text-xs text-[var(--text-light)]">
              {activeConversation.user.online ? (
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  Online
                </span>
              ) : (
                <span>
                  Last active {formatDistanceToNow(new Date(activeConversation.user.lastSeen), { addSuffix: true })}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handlePhoneCall}
            className="p-2 text-[var(--text-secondary)] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            title="Voice call"
          >
            <Phone size={20} />
          </button>
          
          <button 
            onClick={handleVideoCall}
            className="p-2 text-[var(--text-secondary)] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            title="Video call"
          >
            <Video size={20} />
          </button>
          
          {isMobileView && (
            <button 
              onClick={toggleUserProfile}
              className="p-2 text-[var(--text-secondary)] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              title="User profile"
            >
              <User size={20} />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {activeConversation.messages.map((msg, index) => (
          <motion.div 
            key={msg.id} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`mb-4 max-w-3/4 ${msg.sender === 'user' ? 'ml-0 mr-auto' : 'ml-auto mr-0'}`}
          >
            <div className="flex items-start gap-3">
              {msg.sender === 'user' && (
                <img 
                  src={activeConversation.user.avatar} 
                  alt={activeConversation.user.name}
                  className="w-8 h-8 rounded-full object-cover mt-1"
                />
              )}
              
              <div 
                className={`py-2 px-3 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'bg-gray-100 dark:bg-gray-800 text-[var(--text-primary)]' 
                    : msg.sender === 'ai' 
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-[var(--text-primary)]'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-[var(--text-primary)]'
                }`}
              >
                {msg.content}
                <div className="text-xs text-[var(--text-light)] mt-1 text-right flex items-center justify-end gap-2">
                  {formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}
                  
                  {msg.sender !== 'user' && (
                    <div className="flex gap-1">
                      <button 
                        title="Save response" 
                        className="text-[var(--text-light)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <Bookmark size={14} />
                      </button>
                      <button 
                        title="Delete message" 
                        className="text-[var(--text-light)] hover:text-red-500 transition-colors"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {(msg.sender === 'ai' || msg.sender === 'agent') && (
                <img 
                  src={msg.sender === 'ai' 
                    ? "https://api.dicebear.com/6.x/bottts/svg?seed=BeyondChats" 
                    : activeConversation.assignedAgent?.avatar || "https://api.dicebear.com/6.x/personas/svg?seed=agent"}
                  alt={msg.sender === 'ai' ? "AI" : "Agent"}
                  className="w-8 h-8 rounded-full object-cover mt-1"
                />
              )}
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-start gap-3"
          >
            <img 
              src="https://api.dicebear.com/6.x/bottts/svg?seed=BeyondChats"
              alt="AI"
              className="w-8 h-8 rounded-full object-cover mt-1"
            />
            <div className="py-3 px-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-[var(--border-color)] p-3">
        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg mb-3">
          <h3 className="text-sm font-semibold mb-2 text-purple-600 dark:text-purple-400">AI Suggestions</h3>
          {simulateAiSuggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className="text-sm mb-2 p-2 bg-white dark:bg-gray-800 rounded border border-[var(--border-color)] hover:border-purple-300 dark:hover:border-purple-700 cursor-pointer transition-colors"
              onClick={() => handleAiSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
              onClick={() => handleQuickReplyClick(reply)}
            >
              {reply.length > 30 ? reply.substring(0, 30) + '...' : reply}
            </button>
          ))}
        </div>
        
        <form onSubmit={handleSendMessage} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="relative">
              <button 
                type="button"
                className="p-2 text-[var(--text-secondary)] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                onClick={() => setShowAttachmentOptions(!showAttachmentOptions)}
              >
                <Paperclip size={20} />
              </button>
              
              <AnimatePresence>
                {showAttachmentOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-12 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-[var(--border-color)] w-48 py-1"
                  >
                    <button 
                      type="button" 
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                      onClick={() => handleAttachmentClick('Image')}
                    >
                      <Image size={16} />
                      Image
                    </button>
                    <button 
                      type="button" 
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                      onClick={() => handleAttachmentClick('File')}
                    >
                      <HelpCircle size={16} />
                      File
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 py-2 px-3 bg-gray-100 dark:bg-gray-800 rounded-md border border-transparent focus:border-[var(--border-color)] focus:ring-0 focus:outline-none transition-colors"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            
            <div className="relative">
              <button 
                type="button"
                className="p-2 text-[var(--text-secondary)] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile size={20} />
              </button>
              
              <AnimatePresence>
                {showEmojiPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-12 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-[var(--border-color)] p-2"
                  >
                    <div className="grid grid-cols-4 gap-2">
                      {commonEmojis.map((emoji, index) => (
                        <button
                          key={index}
                          type="button"
                          className="w-8 h-8 flex items-center justify-center text-xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                          onClick={() => setMessage(prev => prev + emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button 
              type="submit"
              className="p-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!message.trim()}
            >
              <Send size={20} />
            </button>
          </div>
          
          <div className="text-xs text-[var(--text-light)] flex justify-center">
            <span>AI-powered responses enabled • </span>
            <button className="text-blue-500 dark:text-blue-400 hover:underline ml-1">Disable</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
 