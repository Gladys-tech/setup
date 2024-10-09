import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';


interface SidebarProps {
  onClose?: () => void; 
}
// const Sidebar = () => {
  const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const theme = useTheme();

  const sidebarContent = (
    <List sx={{ width: 250 }}>
      {/* Home link */}
      <ListItem component={Link} href="/" sx={{ textDecoration: 'none', color: theme.palette.common.black }} onClick={onClose}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>

      {/* Information link */}
      <ListItem component={Link} href="/info" sx={{ textDecoration: 'none', color: theme.palette.common.black }}onClick={onClose}>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="Information" />
      </ListItem>

      {/* Projects link */}
      <ListItem component={Link} href="/projects" sx={{ textDecoration: 'none', color: theme.palette.common.black }} onClick={onClose}>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItem>
    </List>
  );

  return (
    <Box sx={{ width: 250, backgroundColor: '#fff', borderRight: '1px solid #ccc', height: '100%' }}>
      {sidebarContent}
    </Box>
  );
};

export default Sidebar;
