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

// /**
//  * @typedef {Object} UserContextType
//  * @property {User | null} user - The current user.
//  * @property {React.Dispatch<React.SetStateAction<User | null>>} setUser - Function to update the user.
//  * @property {() => void} logout - Function to log out the user.
//  */

/**
 * @typedef {Object} UserContextType
 * @property {User | null} user - The current user.
 * @property {string | null} token - The current JWT.
 * @property {React.Dispatch<React.SetStateAction<User | null>>} setUser - Function to update the user.
 * @property {React.Dispatch<React.SetStateAction<string | null>>} setToken - Function to update the token.
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

  // Update UserProvider
  const [token, setToken] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token'); // Retrieve token from local storage
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

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token); // Save token to local storage
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout , token, setToken}}>
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
