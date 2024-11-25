import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme, IconButton } from '@mui/material';
import Image from 'next/image';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { API_BASE_URL } from 'src/pages/api/http.api';
import html2canvas from 'html2canvas';

const phaseColors: { [key: string]: string } = {
    Foundation: '#8B4513', // Earthy Brown   
    Ringbeam: '#B22222',    // Brick Red
    Roofing: '#708090',      // Slate Grey
    Windowsanddoors: '#008080', // Teal
    Electrical: '#1E90FF', // Electric Blue
    Interior: '#F5DEB3',   // Light Beige
    Fittings: '#9ACD32',   // Sage Green
    Exterior: '#FFD700',   // Gold
};

const ProjectDetails = () => {
    const theme = useTheme();
    const router = useRouter();
    const { id } = router.query;
    const [project, setProject] = useState<any>(null);
    const [phases, setPhases] = useState<any[]>([]);  // Initially empty array
    const [open, setOpen] = useState(false); // For handling modal
    const [shareOpen, setShareOpen] = useState(false); // For share link modal
    const [shareLink, setShareLink] = useState(''); // Share link state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjectData = async () => {
            if (id) {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        throw new Error('Token not found');
                    }
                    const response = await fetch(`${API_BASE_URL}/projects/${id}/professional`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    console.log('got project data', data);
                    setProject(data);

                    // Check if data.phases is available and use it to calculate updated phases
                    if (data.phases && Array.isArray(data.phases)) {
                        const updatedPhases = data.phases.map((phase: any) => ({
                            ...phase,
                            total: calculatePhaseTotal(phase.materialSchedules || [])
                        }));
                        console.log('Phases data:', data.phases);
                        setPhases(updatedPhases);
                    }
                } catch (error) {
                    console.error('Error fetching project data:', error);
                    // }
                } finally {
                    setLoading(false); // Set loading to false after data fetch
                }
            }
        };
        fetchProjectData();
    }, [id]);

    const calculatePhaseTotal = (materialSchedules: { amount: any }[] = []) => {
        return materialSchedules.length > 0
            ? materialSchedules.reduce((acc, material) => acc + Number(material.amount || 0), 0)
            : 0;
    };

    const handleInputChange = (index: number, value: number) => {
        const updatedPhases = [...phases];
        updatedPhases[index].total = value;
        setPhases(updatedPhases);
    };

    const handleEditClick = (id: string, phaseName: string) => {
        console.log("phaseId:", id);  // Debugging
        console.log("phaseName:", phaseName);  // Debugging
        if (id && phaseName) {
            // Convert the phase name to the appropriate key for the color mapping
            const formattedPhaseName = phaseName.replace(/ /g, '').replace(/\b\w/g, char => char.toUpperCase());
            const color = phaseColors[formattedPhaseName] || '#000000';  // Default color if not found

            // Navigate to the MaterialSchedule with both phaseId in the path and color as a query parameter
            router.push(`/professional/materialschedule/${id}?color=${encodeURIComponent(color)}&phaseName=${encodeURIComponent(phaseName)}`);
        } else {
            console.warn('Phase ID or name is undefined');
        }
    };

    const handleSaveProject = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token not found');

            const response = await fetch(`${API_BASE_URL}/projects/${id}/professional`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: project.projectName,
                    client: project.client,
                    location: project.location,
                    status: project.status
                })
            });

            if (response.ok) {
                const updatedProject = await response.json();
                setProject(updatedProject);
                handleClose();
                alert("Project updated successfully!");
            } else {
                console.error('Failed to save project:', response.statusText);
                alert("Failed to update project.");
            }
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const handleShareOpen = () => setShareOpen(true);
    const handleShareClose = () => setShareOpen(false);

    // /share-links/professional
    const handleShareLink = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token not found');
            // Log the project ID being sent
            console.log('Project ID:', id);

            // Check if project ID is provided
            if (!id) {
                console.error('No project ID provided');
                alert('Project ID is required to generate the share link.');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/share-links/professional`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ projectId: id }),
            });

            // Log the response status
            console.log('Response status:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('sharelink response', data);
                setShareLink(data.link); // Assuming the response contains the shareable link
            } else {
                console.error('Failed to generate share link:', response.statusText);
                alert('Failed to generate share link.');
            }
        } catch (error) {
            console.error('Error generating share link:', error);
        }
    };

    const handleShareOpen = async () => {
        console.log('Opening share dialog...');
        await handleShareLink(); // Fetch the share link before opening the dialog
        setShareOpen(true);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareLink);
        alert("Link copied to clipboard!");
    };

    const handleShareViaEmail = () => {
        const subject = encodeURIComponent(`Check out this project: ${project.name}`);
        const body = encodeURIComponent(`Hi,\n\nHere is the link to the project "${project.name}":\n${shareLink}\n\nBest regards.`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    // Ref to capture the entire page
    const pageRef = useRef<HTMLDivElement>(null);

    const handleCaptureScreenshot = async () => {
        if (pageRef.current) {
            const canvas = await html2canvas(pageRef.current);
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'project_details_screenshot.png';
            link.click();
        }
    };

    if (!project) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box ref={pageRef} sx={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', padding: '8px' }}>
            <IconButton
                sx={{
                    position: 'fixed',
                    top: 75,
                    left: 16,
                    width: '30px',
                    height: '30px',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    borderRadius: '50%',
                    '&:hover': {
                        backgroundColor: theme.palette.secondary.main,
                    },
                }}
                onClick={() => router.back()}
            >
                <ArrowBackIcon />
            </IconButton>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleOpen}
                sx={{ position: 'absolute', top: 80, right: 16, height: '25px' }}
            >
                Project Details
            </Button>

            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={8}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '500px',
                        }}
                    >
                        <Image
                            src="/assets/images/phases diagram.svg"
                            alt="Phases Diagram"
                            width={900}
                            height={600}
                            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} md={4} sx={{ paddingLeft: '0px !important' }}>
                    <Box sx={{ mt: { xs: '0px !important', md: '50px' }, mb: '10px', ml: { xs: '60px', md: '0px' } }}>
                        {phases
                            .slice()
                            .reverse()
                            .map((phase, index) => (
                                <Box key={index} mb={3} display="flex" alignItems="center" sx={{ cursor: 'pointer' }}
                                    onClick={() => handleEditClick(phase.id, phase.phaseName)}>
                                    <IconButton
                                        sx={{
                                            backgroundColor: theme.palette.primary.main,
                                            color: theme.palette.primary.contrastText,
                                            height: '30px',
                                            width: '30px',
                                            borderRadius: '6px',
                                            '&:hover': {
                                                backgroundColor: theme.palette.secondary.main
                                            }
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <Typography sx={{ fontSize: '20px', fontWeight: 'bold', ml: 2, mr: 2 }}>
                                        {phase.total.toLocaleString()}
                                    </Typography>
                                    <Typography sx={{ fontSize: '16px', m1: 3 }}>
                                        Total for <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>{phase.phaseName} </span>
                                    </Typography>
                                </Box>
                            ))}
                    </Box>
                </Grid>
            </Grid>

            <IconButton
                sx={{
                    position: 'fixed',
                    bottom: 45,
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

            {/* <IconButton onClick={handleCaptureScreenshot} sx={{ position: 'fixed', right: 16, bottom: 45, }}>
                Capture Screenshot
            </IconButton> */}

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

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Project Details</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Project Name"
                        fullWidth
                        margin="normal"
                        value={project.projectName}
                        onChange={(e) => setProject({ ...project, name: e.target.value })}
                    />
                    <TextField
                        label="Client"
                        fullWidth
                        margin="normal"
                        value={project.client?.firstName || ''}
                        onChange={(e) =>
                            setProject({
                                ...project,
                                client: { ...project.client, firstName: e.target.value },
                            })
                        }
                    />
                    <TextField
                        label="Location"
                        fullWidth
                        margin="normal"
                        value={project.location}
                        onChange={(e) => setProject({ ...project, location: e.target.value })}
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
                            '&:hover': {
                                backgroundColor: theme.palette.error.dark
                            }
                        }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveProject}
                        variant='contained'
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            font: '12px',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.main
                            }
                        }}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProjectDetails;
