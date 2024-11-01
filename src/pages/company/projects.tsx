import React, { useEffect, useState, useRef } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Button, useTheme, IconButton, TextField, InputAdornment } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
import { API_BASE_URL } from '../api/http.api';
import { useUser } from 'src/context/UserContext';
import ProjectDetails from './projects/[id]';
import MaterialSchedule from './materialschedule/[id]';

// Define project interface
interface Project {
    companyName: string;
    projectImage: string | undefined;
    createdAt: string | number | Date;
    id: number;
    projectName: string;
    location: string;
    status: string;
    phases: Phase[];
    createdBy: User;
    updatedBy: User | null;
    updatedAt: string;
    isActive: boolean;
    client: User | null;
    image: string | null;
}

interface User {
    email: string;
    companyName: string;
    id: string;
    firstName: string;
    lastName: string;
}

interface Phase {
    id: string;
    phaseName: string;
    phaseDescription: string;
}

const ProjectsTable = () => {
    const theme = useTheme();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [projects, setProjects] = useState<Project[]>([]);
    const { user, token } = useUser();
    const projectDetailsRef = useRef<HTMLDivElement>(null);
    const materialScheduleRef = useRef<HTMLDivElement>(null);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null); // State for selected project ID

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                if (!storedUser) {
                    throw new Error('User not found');
                }
                const user = JSON.parse(storedUser);
                const userId = user.id;
                const response = await fetch(`${API_BASE_URL}/projects/professional`, {
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

    // Handle project click, excluding action buttons
    const handleProjectClick = (projectId: number, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        // Exclude clicks from buttons inside the "Actions" column
        if ((event.target as HTMLElement).closest('.action-btns')) return;

        console.log(`Project clicked: ${projectId}`); // Log the clicked project ID
        setSelectedProjectId(projectId); // Set selected project ID

        router.push(`/company/projects/${projectId}`);
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

            // // Capture hidden ProjectDetails component screenshot
            // if (projectDetailsRef.current) {
            //     html2canvas(projectDetailsRef.current).then((canvas) => {
            //         const imgData = canvas.toDataURL('image/png');
            //         const imgWidth = pdfWidth - 40;
            //         const imgHeight = (canvas.height * imgWidth) / canvas.width;
            //         doc.addImage(imgData, 'PNG', 20, yOffset + 10, imgWidth, imgHeight);
            //         doc.save(`${projectName}_details.pdf`);
            //     });
            // } else {
            //     doc.save(`${projectName}_details.pdf`);
            // }
            // Capture and add ProjectDetails component screenshot
            if (projectDetailsRef.current) {
                html2canvas(projectDetailsRef.current).then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const imgWidth = pdfWidth - 40;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    doc.addImage(imgData, 'PNG', 20, yOffset + 10, imgWidth, imgHeight);

                    // Update yOffset after ProjectDetails screenshot
                    yOffset += imgHeight + 20;

                    // Capture and add MaterialSchedule component screenshot
                    if (materialScheduleRef.current) {
                        html2canvas(materialScheduleRef.current).then((canvas) => {
                            const imgData = canvas.toDataURL('image/png');
                            const imgWidth = pdfWidth - 40;
                            const imgHeight = (canvas.height * imgWidth) / canvas.width;
                            doc.addImage(imgData, 'PNG', 20, yOffset + 40, imgWidth, imgHeight);
                            doc.save(`${projectName}_details.pdf`);
                        });
                    } else {
                        doc.save(`${projectName}_details.pdf`);
                    }
                });
            } else {
                doc.save(`${projectName}_details.pdf`);
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
        } else if (project.image) {
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
        <>
            {/* Hidden ProjectDetails component for capturing screenshot */}
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} ref={projectDetailsRef}>
                <ProjectDetails /> {/* Accesses project ID directly via router query */}
            </div>
            {/* materialScheduleRef */}
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} ref={materialScheduleRef}>
                <MaterialSchedule /> {/* Accesses project ID directly via router query */}
            </div>
            <Box mt={4}>
                {/* Back arrow button for easy navigation */}
                <IconButton
                    sx={{
                        position: 'fixed',
                        top: 70,
                        left: 16,
                        width: '30px', // Adjust icon button size
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

                <Box display="flex" justifyContent="space-between" alignItems="center" >
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: theme.palette.primary.main, fontSize: '16px' }}>
                        All Projects
                    </Typography>

                    {/* Search TextField */}
                    <TextField
                        placeholder="Search projects"
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                            width: '300px',
                            marginBottom: '30px',
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


                <TableContainer component={Paper} sx={{ boxShadow: 3, overflowX: 'auto', minWidth: 300, maxHeight: 355 }}>
                    <Table stickyHeader aria-label="projects table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{
                                    fontWeight: 600,
                                    padding: '6px 10px',
                                    position: 'sticky',
                                    top: 0,
                                    backgroundColor: theme.palette.background.paper,
                                    zIndex: 1,
                                }}>Project Name</TableCell>
                                <TableCell sx={{
                                    fontWeight: 600,
                                    padding: '6px 10px',
                                    position: 'sticky',
                                    top: 0,
                                    backgroundColor: theme.palette.background.paper,
                                    zIndex: 1,
                                }}>Image</TableCell>
                                <TableCell sx={{
                                    fontWeight: 600,
                                    padding: '6px 10px',
                                    position: 'sticky',
                                    top: 0,
                                    backgroundColor: theme.palette.background.paper,
                                    zIndex: 1,
                                }}>Created At</TableCell>
                                <TableCell sx={{
                                    fontWeight: 600,
                                    padding: '6px 10px',
                                    position: 'sticky',
                                    top: 0,
                                    backgroundColor: theme.palette.background.paper,
                                    zIndex: 1,
                                }}>Company Name</TableCell>
                                <TableCell sx={{
                                    fontWeight: 600,
                                    padding: '6px 10px',
                                    position: 'sticky',
                                    top: 0,
                                    backgroundColor: theme.palette.background.paper,
                                    zIndex: 1,
                                }}>Professional Contact</TableCell>
                                <TableCell sx={{
                                    fontWeight: 600,
                                    padding: '6px 10px',
                                    position: 'sticky',
                                    top: 0,
                                    backgroundColor: theme.palette.background.paper,
                                    zIndex: 1,
                                }}>Email</TableCell>
                                <TableCell sx={{
                                    fontWeight: 600,
                                    padding: '6px 10px',
                                    position: 'sticky',
                                    top: 0,
                                    backgroundColor: theme.palette.background.paper,
                                    zIndex: 1,
                                }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {projects.map((project) => ( */}
                            {filteredProjects.map((project) => (
                                <TableRow key={project.id} sx={{ height: '20px', cursor: 'pointer' }}
                                    // onClick={(event) => handleProjectClick(project.id, event)}
                                    onClick={(event) => handleProjectClick(project.id, event)}
                                    id={`project-table-${project.id}`}
                                >
                                    <TableCell sx={{ fontWeight: 'bold', padding: '4px 8px', color: theme.palette.primary.main, }}>{project.projectName}</TableCell>
                                    <TableCell sx={rowStyles}>
                                        <img
                                            src={project.image || '/path/to/default/image.jpg'}
                                            alt={project.projectName}
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }} // Adjust size as necessary
                                        />
                                    </TableCell>
                                    <TableCell sx={rowStyles}>{new Date(project.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell sx={rowStyles}>{project.createdBy?.companyName}</TableCell>
                                    <TableCell sx={rowStyles}>{project.createdBy?.firstName}</TableCell>
                                    <TableCell sx={rowStyles}>{project.createdBy?.email}</TableCell>
                                    <TableCell sx={rowStyles}>
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
                                            // onClick={() => handleDownload(project.name, project.id)}
                                            onClick={(event) => {
                                                event.stopPropagation(); // Stop row click from triggering
                                                handleDownload(project.projectName, project.id);
                                            }}
                                        >
                                            <DownloadIcon sx={{ color: 'white' }} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

const rowStyles = {
    padding: '4px 8px',
};

export default ProjectsTable;
