import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme, IconButton } from '@mui/material';
import Image from 'next/image';
import ViewIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CallIcon from '@mui/icons-material/Call';
import { API_BASE_URL } from 'src/pages/api/http.api';

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
  const [contactVisible, setContactVisible] = useState(false); // For controlling contact number visibility

  const contactNumber = "0757763516";


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

  const handleViewClick = (id: string, phaseName: string) => {
    console.log("phaseId:", id);  // Debugging
    console.log("phaseName:", phaseName);  // Debugging
    if (id && phaseName) {
      // Convert the phase name to the appropriate key for the color mapping
      const formattedPhaseName = phaseName.replace(/ /g, '').replace(/\b\w/g, char => char.toUpperCase());
      const color = phaseColors[formattedPhaseName] || '#000000';  // Default color if not found

      // Navigate to the MaterialSchedule with both phaseId in the path and color as a query parameter
      router.push(`/client/materialschedule/${id}?color=${encodeURIComponent(color)}&phaseName=${encodeURIComponent(phaseName)}`);
    } else {
      console.warn('Phase ID or name is undefined');
    }
  };


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
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', padding: '8px' }}>
      {/* Back arrow button for easy navigation */}
      <IconButton
        sx={{
          position: 'fixed',
          top: 70,
          left: 20,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          width: '30px', // Adjust icon button size
          height: '30px',
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
        <span style={{ position: 'absolute', top: 80, right: 500, color: theme.palette.primary.main, fontWeight: 'bold', }}>{project.projectName}</span>
      </Typography>

      <Button
        variant="outlined"
        color="primary"
        onClick={handleOpen}
        sx={{ position: 'absolute', top: 80, right: 16, height: '25px' }}
      >
        Project Details
      </Button>

      {/* Responsive SVG Image and phase inputs */}
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              width: '100%',
              margin: '0',
              padding: '0',
              height: '500px',
            }}
          >
            <Image
              src="/assets/images/phases diagram.svg"
              alt="Phases Diagram"
              width={900}
              height={600}
              style={{ objectFit: 'contain', width: '100%', height: '100%' }} // Contain the full image within the box
            />
          </Box>
        </Grid>

        {/* Phase totals and view buttons */}
        <Grid item xs={12} md={4} sx={{ paddingLeft: '0px !important' }}>
          <Box sx={{
            mt: { xs: '0px !important', md: '50px' },
            mb: '10px',
            ml: { xs: '60px', md: '0px' }
          }}>
            {phases
              .slice()
              .reverse()
              .map((phase, index) => (
                <Box key={index} mb={3} display="flex" alignItems="center" sx={{ cursor: 'pointer' }}
                  onClick={() => handleViewClick(phase.id, phase.phaseName)}>
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
                    <ViewIcon />
                  </IconButton>
                  <Typography sx={{ fontSize: '20px', fontWeight: 'bold', ml: 2, mr: 2 }}>{phase.total}</Typography>
                  <Typography sx={{ fontSize: '16px', m1: 3 }}>Total for {''}
                    <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>{phase.phaseName}
                    </span>
                  </Typography>
                </Box>
              ))}
          </Box>
        </Grid>
      </Grid>

      {/* Fixed Call Icon with Contact Number */}
      <Box position="relative" sx={{ position: 'fixed', bottom: 45, right: 16 }}>
        {contactVisible && (
          <Box
            sx={{
              position: 'absolute',
              bottom: '60px', // Adjust this value to position the number above the icon
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
            cursor: 'pointer', // Add cursor pointer
            '&:hover': { backgroundColor: theme.palette.secondary.main },
          }}
          onClick={handleContactToggle} // Ensure this function is correctly defined
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
            <strong>Client:</strong> {project.client?.firstName}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: '500' }}>
            <strong>Location:</strong> {project.location}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: '500' }}>
            <strong>Professional Name:</strong> {project.createdBy?.firstName}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: '500' }}>
            <strong>Company Name:</strong> {project.createdBy?.companyName}
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


