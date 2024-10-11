import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        background: 'linear-gradient(to top, rgba(146, 224, 0, 1) 1%, rgba(146, 224, 0, 0.5) 5%, rgba(146, 224, 0, 0) 10%, #FFFFFF 90%)',
      }}
    >
      {/* Main layout container */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Navbar at the top */}
        <Navbar />

        {/* Page content */}
        <Box
          sx={{
            flex: 1,
            padding: 2,
            overflowX: 'auto',
            width: '100%',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
