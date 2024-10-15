import React, { useState } from 'react';
import { Box, Avatar, Typography, Grid, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme } from '@mui/material';

// Function to get initials from a user's name
const getInitials = (name: string) => {
    const nameArray = name.split(' ');
    return nameArray.length > 1
        ? `${nameArray[0][0]}${nameArray[1][0]}`.toUpperCase()
        : `${nameArray[0][0]}`.toUpperCase();
};

const ProfilePage = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false); // State to control the dialog
    const [user, setUser] = useState({
        name: 'John Doe', // Example user data
        email: 'john.doe@example.com',
        role: 'Project Manager',
    });

    // Handler for opening and closing the modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Handler for form field changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Submit handler (can be linked to a backend service)
    const handleSubmit = () => {
        console.log("Updated user data:", user);
        handleClose(); // Close modal after submission
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
            }}
        >
            {/* Profile Container */}
            <Paper
                elevation={3}
                sx={{
                    padding: '2rem',
                    width: { xs: '100%', sm: '75%', md: '50%' },
                    maxWidth: '400px',
                    borderRadius: '10px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '2rem',
                    }}
                >
                    {/* Avatar with initials */}
                    <Avatar
                        sx={{
                            backgroundColor: theme.palette.secondary.main,
                            width: '100px',
                            height: '100px',
                            fontSize: '2rem',
                            marginBottom: '1rem',
                        }}
                    >
                        {getInitials(user.name)}
                    </Avatar>

                    {/* User Name */}
                    <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {user.name}
                    </Typography>

                    {/* User Role */}
                    <Typography variant="body1" color="textSecondary">
                        {user.role}
                    </Typography>
                </Box>

                {/* Profile Details */}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            Email:
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {user.email}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            Role:
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {user.role}
                        </Typography>
                    </Grid>
                </Grid>

                {/* Edit Profile Button */}
                <Box sx={{ marginTop: '2rem', textAlign: 'center' }}>
                    <Button variant="contained"
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            font: '12px',
                            textTransform: 'none',
                            height: '35px',
                            borderRadius: '10px',
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.main
                            }
                        }}
                        onClick={handleOpen}>
                        Edit Profile
                    </Button>
                </Box>
            </Paper>

            {/* Edit Profile Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        name="name"
                        fullWidth
                        value={user.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        name="email"
                        fullWidth
                        value={user.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Role"
                        name="role"
                        fullWidth
                        value={user.role}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='contained'
                        sx={{
                            backgroundColor: theme.palette.error.main,
                            color: theme.palette.primary.contrastText,
                            font: '12px',
                            textTransform: 'none',
                            height: '35px',
                            borderRadius: '10px',
                            '&:hover': {
                                backgroundColor: theme.palette.error.dark
                            }
                        }}>Cancel</Button>
                    <Button
                        variant='contained'
                        onClick={handleSubmit}
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            font: '12px',
                            textTransform: 'none',
                            height: '35px',
                            borderRadius: '10px',
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.main
                            }
                        }}
                    >save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProfilePage;
