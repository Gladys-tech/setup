import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme, IconButton } from '@mui/material';
import Image from 'next/image';
import projects from 'src/pages/professional/projectData';
import ViewIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CallIcon from '@mui/icons-material/Call';

const ProjectDetails = () => {
  const theme = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<any>(null);
  const [open, setOpen] = useState(false); // For handling modal
  const [contactVisible, setContactVisible] = useState(false);

  const contactNumber = "0757763516";

  // Define phases and their totals with respective colors
  const [phases, setPhases] = useState([
    { name: 'Foundation', total: 10000, color: '#8B4513' }, // Earthy Brown
    { name: 'Ring beam', total: 20000, color: '#B22222' },  // Brick Red
    { name: 'Roofing', total: 30000, color: '#708090' },    // Slate Grey
    { name: 'Window + Doors', total: 34500, color: '#008080' }, // Teal
    { name: 'Electrical', total: 60000, color: '#1E90FF' }, // Electric Blue
    { name: 'Interior', total: 56700, color: '#F5DEB3' },   // Light Beige
    { name: 'Fittings', total: 23000, color: '#9ACD32' },   // Sage Green
    { name: 'Exterior', total: 40000, color: '#FFD700' },   // Gold
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

  // Toggle contact number visibility
  const handleContactToggle = () => {
    setContactVisible(!contactVisible);
  };

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
                  onClick={() => router.push(`/client/materialschedule/${phase.name}?color=${encodeURIComponent(phase.color)}`)}>
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

      {/* Fixed Call Icon with Contact Number */}
      <Box position="relative" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        {contactVisible && (
          <Box
            sx={{
              position: 'absolute',
              bottom: '60px',
              right: '0',
              backgroundColor: theme.palette.background.paper,
              padding: '4px 8px',
              borderRadius: '4px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Typography variant="body2">{contactNumber}</Typography>
          </Box>
        )}
        <IconButton
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderRadius: '50%',
            '&:hover': { backgroundColor: theme.palette.secondary.main },
          }}
          onClick={handleContactToggle} // Toggle contact number visibility
        >
          <CallIcon />
        </IconButton>
      </Box>

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


