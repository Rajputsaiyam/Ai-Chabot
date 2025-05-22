import  { createContext, useState, useContext, useEffect } from 'react';

const UiContext = createContext();

export const useUi = () => useContext(UiContext);

export const UiProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showUserProfile, setShowUserProfile] = useState(window.innerWidth >= 1280);
  const [showIncomingCall, setShowIncomingCall] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      setShowSidebar(!mobile);
      setShowUserProfile(window.innerWidth >= 1280);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Simulate an incoming call after 45 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIncomingCall(true);
      addNotification({
        type: 'incoming-call',
        title: 'Incoming Call',
        message: 'Michael Davis is calling you',
        time: new Date()
      });
    }, 45000);

    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const toggleUserProfile = () => setShowUserProfile(!showUserProfile);

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const removeNotification = (index) => {
    setNotifications(prev => prev.filter((_, i) => i !== index));
  };

  const dismissIncomingCall = () => {
    setShowIncomingCall(false);
    addNotification({
      type: 'missed-call',
      title: 'Missed Call',
      message: 'You missed a call from Michael Davis',
      time: new Date()
    });
  };

  return (
    <UiContext.Provider value={{
      darkMode,
      isMobileView,
      showSidebar,
      showUserProfile,
      showIncomingCall,
      notifications,
      toggleDarkMode,
      toggleSidebar,
      toggleUserProfile,
      setShowSidebar,
      setShowUserProfile,
      dismissIncomingCall,
      setShowIncomingCall,
      addNotification,
      removeNotification
    }}>
      {children}
    </UiContext.Provider>
  );
};
 