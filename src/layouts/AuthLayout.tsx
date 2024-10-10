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
      sx={{
        //  width: '100%',
        // overflowX: 'auto',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        background: 'linear-gradient(to top, rgba(146, 224, 0, 1) 5%, rgba(146, 224, 0, 0.5) 10%, rgba(146, 224, 0, 0) 20%, #FFFFFF 90%)',
      }}
    >
      <Box width="100%" maxWidth="600px" p={3}>
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;

