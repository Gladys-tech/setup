// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
//   Dialog,
//   DialogContent,
//   IconButton,
// } from '@mui/material';
// import { Home, AttachMoney, Build } from '@mui/icons-material'; // Importing the icons
// import { useTheme } from '@mui/material/styles';

// const projects = [
//   {
//     id: 1,
//     name: 'Project Alpha',
//     image: '/images/project-alpha.jpg',
//   },
//   {
//     id: 2,
//     name: 'Project Beta',
//     image: '/images/project-beta.jpg',
//   },
//   {
//     id: 3,
//     name: 'Project Gamma',
//     image: '/images/project-gamma.jpg',
//   },
// ];

// const ClientHomePage = () => {
//   const theme = useTheme();
//   const router = useRouter();
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedProject, setSelectedProject] = useState<number | null>(null);

//   const user = {
//     name: 'John Doe',
//     role: 'Client',
//   };

//   const handleOpenDialog = (projectId: number) => {
//     setSelectedProject(projectId);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedProject(null);
//   };

//   const handlePhasedCostsClick = () => {
//     if (selectedProject) {
//       router.push(`/client/projects/${selectedProject}`);
//       handleCloseDialog();
//     }
//   };

//   return (
//     <Box sx={{ padding: '2rem' }}>
//       <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center' }}>
//         Welcome, {' '}
//         <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>{user.name}</span>
//       </Typography>

//       {/* Smaller Grid Cards */}
//       <Grid container spacing={3}>
//         {projects.map((project) => (
//           <Grid item xs={12} sm={6} md={4} key={project.id}>
//             <Card
//               onClick={() => handleOpenDialog(project.id)}
//               sx={{
//                 cursor: 'pointer',
//                 aspectRatio: '1 / 1',
//                 width: '280px', // Adjust the width to reduce the size
//                 display: 'flex',
//                 flexDirection: 'column',
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 image={project.image}
//                 alt={project.name}
//                 sx={{
//                   aspectRatio: '1 / 1',
//                   objectFit: 'cover',
//                   flexGrow: 1,
//                 }}
//               />
//               <CardContent sx={{ textAlign: 'center', padding: '0.5rem' }}>
//                 <Typography variant="h6" component="div">
//                   {project.name}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
//         <DialogContent>
//           <Box display="flex" justifyContent="space-between" gap={2} p={2}>
//             {/* First Card: Phased Costs */}
//             <Box sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//               <Typography variant="body1" sx={{ marginBottom: '0.5rem', color: theme.palette.primary.main, fontWeight: 'bold' }}>
//                 PLAN
//               </Typography>
//               <Card
//                 sx={{
//                   width: '150px',
//                   height: '150px',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   cursor: 'pointer',
//                   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//                   transition: 'transform 0.2s ease-in-out',
//                   '&:hover': {
//                     transform: 'scale(1.05)',
//                   },
//                 }}
//                 onClick={handlePhasedCostsClick}
//               >
//                 <IconButton >
//                   <Home fontSize="large" sx={{
//                     width: '80px',
//                     height: '80px',
//                   }} />
//                 </IconButton>
//               </Card>
//               <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
//                 Phased Costs
//               </Typography>
//             </Box>


//             {/* Second Card: Finance */}
//             <Box sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//               <Typography variant="body1" sx={{ marginBottom: '0.5rem', color: theme.palette.primary.main, fontWeight: 'bold' }}>
//                 SAVE
//               </Typography>
//               <Card
//                 sx={{
//                   width: '150px',
//                   height: '150px',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   cursor: 'pointer',
//                   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//                   transition: 'transform 0.2s ease-in-out',
//                   '&:hover': {
//                     transform: 'scale(1.05)',
//                   },
//                 }}
//               >
//                 <IconButton>
//                   <AttachMoney fontSize="large" sx={{
//                     width: '80px',
//                     height: '80px',
//                   }} />
//                 </IconButton>
//               </Card>
//               <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
//                 Finance
//               </Typography>
//             </Box>


//             {/* Third Card: Project Management */}
//             <Box sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//               <Typography variant="body1" sx={{ marginBottom: '0.5rem', color: theme.palette.primary.main, fontWeight: 'bold' }}>
//                 BUILD
//               </Typography>
//               <Card
//                 sx={{
//                   width: '150px',
//                   height: '150px',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   cursor: 'pointer',
//                   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//                   transition: 'transform 0.2s ease-in-out',
//                   '&:hover': {
//                     transform: 'scale(1.05)',
//                   },
//                 }}
//               >
//                 <IconButton>
//                   <Build fontSize="large" sx={{
//                     width: '60px',
//                     height: '60px',
//                   }} />
//                 </IconButton>
//               </Card>
//               <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
//                 Project Management
//               </Typography>
//             </Box>


//           </Box>

//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
//             <Button onClick={handleCloseDialog} color="primary" variant="contained">
//               Close
//             </Button>
//           </Box>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// };

// export default ClientHomePage;



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
  IconButton,
} from '@mui/material';
import { Home, AttachMoney, Build } from '@mui/icons-material'; // Importing the icons
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

  const handlePhasedCostsClick = () => {
    if (selectedProject) {
      router.push(`/client/projects/${selectedProject}`);
      handleCloseDialog();
    }
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center' }}>
        Welcome, {' '}
        <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>{user.name}</span>
      </Typography>

      {/* Smaller Grid Cards */}
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card
              onClick={() => handleOpenDialog(project.id)}
              sx={{
                cursor: 'pointer',
                aspectRatio: '1 / 1',
                width: '280px', // Adjust the width to reduce the size
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardMedia
                component="img"
                image={project.image}
                alt={project.name}
                sx={{
                  aspectRatio: '1 / 1',
                  objectFit: 'cover',
                  flexGrow: 1,
                }}
              />
              <CardContent sx={{ textAlign: 'center', padding: '0.5rem' }}>
                <Typography variant="h6" component="div">
                  {project.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogContent
          sx={{
            padding: '2rem',
            overflowX: 'hidden', // Ensure there's no horizontal scroll
            '@media (max-width: 600px)': {
              padding: '1rem',
            },
          }}
        >
          <Box display="flex" justifyContent="space-between" gap={2} p={2} flexWrap="wrap">
            {/* First Card: Phased Costs */}
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              flexBasis: '100px',
              flexGrow: 1,
              marginBottom: '1rem',
            }}>
              <Typography variant="body1" sx={{ marginBottom: '0.5rem', color: '#F28500', fontWeight: '800' }}>
                PLAN
              </Typography>
              <Card
                sx={{
                  width: '100px',
                  height: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
                onClick={handlePhasedCostsClick}
              >
                <IconButton >
                  <Home fontSize="large" sx={{
                    width: '60px',
                    height: '60px',
                    color: '#F28500',
                  }} />
                </IconButton>
              </Card>
              <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
                Phased Costs
              </Typography>
            </Box>

            {/* Second Card: Finance */}
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              flexBasis: '100px',
              flexGrow: 1,
              marginBottom: '1rem',
            }}>
              <Typography variant="body1" sx={{ marginBottom: '0.5rem', color: '#A7FC00', fontWeight: '800' }}>
                SAVE
              </Typography>
              <Card
                sx={{
                  width: '100px',
                  height: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <IconButton>
                  <AttachMoney fontSize="large" sx={{
                    width: '60px',
                    height: '60px',
                    color: '#A7FC00',
                  }} />
                </IconButton>
              </Card>
              <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
                Finance
              </Typography>
            </Box>

            {/* Third Card: Project Management */}
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              flexBasis: '100px',
              flexGrow: 1,
              marginBottom: '1rem',
            }}>
              <Typography variant="body1" sx={{ marginBottom: '0.5rem',  color: '#87CEEB',  fontWeight: '800' }}>
                BUILD
              </Typography>
              <Card
                sx={{
                  width: '100px',
                  height: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <IconButton>
                  <Build fontSize="large" sx={{
                    width: '60px',
                    height: '60px',
                    color: '#87CEEB', 
                  }} />
                </IconButton>
              </Card>
              <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
                {/* Project Management */}
                P M
              </Typography>
            </Box>
          </Box>

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

