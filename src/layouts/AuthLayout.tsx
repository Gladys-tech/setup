import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Box
      display="flex"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Box width="100%" maxWidth="600px" p={3}>
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;

