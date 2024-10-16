import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme, IconButton } from '@mui/material';
import Image from 'next/image';
import projects from 'src/pages/professional/projectData';
import ViewIcon from '@mui/icons-material/Visibility';
import MessageIcon from '@mui/icons-material/Message';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

    // Handle modal open/close
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (!project) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box p={4} position="relative" sx={{
            minHeight: '100vh',
            overflow: 'hidden',
        }}>

            {/* Back arrow button for easy navigation */}
            <IconButton
                sx={{
                    position: 'fixed',
                    top: 75,
                    left: 16, // Place it on the left for easy access
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    borderRadius: '50%',
                    '&:hover': {
                        backgroundColor: theme.palette.secondary.main,
                    },
                }}
                onClick={() => router.back()} // Navigates to the previous page
            >
                <ArrowBackIcon />
            </IconButton>

            <Typography variant="h5">
                <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>{project.name}</span>
            </Typography>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleOpen}
                sx={{ position: 'absolute', top: 5, right: 16, height: '25px' }}
            >
                Project Details
            </Button>

            {/* Responsive SVG Image and phase inputs */}
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={8}>
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: '900px',
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
                            width={900}
                            height={600}
                        />
                    </Box>
                </Grid>

                {/* Phase totals and view buttons */}
                <Grid item xs={12} md={4} sx={{ paddingLeft: '0px !important' }}>
                    <Box sx={{ mt: '50px', mb: '10px' }}>
                        {phases
                            .slice()
                            .reverse()
                            .map((phase, index) => (
                                <Box key={index} mb={3} display="flex" alignItems="center" sx={{ cursor: 'pointer' }}
                                    onClick={() => router.push(`/company/materialschedule/${phase.name}`)}>
                                    <IconButton
                                        sx={{
                                            backgroundColor: theme.palette.primary.main,
                                            color: theme.palette.primary.contrastText,
                                            height: '30px',
                                            borderRadius: '6px',
                                            '&:hover': {
                                                backgroundColor: theme.palette.secondary.main
                                            }
                                        }}
                                    >
                                        <ViewIcon />
                                    </IconButton>
                                    <Typography sx={{ fontSize: '20px', fontWeight: 'bold', ml: 2, mr: 2 }}>{phase.total}</Typography>
                                    <Typography sx={{ fontSize: '16px', m1: 3 }}>Total for {''}
                                        <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>{phase.name}
                                        </span>
                                    </Typography>
                                </Box>
                            ))}
                    </Box>
                </Grid>
            </Grid>

            {/* Fixed Message Icon */}
            <IconButton
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    borderRadius: '50%',
                    '&:hover': {
                        backgroundColor: theme.palette.secondary.main,
                    },
                }}
                component="a"
                href="tel:"
            >
                <MessageIcon />
            </IconButton>

            {/* Popup Modal for viewing project details */}
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '12px',
                        padding: '24px',
                        backgroundColor: '#f5f5f5',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    },
                }}
            >
                <DialogTitle sx={{
                    fontWeight: 'bold',
                    color: theme.palette.primary.main,
                    fontSize: '22px',
                    textAlign: 'center',
                    paddingBottom: '16px',
                    borderBottom: `1px solid ${theme.palette.divider}`
                }}>
                    Project Details
                </DialogTitle>

                <DialogContent
                    sx={{
                        marginTop: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }}
                >
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>
                        <strong>Client:</strong> {project.client}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>
                        <strong>Location:</strong> {project.location}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>
                        <strong>Amount:</strong> ${project.amount}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>
                        <strong>Pay Due Date:</strong> {project.payDueDate}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>
                        <strong>Status:</strong> {project.status}
                    </Typography>
                </DialogContent>

                <DialogActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        paddingTop: '16px',
                        borderTop: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        sx={{
                            backgroundColor: theme.palette.error.main,
                            color: theme.palette.primary.contrastText,
                            fontSize: '14px',
                            textTransform: 'none',
                            padding: '8px 24px',
                            borderRadius: '8px',
                            '&:hover': {
                                backgroundColor: theme.palette.error.dark,
                            },
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default ProjectDetails;


