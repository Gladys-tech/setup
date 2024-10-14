// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
// import { Box, Typography, TextField, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme, IconButton } from '@mui/material';
// import Image from 'next/image';
// import projects from 'src/pages/professional/projectData';
// import ViewIcon from '@mui/icons-material/Visibility';
// import MessageIcon from '@mui/icons-material/Message';

// const ProjectDetails = () => {
//     const theme = useTheme();
//     const router = useRouter();
//     const { id } = router.query;
//     const [project, setProject] = useState<any>(null);
//     const [open, setOpen] = useState(false); // For handling modal

//     // Define phases and their totals in state
//     const [phases, setPhases] = useState([
//         { name: 'Foundation', total: 10000 },
//         { name: 'Ring beam', total: 20000 },
//         { name: 'Roofing', total: 30000 },
//         { name: 'Window + Doors', total: 34500 },
//         { name: 'Electrical', total: 60000 },
//         { name: 'Interior', total: 56700 },
//         { name: 'Fittings', total: 23000 },
//         { name: 'Exterior', total: 40000 },
//     ]);

//     useEffect(() => {
//         if (id) {
//             const selectedProject = projects.find((project: { id: number }) => project.id === parseInt(id as string));
//             setProject(selectedProject);
//         }
//     }, [id]);

//     // Handle modal open/close
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     if (!project) {
//         return <Typography>Loading...</Typography>;
//     }

//     return (
//         <Box p={4} position="relative" sx={{
//             minHeight: '100vh', 
//             overflow: 'hidden', 
//         }}>
//              <Typography variant="h5">
//                 <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>{project.name}</span>
//             </Typography>
//             <Button
//                 variant="outlined"
//                 color="primary"
//                 onClick={handleOpen}
//                 sx={{ position: 'absolute', top: 5, right: 16 }}
//             >
//                 Project Details
//             </Button>

//             {/* Responsive SVG Image and phase inputs */}
//             <Grid container spacing={4} alignItems="center">
//                 <Grid item xs={12} md={8}>
//                     <Box
//                         sx={{
//                             width: '100%',
//                             maxWidth: '800px',
//                             margin: '0 auto',
//                             display: 'flex',
//                             justifyContent: 'center',
//                             maxHeight: '500px',
//                         }}
//                     >
//                         <Image
//                             src="/assets/images/phases diagram.svg"
//                             alt="Phases Diagram"
//                             layout="responsive"
//                             width={800}
//                             height={600}
//                         />
//                     </Box>
//                 </Grid>

//                 {/* Phase totals and view buttons */}
//                 <Grid item xs={12} md={4}>
//                     <Box sx={{ mt: '50px', mb: '10px' }}>
//                         {phases
//                             .slice()
//                             .reverse()
//                             .map((phase, index) => (
//                                 <Box key={index} mb={3} display="flex" alignItems="center">
//                                     <Typography sx={{ fontWeight: 'bold', mr: 2 }}>{phase.total}</Typography>
//                                     <IconButton
//                                         sx={{
//                                             backgroundColor: theme.palette.primary.main,
//                                             color: theme.palette.primary.contrastText,
//                                             height: '30px',
//                                             ml: 2,
//                                             borderRadius: '6px',
//                                             '&:hover': {
//                                                 backgroundColor: theme.palette.secondary.main
//                                             }
//                                         }}
//                                         // Add functionality for viewing the phase details
//                                         onClick={() => router.push(`/client/materialschedule/${phase.name}`)}
//                                     >
//                                         <ViewIcon />
//                                     </IconButton>
//                                 </Box>
//                             ))}
//                     </Box>
//                 </Grid>
//             </Grid>

//             {/* Fixed Message Icon */}
//             <IconButton
//                 sx={{
//                     position: 'fixed',
//                     bottom: 16,
//                     right: 16,
//                     backgroundColor: theme.palette.primary.main,
//                     color: theme.palette.primary.contrastText,
//                     borderRadius: '50%',
//                     '&:hover': {
//                         backgroundColor: theme.palette.secondary.main,
//                     },
//                 }}
//                 onClick={() => {
//                     // messaging functionality 
//                     alert(`Message professional about project: ${project.name}`);
//                 }}
//             >
//                 <MessageIcon />
//             </IconButton>

//             {/* Popup Modal for viewing project details */}
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>Project Details for {project.name}</DialogTitle>
//                 <DialogContent>
//                     <Typography variant="body1">Client: {project.client}</Typography>
//                     <Typography variant="body1">Location: {project.location}</Typography>
//                     <Typography variant="body1">Amount: ${project.amount}</Typography>
//                     <Typography variant="body1">Pay Due Date: {project.payDueDate}</Typography>
//                     <Typography variant="body1">Status: {project.status}</Typography>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}
//                         variant='contained'
//                         sx={{
//                             backgroundColor: theme.palette.error.main,
//                             color: theme.palette.primary.contrastText,
//                             font: '12px',
//                             textTransform: 'none',
//                             height: '35px',
//                             borderRadius: '10px',
//                             '&:hover': {
//                                 backgroundColor: theme.palette.error.dark
//                             }
//                         }}>
//                         Close
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//         </Box>
//     );
// };

// export default ProjectDetails;


import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
  IconButton,
  TextField,
} from '@mui/material';
import Image from 'next/image';
import projects from 'src/pages/professional/projectData';
import ViewIcon from '@mui/icons-material/Visibility';
import MessageIcon from '@mui/icons-material/Message';

const ProjectDetails = () => {
  const theme = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<any>(null);
  const [open, setOpen] = useState(false); // For handling modal
  const [messageContent, setMessageContent] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false); // For message state

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
  const handleClose = () => {
    setOpen(false);
    setMessageContent(''); // Reset message input when closing
    setIsMessageSent(false);
  };

  // Function to send the message
  const handleSendMessage = () => {
    if (messageContent.trim() === '') {
      alert('Please enter a message before sending.');
      return;
    }
    
    // Implement your messaging logic here (e.g., API call)
    console.log(`Message sent: ${messageContent}`);
    
    // Indicate the message was sent
    setIsMessageSent(true);
    setMessageContent(''); // Reset message input
  };

  if (!project) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box p={4} position="relative" sx={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Typography variant="h5">
        <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>{project.name}</span>
      </Typography>
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

        {/* Phase totals and view buttons */}
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
                        backgroundColor: theme.palette.secondary.main,
                      },
                    }}
                    onClick={() => router.push(`/client/materialschedule/${phase.name}`)}
                  >
                    <ViewIcon />
                  </IconButton>
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
        onClick={handleOpen} // Open the message dialog
      >
        <MessageIcon />
      </IconButton>

      {/* Popup Modal for viewing project details */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Project Details for {project.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Client: {project.client}</Typography>
          <Typography variant="body1">Location: {project.location}</Typography>
          <Typography variant="body1">Amount: ${project.amount}</Typography>
          <Typography variant="body1">Pay Due Date: {project.payDueDate}</Typography>
          <Typography variant="body1">Status: {project.status}</Typography>
          <Box sx={{ mt: 3 }}>
            <TextField
              label="Message Professional"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
            {isMessageSent && (
              <Typography variant="body2" color="green" sx={{ mt: 1 }}>
                Message sent successfully!
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.error.main,
              color: theme.palette.primary.contrastText,
              font: '12px',
              textTransform: 'none',
              height: '35px',
              borderRadius: '10px',
              '&:hover': {
                backgroundColor: theme.palette.error.dark,
              },
            }}
          >
            Close
          </Button>
          <Button
            onClick={handleSendMessage}
            variant="contained"
            color="primary"
          >
            Send Message
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectDetails;

