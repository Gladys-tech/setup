import React, { useState } from 'react';
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import UploadFileIcon from '@mui/icons-material/UploadFile';

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
    { id: 3, name: 'Mulago Bangalo', amount: 'Ugx 430,000', client: 'Mr. Jackson', location: 'Mulago', payDueDate: '11/12/22', status: 'In Progress' },
    { id: 4, name: 'Buziga 2 bed room', amount: 'Ugx 257,000', client: 'Bob Mercy', location: 'Buziga', payDueDate: '2/12/22', status: 'Complete' },
    { id: 5, name: 'Mulago Bangalo', amount: 'Ugx 430,000', client: 'Mr. Jackson', location: 'Mulago', payDueDate: '11/12/22', status: 'In Progress' },
    // { id: 2, name: 'Buziga 2 bed room', amount: 'Ugx 257,000', client: 'Bob Mercy', location: 'Buziga', payDueDate: '2/12/22', status: 'Complete' },
];

// Sample phases data
const phases = [
    { id: 1, name: 'Foundation' },
    { id: 2, name: 'Spring beam' },
    { id: 3, name: 'Roofing' },
];

const Projects = () => {
    const theme = useTheme(); // Access the theme
    const [open, setOpen] = useState(false); // Modal open state
    const [projectName, setProjectName] = useState('');
    const [clientName, setClientName] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [phaseId, setPhaseId] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        // Reset fields after closing
        setProjectName('');
        setClientName('');
        setLocation('');
        setImage(null);
        setPhaseId('');
    };

    const handleCreateProject = () => {
        // Handle project creation logic here
        console.log({
            projectName,
            clientName,
            location,
            image,
            phaseId,
        });
        handleClose();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImage(files[0]); // Set the first file selected
        } else {
            setImage(null); // Set to null if no files are selected
        }
    };

    return (
        <Box display="flex" flexDirection="column" flexGrow={1} p={1}>
            {/* <Typography variant="h5" gutterBottom>Buildsmart Constructors</Typography>  p={3} */}
            <Grid container spacing={3} justifyContent="center">
                {/* First Card: Home Icon */}
                <Grid item xs={3}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, width: '150px', height: '120px', textAlign: 'center', boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
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
                    <Card onClick={handleClickOpen} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, width: '150px', height: '120px', textAlign: 'center', boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
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
                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: theme.palette.primary.main, fontSize: '16PX' }}>My Projects</Typography>
                </Box>

                <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600, padding: '6px 10px' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 600, padding: '6px 10px' }}>Amount</TableCell>
                                <TableCell sx={{ fontWeight: 600, padding: '6px 10px' }}>Client</TableCell>
                                <TableCell sx={{ fontWeight: 600, padding: '6px 10px' }}>Location</TableCell>
                                <TableCell sx={{ fontWeight: 600, padding: '6px 10px' }}>Pay Due Date</TableCell>
                                <TableCell sx={{ fontWeight: 600, padding: '6px 10px' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 600, padding: '6px 10px' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects.map((project) => (
                                <TableRow key={project.id} sx={{ height: '20px' }}>
                                    <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.main, padding: '4px 8px' }}>{project.name}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{project.amount}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{project.client}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{project.location}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{project.payDueDate}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{project.status}</TableCell>
                                    <TableCell sx={{ display: 'flex', justifyContent: 'center', padding: '4px 8px' }}>
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

            {/* Modal for Create Project */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Project</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Box display="flex" justifyContent="space-between">
                            <FormControl variant="outlined" size="small" sx={{ width: '48%' }}>
                                <InputLabel>Project Name</InputLabel>
                                <TextField
                                    variant="outlined"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    size="small" // Ensure TextField is small
                                    sx={{ height: '40px' }} // Custom height for TextField
                                />
                            </FormControl>
                            <FormControl variant="outlined" size="small" sx={{ width: '48%' }}>
                                <InputLabel>Client Name</InputLabel>
                                <TextField
                                    variant="outlined"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    size="small" // Ensure TextField is small
                                    sx={{ height: '40px' }} // Custom height for TextField
                                />
                            </FormControl>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <FormControl variant="outlined" size="small" sx={{ width: '48%' }}>
                                <InputLabel>Location</InputLabel>
                                <TextField
                                    variant="outlined"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    size="small" // Ensure TextField is small
                                    sx={{ height: '40px' }} // Custom height for TextField
                                />
                            </FormControl>
                            <Box sx={{ width: '48%' }}>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    startIcon={<UploadFileIcon />}
                                    fullWidth
                                >
                                    Upload Image
                                    <input
                                        type="file"
                                        hidden
                                        onChange={handleFileChange}
                                    />
                                </Button>
                                {image && <Typography sx={{ mt: 1 }}>{image.name}</Typography>}
                            </Box>
                        </Box>
                        <FormControl variant="outlined" size="small" sx={{ width: '100%' }}>
                            <InputLabel>Phase</InputLabel>
                            <Select
                                value={phaseId}
                                onChange={(e) => setPhaseId(e.target.value)}
                            >
                                {phases.map((phase) => (
                                    <MenuItem key={phase.id} value={phase.id}>
                                        {phase.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleCreateProject} color="primary">Create</Button>
                </DialogActions>
            </Dialog>


        </Box>
    );
};

export default Projects;
