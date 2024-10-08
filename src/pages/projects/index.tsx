import React from 'react';
import { Box, Button, Card, Grid, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';

// Define project interface
interface Project {
    id: number;
    name: string;
    amount: string;
    client: string;
    location: string;
    payDueDate: string;
    status: string;
}

// Sample projects data
const projects: Project[] = [
    { id: 1, name: 'Mulago Bangalo', amount: 'Ugx 430,000', client: 'Mr. Jackson', location: 'Mulago', payDueDate: '11/12/22', status: 'In Progress' },
    { id: 2, name: 'Buziga 2 bed room', amount: 'Ugx 257,000', client: 'Bob Mercy', location: 'Buziga', payDueDate: '2/12/22', status: 'Complete' },
];

const Projects = () => {
    const theme = useTheme(); // Access the theme

    return (
        <Box display="flex" flexDirection="column" flexGrow={1} p={3}>
            <Typography variant="h5" gutterBottom>Buildsmart Constructors</Typography>
            <Grid container spacing={3} justifyContent="center">
                {/* First Card: Home Icon */}
                <Grid item xs={3}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, textAlign: 'center', boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
                        <Box sx={{
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: 1,
                            width: 64,
                            height: 64,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 1
                        }}>
                            <HomeIcon sx={{ fontSize: 40, color: 'white' }} />
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Sample Project</Typography>
                    </Card>
                </Grid>

                {/* Second Card: Plus Icon */}
                <Grid item xs={3}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, textAlign: 'center', boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
                        <Box sx={{
                            backgroundColor: theme.palette.secondary.main,
                            borderRadius: 1,
                            width: 64,
                            height: 64,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 1
                        }}>
                            <AddIcon sx={{ fontSize: 40, color: 'white' }} />
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Create Project</Typography>
                    </Card>
                </Grid>
            </Grid>

            {/* Projects Table */}
            <Box mt={4}>
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>My Projects</Typography>
                </Box>

                <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Client</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Pay Due Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>{project.name}</TableCell>
                                    <TableCell>{project.amount}</TableCell>
                                    <TableCell>{project.client}</TableCell>
                                    <TableCell>{project.location}</TableCell>
                                    <TableCell>{project.payDueDate}</TableCell>
                                    <TableCell>{project.status}</TableCell>
                                    <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Box display="flex" gap={1} justifyContent="center">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                sx={{
                                                    minWidth: '40px',
                                                    padding: 1,
                                                    color: 'white',
                                                    '&:hover': {
                                                        backgroundColor: theme => theme.palette.primary.dark,
                                                    },
                                                }}
                                                startIcon={<ShareIcon sx={{ color: 'white' }} />}
                                            />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                sx={{
                                                    minWidth: '40px',
                                                    padding: 1,
                                                    color: 'white',
                                                    '&:hover': {
                                                        backgroundColor: theme => theme.palette.primary.dark,
                                                    },
                                                }}
                                                startIcon={<DownloadIcon sx={{ color: 'white' }} />}
                                            />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Pagination count={10} color="primary" />
                </Box>
            </Box>
        </Box>
    );
};

export default Projects;
