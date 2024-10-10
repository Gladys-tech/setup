import React, { ReactNode, useState } from 'react';
import { Box, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'auto',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        background: 'linear-gradient(to top, rgba(146, 224, 0, 1) 5%, rgba(146, 224, 0, 0.5) 10%, rgba(146, 224, 0, 0) 20%, #FFFFFF 90%)',
      }}
    >
      {/* Main layout container */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Navbar at the top */}
        <Navbar />

        <Box sx={{ display: 'flex', flex: 1 }}>
          {/* Hamburger menu for small screens - conditionally render */}
          {!isSidebarOpen && (
            <IconButton
              sx={{
                display: { xs: 'block', md: 'none' },
                position: 'absolute',
                top: '15px',
                left: '15px',
                zIndex: 1300,
              }}
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Sidebar on larger screens */}
          <Box
            sx={{
              width: 220,
              display: { xs: 'none', md: 'block' }, // Hidden on small screens
              borderRight: '1px solid #92E000',
              maxHeight: '100%', // Make the sidebar occupy the full height of the parent
              fontSize: '14px',
            }}
          >
            <Sidebar userRole={'professional'} />
          </Box>

          {/* Sidebar drawer for small screens */}
          <Drawer
            anchor="left"
            open={isSidebarOpen}
            onClose={toggleSidebar}
            sx={{
              display: { xs: 'block', md: 'none' }, // Only show on small screens
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 220 },
            }}
          >
            <Sidebar onClose={toggleSidebar} userRole={'client'} />
          </Drawer>

          {/* Page content */}
          <Box
            sx={{
              flex: 1,
              padding: 2,
              overflowX: 'auto',
              width: { xs: '100%', md: 'calc(100% - 250px)' }, // Full width on small screens
            }}
          >
            {children}
          </Box>

        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
