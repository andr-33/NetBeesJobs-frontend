import { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({ message: '', type: '', open: false });

 const openNotification = () => {
    setNotification((prev) => ({ ...prev, open: true }));
 };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const updateNotification = (message, type) => {
    setNotification((prev) => ({
        ...prev,
        message: message,
        type: type
    }));
  }

  return (
    <NotificationContext.Provider value={{ notification, updateNotification, closeNotification, openNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);