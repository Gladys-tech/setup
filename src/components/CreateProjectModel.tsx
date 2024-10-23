import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material';
import { API_BASE_URL } from 'src/pages/api/http.api';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/router';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJaZqdti73p6_W5VLhL4cImtIP3yLPJho",
    authDomain: "fir-todo-19dea.firebaseapp.com",
    projectId: "fir-todo-19dea",
    storageBucket: "fir-todo-19dea.appspot.com",
    messagingSenderId: "546043032199",
    appId: "1:546043032199:web:382ef00bd32eef2a4a7e22",
    measurementId: "G-27XG6KV0ZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

/**
 * Uploads an image to Firebase Storage and returns the download URL.
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} - The download URL of the uploaded image.
 */
const uploadImageToFirebase = async (file: File): Promise<string> => {
    if (!file) {
        throw new Error('No file provided for upload');
    }

    // Create a reference to the storage bucket
    const storageRef = ref(storage, `images/${file.name}`);

    try {
        // Upload the file to the storage bucket
        await uploadBytes(storageRef, file);

        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL; // Return the download URL
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Image upload failed');
    }
};

interface CreateProjectModalProps {
    open: boolean;
    handleClose: () => void;
    onProjectCreated: React.Dispatch<React.SetStateAction<Project[]>>; // Add this line

}

// Define project interface
interface Project {
    id: number;
    projectName: string;
    location: string;
    status: string;
    phases: Phase[];
    createdBy: User;
    isVerified: boolean;
    updatedBy: User | null;
    updatedAt: string;
    isActive: boolean;
    client: User | null;
    image: File | null;
}

interface User {
    id: string;
    firstName: string;
    lastName: string;
}

interface Phase {
    id: string;
    phaseName: string;
    phaseDescription: string;
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};


const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ open, handleClose, onProjectCreated }) => {
    const router = useRouter(); // Initialize useRouter
    const [projectName, setProjectName] = useState('');
    const [status, setStatus] = useState('');
    const [location, setLocation] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [imageUrl, setImageUrl] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    // State for Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageUrl(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Create the form data to send
        const formData: Record<string, any> = {
            projectName,
            status,
            location,
            isVerified,
        };

        // Retrieve user ID from local storage
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            console.error('User not found');
            setLoading(false);
            return;
        }
        const user = JSON.parse(storedUser);
        const userId = user.id;
        if (userId) {
            formData.createdBy = userId;
        } else {
            console.error('User ID not found, cannot create project');
            setLoading(false);
            return;
        }

        // Handle image upload if available
        if (imageUrl) {
            try {
                const imageUrlString = await uploadImageToFirebase(imageUrl); // Upload and get the download URL
                formData.imageUrl = imageUrlString;
            } catch (error) {
                console.error('Error uploading image:', error);
                setLoading(false);
                return;
            }
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token not found');

            const response = await fetch(`${API_BASE_URL}/projects/professional`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', // Use application/json if no file
                },
                body: JSON.stringify(formData), // Convert formData to JSON
            });

            if (response.ok) {
                const data = await response.json();
                const projectId = data.id;

                console.log('project created successfully')
                // Pass the newly created project data to the onProjectCreated callback
                if (onProjectCreated) {
                    onProjectCreated((prevProjects) => [...prevProjects, data]); // Add the new project to the existing list
                }
                handleClose();
                resetForm();

                // Show success Snackbar
                setSnackbarMessage('Project created successfully!');
                setSnackbarOpen(true);

                // Redirect to the project details page
                router.push(`/professional/projects/${projectId}`);
            } else {
                const errorText = await response.text();
                console.error('Error creating project:', errorText);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setProjectName('');
        setStatus('');
        setLocation('');
        setIsVerified(false);
        setImageUrl(null);
    };

    // Close Snackbar
    const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Create New Project
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Project Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                        />
                        <TextField
                            label="Status"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        />
                        <TextField
                            label="Location"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isVerified}
                                    onChange={(e) => setIsVerified(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Verified"
                        />
                        <input type="file" accept="image/*" onChange={handleFileChange} />

                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'Create Project'}
                        </Button>
                    </form>
                </Box>
            </Modal>

            {/* Snackbar for Success Message */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CreateProjectModal;


