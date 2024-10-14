import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme, IconButton } from '@mui/material';
import Image from 'next/image';
import projects from '../projectData';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';

const ProjectDetails = () => {
    const theme = useTheme();
    const router = useRouter();
    const { id } = router.query;
    const [project, setProject] = useState<any>(null);

    const [open, setOpen] = useState(false); // For handling modal
    const [shareOpen, setShareOpen] = useState(false); // For share link modal
    const [shareLink, setShareLink] = useState(''); // Share link state

    // Define phases and their totals in state
    const [phases, setPhases] = useState([
        { name: 'Foundation', total: 10000 },
        { name: 'Ring beam', total: 20000 },
        { name: 'Roofing', total: 30000 },
        { name: 'Window + Doors', total: 34500 },
        { name: 'Electrical', total: 60000 },
        { name: 'Interior', total: 56700 },
        { name: 'Fittings', total: 23000 },
        { name: 'Exterior', total: 40000 },
    ]);

    useEffect(() => {
        if (id) {
            const selectedProject = projects.find((project: { id: number }) => project.id === parseInt(id as string));
            setProject(selectedProject);
        }
    }, [id]);

    // Handle input changes for each phase
    const handleInputChange = (index: number, value: number) => {
        const updatedPhases = [...phases];
        updatedPhases[index].total = value;
        setPhases(updatedPhases);
    };


    // Navigate to material schedule page with phase info
    const handleEditClick = (phaseName: string) => {
        router.push(`/professional/materialschedule/${phaseName}`);
    };


    // Handle modal open/close
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleShareOpen = () => setShareOpen(true);
    const handleShareClose = () => setShareOpen(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareLink);
        alert("Link copied to clipboard!");
    };

    const handleShareViaEmail = () => {
        const subject = encodeURIComponent(`Check out this project: ${project.name}`);
        const body = encodeURIComponent(`Hi,\n\nHere is the link to the project "${project.name}":\n${shareLink}\n\nBest regards.`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    if (!project) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box p={4} position="relative" sx={{
            minHeight: '100vh', // Make the container take full viewport height
            overflow: 'hidden', // Prevent scrolling
        }}>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleOpen}
                sx={{ position: 'absolute', top: 5, right: 16 }}
            >
                Project Details
            </Button>

            {/* Responsive SVG Image and phase inputs */}
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={8}>
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: '800px',
                            margin: '0 auto',
                            display: 'flex',
                            justifyContent: 'center',
                            maxHeight: '500px',
                        }}
                    >
                        <Image
                            src="/assets/images/phases diagram.svg"
                            alt="Phases Diagram"
                            layout="responsive"
                            width={800}
                            height={600}
                        />
                    </Box>
                </Grid>


                {/* Phase totals and edit buttons */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ mt: '50px', mb: '10px' }}>
                        {phases
                            .slice()
                            .reverse()
                            .map((phase, index) => (
                                <Box key={index} mb={3} display="flex" alignItems="center">
                                    <Typography sx={{ fontWeight: 'bold', mr: 2 }}>{phase.total}</Typography>
                                    <IconButton
                                        sx={{
                                            backgroundColor: theme.palette.primary.main,
                                            color: theme.palette.primary.contrastText,
                                            height: '30px',
                                            ml: 2,
                                            borderRadius: '6px',
                                            '&:hover': {
                                                backgroundColor: theme.palette.secondary.main
                                            }
                                        }}
                                        onClick={() => handleEditClick(phase.name)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            ))}
                    </Box>
                </Grid>
            </Grid>

            {/* Share Icon */}
            <IconButton
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    borderRadius: '50%',
                    '&:hover': {
                        backgroundColor: theme.palette.secondary.main
                    }
                }}
                onClick={handleShareOpen}
            >
                <ShareIcon />
            </IconButton>

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

            {/* Popup Modal for editing project details */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Project Details</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Project Name"
                        fullWidth
                        margin="normal"
                        value={project.name}
                        onChange={(e) => setProject({ ...project, name: e.target.value })}
                    />
                    <TextField
                        label="Client"
                        fullWidth
                        margin="normal"
                        value={project.client}
                        onChange={(e) => setProject({ ...project, client: e.target.value })}
                    />
                    <TextField
                        label="Location"
                        fullWidth
                        margin="normal"
                        value={project.location}
                        onChange={(e) => setProject({ ...project, location: e.target.value })}
                    />
                    <TextField
                        label="Amount"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={project.amount}
                        onChange={(e) => setProject({ ...project, amount: e.target.value })}
                    />
                    <TextField
                        label="Pay Due Date"
                        type="date"
                        fullWidth
                        margin="normal"
                        value={project.payDueDate}
                        onChange={(e) => setProject({ ...project, payDueDate: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Status"
                        fullWidth
                        margin="normal"
                        value={project.status}
                        onChange={(e) => setProject({ ...project, status: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                        variant='contained'
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
                        }}>
                        Cancel
                    </Button>
                    <Button onClick={handleClose}
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
                        }}>
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default ProjectDetails;