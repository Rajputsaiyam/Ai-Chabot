import  { Phone, X, Video } from 'lucide-react';
import { useUi } from '../contexts/UiContext';
import { motion } from 'framer-motion';

const IncomingCall = () => {
  const { 
    dismissIncomingCall, 
    setShowIncomingCall, 
    addNotification 
  } = useUi();

  const handleAcceptCall = () => {
    setShowIncomingCall(false);
    addNotification({
      type: 'success',
      title: 'Call Connected',
      message: 'Call with Michael Davis is now connected',
      time: new Date()
    });
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-4 right-4 md:right-8 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-[var(--border-color)] w-80"
    >
      <div className="p-4 flex items-center gap-4">
        <img 
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGRpdmVyc2UlMjBwZW9wbGV8ZW58MHx8fHwxNzQ3NjQ1ODcyfDA&ixlib=rb-4.1.0&fit=fillmax&h=200&w=200"
          alt="Michael Davis"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-medium">Incoming Call</h3>
          <p className="text-sm text-[var(--text-secondary)]">Michael Davis</p>
        </div>
        <button 
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          onClick={dismissIncomingCall}
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="flex border-t border-[var(--border-color)]">
        <button 
          className="flex-1 py-3 flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          onClick={dismissIncomingCall}
        >
          <X size={18} /> 
          Decline
        </button>
        <div className="w-px bg-[var(--border-color)]"></div>
        <button 
          className="flex-1 py-3 flex items-center justify-center gap-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
          onClick={handleAcceptCall}
        >
          <Phone size={18} /> 
          Accept
        </button>
      </div>
    </motion.div>
  );
};

export default IncomingCall;
 