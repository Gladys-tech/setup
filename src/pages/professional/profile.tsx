import React, { useState, useEffect } from 'react';
import { Box, Avatar, Typography, Grid, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme } from '@mui/material';
import { useUser } from 'src/context/UserContext';
import { API_BASE_URL } from '../api/http.api';

interface Address {
    city: string;
    country: string;
    telphone: string;
}

interface State {
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    address: Address;
}

// Function to get initials from first name and last name
const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();
};

const ProfilePage = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false); // State to control the dialog
    const { user, setUser } = useUser(); // Get user from context

    // Local state for user details
    const [userDetails, setUserDetails] = useState<State>({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        companyName: user.companyName,
        address: {
            city: user.address.city,
            country: user.address.country,
            telphone: user.address.telphone,
        },
    });

    // Handler for opening and closing the modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Handler for form field changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // Submit handler to update user profile
    const handleSubmit = async () => {
        try {

            const token = localStorage.getItem('token'); 
            const response = await fetch(`${API_BASE_URL}/users/${user.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
                body: JSON.stringify(userDetails),
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            const updatedUser = await response.json();
            setUser(updatedUser); // Update user context with the response
            handleClose(); // Close modal after submission
        } catch (error) {
            console.error("Error updating user:", error);
            // Handle error (e.g., show notification)
        }
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
                        {getInitials(user?.firstName || '', user?.lastName || '')} {/* Get initials */}
                    </Avatar>

                    {/* User Name */}
                    <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {user?.firstName} {user?.lastName} {/* Display full name */}
                    </Typography>

                    {/* User Role */}
                    <Typography variant="body1" color="textSecondary">
                        {user?.roles[0]?.roleName}
                    </Typography>
                </Box>

                {/* Profile Details */}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            Email:
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {user?.email}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            Role:
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {user?.roles[0]?.roleName}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            Company Name:
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {user?.companyName}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            City:
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {user?.address.city}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            Country:
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {user?.address.country}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            Telephone:
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {user?.address.telphone}
                        </Typography>
                    </Grid>
                </Grid>

                {/* Edit Profile Button */}
                <Box sx={{ marginTop: '2rem', textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            font: '12px',
                            textTransform: 'none',
                            height: '35px',
                            borderRadius: '10px',
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.main,
                            },
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
                        label="First Name"
                        name="firstName"
                        fullWidth
                        value={userDetails.firstName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        name="lastName"
                        fullWidth
                        value={userDetails.lastName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        name="email"
                        fullWidth
                        value={userDetails.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Company Name"
                        name="companyName"
                        fullWidth
                        value={userDetails.companyName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="City"
                        name="city"
                        fullWidth
                        value={userDetails.address.city}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Country"
                        name="country"
                        fullWidth
                        value={userDetails.address.country}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Telephone"
                        name="telphone"
                        fullWidth
                        value={userDetails.address.telphone}
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
                                backgroundColor: theme.palette.error.dark,
                            },
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
                                backgroundColor: theme.palette.secondary.main,
                            },
                        }}
                    >Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProfilePage;
