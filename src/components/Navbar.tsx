
// src/components/Navbar.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box, IconButton, Menu, MenuItem, Switch } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
// import Brightness4Icon from '@mui/icons-material/Brightness4'; // For dark/light mode icon
// import Brightness7Icon from '@mui/icons-material/Brightness7'; // For dark/light mode icon

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [darkMode, setDarkMode] = useState(false); // Dark mode state

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

//   const toggleDarkMode = () => {
//     setDarkMode((prev) => !prev);
//     // Implement your dark mode toggle logic here (e.g., changing the theme context)
//   };

  return (
    <AppBar position="static" sx={{ background: '#fff', boxShadow: 'none', borderBottom: '1px solid #ccc', width: '100%' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" sx={{ color: '#333' }}>
            LOGO
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
          <SearchIcon sx={{ color: '#333' }} />
          <InputBase placeholder="Search Employee" sx={{ marginLeft: 1 }} />
        </Box>
        {/* <IconButton onClick={toggleDarkMode} sx={{ color: '#333' }}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton> */}
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


// // src/components/Navbar.tsx
// import React from 'react';
// import { AppBar, Toolbar, Typography, InputBase, Box, IconButton, Menu, MenuItem } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// import { useThemeContext } from '../ThemeContext';

// const Navbar = () => {
//   const { toggleTheme, isDarkMode } = useThemeContext();
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
//   const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <AppBar position="static" sx={{ background: isDarkMode ? '#333' : '#fff', boxShadow: 'none', borderBottom: '1px solid #ccc' }}>
//       <Toolbar>
//         <Box sx={{ flexGrow: 1 }}>
//           <Typography variant="h6" component="div" sx={{ color: isDarkMode ? '#fff' : '#333' }}>
//             LOGO
//           </Typography>
//         </Box>
//         <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
//           <SearchIcon sx={{ color: isDarkMode ? '#fff' : '#333' }} />
//           <InputBase
//             placeholder="Search Employee"
//             sx={{
//               marginLeft: 1,
//               background: isDarkMode ? '#444' : '#fff',
//               color: isDarkMode ? '#fff' : '#333',
//               borderRadius: 1,
//               padding: 1,
//               '& .MuiInputBase-input': {
//                 color: isDarkMode ? '#fff' : '#333',
//               },
//               '& .MuiInputBase-input:focus': {
//                 background: isDarkMode ? '#555' : '#f0f0f0',
//               },
//             }}
//           />
//         </Box>
//         <IconButton onClick={toggleTheme} sx={{ color: isDarkMode ? '#fff' : '#333' }}>
//           {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//         </IconButton>
//         <IconButton onClick={handleMenuClick} sx={{ color: isDarkMode ? '#fff' : '#333' }}>
//           <AccountCircle />
//         </IconButton>
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleMenuClose}
//           sx={{ mt: '45px' }}
//         >
//           <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//           <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
//         </Menu>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;
