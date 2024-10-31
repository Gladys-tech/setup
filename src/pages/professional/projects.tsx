import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { API_BASE_URL } from '../api/http.api';
import { useUser } from 'src/context/UserContext';
import CreateProjectModal from 'src/components/CreateProjectModel';

// Define project interface
interface Project {
    id: number;
    projectName: string;
    location: string;
    status: string;
    phases: Phase[];
    createdBy: User;
    // isVerified: boolean;
    updatedBy: User | null;
    updatedAt: string;
    isActive: boolean;
    client: User | null;
    image: File | null;
}

interface User {
    id: string;
    firstName: string;
    lastName: string;
}

interface Phase {
    id: string;
    phaseName: string;
    phaseDescription: string;
}

const Projects = () => {
    const theme = useTheme(); // Access the theme
    const [open, setOpen] = useState(false); // Modal open state
    const [shareOpen, setShareOpen] = useState(false); // For share link modal
    const [shareLink, setShareLink] = useState(''); // Share link state
    const [searchQuery, setSearchQuery] = useState('');
    const [projects, setProjects] = useState<Project[]>([]);
    const { user, token } = useUser();
    const [modalOpen, setModalOpen] = useState(false);
    const handleShareClose = () => setShareOpen(false);
    const router = useRouter();
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null); // State for selected project ID

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // const token = localStorage.getItem('token');
                // if (!token) {
                //     throw new Error('Token not found');
                // }
                const storedUser = localStorage.getItem('user');
                if (!storedUser) {
                    throw new Error('User not found');
                }
                const user = JSON.parse(storedUser);
                const userId = user.id;
                const response = await fetch(`${API_BASE_URL}/projects/professional/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch projects: ${response.statusText}`);
                }
                const fetchedProjects = await response.json();
                console.log('fechedprojects', fetchedProjects)
                setProjects(fetchedProjects);
            } catch (error) {
                console.error('Error fetching projects:');
            }
        };
        if (user) {
            fetchProjects();
        }
    }, [user]);

    const handleClickOpen = () => {
        setModalOpen(true); // Open the modal
        setOpen(true)
    };

    const handleClose = () => {
        setModalOpen(false); // Close the modal
        setOpen(false)
    };

    // Handle project click, excluding action buttons
    const handleProjectClick = (projectId: number, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        // Exclude clicks from buttons inside the "Actions" column
        if ((event.target as HTMLElement).closest('.action-btns')) return;

        console.log(`Project clicked: ${projectId}`); // Log the clicked project ID
        setSelectedProjectId(projectId); // Set selected project ID

        router.push(`/professional/projects/${projectId}`);
    };

    // Add a new function to handle share link directly from the share button
    const handleShareButtonClick = (projectId: number) => {
        setSelectedProjectId(projectId); // Set the project ID for sharing
        handleShareLink(); // Call the share link function
    };

    // /share-links/professional
    const handleShareLink = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token not found');

            // Use the selected project ID
            if (selectedProjectId === null) {
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
                body: JSON.stringify({ projectId: selectedProjectId }),
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

    const handleShareOpen = async (projectId: number) => {
        console.log('Opening share dialog...');
        handleShareButtonClick(projectId); // Call the share link function with the project ID
        setShareOpen(true);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareLink);
        alert("Link copied to clipboard!");
    };

    const handleShareViaEmail = () => {
        const subject = encodeURIComponent(`Check out this project: `);
        const body = encodeURIComponent(`Hi,\n\nHere is the link to the project "":\n${shareLink}\n\nBest regards.`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };


    // Function to generate PDF for a project
    const handleDownload = async (projectName: string, projectId: number) => {
        const project = projects.find((p) => p.id === projectId);
        if (!project) {
            alert("Project not found!");
            return;
        }

        const doc = new jsPDF('portrait', 'pt', 'a4');
        const pdfWidth = doc.internal.pageSize.getWidth();

        // Add project details
        doc.setFontSize(14);
        doc.text(`Project Details`, pdfWidth / 2, 30, { align: 'center' });
        doc.setFontSize(12);
        doc.text(`Project Name: ${project.projectName}`, 20, 50);
        doc.text(`Location: ${project.location}`, 20, 70);
        doc.text(`Status: ${project.status}`, 20, 90);
        doc.text(`Created By: ${project.createdBy?.id || "N/A"}`, 20, 110);
        doc.text(`Updated At: ${new Date(project.updatedAt).toLocaleDateString()}`, 20, 150);

        // Handle image processing
        const addImageToPDF = (imageData: string) => {
            doc.addImage(imageData, 'JPEG', 20, 130, pdfWidth - 40, 100); // Adjust width and height
        };

        const savePDF = () => {
            // Add phases section
            doc.setFontSize(14);
            doc.text(`Phases`, pdfWidth / 2, 300, { align: 'center' });
            doc.setFontSize(12);
            let yOffset = 330; // Start of phase details
            if (project.phases && project.phases.length > 0) {
                project.phases.forEach((phase, index) => {
                    doc.text(`Phase ${index + 1}: ${phase.phaseName}`, 20, yOffset);
                    doc.text(`Description: ${phase.phaseDescription}`, 20, yOffset + 20);
                    yOffset += 80; // Adjust for the next phase
                });
            } else {
                doc.text('No phases available.', 20, yOffset);
            }

            // Capture table if available
            const tableElement = document.getElementById(`project-table-${projectId}`);
            if (tableElement) {
                html2canvas(tableElement).then(canvas => {
                    const imgData = canvas.toDataURL('image/png');
                    const imgWidth = pdfWidth - 40;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    doc.addImage(imgData, 'PNG', 20, yOffset + 10, imgWidth, imgHeight);
                    doc.save(`${projectName}_details.pdf`);
                });
            } else {
                doc.save(`${projectName}_details.pdf`);
            }
        };

        // Check if project.image is a URL or File object
        if (typeof project.image === 'string') {
            // If it's a string (URL), directly add it and save the PDF
            addImageToPDF(project.image);
            savePDF(); // Save PDF after adding image
        } else if (project.image instanceof File) {
            // If it's a File object, use FileReader
            const reader = new FileReader();
            reader.onload = () => {
                const imgData = reader.result as string;
                addImageToPDF(imgData); // Add image data to PDF
                savePDF(); // Save PDF after image is loaded
            };
            reader.readAsDataURL(project.image); // Convert File object to Data URL
        } else {
            // If no image is provided, save the PDF immediately
            savePDF(); // Save PDF if no image is provided
        }
    };

    // Filter the projects based on search query
    const filteredProjects = projects.filter((project) =>
        project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <Box display="flex" flexDirection="column" flexGrow={1} p={1}>
            <Grid container spacing={3}>
                {/* first Box: Create Project */}
                <Grid item xs={12} sm={4} md={4}>
                    <Box
                        onClick={handleClickOpen}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <CreateProjectModal open={modalOpen}
                            // handleClose={handleClose} 
                            handleClose={() => setModalOpen(false)}
                            onProjectCreated={setProjects} />
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

                {/* second Box: Home Icon */}
                <Grid item xs={12} sm={4} md={4}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
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

                {/* Third Box: Search TextField */}
                <Grid item xs={12} sm={4} md={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', }}>
                        <TextField
                            placeholder="Search projects"
                            variant="outlined"
                            size="small"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{
                                width: '300px',
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
                                    Updated Date
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
                            {filteredProjects.map((project) => (
                                <TableRow key={project.id} sx={{ height: '20px', cursor: 'pointer' }}
                                    onClick={(event) => handleProjectClick(project.id, event)}
                                    id={`project-table-${project.id}`}
                                >
                                    <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.main, padding: '4px 8px' }}>{project.projectName}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{project.client?.firstName}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{project.location}</TableCell>
                                    {/* <TableCell sx={{ padding: '4px 8px' }}>{project.updatedAt}</TableCell> */}
                                    <TableCell sx={{ padding: '4px 8px' }}>
                                        {new Date(project.updatedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </TableCell>
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
                                                        backgroundColor: theme => theme.palette.secondary.main,
                                                    },
                                                }}
                                                onClick={() => handleShareOpen(project.id)}
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
                                                        backgroundColor: theme => theme.palette.secondary.main,
                                                    },
                                                }}
                                                onClick={() => handleDownload(project.projectName, project.id)}
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

        </Box>
    );
};

export default Projects;
