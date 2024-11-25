import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { API_BASE_URL } from '../api/http.api';

const HomePage = () => {
    const router = useRouter();
    const [totalProjects, setTotalProjects] = useState<number>(0);

    // Fetch total projects count
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found');
                }
                const response = await fetch(`${API_BASE_URL}/projects/professional`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setTotalProjects(data.length); // Assuming the API returns an array of projects
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);


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
                            height: 250,
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
                        <Typography variant="h1" sx={{ marginTop: '5px', color: '#388E3C' }}>
                            {totalProjects}
                        </Typography>
                        <Typography sx={{ marginTop: '60px', fontSize: '14px', color: '#4CAF50' }}>
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
                            height: 250,
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
                        <Typography variant="h5" sx={{ fontWeight: 'bold', }}> {/* color: '#E65100' Dark Tangerine */}
                            Material Price Index
                        </Typography>
                        <Typography variant="h1" sx={{ marginTop: '5px', }}> {/* color: '#FB8C00' Medium Tangerine */}
                            M.P.I
                        </Typography>
                        <Typography sx={{ marginTop: '60px', fontSize: '14px', }}> {/* color: '#FFB74D' Light Tangerine */}
                            Click to manage items
                        </Typography>
                    </Paper>
                </Grid>

            </Grid>

            {/* Floating button for roles page */}
            <IconButton
                onClick={() => handleNavigation('/company/roles')}
                sx={{
                    position: 'absolute',
                    top: 100,
                    right: 20,
                    backgroundColor: '#FFA726',
                    '&:hover': {
                        backgroundColor: '#FB8C00',
                    },
                }}
            >
                <AddCircleIcon sx={{ color: 'white' }} />
            </IconButton>
        </Box>
    );
};

export default HomePage;
