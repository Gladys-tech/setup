import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router';
import { useUser } from 'src/context/UserContext';


// Define the user structure as a TypeScript interface
interface Role {
  roleName: string;
}
interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  companyName: string | null;
  address: Address;
  email: string;
  roles: Role[];
  image: string | null;
  password: string | null;
  isEmailVerified: boolean | null;
  emailVerificationToken: string | null;
  agreeToTerms: boolean | null;
  rememberMe: boolean | null;
  apiToken: string | null;
  resetToken: string | null;
  resetTokenExpires: Date | null;
}

interface Address {
  city: string;
  country: string;
  telphone: string;
}


const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  // const { user } = useUser();
  const { user } = useUser() as { user: User | null };

  // Log the user data for debugging
  useEffect(() => {
    console.log("User data from context:", user);
  }, [user]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user'); // Remove the user data

    // Redirect to login page based on the userRole
    if (user?.roles[0]?.roleName === 'professional') {
      router.push('/professional/login');
    } else if (user?.roles[0]?.roleName === 'client') {
      router.push('/client/login');
    } else if (user?.roles[0]?.roleName === 'company') {
      router.push('/company/login');
    }

    handleMenuClose();
  };

  const handleProfile = () => {
    // Redirect to profile page based on the userRole
    if (user?.roles[0]?.roleName === 'professional') {
      router.push('/professional/profile');
    } else if (user?.roles[0]?.roleName === 'client') {
      router.push('/client/profile');
    } else if (user?.roles[0]?.roleName === 'company') {
      router.push('/company/profile');
    }

    handleMenuClose();
  };

  const handleLogoClick = () => {
    // Redirect to the home page based on the userRole
    if (user?.roles[0]?.roleName === 'professional') {
      router.push('/professional');
    } else if (user?.roles[0]?.roleName === 'client') {
      router.push('/client');
    } else if (user?.roles[0]?.roleName === 'company') {
      router.push('/company');
    }
  };

  return (
    <AppBar
      position="static"
      sx={{ background: '#fff', boxShadow: 'none', borderBottom: '1px solid #ccc', width: '100%' }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Logo that navigates back to respective home */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', cursor: 'pointer' }} onClick={handleLogoClick}>
          <Typography variant="h6" component="div" sx={{ color: '#333' }}>
            LOGO
          </Typography>
        </Box>

        {/* Account icon and menu */}
        {/* <IconButton onClick={handleMenuClick} sx={{ color: '#333' }}>
          <AccountCircle />
          {user && (
            <Typography variant="h6" component="div" sx={{ color: '#333', marginRight: '10px' }}>
              {user.firstName.toLowerCase()}
              {/* {user.lastName.toLowerCase()}  */}
        {/* </Typography>
          )}

        </IconButton> */}

        <IconButton onClick={handleMenuClick} sx={{ color: '#333' }}>
          <AccountCircle />
          {user && (
            <Typography variant="h6" component="div" sx={{ color: '#333', marginRight: '10px' }}>
              {(user.firstName?.toLowerCase() || 'Guest')}
              {/* {user.lastName?.toLowerCase()}  */} 
            </Typography>
          )}
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
