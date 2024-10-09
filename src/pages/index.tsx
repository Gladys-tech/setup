import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  // Replace this with actual user role retrieval logic (e.g., from context or props)
  const userRole = 'professional'; // This should come from your authentication logic

  const handleRedirect = () => {
    if (userRole === 'professional') {
      router.push('/professional');
    } else if (userRole === 'client') {
      router.push('/client');
    } else if (userRole === 'company') {
      router.push('/company');
    } else {
      // Handle other roles or a default case
      console.warn('Unknown user role');
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Welcome to BuildSmart</Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Your one-stop solution for managing construction projects efficiently.
      </Typography>
      
      <Button variant="contained" color="primary" onClick={handleRedirect}>
        Go to My Dashboard
      </Button>
    </Box>
  );
};

export default Home;
