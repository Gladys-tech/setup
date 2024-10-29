// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Dialog,
//   DialogContent,
//   IconButton,
// } from '@mui/material';
// import { Home, AttachMoney, Build, Close } from '@mui/icons-material'; // Importing the icons
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
//       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth >
//         <DialogContent sx={{
//           position: 'relative', padding: '2rem',
//           backgroundImage: `linear-gradient(to bottom, ${theme.palette.secondary.main}, #2AA10F)`,
//         }}>

//           {/* project name */}
//           {selectedProject && (
//             <Typography
//               variant="h5"
//               component="div"
//               sx={{
//                 textAlign: 'center',
//                 fontWeight: 'bold',
//                 // marginBottom: '1rem',
//                 color: theme.palette.primary.contrastText,
//               }}
//             >
//               {projects.find((project) => project.id === selectedProject)?.name}
//             </Typography>
//           )}

//           {/* Close Button */}
//           <IconButton
//             onClick={handleCloseDialog}
//             sx={{ position: 'absolute', top: '6px', right: '16px', fontWeight: 600, }}
//           >
//             <Close />
//           </IconButton>
//           <Box display="flex" justifyContent="space-between" gap={2} p={2} flexWrap="wrap">
//             {/* First Card: Phased Costs */}
//             <Box sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//               flexBasis: '100px',
//               flexGrow: 1,
//               // marginTop: '1rem',
//             }}>
//               <Card
//                 sx={{
//                   width: '300px',
//                   height: '350px',
//                   display: 'flex',
//                   borderRadius: '15px',
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
//                     width: '150px',
//                     height: '150px',
//                     color: '#F28500',
//                   }} />
//                 </IconButton>
//                 <Typography variant="body1" sx={{ color: '#F28500', fontWeight: '800', }}>
//                   PLAN
//                 </Typography>
//               </Card>
//               <Typography variant="body2" sx={{ marginTop: '1rem', fontWeight: '600' }}>
//                 Phased Costs
//               </Typography>
//             </Box>

//             {/* Second Card: Finance */}
//             <Box sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//               flexBasis: '100px',
//               flexGrow: 1,
//               // marginTop: '1rem',
//             }}>

//               <Card
//                 sx={{
//                   width: '300px',
//                   height: '350px',
//                   display: 'flex',
//                   borderRadius: '15px',
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
//                     width: '150px',
//                     height: '150px',
//                     color: '#A7FC00',
//                   }} />
//                 </IconButton>
//                 <Typography variant="body1" sx={{ color: '#A7FC00', fontWeight: '800' }}>
//                   SAVE
//                 </Typography>
//               </Card>
//               <Typography variant="body2" sx={{ marginTop: '1rem', fontWeight: '600' }}>
//                 Finance
//               </Typography>
//             </Box>

//             {/* Third Card: Project Management */}
//             <Box sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//               flexBasis: '100px',
//               flexGrow: 1,
//               // marginTop: '1rem',
//             }}>

//               <Card
//                 sx={{
//                   width: '300px',
//                   height: '350px',
//                   display: 'flex',
//                   borderRadius: '15px',
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
//                     width: '150px',
//                     height: '150px',
//                     color: '#87CEEB',
//                   }} />
//                 </IconButton>
//                 <Typography variant="body1" sx={{ color: '#87CEEB', fontWeight: '800' }}>
//                   BUILD
//                 </Typography>
//               </Card>
//               <Typography variant="body2" sx={{ marginTop: '1rem', fontWeight: '600' }}>
//                 {/* Project Management */}
//                 P M
//               </Typography>
//             </Box>
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
  Dialog,
  DialogContent,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { Home, AttachMoney, Build, Close } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';

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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

      {/* Projects Grid */}
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card
              onClick={() => handleOpenDialog(project.id)}
              sx={{
                cursor: 'pointer',
                aspectRatio: '1 / 1',
                width: '280px',
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
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogContent sx={{
          position: 'relative', padding: '2rem',
          backgroundImage: `linear-gradient(to bottom, ${theme.palette.secondary.main}, #2AA10F)`,
        }}>
          {/* Project Name */}
          {selectedProject && (
            <Typography
              variant="h5"
              component="div"
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: theme.palette.primary.main,
              }}
            >
              {projects.find((project) => project.id === selectedProject)?.name}
            </Typography>
          )}

          {/* Close Button */}
          <IconButton
            onClick={handleCloseDialog}
            sx={{ position: 'absolute', top: '6px', right: '16px', fontWeight: 600 }}
          >
            <Close />
          </IconButton>

          {/* Content for Large Screens */}
          {!isMobile && (
            <Box display="flex" justifyContent="space-between" gap={2} p={2} flexWrap="wrap">
              {/* Cards for each feature */}
              {renderCards(handlePhasedCostsClick)}
            </Box>
          )}

          {/* Content for Mobile (Swipeable Views) */}
          {isMobile && (
            <SwipeableViews enableMouseEvents>
              {renderCards(handlePhasedCostsClick).map((card, index) => (
                <Box key={index} sx={{ padding: '1rem' }}>
                  {card}
                </Box>
              ))}
            </SwipeableViews>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

const renderCards = (handlePhasedCostsClick: () => void) => [
  <Box key="phased-costs" sx={{ textAlign: 'center' }}>
    <Card onClick={handlePhasedCostsClick} sx={cardStyle}>
      <IconButton>
        <Home fontSize="large" sx={{ width: '150px', height: '150px', color: '#F28500' }} />
      </IconButton>
      <Typography variant="body1" sx={{ color: '#F28500', fontWeight: '800' }}>PLAN</Typography>
    </Card>
    <Typography variant="body2" sx={{ marginTop: '1rem', fontWeight: '600' }}>Phased Costs</Typography>
  </Box>,
  <Box key="finance" sx={{ textAlign: 'center' }}>
    <Card sx={cardStyle}>
      <IconButton>
        <AttachMoney fontSize="large" sx={{ width: '150px', height: '150px', color: '#A7FC00' }} />
      </IconButton>
      <Typography variant="body1" sx={{ color: '#A7FC00', fontWeight: '800' }}>SAVE</Typography>
    </Card>
    <Typography variant="body2" sx={{ marginTop: '1rem', fontWeight: '600' }}>Finance</Typography>
  </Box>,
  <Box key="project-management" sx={{ textAlign: 'center' }}>
    <Card sx={cardStyle}>
      <IconButton>
        <Build fontSize="large" sx={{ width: '150px', height: '150px', color: '#87CEEB' }} />
      </IconButton>
      <Typography variant="body1" sx={{ color: '#87CEEB', fontWeight: '800' }}>BUILD</Typography>
    </Card>
    <Typography variant="body2" sx={{ marginTop: '1rem', fontWeight: '600' }}>Project Management</Typography>
  </Box>,
];

const cardStyle = {
  width: '300px',
  height: '350px',
  display: 'flex',
  borderRadius: '15px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
};

export default ClientHomePage;
