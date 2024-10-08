// src/layouts/AuthLayout.tsx
import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

interface AuthLayoutProps {
  children: ReactNode; // Explicitly type the children prop
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Box 
      display="flex" 
      minHeight="100vh" 
      justifyContent="center" 
      alignItems="center" // Center content vertically and horizontally
      // sx={{ backgroundColor: '#f4f6f8' }} // Optional background color
    >
      <Box width="100%" maxWidth="600px" p={3}>
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;

