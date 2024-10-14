import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleLogout = () => {
    localStorage.removeItem('authToken');

    // Redirect to login page
    router.push('/professional/login');

    // Close the menu
    handleMenuClose();
  };

  const handleProfile = () => {
    router.push('/professional/profile');

    // Close the menu
    handleMenuClose();
  }
  return (
    <AppBar
      position="static"
      sx={{ background: '#fff', boxShadow: 'none', borderBottom: '1px solid #ccc', width: '100%' }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Logo always aligned to the left */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Typography variant="h6" component="div" sx={{ color: '#333' }}>
            LOGO
          </Typography>
        </Box>

        {/* Account icon and menu */}
        <IconButton onClick={handleMenuClick} sx={{ color: '#333' }}>
          <AccountCircle />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ mt: '45px' }}
        >
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
