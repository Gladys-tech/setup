
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'; // Home icon
import InfoIcon from '@mui/icons-material/Info'; // Info icon
import PersonIcon from '@mui/icons-material/Person'; // Profile icon
import SettingsIcon from '@mui/icons-material/Settings'; // Settings icon
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Logout icon
import Link from 'next/link';
import { useThemeContext } from '../ThemeContext';

const Sidebar = () => {
    const { toggleTheme, isDarkMode } = useThemeContext();
  const theme = useTheme(); // Access the theme

  return (
    <List
      sx={{
        // backgroundColor: theme.palette.common.white, // Use the palette for white
         background: isDarkMode ? '#333' : '#fff',
        height: '100vh', // Full height
        padding: 2, // Padding
      }}
    >
      {/* Home */}
      <ListItem component={Link} href="/" sx={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>

      {/* Profile */}
      <ListItem component={Link} href="/profile" sx={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="My Profile" />
      </ListItem>

      {/* Info */}
      <ListItem component={Link} href="/info" sx={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="Information" />
      </ListItem>

      {/* Leave Requests */}
      <ListItem component={Link} href="/leave-requests" sx={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Leave Requests" />
      </ListItem>

       {/* projects*/}
       <ListItem component={Link} href="/projects" sx={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="projects" />
      </ListItem>

      {/* Logout */}
      <ListItem component={Link} href="/logout" sx={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );
};

export default Sidebar;


// // src/components/Sidebar.tsx
// import React from 'react';
// import { List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home'; // Home icon
// import InfoIcon from '@mui/icons-material/Info'; // Info icon
// import PersonIcon from '@mui/icons-material/Person'; // Profile icon
// import SettingsIcon from '@mui/icons-material/Settings'; // Settings icon
// import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Logout icon
// import Link from 'next/link';
// import { useThemeContext } from '../ThemeContext';

// const Sidebar = () => {
//     const { isDarkMode } = useThemeContext(); // Get the dark mode state
//     const theme = useTheme(); // Access the theme

//     return (
//         <List
//             sx={{
//                 background: isDarkMode ? '#333' : '#fff',
//                 // backgroundColor: isDarkMode ? theme.palette.customColors.main : theme.palette.background.paper, // Background color
//                 height: '100vh', // Full height
//                 padding: 2, // Padding
//             }}
//         >
//             {/* Home */}
//             <ListItem component={Link} href="/" sx={{ textDecoration: 'none', color: isDarkMode ? theme.palette.common.white : theme.palette.secondary.main }}>
//                 <ListItemIcon>
//                     <HomeIcon sx={{ color: isDarkMode ? theme.palette.common.white : theme.palette.secondary.main }} />
//                 </ListItemIcon>
//                 <ListItemText primary="Home" sx={{ color: isDarkMode ? theme.palette.common.white : theme.palette.text.primary }} />
//             </ListItem>

//             {/* Profile */}
//             <ListItem component={Link} href="/profile" sx={{ textDecoration: 'none', color: isDarkMode ? theme.palette.common.white : theme.palette.secondary.main }}>
//                 <ListItemIcon>
//                     <PersonIcon sx={{ color: isDarkMode ? theme.palette.common.white : theme.palette.secondary.main }} />
//                 </ListItemIcon>
//                 <ListItemText primary="My Profile" sx={{ color: isDarkMode ? theme.palette.common.white : theme.palette.text.primary }} />
//             </ListItem>

//             {/* Info */}
//             <ListItem component={Link} href="/info" sx={{ textDecoration: 'none', color: isDarkMode ? theme.palette.common.white : theme.palette.secondary.main }}>
//                 <ListItemIcon>
//                     <InfoIcon sx={{ color: isDarkMode ? theme.palette.common.white : theme.palette.secondary.main }} />
//                 </ListItemIcon>
//                 <ListItemText primary="Information" sx={{ color: isDarkMode ? theme.palette.common.white : theme.palette.text.primary }} />
//             </ListItem>

//             {/* Leave Requests */}
//             <ListItem component={Link} href="/leave-requests" sx={{ textDecoration: 'none', color: isDarkMode ? theme.palette.common.white : theme.palette.secondary.main }}>
//                 <ListItemIcon>
//                     <SettingsIcon sx={{ color: isDarkMode ? theme.palette.common.white : theme.palette.secondary.main }} />
//                 </ListItemIcon>
//                 <ListItemText primary="Leave Requests" sx={{ color: isDarkMode ? theme.palette.common.white : theme.palette.text.primary }} />
//             </ListItem>

//             {/* Projects */}
//             <ListItem component={Link} href="/projects" sx={{ textDecoration: 'none', color: isDarkMode ? theme.palette.common.white : theme.palette.secondary.main }}>
//                 <ListItemIcon>
//                     <SettingsIcon sx={{ color: isDarkMode ? theme.palette.common.white : theme.palette.secondary.main }} />
//                 </ListItemIcon>
//                 <ListItemText primary="Projects" sx={{ color: isDarkMode ? theme.palette.common.white : theme.palette.text.primary }} />
//             </ListItem>

//             {/* Logout */}
//             <ListItem component={Link} href="/logout" sx={{ textDecoration: 'none', color: isDarkMode ? theme.palette.common.white : theme.palette.secondary.main }}>
//                 <ListItemIcon>
//                     <ExitToAppIcon sx={{ color: isDarkMode ? theme.palette.common.white : theme.palette.secondary.main }} />
//                 </ListItemIcon>
//                 <ListItemText primary="Logout" sx={{ color: isDarkMode ? theme.palette.common.white : theme.palette.text.primary }} />
//             </ListItem>
//         </List>
//     );
// };

// export default Sidebar;
