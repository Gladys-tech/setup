import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, InputBase, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchText, setSearchText] = useState('');
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md')); // Check if screen is medium (960px) or larger

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ background: '#fff', boxShadow: 'none', borderBottom: '1px solid #ccc', width: '100%' }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Logo container for large and small screens */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', md: 'flex-start' }, // Center on small screens, left-align on large screens
            flexGrow: { xs: 1, md: 0 },  // Grow to center on small screens, don't grow on large screens
          }}
        >
          <Typography variant="h6" component="div" sx={{ color: '#333' }}>
            LOGO
          </Typography>
        </Box>

        {/* Search: Input for large screens, icon for small screens */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginRight: { xs: 0, md: 2 },  // Adjust margin on large screens
          }}
        >
          {isLargeScreen ? (
            <InputBase
              placeholder="Search for Project"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{
                padding: '4px 8px',
                borderRadius: '8px',
                width: '300px',
                border: '1px solid #f0f0f0',
                '&:focus': { backgroundColor: '#e0e0e0' }
              }}
              startAdornment={<SearchIcon sx={{ marginRight: '8px', color: '#F6A700' }} />}
            />
          ) : (
            <IconButton>
              <SearchIcon sx={{ color: '#F6A700' }} />
            </IconButton>
          )}
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


