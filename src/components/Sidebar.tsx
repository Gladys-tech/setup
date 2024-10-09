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
            <ListItem component={Link} href="/client/" onClick={onClose}>
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
          <>
            <ListItem component={Link} href="/professional/" onClick={onClose}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Professional Page" />
            </ListItem>
            <ListItem component={Link} href="/professional/projects" onClick={onClose}>
              <ListItemIcon><InfoIcon /></ListItemIcon>
              <ListItemText primary="My Projects" />
            </ListItem>
            {/* Add more professional-specific links here */}
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
    <Box sx={{ width: 250, borderRight: '1px solid #ccc', height: '100%' }}>
      <List sx={{ width: 250 }}>
        {renderSidebarContent()}
      </List>
      <Divider sx={{ my: 2, mx: 'auto', width: '90%' }} />
    </Box>
  );
};

export default Sidebar;
