import  { useUi } from '../contexts/UiContext';
import { useConversations } from '../contexts/ConversationContext';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import UserProfile from './UserProfile';
import MobileHeader from './MobileHeader';
import IncomingCall from './IncomingCall';
import NotificationPanel from './NotificationPanel';
import { MessageSquare, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { 
    darkMode, 
    isMobileView, 
    showSidebar, 
    showUserProfile, 
    toggleDarkMode, 
    showIncomingCall
  } = useUi();
  
  const { 
    activeConversation 
  } = useConversations();

  return (
    <div className="flex flex-col h-screen">
      {isMobileView && <MobileHeader />}

      <div className="flex flex-1 overflow-hidden">
        {showSidebar && (
          <motion.div
            initial={{ x: isMobileView ? -320 : 0 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
            className="z-20"
          >
            <Sidebar />
          </motion.div>
        )}
        
        <div className="flex flex-1 overflow-hidden">
          {activeConversation ? (
            <ChatWindow />
          ) : (
            <div className="flex-1 flex items-center justify-center flex-col p-6 text-center">
              <MessageSquare size={48} className="text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No conversation selected</h2>
              <p className="text-[var(--text-secondary)]">
                Select a conversation from the sidebar or start a new one
              </p>
            </div>
          )}
          
          {showUserProfile && activeConversation && (
            <motion.div
              initial={{ x: isMobileView ? 320 : 0, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="z-20"
            >
              <UserProfile />
            </motion.div>
          )}
        </div>
      </div>

      {showIncomingCall && <IncomingCall />}
      <NotificationPanel />

      {!isMobileView && (
        <div className="fixed bottom-4 right-4 z-10">
          <button 
            onClick={toggleDarkMode}
            className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
 