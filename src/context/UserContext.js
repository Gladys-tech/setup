import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * @typedef {Object} Role
 * @property {string} roleName - The name of the role.
 */

/**
 * @typedef {Object} User
 * @property {string} id - The user's ID.
 * @property {string | null} firstName - The user's first name.
 * @property {string | null} lastName - The user's last name.
 * @property {string} email - The user's email.
 * @property {Role[]} roles - Array of user roles.
 */

/**
 * @typedef {Object} UserContextType
 * @property {User | null} user - The current user.
 * @property {React.Dispatch<React.SetStateAction<User | null>>} setUser - Function to update the user.
 * @property {() => void} logout - Function to log out the user.
 */

// Create the context
const UserContext = createContext(/** @type {UserContextType | undefined} */(undefined));

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
