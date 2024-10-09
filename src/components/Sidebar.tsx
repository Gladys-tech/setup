import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Box, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';

interface SidebarProps {
  userRole: 'client' | 'professional' | 'company'; // Define user roles
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole, onClose }) => {
  const theme = useTheme();

  // Function to render sidebar content based on user role
  const renderSidebarContent = () => {
    switch (userRole) {
      case 'client':
        return (
          <>
            <ListItem component={Link} href="/client/" onClick={onClose} sx={{ width: '231px', font: '14px', padding: '8px', fontWeight: 500, lineHeight: '1.25rem' }}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Client Pages" />
            </ListItem>
            <ListItem component={Link} href="/client/projects" onClick={onClose}>
              <ListItemIcon><InfoIcon /></ListItemIcon>
              <ListItemText primary="My Projects" />
            </ListItem>
            {/* Add more client-specific links here */}
          </>
        );

      case 'professional':
        return (
          // <>
          //   <ListItem component={Link} href="/professional/" onClick={onClose}sx={{width:'231px', font:'14px',padding:'8px', fontWeight:500, lineHeight:'1.25rem'}}>
          //     <ListItemIcon><HomeIcon /></ListItemIcon>
          //     <ListItemText primary="Professional Page" />
          //   </ListItem>
          //   <ListItem component={Link} href="/professional/projects" onClick={onClose} sx={{width:'231px', font:'14px',padding:'8px', fontWeight:500, lineHeight:'1.25rem'}}>
          //     <ListItemIcon><InfoIcon /></ListItemIcon>
          //     <ListItemText primary="My Projects" />
          //   </ListItem>
          //   {/* Add more professional-specific links here */}
          // </>

          <>
            <ListItem
              component={Link}
              href="/professional/"
              onClick={onClose}
              sx={{
                width: '231px',
                fontSize: '14px', 
                padding: '8px',
                fontWeight: 500,
                lineHeight: '1.25rem',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: '40px', // Adjust the space for the icon
                  color: 'primary.main', // Optional: change icon color
                }}
              >
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                primary="Professional Page"
                sx={{
                  color: 'text.primary', // Optional: set text color
                }}
              />
            </ListItem>

            <ListItem
              component={Link}
              href="/professional/projects"
              onClick={onClose}
              sx={{
                width: '231px',
                fontSize: '14px', // Changed 'font' to 'fontSize'
                padding: '8px',
                fontWeight: 500,
                lineHeight: '1.25rem',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: '40px', // Adjust the space for the icon
                  color: 'primary.main', // Optional: change icon color
                }}
              >
                <InfoIcon />
              </ListItemIcon>
              <ListItemText
                primary="My Projects"
                sx={{
                  color: 'text.primary', // Optional: set text color
                }}
              />
            </ListItem>
          </>

        );

      case 'company':
        return (
          <>
            <ListItem component={Link} href="/company/" onClick={onClose}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Company Dashboard" />
            </ListItem>
            <ListItem component={Link} href="/company/projects" onClick={onClose}>
              <ListItemIcon><InfoIcon /></ListItemIcon>
              <ListItemText primary="My Projects" />
            </ListItem>
            {/* Add more company-specific links here */}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: 220, borderRight: '1px solid #92E000', height: '100%' }}>
      <List sx={{ width: 250 }}>
        {renderSidebarContent()}
      </List>
      <Divider sx={{ my: 2, mx: 'auto', width: '90%' }} />
    </Box>
  );
};

export default Sidebar;
