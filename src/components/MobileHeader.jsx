import  { Menu, Bell, User, Sun, Moon } from 'lucide-react';
import { useUi } from '../contexts/UiContext';
import { useConversations } from '../contexts/ConversationContext';

const MobileHeader = () => {
  const { 
    toggleSidebar, 
    toggleDarkMode, 
    darkMode, 
    toggleUserProfile,
    notifications
  } = useUi();
  
  const { activeConversation } = useConversations();

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-[var(--border-color)] p-3 flex items-center justify-between">
      <button
        className="p-2 text-[var(--text-secondary)]"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>
      
      <div className="flex-1 text-center">
        <h1 className="text-lg font-semibold">BeyondChats</h1>
      </div>
      
      <div className="flex items-center gap-1">
        <button 
          className="p-2 text-[var(--text-secondary)]"
          onClick={toggleDarkMode}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="relative">
          <button className="p-2 text-[var(--text-secondary)]">
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
        </div>
        
        {activeConversation && (
          <button 
            className="p-2 text-[var(--text-secondary)]"
            onClick={toggleUserProfile}
          >
            <User size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
 