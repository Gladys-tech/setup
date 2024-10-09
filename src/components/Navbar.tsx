import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ background: '#fff', boxShadow: 'none', borderBottom: '1px solid #ccc', width: '100%' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: { xs: 'space-between', md: 'flex-start' } }}>
        {/* Logo container */}
        <Box 
          sx={{
            display: { xs: 'flex', md: 'none' }, // Show only on small screens
            justifyContent: 'center', // Center the logo
            flexGrow: 1,
          }}
        >
          <Typography variant="h6" component="div" sx={{ color: '#333' }}>
            LOGO
          </Typography>
        </Box>

        <Box 
          sx={{
            display: { xs: 'none', md: 'flex' }, // Show only on larger screens
            flexGrow: 1,
          }}
        >
          <Typography variant="h6" component="div" sx={{ color: '#333', textAlign: 'center', flexGrow: 1 }}>
            LOGO
          </Typography>
        </Box>

        {/* Search box */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
          <SearchIcon sx={{ color: '#333' }} />
          {/* <InputBase placeholder="Search Project" sx={{ marginLeft: 1 }} /> */}
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
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
