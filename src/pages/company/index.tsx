import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useRouter } from 'next/router';

const HomePage = () => {
    const router = useRouter();

    // Dummy data for total projects count
    const totalProjects = 50;

    // Navigation handler
    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <Box
            sx={{
                height: { xs: '100vh', sm: '450px' },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden', // Prevent scrolling
                fontFamily: 'Inter, sans-serif',
            }}
        >
            <Grid container spacing={4} justifyContent="center">
                {/* Total Projects Tile */}
                <Grid item>
                    <Paper
                        elevation={3}
                        onClick={() => handleNavigation('/company/projects')} // Navigate to projects page
                        sx={{
                            width: 300,
                            height: 300,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            cursor: 'pointer',
                            backgroundColor: '#E8F5E9',
                            '&:hover': {
                                backgroundColor: '#A5D6A7',
                            },
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                            Total Projects
                        </Typography>
                        <Typography variant="h3" sx={{ marginTop: '10px', color: '#388E3C' }}>
                            {totalProjects}
                        </Typography>
                        <Typography sx={{ marginTop: '10px', fontSize: '14px', color: '#4CAF50' }}>
                            Click to view projects
                        </Typography>
                    </Paper>
                </Grid>

                {/* Manage Project Items (M.P.I) Tile */}
                <Grid item>
                    <Paper
                        elevation={3}
                        onClick={() => handleNavigation('/company/manage-material')}
                        sx={{
                            width: 300,
                            height: 300,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            cursor: 'pointer',
                            backgroundColor: '#FFD580', // Tangerine light
                            '&:hover': {
                                backgroundColor: '#FFA726', // Tangerine hover
                            },
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#E65100' }}> {/* Dark Tangerine */}
                            M.P.I
                        </Typography>
                        <Typography variant="h6" sx={{ marginTop: '10px', color: '#FB8C00' }}> {/* Medium Tangerine */}
                            Manage Project Items
                        </Typography>
                        <Typography sx={{ marginTop: '10px', fontSize: '14px', color: '#FFB74D' }}> {/* Light Tangerine */}
                            Click to manage items
                        </Typography>
                    </Paper>
                </Grid>

            </Grid>
        </Box>
    );
};

export default HomePage;
