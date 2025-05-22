import  { useState, useEffect } from 'react';
import { X, Check, Phone, Info, AlertTriangle } from 'lucide-react';
import { useUi } from '../contexts/UiContext';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationPanel = () => {
  const { notifications, removeNotification } = useUi();
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    // Show only the last 3 notifications
    setVisibleNotifications(notifications.slice(0, 3));
  }, [notifications]);

  if (visibleNotifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-80">
      <AnimatePresence>
        {visibleNotifications.map((notification, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`p-3 rounded-lg shadow-lg border flex items-start gap-3 ${
              notification.type === 'success' 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/30' 
              : notification.type === 'error' 
                ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/30' 
              : notification.type === 'incoming-call' || notification.type === 'outgoing-call'
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/30'
              : 'bg-white dark:bg-gray-800 border-[var(--border-color)]'
            }`}
          >
            <div className={`p-1.5 rounded-full ${
              notification.type === 'success' 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
              : notification.type === 'error' 
                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
              : notification.type === 'incoming-call' || notification.type === 'outgoing-call'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}>
              {notification.type === 'success' && <Check size={16} />}
              {notification.type === 'error' && <AlertTriangle size={16} />}
              {(notification.type === 'incoming-call' || notification.type === 'outgoing-call' || notification.type === 'missed-call') && <Phone size={16} />}
              {notification.type === 'info' && <Info size={16} />}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-sm">{notification.title}</h4>
                <button 
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-0.5"
                  onClick={() => removeNotification(index)}
                >
                  <X size={14} />
                </button>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{notification.message}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationPanel;
 