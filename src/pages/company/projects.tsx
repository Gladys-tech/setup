import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Button, useTheme, IconButton } from '@mui/material';
// import theme from 'src/theme/index';
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';

const ProjectsTable = () => {
    const theme = useTheme();
    const router = useRouter();

    // Dummy data for now
    const projects = [
        {
            id: 1,
            name: 'Project Alpha',
            image: 'https://via.placeholder.com/50',
            createdAt: '2023-09-12T00:00:00',
            companyName: 'Alpha Constructions',
            professionalContact: 98765432,
            email: 'johndoe@alpha.com',
        },
        {
            id: 2,
            name: 'Project Beta',
            image: 'https://via.placeholder.com/50',
            createdAt: '2023-08-24T00:00:00',
            companyName: 'Beta Builders',
            professionalContact: 675432345,
            email: 'janesmith@beta.com',
        },
        {
            id: 3,
            name: 'Project Gamma',
            image: 'https://via.placeholder.com/50',
            createdAt: '2023-07-15T00:00:00',
            companyName: 'Gamma Engineering',
            professionalContact: 675432345,
            email: 'mjohnson@gamma.com',
        },
        {
            id: 4,
            name: 'Project Gamma',
            image: 'https://via.placeholder.com/50',
            createdAt: '2023-07-15T00:00:00',
            companyName: 'Gamma Engineering',
            professionalContact: 675432345,
            email: 'mjohnson@gamma.com',
        },
        {
            id: 5,
            name: 'Project Gamma',
            image: 'https://via.placeholder.com/50',
            createdAt: '2023-07-15T00:00:00',
            companyName: 'Gamma Engineering',
            professionalContact: 675432345,
            email: 'mjohnson@gamma.com',
        },
        {
            id: 6,
            name: 'Project Gamma',
            image: 'https://via.placeholder.com/50',
            createdAt: '2023-07-15T00:00:00',
            companyName: 'Gamma Engineering',
            professionalContact: 675432345,
            email: 'mjohnson@gamma.com',
        },
    ];

    const handleProjectClick = (id: number, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        // Handle project click here
        console.log(`Clicked project with id: ${id}`);
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
        const pdfHeight = doc.internal.pageSize.getHeight();

        // Add project details
        doc.text(`Project Name: ${project.name}`, 20, 30);
        doc.text(`Image: ${project.image}`, 20, 50);
        doc.text(`CreatedAt: ${project.createdAt}`, 20, 70);
        doc.text(`Company Name: ${project.companyName}`, 20, 90);
        doc.text(`Professional contact: ${project.professionalContact}`, 20, 110);
        doc.text(`Email: ${project.email}`, 20, 90);

        // Capture the project table as an image (using html2canvas)
        const tableElement = document.getElementById(`project-table-${projectId}`);
        if (tableElement) {
            const canvas = await html2canvas(tableElement);
            const imgData = canvas.toDataURL('image/png');

            const imgWidth = pdfWidth - 40;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            doc.addImage(imgData, 'PNG', 20, 130, imgWidth, imgHeight);
        }

        doc.save(`${projectName}_details.pdf`);
    };

    return (
        <Box mt={4}>
            {/* Back arrow button for easy navigation */}
            <IconButton
                sx={{
                    position: 'fixed',
                    top: 68,
                    left: 16,
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
            <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: theme.palette.primary.main, fontSize: '16PX' }}>All Projects</Typography>
            </Box>

            <TableContainer component={Paper} sx={{ boxShadow: 3, overflowX: 'auto', minWidth: 300, maxHeight: 400 }}>
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
                        {projects.map((project) => (
                            <TableRow key={project.id} sx={{ height: '20px', cursor: 'pointer' }}
                                onClick={(event) => handleProjectClick(project.id, event)}
                            >
                                <TableCell sx={{ fontWeight: 'bold', padding: '4px 8px', color: theme.palette.primary.main, }}>{project.name}</TableCell>
                                <TableCell sx={rowStyles}>
                                    <img src={project.image} alt={project.name} width="50" height="50" />
                                </TableCell>
                                <TableCell sx={rowStyles}>{new Date(project.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell sx={rowStyles}>{project.companyName}</TableCell>
                                <TableCell sx={rowStyles}>{project.professionalContact}</TableCell>
                                <TableCell sx={rowStyles}>{project.email}</TableCell>
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
                                        onClick={() => handleDownload(project.name, project.id)}
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
    );
};

const rowStyles = {
    padding: '4px 8px',
};

export default ProjectsTable;
