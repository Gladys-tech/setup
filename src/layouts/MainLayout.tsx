import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';

// import Footer from 'src/components/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        fontFamily: 'Inter, sans-serif !important',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        background: 'linear-gradient(to top, rgba(146, 224, 0, 1) 1%, rgba(146, 224, 0, 0.5) 5%, rgba(146, 224, 0, 0) 10%, #FFFFFF 90%)',
      }}
    >
      <Navbar />

      {/* Flex-grow to occupy the remaining space */}
      <Box
        sx={{
          flex: '1',
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden', // Prevent scrolling
        }}
      >
        {children}
      </Box>

      {/* <Footer /> */}
    </Box>
  );
};

export default MainLayout;
