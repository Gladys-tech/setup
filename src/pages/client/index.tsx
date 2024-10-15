import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogContent,
  Tabs,
  Tab,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const projects = [
  {
    id: 1,
    name: 'Project Alpha',
    image: '/images/project-alpha.jpg',
  },
  {
    id: 2,
    name: 'Project Beta',
    image: '/images/project-beta.jpg',
  },
  {
    id: 3,
    name: 'Project Gamma',
    image: '/images/project-gamma.jpg',
  },
];

const ClientHomePage = () => {
  const theme = useTheme();
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const user = {
    name: 'John Doe',
    role: 'Client',
  };

  const handleOpenDialog = (projectId: number) => {
    setSelectedProject(projectId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProject(null);
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  const handlePhasedCostsClick = () => {
    if (selectedProject) {
      router.push(`/client/projects/${selectedProject}`);
      handleCloseDialog();
    }
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>
        Welcome, {' '}
        <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>{user.name}</span>
      </Typography>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card onClick={() => handleOpenDialog(project.id)} sx={{ cursor: 'pointer' }}>
              <CardMedia
                component="img"
                height="140"
                image={project.image}
                alt={project.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {project.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
        <DialogContent>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab label="Phased Costs" />
            <Tab label="PM" />
            <Tab label="Finance" />
          </Tabs>

          {activeTab === 0 && (
            <Box p={3} onClick={handlePhasedCostsClick} sx={{ cursor: 'pointer', }}>
              <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 500 }}>Phased Costs for {projects.find(p => p.id === selectedProject)?.name}</Typography>
            </Box>
          )}
          {activeTab === 1 && (
            <Box p={3}>
              <Typography variant="h6" sx={{ fontSize: '14px' ,fontWeight: 500}}>Project Management (PM) for {projects.find(p => p.id === selectedProject)?.name}</Typography>
            </Box>
          )}
          {activeTab === 2 && (
            <Box p={3}>
              <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 500 }}>Finance for {projects.find(p => p.id === selectedProject)?.name}</Typography>
            </Box>
          )}

          {/* Card under the active tab */}
          {selectedProject && (
            <Card
              sx={{
                marginTop: '1rem',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease-in-out',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.02)', // Slight zoom effect on hover
                },
              }}
              onClick={handlePhasedCostsClick}
            >
              <CardMedia
                component="img"
                height="100"
                image={projects.find(p => p.id === selectedProject)?.image}
                alt={projects.find(p => p.id === selectedProject)?.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {projects.find(p => p.id === selectedProject)?.name}
                </Typography>
              </CardContent>
            </Card>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
            <Button onClick={handleCloseDialog} color="primary" variant="contained">
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ClientHomePage;

