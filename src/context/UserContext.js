import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context
const UserContext = createContext(undefined);

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user data from local storage if it exists
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  useEffect(() => {
    // Update local storage whenever the user state changes
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user'); // Clear user from local storage if null
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
