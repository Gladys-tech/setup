import React, { useState } from 'react';
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputAdornment, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';

// Define project interface
interface Project {
    id: number;
    name: string;
    client: string;
    location: string;
    payDueDate: string;
    status: string;
}


// Sample projects data
const projects: Project[] = [
    { id: 1, name: 'Mulago Bangalo', client: 'Mr. Jackson', location: 'Mulago', payDueDate: '11/12/22', status: 'Complete' },
    { id: 2, name: 'Buziga 2 bed room', client: 'Bob Mercy', location: 'Buziga', payDueDate: '2/12/22', status: 'Complete' },
    { id: 3, name: 'Mulago Bangalo', client: 'Mr. Jackson', location: 'Mulago', payDueDate: '11/12/22', status: 'In Progress' },
    { id: 4, name: 'Buziga 2 bed room', client: 'Bob Mercy', location: 'Buziga', payDueDate: '2/12/22', status: 'Complete' },
    { id: 5, name: 'Mulago Bangalo', client: 'Mr. Jackson', location: 'Mulago', payDueDate: '11/12/22', status: 'In Progress' },
    { id: 6, name: 'Mulago Bangalo', client: 'Mr. Jackson', location: 'Mulago', payDueDate: '11/12/22', status: 'Complete' },
    { id: 7, name: 'Buziga 2 bed room', client: 'Bob Mercy', location: 'Buziga', payDueDate: '2/12/22', status: 'In Progress' },
    { id: 8, name: 'Mulago Bangalo', client: 'Mr. Jackson', location: 'Mulago', payDueDate: '11/12/22', status: 'In Progress' },
    { id: 9, name: 'Buziga 2 bed room', client: 'Bob Mercy', location: 'Buziga', payDueDate: '2/12/22', status: 'Complete' },
    { id: 10, name: 'Mulago Bangalo', client: 'Mr. Jackson', location: 'Mulago', payDueDate: '11/12/22', status: 'In Progress' },
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
    const [shareOpen, setShareOpen] = useState(false); // For share link modal
    const [shareLink, setShareLink] = useState(''); // Share link state

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


    const router = useRouter();

    // const handleProjectClick = (projectId: number) => {
    //     router.push(`/professional/projects/${projectId}`);
    // };

    // Handle project click, excluding action buttons
    const handleProjectClick = (projectId: number, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        // Exclude clicks from buttons inside the "Actions" column
        if ((event.target as HTMLElement).closest('.action-btns')) return;

        router.push(`/professional/projects/${projectId}`);
    };

    // Handle download button click
    const handleDownload = (projectName: string) => {
        alert(`Download initiated for ${projectName}`);
        // Simulate a file download here if needed
    };

    const handleShareOpen = () => setShareOpen(true);
    const handleShareClose = () => setShareOpen(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareLink);
        alert("Link copied to clipboard!");
    };

    const handleShareViaEmail = () => {
        const subject = encodeURIComponent(`Check out this project: `);
        const body = encodeURIComponent(`Hi,\n\nHere is the link to the project "":\n${shareLink}\n\nBest regards.`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    return (
        <Box display="flex" flexDirection="column" flexGrow={1} p={1}>
            <Grid container spacing={3}>
                {/* First Box: Home Icon */}
                <Grid item xs={12} sm={4} md={4}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            textAlign: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: 1,
                                width: 64,
                                height: 64,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 1,
                                boxShadow: 3,
                                transition: '0.3s',
                                '&:hover': { boxShadow: 6 },
                                cursor: 'pointer',
                            }}
                        >
                            <HomeIcon sx={{ fontSize: 40, color: 'white' }} />
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            Sample Project
                        </Typography>
                    </Box>
                </Grid>

                {/* Second Box: Create Project */}
                <Grid item xs={12} sm={4} md={4}>
                    <Box
                        onClick={handleClickOpen}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            textAlign: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: theme.palette.secondary.main,
                                borderRadius: 1,
                                width: 64,
                                height: 64,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 1,
                                boxShadow: 3,
                                transition: '0.3s',
                                '&:hover': { boxShadow: 6 },
                                cursor: 'pointer',
                            }}
                        >
                            <AddIcon sx={{ fontSize: 40, color: 'white' }} />
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            Create Project
                        </Typography>
                    </Box>
                </Grid>

                {/* Third Box: Search TextField */}
                <Grid item xs={12} sm={4} md={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', }}>
                        <TextField
                            placeholder="Search projects..."
                            variant="outlined"
                            size="small"
                            sx={{
                                width: '100%',
                                boxShadow: 1,
                                borderRadius: 2, // Smooth border radius
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: theme.palette.grey[300],
                                    },
                                    '&:hover fieldset': {
                                        borderColor: theme.palette.grey[400],
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: theme.palette.primary.main,
                                    },
                                },
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon sx={{ color: theme.palette.primary.main }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>

            {/* Projects Table */}
            <Box mt={4}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: theme.palette.primary.main, fontSize: '16PX' }}>My Projects</Typography>
                </Box>

                <TableContainer component={Paper} sx={{ boxShadow: 3, overflowX: 'auto', minWidth: 300, maxHeight: 250, overflowY: 'auto', }}>
                    <Table stickyHeader
                        aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{
                                    fontWeight: 600, padding: '6px 10px', position: 'sticky',
                                    top: 0,
                                    backgroundColor: theme.palette.background.paper,
                                    zIndex: 1,
                                }}>
                                    Name
                                </TableCell>
                                <TableCell sx={{
                                    fontWeight: 600, padding: '6px 10px', position: 'sticky',
                                    top: 0,
                                    backgroundColor: theme.palette.background.paper,
                                    zIndex: 1,
                                }}>
                                    Client
                                </TableCell>
                                <TableCell sx={{
                                    fontWeight: 600, padding: '6px 10px', position: 'sticky',
                                    top: 0,
                                    backgroundColor: theme.palette.background.paper,
                                    zIndex: 1,
                                }}>
                                    Location
                                </TableCell>
                                <TableCell sx={{
                                    fontWeight: 600, padding: '6px 10px', position: 'sticky',
                                    top: 0,
                                    backgroundColor: theme.palette.background.paper,
                                    zIndex: 1,
                                }}>
                                    Pay Due Date
                                </TableCell>
                                <TableCell sx={{
                                    fontWeight: 600, padding: '6px 10px', position: 'sticky',
                                    top: 0,
                                    backgroundColor: theme.palette.background.paper,
                                    zIndex: 1,
                                }}>
                                    Status
                                </TableCell>
                                <TableCell sx={{
                                    fontWeight: 600, padding: '6px 10px', position: 'sticky',
                                    top: 0,
                                    backgroundColor: theme.palette.background.paper,
                                    zIndex: 1,
                                }}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects.map((project) => (
                                <TableRow key={project.id} sx={{ height: '20px', cursor: 'pointer' }}
                                    onClick={(event) => handleProjectClick(project.id, event)}
                                //  onClick={() => handleProjectClick(project.id)}
                                >
                                    <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.main, padding: '4px 8px' }}>{project.name}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{project.client}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{project.location}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{project.payDueDate}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px', }}>
                                        <Box
                                            sx={{
                                                minWidth: '100px',
                                                padding: '4px 8px',
                                                backgroundColor:
                                                    project.status === 'Complete'
                                                        ? 'rgba(108, 117, 125, 0.1)' // light gray
                                                        : project.status === 'In Progress'
                                                            ? 'rgba(220, 53, 69, 0.1)' // light red
                                                            : 'rgba(0, 0, 0, 0.05)', // default light black for unknown status
                                                color:
                                                    project.status === 'Complete' ? '#6c757d' : '#333', // darker color for complete
                                                borderRadius: '4px',
                                                display: 'inline-block',
                                            }}>
                                            {project.status}
                                        </Box>
                                    </TableCell>
                                    <TableCell className="action-btns" sx={{
                                        display: 'flex', justifyContent: 'center', padding: '4px 8px', flexDirection: 'column',
                                        alignItems: 'flex-start',
                                    }}>
                                        <Box display="flex" gap={1} justifyContent="center" >
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                sx={{
                                                    minWidth: '34px',
                                                    minHeight: '34px',
                                                    padding: 0,
                                                    borderRadius: '8px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    '&:hover': {
                                                        backgroundColor: theme => theme.palette.primary.dark,
                                                    },
                                                }}
                                                onClick={handleShareOpen}
                                            >
                                                <ShareIcon sx={{ color: 'white' }} />
                                            </Button>

                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                sx={{
                                                    minWidth: '34px',
                                                    minHeight: '34px',
                                                    padding: 0,
                                                    borderRadius: '8px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    '&:hover': {
                                                        backgroundColor: theme => theme.palette.primary.dark,
                                                    },
                                                }}
                                                onClick={() => handleDownload(project.name)}
                                            >
                                                <DownloadIcon sx={{ color: 'white' }} />
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Share Link Popup */}
            <Dialog open={shareOpen} onClose={handleShareClose}>
                <DialogTitle>Share Project Link</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Shareable Link"
                        fullWidth
                        margin="normal"
                        value={shareLink}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <Button
                        variant="contained"
                        startIcon={<ContentCopyIcon />}
                        onClick={handleCopyLink}
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            mt: 2,
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.main
                            }
                        }}
                    >
                        Copy Link
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<EmailIcon />}
                        onClick={handleShareViaEmail}
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            mt: 2,
                            ml: 2,
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.main
                            }
                        }}
                    >
                        Share via Email
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleShareClose}
                        variant='contained'
                        sx={{
                            backgroundColor: theme.palette.error.main,
                            color: theme.palette.primary.contrastText,
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: theme.palette.error.dark
                            }
                        }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal for Create Project */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Project</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Box display="flex" justifyContent="space-between">
                            <FormControl variant="outlined" size="small" sx={{ width: '48%' }}>
                                <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: '500' }}>Project Name</Typography>
                                <TextField
                                    variant="outlined"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    size="small"
                                    sx={{ height: '40px' }}
                                />
                            </FormControl>
                            <FormControl variant="outlined" size="small" sx={{ width: '48%' }}>
                                <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: '500' }}>Client Name</Typography>
                                <TextField
                                    variant="outlined"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    size="small"
                                    sx={{ height: '40px' }}
                                />
                            </FormControl>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <FormControl variant="outlined" size="small" sx={{ width: '48%' }}>
                                <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: '500' }}>Location</Typography>
                                <TextField
                                    variant="outlined"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    size="small"
                                    sx={{ height: '40px' }}
                                />
                            </FormControl>
                            <Box sx={{ width: '48%' }}>
                                <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: '500' }}>Project Image</Typography>
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
                            <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: '500' }}>Phases</Typography>
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
                    <Button onClick={handleClose} variant='contained'
                        sx={{
                            backgroundColor: theme.palette.error.main,
                            color: theme.palette.primary.contrastText,
                            font: '12px',
                            textTransform: 'none',
                            height: '35px',
                            borderRadius: '10px',
                            '&:hover': {
                                backgroundColor: theme.palette.error.dark
                            }
                        }}>Cancel</Button>
                    <Button onClick={handleCreateProject}
                        variant='contained'
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            font: '12px',
                            textTransform: 'none',
                            height: '35px',
                            borderRadius: '10px',
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.main
                            }
                        }}
                    >Create</Button>
                </DialogActions>
            </Dialog>


        </Box>
    );
};

export default Projects;
