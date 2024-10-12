import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme } from '@mui/material';
import Image from 'next/image';
import projects from '../projectData';

const ProjectDetails = () => {
    const theme = useTheme();
    const router = useRouter();
    const { id } = router.query;
    const [project, setProject] = useState<any>(null);

    const [open, setOpen] = useState(false); // For handling modal

    // Define phases and their totals in state
    const [phases, setPhases] = useState([
        { name: 'Foundation', total: 10000 },
        { name: 'Ring beam', total: 20000 },
        { name: 'Roofing', total: 30000 },
        { name: 'Window + Doors', total: 345000 },
        { name: 'Electrical', total: 60000 },
        { name: 'Interior', total: 567000 },
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

    if (!project) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box p={4} position="relative"  sx={{
            minHeight: '100vh', // Make the container take full viewport height
            overflow: 'hidden', // Prevent scrolling
        }}>
            <Button
                variant="outlined"
                 color="primary"
                onClick={handleOpen}
                sx={{
                    position: 'absolute',
                    top: 5,
                    right: 16,
                }}
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
                            maxHeight:'500px',
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

                {/* Inputs and edit buttons for each phase */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ mt: '40px', mb: '0' }}>
                        {phases
                            .slice()
                            .reverse()
                            .map((phase, index) => (
                                <Box key={index} mb={3} display="flex" alignItems="center">
                                    <TextField
                                        type="number"
                                        label={`Total for ${phase.name}`}
                                        value={phase.total}
                                        onChange={(e) => handleInputChange(index, parseInt(e.target.value) || 0)}
                                        fullWidth
                                        InputProps={{
                                            sx: {
                                                height: '30px',
                                            }
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        // sx={{ ml: 2, height: '30px' }}
                                        sx={{
                                            backgroundColor: theme.palette.primary.main,
                                            color: theme.palette.primary.contrastText,
                                            font: '12px',
                                            textTransform: 'none',
                                            height: '30px',
                                            ml: 2,
                                            borderRadius: '6px',
                                            '&:hover': {
                                                backgroundColor: theme.palette.secondary.main
                                            }
                                        }}
                                        onClick={() => handleEditClick(phase.name)}
                                    >
                                        Edit
                                    </Button>
                                </Box>
                            ))}
                    </Box>
                </Grid>
            </Grid>

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
